// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {CreatorShareToken} from "./CreatorShareToken.sol";
import {DropSale} from "./DropSale.sol";
import {RoyaltyVault} from "./RoyaltyVault.sol";
import {SecondaryMarket} from "./SecondaryMarket.sol";
import {Tokenomics} from "./libraries/Tokenomics.sol";

/// @title DropFactory
/// @notice Deploys a full drop stack for a creator project:
///         ShareToken + DropSale + RoyaltyVault, wired with roles & vesting.
contract DropFactory is AccessControl {
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");

    address public platformTreasury;
    address public liquidityTreasury;
    SecondaryMarket public immutable market;

    struct DropConfig {
        string name;
        string symbol;
        uint16 royaltyEquityBps; // 500–5000
        uint16 platformFeeBps; // 500–1000
        bool includeLiquidityPool;
        uint64 vestingMonths; // 0,1,3,6
        uint256 priceWei;
        uint256 raiseGoalWei;
        uint256 tokensForSale;
        uint64 saleDurationSeconds;
    }

    struct Drop {
        address creator;
        address shareToken;
        address sale;
        address royaltyVault;
        uint64 createdAt;
    }

    Drop[] public drops;
    mapping(address => uint256[]) public creatorDrops;

    event DropCreated(
        uint256 indexed dropId,
        address indexed creator,
        address shareToken,
        address sale,
        address royaltyVault
    );
    event PlatformTreasuryUpdated(address treasury);
    event LiquidityTreasuryUpdated(address treasury);

    constructor(address platformTreasury_, address liquidityTreasury_, address admin_) {
        require(platformTreasury_ != address(0) && admin_ != address(0), "zero");
        platformTreasury = platformTreasury_;
        liquidityTreasury = liquidityTreasury_ == address(0) ? platformTreasury_ : liquidityTreasury_;
        market = new SecondaryMarket(platformTreasury_);

        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(CREATOR_ROLE, admin_);
    }

    function setPlatformTreasury(address t) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(t != address(0), "zero");
        platformTreasury = t;
        emit PlatformTreasuryUpdated(t);
    }

    function setLiquidityTreasury(address t) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(t != address(0), "zero");
        liquidityTreasury = t;
        emit LiquidityTreasuryUpdated(t);
    }

    function createDrop(DropConfig calldata cfg) external onlyRole(CREATOR_ROLE) returns (uint256 dropId) {
        _validate(cfg);

        uint64 vestingEnds = uint64(block.timestamp + (uint256(cfg.vestingMonths) * 30 days));
        address creator = msg.sender;

        CreatorShareToken token = new CreatorShareToken(
            cfg.name,
            cfg.symbol,
            creator,
            cfg.royaltyEquityBps,
            vestingEnds,
            address(this)
        );

        DropSale sale = new DropSale(
            address(token),
            creator,
            platformTreasury,
            liquidityTreasury,
            cfg.priceWei,
            cfg.raiseGoalWei,
            cfg.tokensForSale,
            cfg.platformFeeBps,
            cfg.includeLiquidityPool,
            uint64(block.timestamp + cfg.saleDurationSeconds),
            address(this)
        );

        RoyaltyVault vault = new RoyaltyVault(address(token));

        // Wire roles: sale mints; sale + market exempt from vesting lock.
        token.grantRole(token.MINTER_ROLE(), address(sale));
        token.grantRole(token.TRANSFER_EXEMPT_ROLE(), address(sale));
        token.grantRole(token.TRANSFER_EXEMPT_ROLE(), address(market));
        // Hand admin of token to creator for future flexibility.
        token.grantRole(token.DEFAULT_ADMIN_ROLE(), creator);
        token.renounceRole(token.DEFAULT_ADMIN_ROLE(), address(this));

        dropId = drops.length;
        drops.push(
            Drop({
                creator: creator,
                shareToken: address(token),
                sale: address(sale),
                royaltyVault: address(vault),
                createdAt: uint64(block.timestamp)
            })
        );
        creatorDrops[creator].push(dropId);

        emit DropCreated(dropId, creator, address(token), address(sale), address(vault));
    }

    function dropsCount() external view returns (uint256) {
        return drops.length;
    }

    function getDrop(uint256 id) external view returns (Drop memory) {
        return drops[id];
    }

    function _validate(DropConfig calldata cfg) private pure {
        require(bytes(cfg.name).length > 0 && bytes(cfg.symbol).length > 0, "name");
        require(
            cfg.royaltyEquityBps >= Tokenomics.MIN_ROYALTY_EQUITY_BPS
                && cfg.royaltyEquityBps <= Tokenomics.MAX_ROYALTY_EQUITY_BPS,
            "equity"
        );
        require(
            cfg.platformFeeBps >= Tokenomics.MIN_PLATFORM_FEE_BPS
                && cfg.platformFeeBps <= Tokenomics.MAX_PLATFORM_FEE_BPS,
            "fee"
        );
        require(
            cfg.vestingMonths == 0 || cfg.vestingMonths == 1 || cfg.vestingMonths == 3 || cfg.vestingMonths == 6,
            "vesting"
        );
        require(cfg.priceWei > 0 && cfg.raiseGoalWei > 0 && cfg.tokensForSale > 0, "sale");
        require(cfg.saleDurationSeconds >= 1 hours, "duration");
    }
}
