'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  ExternalLink,
  ImagePlus,
  Rocket,
  Save,
  Shield,
  User,
} from 'lucide-react'
import { PostComposer } from '@/components/studio/post-composer'
import { StudioStatCards } from '@/components/studio/studio-stat-cards'
import { TopShareholders } from '@/components/studio/top-shareholders'
import { Field, Input } from '@/components/primitives'
import {
  formatNumber,
  formatUsd,
  studioAnalytics,
  studioCreator,
  studioDrops,
  topShareholders,
  type StudioDrop,
} from '@/lib/creator-studio-data'
import { cn } from '@/lib/utils'

const DROP_STATUS_LABEL: Record<StudioDrop['status'], string> = {
  live: 'פעיל',
  presale: 'presale',
  draft: 'טיוטה',
}

const DROP_STATUS_CLASS: Record<StudioDrop['status'], string> = {
  live: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  presale: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  draft: 'border-slate-500/40 bg-slate-500/10 text-slate-400',
}

const inputClassName = cn(
  'h-11 w-full rounded-xl border border-[#1e2a44] bg-[#0f172a]/80 px-3 text-sm text-white outline-none transition-colors',
  'focus-visible:border-[#3bc1ca]/50 focus-visible:ring-2 focus-visible:ring-[#3bc1ca]/20',
)

type NavigateProps = {
  onCreateDrop?: () => void
}

export function StudioDashboardOverview({ onCreateDrop }: NavigateProps) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-400">ברוך/ה הבא/ה,</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {studioCreator.stageName}
          </h1>
          <p className="mt-1 text-sm text-[#3bc1ca]">{studioCreator.category}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-[#1e2a44] bg-[#12192b]/80 px-4 py-3 text-right">
            <p className="text-[10px] text-slate-500">שווי שוק</p>
            <p className="text-lg font-bold text-white">
              {formatUsd(studioAnalytics.marketCap)}
            </p>
          </div>
          <Link
            href={`/club/${studioCreator.clubId}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[#3bc1ca]/40 bg-[#3bc1ca]/10 px-4 py-3 text-sm font-semibold text-[#3bc1ca] transition-all hover:bg-[#3bc1ca] hover:text-[#070b14]"
          >
            צפייה במועדון
            <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </header>

      <StudioStatCards analytics={studioAnalytics} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <PostComposer />
        <TopShareholders shareholders={topShareholders} />
      </div>

      <section className="rounded-2xl border border-dashed border-[#1e2a44] bg-[#12192b]/40 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">מוכן/ה להשיק פרויקט חדש?</p>
            <p className="mt-1 text-xs text-slate-400">
              הנפק שיר, קומיקס או משחק — הגדר אחוזים למכירה והפעל presale
            </p>
          </div>
          <button
            type="button"
            onClick={onCreateDrop}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2.5 text-sm font-bold text-violet-300 transition-colors hover:bg-violet-500/20"
          >
            <Rocket className="h-4 w-4" aria-hidden />
            השקה חדשה
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </section>
    </div>
  )
}

export function StudioDropsSection({ onCreateDrop }: NavigateProps) {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">הפרויקטים שלי</h1>
          <p className="mt-1 text-sm text-slate-400">ניהול drops, presale והקצאת equity</p>
        </div>
        <button
          type="button"
          onClick={onCreateDrop}
          className="inline-flex items-center gap-2 rounded-xl border border-[#3bc1ca] bg-[#3bc1ca] px-4 py-2.5 text-sm font-bold text-[#070b14] transition-all hover:bg-[#5fd4db]"
        >
          <Rocket className="h-4 w-4" aria-hidden />
          השקה חדשה
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {studioDrops.map((drop) => (
          <article
            key={drop.id}
            className="overflow-hidden rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg transition-colors hover:border-[#3bc1ca]/25"
          >
            <div className="relative aspect-video">
              <Image src={drop.cover} alt={drop.title} fill className="object-cover" sizes="33vw" />
              <span
                className={cn(
                  'absolute start-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold',
                  DROP_STATUS_CLASS[drop.status],
                )}
              >
                {DROP_STATUS_LABEL[drop.status]}
              </span>
            </div>
            <div className="space-y-2 p-4">
              <h3 className="font-bold text-white">{drop.title}</h3>
              <p className="text-sm text-slate-400">{formatUsd(drop.raised)} גויסו</p>
              <div className="h-2 overflow-hidden rounded-full bg-[#1e2a44]">
                <div
                  className="h-full rounded-full bg-[#3bc1ca]"
                  style={{ width: `${drop.equitySoldPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{drop.equitySoldPct}% equity נמכר</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function StudioCommunitySection() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">הקהילה</h1>
        <p className="mt-1 text-sm text-slate-400">
          תקשורת עם המעריצים, gating לפי דרגות ו-CRM ללוויתנים
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'חברי מועדון', value: formatNumber(studioAnalytics.activeHolders) },
          { label: 'פוסטים החודש', value: '24' },
          { label: 'סקרים פעילים', value: '2' },
          { label: 'הודעות VIP', value: '18' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-4 text-center"
          >
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <PostComposer />
        <TopShareholders shareholders={topShareholders} />
      </div>
    </div>
  )
}

export function StudioCreateDropSection() {
  const [title, setTitle] = useState('')
  const [equityPct, setEquityPct] = useState('25')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">השקה חדשה</h1>
        <p className="mt-1 text-sm text-slate-400">
          הנפק יצירה חדשה — הגדר שם, תמונת נושא ואחוז equity למכירה
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-6 shadow-lg"
      >
        <Field label="שם היצירה" htmlFor="drop-title">
          <Input
            id="drop-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="למשל: חלומות ניאון — EP"
            className="border-[#1e2a44] bg-[#0f172a]/60 text-white placeholder:text-slate-500"
          />
        </Field>

        <div className="space-y-2">
          <p className="text-sm font-medium text-white">תמונת נושא</p>
          <button
            type="button"
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#1e2a44] bg-[#0f172a]/40 px-4 py-10 text-slate-400 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
          >
            <ImagePlus className="h-8 w-8" aria-hidden />
            <span className="text-sm">גרור/י קובץ או לחץ/י להעלאה</span>
          </button>
        </div>

        <Field
          label="אחוז equity למכירה"
          htmlFor="drop-equity"
          hint="כמה אחוזים מהפרויקט את/ה מוכן/ה למכור לקהילה"
        >
          <div className="flex items-center gap-3">
            <Input
              id="drop-equity"
              type="number"
              min={1}
              max={100}
              value={equityPct}
              onChange={(e) => setEquityPct(e.target.value)}
              className="border-[#1e2a44] bg-[#0f172a]/60 text-white"
            />
            <span className="text-sm font-semibold text-[#3bc1ca]">%</span>
          </div>
        </Field>

        <div className="rounded-xl border border-[#1e2a44]/80 bg-[#0f172a]/40 p-4">
          <p className="text-xs font-semibold text-slate-400">תצוגה מקדימה</p>
          <p className="mt-2 text-sm text-white">
            {title.trim() || 'שם הפרויקט'} · {equityPct}% equity למכירה
          </p>
          <p className="mt-1 text-xs text-slate-500">
            החוזים החכמים וה-mint יופעלו אוטומטית לאחר האישור
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#3bc1ca] bg-[#3bc1ca] px-5 py-3 text-sm font-bold text-[#070b14] transition-all hover:bg-[#5fd4db] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Rocket className="h-4 w-4" aria-hidden />
            השק presale
          </button>
          {submitted && (
            <span className="text-sm font-semibold text-emerald-400">
              הפרויקט נשלח לאישור — נודיע כשה-drop יעלה!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export function StudioSettingsSection() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">הגדרות</h1>
        <p className="mt-1 text-sm text-slate-400">פרופיל, התראות ואבטחת חשבון</p>
      </header>

      <section className="space-y-4 rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <User className="h-4 w-4 text-[#3bc1ca]" aria-hidden />
          פרופיל יוצר
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="שם במה" htmlFor="settings-stage">
            <Input
              id="settings-stage"
              defaultValue={studioCreator.stageName}
              className={inputClassName}
            />
          </Field>
          <Field label="קטגוריה" htmlFor="settings-category">
            <Input
              id="settings-category"
              defaultValue={studioCreator.category}
              className={inputClassName}
            />
          </Field>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-[#1e2a44] px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:border-[#3bc1ca]/40 hover:text-[#3bc1ca]"
        >
          <Save className="h-4 w-4" aria-hidden />
          שמור שינויים
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Bell className="h-4 w-4 text-violet-400" aria-hidden />
          התראות
        </div>
        {['הודעה על רכישת אסימון חדש', 'סיכום שבועי של גיוס', 'תגובות VIP במועדון'].map(
          (label) => (
            <label
              key={label}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#1e2a44]/60 bg-[#0f172a]/40 px-4 py-3"
            >
              <span className="text-sm text-slate-300">{label}</span>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-[#1e2a44] accent-[#3bc1ca]"
              />
            </label>
          ),
        )}
      </section>

      <section className="space-y-3 rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Shield className="h-4 w-4 text-emerald-400" aria-hidden />
          אבטחה
        </div>
        <p className="text-xs text-slate-500">
          הארנק מחובר · חתימות on-chain מאובטחות דרך thirdweb
        </p>
        <button
          type="button"
          className="text-sm font-semibold text-[#3bc1ca] hover:underline"
        >
          נתק ארנק
        </button>
      </section>
    </div>
  )
}
