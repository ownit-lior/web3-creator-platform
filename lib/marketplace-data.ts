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

export const CREATOR_TIER_LABELS: Record<CreatorTier, string> = {
  Emerging: 'עולה',
  Established: 'מבוסס',
  Star: 'כוכב',
}

export const COMMUNITY_TIER_LABELS: Record<CommunityTier, string> = {
  Bronze: 'ברונזה',
  Silver: 'כסף',
  Gold: 'זהב',
  Diamond: 'יהלום',
}

export const CATEGORY_CONFIG: {
  id: CreatorCategory
  investmentTitle: string
  clubTitle: string
}[] = [
  { id: 'music', investmentTitle: 'טרנדים במוזיקה', clubTitle: 'מועדוני מוזיקה' },
  { id: 'visual-arts', investmentTitle: 'אמנות ויזואלית', clubTitle: 'קולקטיבי אמנים' },
  {
    id: 'content-creators',
    investmentTitle: 'יוצרי תוכן',
    clubTitle: 'מועדוני מעריצים',
  },
  {
    id: 'game-developers',
    investmentTitle: 'מפתחי משחקים',
    clubTitle: 'גילדות אינדי',
  },
  {
    id: 'comics-webtoons',
    investmentTitle: 'קומיקס ו-Webtoons',
    clubTitle: 'עולמות סיפור',
  },
]

export const investmentAssets: InvestmentAsset[] = [
  {
    id: 'inv-m1',
    title: 'חלומות ניאון',
    creatorName: 'נובה אוריון',
    cover: '/album-neon-dreams.png',
    category: 'music',
    tag: 'אלקטרוני',
    tier: 'Star',
    price: 4.25,
    apy: 11.2,
    presaleProgress: 92,
    addedAt: '2026-08-20',
    status: 'presale',
  },
  {
    id: 'inv-m2',
    title: 'עיר חצות',
    creatorName: 'האקו',
    cover: '/album-midnight.png',
    category: 'music',
    tag: 'רוק',
    tier: 'Established',
    price: 2.5,
    apy: 8.5,
    addedAt: '2026-08-18',
    status: 'live',
  },
  {
    id: 'inv-m3',
    title: 'ירח מדבר',
    creatorName: 'יונתן שדה',
    cover: '/album-desert.png',
    category: 'music',
    tag: 'פופ',
    tier: 'Emerging',
    price: 1.15,
    apy: 14.8,
    presaleProgress: 58,
    addedAt: '2026-08-22',
    status: 'presale',
  },
  {
    id: 'inv-m4',
    title: 'המנון בלוק פארטי',
    creatorName: 'קיירו ווסט',
    cover: '/artist-solo.png',
    category: 'music',
    tag: 'היפ-הופ',
    tier: 'Star',
    price: 6.4,
    apy: 7.3,
    presaleProgress: 75,
    addedAt: '2026-08-10',
    status: 'presale',
  },
  {
    id: 'inv-v1',
    title: 'קולקציית בראשית',
    creatorName: 'אריה צ׳ן',
    cover: '/art-genesis.png',
    category: 'visual-arts',
    tag: 'ציור דיגיטלי',
    tier: 'Established',
    price: 3.2,
    apy: 9.8,
    presaleProgress: 67,
    addedAt: '2026-08-19',
    status: 'presale',
  },
  {
    id: 'inv-v2',
    title: 'סדרת פיסול א׳',
    creatorName: 'מרקוס ויין',
    cover: '/art-sculpture.png',
    category: 'visual-arts',
    tag: 'אמנות תלת-ממד',
    tier: 'Emerging',
    price: 1.85,
    apy: 13.2,
    addedAt: '2026-08-21',
    status: 'live',
  },
  {
    id: 'inv-v3',
    title: 'פרוטוקול דיוקן',
    creatorName: 'ליה מונרו',
    cover: '/art-portrait.png',
    category: 'visual-arts',
    tag: 'אמנות NFT',
    tier: 'Star',
    price: 5.6,
    apy: 8.1,
    addedAt: '2026-08-14',
    status: 'live',
  },
  {
    id: 'inv-v4',
    title: 'חלל כרומטי',
    creatorName: 'SYNTH//94',
    cover: '/artist-visual.png',
    category: 'visual-arts',
    tag: 'ג׳נרטיבי',
    tier: 'Emerging',
    price: 0.95,
    apy: 17.5,
    presaleProgress: 41,
    addedAt: '2026-08-23',
    status: 'presale',
  },
  {
    id: 'inv-c1',
    title: 'צלילות טכנולוגיה',
    creatorName: 'בייטווייב',
    cover: '/video-studio.png',
    category: 'content-creators',
    tag: 'יוטיוב',
    tier: 'Established',
    price: 2.8,
    apy: 10.4,
    presaleProgress: 83,
    addedAt: '2026-08-17',
    status: 'presale',
  },
  {
    id: 'inv-c2',
    title: 'פודקאסט הסיגנל',
    creatorName: 'מאיה ריברס',
    cover: '/artist-nova.png',
    category: 'content-creators',
    tag: 'פודקאסט',
    tier: 'Star',
    price: 4.1,
    apy: 7.9,
    addedAt: '2026-08-16',
    status: 'live',
  },
  {
    id: 'inv-c3',
    title: 'כלכלת יוצרים שבועי',
    creatorName: 'דרה וולט',
    cover: '/artist-cover.png',
    category: 'content-creators',
    tag: 'ניוזלטר',
    tier: 'Emerging',
    price: 1.2,
    apy: 15.1,
    addedAt: '2026-08-22',
    status: 'live',
  },
  {
    id: 'inv-c4',
    title: 'סשנים חיים מהסטודיו',
    creatorName: 'נובה אוריון',
    cover: '/video-live.png',
    category: 'content-creators',
    tag: 'שידור חי',
    tier: 'Established',
    price: 3.45,
    apy: 9.3,
    presaleProgress: 52,
    addedAt: '2026-08-20',
    status: 'presale',
  },
  {
    id: 'inv-g1',
    title: 'אגדות הרחוב FC',
    creatorName: 'פיקסל פורג׳ סטודיו',
    cover: '/album-midnight.png',
    category: 'game-developers',
    tag: 'סימולציית ספורט',
    tier: 'Emerging',
    price: 1.55,
    apy: 16.8,
    presaleProgress: 71,
    addedAt: '2026-08-18',
    status: 'presale',
  },
  {
    id: 'inv-g2',
    title: 'ניאון דריפט מובייל',
    creatorName: 'ארקייד אטלס',
    cover: '/album-neon-dreams.png',
    category: 'game-developers',
    tag: 'מרוצים',
    tier: 'Established',
    price: 2.9,
    apy: 11.5,
    addedAt: '2026-08-15',
    status: 'live',
  },
  {
    id: 'inv-g3',
    title: 'פרוטוקול המבוך',
    creatorName: 'רוג ביט לאבס',
    cover: '/art-genesis.png',
    category: 'game-developers',
    tag: 'רוגלייק',
    tier: 'Star',
    price: 5.2,
    apy: 8.7,
    presaleProgress: 88,
    addedAt: '2026-08-12',
    status: 'presale',
  },
  {
    id: 'inv-g4',
    title: 'מצב קריירה פרו',
    creatorName: 'אינדי קיקאוף',
    cover: '/artist-solo.png',
    category: 'game-developers',
    tag: 'סימולציית קריירה',
    tier: 'Emerging',
    price: 1.1,
    apy: 18.2,
    addedAt: '2026-08-23',
    status: 'live',
  },
  {
    id: 'inv-x1',
    title: 'אקדמיית הקסם',
    creatorName: 'לונה אינק',
    cover: '/art-portrait.png',
    category: 'comics-webtoons',
    tag: 'מנגה פנטזיה',
    tier: 'Established',
    price: 2.4,
    apy: 12.3,
    presaleProgress: 64,
    addedAt: '2026-08-19',
    status: 'presale',
  },
  {
    id: 'inv-x2',
    title: 'גיבורי הבלוק',
    creatorName: 'אינק אנד איירון',
    cover: '/artist-cover.png',
    category: 'comics-webtoons',
    tag: 'גיבורי על',
    tier: 'Star',
    price: 4.75,
    apy: 7.6,
    addedAt: '2026-08-13',
    status: 'live',
  },
  {
    id: 'inv-x3',
    title: 'ממלכת הצללים עונה 2',
    creatorName: 'קולקטיב וובטון',
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
    title: 'סייבר סמוראי',
    creatorName: 'ניאו פאנלס',
    cover: '/artist-visual.png',
    category: 'comics-webtoons',
    tag: 'מדע בדיוני',
    tier: 'Established',
    price: 3.1,
    apy: 10.1,
    addedAt: '2026-08-17',
    status: 'live',
  },
]

const defaultTiers: TierDefinition[] = [
  { name: 'Bronze', minTokens: 1, perk: 'גישה לדיסקורד' },
  { name: 'Silver', minTokens: 10, perk: 'דרופים בלעדיים' },
  { name: 'Gold', minTokens: 50, perk: 'זכויות הצבעה' },
  { name: 'Diamond', minTokens: 100, perk: 'סשנים עם היוצר' },
]

export const creatorClubs: CreatorClub[] = [
  {
    id: 'club-m1',
    name: 'מעגל פנימי — נובה אוריון',
    creatorName: 'נובה אוריון',
    cover: '/album-neon-dreams.png',
    category: 'music',
    tag: 'אלקטרוני',
    memberCount: 4820,
    utilities: ['voting', 'exclusive-content', 'early-access', 'ama'],
    lockedContent: 'סטימים שלא יצאו ויומני סטודיו',
    tiers: defaultTiers,
  },
  {
    id: 'club-m2',
    name: 'מועדון מעריצי האקו',
    creatorName: 'האקו',
    cover: '/album-midnight.png',
    category: 'music',
    tag: 'רוק',
    memberCount: 2150,
    utilities: ['exclusive-content', 'merch', 'ama'],
    lockedContent: 'סשנים אקוסטיים ומכירה מוקדמת לסיבוב',
    tiers: defaultTiers,
  },
  {
    id: 'club-m3',
    name: 'קולקטיב ירח מדבר',
    creatorName: 'יונתן שדה',
    cover: '/album-desert.png',
    category: 'music',
    tag: 'פופ',
    memberCount: 890,
    utilities: ['voting', 'early-access'],
    lockedContent: 'הצבעה על עטיפת הסינגל הבא',
    tiers: defaultTiers,
  },
  {
    id: 'club-v1',
    name: 'פטרוני בראשית',
    creatorName: 'אריה צ׳ן',
    cover: '/art-genesis.png',
    category: 'visual-arts',
    tag: 'דיגיטלי',
    memberCount: 1340,
    utilities: ['voting', 'exclusive-content', 'merch'],
    lockedContent: 'הדפסות ברזולוציה גבוהה וסרטוני תהליך',
    tiers: defaultTiers,
  },
  {
    id: 'club-v2',
    name: 'גילדת הפיסול של ויין',
    creatorName: 'מרקוס ויין',
    cover: '/art-sculpture.png',
    category: 'visual-arts',
    tag: 'תלת-ממד',
    memberCount: 620,
    utilities: ['exclusive-content', 'early-access'],
    lockedContent: 'טיימלאפסים מאחורי הקלעים של הפיסול',
    tiers: defaultTiers,
  },
  {
    id: 'club-v3',
    name: 'DAO פרוטוקול דיוקן',
    creatorName: 'ליה מונרו',
    cover: '/art-portrait.png',
    category: 'visual-arts',
    tag: 'NFT',
    memberCount: 3100,
    utilities: ['voting', 'exclusive-content', 'ama'],
    lockedContent: 'חריצי הזמנה ו-AMA לאוספים',
    tiers: defaultTiers,
  },
  {
    id: 'club-c1',
    name: 'אינסיידרים של בייטווייב',
    creatorName: 'בייטווייב',
    cover: '/video-studio.png',
    category: 'content-creators',
    tag: 'יוטיוב',
    memberCount: 8900,
    utilities: ['voting', 'exclusive-content', 'early-access', 'ama'],
    lockedContent: 'גרסאות מורחבות והצבעה על נושאים',
    tiers: defaultTiers,
  },
  {
    id: 'club-c2',
    name: 'מועדון מאזיני הסיגנל',
    creatorName: 'מאיה ריברס',
    cover: '/artist-nova.png',
    category: 'content-creators',
    tag: 'פודקאסט',
    memberCount: 4200,
    utilities: ['exclusive-content', 'ama'],
    lockedContent: 'פרקי בונוס ושאלות ותשובות עם אורחים',
    tiers: defaultTiers,
  },
  {
    id: 'club-c3',
    name: 'יוצרי הוולט',
    creatorName: 'דרה וולט',
    cover: '/artist-cover.png',
    category: 'content-creators',
    tag: 'ניוזלטר',
    memberCount: 1560,
    utilities: ['early-access', 'merch'],
    lockedContent: 'דוחות מחקר אלפא',
    tiers: defaultTiers,
  },
  {
    id: 'club-g1',
    name: 'גילדת פיתוח אגדות הרחוב',
    creatorName: 'פיקסל פורג׳ סטודיו',
    cover: '/album-midnight.png',
    category: 'game-developers',
    tag: 'ספורט',
    memberCount: 2340,
    utilities: ['voting', 'exclusive-content', 'early-access'],
    lockedContent: 'הצבעה על מדי שחקנים וגישה לבטא',
    tiers: defaultTiers,
  },
  {
    id: 'club-g2',
    name: 'נהגי ניאון דריפט',
    creatorName: 'ארקייד אטלס',
    cover: '/album-neon-dreams.png',
    category: 'game-developers',
    tag: 'מרוצים',
    memberCount: 1780,
    utilities: ['voting', 'early-access', 'merch'],
    lockedContent: 'הצבעה על עיצוב רכבים ובטא סגורה',
    tiers: defaultTiers,
  },
  {
    id: 'club-g3',
    name: 'מועצת פרוטוקול המבוך',
    creatorName: 'רוג ביט לאבס',
    cover: '/art-genesis.png',
    category: 'game-developers',
    tag: 'רוגלייק',
    memberCount: 3650,
    utilities: ['voting', 'exclusive-content', 'ama'],
    lockedContent: 'הצבעות על עיצוב בוסים ויומני פיתוח',
    tiers: defaultTiers,
  },
  {
    id: 'club-x1',
    name: 'קוראי אקדמיית הקסם',
    creatorName: 'לונה אינק',
    cover: '/art-portrait.png',
    category: 'comics-webtoons',
    tag: 'פנטזיה',
    memberCount: 5200,
    utilities: ['voting', 'exclusive-content', 'early-access'],
    lockedContent: 'הצבעה על טוויסטים בעלילה הבאה',
    tiers: defaultTiers,
  },
  {
    id: 'club-x2',
    name: 'לגיון גיבורי הבלוק',
    creatorName: 'אינק אנד איירון',
    cover: '/artist-cover.png',
    category: 'comics-webtoons',
    tag: 'גיבורי על',
    memberCount: 7100,
    utilities: ['voting', 'merch', 'ama'],
    lockedContent: 'הצבעה על מקורות דמויות והדפסות חתומות',
    tiers: defaultTiers,
  },
  {
    id: 'club-x3',
    name: 'אגודת ממלכת הצללים',
    creatorName: 'קולקטיב וובטון',
    cover: '/art-sculpture.png',
    category: 'comics-webtoons',
    tag: 'Webtoon',
    memberCount: 2890,
    utilities: ['exclusive-content', 'early-access'],
    lockedContent: 'סקיצות לפני השחרור לציבור',
    tiers: defaultTiers,
  },
]

export const upcomingDrops: UpcomingDrop[] = [
  {
    id: 'drop-1',
    title: 'EP תדר קטיפה',
    creatorName: 'ליה מונרו',
    cover: '/artist-nova.png',
    category: 'music',
    tag: 'R&B',
    launchAt: '2026-08-26T18:00:00Z',
    description: 'EP של 5 רצועות עם מניות תמלוגי סטרימינג שנפתחות בקרוב.',
  },
  {
    id: 'drop-2',
    title: 'אופקים הולוגרפיים',
    creatorName: 'אריה צ׳ן',
    cover: '/art-genesis.png',
    category: 'visual-arts',
    tag: 'מדיה מעורבת',
    launchAt: '2026-08-27T14:00:00Z',
    description: 'קולקציית NFT מוגבלת עם מימוש להדפסה פיזית.',
  },
  {
    id: 'drop-3',
    title: 'קרן יוצרים עונה 1',
    creatorName: 'בייטווייב',
    cover: '/video-studio.png',
    category: 'content-creators',
    tag: 'יוטיוב',
    launchAt: '2026-08-28T20:00:00Z',
    description: 'סבב הון לערוץ להרחבת הסטודיו וסדרה חדשה.',
  },
  {
    id: 'drop-4',
    title: 'מצב מנג׳ר 2026',
    creatorName: 'אינדי קיקאוף',
    cover: '/artist-solo.png',
    category: 'game-developers',
    tag: 'סימולציית קריירה',
    launchAt: '2026-08-29T16:00:00Z',
    description: 'סימולטור מנג׳ר כדורגל — השקיעו לפני ההשקה העולמית.',
  },
  {
    id: 'drop-5',
    title: 'אקדמיית קסמים כרך 3',
    creatorName: 'לונה אינק',
    cover: '/art-portrait.png',
    category: 'comics-webtoons',
    tag: 'פנטזיה',
    launchAt: '2026-08-30T12:00:00Z',
    description: 'מימון העונה הבאה של הוובטון על אקדמיית הקסם.',
  },
  {
    id: 'drop-6',
    title: 'חבילת רמיקסים — פרוטוקול פאלס',
    creatorName: 'SYNTH//94',
    cover: '/artist-visual.png',
    category: 'music',
    tag: 'אלקטרוני',
    launchAt: '2026-08-31T22:00:00Z',
    description: 'חבילת זכויות רמיקס עם חלוקת הכנסות למפיקים.',
  },
]

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
  { value: 'all' as const, label: 'כל הז׳אנרים' },
  { value: 'Pop' as const, label: 'פופ' },
  { value: 'Hip-Hop' as const, label: 'היפ-הופ' },
  { value: 'Electronic' as const, label: 'אלקטרוני' },
  { value: 'R&B' as const, label: 'R&B' },
  { value: 'Rock' as const, label: 'רוק' },
]

export const TIER_OPTIONS = [
  { value: 'all' as const, label: 'כל הדרגות' },
  { value: 'Emerging' as const, label: 'עולה' },
  { value: 'Established' as const, label: 'מבוסס' },
  { value: 'Star' as const, label: 'כוכב' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'apy-desc', label: 'תשואה גבוהה ביותר' },
  { value: 'price-asc', label: 'מחיר נמוך ביותר' },
  { value: 'recent', label: 'נוסף לאחרונה' },
]

export function getInvestmentsByCategory(category: CreatorCategory): InvestmentAsset[] {
  return investmentAssets.filter((a) => a.category === category)
}

export function getClubsByCategory(category: CreatorCategory): CreatorClub[] {
  return creatorClubs.filter((c) => c.category === category)
}
