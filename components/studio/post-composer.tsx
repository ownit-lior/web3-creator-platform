'use client'

import { useState } from 'react'
import {
  BarChart3,
  ImagePlus,
  Lock,
  Mic,
  Send,
  Sparkles,
} from 'lucide-react'
import { Textarea } from '@/components/primitives'
import {
  VISIBILITY_OPTIONS,
  type VisibilityTier,
} from '@/lib/creator-studio-data'
import { cn } from '@/lib/utils'

const selectClassName = cn(
  'h-11 w-full rounded-xl border border-[#1e2a44] bg-[#0f172a]/80 px-3 text-sm text-white outline-none transition-colors',
  'focus-visible:border-[#3bc1ca]/50 focus-visible:ring-2 focus-visible:ring-[#3bc1ca]/20',
)

export function PostComposer() {
  const [draft, setDraft] = useState('')
  const [visibility, setVisibility] = useState<VisibilityTier>('insider')
  const [published, setPublished] = useState(false)

  const selected = VISIBILITY_OPTIONS.find((o) => o.value === visibility)

  function handlePublish() {
    if (!draft.trim()) return
    setPublished(true)
    setDraft('')
    setTimeout(() => setPublished(false), 2500)
  }

  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-5 shadow-lg md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#3bc1ca]" aria-hidden />
        <h2 className="text-lg font-bold text-white">פרסום למועדון</h2>
      </div>

      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="שתף/י עדכון, סקיצה, או הזמנה לקהילה…"
        className="min-h-28 border border-[#3bc1ca]/40 bg-slate-800/50 text-white placeholder:text-slate-400 focus-visible:border-[#3bc1ca]/70"
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1e2a44] bg-[#0f172a]/60 text-slate-400 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
          aria-label="צרף תמונה"
        >
          <ImagePlus className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1e2a44] bg-[#0f172a]/60 text-slate-400 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
          aria-label="צרף אודיו"
        >
          <Mic className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1e2a44] bg-[#0f172a]/60 text-slate-400 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
          aria-label="צור סקר"
        >
          <BarChart3 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 space-y-2">
        <label htmlFor="visibility-tier" className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Lock className="h-3.5 w-3.5 text-violet-400" aria-hidden />
          למי הפוסט מיועד?
        </label>
        <select
          id="visibility-tier"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as VisibilityTier)}
          className={selectClassName}
        >
          {VISIBILITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {selected && (
          <p className="text-[11px] text-slate-500">{selected.hint}</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePublish}
          disabled={!draft.trim()}
          className="inline-flex items-center gap-2 rounded-xl border border-[#3bc1ca] bg-[#3bc1ca] px-5 py-3 text-sm font-bold text-[#070b14] transition-all hover:bg-[#5fd4db] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden />
          פרסם פוסט
        </button>
        {published && (
          <span className="text-sm font-semibold text-emerald-400">
            הפוסט פורסם למועדון!
          </span>
        )}
      </div>
    </section>
  )
}
