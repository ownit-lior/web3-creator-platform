import {
  ArrowUpRight,
  Coins,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  formatNumber,
  formatUsd,
  type StudioAnalytics,
} from '@/lib/creator-studio-data'

export function StudioStatCards({ analytics }: { analytics: StudioAnalytics }) {
  const cards = [
    {
      label: 'סך הגיוס',
      value: formatUsd(analytics.totalRaised),
      sub: 'מכל הפרויקטים',
      icon: DollarSign,
      tone: 'text-[#3bc1ca]',
    },
    {
      label: 'מחזיקים פעילים',
      value: formatNumber(analytics.activeHolders),
      sub: 'מעריצים ומשקיעים',
      icon: Users,
      tone: 'text-violet-400',
    },
    {
      label: 'מחיר רצפה',
      value: `$${analytics.floorPrice.toFixed(2)}`,
      sub: (
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />+
          {analytics.floorChangePct.toFixed(1)}%
        </span>
      ),
      icon: TrendingUp,
      tone: 'text-emerald-400',
    },
    {
      label: 'תמלוגים שחולקו',
      value: formatUsd(analytics.royaltiesDistributed),
      sub: 'חזרה למשקיעים',
      icon: Coins,
      tone: 'text-amber-400',
    },
  ] as const

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, sub, icon: Icon, tone }) => (
        <article
          key={label}
          className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-5 shadow-lg transition-colors hover:border-[#3bc1ca]/25"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <Icon className={`h-4 w-4 ${tone}`} aria-hidden />
          </div>
          <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {value}
          </p>
          <div className="mt-1.5 text-xs text-slate-400">{sub}</div>
        </article>
      ))}

      <article className="rounded-2xl border border-[#1e2a44]/80 bg-gradient-to-l from-[#3bc1ca]/10 to-transparent p-5 sm:col-span-2 xl:col-span-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-slate-500">שווי שוק</p>
            <p className="mt-1 font-display text-2xl font-bold text-white">
              {formatUsd(analytics.marketCap)}
            </p>
          </div>
          <p className="text-xs text-slate-400">
            מחושב לפי מחיר הרצפה × אסימונים במחזור
          </p>
        </div>
      </article>
    </div>
  )
}
