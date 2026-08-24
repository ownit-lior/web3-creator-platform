'use client'

import Link from 'next/link'
import { Compass } from 'lucide-react'
import { ClubsMemberships } from '@/components/portfolio/clubs-memberships'
import { HoldingsList } from '@/components/portfolio/holdings-list'
import { PortfolioStatCards } from '@/components/portfolio/portfolio-stat-cards'
import { RoyaltiesFeed } from '@/components/portfolio/royalties-feed'
import {
  clubMemberships,
  portfolioHoldings,
  portfolioInvestor,
  portfolioTotals,
  royaltyPayments,
} from '@/lib/investor-portfolio-data'

export function PortfolioOverviewSection() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-slate-400">שלום,</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {portfolioInvestor.name}
        </h1>
        <p className="mt-1 text-sm text-emerald-400">
          משקיע · פרופיל {portfolioInvestor.riskProfile}
        </p>
      </header>

      <PortfolioStatCards totals={portfolioTotals} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <HoldingsList holdings={portfolioHoldings.slice(0, 3)} compact />
        <RoyaltiesFeed payments={royaltyPayments} compact />
      </div>

      <ClubsMemberships memberships={clubMemberships} />

      <section className="rounded-2xl border border-dashed border-[#1e2a44] bg-[#12192b]/40 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">מחפש/ת השקעה חדשה?</p>
            <p className="mt-1 text-xs text-slate-400">
              גלה drops חמים, מועדונים ופרויקטים עתידיים
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20"
          >
            <Compass className="h-4 w-4" aria-hidden />
            גילוי השקעות
          </Link>
        </div>
      </section>
    </div>
  )
}

export function PortfolioHoldingsSection() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">תיק אסימונים</h1>
        <p className="mt-1 text-sm text-slate-400">
          {portfolioHoldings.length} פוזיציות · שווי כולל ${portfolioTotals.currentValueUsd.toLocaleString()}
        </p>
      </header>
      <HoldingsList holdings={portfolioHoldings} />
    </div>
  )
}

export function PortfolioRoyaltiesSection() {
  const total = royaltyPayments.reduce((sum, p) => sum + p.amountUsd, 0)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">תמלוגים</h1>
        <p className="mt-1 text-sm text-slate-400">
          סה״כ ${total.toFixed(0)} בתקופה המוצגת · מגיע ישירות מהחוזים החכמים
        </p>
      </header>
      <RoyaltiesFeed payments={royaltyPayments} />
    </div>
  )
}

export function PortfolioClubsSection() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">מועדונים</h1>
        <p className="mt-1 text-sm text-slate-400">
          {clubMemberships.length} מועדונים פעילים לפי דרגת האסימונים שלך
        </p>
      </header>
      <ClubsMemberships memberships={clubMemberships} />
    </div>
  )
}
