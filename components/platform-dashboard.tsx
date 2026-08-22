'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  LineChart,
  Music2,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { RoleToggle } from '@/components/role-toggle'
import { VibeWordmark } from '@/components/vibe-wordmark'
import type { Role } from '@/components/registration-modal'
import { Badge, Card } from '@/components/primitives'
import { cn } from '@/lib/utils'
import {
  artistFinance,
  dashboardArtistProfile,
  dashboardInvestorProfile,
  investorPortfolio,
  investorTotals,
  streamByMonth,
  uploadedSongs,
} from '@/lib/mock-data'

export function PlatformDashboard() {
  const [role, setRole] = useState<Role>('artist')
  const isArtist = role === 'artist'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary">
              <VibeWordmark className="text-base" logoClassName="text-primary" />
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              {isArtist ? 'לוח בקרה לאמן' : 'לוח בקרה למשקיע'}
            </h1>
            <p className="text-sm text-muted-foreground">
              נתוני דמו בלבד — החליפו תצוגה כדי לבדוק את שני המצבים.
            </p>
          </div>
          <RoleToggle role={role} onChange={setRole} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        {isArtist ? <ArtistView /> : <InvestorView />}
      </main>
    </div>
  )
}

function ArtistView() {
  const profile = dashboardArtistProfile
  const maxStream = useMemo(
    () => Math.max(...streamByMonth.flatMap((m) => [m.spotify, m.youtube])),
    [],
  )

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <p className="mb-4 text-sm font-medium text-muted-foreground">פרטים אישיים</p>
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt=""
              className="size-16 rounded-2xl object-cover"
            />
            <div>
              <p className="font-display text-xl font-semibold">{profile.stageName}</p>
              <p className="text-sm text-muted-foreground">{profile.fullName}</p>
              <Badge tone="primary" className="mt-2">
                אמן
              </Badge>
            </div>
          </div>
          <dl className="mt-5 grid gap-2 text-sm">
            <Detail label="אימייל" value={profile.email} />
            <Detail label="ז׳אנר" value={profile.genre} />
            <Detail label="מיקום" value={profile.location} />
            <Detail label="ארנק" value={profile.wallet} mono />
            <Detail label="הצטרפות" value={profile.joined} />
          </dl>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">סה״כ הכנסות</p>
            <Wallet className="size-4 text-success" />
          </div>
          <p className="font-display text-3xl font-semibold text-success">{artistFinance.earningsEth}</p>
          <p className="mt-1 text-sm text-muted-foreground">{artistFinance.earningsUsd}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {artistFinance.earningsBreakdown.map((row) => (
              <li key={row.label} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{row.label}</span>
                <span>{row.value}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">סה״כ הוצאות</p>
            <TrendingUp className="size-4 text-destructive" />
          </div>
          <p className="font-display text-3xl font-semibold">{artistFinance.expensesEth}</p>
          <p className="mt-1 text-sm text-muted-foreground">{artistFinance.expensesUsd}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {artistFinance.expensesBreakdown.map((row) => (
              <li key={row.label} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{row.label}</span>
                <span>{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border pt-3 text-sm">
            נטו: <span className="font-semibold text-primary">{artistFinance.netEth}</span>
            <span className="text-muted-foreground"> · {artistFinance.netUsd}</span>
          </p>
        </Card>
      </section>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Music2 className="size-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">שירים שהועלו</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-right text-sm">
            <thead className="bg-secondary/40 text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">שיר</th>
                <th className="px-3 py-3 font-medium">יציאה</th>
                <th className="px-3 py-3 font-medium">אורך</th>
                <th className="px-3 py-3 font-medium">Spotify</th>
                <th className="px-3 py-3 font-medium">YouTube</th>
                <th className="px-5 py-3 font-medium">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {uploadedSongs.map((song) => (
                <tr key={song.id} className="border-t border-border/70">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={song.cover} alt="" className="size-10 rounded-lg object-cover" />
                      <span className="font-medium">{song.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{song.released}</td>
                  <td className="px-3 py-3 text-muted-foreground">{song.duration}</td>
                  <td className="px-3 py-3">{song.spotify}</td>
                  <td className="px-3 py-3">{song.youtube}</td>
                  <td className="px-5 py-3">
                    <Badge tone={song.status === 'פעיל' ? 'primary' : 'muted'}>{song.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LineChart className="size-4 text-accent" />
            <h2 className="font-display text-lg font-semibold">צפיות והשמעות מצטברות</h2>
          </div>
          <div className="flex gap-4 text-xs">
            <LegendDot className="bg-[#1DB954]" label="Spotify" />
            <LegendDot className="bg-[#FF0033]" label="YouTube" />
          </div>
        </div>
        <div className="grid h-56 grid-cols-6 items-end gap-3 sm:gap-4">
          {streamByMonth.map((row) => (
            <div key={row.month} className="flex h-full flex-col items-center justify-end gap-2">
              <div className="flex h-44 w-full items-end justify-center gap-1">
                <div
                  className="w-3 rounded-t-sm bg-[#1DB954] sm:w-4"
                  style={{ height: `${(row.spotify / maxStream) * 100}%` }}
                  title={`Spotify ${row.spotify}K`}
                />
                <div
                  className="w-3 rounded-t-sm bg-[#FF0033] sm:w-4"
                  style={{ height: `${(row.youtube / maxStream) * 100}%` }}
                  title={`YouTube ${row.youtube}K`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{row.month}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">ערכים באלפי השמעות / צפיות · נתוני דמו ל-6 חודשים אחרונים</p>
      </Card>
    </>
  )
}

function InvestorView() {
  const profile = dashboardInvestorProfile

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <p className="mb-4 text-sm font-medium text-muted-foreground">פרטים אישיים</p>
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt=""
              className="size-16 rounded-2xl object-cover"
            />
            <div>
              <p className="font-display text-xl font-semibold">{profile.fullName}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <Badge tone="accent" className="mt-2">
                משקיע
              </Badge>
            </div>
          </div>
          <dl className="mt-5 grid gap-2 text-sm">
            <Detail label="מיקום" value={profile.location} />
            <Detail label="ארנק" value={profile.wallet} mono />
            <Detail label="פרופיל סיכון" value={profile.risk} />
            <Detail label="הצטרפות" value={profile.joined} />
          </dl>
        </Card>

        <Card className="p-5">
          <p className="mb-3 text-sm font-medium text-muted-foreground">שווי תיק נוכחי</p>
          <p className="font-display text-3xl font-semibold">{investorTotals.currentValue}</p>
          <p className="mt-1 text-sm text-muted-foreground">הושקע {investorTotals.invested}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            הכנסה מצטברת מהשקעות:{' '}
            <span className="font-semibold text-foreground">{investorTotals.revenue}</span>
          </p>
        </Card>

        <Card className="p-5">
          <p className="mb-3 text-sm font-medium text-muted-foreground">סה״כ תשואה (ROI)</p>
          <p className="font-display text-3xl font-semibold text-success">{investorTotals.roi}</p>
          <p className="mt-1 text-sm text-muted-foreground">ממוצע משוקלל על כל הפוזיציות</p>
        </Card>
      </section>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">תיק השקעות</h2>
          <p className="text-sm text-muted-foreground">אמנים ושירים שהושקעו בהם · הכנסה בזמן אמת (דמו)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-right text-sm">
            <thead className="bg-secondary/40 text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">נכס</th>
                <th className="px-3 py-3 font-medium">הושקע</th>
                <th className="px-3 py-3 font-medium">שווי נוכחי</th>
                <th className="px-3 py-3 font-medium">הכנסה שנוצרה</th>
                <th className="px-3 py-3 font-medium">קצב חי</th>
                <th className="px-5 py-3 font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {investorPortfolio.map((item) => (
                <tr key={item.id} className="border-t border-border/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.avatar} alt="" className="size-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{item.artist}</p>
                        <p className="text-xs text-muted-foreground">{item.asset}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">{item.invested}</td>
                  <td className="px-3 py-4">{item.currentValue}</td>
                  <td className="px-3 py-4">{item.revenue}</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-primary">
                      <span className="size-1.5 animate-pulse rounded-full bg-success" />
                      {item.revenuePerHour}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 font-semibold',
                        item.roiUp ? 'text-success' : 'text-destructive',
                      )}
                    >
                      {item.roiUp ? (
                        <ArrowUpRight className="size-4" />
                      ) : (
                        <ArrowDownRight className="size-4" />
                      )}
                      {item.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

function Detail({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn(mono && 'font-mono text-xs')}>{value}</dd>
    </div>
  )
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className={cn('size-2.5 rounded-sm', className)} />
      {label}
    </span>
  )
}
