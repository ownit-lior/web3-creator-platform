'use client'

import Image from 'next/image'
import { Crown, Gem, ListChecks, Trophy } from 'lucide-react'
import {
  COMMUNITY_TIER_LABELS,
  TIER_ORDER,
  type ClubPageDetail,
  type CommunityTier,
} from '@/lib/club-page-data'
import { cn } from '@/lib/utils'

const tierAccent: Record<CommunityTier, string> = {
  Bronze: 'border-orange-500/25 text-orange-300',
  Silver: 'border-slate-400/25 text-slate-300',
  Gold: 'border-amber-500/30 text-amber-300',
  Diamond: 'border-[#3bc1ca]/40 text-[#3bc1ca]',
}

function TierBreakdown({ club }: { club: ClubPageDetail }) {
  return (
    <div className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-[#3bc1ca]" aria-hidden />
        <h3 className="text-sm font-bold text-white">דרגות והטבות</h3>
      </div>
      <ul className="space-y-3">
        {TIER_ORDER.map((tier) => {
          const def = club.tiers.find((t) => t.name === tier)
          const perks = club.tierPerks[tier]
          const isCurrent = club.membership.currentTier === tier
          return (
            <li
              key={tier}
              className={cn(
                'rounded-xl border p-3',
                isCurrent
                  ? 'border-[#3bc1ca]/40 bg-[#3bc1ca]/8'
                  : 'border-[#1e2a44] bg-[#0f172a]/50',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-bold',
                    tierAccent[tier],
                  )}
                >
                  {tier === 'Diamond' ? (
                    <Gem className="h-3 w-3" aria-hidden />
                  ) : (
                    <Crown className="h-3 w-3" aria-hidden />
                  )}
                  {COMMUNITY_TIER_LABELS[tier]}
                </span>
                <span className="text-[11px] text-slate-500">
                  {def?.minTokens ?? 0}+ אסימונים
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {perks.slice(0, 3).map((perk) => (
                  <li key={perk} className="text-xs text-slate-400">
                    · {perk}
                  </li>
                ))}
              </ul>
              {isCurrent && (
                <p className="mt-2 text-[10px] font-semibold text-[#3bc1ca]">
                  הדרגה שלך כרגע
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Leaderboard({ club }: { club: ClubPageDetail }) {
  return (
    <div className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-amber-400" aria-hidden />
        <h3 className="text-sm font-bold text-white">טבלת מובילים</h3>
      </div>
      <p className="mb-3 text-[11px] text-slate-500">
        מחזיקי האסימונים הגדולים בקהילה
      </p>
      <ol className="space-y-2.5">
        {club.leaderboard.map((entry) => (
          <li
            key={entry.username}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-3 py-2.5',
              entry.rank === 1
                ? 'border-amber-500/40 bg-gradient-to-l from-amber-500/15 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                : 'border-[#1e2a44] bg-[#0f172a]/40',
            )}
          >
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                entry.rank === 1
                  ? 'bg-amber-400 text-[#070b14]'
                  : 'bg-[#1e2a44] text-slate-300',
              )}
            >
              {entry.rank}
            </span>
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#1e2a44]">
              <Image
                src={entry.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {entry.username}
                {entry.rank === 1 && (
                  <span className="mr-1.5 inline-flex align-middle text-amber-400">
                    ★
                  </span>
                )}
              </p>
              <p className="text-[11px] text-slate-500">
                {COMMUNITY_TIER_LABELS[entry.tier]}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold tabular-nums text-[#3bc1ca]">
              {entry.tokens}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ClubSidebar({ club }: { club: ClubPageDetail }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
      <TierBreakdown club={club} />
      <Leaderboard club={club} />
    </aside>
  )
}
