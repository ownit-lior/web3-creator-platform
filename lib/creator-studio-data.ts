export type StudioNavId =
  | 'dashboard'
  | 'drops'
  | 'community'
  | 'create-drop'
  | 'settings'

export type VisibilityTier = 'public' | 'fan' | 'insider' | 'vip'

export type StudioCreator = {
  id: string
  name: string
  stageName: string
  category: string
  avatar: string
  clubId: string
}

export type StudioAnalytics = {
  totalRaised: number
  marketCap: number
  activeHolders: number
  royaltiesDistributed: number
  floorPrice: number
  floorChangePct: number
}

export type StudioDrop = {
  id: string
  title: string
  cover: string
  equitySoldPct: number
  raised: number
  status: 'live' | 'presale' | 'draft'
}

export type TopShareholder = {
  id: string
  username: string
  avatar: string
  tokens: number
  tier: string
}

export const studioCreator: StudioCreator = {
  id: 'nova-orion',
  name: 'נועה ברק',
  stageName: 'נובה אוריון',
  category: 'מפיק מוזיקה · אלקטרוני',
  avatar: '/artist-nova.png',
  clubId: 'club-m1',
}

export const studioAnalytics: StudioAnalytics = {
  totalRaised: 125_000,
  marketCap: 412_000,
  activeHolders: 3402,
  royaltiesDistributed: 12_400,
  floorPrice: 4.5,
  floorChangePct: 8.4,
}

export const studioDrops: StudioDrop[] = [
  {
    id: 'drop-neon',
    title: 'חלומות ניאון',
    cover: '/album-neon-dreams.png',
    equitySoldPct: 68,
    raised: 82_400,
    status: 'live',
  },
  {
    id: 'drop-desert',
    title: 'ירח מדבר',
    cover: '/album-desert.png',
    equitySoldPct: 41,
    raised: 28_600,
    status: 'presale',
  },
  {
    id: 'drop-midnight',
    title: 'עיר חצות',
    cover: '/album-midnight.png',
    equitySoldPct: 100,
    raised: 14_000,
    status: 'live',
  },
]

export const topShareholders: TopShareholder[] = [
  {
    id: 'sh1',
    username: 'WhaleKing',
    avatar: '/artist-solo.png',
    tokens: 420,
    tier: 'יהלום',
  },
  {
    id: 'sh2',
    username: 'NovaFan_88',
    avatar: '/artist-cover.png',
    tokens: 186,
    tier: 'יהלום',
  },
  {
    id: 'sh3',
    username: 'TokenQueen',
    avatar: '/artist-visual.png',
    tokens: 142,
    tier: 'זהב',
  },
  {
    id: 'sh4',
    username: 'BlockBeliever',
    avatar: '/art-portrait.png',
    tokens: 98,
    tier: 'זהב',
  },
  {
    id: 'sh5',
    username: 'EarlyBird',
    avatar: '/placeholder-user.jpg',
    tokens: 76,
    tier: 'כסף',
  },
]

export const VISIBILITY_OPTIONS: {
  value: VisibilityTier
  label: string
  hint: string
}[] = [
  { value: 'public', label: 'פתוח לכולם', hint: 'גלוי גם למבקרים שאינם מחזיקים' },
  { value: 'fan', label: 'דרגת Fan · ברונזה', hint: '1+ אסימונים' },
  { value: 'insider', label: 'דרגת Insider · כסף', hint: '10+ אסימונים' },
  { value: 'vip', label: 'דרגת VIP · זהב+', hint: '50+ אסימונים' },
]

export const STUDIO_NAV: {
  id: StudioNavId
  label: string
}[] = [
  { id: 'dashboard', label: 'דשבורד' },
  { id: 'drops', label: 'הפרויקטים שלי' },
  { id: 'community', label: 'הקהילה' },
  { id: 'create-drop', label: 'השקה חדשה' },
  { id: 'settings', label: 'הגדרות' },
]

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('he-IL').format(value)
}
