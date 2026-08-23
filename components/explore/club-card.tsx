'use client'

import Image from 'next/image'
import {
  Crown,
  Gift,
  Lock,
  MessageCircle,
  Sparkles,
  Users,
  Vote,
} from 'lucide-react'
import { Badge } from '@/components/primitives'
import type { ClubUtility, CreatorClub } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

const utilityConfig: Record<
  ClubUtility,
  { icon: typeof Vote; label: string; color: string }
> = {
  voting: { icon: Vote, label: 'Voting', color: 'text-violet-400' },
  'exclusive-content': {
    icon: Lock,
    label: 'Exclusive',
    color: 'text-[#3bc1ca]',
  },
  'early-access': { icon: Sparkles, label: 'Early Access', color: 'text-amber-400' },
  merch: { icon: Gift, label: 'Merch', color: 'text-pink-400' },
  ama: { icon: MessageCircle, label: 'AMA', color: 'text-sky-400' },
}

const tierStyles: Record<string, string> = {
  Bronze: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
  Silver: 'bg-slate-400/15 text-slate-300 border-slate-400/25',
  Gold: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  Diamond: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
}

function formatMembers(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`
  return count.toLocaleString()
}

export function ClubCard({ club }: { club: CreatorClub }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0f172a]">
        <Image
          src={club.cover}
          alt={`${club.name} cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-[#070b14]/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <Users className="h-4 w-4 text-violet-400" aria-hidden />
            {formatMembers(club.memberCount)} members
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight text-white">{club.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{club.creatorName}</p>
        </div>

        <Badge tone="muted" className="w-fit border border-[#1e2a44] bg-[#0f172a] text-slate-300">
          {club.tag}
        </Badge>

        <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3bc1ca]" aria-hidden />
          {club.lockedContent}
        </p>

        <div className="flex flex-wrap gap-2">
          {club.utilities.map((utility) => {
            const { icon: Icon, label, color } = utilityConfig[utility]
            return (
              <span
                key={utility}
                className="inline-flex items-center gap-1 rounded-lg border border-[#1e2a44] bg-[#0f172a]/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300"
              >
                <Icon className={cn('h-3 w-3', color)} aria-hidden />
                {label}
              </span>
            )
          })}
        </div>

        {/* Community tier ladder */}
        <div className="rounded-xl border border-[#1e2a44] bg-[#0f172a]/50 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <Crown className="h-3 w-3 text-amber-400" aria-hidden />
            Community Tiers
          </div>
          <div className="flex flex-wrap gap-1.5">
            {club.tiers.map((tier) => (
              <span
                key={tier.name}
                title={`${tier.minTokens}+ tokens: ${tier.perk}`}
                className={cn(
                  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                  tierStyles[tier.name],
                )}
              >
                {tier.name}
                <span className="ml-1 opacity-60">{tier.minTokens}+</span>
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 py-3 text-sm font-bold text-violet-300 transition-all hover:border-violet-400 hover:bg-violet-500 hover:text-white"
        >
          <Users className="h-4 w-4" aria-hidden />
          Join Club
        </button>
      </div>
    </article>
  )
}
