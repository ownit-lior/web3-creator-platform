'use client'

import Image from 'next/image'
import { Coins } from 'lucide-react'
import {
  formatUsdDetailed,
  type RoyaltyPayment,
} from '@/lib/investor-portfolio-data'

export function RoyaltiesFeed({
  payments,
  compact = false,
}: {
  payments: RoyaltyPayment[]
  compact?: boolean
}) {
  const items = compact ? payments.slice(0, 4) : payments

  return (
    <section className="rounded-2xl border border-[#1e2a44] bg-[#12192b]/80 shadow-lg">
      <div className="border-b border-[#1e2a44]/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-amber-400" aria-hidden />
          <h2 className="text-lg font-bold text-white">
            {compact ? 'תמלוגים אחרונים' : 'היסטוריית תמלוגים'}
          </h2>
        </div>
        {!compact && (
          <p className="mt-0.5 text-xs text-slate-500">
            חלוקה אוטומטית מהחוזים החכמים — 100% למחזיקים
          </p>
        )}
      </div>

      <ul className="divide-y divide-[#1e2a44]/60">
        {items.map((payment) => (
          <li
            key={payment.id}
            className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#0f172a]/40"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#1e2a44]">
              <Image
                src={payment.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {payment.creatorName}
              </p>
              <p className="text-[11px] text-slate-500">
                {payment.assetName} · {payment.period}
              </p>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-emerald-400" dir="ltr">
                +{formatUsdDetailed(payment.amountUsd)}
              </p>
              <p className="text-[10px] text-slate-500">{payment.receivedAt}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
