'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Compass, ExternalLink, TrendingUp } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { ProgressBar, Badge } from '@/components/primitives'
import { InvestButton } from '@/components/drop/invest-button'
import { TokenomicsTransparencyPanel } from '@/components/tokenomics/tokenomics-transparency-panel'
import {
  CREATOR_TIER_LABELS,
  type DropPageDetail,
} from '@/lib/drop-page-data'
import { formatUsdCompact } from '@/lib/tokenomics'
import { cn } from '@/lib/utils'

const tierStyles: Record<DropPageDetail['tier'], string> = {
  Emerging: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  Established: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  Star: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
}

export function DropFundraiseView({ drop }: { drop: DropPageDetail }) {
  const isPresale = drop.status === 'presale' && drop.presaleProgress != null
  const { tokenomics } = drop

  return (
    <div className="min-h-screen bg-[#070b14] text-white" dir="rtl">
      <header className="border-b border-[#1e2a44]/60 bg-[#070b14]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="transition-opacity hover:opacity-90">
            <LogoMark size="header" />
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:text-white"
            >
              <Compass className="h-4 w-4" aria-hidden />
              גילוי
            </Link>
            <span className="rounded-lg bg-[#3bc1ca]/10 px-3 py-2 font-semibold text-[#3bc1ca]">
              גיוס
            </span>
          </nav>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-[#1e2a44]/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,193,202,0.12)_0%,_transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[minmax(0,1fr)_360px] md:py-14">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative mx-auto aspect-square w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#1e2a44] shadow-2xl md:mx-0">
              <Image src={drop.cover} alt={drop.title} fill className="object-cover" priority sizes="280px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2">
                {isPresale && (
                  <span className="rounded-full border border-[#3bc1ca]/30 bg-[#3bc1ca]/10 px-2.5 py-1 text-[10px] font-bold text-[#3bc1ca]">
                    גיוס פעיל
                  </span>
                )}
                <span
                  className={cn(
                    'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                    tierStyles[drop.tier],
                  )}
                >
                  {CREATOR_TIER_LABELS[drop.tier]}
                </span>
                <Badge tone="muted" className="border border-[#1e2a44] bg-[#0f172a] text-slate-300">
                  {drop.tag}
                </Badge>
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {drop.title}
              </h1>
              <p className="mt-2 text-lg text-[#3bc1ca]">{drop.creatorName}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{drop.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{drop.longDescription}</p>
              <Link
                href={`/club/${drop.clubId}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200"
              >
                מועדון היוצר
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/90 p-6 shadow-xl">
            <p className="text-xs font-medium text-slate-500">מחיר אסימון</p>
            <p className="mt-1 font-display text-3xl font-bold text-white" dir="ltr">
              ${drop.price.toFixed(2)}
              <span className="ms-2 text-base font-semibold text-[#3bc1ca]">
                {drop.tokenSymbol}
              </span>
            </p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400">
              <TrendingUp className="h-4 w-4" aria-hidden />
              תשואה שנתית משוערת +{drop.apy.toFixed(1)}%
            </p>

            {isPresale && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">התקדמות גיוס</span>
                  <span className="font-semibold text-[#3bc1ca]">{drop.presaleProgress}%</span>
                </div>
                <ProgressBar value={drop.presaleProgress!} />
                <p className="text-xs text-slate-500">
                  <span dir="ltr">{formatUsdCompact(drop.raisedUsd)}</span> מתוך{' '}
                  <span dir="ltr">{formatUsdCompact(tokenomics.raiseTargetUsd)}</span>
                </p>
              </div>
            )}

            <InvestButton dropId={drop.id} isPresale={Boolean(isPresale)} />
            <p className="mt-3 text-center text-[10px] text-slate-500">
              מוכר {tokenomics.royaltyEquityPct}% מהתמלוגים · חוזה חכם on-chain
            </p>
          </aside>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:py-12">
        <TokenomicsTransparencyPanel
          royaltyEquityPct={tokenomics.royaltyEquityPct}
          raiseAmount={tokenomics.raiseTargetUsd}
          includeLiquidityPool={tokenomics.includeLiquidityPool}
          platformFeePct={tokenomics.platformFeePct}
          vestingMonths={tokenomics.vestingMonths}
          raisedSoFar={drop.raisedUsd}
        />
      </main>
    </div>
  )
}
