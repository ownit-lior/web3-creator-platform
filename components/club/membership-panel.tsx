'use client'

import { ArrowUpRight, Crown, Sparkles, Zap } from 'lucide-react'
import { ProgressBar } from '@/components/primitives'
import {
  COMMUNITY_TIER_LABELS,
  type ClubPageDetail,
} from '@/lib/club-page-data'
import { cn } from '@/lib/utils'

const tierGlow: Record<string, string> = {
  Bronze: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
  Silver: 'border-slate-400/30 bg-slate-400/10 text-slate-200',
  Gold: 'border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  Diamond:
    'border-[#3bc1ca]/50 bg-[#3bc1ca]/10 text-[#3bc1ca] shadow-[0_0_24px_rgba(59,193,202,0.2)]',
}

export function MembershipPanel({ club }: { club: ClubPageDetail }) {
  const { membership, tiers } = club
  const currentDef = tiers.find((t) => t.name === membership.currentTier)
  const nextDef = membership.nextTier
    ? tiers.find((t) => t.name === membership.nextTier)
    : null

  const progress =
    nextDef && membership.tokensToNextTier > 0
      ? Math.min(
          100,
          (membership.tokensHeld / nextDef.minTokens) * 100,
        )
      : 100

  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-gradient-to-l from-[#3bc1ca]/10 via-[#12192b]/90 to-[#12192b]/90 p-5 shadow-lg md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#3bc1ca]/30 bg-[#3bc1ca]/10">
            <Crown className="h-6 w-6 text-[#3bc1ca]" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-500">
              הסטטוס שלי במועדון
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold',
                  tierGlow[membership.currentTier],
                )}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {COMMUNITY_TIER_LABELS[membership.currentTier]}
                {currentDef ? ` · מ-${currentDef.minTokens}` : ''}
              </span>
              <span className="text-sm text-slate-400">
                מחזיק/ה{' '}
                <span className="font-bold text-white">
                  {membership.tokensHeld}
                </span>{' '}
                אסימונים
              </span>
            </div>
          </div>
        </div>

        {membership.nextTier ? (
          <div className="min-w-0 flex-1 lg:max-w-md">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Zap className="h-3.5 w-3.5 text-amber-400" aria-hidden />
                {membership.nextPerkHint}
              </span>
              <span className="shrink-0 font-semibold text-[#3bc1ca]">
                {Math.round(progress)}%
              </span>
            </div>
            <ProgressBar value={progress} />
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>
                נוכחי: {COMMUNITY_TIER_LABELS[membership.currentTier]}
              </span>
              <span>
                הבא: {COMMUNITY_TIER_LABELS[membership.nextTier]} (
                {nextDef?.minTokens}+)
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm font-semibold text-[#3bc1ca]">
            הגעת לדרגה הגבוהה ביותר — כל הכבוד!
          </p>
        )}

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#3bc1ca]/40 bg-[#3bc1ca]/10 px-5 py-3 text-sm font-bold text-[#3bc1ca] transition-all hover:border-[#3bc1ca] hover:bg-[#3bc1ca] hover:text-[#070b14]"
        >
          שדרג עכשיו
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  )
}
