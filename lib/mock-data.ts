// כל הנתונים כאן הם נתוני דמו (mock) בעברית לצורך הדגמת הפלטפורמה.

export type Song = {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
  plays: string
  price: string
  cat: string
  sub: string
}

export type VideoItem = {
  id: string
  title: string
  artist: string
  thumbnail: string
  length: string
  views: string
  cat: string
  sub: string
}

export type ArtItem = {
  id: string
  title: string
  artist: string
  image: string
  editions: string
  price: string
  cat: string
  sub: string
}

export const songs: Song[] = [
  {
    id: 's1',
    title: 'חלומות ניאון',
    artist: 'נובה אוריון',
    cover: '/album-neon-dreams.png',
    duration: '3:42',
    plays: '1.2M',
    price: '0.08 ETH',
    cat: 'music',
    sub: 'electronic',
  },
  {
    id: 's2',
    title: 'חצות בעיר',
    artist: 'להקת ההד',
    cover: '/album-midnight.png',
    duration: '4:15',
    plays: '842K',
    price: '0.05 ETH',
    cat: 'music',
    sub: 'rock',
  },
  {
    id: 's3',
    title: 'ירח מדברי',
    artist: 'יונתן שדה',
    cover: '/album-desert.png',
    duration: '5:01',
    plays: '640K',
    price: '0.06 ETH',
    cat: 'music',
    sub: 'folk',
  },
]

export const videos: VideoItem[] = [
  {
    id: 'v1',
    title: 'הופעה חיה מתל אביב — הסט המלא',
    artist: 'נובה אוריון',
    thumbnail: '/video-live.png',
    length: '48:20',
    views: '523K צפיות',
    cat: 'video',
    sub: 'live',
  },
  {
    id: 'v2',
    title: 'מאחורי הקלעים באולפן ההקלטות',
    artist: 'להקת ההד',
    thumbnail: '/video-studio.png',
    length: '12:07',
    views: '211K צפיות',
    cat: 'video',
    sub: 'bts',
  },
]

export const artworks: ArtItem[] = [
  {
    id: 'a1',
    title: 'בראשית #01',
    artist: 'מאיה דיגיטל',
    image: '/art-genesis.png',
    editions: '1 מתוך 50',
    price: '0.42 ETH',
    cat: 'visual',
    sub: 'digital',
  },
  {
    id: 'a2',
    title: 'שברי אור',
    artist: 'מאיה דיגיטל',
    image: '/art-portrait.png',
    editions: '1 מתוך 25',
    price: '0.9 ETH',
    cat: 'visual',
    sub: 'painting',
  },
  {
    id: 'a3',
    title: 'צורה נוזלית',
    artist: 'מאיה דיגיטל',
    image: '/art-sculpture.png',
    editions: '1 מתוך 10',
    price: '1.4 ETH',
    cat: 'visual',
    sub: '3d',
  },
]

export const trendingArtists = [
  { id: 'ar1', name: 'נובה אוריון', avatar: '/artist-nova.png', genre: 'אלקטרוני', followers: '128K' },
  { id: 'ar2', name: 'יונתן שדה', avatar: '/artist-solo.png', genre: 'אינדי־פולק', followers: '64K' },
  { id: 'ar3', name: 'מאיה דיגיטל', avatar: '/artist-visual.png', genre: 'אמנות ויזואלית', followers: '96K' },
]

export type CommunityPost = {
  id: string
  author: string
  avatar: string
  time: string
  content: string
  likes: number
  comments: number
  tokenGated?: boolean
}

export const communityPosts: CommunityPost[] = [
  {
    id: 'p1',
    author: 'נובה אוריון',
    avatar: '/artist-nova.png',
    time: 'לפני שעתיים',
    content:
      'תודה לכל מי שהחזיק את הטוקן $NOVA — בזכותכם האלבום הבא ממומן ב-100%. הבוקר סיימנו את המיקס של השיר הראשון, ואתם תשמעו אותו לפני כולם.',
    likes: 2143,
    comments: 187,
  },
  {
    id: 'p2',
    author: 'נובה אוריון',
    avatar: '/artist-nova.png',
    time: 'אתמול',
    content:
      'שחררתי דמו אקוסטי בלעדי למחזיקי הכרטיס העונתי. היכנסו לאזור התוכן הבלעדי כדי להאזין.',
    likes: 1520,
    comments: 96,
    tokenGated: true,
  },
]

export type Ticket = {
  id: string
  event: string
  venue: string
  date: string
  price: string
  remaining: number
  total: number
}

export const tickets: Ticket[] = [
  {
    id: 't1',
    event: 'סיבוב הופעות "חלומות ניאון"',
    venue: 'זאפה, תל אביב',
    date: '14 בספטמבר 2026',
    price: '0.12 ETH',
    remaining: 84,
    total: 500,
  },
  {
    id: 't2',
    event: 'הופעה אקוסטית אינטימית',
    venue: 'ברבי, תל אביב',
    date: '2 באוקטובר 2026',
    price: '0.2 ETH',
    remaining: 12,
    total: 120,
  },
]

// ── קטגוריות ותתי־קטגוריות לסינון ──────────────────────────────
export type Category = {
  id: string
  label: string
  sub: { id: string; label: string }[]
}

export const categories: Category[] = [
  {
    id: 'music',
    label: 'מוזיקה',
    sub: [
      { id: 'rock', label: 'רוק' },
      { id: 'pop', label: 'פופ' },
      { id: 'electronic', label: 'אלקטרוני' },
      { id: 'folk', label: 'פולק' },
      { id: 'hiphop', label: 'היפ־הופ' },
    ],
  },
  {
    id: 'visual',
    label: 'אמנות ויזואלית',
    sub: [
      { id: 'digital', label: 'דיגיטלי' },
      { id: 'painting', label: 'ציור' },
      { id: '3d', label: 'תלת־מימד' },
      { id: 'photo', label: 'צילום' },
    ],
  },
  {
    id: 'video',
    label: 'וידאו',
    sub: [
      { id: 'live', label: 'הופעות חיות' },
      { id: 'bts', label: 'מאחורי הקלעים' },
      { id: 'shortfilm', label: 'סרטים קצרים' },
    ],
  },
  {
    id: 'comedy',
    label: 'סטנד־אפ',
    sub: [
      { id: 'standup', label: 'מופעים' },
      { id: 'sketch', label: 'מערכונים' },
    ],
  },
]

// קטגוריות רישום לאמנים
export const artistCategories = [
  'מוזיקאי',
  'צייר',
  'סטנדאפיסט',
  'יוצר תוכן',
  'במאי',
  'צלם',
  'מעצב 3D',
] as const

// ── קהילות ──────────────────────────────────────────────────
export type Community = {
  id: string
  name: string
  avatar: string
  cover: string
  category: string
  members: string
  token: string
  tokenPrice: string
  description: string
}

export const communities: Community[] = [
  {
    id: 'c1',
    name: 'נובה אוריון',
    avatar: '/artist-nova.png',
    cover: '/artist-cover.png',
    category: 'מוזיקה אלקטרונית',
    members: '128K',
    token: '$NOVA',
    tokenPrice: '0.004 ETH',
    description:
      'קהילת המעריצים הרשמית של נובה אוריון — גישה מוקדמת לשירים, תוכן בלעדי והצבעות על כיוון האלבום הבא.',
  },
  {
    id: 'c2',
    name: 'יונתן שדה',
    avatar: '/artist-solo.png',
    cover: '/album-desert.png',
    category: 'אינדי־פולק',
    members: '64K',
    token: '$SADE',
    tokenPrice: '0.002 ETH',
    description:
      'מסע אקוסטי אינטימי. מחזיקי הטוקן מקבלים הזמנות לחזרות פתוחות ולהופעות סלון.',
  },
  {
    id: 'c3',
    name: 'מאיה דיגיטל',
    avatar: '/artist-visual.png',
    cover: '/art-genesis.png',
    category: 'אמנות דיגיטלית',
    members: '96K',
    token: '$MAYA',
    tokenPrice: '0.006 ETH',
    description:
      'סטודיו לאמנות גנרטיבית. חברי הקהילה מצביעים על יצירות ומקבלים הדפסות בלעדיות.',
  },
]

// ── תיק השקעות של מעריץ ──────────────────────────────────────
export type Holding = {
  id: string
  token: string
  artist: string
  avatar: string
  amount: string
  value: string
  change: string
  up: boolean
}

export const fanHoldings: Holding[] = [
  {
    id: 'h1',
    token: '$NOVA',
    artist: 'נובה אוריון',
    avatar: '/artist-nova.png',
    amount: '1,250',
    value: '5.0 ETH',
    change: '+18.4%',
    up: true,
  },
  {
    id: 'h2',
    token: '$MAYA',
    artist: 'מאיה דיגיטל',
    avatar: '/artist-visual.png',
    amount: '430',
    value: '2.58 ETH',
    change: '+7.1%',
    up: true,
  },
  {
    id: 'h3',
    token: '$SADE',
    artist: 'יונתן שדה',
    avatar: '/artist-solo.png',
    amount: '820',
    value: '1.64 ETH',
    change: '-3.2%',
    up: false,
  },
]

export const fanStats = [
  { label: 'קהילות פעילות', value: '3' },
  { label: 'יצירות שנרכשו', value: '11' },
  { label: 'שווי תיק', value: '9.22 ETH', profit: true },
  { label: 'ימים בפלטפורמה', value: '214' },
]

export const fanActivity = [
  { id: 'fa1', text: 'רכשת 200 $NOVA', time: 'לפני 3 שעות', tone: 'primary' as const },
  { id: 'fa2', text: 'הצטרפת לקהילה של מאיה דיגיטל', time: 'אתמול', tone: 'accent' as const },
  { id: 'fa3', text: 'רכשת NFT "שברי אור"', time: 'לפני 4 ימים', tone: 'primary' as const },
  { id: 'fa4', text: 'הצבעת בסקר "כיוון האלבום הבא"', time: 'לפני שבוע', tone: 'muted' as const },
]

// ── סטטיסטיקות אמן ──────────────────────────────────────────
export const artistStats = [
  { label: 'הכנסה כוללת', value: '84.6 ETH', profit: true },
  { label: 'מחזיקי טוקן', value: '128K' },
  { label: 'טוקנים שהונפקו', value: '4' },
  { label: 'שיעור מעורבות', value: '72%' },
]

export type MintedToken = {
  id: string
  name: string
  supply: string
  holders: string
  floor: string
  raised: string
}

export const mintedTokens: MintedToken[] = [
  {
    id: 'mt1',
    name: '$NOVA — טוקן הקהילה',
    supply: '1,000,000',
    holders: '128K',
    floor: '0.004 ETH',
    raised: '48.2 ETH',
  },
  {
    id: 'mt2',
    name: 'כרטיס עונתי 2026',
    supply: '2,500',
    holders: '2,140',
    floor: '0.15 ETH',
    raised: '21.4 ETH',
  },
  {
    id: 'mt3',
    name: 'NFT "חלומות ניאון"',
    supply: '50',
    holders: '50',
    floor: '0.42 ETH',
    raised: '15.0 ETH',
  },
]

export const artistAnalytics = [
  { label: 'מעריצים חדשים החודש', value: '+8,420', hint: 'גידול של 12%' },
  { label: 'הכנסה החודש', value: '9.8 ETH', hint: 'מ־מכירות וטוקנים' },
  { label: 'צפיות בתוכן בלעדי', value: '412K', hint: 'ב-30 הימים האחרונים' },
  { label: 'שיעור החזקת טוקן', value: '89%', hint: 'מחזיקים לאורך זמן' },
]

export const audienceBreakdown = [
  { label: 'תל אביב', value: 38 },
  { label: 'ירושלים', value: 21 },
  { label: 'חיפה', value: 16 },
  { label: 'באר שבע', value: 12 },
  { label: 'אחר', value: 13 },
]

export const countries = [
  'ישראל',
  'ארצות הברית',
  'בריטניה',
  'גרמניה',
  'צרפת',
  'קנדה',
  'ברזיל',
  'יפן',
  'אחר',
] as const

export const dashboardArtistProfile = {
  fullName: 'נועה ברק',
  stageName: 'נובה אוריון',
  email: 'nova@ownit.io',
  genre: 'אלקטרוני / סינת׳-פופ',
  location: 'תל אביב, ישראל',
  wallet: '0x7A21…91C4',
  joined: 'מרץ 2025',
  avatar: '/artist-nova.png',
}

export const artistFinance = {
  earningsEth: '12.48 ETH',
  earningsUsd: '$42,180',
  expensesEth: '3.16 ETH',
  expensesUsd: '$10,670',
  netEth: '9.32 ETH',
  netUsd: '$31,510',
  earningsBreakdown: [
    { label: 'סטרימינג', value: '4.82 ETH' },
    { label: 'מכירת טוקנים', value: '5.10 ETH' },
    { label: 'כרטיסים', value: '2.56 ETH' },
  ],
  expensesBreakdown: [
    { label: 'הפקה ואולפן', value: '1.84 ETH' },
    { label: 'קידום', value: '0.92 ETH' },
    { label: 'עמלות פלטפורמה', value: '0.40 ETH' },
  ],
}

export type UploadedSong = {
  id: string
  title: string
  cover: string
  released: string
  duration: string
  spotify: string
  youtube: string
  status: 'פעיל' | 'טיוטה'
}

export const uploadedSongs: UploadedSong[] = [
  {
    id: 'us1',
    title: 'חלומות ניאון',
    cover: '/album-neon-dreams.png',
    released: '14.03.2026',
    duration: '3:42',
    spotify: '1.24M',
    youtube: '812K',
    status: 'פעיל',
  },
  {
    id: 'us2',
    title: 'חצות בעיר',
    cover: '/album-midnight.png',
    released: '02.01.2026',
    duration: '4:15',
    spotify: '640K',
    youtube: '391K',
    status: 'פעיל',
  },
  {
    id: 'us3',
    title: 'ירח מדברי',
    cover: '/album-desert.png',
    released: '18.11.2025',
    duration: '5:01',
    spotify: '428K',
    youtube: '255K',
    status: 'פעיל',
  },
  {
    id: 'us4',
    title: 'דמו — אורות צפון',
    cover: '/album-neon-dreams.png',
    released: 'טיוטה',
    duration: '2:58',
    spotify: '—',
    youtube: '—',
    status: 'טיוטה',
  },
]

export const streamByMonth = [
  { month: 'מרץ', spotify: 82, youtube: 54 },
  { month: 'אפר׳', spotify: 96, youtube: 61 },
  { month: 'מאי', spotify: 88, youtube: 73 },
  { month: 'יונ׳', spotify: 124, youtube: 90 },
  { month: 'יול׳', spotify: 141, youtube: 102 },
  { month: 'אוג׳', spotify: 168, youtube: 118 },
]

export const dashboardInvestorProfile = {
  fullName: 'אלון מזרחי',
  email: 'alon@ownit.io',
  location: 'הרצליה, ישראל',
  wallet: '0x3F90…12AB',
  joined: 'ינואר 2026',
  risk: 'מאוזן',
  avatar: '/placeholder-user.jpg',
}

export type Investment = {
  id: string
  artist: string
  avatar: string
  asset: string
  invested: string
  currentValue: string
  revenue: string
  revenuePerHour: string
  roi: string
  roiUp: boolean
}

export const investorPortfolio: Investment[] = [
  {
    id: 'inv1',
    artist: 'נובה אוריון',
    avatar: '/artist-nova.png',
    asset: 'חלומות ניאון · $NOVA',
    invested: '1.80 ETH',
    currentValue: '2.41 ETH',
    revenue: '0.214 ETH',
    revenuePerHour: '+0.0008 ETH/שעה',
    roi: '+33.9%',
    roiUp: true,
  },
  {
    id: 'inv2',
    artist: 'יונתן שדה',
    avatar: '/artist-solo.png',
    asset: 'ירח מדברי · $SADE',
    invested: '0.90 ETH',
    currentValue: '0.97 ETH',
    revenue: '0.062 ETH',
    revenuePerHour: '+0.0002 ETH/שעה',
    roi: '+7.8%',
    roiUp: true,
  },
  {
    id: 'inv3',
    artist: 'מאיה דיגיטל',
    avatar: '/artist-visual.png',
    asset: 'שברי אור · $MAYA',
    invested: '1.20 ETH',
    currentValue: '1.08 ETH',
    revenue: '0.031 ETH',
    revenuePerHour: '+0.0001 ETH/שעה',
    roi: '-10.0%',
    roiUp: false,
  },
]

export const investorTotals = {
  invested: '3.90 ETH',
  currentValue: '4.46 ETH',
  revenue: '0.307 ETH',
  roi: '+14.4%',
}
