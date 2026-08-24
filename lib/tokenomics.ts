export const ROYALTY_EQUITY_MIN = 5
export const ROYALTY_EQUITY_MAX = 50
export const PLATFORM_FEE_MIN = 5
export const PLATFORM_FEE_MAX = 10
export const LIQUIDITY_POOL_PCT = 5
export const SECONDARY_FEE_TOTAL_PCT = 5
export const SECONDARY_CREATOR_SHARE_PCT = 2.5
export const SECONDARY_PLATFORM_SHARE_PCT = 2.5

export const VESTING_OPTIONS = [
  { months: 0, label: 'ללא נעילה' },
  { months: 1, label: 'חודש אחד' },
  { months: 3, label: '3 חודשים' },
  { months: 6, label: '6 חודשים' },
] as const

export type TokenomicsInput = {
  royaltyEquityPct: number
  raiseAmount: number
  includeLiquidityPool: boolean
  platformFeePct: number
  vestingMonths: number
  estimatedMonthlySecondaryVolume: number
}

export type RaiseSplitSlice = {
  id: 'creator' | 'platform' | 'liquidity'
  label: string
  pct: number
  amount: number
  color: string
}

export type TokenomicsBreakdown = {
  raiseSplit: RaiseSplitSlice[]
  creatorRetainsRoyaltyPct: number
  investorRoyaltyPct: number
  secondary: {
    monthlyVolume: number
    totalFee: number
    creatorPassive: number
    platformPassive: number
  }
  vestingLabel: string
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function calcTokenomics(input: TokenomicsInput): TokenomicsBreakdown {
  const royaltyEquityPct = clamp(input.royaltyEquityPct, ROYALTY_EQUITY_MIN, ROYALTY_EQUITY_MAX)
  const raiseAmount = Math.max(0, input.raiseAmount)
  const platformFeePct = clamp(input.platformFeePct, PLATFORM_FEE_MIN, PLATFORM_FEE_MAX)
  const liquidityPct = input.includeLiquidityPool ? LIQUIDITY_POOL_PCT : 0
  const creatorPct = 100 - platformFeePct - liquidityPct

  const raiseSplit: RaiseSplitSlice[] = [
    {
      id: 'creator',
      label: 'יוצר',
      pct: creatorPct,
      amount: (raiseAmount * creatorPct) / 100,
      color: '#3bc1ca',
    },
    {
      id: 'platform',
      label: 'פלטפורמה',
      pct: platformFeePct,
      amount: (raiseAmount * platformFeePct) / 100,
      color: '#6366f1',
    },
  ]

  if (input.includeLiquidityPool) {
    raiseSplit.push({
      id: 'liquidity',
      label: 'מאגר נזילות',
      pct: liquidityPct,
      amount: (raiseAmount * liquidityPct) / 100,
      color: '#a855f7',
    })
  }

  const monthlyVolume = Math.max(0, input.estimatedMonthlySecondaryVolume)
  const totalSecondaryFee = (monthlyVolume * SECONDARY_FEE_TOTAL_PCT) / 100
  const vestingLabel =
    VESTING_OPTIONS.find((o) => o.months === input.vestingMonths)?.label ?? `${input.vestingMonths} חודשים`

  return {
    raiseSplit,
    creatorRetainsRoyaltyPct: 100 - royaltyEquityPct,
    investorRoyaltyPct: royaltyEquityPct,
    secondary: {
      monthlyVolume,
      totalFee: totalSecondaryFee,
      creatorPassive: (monthlyVolume * SECONDARY_CREATOR_SHARE_PCT) / 100,
      platformPassive: (monthlyVolume * SECONDARY_PLATFORM_SHARE_PCT) / 100,
    },
    vestingLabel,
  }
}

export function defaultSecondaryVolume(raiseAmount: number): number {
  return Math.round(raiseAmount * 0.15)
}

export function formatUsdCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
