// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/// @title CreatorShareToken
/// @notice ERC-20 representing a share of a creator project's sold royalty equity.
/// @dev Transfers are locked until `vestingEnds` except for privileged roles
///      (sale / market / factory) so primary minting and secondary fills still work.
contract CreatorShareToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant TRANSFER_EXEMPT_ROLE = keccak256("TRANSFER_EXEMPT_ROLE");

    address public immutable creator;
    uint16 public immutable royaltyEquityBps;
    uint64 public immutable vestingEnds;

    error VestingLocked(uint64 unlocksAt);

    constructor(
        string memory name_,
        string memory symbol_,
        address creator_,
        uint16 royaltyEquityBps_,
        uint64 vestingEnds_,
        address admin_
    ) ERC20(name_, symbol_) {
        require(creator_ != address(0) && admin_ != address(0), "zero addr");
        creator = creator_;
        royaltyEquityBps = royaltyEquityBps_;
        vestingEnds = vestingEnds_;

        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(TRANSFER_EXEMPT_ROLE, admin_);
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function isTransferUnlocked() public view returns (bool) {
        return block.timestamp >= vestingEnds;
    }

    function _update(address from, address to, uint256 value) internal override {
        // Mint / burn always allowed.
        if (from != address(0) && to != address(0)) {
            if (!isTransferUnlocked()) {
                bool exempt = hasRole(TRANSFER_EXEMPT_ROLE, from) || hasRole(TRANSFER_EXEMPT_ROLE, to);
                if (!exempt) revert VestingLocked(vestingEnds);
            }
        }
        super._update(from, to, value);
    }
}
