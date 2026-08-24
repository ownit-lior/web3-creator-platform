'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type CategoryCarouselProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function CategoryCarousel({
  title,
  subtitle,
  children,
  className,
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    // LTR scroll container: start = left, end = right
    setCanScrollStart(el.scrollLeft > 4)
    setCanScrollEnd(el.scrollLeft < maxScroll - 4)
  }, [])

  const scroll = (direction: 'start' | 'end') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: direction === 'start' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className={cn('relative', className)}>
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          {/* In RTL UI: "next" points left visually */}
          <button
            type="button"
            onClick={() => scroll('end')}
            disabled={!canScrollEnd}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e2a44] bg-[#12192b] text-slate-300 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={`גלול ${title} קדימה`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('start')}
            disabled={!canScrollStart}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e2a44] bg-[#12192b] text-slate-300 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={`גלול ${title} אחורה`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#070b14] to-transparent transition-opacity md:w-12',
            canScrollStart ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#070b14] to-transparent transition-opacity md:w-12',
            canScrollEnd ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Keep LTR scroll math stable while page is RTL */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          dir="ltr"
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
      </div>
    </section>
  )
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[280px] shrink-0 sm:w-[300px]" dir="rtl">
      {children}
    </div>
  )
}
