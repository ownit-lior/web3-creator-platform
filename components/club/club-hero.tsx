'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Coins,
  TrendingUp,
  Users,
} from 'lucide-react'
import { LogoMark } from '@/components/logo'
import type { ClubPageDetail } from '@/lib/club-page-data'
import { cn } from '@/lib/utils'

function formatMembers(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`
  return count.toLocaleString('he-IL')
}

export function ClubHero({ club }: { club: ClubPageDetail }) {
  const isMember = club.membership.tokensHeld > 0

  return (
    <section className="relative overflow-hidden border-b border-[#1e2a44]/60">
      <div className="relative h-44 w-full sm:h-56 md:h-64 lg:h-72">
        <Image
          src={club.banner}
          alt={`קאבר של ${club.name}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/55 to-[#070b14]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,193,202,0.18)_0%,_transparent_50%)]" />

        <div className="absolute top-4 right-4 left-4 z-10 mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/explore" className="transition-opacity hover:opacity-90">
            <LogoMark size="header" />
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e2a44]/80 bg-[#070b14]/70 px-3 py-2 text-sm text-slate-300 backdrop-blur-md transition-colors hover:border-[#3bc1ca]/40 hover:text-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
            חזרה לגילוי
          </Link>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8">
        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-[#070b14] bg-[#12192b] shadow-[0_0_30px_rgba(59,193,202,0.25)] sm:h-28 sm:w-28">
              <Image
                src={club.avatar}
                alt={club.creatorName}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            <div className="min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {club.name}
                </h1>
                <BadgeCheck className="h-5 w-5 text-[#3bc1ca]" aria-label="מאומת" />
              </div>
              <p className="mt-1 text-sm text-slate-300">
                {club.creatorName}
                <span className="mx-2 text-slate-600">|</span>
                {club.categoryLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1e2a44] bg-[#12192b]/80 px-2.5 py-1">
                  <Users className="h-3.5 w-3.5 text-violet-400" aria-hidden />
                  {formatMembers(club.memberCount)} חברים
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1e2a44] bg-[#12192b]/80 px-2.5 py-1">
                  <Coins className="h-3.5 w-3.5 text-[#3bc1ca]" aria-hidden />
                  {club.tokenSymbol}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1e2a44] bg-[#12192b]/80 px-2.5 py-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                  ${club.tokenPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all md:w-auto',
              'border border-[#3bc1ca] bg-[#3bc1ca] text-[#070b14]',
              'shadow-[0_0_28px_rgba(59,193,202,0.35)] hover:bg-[#5fd4db] hover:shadow-[0_0_36px_rgba(59,193,202,0.45)]',
            )}
          >
            <Coins className="h-4 w-4" aria-hidden />
            {isMember ? 'שדרג דרגה · קנה אסימונים' : 'קנה אסימונים כדי להצטרף'}
          </button>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
          {club.bio}
        </p>
      </div>
    </section>
  )
}
