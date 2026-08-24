'use client'

import { useMemo } from 'react'
import { Percent } from 'lucide-react'

export function RaiseSplitPieChart({
  slices,
  size = 'md',
}: {
  slices: { pct: number; color: string }[]
  size?: 'sm' | 'md' | 'lg'
}) {
  const gradient = useMemo(() => {
    let deg = 0
    const stops = slices.map((slice) => {
      const start = deg
      deg += slice.pct * 3.6
      return `${slice.color} ${start}deg ${deg}deg`
    })
    return `conic-gradient(${stops.join(', ')})`
  }, [slices])

  const dimensions = {
    sm: { outer: 'h-32 w-32', inner: 'h-14 w-14' },
    md: { outer: 'h-44 w-44', inner: 'h-20 w-20' },
    lg: { outer: 'h-52 w-52', inner: 'h-24 w-24' },
  }[size]

  return (
    <div className={`relative mx-auto shrink-0 ${dimensions.outer}`}>
      <div
        className="h-full w-full rounded-full shadow-inner ring-4 ring-[#1e2a44]/60"
        style={{ background: gradient }}
        role="img"
        aria-label="גרף חלוקת גיוס"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex ${dimensions.inner} flex-col items-center justify-center rounded-full bg-[#070b14]/95 text-center`}
        >
          <Percent className="mb-0.5 h-3.5 w-3.5 text-[#3bc1ca]" aria-hidden />
          <span className="text-[10px] text-slate-500">חלוקה</span>
        </div>
      </div>
    </div>
  )
}
