/**
 * VIBE on-chain config — Base Sepolia (dev) / Base (prod).
 * Fill addresses after running `forge script script/Deploy.s.sol`.
 */
import { base, baseSepolia } from './chains'

export const DROP_FACTORY_ADDRESS: Record<number, `0x${string}` | undefined> = {
  [baseSepolia.id]: undefined, // TODO: set after deploy
  [base.id]: undefined,
}

/** Minimal ABIs for frontend reads/writes */
export const dropFactoryAbi = [
  {
    type: 'function',
    name: 'createDrop',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'cfg',
        type: 'tuple',
        components: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'royaltyEquityBps', type: 'uint16' },
          { name: 'platformFeeBps', type: 'uint16' },
          { name: 'includeLiquidityPool', type: 'bool' },
          { name: 'vestingMonths', type: 'uint64' },
          { name: 'priceWei', type: 'uint256' },
          { name: 'raiseGoalWei', type: 'uint256' },
          { name: 'tokensForSale', type: 'uint256' },
          { name: 'saleDurationSeconds', type: 'uint64' },
        ],
      },
    ],
    outputs: [{ name: 'dropId', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'getDrop',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'creator', type: 'address' },
          { name: 'shareToken', type: 'address' },
          { name: 'sale', type: 'address' },
          { name: 'royaltyVault', type: 'address' },
          { name: 'createdAt', type: 'uint64' },
        ],
      },
    ],
  },
  {
    type: 'function',
    name: 'market',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
  {
    type: 'function',
    name: 'dropsCount',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'event',
    name: 'DropCreated',
    inputs: [
      { name: 'dropId', type: 'uint256', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
      { name: 'shareToken', type: 'address', indexed: false },
      { name: 'sale', type: 'address', indexed: false },
      { name: 'royaltyVault', type: 'address', indexed: false },
    ],
  },
] as const

export const dropSaleAbi = [
  {
    type: 'function',
    name: 'buy',
    stateMutability: 'payable',
    inputs: [{ name: 'minTokensOut', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'finalize',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'raisedWei',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'raiseGoalWei',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'priceWei',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'tokensSold',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
] as const

export const royaltyVaultAbi = [
  {
    type: 'function',
    name: 'depositRoyalties',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'claim',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'claimable',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalDistributed',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
] as const

export const secondaryMarketAbi = [
  {
    type: 'function',
    name: 'list',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'shareToken', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'priceWei', type: 'uint256' },
    ],
    outputs: [{ name: 'id', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'buy',
    stateMutability: 'payable',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'cancel',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
  },
] as const

/** Convert UI percent (e.g. 20) to BPS (2000). */
export function pctToBps(pct: number): number {
  return Math.round(pct * 100)
}
