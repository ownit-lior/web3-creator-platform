'use client'

import { Flame, Rocket, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ExploreTab = 'investments' | 'clubs' | 'drops'

const TABS: { id: ExploreTab; label: string; icon: typeof Flame }[] = [
  { id: 'investments', label: 'השקעות חמות', icon: Flame },
  { id: 'clubs', label: 'מועדונים וקהילות', icon: Users },
  { id: 'drops', label: 'השקות קרובות', icon: Rocket },
]

type ExploreTabsProps = {
  active: ExploreTab
  onChange: (tab: ExploreTab) => void
}

export function ExploreTabs({ active, onChange }: ExploreTabsProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#1e2a44]/80 bg-[#070b14]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all',
                isActive
                  ? 'bg-[#3bc1ca]/15 text-[#3bc1ca] shadow-[0_0_20px_rgba(59,193,202,0.15)] ring-1 ring-[#3bc1ca]/30'
                  : 'text-slate-400 hover:bg-[#12192b] hover:text-white',
              )}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
