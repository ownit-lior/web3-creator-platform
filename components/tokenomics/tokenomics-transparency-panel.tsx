'use client'

import { Coins, Info, Lock, TrendingUp } from 'lucide-react'
import { RaiseSplitPieChart } from '@/components/tokenomics/raise-split-pie-chart'
import {
  SECONDARY_FEE_TOTAL_PCT,
  calcTokenomics,
  formatUsdCompact,
  type TokenomicsInput,
} from '@/lib/tokenomics'

export type TokenomicsTransparencyProps = Pick<
  TokenomicsInput,
  | 'royaltyEquityPct'
  | 'raiseAmount'
  | 'includeLiquidityPool'
  | 'platformFeePct'
  | 'vestingMonths'
> & {
  /** Optional — shown as "raised so far" context */
  raisedSoFar?: number
}

export function TokenomicsTransparencyPanel({
  royaltyEquityPct,
  raiseAmount,
  includeLiquidityPool,
  platformFeePct,
  vestingMonths,
  raisedSoFar,
}: TokenomicsTransparencyProps) {
  const breakdown = calcTokenomics({
    royaltyEquityPct,
    raiseAmount,
    includeLiquidityPool,
    platformFeePct,
    vestingMonths,
    estimatedMonthlySecondaryVolume: Math.round(raiseAmount * 0.15),
  })

  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-6 shadow-lg">
      <div className="mb-1 flex items-center gap-2">
        <Coins className="h-5 w-5 text-[#3bc1ca]" aria-hidden />
        <h2 className="text-lg font-bold text-white">שקיפות טוקנומיקס</h2>
      </div>
      <p className="mb-6 text-xs text-slate-500">
        בדיוק כפי שהיוצר הגדיר בסטודיו — לאן הולך כל דולר מהגיוס
      </p>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        <RaiseSplitPieChart
          slices={breakdown.raiseSplit.map((s) => ({ pct: s.pct, color: s.color }))}
        />

        <ul className="min-w-0 flex-1 space-y-2.5">
          {breakdown.raiseSplit.map((slice) => (
            <li
              key={slice.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#1e2a44]/60 bg-[#0f172a]/40 px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                  aria-hidden
                />
                <span className="text-sm text-slate-300">{slice.label}</span>
                <span className="text-xs text-slate-500">({slice.pct}%)</span>
              </div>
              <span className="text-sm font-bold text-white" dir="ltr">
                {formatUsdCompact(slice.amount)}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-3 border-t border-[#1e2a44]/60 pt-2.5">
            <span className="text-sm font-semibold text-slate-400">יעד גיוס</span>
            <span className="text-sm font-bold text-[#3bc1ca]" dir="ltr">
              {formatUsdCompact(raiseAmount)}
            </span>
          </li>
          {raisedSoFar != null && (
            <li className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">גויס עד כה</span>
              <span className="text-sm font-semibold text-emerald-400" dir="ltr">
                {formatUsdCompact(raisedSoFar)}
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[#1e2a44]/80 bg-[#0f172a]/40 p-4">
          <p className="text-xs font-semibold text-slate-400">תמלוגים למשקיעים</p>
          <p className="mt-2 text-sm text-white">
            <span className="font-bold text-violet-300">{breakdown.investorRoyaltyPct}%</span>{' '}
            מההכנסות האמיתיות זורמים 100% לחוזה החכם
          </p>
          <p className="mt-1 text-xs text-slate-500">
            היוצר שומר {breakdown.creatorRetainsRoyaltyPct}% מהתמלוגים
          </p>
        </div>
        <div className="rounded-xl border border-[#1e2a44]/80 bg-[#0f172a]/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
            שוק משני
          </div>
          <p className="mt-2 text-sm text-white">
            {SECONDARY_FEE_TOTAL_PCT}% עמלת מסחר: 2.5% ליוצר · 2.5% לפלטפורמה
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-3 rounded-xl border border-[#1e2a44]/80 bg-[#0f172a]/40 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#3bc1ca]" aria-hidden />
        <div className="space-y-2 text-xs text-slate-400">
          <p>
            חלוקת התמלוגים פרופורציונלית לפי אחזקה — אפס התעסקות מצד היוצר, הכל on-chain.
          </p>
          <p className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-violet-400" aria-hidden />
            נעילת מסחר:{' '}
            <span className="text-violet-300">{breakdown.vestingLabel}</span> מרגע ההשקה
          </p>
        </div>
      </div>
    </section>
  )
}
