'use client'

import { ClubFeed } from '@/components/club/club-feed'
import { ClubHero } from '@/components/club/club-hero'
import { ClubSidebar } from '@/components/club/club-sidebar'
import { MembershipPanel } from '@/components/club/membership-panel'
import type { ClubPageDetail } from '@/lib/club-page-data'

export function ClubPageView({ club }: { club: ClubPageDetail }) {
  return (
    <div className="min-h-screen bg-[#070b14] text-white" dir="rtl">
      <ClubHero club={club} />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:py-10">
        <MembershipPanel club={club} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ClubFeed club={club} />
          <ClubSidebar club={club} />
        </div>
      </div>
    </div>
  )
}
