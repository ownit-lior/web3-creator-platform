export type PortfolioNavId =
  | 'overview'
  | 'holdings'
  | 'royalties'
  | 'clubs'

export type PortfolioInvestor = {
  id: string
  name: string
  email: string
  avatar: string
  wallet: string
  memberSince: string
  riskProfile: string
}

export type PortfolioTotals = {
  investedUsd: number
  currentValueUsd: number
  royaltiesReceivedUsd: number
  roiPct: number
  roiUp: boolean
  activeHoldings: number
  clubsJoined: number
}

export type PortfolioHolding = {
  id: string
  creatorName: string
  avatar: string
  assetName: string
  tokenSymbol: string
  tokensHeld: number
  tier: string
  investedUsd: number
  currentValueUsd: number
  roiPct: number
  roiUp: boolean
  clubId: string
  floorPriceUsd: number
  floorChangePct: number
}

export type RoyaltyPayment = {
  id: string
  creatorName: string
  avatar: string
  assetName: string
  amountUsd: number
  period: string
  receivedAt: string
}

export type ClubMembership = {
  clubId: string
  name: string
  creatorName: string
  cover: string
  tokensHeld: number
  tier: string
  unreadPosts: number
}

export const portfolioInvestor: PortfolioInvestor = {
  id: 'inv-alon',
  name: 'אלון מזרחי',
  email: 'alon@ownit.io',
  avatar: '/placeholder-user.jpg',
  wallet: '0x3F90…12AB',
  memberSince: 'ינואר 2026',
  riskProfile: 'מאוזן',
}

export const portfolioTotals: PortfolioTotals = {
  investedUsd: 12_400,
  currentValueUsd: 14_180,
  royaltiesReceivedUsd: 892,
  roiPct: 14.4,
  roiUp: true,
  activeHoldings: 4,
  clubsJoined: 3,
}

export const portfolioHoldings: PortfolioHolding[] = [
  {
    id: 'h1',
    creatorName: 'נובה אוריון',
    avatar: '/artist-nova.png',
    assetName: 'חלומות ניאון',
    tokenSymbol: '$NOVA',
    tokensHeld: 86,
    tier: 'זהב',
    investedUsd: 5200,
    currentValueUsd: 6950,
    roiPct: 33.7,
    roiUp: true,
    clubId: 'club-m1',
    floorPriceUsd: 4.5,
    floorChangePct: 8.4,
  },
  {
    id: 'h2',
    creatorName: 'יונתן שדה',
    avatar: '/artist-solo.png',
    assetName: 'ירח מדבר',
    tokenSymbol: '$SADE',
    tokensHeld: 42,
    tier: 'כסף',
    investedUsd: 2600,
    currentValueUsd: 2800,
    roiPct: 7.7,
    roiUp: true,
    clubId: 'club-m3',
    floorPriceUsd: 2.8,
    floorChangePct: 3.2,
  },
  {
    id: 'h3',
    creatorName: 'מאיה דיגיטל',
    avatar: '/artist-visual.png',
    assetName: 'שברי אור',
    tokenSymbol: '$MAYA',
    tokensHeld: 55,
    tier: 'כסף',
    investedUsd: 3400,
    currentValueUsd: 3060,
    roiPct: -10.0,
    roiUp: false,
    clubId: 'club-m2',
    floorPriceUsd: 1.9,
    floorChangePct: -2.1,
  },
  {
    id: 'h4',
    creatorName: 'אריה צ׳ן',
    avatar: '/art-genesis.png',
    assetName: 'בראשית',
    tokenSymbol: '$GEN',
    tokensHeld: 18,
    tier: 'ברונזה',
    investedUsd: 1200,
    currentValueUsd: 1370,
    roiPct: 14.2,
    roiUp: true,
    clubId: 'club-v1',
    floorPriceUsd: 6.2,
    floorChangePct: 5.5,
  },
]

export const royaltyPayments: RoyaltyPayment[] = [
  {
    id: 'r1',
    creatorName: 'נובה אוריון',
    avatar: '/artist-nova.png',
    assetName: 'חלומות ניאון',
    amountUsd: 142,
    period: 'אוג׳ 2026',
    receivedAt: '24 אוג׳',
  },
  {
    id: 'r2',
    creatorName: 'יונתן שדה',
    avatar: '/artist-solo.png',
    assetName: 'ירח מדבר',
    amountUsd: 68,
    period: 'אוג׳ 2026',
    receivedAt: '22 אוג׳',
  },
  {
    id: 'r3',
    creatorName: 'נובה אוריון',
    avatar: '/artist-nova.png',
    assetName: 'חלומות ניאון',
    amountUsd: 128,
    period: 'יול׳ 2026',
    receivedAt: '31 יול׳',
  },
  {
    id: 'r4',
    creatorName: 'אריה צ׳ן',
    avatar: '/art-genesis.png',
    assetName: 'בראשית',
    amountUsd: 54,
    period: 'יול׳ 2026',
    receivedAt: '28 יול׳',
  },
  {
    id: 'r5',
    creatorName: 'מאיה דיגיטל',
    avatar: '/artist-visual.png',
    assetName: 'שברי אור',
    amountUsd: 31,
    period: 'יול׳ 2026',
    receivedAt: '25 יול׳',
  },
]

export const clubMemberships: ClubMembership[] = [
  {
    clubId: 'club-m1',
    name: 'מעגל פנימי — נובה אוריון',
    creatorName: 'נובה אוריון',
    cover: '/album-neon-dreams.png',
    tokensHeld: 86,
    tier: 'זהב',
    unreadPosts: 3,
  },
  {
    clubId: 'club-m3',
    name: 'קולקטיב ירח מדבר',
    creatorName: 'יונתן שדה',
    cover: '/album-desert.png',
    tokensHeld: 42,
    tier: 'כסף',
    unreadPosts: 1,
  },
  {
    clubId: 'club-v1',
    name: 'פטרוני בראשית',
    creatorName: 'אריה צ׳ן',
    cover: '/art-genesis.png',
    tokensHeld: 18,
    tier: 'ברונזה',
    unreadPosts: 0,
  },
]

export const PORTFOLIO_NAV: { id: PortfolioNavId; label: string }[] = [
  { id: 'overview', label: 'סקירה' },
  { id: 'holdings', label: 'תיק אסימונים' },
  { id: 'royalties', label: 'תמלוגים' },
  { id: 'clubs', label: 'מועדונים' },
]

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatUsdDetailed(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPct(value: number, signed = true): string {
  const prefix = signed && value > 0 ? '+' : ''
  return `${prefix}${value.toFixed(1)}%`
}
