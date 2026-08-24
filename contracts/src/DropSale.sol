// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {CreatorShareToken} from "./CreatorShareToken.sol";
import {Tokenomics} from "./libraries/Tokenomics.sol";

/// @title DropSale
/// @notice Primary fundraising: investors buy share tokens with ETH.
///         Proceeds split: creator / platform / optional liquidity pool.
contract DropSale is AccessControl, ReentrancyGuard {
    CreatorShareToken public immutable shareToken;
    address public immutable creator;
    address public immutable platform;
    address public immutable liquidityPool;

    uint256 public immutable priceWei;
    uint256 public immutable raiseGoalWei;
    uint256 public immutable tokensForSale;
    uint16 public immutable platformFeeBps;
    uint16 public immutable liquidityBps;
    uint64 public immutable saleEnds;

    uint256 public raisedWei;
    uint256 public tokensSold;
    bool public finalized;
    bool public cancelled;

    event Purchased(address indexed buyer, uint256 ethIn, uint256 tokensOut);
    event Finalized(uint256 raised, uint256 toCreator, uint256 toPlatform, uint256 toLiquidity);
    event Cancelled();
    event Refunded(address indexed buyer, uint256 amount);

    mapping(address => uint256) public contributed;

    error SaleClosed();
    error SoldOut();
    error GoalNotMet();
    error AlreadyFinalized();
    error NotCancelled();
    error ZeroPurchase();

    constructor(
        address shareToken_,
        address creator_,
        address platform_,
        address liquidityPool_,
        uint256 priceWei_,
        uint256 raiseGoalWei_,
        uint256 tokensForSale_,
        uint16 platformFeeBps_,
        bool includeLiquidityPool_,
        uint64 saleEnds_,
        address admin_
    ) {
        require(shareToken_ != address(0) && creator_ != address(0) && platform_ != address(0), "zero");
        require(priceWei_ > 0 && raiseGoalWei_ > 0 && tokensForSale_ > 0, "bad params");
        require(
            platformFeeBps_ >= Tokenomics.MIN_PLATFORM_FEE_BPS
                && platformFeeBps_ <= Tokenomics.MAX_PLATFORM_FEE_BPS,
            "platform fee"
        );

        shareToken = CreatorShareToken(shareToken_);
        creator = creator_;
        platform = platform_;
        liquidityPool = includeLiquidityPool_ ? liquidityPool_ : address(0);
        priceWei = priceWei_;
        raiseGoalWei = raiseGoalWei_;
        tokensForSale = tokensForSale_;
        platformFeeBps = platformFeeBps_;
        liquidityBps = includeLiquidityPool_ ? Tokenomics.LIQUIDITY_POOL_BPS : 0;
        saleEnds = saleEnds_;

        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
    }

    function buy(uint256 minTokensOut) external payable nonReentrant {
        if (finalized || cancelled || block.timestamp > saleEnds) revert SaleClosed();
        if (msg.value == 0) revert ZeroPurchase();

        uint256 tokensOut = msg.value / priceWei;
        if (tokensOut == 0) revert ZeroPurchase();
        if (tokensSold + tokensOut > tokensForSale) revert SoldOut();
        require(tokensOut >= minTokensOut, "slippage");

        uint256 cost = tokensOut * priceWei;
        uint256 change = msg.value - cost;

        tokensSold += tokensOut;
        raisedWei += cost;
        contributed[msg.sender] += cost;

        shareToken.mint(msg.sender, tokensOut);
        emit Purchased(msg.sender, cost, tokensOut);

        if (change > 0) {
            (bool ok, ) = msg.sender.call{value: change}("");
            require(ok, "refund fail");
        }
    }

    function finalize() external nonReentrant {
        if (finalized || cancelled) revert AlreadyFinalized();
        if (raisedWei < raiseGoalWei && block.timestamp <= saleEnds) revert GoalNotMet();
        // Soft-cap model: after saleEnds allow finalize even if under goal,
        // but only distribute if anything was raised.
        finalized = true;

        uint256 amount = raisedWei;
        if (amount == 0) {
            emit Finalized(0, 0, 0, 0);
            return;
        }

        uint256 toPlatform = (amount * platformFeeBps) / Tokenomics.BPS_DENOMINATOR;
        uint256 toLiquidity = liquidityPool == address(0)
            ? 0
            : (amount * liquidityBps) / Tokenomics.BPS_DENOMINATOR;
        uint256 toCreator = amount - toPlatform - toLiquidity;

        _pay(platform, toPlatform);
        if (toLiquidity > 0) _pay(liquidityPool, toLiquidity);
        _pay(creator, toCreator);

        emit Finalized(amount, toCreator, toPlatform, toLiquidity);
    }

    /// @notice Admin cancels before finalize; contributors can refund.
    function cancel() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (finalized) revert AlreadyFinalized();
        cancelled = true;
        emit Cancelled();
    }

    function refund() external nonReentrant {
        if (!cancelled) revert NotCancelled();
        uint256 amount = contributed[msg.sender];
        require(amount > 0, "nothing");
        contributed[msg.sender] = 0;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "refund fail");
        emit Refunded(msg.sender, amount);
    }

    function _pay(address to, uint256 amount) private {
        if (amount == 0) return;
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "pay fail");
    }
}
