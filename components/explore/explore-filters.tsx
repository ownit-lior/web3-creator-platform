'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/primitives'
import {
  GENRE_OPTIONS,
  SORT_OPTIONS,
  TIER_OPTIONS,
  type ArtistTier,
  type MusicGenre,
  type SortOption,
} from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

type ExploreFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  genre: MusicGenre | 'all'
  onGenreChange: (value: MusicGenre | 'all') => void
  tier: ArtistTier | 'all'
  onTierChange: (value: ArtistTier | 'all') => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
  resultCount: number
}

const selectClassName = cn(
  'h-11 w-full rounded-xl border border-[#1e2a44] bg-[#0f172a]/80 px-3 text-sm text-white outline-none transition-colors',
  'focus-visible:border-[#3bc1ca]/50 focus-visible:ring-2 focus-visible:ring-[#3bc1ca]/20',
)

export function ExploreFilters({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  tier,
  onTierChange,
  sort,
  onSortChange,
  resultCount,
}: ExploreFiltersProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#1e2a44]/80 bg-[#070b14]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <Search
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden
          />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חיפוש אמן או יצירה..."
            className="border-[#1e2a44] bg-[#0f172a]/80 pr-10 text-white placeholder:text-slate-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-3">
          <select
            value={genre}
            onChange={(e) => onGenreChange(e.target.value as MusicGenre | 'all')}
            className={selectClassName}
            aria-label="סינון לפי ז׳אנר"
          >
            {GENRE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={tier}
            onChange={(e) => onTierChange(e.target.value as ArtistTier | 'all')}
            className={selectClassName}
            aria-label="סינון לפי דרגה"
          >
            {TIER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className={selectClassName}
            aria-label="מיון נכסים"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 pb-3 text-xs text-slate-500">
        <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
        <span>
          מוצגים <span className="font-semibold text-slate-300">{resultCount}</span> נכסים
        </span>
      </div>
    </div>
  )
}
