'use client'

import Image from 'next/image'
import { Crown, MessageCircle } from 'lucide-react'
import type { TopShareholder } from '@/lib/creator-studio-data'
import { cn } from '@/lib/utils'

export function TopShareholders({
  shareholders,
}: {
  shareholders: TopShareholder[]
}) {
  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-5 shadow-lg md:p-6">
      <div className="mb-1 flex items-center gap-2">
        <Crown className="h-4 w-4 text-amber-400" aria-hidden />
        <h2 className="text-lg font-bold text-white">CRM מעריצים</h2>
      </div>
      <p className="mb-4 text-xs text-slate-500">
        הלוויתנים שלך — שלח/י הודעה אישית להשקות ו-VIP
      </p>

      <ul className="space-y-2.5">
        {shareholders.map((fan, index) => (
          <li
            key={fan.id}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-3 py-2.5',
              index === 0
                ? 'border-amber-500/35 bg-gradient-to-l from-amber-500/10 to-transparent'
                : 'border-[#1e2a44] bg-[#0f172a]/40',
            )}
          >
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                index === 0
                  ? 'bg-amber-400 text-[#070b14]'
                  : 'bg-[#1e2a44] text-slate-300',
              )}
            >
              {index + 1}
            </span>
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#1e2a44]">
              <Image src={fan.avatar} alt="" fill className="object-cover" sizes="36px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {fan.username}
              </p>
              <p className="text-[11px] text-slate-500">
                {fan.tier} · {fan.tokens} אסימונים
              </p>
            </div>
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e2a44] text-slate-400 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
              aria-label={`שלח הודעה ל-${fan.username}`}
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
