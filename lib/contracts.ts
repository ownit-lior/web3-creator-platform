/**
 * VIBE on-chain config — Base Sepolia (dev) / Base (prod).
 * Set NEXT_PUBLIC_DROP_FACTORY_ADDRESS after forge deploy.
 * Optional per-drop sales: NEXT_PUBLIC_DROP_SALE_ADDRESSES={"inv-m1":"0x..."}
 */
import { base, baseSepolia } from '@/lib/chains'

export const DROP_FACTORY_ADDRESS: Record<number, `0x${string}` | undefined> = {
  [baseSepolia.id]: (process.env.NEXT_PUBLIC_DROP_FACTORY_ADDRESS as `0x${string}` | undefined)
    || undefined,
  [base.id]: (process.env.NEXT_PUBLIC_DROP_FACTORY_ADDRESS_MAINNET as `0x${string}` | undefined)
    || undefined,
}

/** Parse optional JSON map of dropId → DropSale address */
export function getDropSaleAddress(dropId: string): `0x${string}` | undefined {
  const raw = process.env.NEXT_PUBLIC_DROP_SALE_ADDRESSES
  if (!raw) return undefined
  try {
    const map = JSON.parse(raw) as Record<string, string>
    const addr = map[dropId]
    return addr?.startsWith('0x') ? (addr as `0x${string}`) : undefined
  } catch {
    return undefined
  }
}

export function getFactoryAddress(chainId: number): `0x${string}` | undefined {
  return DROP_FACTORY_ADDRESS[chainId]
}

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
    type: 'function',
    name: 'CREATOR_ROLE',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bytes32' }],
  },
  {
    type: 'function',
    name: 'hasRole',
    stateMutability: 'view',
    inputs: [
      { name: 'role', type: 'bytes32' },
      { name: 'account', type: 'address' },
    ],
    outputs: [{ type: 'bool' }],
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
  {
    type: 'function',
    name: 'tokensForSale',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'finalized',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bool' }],
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

/** Demo ETH/USD rate for converting studio USD raise targets to wei. */
export const DEMO_ETH_USD = 3_000
