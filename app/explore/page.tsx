'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Compass, Globe, Sparkles } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { AssetCard } from '@/components/explore/asset-card'
import { CategoryCarousel, CarouselItem } from '@/components/explore/category-carousel'
import { ClubCard } from '@/components/explore/club-card'
import { ExploreTabs, type ExploreTab } from '@/components/explore/explore-tabs'
import { UpcomingDropCard } from '@/components/explore/upcoming-drop-card'
import {
  CATEGORY_CONFIG,
  getClubsByCategory,
  getInvestmentsByCategory,
  upcomingDrops,
} from '@/lib/marketplace-data'

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>('investments')

  return (
    <div className="min-h-screen bg-[#070b14] text-white" dir="rtl">
      <header className="border-b border-[#1e2a44]/60 bg-[#070b14]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="transition-opacity hover:opacity-90">
            <LogoMark size="header" />
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-slate-400 transition-colors hover:text-white"
            >
              בית
            </Link>
            <span className="flex items-center gap-1.5 rounded-lg bg-[#3bc1ca]/10 px-3 py-2 font-semibold text-[#3bc1ca]">
              <Compass className="h-4 w-4" aria-hidden />
              גילוי
            </span>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#1e2a44]/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,193,202,0.14)_0%,_transparent_55%)]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-[#3bc1ca]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3bc1ca]/25 bg-[#3bc1ca]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#3bc1ca]">
            <Globe className="h-3.5 w-3.5" aria-hidden />
            כלכלת יוצרים
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            השקיעו בתרבות. הצטרפו למועדון.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            גבו מוזיקאים, אמנים, מפתחי משחקים ומספרים — הרוויחו תשואה אמיתית או פתחו הטבות קהילה
            בלעדיות בכל עולם יצירה.
          </p>
        </div>
      </section>

      <ExploreTabs active={activeTab} onChange={setActiveTab} />

      <main className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        {activeTab === 'investments' && (
          <div className="space-y-12">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-[#3bc1ca]" aria-hidden />
              פוקוס פיננסי — מחיר טוקן, תשואה שנתית והתקדמות גיוס
            </div>
            {CATEGORY_CONFIG.map((cat) => {
              const assets = getInvestmentsByCategory(cat.id)
              return (
                <CategoryCarousel
                  key={cat.id}
                  title={cat.investmentTitle}
                  subtitle={`${assets.length} הזדמנויות`}
                >
                  {assets.map((asset) => (
                    <CarouselItem key={asset.id}>
                      <AssetCard asset={asset} />
                    </CarouselItem>
                  ))}
                </CategoryCarousel>
              )
            })}
          </div>
        )}

        {activeTab === 'clubs' && (
          <div className="space-y-12">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-violet-400" aria-hidden />
              פוקוס קהילה — חברים, הטבות ודרגות לפי אחזקת מניות
            </div>
            {CATEGORY_CONFIG.map((cat) => {
              const clubs = getClubsByCategory(cat.id)
              return (
                <CategoryCarousel
                  key={cat.id}
                  title={cat.clubTitle}
                  subtitle={`${clubs.length} מועדונים`}
                >
                  {clubs.map((club) => (
                    <CarouselItem key={club.id}>
                      <ClubCard club={club} />
                    </CarouselItem>
                  ))}
                </CategoryCarousel>
              )
            })}
          </div>
        )}

        {activeTab === 'drops' && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-amber-400" aria-hidden />
              פרויקטים שיושקו בקרוב — הגדירו תזכורת לפני שההשקעה נפתחת
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingDrops.map((drop) => (
                <UpcomingDropCard key={drop.id} drop={drop} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
