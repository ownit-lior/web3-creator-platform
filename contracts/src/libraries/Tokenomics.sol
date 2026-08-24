// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Shared constants for VIBE creator-economy tokenomics (basis points).
library Tokenomics {
    uint16 public constant BPS_DENOMINATOR = 10_000;

    /// @dev Creator must keep majority ownership of royalties.
    uint16 public constant MIN_ROYALTY_EQUITY_BPS = 500; // 5%
    uint16 public constant MAX_ROYALTY_EQUITY_BPS = 5_000; // 50%

    uint16 public constant MIN_PLATFORM_FEE_BPS = 500; // 5%
    uint16 public constant MAX_PLATFORM_FEE_BPS = 1_000; // 10%

    uint16 public constant LIQUIDITY_POOL_BPS = 500; // 5%

    /// @dev Secondary market total fee = 5% split evenly.
    uint16 public constant SECONDARY_FEE_BPS = 500;
    uint16 public constant SECONDARY_CREATOR_FEE_BPS = 250;
    uint16 public constant SECONDARY_PLATFORM_FEE_BPS = 250;
}
