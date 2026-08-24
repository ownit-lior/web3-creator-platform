// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title RoyaltyVault
/// @notice Pull-based royalty distributor. Creator (or oracle) deposits ETH/ERC20
///         representing the investors' share of real-world revenue; holders claim
///         pro-rata by share-token balance at claim time using an accumulator.
/// @dev Uses the classic MasterChef-style reward-per-token accumulator.
contract RoyaltyVault is ReentrancyGuard {
    IERC20 public immutable shareToken;

    uint256 public accRoyaltyPerShare; // scaled by 1e18
    uint256 public totalDistributed;

    mapping(address => uint256) public rewardDebt;
    mapping(address => uint256) public pendingRewards;
    mapping(address => uint256) public claimed;

    event RoyaltyDeposited(address indexed from, uint256 amount);
    event RoyaltyClaimed(address indexed account, uint256 amount);

    error ZeroAmount();
    error NothingToClaim();

    constructor(address shareToken_) {
        require(shareToken_ != address(0), "zero token");
        shareToken = IERC20(shareToken_);
    }

    /// @notice Deposit native ETH royalties for share holders.
    function depositRoyalties() external payable nonReentrant {
        if (msg.value == 0) revert ZeroAmount();
        uint256 supply = shareToken.totalSupply();
        require(supply > 0, "no supply");
        accRoyaltyPerShare += (msg.value * 1e18) / supply;
        totalDistributed += msg.value;
        emit RoyaltyDeposited(msg.sender, msg.value);
    }

    /// @notice Sync accounting after balance changes (call before transfer if needed).
    function sync(address account) public {
        uint256 bal = shareToken.balanceOf(account);
        uint256 accumulated = (bal * accRoyaltyPerShare) / 1e18;
        if (accumulated > rewardDebt[account]) {
            pendingRewards[account] += accumulated - rewardDebt[account];
        }
        rewardDebt[account] = accumulated;
    }

    function claimable(address account) public view returns (uint256) {
        uint256 bal = shareToken.balanceOf(account);
        uint256 accumulated = (bal * accRoyaltyPerShare) / 1e18;
        uint256 pending = pendingRewards[account];
        if (accumulated > rewardDebt[account]) {
            pending += accumulated - rewardDebt[account];
        }
        return pending;
    }

    function claim() external nonReentrant {
        sync(msg.sender);
        uint256 amount = pendingRewards[msg.sender];
        if (amount == 0) revert NothingToClaim();
        pendingRewards[msg.sender] = 0;
        claimed[msg.sender] += amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
        emit RoyaltyClaimed(msg.sender, amount);
    }

    receive() external payable {
        // Allow plain ETH sends as royalty deposits when supply exists.
        if (msg.value == 0) return;
        uint256 supply = shareToken.totalSupply();
        require(supply > 0, "no supply");
        accRoyaltyPerShare += (msg.value * 1e18) / supply;
        totalDistributed += msg.value;
        emit RoyaltyDeposited(msg.sender, msg.value);
    }
}
