'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Users } from 'lucide-react'
import type { ClubMembership } from '@/lib/investor-portfolio-data'

export function ClubsMemberships({ memberships }: { memberships: ClubMembership[] }) {
  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg">
      <div className="border-b border-[#1e2a44]/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-violet-400" aria-hidden />
          <h2 className="text-lg font-bold text-white">מועדונים שלי</h2>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">גישה לפי דרגת אסימונים</p>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {memberships.map((club) => (
          <Link
            key={club.clubId}
            href={`/club/${club.clubId}`}
            className="group overflow-hidden rounded-xl border border-[#1e2a44] bg-[#0f172a]/40 transition-all hover:border-violet-500/40 hover:shadow-lg"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={club.cover}
                alt={club.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="33vw"
              />
              {club.unreadPosts > 0 && (
                <span className="absolute start-2 top-2 rounded-full bg-[#3bc1ca] px-2 py-0.5 text-[10px] font-bold text-[#070b14]">
                  {club.unreadPosts} חדש
                </span>
              )}
            </div>
            <div className="space-y-1 p-3">
              <p className="truncate text-sm font-bold text-white">{club.name}</p>
              <p className="text-xs text-slate-500">
                {club.creatorName} · {club.tier} · {club.tokensHeld} אסימונים
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
