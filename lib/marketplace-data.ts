export type MusicGenre = 'Pop' | 'Hip-Hop' | 'Electronic' | 'R&B' | 'Rock'

export type ArtistTier = 'Emerging' | 'Established' | 'Star'

export type SortOption = 'apy-desc' | 'price-asc' | 'recent'

export type MarketplaceAsset = {
  id: string
  songName: string
  artistName: string
  cover: string
  genre: MusicGenre
  tier: ArtistTier
  price: number
  apy: number
  /** 0–100 when asset is in an active presale */
  presaleProgress?: number
  addedAt: string
  status: 'live' | 'presale'
}

export const GENRE_OPTIONS: { value: MusicGenre | 'all'; label: string }[] = [
  { value: 'all', label: 'All Genres' },
  { value: 'Pop', label: 'Pop' },
  { value: 'Hip-Hop', label: 'Hip-Hop' },
  { value: 'Electronic', label: 'Electronic' },
  { value: 'R&B', label: 'R&B' },
  { value: 'Rock', label: 'Rock' },
]

export const TIER_OPTIONS: { value: ArtistTier | 'all'; label: string }[] = [
  { value: 'all', label: 'All Tiers' },
  { value: 'Emerging', label: 'Emerging' },
  { value: 'Established', label: 'Established' },
  { value: 'Star', label: 'Star' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'apy-desc', label: 'Highest APY' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'recent', label: 'Recently Added' },
]

export const marketplaceAssets: MarketplaceAsset[] = [
  {
    id: 'm1',
    songName: 'Neon Dreams',
    artistName: 'Nova Orion',
    cover: '/album-neon-dreams.png',
    genre: 'Electronic',
    tier: 'Star',
    price: 4.25,
    apy: 11.2,
    presaleProgress: 92,
    addedAt: '2026-08-20',
    status: 'presale',
  },
  {
    id: 'm2',
    songName: 'Midnight City',
    artistName: 'The Echo',
    cover: '/album-midnight.png',
    genre: 'Rock',
    tier: 'Established',
    price: 2.5,
    apy: 8.5,
    addedAt: '2026-08-18',
    status: 'live',
  },
  {
    id: 'm3',
    songName: 'Desert Moon',
    artistName: 'Yonatan Sadeh',
    cover: '/album-desert.png',
    genre: 'Pop',
    tier: 'Emerging',
    price: 1.15,
    apy: 14.8,
    presaleProgress: 58,
    addedAt: '2026-08-22',
    status: 'presale',
  },
  {
    id: 'm4',
    songName: 'Velvet Frequency',
    artistName: 'Lia Monroe',
    cover: '/artist-nova.png',
    genre: 'R&B',
    tier: 'Established',
    price: 3.8,
    apy: 9.1,
    addedAt: '2026-08-15',
    status: 'live',
  },
  {
    id: 'm5',
    songName: 'Block Party Anthem',
    artistName: 'Kairo West',
    cover: '/artist-solo.png',
    genre: 'Hip-Hop',
    tier: 'Star',
    price: 6.4,
    apy: 7.3,
    presaleProgress: 75,
    addedAt: '2026-08-10',
    status: 'presale',
  },
  {
    id: 'm6',
    songName: 'Pulse Protocol',
    artistName: 'SYNTH//94',
    cover: '/artist-visual.png',
    genre: 'Electronic',
    tier: 'Emerging',
    price: 0.95,
    apy: 16.4,
    addedAt: '2026-08-23',
    status: 'live',
  },
  {
    id: 'm7',
    songName: 'Golden Hour',
    artistName: 'Maya Rivers',
    cover: '/art-portrait.png',
    genre: 'Pop',
    tier: 'Established',
    price: 2.2,
    apy: 10.6,
    presaleProgress: 34,
    addedAt: '2026-08-12',
    status: 'presale',
  },
  {
    id: 'm8',
    songName: 'Crown & Concrete',
    artistName: 'Dre Vault',
    cover: '/artist-cover.png',
    genre: 'Hip-Hop',
    tier: 'Emerging',
    price: 1.75,
    apy: 12.9,
    addedAt: '2026-08-21',
    status: 'live',
  },
]
