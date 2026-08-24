'use client'

import Link from 'next/link'
import {
  Coins,
  Compass,
  LayoutDashboard,
  Layers,
  Users,
} from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { PORTFOLIO_NAV, type PortfolioNavId } from '@/lib/investor-portfolio-data'
import { cn } from '@/lib/utils'

const NAV_ICONS: Record<PortfolioNavId, typeof LayoutDashboard> = {
  overview: LayoutDashboard,
  holdings: Layers,
  royalties: Coins,
  clubs: Users,
}

type PortfolioSidebarProps = {
  active: PortfolioNavId
  onNavigate: (id: PortfolioNavId) => void
}

export function PortfolioSidebar({ active, onNavigate }: PortfolioSidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#1e2a44]/80 bg-[#0a101c]/95 lg:w-64 lg:border-b-0 lg:border-s lg:min-h-screen">
      <div className="flex items-center justify-between gap-3 border-b border-[#1e2a44]/60 px-4 py-4 lg:flex-col lg:items-stretch lg:gap-4">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <LogoMark size="header" />
        </Link>
        <p className="text-[10px] font-semibold tracking-wide text-emerald-400">
          תיק משקיע
        </p>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:px-4 lg:py-5">
        {PORTFOLIO_NAV.map(({ id, label }) => {
          const Icon = NAV_ICONS[id]
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={cn(
                'flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all lg:w-full',
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
                  : 'text-slate-400 hover:bg-[#12192b] hover:text-white',
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto hidden border-t border-[#1e2a44]/60 p-4 lg:block">
        <Link
          href="/explore"
          className="flex items-center gap-2 rounded-xl border border-[#1e2a44] bg-[#12192b]/60 px-3 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
        >
          <Compass className="h-4 w-4" aria-hidden />
          גלה השקעות חדשות
        </Link>
      </div>
    </aside>
  )
}
