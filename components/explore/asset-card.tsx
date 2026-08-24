import Image from 'next/image'
import { ArrowUpLeft, TrendingUp } from 'lucide-react'
import { Badge, ProgressBar } from '@/components/primitives'
import { CREATOR_TIER_LABELS, type InvestmentAsset } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

const tierStyles: Record<InvestmentAsset['tier'], string> = {
  Emerging: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  Established: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  Star: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
}

export function AssetCard({ asset }: { asset: InvestmentAsset }) {
  const isPresale = asset.status === 'presale' && asset.presaleProgress != null

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg transition-all duration-300 hover:border-[#3bc1ca]/40 hover:shadow-[0_0_30px_rgba(59,193,202,0.12)]">
      <div className="relative aspect-square overflow-hidden bg-[#0f172a]">
        <Image
          src={asset.cover}
          alt={`עטיפת ${asset.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent opacity-80" />
        {isPresale && (
          <span className="absolute top-3 right-3 rounded-full border border-[#3bc1ca]/30 bg-[#070b14]/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#3bc1ca] backdrop-blur-sm">
            טרום-מכירה
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight text-white">{asset.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{asset.creatorName}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold',
              tierStyles[asset.tier],
            )}
          >
            {CREATOR_TIER_LABELS[asset.tier]}
          </span>
          <Badge tone="muted" className="border border-[#1e2a44] bg-[#0f172a] text-slate-300">
            {asset.tag}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#1e2a44] bg-[#0f172a]/60 p-3">
          <div>
            <p className="text-[10px] font-medium tracking-wide text-slate-500">מחיר טוקן</p>
            <p className="mt-0.5 text-lg font-bold text-white">${asset.price.toFixed(2)}</p>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-medium tracking-wide text-slate-500">תשואה שנתית</p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-lg font-bold text-emerald-400">
              <TrendingUp className="h-4 w-4" aria-hidden />
              +{asset.apy.toFixed(1)}%
            </p>
          </div>
        </div>

        {isPresale && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">התקדמות גיוס</span>
              <span className="font-semibold text-[#3bc1ca]">{asset.presaleProgress}% מומן</span>
            </div>
            <ProgressBar value={asset.presaleProgress!} />
          </div>
        )}

        <button
          type="button"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-[#3bc1ca]/40 bg-[#3bc1ca]/10 py-3 text-sm font-bold text-[#3bc1ca] transition-all hover:border-[#3bc1ca] hover:bg-[#3bc1ca] hover:text-[#070b14]"
        >
          {isPresale ? 'השקעה' : 'צפייה בנכס'}
          <ArrowUpLeft className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  )
}
