'use client'

import { useState } from 'react'
import {
  UploadCloud,
  ImagePlus,
  Video,
  Music2,
  Lock,
  Globe,
  Heart,
  MessageCircle,
  BadgeCheck,
  Send,
  Users,
  TrendingUp,
  Gem,
  Coins,
  Percent,
  Vote,
  Sparkles,
  Plus,
  X,
  Rocket,
  ShieldCheck,
  Star,
  Crown,
  Target,
  Unlock,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, Badge, SectionHeader, Textarea } from '@/components/primitives'
import { communityPosts } from '@/lib/mock-data'

const studioTabs = [
  'פרסום ופיד',
  'אינטראקציה עם מעריצים',
  'הנפקת יצירות כ-NFT',
  'הנפקת טוקנים',
] as const
type StudioTab = (typeof studioTabs)[number]

export function PrivateCommunityView() {
  const [tab, setTab] = useState<StudioTab>('פרסום ופיד')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-gradient-to-l from-primary/15 to-accent/10 p-6 md:flex-row md:items-center">
        <img
          src="/artist-nova.png"
          alt="נובה אוריון"
          className="size-16 rounded-2xl border-2 border-card object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              הקהילה הפרטית שלי
            </h1>
            <BadgeCheck className="size-5 text-accent" />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground text-pretty">
            נהל את התוכן, הפיד והקשר עם המעריצים — קהילת $NOVA
          </p>
        </div>
        <div className="flex gap-2">
          {[
            { label: 'חברים', value: '128K', icon: Users },
            { label: 'מעורבות', value: '72%', icon: TrendingUp },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="flex min-w-24 flex-col items-center rounded-2xl bg-background/40 px-4 py-3 text-center"
              >
                <Icon className="size-4 text-primary" />
                <p className="mt-1 font-display font-bold">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-secondary/40 p-1">
        {studioTabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              tab === t
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'פרסום ופיד' && <FeedManager />}
      {tab === 'אינטראקציה עם מעריצים' && <FanInteraction />}
      {tab === 'הנפקת יצירות כ-NFT' && <NftMinter />}
      {tab === 'הנפקת טוקנים' && <TokenStudio />}
    </div>
  )
}

function FeedManager() {
  const [draft, setDraft] = useState('')
  const [gated, setGated] = useState(false)
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Card className="p-4">
          <div className="flex gap-3">
            <img
              src="/artist-nova.png"
              alt="הפרופיל שלך"
              className="size-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="שתף עדכון עם הקהילה שלך…"
                className="min-h-20 border-transparent bg-secondary/40"
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGated((v) => !v)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                    gated
                      ? 'bg-primary/15 text-primary'
                      : 'bg-secondary text-muted-foreground hover:text-foreground',
                  )}
                >
                  {gated ? <Lock className="size-3.5" /> : <Globe className="size-3.5" />}
                  {gated ? 'למחזיקי טוקן בלבד' : 'ציבורי'}
                </button>
                <Button variant="ghost" size="icon-sm" aria-label="הוסף תמונה">
                  <ImagePlus className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="הוסף וידאו">
                  <Video className="size-4" />
                </Button>
                <Button
                  size="sm"
                  className="ms-auto"
                  disabled={!draft.trim()}
                  onClick={() => setDraft('')}
                >
                  <Send className="size-4" />
                  פרסם
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-sm font-medium text-muted-foreground">הפוסטים שלך</p>
        {communityPosts.map((post) => (
          <Card key={post.id} className="p-5">
            <div className="flex items-center gap-3">
              <img
                src={post.avatar || '/placeholder.svg'}
                alt={post.author}
                className="size-11 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{post.author}</span>
                  <BadgeCheck className="size-4 text-accent" />
                </div>
                <span className="text-xs text-muted-foreground">{post.time}</span>
              </div>
              {post.tokenGated ? (
                <Badge tone="primary" className="ms-auto">
                  <Lock className="size-3.5" />
                  למחזיקי טוקן
                </Badge>
              ) : (
                <Badge tone="muted" className="ms-auto">
                  <Globe className="size-3.5" />
                  ציבורי
                </Badge>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-pretty">{post.content}</p>
            <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Heart className="size-4" />
                {post.likes.toLocaleString('he-IL')}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="size-4" />
                {post.comments}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="font-display font-semibold">ביצועי הפיד</p>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { label: 'צפיות השבוע', value: '84,200' },
              { label: 'לייקים חדשים', value: '3,410' },
              { label: 'תגובות חדשות', value: '612' },
              { label: 'חברים חדשים', value: '+1,204' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-display font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-primary/15 to-accent/10 p-5">
          <div className="flex items-center gap-2">
            <Gem className="size-5 text-primary" />
            <p className="font-display font-semibold">טיפ ליוצר</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            פוסטים נעולים למחזיקי טוקן מגדילים את הביקוש ל-$NOVA בממוצע ב-34%.
          </p>
        </Card>
      </div>
    </div>
  )
}

function NftMinter() {
  const [uploaded, setUploaded] = useState(false)
  const [media, setMedia] = useState<'image' | 'video' | 'audio'>('image')
  const [access, setAccess] = useState<'public' | 'gated'>('gated')
  const [title, setTitle] = useState('')
  const [supply, setSupply] = useState('100')
  const [price, setPrice] = useState('0.05')

  const mediaOptions = [
    { id: 'image' as const, label: 'תמונה', icon: ImageIcon, preview: '/art-genesis.png' },
    { id: 'video' as const, label: 'וידאו', icon: Video, preview: '/video-studio.png' },
    { id: 'audio' as const, label: 'שיר', icon: Music2, preview: '/album-desert.png' },
  ]
  const activeMedia = mediaOptions.find((m) => m.id === media)!

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Form */}
      <div className="flex flex-col gap-6 lg:col-span-3">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-l from-primary/15 to-accent/10 p-5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <UploadCloud className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">הנפקת יצירה כ-NFT</h2>
              <p className="text-xs text-muted-foreground">
                הפוך את היצירה שלך לנכס דיגיטלי בבעלות מלאה
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5">
            {/* Media type selector */}
            <div>
              <p className="mb-2 text-sm font-medium">סוג יצירה</p>
              <div className="flex gap-2">
                {mediaOptions.map((o) => {
                  const Icon = o.icon
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setMedia(o.id)}
                      className={cn(
                        'flex flex-1 flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-colors',
                        media === o.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <Icon className="size-5" />
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upload */}
            <button
              type="button"
              onClick={() => setUploaded((v) => !v)}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/30 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-secondary/50"
            >
              {uploaded ? (
                <>
                  <img
                    src={activeMedia.preview || '/placeholder.svg'}
                    alt="תצוגה מקדימה"
                    className="size-20 rounded-xl object-cover"
                  />
                  <span className="text-sm font-medium text-primary">הקובץ הועלה · לחץ להחלפה</span>
                </>
              ) : (
                <>
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <UploadCloud className="size-6" />
                  </span>
                  <span className="text-sm font-medium">גרור קובץ או לחץ להעלאה</span>
                  <span className="text-xs text-muted-foreground">
                    PNG, JPG, MP4, MP3 · עד 100MB
                  </span>
                </>
              )}
            </button>

            {/* Title */}
            <div>
              <label htmlFor="nft-title" className="mb-1.5 block text-sm font-medium">
                שם היצירה
              </label>
              <input
                id="nft-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="לדוגמה: ירח מדברי — מהדורה מוגבלת"
                className="h-11 w-full rounded-xl border border-input bg-secondary/40 px-3.5 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
              />
            </div>

            {/* Access control */}
            <div>
              <p className="mb-2 text-sm font-medium">הרשאות צפייה</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  {
                    id: 'public' as const,
                    icon: Globe,
                    title: 'פתוח לכולם',
                    desc: 'כל אחד יכול לצפות בתוכן בחינם',
                  },
                  {
                    id: 'gated' as const,
                    icon: Lock,
                    title: 'נעול — לרוכשים בלבד',
                    desc: 'התוכן נחשף רק לאחר רכישה',
                  },
                ].map((o) => {
                  const Icon = o.icon
                  const on = access === o.id
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setAccess(o.id)}
                      className={cn(
                        'flex items-start gap-3 rounded-2xl border p-3.5 text-right transition-colors',
                        on
                          ? 'border-primary/50 bg-primary/10'
                          : 'border-border bg-secondary/30 hover:border-primary/30',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors',
                          on ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground',
                        )}
                      >
                        <Icon className="size-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{o.title}</span>
                        <span className="block text-xs text-muted-foreground text-pretty">
                          {o.desc}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Supply & Price */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nft-supply" className="mb-1.5 block text-sm font-medium">
                  כמות עותקים למכירה
                </label>
                <div className="relative">
                  <input
                    id="nft-supply"
                    inputMode="numeric"
                    value={supply}
                    onChange={(e) => setSupply(e.target.value.replace(/[^0-9]/g, ''))}
                    className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-16 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                  />
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                    עותקים
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="nft-price" className="mb-1.5 block text-sm font-medium">
                  מחיר ליחידה
                </label>
                <div className="relative">
                  <input
                    id="nft-price"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-12 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                  />
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                    ETH
                  </span>
                </div>
              </div>
            </div>

            <Button size="lg" className="glow-primary mt-1 w-full" disabled={!uploaded}>
              <Rocket className="size-4" />
              הנפק יצירה עכשיו
            </Button>
          </div>
        </Card>
      </div>

      {/* Live preview */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Star className="size-4 text-accent" />
            תצוגה מקדימה — כרטיס היצירה
          </p>
          <Card className="overflow-hidden border-primary/30">
            <div className="relative aspect-square">
              <img
                src={activeMedia.preview || '/placeholder.svg'}
                alt="תצוגת היצירה"
                className={cn(
                  'size-full object-cover transition',
                  access === 'gated' && 'blur-md brightness-75',
                )}
              />
              {access === 'gated' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-background/70 text-primary backdrop-blur">
                    <Lock className="size-6" />
                  </span>
                  <span className="text-sm font-medium">תוכן נעול · פתח ברכישה</span>
                </div>
              ) : null}
              <Badge tone="accent" className="absolute right-3 top-3 backdrop-blur">
                {activeMedia.label}
              </Badge>
            </div>
            <div className="p-5">
              <p className="font-display text-base font-bold text-pretty">
                {title || 'שם היצירה שלך'}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">מאת נובה אוריון</p>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">מחיר ליחידה</p>
                  <p className="font-display text-xl font-bold">
                    {price || '0'} <span className="text-sm text-muted-foreground">ETH</span>
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">זמינות</p>
                  <p className="font-display text-sm font-semibold">
                    {supply || '0'} עותקים
                  </p>
                </div>
              </div>

              <Button size="lg" variant="outline" className="mt-4 w-full" disabled>
                {access === 'gated' ? (
                  <>
                    <Unlock className="size-4" />
                    רכוש כדי לפתוח
                  </>
                ) : (
                  <>
                    <Coins className="size-4" />
                    אסוף יצירה
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FanInteraction() {
  const topFans = [
    { name: 'דניאל כהן', avatar: '/artist-solo.png', tokens: '1,250 $NOVA', tier: 'עשירון עליון' },
    { name: 'מאיה לוי', avatar: '/artist-visual.png', tokens: '980 $NOVA', tier: 'תומך VIP' },
    { name: 'איתי בר', avatar: '/artist-nova.png', tokens: '640 $NOVA', tier: 'תומך פעיל' },
  ]
  const comments = [
    { name: 'דניאל כהן', avatar: '/artist-solo.png', text: 'האלבום הזה משנה חיים! מחכה להופעה 🔥', time: 'לפני שעה' },
    { name: 'מאיה לוי', avatar: '/artist-visual.png', text: 'מתי הדמו ��אקוסטי הבא מגיע?', time: 'לפני 3 שעות' },
    { name: 'איתי בר', avatar: '/artist-nova.png', text: 'שווה כל טוקן. תודה על הקהילה הזאת.', time: 'אתמול' },
  ]
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SectionHeader title="המעריצים המובילים" />
        <div className="flex flex-col gap-3">
          {topFans.map((f, i) => (
            <div
              key={f.name}
              className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/30 p-3"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
                {i + 1}
              </span>
              <img
                src={f.avatar || '/placeholder.svg'}
                alt={f.name}
                className="size-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.tokens}</p>
              </div>
              <Badge tone="accent">{f.tier}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <SectionHeader title="תגובות אחרונות" />
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div key={c.name + c.time} className="flex gap-3">
              <img
                src={c.avatar || '/placeholder.svg'}
                alt={c.name}
                className="size-10 shrink-0 rounded-full object-cover"
              />
              <div className="flex-1 rounded-2xl bg-secondary/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <p className="mt-1 text-sm text-pretty">{c.text}</p>
                <button
                  type="button"
                  className="mt-2 text-xs font-medium text-primary transition-opacity hover:opacity-80"
                >
                  השב
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ── סטודיו הטוקנים ────────────────────────────────────────
function TokenStudio() {
  const [path, setPath] = useState<'main' | 'project'>('main')
  const paths = [
    {
      id: 'main' as const,
      icon: Crown,
      title: 'טוקן קהילה ראשי',
      desc: 'גישת VIP, ממשל ופתיחת הקהילה הפרטית',
    },
    {
      id: 'project' as const,
      icon: Target,
      title: 'טוקן לפרויקט עתידי',
      desc: 'גיוס המונים ליעד עם חלוקת רווחים עתידית',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Pathway selector */}
      <div className="grid gap-3 sm:grid-cols-2">
        {paths.map((p) => {
          const Icon = p.icon
          const on = path === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPath(p.id)}
              className={cn(
                'flex items-start gap-3 rounded-2xl border p-4 text-right transition-colors',
                on
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/30 hover:border-primary/40',
              )}
            >
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                  on ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-display text-base font-bold">{p.title}</span>
                  {on ? <Badge tone="primary">נבחר</Badge> : null}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground text-pretty">
                  {p.desc}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {path === 'main' ? <MainCommunityToken /> : <ProjectToken />}
    </div>
  )
}

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        on ? 'bg-primary' : 'bg-secondary',
      )}
    >
      <span
        className={cn(
          'inline-block size-4 rounded-full bg-background shadow-sm transition-transform',
          // RTL: knob rests on the right when off, slides left when on
          on ? 'translate-x-[-4px]' : 'translate-x-[-24px]',
        )}
      />
    </button>
  )
}

function MainCommunityToken() {
  const [supply, setSupply] = useState('1000000')
  const [price, setPrice] = useState('0.004')
  const [revenue, setRevenue] = useState(true)
  const [revenuePct, setRevenuePct] = useState('10')
  const [vip, setVip] = useState(true)
  const [community, setCommunity] = useState(true)
  const [voting, setVoting] = useState(false)
  const [customPerks, setCustomPerks] = useState<string[]>(['כניסה מאחורי הקלעים'])
  const [customInput, setCustomInput] = useState('')

  function addPerk() {
    const v = customInput.trim()
    if (!v) return
    setCustomPerks((prev) => [...prev, v])
    setCustomInput('')
  }

  const utilities = [
    {
      key: 'community',
      on: community,
      toggle: () => setCommunity((v) => !v),
      icon: Users,
      title: 'פתיחת הקהילה הפרטית',
      desc: 'מחזיקי הטוקן מקבלים גישה לאזור הקהילה הסגור שלך',
      badge: 'גישה לקהילה הפרטית',
    },
    {
      key: 'revenue',
      on: revenue,
      toggle: () => setRevenue((v) => !v),
      icon: Percent,
      title: 'חלוקת רווחים אוטומטית',
      desc: 'מחזיקי המטבע מקבלים נתח מכל הכנסה עתידית',
      badge: `חלוקת רווחים ${revenuePct}%`,
    },
    {
      key: 'vip',
      on: vip,
      toggle: () => setVip((v) => !v),
      icon: ShieldCheck,
      title: 'גישה לתוכן VIP סגור',
      desc: 'פתיחת תוכן בלעדי למחזיקי המטבע בלבד',
      badge: 'גישת VIP סגורה',
    },
    {
      key: 'voting',
      on: voting,
      toggle: () => setVoting((v) => !v),
      icon: Vote,
      title: 'זכות הצבעה וממשל',
      desc: 'המעריצים מצביעים על החלטות יצירתיות',
      badge: 'זכות הצבעה',
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Builder */}
      <div className="flex flex-col gap-6 lg:col-span-3">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-l from-primary/15 to-accent/10 p-5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Crown className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">
                הגדרת טוקן הקהילה הראשי
              </h2>
              <p className="text-xs text-muted-foreground">
                עצב את הכלכלה שלך — אתה קובע מה המעריצים מקבלים
              </p>
            </div>
          </div>

          {/* Basic settings */}
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <label htmlFor="supply" className="mb-1.5 block text-sm font-medium">
                כמות מטבעות מקסימלית
              </label>
              <div className="relative">
                <input
                  id="supply"
                  inputMode="numeric"
                  value={supply}
                  onChange={(e) => setSupply(e.target.value.replace(/[^0-9]/g, ''))}
                  className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-16 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                />
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  יחידות
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="price" className="mb-1.5 block text-sm font-medium">
                מחיר התחלתי
              </label>
              <div className="relative">
                <input
                  id="price"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-12 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                />
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  ETH
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Utility builder */}
        <Card className="p-5">
          <SectionHeader title="בונה ההטבות" subtitle="הפעל את ההטבות שילוו את המטבע שלך" />
          <div className="flex flex-col gap-3">
            {utilities.map((u) => {
              const Icon = u.icon
              return (
                <div
                  key={u.key}
                  className={cn(
                    'flex flex-col gap-3 rounded-2xl border p-4 transition-colors',
                    u.on
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border bg-secondary/30',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                        u.on ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground',
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{u.title}</p>
                      <p className="text-xs text-muted-foreground text-pretty">{u.desc}</p>
                    </div>
                    <Toggle on={u.on} onToggle={u.toggle} label={u.title} />
                  </div>

                  {u.key === 'revenue' && u.on ? (
                    <div className="flex items-center gap-3 rounded-xl bg-background/60 p-3">
                      <label htmlFor="revenuePct" className="text-sm text-muted-foreground">
                        אחוז לשיתוף עם המחזיקים
                      </label>
                      <div className="relative ms-auto w-24">
                        <input
                          id="revenuePct"
                          inputMode="numeric"
                          value={revenuePct}
                          onChange={(e) => {
                            const n = e.target.value.replace(/[^0-9]/g, '')
                            setRevenuePct(n === '' ? '' : String(Math.min(100, Number(n))))
                          }}
                          className="h-10 w-full rounded-lg border border-input bg-secondary/40 pr-3 pl-8 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                        />
                        <Percent className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          {/* Custom perk */}
          <div className="mt-5 border-t border-border pt-5">
            <label htmlFor="customPerk" className="mb-1.5 block text-sm font-medium">
              הטבה אישית
            </label>
            <div className="flex gap-2">
              <input
                id="customPerk"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                    e.preventDefault()
                    addPerk()
                  }
                }}
                placeholder="לדוגמה: כניסה מאחורי הקלעים"
                className="h-11 flex-1 rounded-xl border border-input bg-secondary/40 px-3.5 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
              />
              <Button type="button" size="lg" onClick={addPerk} disabled={!customInput.trim()}>
                <Plus className="size-4" />
                הוסף
              </Button>
            </div>
            {customPerks.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {customPerks.map((perk, i) => (
                  <span
                    key={perk + i}
                    className="flex items-center gap-1.5 rounded-full bg-accent/15 py-1 pr-3 pl-1.5 text-xs font-medium text-accent"
                  >
                    <Sparkles className="size-3.5" />
                    {perk}
                    <button
                      type="button"
                      aria-label={`הסר ${perk}`}
                      onClick={() => setCustomPerks((prev) => prev.filter((_, j) => j !== i))}
                      className="flex size-4 items-center justify-center rounded-full bg-accent/20 transition-colors hover:bg-accent/40"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      </div>

      {/* Live preview */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Star className="size-4 text-accent" />
            תצוגה מקדימה — מה המעריץ רואה
          </p>
          <Card className="overflow-hidden border-primary/30">
            <div className="relative h-28">
              <img
                src="/artist-cover.png"
                alt="רקע כרטיס המטבע"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-3 right-4 flex items-center gap-2">
                <img
                  src="/artist-nova.png"
                  alt="נובה אוריון"
                  className="size-12 rounded-xl border-2 border-card object-cover"
                />
                <div>
                  <p className="font-display text-sm font-bold leading-tight">נובה אוריון</p>
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Coins className="size-3" />
                    $NOVA
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">מחיר מטבע</p>
                  <p className="font-display text-2xl font-bold">
                    {price || '0'} <span className="text-base text-muted-foreground">ETH</span>
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">היצע כולל</p>
                  <p className="font-display text-lg font-semibold">
                    {supply ? Number(supply).toLocaleString('he-IL') : '0'}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-muted-foreground">ההטבות שלך</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {community ? (
                  <Badge tone="primary">
                    <Users className="size-3.5" />
                    גישה לקהילה הפרטית
                  </Badge>
                ) : null}
                {revenue ? (
                  <Badge tone="primary">
                    <Percent className="size-3.5" />
                    חלוקת רווחים {revenuePct || 0}%
                  </Badge>
                ) : null}
                {vip ? (
                  <Badge tone="primary">
                    <ShieldCheck className="size-3.5" />
                    גישת VIP סגורה
                  </Badge>
                ) : null}
                {voting ? (
                  <Badge tone="primary">
                    <Vote className="size-3.5" />
                    זכות הצבעה
                  </Badge>
                ) : null}
                {customPerks.map((perk, i) => (
                  <Badge key={perk + i} tone="accent">
                    <Sparkles className="size-3.5" />
                    {perk}
                  </Badge>
                ))}
                {!community && !revenue && !vip && !voting && customPerks.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    הפעל הטבות כדי שיופיעו כאן…
                  </p>
                ) : null}
              </div>

              <Button size="lg" className="mt-5 w-full" variant="outline" disabled>
                <Coins className="size-4" />
                קנה $NOVA
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Primary action */}
      <div className="lg:col-span-5">
        <Button size="lg" className="glow-primary h-14 w-full text-base font-semibold">
          <Rocket className="size-5" />
          הנפק טוקן קהילה עכשיו
        </Button>
      </div>
    </div>
  )
}

function ProjectToken() {
  const [name, setName] = useState('אלבום האולפן הבא')
  const [goal, setGoal] = useState('50')
  const [supply, setSupply] = useState('5000')
  const [price, setPrice] = useState('0.01')
  const [revenueSplit, setRevenueSplit] = useState(true)
  const [splitPct, setSplitPct] = useState('20')

  const goalNum = Number(goal) || 0
  // הדמיית התקדמות גיוס ראשונית
  const raised = Math.min(goalNum, goalNum * 0.35)
  const progress = goalNum > 0 ? Math.round((raised / goalNum) * 100) : 0

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Builder */}
      <div className="flex flex-col gap-6 lg:col-span-3">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-l from-accent/15 to-primary/10 p-5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent/20 text-accent">
              <Target className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">
                הנפקת טוקן לפרויקט עתידי
              </h2>
              <p className="text-xs text-muted-foreground">
                גייס מימון מהקהילה למטרה מוגדרת — עם חלוקת רווחים עתידית
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5">
            <div>
              <label htmlFor="proj-name" className="mb-1.5 block text-sm font-medium">
                שם הפרויקט
              </label>
              <input
                id="proj-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="לדוגמה: מימון סבב הופעות ארצי"
                className="h-11 w-full rounded-xl border border-input bg-secondary/40 px-3.5 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
              />
            </div>

            <div>
              <label htmlFor="proj-goal" className="mb-1.5 block text-sm font-medium">
                יעד גיוס
              </label>
              <div className="relative">
                <input
                  id="proj-goal"
                  inputMode="decimal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-12 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                />
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  ETH
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="proj-supply" className="mb-1.5 block text-sm font-medium">
                  כמות טוקנים
                </label>
                <div className="relative">
                  <input
                    id="proj-supply"
                    inputMode="numeric"
                    value={supply}
                    onChange={(e) => setSupply(e.target.value.replace(/[^0-9]/g, ''))}
                    className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-16 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                  />
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                    יחידות
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="proj-price" className="mb-1.5 block text-sm font-medium">
                  מחיר ליחידה
                </label>
                <div className="relative">
                  <input
                    id="proj-price"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="h-11 w-full rounded-xl border border-input bg-secondary/40 pr-3.5 pl-12 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                  />
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                    ETH
                  </span>
                </div>
              </div>
            </div>

            {/* Automated future revenue split */}
            <div
              className={cn(
                'flex flex-col gap-3 rounded-2xl border p-4 transition-colors',
                revenueSplit ? 'border-accent/40 bg-accent/5' : 'border-border bg-secondary/30',
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                    revenueSplit ? 'bg-accent/20 text-accent' : 'bg-secondary text-muted-foreground',
                  )}
                >
                  <Percent className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">חלוקת רווחים עתידית אוטומטית</p>
                  <p className="text-xs text-muted-foreground text-pretty">
                    התומכים מקבלים נתח מהכנסות הפרויקט לכשיושלם
                  </p>
                </div>
                <Toggle
                  on={revenueSplit}
                  onToggle={() => setRevenueSplit((v) => !v)}
                  label="חלוקת רווחים עתידית"
                />
              </div>
              {revenueSplit ? (
                <div className="flex items-center gap-3 rounded-xl bg-background/60 p-3">
                  <label htmlFor="splitPct" className="text-sm text-muted-foreground">
                    אחוז מההכנסות לתומכים
                  </label>
                  <div className="relative ms-auto w-24">
                    <input
                      id="splitPct"
                      inputMode="numeric"
                      value={splitPct}
                      onChange={(e) => {
                        const n = e.target.value.replace(/[^0-9]/g, '')
                        setSplitPct(n === '' ? '' : String(Math.min(100, Number(n))))
                      }}
                      className="h-10 w-full rounded-lg border border-input bg-secondary/40 pr-3 pl-8 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                    />
                    <Percent className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              ) : null}
            </div>

            <Button size="lg" className="glow-primary h-14 w-full text-base font-semibold">
              <Rocket className="size-5" />
              השק קמפיין גיוס
            </Button>
          </div>
        </Card>
      </div>

      {/* Live preview */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Star className="size-4 text-accent" />
            תצוגה מקדימה — קמפיין הגיוס
          </p>
          <Card className="overflow-hidden border-accent/30 p-5">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Target className="size-4.5" />
              </span>
              <p className="min-w-0 truncate font-display font-bold">
                {name || 'שם הפרויקט'}
              </p>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">גויס עד כה</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-primary to-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-display font-bold text-primary">
                  {raised.toLocaleString('he-IL', { maximumFractionDigits: 1 })} ETH
                </span>
                <span className="text-muted-foreground">
                  מתוך יעד {goal || '0'} ETH
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="muted">
                <Coins className="size-3.5" />
                {price || '0'} ETH ליחידה
              </Badge>
              {revenueSplit ? (
                <Badge tone="accent">
                  <Percent className="size-3.5" />
                  {splitPct || 0}% מההכנסות העתידיות
                </Badge>
              ) : null}
            </div>

            <Button size="lg" variant="outline" className="mt-4 w-full" disabled>
              <Target className="size-4" />
              תמוך בפרויקט
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
