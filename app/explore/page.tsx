'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Compass, Sparkles } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { AssetCard } from '@/components/explore/asset-card'
import { ExploreFilters } from '@/components/explore/explore-filters'
import {
  marketplaceAssets,
  type ArtistTier,
  type MusicGenre,
  type SortOption,
} from '@/lib/marketplace-data'

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState<MusicGenre | 'all'>('all')
  const [tier, setTier] = useState<ArtistTier | 'all'>('all')
  const [sort, setSort] = useState<SortOption>('apy-desc')

  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase()

    let items = marketplaceAssets.filter((asset) => {
      const matchesSearch =
        !query ||
        asset.songName.toLowerCase().includes(query) ||
        asset.artistName.toLowerCase().includes(query)
      const matchesGenre = genre === 'all' || asset.genre === genre
      const matchesTier = tier === 'all' || asset.tier === tier
      return matchesSearch && matchesGenre && matchesTier
    })

    items = [...items].sort((a, b) => {
      if (sort === 'apy-desc') return b.apy - a.apy
      if (sort === 'price-asc') return a.price - b.price
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    })

    return items
  }, [search, genre, tier, sort])

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      {/* Top nav */}
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
              Home
            </Link>
            <span className="flex items-center gap-1.5 rounded-lg bg-[#3bc1ca]/10 px-3 py-2 font-semibold text-[#3bc1ca]">
              <Compass className="h-4 w-4" aria-hidden />
              Explore
            </span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1e2a44]/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,193,202,0.14)_0%,_transparent_55%)]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-[#3bc1ca]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3bc1ca]/25 bg-[#3bc1ca]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3bc1ca]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Music Marketplace
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Discover &amp; Invest in Music
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Browse verified song equity, earn real-world royalties, and back the artists you believe
            in — before the charts catch up.
          </p>
        </div>
      </section>

      {/* Filters */}
      <ExploreFilters
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        tier={tier}
        onTierChange={setTier}
        sort={sort}
        onSortChange={setSort}
        resultCount={filteredAssets.length}
      />

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1e2a44] bg-[#12192b]/40 px-6 py-20 text-center">
            <Compass className="mb-4 h-10 w-10 text-slate-600" aria-hidden />
            <h2 className="text-xl font-semibold text-white">No assets match your filters</h2>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              Try adjusting your search, genre, or tier filters to discover more music investments.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
