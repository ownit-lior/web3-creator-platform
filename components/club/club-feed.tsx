'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  AudioLines,
  Images,
  Lock,
  Play,
  Vote,
  Video,
  FileText,
  Scale,
} from 'lucide-react'
import {
  COMMUNITY_TIER_LABELS,
  canAccessTier,
  type ClubFeedPost,
  type ClubPageDetail,
  type CommunityTier,
} from '@/lib/club-page-data'
import { cn } from '@/lib/utils'

const typeIcon = {
  text: FileText,
  audio: AudioLines,
  gallery: Images,
  video: Video,
  poll: Vote,
} as const

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'short',
  })
}

function UnlockedMedia({ post }: { post: ClubFeedPost }) {
  if (post.type === 'audio') {
    return (
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#1e2a44] bg-[#0f172a]/80 p-4">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3bc1ca] text-[#070b14]"
          aria-label="נגן"
        >
          <Play className="h-5 w-5 fill-current" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-[#1e2a44]">
            <div className="h-full w-1/3 rounded-full bg-[#3bc1ca]" />
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            {post.mediaLabel ?? 'אודיו בלעדי'}
          </p>
        </div>
      </div>
    )
  }

  if (post.type === 'gallery' || post.type === 'video') {
    return (
      <div className="relative mt-4 aspect-video overflow-hidden rounded-xl border border-[#1e2a44]">
        {post.previewImage ? (
          <Image
            src={post.previewImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#0f172a]">
            <Images className="h-8 w-8 text-slate-600" />
          </div>
        )}
        {post.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#070b14]/40">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#3bc1ca]/50 bg-[#070b14]/80 text-[#3bc1ca] backdrop-blur-sm">
              <Play className="h-6 w-6 fill-current" />
            </span>
          </div>
        )}
        {post.mediaLabel && (
          <span className="absolute bottom-3 left-3 rounded-md bg-[#070b14]/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {post.mediaLabel}
          </span>
        )}
      </div>
    )
  }

  return null
}

function PollCard({
  post,
  unlocked,
}: {
  post: ClubFeedPost
  unlocked: boolean
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const options = post.pollOptions ?? []
  const total = options.reduce((s, o) => s + o.votes, 0) || 1

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Scale className="h-3.5 w-3.5 text-[#3bc1ca]" aria-hidden />
        כוח ההצבעה משוקלל לפי כמות האסימונים שבידיכם
      </div>
      {options.map((opt) => {
        const pct = Math.round((opt.votes / total) * 100)
        const isSelected = selected === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            disabled={!unlocked}
            onClick={() => unlocked && setSelected(opt.id)}
            className={cn(
              'relative w-full overflow-hidden rounded-xl border px-4 py-3 text-right transition-all',
              isSelected
                ? 'border-[#3bc1ca]/60 bg-[#3bc1ca]/10'
                : 'border-[#1e2a44] bg-[#0f172a]/60 hover:border-[#3bc1ca]/30',
              !unlocked && 'cursor-not-allowed opacity-60',
            )}
          >
            <div
              className="pointer-events-none absolute inset-y-0 right-0 bg-[#3bc1ca]/15"
              style={{ width: `${pct}%` }}
            />
            <div className="relative flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-white">{opt.label}</span>
              <span className="tabular-nums text-[#3bc1ca]">{pct}%</span>
            </div>
          </button>
        )
      })}
      {unlocked && selected && (
        <p className="text-xs font-semibold text-emerald-400">
          ההצבעה נרשמה · המשקל לפי האסימונים שלך
        </p>
      )}
    </div>
  )
}

function LockedOverlay({
  requiredTier,
}: {
  requiredTier: CommunityTier
}) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#070b14]/55 p-6 text-center backdrop-blur-md">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#3bc1ca]/40 bg-[#070b14]/80 shadow-[0_0_30px_rgba(59,193,202,0.25)]">
        <Lock className="h-6 w-6 text-[#3bc1ca]" aria-hidden />
      </span>
      <p className="max-w-sm text-sm font-semibold text-white">
        פוסט זה פתוח לדרגת {COMMUNITY_TIER_LABELS[requiredTier]} ומעלה
      </p>
      <p className="max-w-xs text-xs text-slate-400">
        שדרג את הסטטוס שלך כדי לפתוח את התוכן הנעול
      </p>
      <button
        type="button"
        className="mt-1 rounded-xl border border-[#3bc1ca]/50 bg-[#3bc1ca]/15 px-4 py-2.5 text-xs font-bold text-[#3bc1ca] transition-all hover:bg-[#3bc1ca] hover:text-[#070b14]"
      >
        פתח עם {COMMUNITY_TIER_LABELS[requiredTier]}
      </button>
    </div>
  )
}

export function FeedPostCard({
  post,
  userTier,
}: {
  post: ClubFeedPost
  userTier: CommunityTier
}) {
  const unlocked = canAccessTier(userTier, post.requiredTier)
  const Icon = typeIcon[post.type]

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-[#12192b]/80 shadow-lg transition-colors',
        unlocked
          ? 'border-[#1e2a44] hover:border-[#3bc1ca]/25'
          : 'border-[#1e2a44]/80',
      )}
    >
      {!unlocked && (
        <>
          {post.previewImage && (
            <div className="absolute inset-0">
              <Image
                src={post.previewImage}
                alt=""
                fill
                className="object-cover opacity-40 blur-sm scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          )}
          <LockedOverlay requiredTier={post.requiredTier} />
        </>
      )}

      <div
        className={cn(
          'relative p-5 md:p-6',
          !unlocked && 'min-h-[280px] select-none',
        )}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-md border border-[#1e2a44] bg-[#0f172a]/80 px-2 py-1 text-slate-300">
            <Icon className="h-3.5 w-3.5 text-[#3bc1ca]" aria-hidden />
            {post.type === 'poll' ? 'הצבעה' : 'פוסט'}
          </span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="rounded-md border border-[#1e2a44] px-2 py-0.5">
            {COMMUNITY_TIER_LABELS[post.requiredTier]}+
          </span>
          {!unlocked && (
            <span className="inline-flex items-center gap-1 text-amber-400">
              <Lock className="h-3 w-3" aria-hidden />
              נעול
            </span>
          )}
        </div>

        <h3
          className={cn(
            'mt-3 text-lg font-bold text-white',
            !unlocked && 'blur-[1px]',
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            'mt-2 text-sm leading-relaxed text-slate-400',
            !unlocked && 'blur-sm',
          )}
        >
          {post.body}
        </p>

        {unlocked && post.type !== 'poll' && <UnlockedMedia post={post} />}
        {post.type === 'poll' && (
          <div className={cn(!unlocked && 'pointer-events-none blur-sm')}>
            <PollCard post={post} unlocked={unlocked} />
          </div>
        )}
      </div>
    </article>
  )
}

export function ClubFeed({ club }: { club: ClubPageDetail }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white">פיד בלעדי</h2>
        <span className="text-xs text-slate-500">
          {club.posts.length} פרסומים
        </span>
      </div>
      {club.posts.map((post) => (
        <FeedPostCard
          key={post.id}
          post={post}
          userTier={club.membership.currentTier}
        />
      ))}
    </div>
  )
}
