'use client'

import Image from 'next/image'
import { Bell, BellRing, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/primitives'
import type { UpcomingDrop } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function getTimeLeft(launchAt: string): TimeLeft {
  const diff = new Date(launchAt).getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-[#1e2a44] bg-[#0f172a]/80 px-2.5 py-2 min-w-[52px]">
      <span className="text-lg font-bold tabular-nums text-[#3bc1ca]">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
    </div>
  )
}

export function UpcomingDropCard({ drop }: { drop: UpcomingDrop }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(drop.launchAt))
  const [reminded, setReminded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(drop.launchAt))
    }, 1000)
    return () => clearInterval(timer)
  }, [drop.launchAt])

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg transition-all duration-300 hover:border-[#3bc1ca]/40 hover:shadow-[0_0_30px_rgba(59,193,202,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0f172a]">
        <Image
          src={drop.cover}
          alt={`${drop.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-[#070b14]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
          <Clock className="h-3 w-3" aria-hidden />
          Coming Soon
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight text-white">{drop.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{drop.creatorName}</p>
        </div>

        <Badge tone="muted" className="w-fit border border-[#1e2a44] bg-[#0f172a] text-slate-300">
          {drop.tag}
        </Badge>

        <p className="text-sm leading-relaxed text-slate-400">{drop.description}</p>

        {timeLeft.expired ? (
          <p className="text-center text-sm font-semibold text-emerald-400">Now Live!</p>
        ) : (
          <div className="flex justify-center gap-2">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hrs" />
            <CountdownUnit value={timeLeft.minutes} label="Min" />
            <CountdownUnit value={timeLeft.seconds} label="Sec" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setReminded((prev) => !prev)}
          className={cn(
            'mt-auto flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-all',
            reminded
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
              : 'border-[#3bc1ca]/40 bg-[#3bc1ca]/10 text-[#3bc1ca] hover:border-[#3bc1ca] hover:bg-[#3bc1ca] hover:text-[#070b14]',
          )}
        >
          {reminded ? (
            <>
              <BellRing className="h-4 w-4" aria-hidden />
              Reminder Set
            </>
          ) : (
            <>
              <Bell className="h-4 w-4" aria-hidden />
              Remind Me
            </>
          )}
        </button>
      </div>
    </article>
  )
}
