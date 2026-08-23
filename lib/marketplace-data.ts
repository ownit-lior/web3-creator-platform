export type CreatorCategory =
  | 'music'
  | 'visual-arts'
  | 'content-creators'
  | 'game-developers'
  | 'comics-webtoons'

export type CreatorTier = 'Emerging' | 'Established' | 'Star'

export type SortOption = 'apy-desc' | 'price-asc' | 'recent'

export type InvestmentAsset = {
  id: string
  title: string
  creatorName: string
  cover: string
  category: CreatorCategory
  tag: string
  tier: CreatorTier
  price: number
  apy: number
  /** 0–100 when asset is in an active presale */
  presaleProgress?: number
  addedAt: string
  status: 'live' | 'presale'
}

/** @deprecated Use InvestmentAsset */
export type MarketplaceAsset = InvestmentAsset & {
  songName: string
  artistName: string
  genre: string
}

export type ClubUtility =
  | 'voting'
  | 'exclusive-content'
  | 'early-access'
  | 'merch'
  | 'ama'

export type CommunityTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond'

export type TierDefinition = {
  name: CommunityTier
  minTokens: number
  perk: string
}

export type CreatorClub = {
  id: string
  name: string
  creatorName: string
  cover: string
  category: CreatorCategory
  tag: string
  memberCount: number
  utilities: ClubUtility[]
  lockedContent: string
  tiers: TierDefinition[]
}

export type UpcomingDrop = {
  id: string
  title: string
  creatorName: string
  cover: string
  category: CreatorCategory
  tag: string
  launchAt: string
  description: string
}

export const CATEGORY_CONFIG: {
  id: CreatorCategory
  investmentTitle: string
  clubTitle: string
}[] = [
  { id: 'music', investmentTitle: 'Trending in Music', clubTitle: 'Music Clubs' },
  { id: 'visual-arts', investmentTitle: 'Visual Arts', clubTitle: 'Artist Collectives' },
  {
    id: 'content-creators',
    investmentTitle: 'Content Creators',
    clubTitle: 'Creator Fan Clubs',
  },
  {
    id: 'game-developers',
    investmentTitle: 'Game Developers',
    clubTitle: 'Indie Dev Guilds',
  },
  {
    id: 'comics-webtoons',
    investmentTitle: 'Comics & Webtoons',
    clubTitle: 'Story Worlds',
  },
]

export const investmentAssets: InvestmentAsset[] = [
  // Music
  {
    id: 'inv-m1',
    title: 'Neon Dreams',
    creatorName: 'Nova Orion',
    cover: '/album-neon-dreams.png',
    category: 'music',
    tag: 'Electronic',
    tier: 'Star',
    price: 4.25,
    apy: 11.2,
    presaleProgress: 92,
    addedAt: '2026-08-20',
    status: 'presale',
  },
  {
    id: 'inv-m2',
    title: 'Midnight City',
    creatorName: 'The Echo',
    cover: '/album-midnight.png',
    category: 'music',
    tag: 'Rock',
    tier: 'Established',
    price: 2.5,
    apy: 8.5,
    addedAt: '2026-08-18',
    status: 'live',
  },
  {
    id: 'inv-m3',
    title: 'Desert Moon',
    creatorName: 'Yonatan Sadeh',
    cover: '/album-desert.png',
    category: 'music',
    tag: 'Pop',
    tier: 'Emerging',
    price: 1.15,
    apy: 14.8,
    presaleProgress: 58,
    addedAt: '2026-08-22',
    status: 'presale',
  },
  {
    id: 'inv-m4',
    title: 'Block Party Anthem',
    creatorName: 'Kairo West',
    cover: '/artist-solo.png',
    category: 'music',
    tag: 'Hip-Hop',
    tier: 'Star',
    price: 6.4,
    apy: 7.3,
    presaleProgress: 75,
    addedAt: '2026-08-10',
    status: 'presale',
  },
  // Visual Arts
  {
    id: 'inv-v1',
    title: 'Genesis Collection',
    creatorName: 'Aria Chen',
    cover: '/art-genesis.png',
    category: 'visual-arts',
    tag: 'Digital Painting',
    tier: 'Established',
    price: 3.2,
    apy: 9.8,
    presaleProgress: 67,
    addedAt: '2026-08-19',
    status: 'presale',
  },
  {
    id: 'inv-v2',
    title: 'Sculpture Series I',
    creatorName: 'Marcus Vane',
    cover: '/art-sculpture.png',
    category: 'visual-arts',
    tag: '3D Art',
    tier: 'Emerging',
    price: 1.85,
    apy: 13.2,
    addedAt: '2026-08-21',
    status: 'live',
  },
  {
    id: 'inv-v3',
    title: 'Portrait Protocol',
    creatorName: 'Lia Monroe',
    cover: '/art-portrait.png',
    category: 'visual-arts',
    tag: 'NFT Art',
    tier: 'Star',
    price: 5.6,
    apy: 8.1,
    addedAt: '2026-08-14',
    status: 'live',
  },
  {
    id: 'inv-v4',
    title: 'Chromatic Void',
    creatorName: 'SYNTH//94',
    cover: '/artist-visual.png',
    category: 'visual-arts',
    tag: 'Generative',
    tier: 'Emerging',
    price: 0.95,
    apy: 17.5,
    presaleProgress: 41,
    addedAt: '2026-08-23',
    status: 'presale',
  },
  // Content Creators
  {
    id: 'inv-c1',
    title: 'Tech Deep Dives',
    creatorName: 'ByteWave',
    cover: '/video-studio.png',
    category: 'content-creators',
    tag: 'YouTube',
    tier: 'Established',
    price: 2.8,
    apy: 10.4,
    presaleProgress: 83,
    addedAt: '2026-08-17',
    status: 'presale',
  },
  {
    id: 'inv-c2',
    title: 'The Signal Podcast',
    creatorName: 'Maya Rivers',
    cover: '/artist-nova.png',
    category: 'content-creators',
    tag: 'Podcast',
    tier: 'Star',
    price: 4.1,
    apy: 7.9,
    addedAt: '2026-08-16',
    status: 'live',
  },
  {
    id: 'inv-c3',
    title: 'Creator Economy Weekly',
    creatorName: 'Dre Vault',
    cover: '/artist-cover.png',
    category: 'content-creators',
    tag: 'Newsletter',
    tier: 'Emerging',
    price: 1.2,
    apy: 15.1,
    addedAt: '2026-08-22',
    status: 'live',
  },
  {
    id: 'inv-c4',
    title: 'Live Studio Sessions',
    creatorName: 'Nova Orion',
    cover: '/video-live.png',
    category: 'content-creators',
    tag: 'Livestream',
    tier: 'Established',
    price: 3.45,
    apy: 9.3,
    presaleProgress: 52,
    addedAt: '2026-08-20',
    status: 'presale',
  },
  // Game Developers
  {
    id: 'inv-g1',
    title: 'Street Legends FC',
    creatorName: 'Pixel Forge Studio',
    cover: '/album-midnight.png',
    category: 'game-developers',
    tag: 'Sports Sim',
    tier: 'Emerging',
    price: 1.55,
    apy: 16.8,
    presaleProgress: 71,
    addedAt: '2026-08-18',
    status: 'presale',
  },
  {
    id: 'inv-g2',
    title: 'Neon Drift Mobile',
    creatorName: 'Arcade Atlas',
    cover: '/album-neon-dreams.png',
    category: 'game-developers',
    tag: 'Racing',
    tier: 'Established',
    price: 2.9,
    apy: 11.5,
    addedAt: '2026-08-15',
    status: 'live',
  },
  {
    id: 'inv-g3',
    title: 'Dungeon Protocol',
    creatorName: 'Rogue Bit Labs',
    cover: '/art-genesis.png',
    category: 'game-developers',
    tag: 'Roguelike',
    tier: 'Star',
    price: 5.2,
    apy: 8.7,
    presaleProgress: 88,
    addedAt: '2026-08-12',
    status: 'presale',
  },
  {
    id: 'inv-g4',
    title: 'Career Mode Pro',
    creatorName: 'Indie Kickoff',
    cover: '/artist-solo.png',
    category: 'game-developers',
    tag: 'Career Sim',
    tier: 'Emerging',
    price: 1.1,
    apy: 18.2,
    addedAt: '2026-08-23',
    status: 'live',
  },
  // Comics & Webtoons
  {
    id: 'inv-x1',
    title: 'Arcane Academy',
    creatorName: 'Luna Ink',
    cover: '/art-portrait.png',
    category: 'comics-webtoons',
    tag: 'Fantasy Manga',
    tier: 'Established',
    price: 2.4,
    apy: 12.3,
    presaleProgress: 64,
    addedAt: '2026-08-19',
    status: 'presale',
  },
  {
    id: 'inv-x2',
    title: 'Heroes of the Block',
    creatorName: 'Ink & Iron',
    cover: '/artist-cover.png',
    category: 'comics-webtoons',
    tag: 'Superhero',
    tier: 'Star',
    price: 4.75,
    apy: 7.6,
    addedAt: '2026-08-13',
    status: 'live',
  },
  {
    id: 'inv-x3',
    title: 'Shadow Realm S2',
    creatorName: 'Webtoon Collective',
    cover: '/art-sculpture.png',
    category: 'comics-webtoons',
    tag: 'Webtoon',
    tier: 'Emerging',
    price: 0.88,
    apy: 19.4,
    presaleProgress: 36,
    addedAt: '2026-08-22',
    status: 'presale',
  },
  {
    id: 'inv-x4',
    title: 'Cyber Samurai',
    creatorName: 'Neo Panels',
    cover: '/artist-visual.png',
    category: 'comics-webtoons',
    tag: 'Sci-Fi',
    tier: 'Established',
    price: 3.1,
    apy: 10.1,
    addedAt: '2026-08-17',
    status: 'live',
  },
]

const defaultTiers: TierDefinition[] = [
  { name: 'Bronze', minTokens: 1, perk: 'Discord access' },
  { name: 'Silver', minTokens: 10, perk: 'Exclusive drops' },
  { name: 'Gold', minTokens: 50, perk: 'Voting rights' },
  { name: 'Diamond', minTokens: 100, perk: 'Co-creator sessions' },
]

export const creatorClubs: CreatorClub[] = [
  // Music
  {
    id: 'club-m1',
    name: 'Nova Orion Inner Circle',
    creatorName: 'Nova Orion',
    cover: '/album-neon-dreams.png',
    category: 'music',
    tag: 'Electronic',
    memberCount: 4820,
    utilities: ['voting', 'exclusive-content', 'early-access', 'ama'],
    lockedContent: 'Unreleased stems & studio diaries',
    tiers: defaultTiers,
  },
  {
    id: 'club-m2',
    name: 'The Echo Fan Club',
    creatorName: 'The Echo',
    cover: '/album-midnight.png',
    category: 'music',
    tag: 'Rock',
    memberCount: 2150,
    utilities: ['exclusive-content', 'merch', 'ama'],
    lockedContent: 'Acoustic sessions & tour presale',
    tiers: defaultTiers,
  },
  {
    id: 'club-m3',
    name: 'Desert Moon Collective',
    creatorName: 'Yonatan Sadeh',
    cover: '/album-desert.png',
    category: 'music',
    tag: 'Pop',
    memberCount: 890,
    utilities: ['voting', 'early-access'],
    lockedContent: 'Vote on next single artwork',
    tiers: defaultTiers,
  },
  // Visual Arts
  {
    id: 'club-v1',
    name: 'Genesis Patrons',
    creatorName: 'Aria Chen',
    cover: '/art-genesis.png',
    category: 'visual-arts',
    tag: 'Digital',
    memberCount: 1340,
    utilities: ['voting', 'exclusive-content', 'merch'],
    lockedContent: 'High-res prints & process videos',
    tiers: defaultTiers,
  },
  {
    id: 'club-v2',
    name: 'Vane Sculpture Guild',
    creatorName: 'Marcus Vane',
    cover: '/art-sculpture.png',
    category: 'visual-arts',
    tag: '3D',
    memberCount: 620,
    utilities: ['exclusive-content', 'early-access'],
    lockedContent: 'Behind-the-scenes sculpting timelapses',
    tiers: defaultTiers,
  },
  {
    id: 'club-v3',
    name: 'Portrait Protocol DAO',
    creatorName: 'Lia Monroe',
    cover: '/art-portrait.png',
    category: 'visual-arts',
    tag: 'NFT',
    memberCount: 3100,
    utilities: ['voting', 'exclusive-content', 'ama'],
    lockedContent: 'Commission slots & collector AMAs',
    tiers: defaultTiers,
  },
  // Content Creators
  {
    id: 'club-c1',
    name: 'ByteWave Insiders',
    creatorName: 'ByteWave',
    cover: '/video-studio.png',
    category: 'content-creators',
    tag: 'YouTube',
    memberCount: 8900,
    utilities: ['voting', 'exclusive-content', 'early-access', 'ama'],
    lockedContent: 'Extended cuts & topic voting',
    tiers: defaultTiers,
  },
  {
    id: 'club-c2',
    name: 'Signal Listeners Club',
    creatorName: 'Maya Rivers',
    cover: '/artist-nova.png',
    category: 'content-creators',
    tag: 'Podcast',
    memberCount: 4200,
    utilities: ['exclusive-content', 'ama'],
    lockedContent: 'Bonus episodes & guest Q&A',
    tiers: defaultTiers,
  },
  {
    id: 'club-c3',
    name: 'Vault Creators',
    creatorName: 'Dre Vault',
    cover: '/artist-cover.png',
    category: 'content-creators',
    tag: 'Newsletter',
    memberCount: 1560,
    utilities: ['early-access', 'merch'],
    lockedContent: 'Alpha research reports',
    tiers: defaultTiers,
  },
  // Game Developers
  {
    id: 'club-g1',
    name: 'Street Legends Dev Guild',
    creatorName: 'Pixel Forge Studio',
    cover: '/album-midnight.png',
    category: 'game-developers',
    tag: 'Sports',
    memberCount: 2340,
    utilities: ['voting', 'exclusive-content', 'early-access'],
    lockedContent: 'Vote on player kits & beta access',
    tiers: defaultTiers,
  },
  {
    id: 'club-g2',
    name: 'Neon Drift Racers',
    creatorName: 'Arcade Atlas',
    cover: '/album-neon-dreams.png',
    category: 'game-developers',
    tag: 'Racing',
    memberCount: 1780,
    utilities: ['voting', 'early-access', 'merch'],
    lockedContent: 'Car design voting & closed beta',
    tiers: defaultTiers,
  },
  {
    id: 'club-g3',
    name: 'Dungeon Protocol Council',
    creatorName: 'Rogue Bit Labs',
    cover: '/art-genesis.png',
    category: 'game-developers',
    tag: 'Roguelike',
    memberCount: 3650,
    utilities: ['voting', 'exclusive-content', 'ama'],
    lockedContent: 'Boss design votes & dev diaries',
    tiers: defaultTiers,
  },
  // Comics & Webtoons
  {
    id: 'club-x1',
    name: 'Arcane Academy Readers',
    creatorName: 'Luna Ink',
    cover: '/art-portrait.png',
    category: 'comics-webtoons',
    tag: 'Fantasy',
    memberCount: 5200,
    utilities: ['voting', 'exclusive-content', 'early-access'],
    lockedContent: 'Vote on next arc plot twists',
    tiers: defaultTiers,
  },
  {
    id: 'club-x2',
    name: 'Heroes of the Block Legion',
    creatorName: 'Ink & Iron',
    cover: '/artist-cover.png',
    category: 'comics-webtoons',
    tag: 'Superhero',
    memberCount: 7100,
    utilities: ['voting', 'merch', 'ama'],
    lockedContent: 'Character origin voting & signed prints',
    tiers: defaultTiers,
  },
  {
    id: 'club-x3',
    name: 'Shadow Realm Society',
    creatorName: 'Webtoon Collective',
    cover: '/art-sculpture.png',
    category: 'comics-webtoons',
    tag: 'Webtoon',
    memberCount: 2890,
    utilities: ['exclusive-content', 'early-access'],
    lockedContent: 'Sketch pages before public release',
    tiers: defaultTiers,
  },
]

export const upcomingDrops: UpcomingDrop[] = [
  {
    id: 'drop-1',
    title: 'Velvet Frequency EP',
    creatorName: 'Lia Monroe',
    cover: '/artist-nova.png',
    category: 'music',
    tag: 'R&B',
    launchAt: '2026-08-26T18:00:00Z',
    description: '5-track EP with streaming royalty shares opening soon.',
  },
  {
    id: 'drop-2',
    title: 'Holographic Horizons',
    creatorName: 'Aria Chen',
    cover: '/art-genesis.png',
    category: 'visual-arts',
    tag: 'Mixed Media',
    launchAt: '2026-08-27T14:00:00Z',
    description: 'Limited edition NFT collection with physical print redemption.',
  },
  {
    id: 'drop-3',
    title: 'Creator Fund S1',
    creatorName: 'ByteWave',
    cover: '/video-studio.png',
    category: 'content-creators',
    tag: 'YouTube',
    launchAt: '2026-08-28T20:00:00Z',
    description: 'Channel equity round for studio expansion & new series.',
  },
  {
    id: 'drop-4',
    title: 'Manager Mode 2026',
    creatorName: 'Indie Kickoff',
    cover: '/artist-solo.png',
    category: 'game-developers',
    tag: 'Career Sim',
    launchAt: '2026-08-29T16:00:00Z',
    description: 'Football manager sim — invest before global launch.',
  },
  {
    id: 'drop-5',
    title: 'Spellbound Academy Vol. 3',
    creatorName: 'Luna Ink',
    cover: '/art-portrait.png',
    category: 'comics-webtoons',
    tag: 'Fantasy',
    launchAt: '2026-08-30T12:00:00Z',
    description: 'Fund the next season of the hit magic-school webtoon.',
  },
  {
    id: 'drop-6',
    title: 'Pulse Protocol Remix Pack',
    creatorName: 'SYNTH//94',
    cover: '/artist-visual.png',
    category: 'music',
    tag: 'Electronic',
    launchAt: '2026-08-31T22:00:00Z',
    description: 'Remix rights bundle with producer revenue splits.',
  },
]

/** Legacy export for backward compatibility */
export const marketplaceAssets: MarketplaceAsset[] = investmentAssets
  .filter((a) => a.category === 'music')
  .map((a) => ({
    ...a,
    songName: a.title,
    artistName: a.creatorName,
    genre: a.tag,
  }))

export type MusicGenre = 'Pop' | 'Hip-Hop' | 'Electronic' | 'R&B' | 'Rock'
export type ArtistTier = CreatorTier

export const GENRE_OPTIONS = [
  { value: 'all' as const, label: 'All Genres' },
  { value: 'Pop' as const, label: 'Pop' },
  { value: 'Hip-Hop' as const, label: 'Hip-Hop' },
  { value: 'Electronic' as const, label: 'Electronic' },
  { value: 'R&B' as const, label: 'R&B' },
  { value: 'Rock' as const, label: 'Rock' },
]

export const TIER_OPTIONS = [
  { value: 'all' as const, label: 'All Tiers' },
  { value: 'Emerging' as const, label: 'Emerging' },
  { value: 'Established' as const, label: 'Established' },
  { value: 'Star' as const, label: 'Star' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'apy-desc', label: 'Highest APY' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'recent', label: 'Recently Added' },
]

export function getInvestmentsByCategory(category: CreatorCategory): InvestmentAsset[] {
  return investmentAssets.filter((a) => a.category === category)
}

export function getClubsByCategory(category: CreatorCategory): CreatorClub[] {
  return creatorClubs.filter((c) => c.category === category)
}
