import {
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  Layers,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import {
  formatPct,
  formatUsd,
  type PortfolioTotals,
} from '@/lib/investor-portfolio-data'

export function PortfolioStatCards({ totals }: { totals: PortfolioTotals }) {
  const cards = [
    {
      label: 'סה״כ הושקע',
      value: formatUsd(totals.investedUsd),
      sub: `${totals.activeHoldings} פוזיציות פעילות`,
      icon: Wallet,
      tone: 'text-slate-300',
    },
    {
      label: 'שווי תיק נוכחי',
      value: formatUsd(totals.currentValueUsd),
      sub: (
        <span
          className={
            totals.roiUp ? 'inline-flex items-center gap-1 text-emerald-400' : 'text-rose-400'
          }
        >
          {totals.roiUp ? (
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
          )}
          {formatPct(totals.roiPct)} ROI
        </span>
      ),
      icon: TrendingUp,
      tone: totals.roiUp ? 'text-emerald-400' : 'text-rose-400',
    },
    {
      label: 'תמלוגים שהתקבלו',
      value: formatUsd(totals.royaltiesReceivedUsd),
      sub: 'ישירות מהחוזים החכמים',
      icon: Coins,
      tone: 'text-amber-400',
    },
    {
      label: 'מועדונים',
      value: String(totals.clubsJoined),
      sub: 'גישה לתוכן בלעדי',
      icon: Layers,
      tone: 'text-violet-400',
    },
  ] as const

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, sub, icon: Icon, tone }) => (
        <article
          key={label}
          className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 p-5 shadow-lg transition-colors hover:border-emerald-500/25"
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
    </div>
  )
}
