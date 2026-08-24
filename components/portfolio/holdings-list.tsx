'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import {
  formatPct,
  formatUsd,
  type PortfolioHolding,
} from '@/lib/investor-portfolio-data'
import { cn } from '@/lib/utils'

export function HoldingsList({
  holdings,
  compact = false,
}: {
  holdings: PortfolioHolding[]
  compact?: boolean
}) {
  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg">
      <div className={cn('px-5 py-4', compact ? 'pb-2' : 'border-b border-[#1e2a44]/60')}>
        <h2 className="text-lg font-bold text-white">
          {compact ? 'תיק אסימונים' : 'תיק אסימונים'}
        </h2>
        {!compact && (
          <p className="mt-0.5 text-xs text-slate-500">כל הפוזיציות שלך לפי יוצר</p>
        )}
      </div>

      <ul className="divide-y divide-[#1e2a44]/60">
        {holdings.map((holding) => (
          <li key={holding.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#1e2a44]">
              <Image
                src={holding.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-white">{holding.creatorName}</p>
                <span className="rounded-md bg-[#1e2a44] px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                  {holding.tier}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {holding.assetName} ·{' '}
                <span dir="ltr" className="text-[#3bc1ca]">
                  {holding.tokenSymbol}
                </span>{' '}
                · {holding.tokensHeld} אסימונים
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-right sm:grid-cols-3">
              <div>
                <p className="text-[10px] text-slate-500">הושקע</p>
                <p className="text-sm font-semibold text-white" dir="ltr">
                  {formatUsd(holding.investedUsd)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">שווי נוכחי</p>
                <p className="text-sm font-semibold text-white" dir="ltr">
                  {formatUsd(holding.currentValueUsd)}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] text-slate-500">ROI</p>
                <p
                  className={cn(
                    'inline-flex items-center gap-0.5 text-sm font-bold',
                    holding.roiUp ? 'text-emerald-400' : 'text-rose-400',
                  )}
                  dir="ltr"
                >
                  {holding.roiUp ? (
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
                  )}
                  {formatPct(holding.roiPct)}
                </p>
              </div>
            </div>

            <Link
              href={`/club/${holding.clubId}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#1e2a44] px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
            >
              מועדון
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
