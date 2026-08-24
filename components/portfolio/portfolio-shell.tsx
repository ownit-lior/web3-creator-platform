'use client'

import { useState } from 'react'
import { PortfolioSidebar } from '@/components/portfolio/portfolio-sidebar'
import {
  PortfolioClubsSection,
  PortfolioHoldingsSection,
  PortfolioOverviewSection,
  PortfolioRoyaltiesSection,
} from '@/components/portfolio/portfolio-sections'
import type { PortfolioNavId } from '@/lib/investor-portfolio-data'

export function PortfolioShell() {
  const [active, setActive] = useState<PortfolioNavId>('overview')

  function navigate(id: PortfolioNavId) {
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white" dir="rtl">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <PortfolioSidebar active={active} onNavigate={navigate} />

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10">
          {active === 'overview' && <PortfolioOverviewSection />}
          {active === 'holdings' && <PortfolioHoldingsSection />}
          {active === 'royalties' && <PortfolioRoyaltiesSection />}
          {active === 'clubs' && <PortfolioClubsSection />}
        </main>
      </div>
    </div>
  )
}
