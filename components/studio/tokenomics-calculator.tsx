'use client'

import { useMemo, useState } from 'react'
import {
  Coins,
  Droplets,
  Info,
  Lock,
  Percent,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Field, Input } from '@/components/primitives'
import {
  PLATFORM_FEE_MAX,
  PLATFORM_FEE_MIN,
  ROYALTY_EQUITY_MAX,
  ROYALTY_EQUITY_MIN,
  SECONDARY_FEE_TOTAL_PCT,
  VESTING_OPTIONS,
  calcTokenomics,
  defaultSecondaryVolume,
  formatUsdCompact,
} from '@/lib/tokenomics'
import { cn } from '@/lib/utils'

const inputClassName = cn(
  'h-11 w-full rounded-xl border border-[#1e2a44] bg-[#0f172a]/80 px-3 text-sm text-white outline-none transition-colors',
  'focus-visible:border-[#3bc1ca]/50 focus-visible:ring-2 focus-visible:ring-[#3bc1ca]/20',
)

function PieChart({ slices }: { slices: { pct: number; color: string }[] }) {
  const gradient = useMemo(() => {
    let deg = 0
    const stops = slices.map((slice) => {
      const start = deg
      deg += slice.pct * 3.6
      return `${slice.color} ${start}deg ${deg}deg`
    })
    return `conic-gradient(${stops.join(', ')})`
  }, [slices])

  return (
    <div className="relative mx-auto h-44 w-44 shrink-0">
      <div
        className="h-full w-full rounded-full shadow-inner ring-4 ring-[#1e2a44]/60"
        style={{ background: gradient }}
        role="img"
        aria-label="גרף חלוקת גיוס"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#070b14]/95 text-center">
          <Percent className="mb-0.5 h-3.5 w-3.5 text-[#3bc1ca]" aria-hidden />
          <span className="text-[10px] text-slate-500">חלוקה</span>
        </div>
      </div>
    </div>
  )
}

export type TokenomicsCalculatorProps = {
  royaltyEquityPct: number
  onRoyaltyEquityChange: (value: number) => void
  raiseAmount: number
  onRaiseAmountChange: (value: number) => void
  includeLiquidityPool: boolean
  onIncludeLiquidityPoolChange: (value: boolean) => void
  platformFeePct: number
  onPlatformFeeChange: (value: number) => void
  vestingMonths: number
  onVestingChange: (months: number) => void
}

export function TokenomicsCalculator({
  royaltyEquityPct,
  onRoyaltyEquityChange,
  raiseAmount,
  onRaiseAmountChange,
  includeLiquidityPool,
  onIncludeLiquidityPoolChange,
  platformFeePct,
  onPlatformFeeChange,
  vestingMonths,
  onVestingChange,
}: TokenomicsCalculatorProps) {
  const [secondaryVolume, setSecondaryVolume] = useState(() =>
    defaultSecondaryVolume(raiseAmount),
  )
  const [secondaryTouched, setSecondaryTouched] = useState(false)

  function handleRaiseChange(raw: string) {
    const next = Math.max(0, Number(raw) || 0)
    onRaiseAmountChange(next)
    if (!secondaryTouched) {
      setSecondaryVolume(defaultSecondaryVolume(next))
    }
  }

  const breakdown = useMemo(
    () =>
      calcTokenomics({
        royaltyEquityPct,
        raiseAmount,
        includeLiquidityPool,
        platformFeePct,
        vestingMonths,
        estimatedMonthlySecondaryVolume: secondaryVolume,
      }),
    [
      royaltyEquityPct,
      raiseAmount,
      includeLiquidityPool,
      platformFeePct,
      vestingMonths,
      secondaryVolume,
    ],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-[#3bc1ca]" aria-hidden />
        <h2 className="text-lg font-bold text-white">מחשבון טוקנומיקס</h2>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="royalty-equity" className="text-sm font-medium text-white">
              כמה % מהתמלוגים למכירה?
            </label>
            <span className="rounded-lg bg-[#3bc1ca]/15 px-2.5 py-1 text-sm font-bold text-[#3bc1ca]">
              {royaltyEquityPct}%
            </span>
          </div>
          <input
            id="royalty-equity"
            type="range"
            min={ROYALTY_EQUITY_MIN}
            max={ROYALTY_EQUITY_MAX}
            step={1}
            value={royaltyEquityPct}
            onChange={(e) => onRoyaltyEquityChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#1e2a44] accent-[#3bc1ca]"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>{ROYALTY_EQUITY_MIN}% (מינימום)</span>
            <span>{ROYALTY_EQUITY_MAX}% (מקסימום)</span>
          </div>
          <p className="text-xs text-slate-400">
            את/ה שומר/ת{' '}
            <span className="font-semibold text-emerald-400">
              {breakdown.creatorRetainsRoyaltyPct}%
            </span>{' '}
            מהתמלוגים · המשקיעים מקבלים{' '}
            <span className="font-semibold text-violet-300">
              {breakdown.investorRoyaltyPct}%
            </span>{' '}
            (100% ישירות לחוזה)
          </p>
        </div>

        <Field
          label="סכום גיוס יעד"
          htmlFor="raise-amount"
          hint="כמה כסף את/ה רוצה לגייס מהקהילה ב-drop הראשון"
        >
          <div className="relative">
            <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
              $
            </span>
            <Input
              id="raise-amount"
              type="number"
              min={0}
              step={1000}
              value={raiseAmount || ''}
              onChange={(e) => handleRaiseChange(e.target.value)}
              className="border-[#1e2a44] bg-[#0f172a]/60 ps-7 text-white"
            />
          </div>
        </Field>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="platform-fee" className="text-sm font-medium text-white">
              עמלת פלטפורמה
            </label>
            <span className="text-sm font-semibold text-indigo-300">{platformFeePct}%</span>
          </div>
          <input
            id="platform-fee"
            type="range"
            min={PLATFORM_FEE_MIN}
            max={PLATFORM_FEE_MAX}
            step={0.5}
            value={platformFeePct}
            onChange={(e) => onPlatformFeeChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#1e2a44] accent-indigo-400"
          />
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#1e2a44]/60 bg-[#0f172a]/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-violet-400" aria-hidden />
            <div>
              <p className="text-sm font-medium text-white">מאגר נזילות (5%)</p>
              <p className="text-[11px] text-slate-500">מאפשר מכירה מהירה גם בלי קונה מיידי</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={includeLiquidityPool}
            onChange={(e) => onIncludeLiquidityPoolChange(e.target.checked)}
            className="h-4 w-4 rounded border-[#1e2a44] accent-violet-500"
          />
        </label>

        <Field label="תקופת נעילה (Vesting)" htmlFor="vesting">
          <select
            id="vesting"
            value={vestingMonths}
            onChange={(e) => onVestingChange(Number(e.target.value))}
            className={inputClassName}
          >
            {VESTING_OPTIONS.map(({ months, label }) => (
              <option key={months} value={months}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <section className="rounded-2xl border border-[#1e2a44] bg-[#0f172a]/50 p-5">
        <p className="mb-4 text-sm font-semibold text-white">חלוקת הגיוס הראשוני</p>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <PieChart slices={breakdown.raiseSplit.map((s) => ({ pct: s.pct, color: s.color }))} />

          <ul className="min-w-0 flex-1 space-y-2.5">
            {breakdown.raiseSplit.map((slice) => (
              <li
                key={slice.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#1e2a44]/60 bg-[#12192b]/60 px-3 py-2.5"
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
              <span className="text-sm font-semibold text-slate-400">סה״כ גיוס</span>
              <span className="text-sm font-bold text-[#3bc1ca]" dir="ltr">
                {formatUsdCompact(raiseAmount)}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-[#1e2a44] bg-[#0f172a]/50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden />
          <p className="text-sm font-semibold text-white">תחזית שוק משני</p>
        </div>
        <p className="mb-3 text-xs text-slate-500">
          על כל עסקה בין משקיעים — {SECONDARY_FEE_TOTAL_PCT}% עמלה: 2.5% ליוצר · 2.5% לפלטפורמה
        </p>

        <Field
          label="נפח מסחר חודשי משוער"
          htmlFor="secondary-volume"
          hint="הערכה לתזרים פסיבי מהמסחר בין מחזיקים"
        >
          <div className="relative">
            <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
              $
            </span>
            <Input
              id="secondary-volume"
              type="number"
              min={0}
              step={500}
              value={secondaryVolume || ''}
              onChange={(e) => {
                setSecondaryTouched(true)
                setSecondaryVolume(Math.max(0, Number(e.target.value) || 0))
              }}
              className="border-[#1e2a44] bg-[#0f172a]/60 ps-7 text-white"
            />
          </div>
        </Field>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-emerald-300/80">
              <Wallet className="h-3.5 w-3.5" aria-hidden />
              הכנסה פסיבית ליוצר
            </div>
            <p className="mt-1 text-lg font-bold text-emerald-300" dir="ltr">
              {formatUsdCompact(breakdown.secondary.creatorPassive)}
              <span className="text-xs font-normal text-emerald-400/70"> /חודש</span>
            </p>
          </div>
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-indigo-300/80">
              <Coins className="h-3.5 w-3.5" aria-hidden />
              עמלת פלטפורמה
            </div>
            <p className="mt-1 text-lg font-bold text-indigo-300" dir="ltr">
              {formatUsdCompact(breakdown.secondary.platformPassive)}
              <span className="text-xs font-normal text-indigo-400/70"> /חודש</span>
            </p>
          </div>
        </div>
      </section>

      <div className="flex gap-3 rounded-xl border border-[#1e2a44]/80 bg-[#12192b]/40 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#3bc1ca]" aria-hidden />
        <div className="space-y-2 text-xs text-slate-400">
          <p>
            <span className="font-semibold text-white">תמלוגים:</span> {breakdown.investorRoyaltyPct}%
            מההכנסות האמיתיות (ספוטיפיי, Steam וכו׳) זורמים 100% לחוזה החכם ומתחלקים
            פרופורציונלית למחזיקים — ללא התעסקות מצדך.
          </p>
          <p className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-violet-400" aria-hidden />
            <span>
              נעילת מסחר: <span className="text-violet-300">{breakdown.vestingLabel}</span> מרגע
              ההשקה
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
