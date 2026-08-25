// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {DropFactory} from "../src/DropFactory.sol";

/// @notice Deploy DropFactory to Base Sepolia (or Base).
/// @dev Example:
///   forge script script/Deploy.s.sol:DeployScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --verify
contract DeployScript is Script {
    function run() external {
        address platformTreasury = vm.envAddress("PLATFORM_TREASURY");
        address liquidityTreasury = vm.envOr("LIQUIDITY_TREASURY", platformTreasury);
        address admin = vm.envOr("ADMIN_ADDRESS", platformTreasury);

        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);

        DropFactory factory = new DropFactory(platformTreasury, liquidityTreasury, admin);

        console2.log("DropFactory:", address(factory));
        console2.log("SecondaryMarket:", address(factory.market()));
        console2.log("Platform:", platformTreasury);
        console2.log("Admin:", admin);

        vm.stopBroadcast();
    }
}
