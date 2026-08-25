'use client'

import Link from 'next/link'
import {
  LayoutDashboard,
  Layers,
  MessageCircle,
  PlusCircle,
  Settings,
  Users,
} from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { STUDIO_NAV, type StudioNavId } from '@/lib/creator-studio-data'
import { cn } from '@/lib/utils'

const NAV_ICONS: Record<StudioNavId, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  drops: Layers,
  community: Users,
  'create-drop': PlusCircle,
  settings: Settings,
}

type StudioSidebarProps = {
  active: StudioNavId
  onNavigate: (id: StudioNavId) => void
  clubId: string
}

export function StudioSidebar({ active, onNavigate, clubId }: StudioSidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#1e2a44]/80 bg-[#0a101c]/95 lg:w-64 lg:border-b-0 lg:border-s lg:min-h-screen">
      <div className="flex items-center justify-between gap-3 border-b border-[#1e2a44]/60 px-4 py-4 lg:flex-col lg:items-stretch lg:gap-4">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <LogoMark size="header" />
        </Link>
        <p className="text-[10px] font-semibold tracking-wide text-[#3bc1ca]">
          סטודיו יוצרים
        </p>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:px-4 lg:py-5">
        {STUDIO_NAV.map(({ id, label }) => {
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
                  ? 'bg-[#3bc1ca]/15 text-[#3bc1ca] ring-1 ring-[#3bc1ca]/30'
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
          href={`/club/${clubId}`}
          className="flex items-center gap-2 rounded-xl border border-[#1e2a44] bg-[#12192b]/60 px-3 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          צפייה במועדון הציבורי
        </Link>
      </div>
    </aside>
  )
}
