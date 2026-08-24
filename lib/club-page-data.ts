import {
  COMMUNITY_TIER_LABELS,
  creatorClubs,
  type CommunityTier,
  type CreatorCategory,
  type CreatorClub,
  type TierDefinition,
} from '@/lib/marketplace-data'

export type ClubFeedPostType = 'text' | 'audio' | 'gallery' | 'video' | 'poll'

export type ClubFeedPost = {
  id: string
  type: ClubFeedPostType
  title: string
  body: string
  createdAt: string
  requiredTier: CommunityTier
  /** Visual preview behind blur when locked */
  previewImage?: string
  /** Mock media meta for unlocked posts */
  mediaLabel?: string
  /** Poll-only fields */
  pollOptions?: { id: string; label: string; votes: number }[]
  pollEndsAt?: string
}

export type ClubLeaderboardEntry = {
  rank: number
  username: string
  avatar: string
  tokens: number
  tier: CommunityTier
}

export type UserClubMembership = {
  displayName: string
  tokensHeld: number
  currentTier: CommunityTier
  nextTier: CommunityTier | null
  tokensToNextTier: number
  nextPerkHint: string
}

export type ClubPageDetail = CreatorClub & {
  slug: string
  avatar: string
  banner: string
  bio: string
  categoryLabel: string
  tokenSymbol: string
  tokenPrice: number
  membership: UserClubMembership
  posts: ClubFeedPost[]
  leaderboard: ClubLeaderboardEntry[]
  tierPerks: Record<CommunityTier, string[]>
}

export const CATEGORY_LABELS: Record<CreatorCategory, string> = {
  music: 'מפיק מוזיקה',
  'visual-arts': 'אמן ויזואלי',
  'content-creators': 'יוצר תוכן',
  'game-developers': 'מפתח משחקי אינדי',
  'comics-webtoons': 'אמן Webtoon',
}

const TIER_ORDER: CommunityTier[] = ['Bronze', 'Silver', 'Gold', 'Diamond']

export function getTierIndex(tier: CommunityTier): number {
  return TIER_ORDER.indexOf(tier)
}

export function canAccessTier(
  userTier: CommunityTier,
  required: CommunityTier,
): boolean {
  return getTierIndex(userTier) >= getTierIndex(required)
}

function buildTierPerks(tiers: TierDefinition[]): Record<CommunityTier, string[]> {
  const base: Record<CommunityTier, string[]> = {
    Bronze: ['גישה לדיסקורד', 'עדכוני קהילה'],
    Silver: ['תוכן בלעדי', 'דרופים מוקדמים'],
    Gold: ['זכויות הצבעה', 'שיחות AMA'],
    Diamond: ['מפגשי זום', 'שיתוף פעולה עם היוצר'],
  }
  for (const t of tiers) {
    if (!base[t.name].includes(t.perk)) {
      base[t.name] = [t.perk, ...base[t.name]]
    }
  }
  return base
}

function makeLeaderboard(seed: string): ClubLeaderboardEntry[] {
  const avatars = [
    '/artist-nova.png',
    '/artist-solo.png',
    '/artist-cover.png',
    '/artist-visual.png',
    '/art-portrait.png',
  ]
  const names = [
    'WhaleKing',
    'NovaFan_88',
    'TokenQueen',
    'BlockBeliever',
    'EarlyBird',
  ]
  const tokens = [420, 186, 142, 98, 76]
  const tiers: CommunityTier[] = ['Diamond', 'Diamond', 'Gold', 'Gold', 'Silver']
  return names.map((username, i) => ({
    rank: i + 1,
    username: `${username}_${seed.slice(-2)}`,
    avatar: avatars[i],
    tokens: tokens[i],
    tier: tiers[i],
  }))
}

function makePosts(
  club: CreatorClub,
  category: CreatorCategory,
): ClubFeedPost[] {
  const cover = club.cover
  const byCategory: Record<CreatorCategory, ClubFeedPost[]> = {
    music: [
      {
        id: `${club.id}-p1`,
        type: 'audio',
        title: 'סקיצה חדשה מהסטודיו',
        body: 'גרסה גולמית של הרצועה — רק לחברי המועדון. אשמח לפידבק על הפזמון.',
        createdAt: '2026-08-22T10:00:00Z',
        requiredTier: 'Bronze',
        mediaLabel: 'Demo · 2:14',
        previewImage: cover,
      },
      {
        id: `${club.id}-p2`,
        type: 'poll',
        title: 'איזה שיר יצא כסינגל הבא?',
        body: 'כוח ההצבעה משוקלל לפי כמות האסימונים שבידיכם.',
        createdAt: '2026-08-21T16:00:00Z',
        requiredTier: 'Silver',
        pollOptions: [
          { id: 'a', label: 'Neon Pulse', votes: 1280 },
          { id: 'b', label: 'Afterglow', votes: 940 },
          { id: 'c', label: 'Desert Drive', votes: 710 },
        ],
        pollEndsAt: '2026-08-28T23:59:00Z',
      },
      {
        id: `${club.id}-p3`,
        type: 'video',
        title: 'ערוצי שירה מקוריים — מאחורי הקלעים',
        body: 'הקלטה מלאה מהסשן, כולל טעויות וצחוקים. פתוח ל-VIP בלבד.',
        createdAt: '2026-08-20T12:00:00Z',
        requiredTier: 'Gold',
        previewImage: '/video-studio.png',
        mediaLabel: 'VIP · 8:42',
      },
      {
        id: `${club.id}-p4`,
        type: 'text',
        title: 'הזמנה לשיחת זום מחר',
        body: 'נפתח את האלבום ונענה על שאלות. דרושה דרגת יהלום.',
        createdAt: '2026-08-19T09:00:00Z',
        requiredTier: 'Diamond',
        previewImage: cover,
      },
    ],
    'visual-arts': [
      {
        id: `${club.id}-p1`,
        type: 'gallery',
        title: 'סקיצות תהליך — שלב הצבע',
        body: 'שלוש וריאציות לפני הפיינל. בחרו את האהובה עליכם בתגובות.',
        createdAt: '2026-08-22T11:00:00Z',
        requiredTier: 'Bronze',
        previewImage: cover,
        mediaLabel: '3 סקיצות',
      },
      {
        id: `${club.id}-p2`,
        type: 'poll',
        title: 'באיזה פלטת צבעים נמשיך?',
        body: 'הצבעה משוקללת לפי אחזקות.',
        createdAt: '2026-08-21T14:00:00Z',
        requiredTier: 'Silver',
        pollOptions: [
          { id: 'a', label: 'ציאן / ניאון', votes: 620 },
          { id: 'b', label: 'סגול עמוק', votes: 480 },
          { id: 'c', label: 'זהב חם', votes: 390 },
        ],
        pollEndsAt: '2026-08-27T23:59:00Z',
      },
      {
        id: `${club.id}-p3`,
        type: 'gallery',
        title: 'קבצי PSD ברזולוציה מלאה',
        body: 'שכבות מקור + מדריך קצר לשימוש מסחרי מוגבל.',
        createdAt: '2026-08-20T08:00:00Z',
        requiredTier: 'Gold',
        previewImage: cover,
      },
      {
        id: `${club.id}-p4`,
        type: 'text',
        title: 'סלוט הזמנה אישית לחודש הבא',
        body: 'פתוח לדרגת יהלום — 3 מקומות בלבד.',
        createdAt: '2026-08-18T18:00:00Z',
        requiredTier: 'Diamond',
        previewImage: cover,
      },
    ],
    'content-creators': [
      {
        id: `${club.id}-p1`,
        type: 'video',
        title: 'קאט מורחב שלא עלה ליוטיוב',
        body: '12 דקות נוספות מהראיון — בלי עריכה כבדה.',
        createdAt: '2026-08-22T13:00:00Z',
        requiredTier: 'Bronze',
        previewImage: cover,
        mediaLabel: '12:08',
      },
      {
        id: `${club.id}-p2`,
        type: 'poll',
        title: 'על איזה נושא נצלול בשבוע הבא?',
        body: 'כוח ההצבעה = כמות האסימונים.',
        createdAt: '2026-08-21T10:00:00Z',
        requiredTier: 'Silver',
        pollOptions: [
          { id: 'a', label: 'מימון יצירה', votes: 2100 },
          { id: 'b', label: 'אלגוריתמים', votes: 1540 },
          { id: 'c', label: 'קהילות VIP', votes: 1880 },
        ],
        pollEndsAt: '2026-08-26T23:59:00Z',
      },
      {
        id: `${club.id}-p3`,
        type: 'text',
        title: 'דוח אלפא פנימי למנויים',
        body: 'מספרים אמיתיים על צמיחת הערוץ — לדרגת זהב ומעלה.',
        createdAt: '2026-08-19T15:00:00Z',
        requiredTier: 'Gold',
        previewImage: cover,
      },
      {
        id: `${club.id}-p4`,
        type: 'video',
        title: 'שיחת זום חודשית עם הצוות',
        body: 'הקלטה + לינק לפגישה הבאה. יהלום בלבד.',
        createdAt: '2026-08-17T20:00:00Z',
        requiredTier: 'Diamond',
        previewImage: '/video-live.png',
      },
    ],
    'game-developers': [
      {
        id: `${club.id}-p1`,
        type: 'gallery',
        title: 'סקיצות דמויות מהבילד החדש',
        body: 'קונספט ארט לגיבור ולבוס הראשון. פידבק מתקבל!',
        createdAt: '2026-08-22T09:00:00Z',
        requiredTier: 'Bronze',
        previewImage: cover,
        mediaLabel: 'Concept Art',
      },
      {
        id: `${club.id}-p2`,
        type: 'poll',
        title: 'באיזה צבע לצבוע את חליפת הגיבור?',
        body: 'ההחלטה תשפיע על העונה הבאה. הצבעה משוקללת.',
        createdAt: '2026-08-21T12:00:00Z',
        requiredTier: 'Silver',
        pollOptions: [
          { id: 'a', label: 'ציאן ניאון', votes: 980 },
          { id: 'b', label: 'אדום קרבי', votes: 760 },
          { id: 'c', label: 'שחור / זהב', votes: 1120 },
        ],
        pollEndsAt: '2026-08-29T23:59:00Z',
      },
      {
        id: `${club.id}-p3`,
        type: 'video',
        title: 'גישה לבטא סגורה',
        body: 'בילד 0.8.2 + מפתח הפעלה. לדרגת זהב ומעלה.',
        createdAt: '2026-08-20T07:00:00Z',
        requiredTier: 'Gold',
        previewImage: cover,
        mediaLabel: 'Beta Key',
      },
      {
        id: `${club.id}-p4`,
        type: 'text',
        title: 'סשן עיצוב בוס עם המפתחים',
        body: 'זום פרטי מחר בערב — יהלום בלבד.',
        createdAt: '2026-08-18T11:00:00Z',
        requiredTier: 'Diamond',
        previewImage: cover,
      },
    ],
    'comics-webtoons': [
      {
        id: `${club.id}-p1`,
        type: 'gallery',
        title: 'פאנלים מהפרק הבא',
        body: 'טרום-פרסום לקוראי המועדון — בלי ספוילרים כבדים.',
        createdAt: '2026-08-22T14:00:00Z',
        requiredTier: 'Bronze',
        previewImage: cover,
        mediaLabel: '4 פאנלים',
      },
      {
        id: `${club.id}-p2`,
        type: 'poll',
        title: 'איזה טוויסט עלילתי נכנס לעונה?',
        body: 'הקהילה מחליטה. כוח הצבעה לפי אסימונים.',
        createdAt: '2026-08-21T17:00:00Z',
        requiredTier: 'Silver',
        pollOptions: [
          { id: 'a', label: 'בגידה של החבר', votes: 1540 },
          { id: 'b', label: 'חשיפת זהות סודית', votes: 2010 },
          { id: 'c', label: 'עולם מקביל', votes: 1320 },
        ],
        pollEndsAt: '2026-08-30T23:59:00Z',
      },
      {
        id: `${club.id}-p3`,
        type: 'gallery',
        title: 'סקיצות דמויות שלא פורסמו',
        body: 'עיצובים שנפסלו + הערות מהמאייר.',
        createdAt: '2026-08-19T13:00:00Z',
        requiredTier: 'Gold',
        previewImage: cover,
      },
      {
        id: `${club.id}-p4`,
        type: 'text',
        title: 'שם שלך כהופעת אורח בפרק',
        body: 'הטבת יהלום נדירה — הגרלה בין המחזיקים.',
        createdAt: '2026-08-16T19:00:00Z',
        requiredTier: 'Diamond',
        previewImage: cover,
      },
    ],
  }

  return byCategory[category]
}

function defaultMembership(category: CreatorCategory): UserClubMembership {
  // Simulate mid-tier member to show progress + FOMO
  if (category === 'music' || category === 'game-developers') {
    return {
      displayName: 'את/ה',
      tokensHeld: 35,
      currentTier: 'Silver',
      nextTier: 'Gold',
      tokensToNextTier: 15,
      nextPerkHint: 'חסרות לך 15 מניות כדי לפתוח את שיחת הזום מחר!',
    }
  }
  return {
    displayName: 'את/ה',
    tokensHeld: 12,
    currentTier: 'Silver',
    nextTier: 'Gold',
    tokensToNextTier: 38,
    nextPerkHint: 'חסרות לך 38 מניות כדי לפתוח הטבות VIP והצבעות מתקדמות',
  }
}

export function buildClubPageDetail(club: CreatorClub): ClubPageDetail {
  return {
    ...club,
    slug: club.id,
    avatar: club.cover,
    banner: club.cover,
    bio: club.lockedContent,
    categoryLabel: CATEGORY_LABELS[club.category],
    tokenSymbol: `$${club.id.replace('club-', '').replace(/-/g, '').slice(0, 6).toUpperCase()}`,
    tokenPrice: 2.4 + (club.memberCount % 100) / 50,
    membership: defaultMembership(club.category),
    posts: makePosts(club, club.category),
    leaderboard: makeLeaderboard(club.id),
    tierPerks: buildTierPerks(club.tiers),
  }
}

export function getClubPageById(creatorId: string): ClubPageDetail | null {
  const club = creatorClubs.find((c) => c.id === creatorId)
  if (!club) return null
  return buildClubPageDetail(club)
}

export function getAllClubIds(): string[] {
  return creatorClubs.map((c) => c.id)
}

export { COMMUNITY_TIER_LABELS, TIER_ORDER }
export type { CommunityTier, CreatorClub, CreatorCategory }
