// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {CreatorShareToken} from "./CreatorShareToken.sol";
import {Tokenomics} from "./libraries/Tokenomics.sol";

/// @title SecondaryMarket
/// @notice Simple escrow marketplace for creator share tokens.
///         Every fill takes 5% fee: 2.5% creator + 2.5% platform.
contract SecondaryMarket is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Listing {
        address seller;
        address shareToken;
        uint256 amount;
        uint256 priceWei; // total price for `amount`
        bool active;
    }

    address public immutable platform;
    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed id, address indexed seller, address token, uint256 amount, uint256 priceWei);
    event Cancelled(uint256 indexed id);
    event Filled(
        uint256 indexed id,
        address indexed buyer,
        uint256 amount,
        uint256 priceWei,
        uint256 creatorFee,
        uint256 platformFee
    );

    error Inactive();
    error NotSeller();
    error BadPayment();

    constructor(address platform_) {
        require(platform_ != address(0), "zero");
        platform = platform_;
    }

    function list(address shareToken, uint256 amount, uint256 priceWei) external nonReentrant returns (uint256 id) {
        require(amount > 0 && priceWei > 0, "bad");
        IERC20(shareToken).safeTransferFrom(msg.sender, address(this), amount);
        id = ++nextListingId;
        listings[id] = Listing({
            seller: msg.sender,
            shareToken: shareToken,
            amount: amount,
            priceWei: priceWei,
            active: true
        });
        emit Listed(id, msg.sender, shareToken, amount, priceWei);
    }

    function cancel(uint256 id) external nonReentrant {
        Listing storage L = listings[id];
        if (!L.active) revert Inactive();
        if (L.seller != msg.sender) revert NotSeller();
        L.active = false;
        IERC20(L.shareToken).safeTransfer(L.seller, L.amount);
        emit Cancelled(id);
    }

    function buy(uint256 id) external payable nonReentrant {
        Listing storage L = listings[id];
        if (!L.active) revert Inactive();
        if (msg.value != L.priceWei) revert BadPayment();

        L.active = false;

        uint256 creatorFee = (msg.value * Tokenomics.SECONDARY_CREATOR_FEE_BPS) / Tokenomics.BPS_DENOMINATOR;
        uint256 platformFee = (msg.value * Tokenomics.SECONDARY_PLATFORM_FEE_BPS) / Tokenomics.BPS_DENOMINATOR;
        uint256 toSeller = msg.value - creatorFee - platformFee;

        address creator = CreatorShareToken(L.shareToken).creator();

        IERC20(L.shareToken).safeTransfer(msg.sender, L.amount);
        _pay(L.seller, toSeller);
        _pay(creator, creatorFee);
        _pay(platform, platformFee);

        emit Filled(id, msg.sender, L.amount, L.priceWei, creatorFee, platformFee);
    }

    function _pay(address to, uint256 amount) private {
        if (amount == 0) return;
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "pay fail");
    }
}
