// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {DropFactory} from "../src/DropFactory.sol";
import {CreatorShareToken} from "../src/CreatorShareToken.sol";
import {DropSale} from "../src/DropSale.sol";
import {RoyaltyVault} from "../src/RoyaltyVault.sol";
import {SecondaryMarket} from "../src/SecondaryMarket.sol";
import {Tokenomics} from "../src/libraries/Tokenomics.sol";

contract VibeDropTest is Test {
    DropFactory factory;
    address admin = makeAddr("admin");
    address platform = makeAddr("platform");
    address liquidity = makeAddr("liquidity");
    address creator = makeAddr("creator");
    address investorA = makeAddr("investorA");
    address investorB = makeAddr("investorB");

    function setUp() public {
        vm.deal(investorA, 100 ether);
        vm.deal(investorB, 100 ether);
        vm.deal(creator, 10 ether);
        vm.deal(address(this), 10 ether);

        vm.startPrank(admin);
        factory = new DropFactory(platform, liquidity, admin);
        factory.grantRole(factory.CREATOR_ROLE(), creator);
        vm.stopPrank();
    }

    function _createDrop(uint64 vestingMonths) internal returns (uint256 id) {
        DropFactory.DropConfig memory cfg = DropFactory.DropConfig({
            name: "Neon Dreams",
            symbol: "NOVA",
            royaltyEquityBps: 2_000, // 20%
            platformFeeBps: 750, // 7.5%
            includeLiquidityPool: true,
            vestingMonths: vestingMonths,
            priceWei: 0.01 ether,
            raiseGoalWei: 1 ether,
            tokensForSale: 100,
            saleDurationSeconds: 7 days
        });
        vm.prank(creator);
        id = factory.createDrop(cfg);
    }

    function test_CreateDropAndBuyWithFeeSplit() public {
        uint256 id = _createDrop(0);
        DropFactory.Drop memory d = factory.getDrop(id);
        DropSale sale = DropSale(d.sale);
        CreatorShareToken token = CreatorShareToken(d.shareToken);

        uint256 platformBefore = platform.balance;
        uint256 liquidityBefore = liquidity.balance;
        uint256 creatorBefore = creator.balance;

        vm.prank(investorA);
        sale.buy{value: 1 ether}(100);

        assertEq(token.balanceOf(investorA), 100);
        assertEq(sale.raisedWei(), 1 ether);

        sale.finalize();

        // 7.5% platform, 5% liquidity, 87.5% creator
        assertEq(platform.balance - platformBefore, 0.075 ether);
        assertEq(liquidity.balance - liquidityBefore, 0.05 ether);
        assertEq(creator.balance - creatorBefore, 0.875 ether);
    }

    function test_RoyaltyDistributionProRata() public {
        uint256 id = _createDrop(0);
        DropFactory.Drop memory d = factory.getDrop(id);
        DropSale sale = DropSale(d.sale);
        RoyaltyVault vault = RoyaltyVault(payable(d.royaltyVault));

        vm.prank(investorA);
        sale.buy{value: 0.6 ether}(60);
        vm.prank(investorB);
        sale.buy{value: 0.4 ether}(40);

        // Deposit 1 ETH royalties → A gets 0.6, B gets 0.4
        vault.depositRoyalties{value: 1 ether}();

        uint256 aBefore = investorA.balance;
        uint256 bBefore = investorB.balance;

        vm.prank(investorA);
        vault.claim();
        vm.prank(investorB);
        vault.claim();

        assertEq(investorA.balance - aBefore, 0.6 ether);
        assertEq(investorB.balance - bBefore, 0.4 ether);
    }

    function test_SecondaryMarketFees() public {
        uint256 id = _createDrop(0);
        DropFactory.Drop memory d = factory.getDrop(id);
        DropSale sale = DropSale(d.sale);
        CreatorShareToken token = CreatorShareToken(d.shareToken);
        SecondaryMarket market = factory.market();

        vm.prank(investorA);
        sale.buy{value: 0.5 ether}(50);

        vm.startPrank(investorA);
        token.approve(address(market), 20);
        uint256 listingId = market.list(address(token), 20, 1 ether);
        vm.stopPrank();

        uint256 creatorBefore = creator.balance;
        uint256 platformBefore = platform.balance;
        uint256 sellerBefore = investorA.balance;

        vm.prank(investorB);
        market.buy{value: 1 ether}(listingId);

        assertEq(token.balanceOf(investorB), 20);
        // 2.5% creator, 2.5% platform, 95% seller
        assertEq(creator.balance - creatorBefore, 0.025 ether);
        assertEq(platform.balance - platformBefore, 0.025 ether);
        assertEq(investorA.balance - sellerBefore, 0.95 ether);
    }

    function test_VestingBlocksTransfers() public {
        uint256 id = _createDrop(3);
        DropFactory.Drop memory d = factory.getDrop(id);
        DropSale sale = DropSale(d.sale);
        CreatorShareToken token = CreatorShareToken(d.shareToken);

        vm.prank(investorA);
        sale.buy{value: 0.1 ether}(10);

        vm.prank(investorA);
        vm.expectRevert(abi.encodeWithSelector(CreatorShareToken.VestingLocked.selector, token.vestingEnds()));
        token.transfer(investorB, 1);

        // After vesting, transfers work
        vm.warp(token.vestingEnds() + 1);
        vm.prank(investorA);
        token.transfer(investorB, 1);
        assertEq(token.balanceOf(investorB), 1);
    }

    function test_RejectsInvalidEquity() public {
        DropFactory.DropConfig memory cfg = DropFactory.DropConfig({
            name: "Bad",
            symbol: "BAD",
            royaltyEquityBps: 100, // 1% — too low
            platformFeeBps: 750,
            includeLiquidityPool: false,
            vestingMonths: 0,
            priceWei: 0.01 ether,
            raiseGoalWei: 1 ether,
            tokensForSale: 100,
            saleDurationSeconds: 7 days
        });
        vm.prank(creator);
        vm.expectRevert("equity");
        factory.createDrop(cfg);
    }

    function test_TokenomicsConstants() public pure {
        assertEq(Tokenomics.SECONDARY_FEE_BPS, 500);
        assertEq(Tokenomics.SECONDARY_CREATOR_FEE_BPS + Tokenomics.SECONDARY_PLATFORM_FEE_BPS, 500);
        assertEq(Tokenomics.LIQUIDITY_POOL_BPS, 500);
    }
}
