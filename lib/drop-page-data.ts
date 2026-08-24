import {
  CREATOR_TIER_LABELS,
  creatorClubs,
  type CreatorCategory,
  type CreatorTier,
  type InvestmentAsset,
  investmentAssets,
} from '@/lib/marketplace-data'

export type DropTokenomicsConfig = {
  royaltyEquityPct: number
  raiseTargetUsd: number
  includeLiquidityPool: boolean
  platformFeePct: number
  vestingMonths: number
  tokenSymbol: string
}

export type DropPageDetail = InvestmentAsset & {
  description: string
  longDescription: string
  tokenSymbol: string
  clubId: string
  tokenomics: DropTokenomicsConfig
  raisedUsd: number
}

/** Per-drop tokenomics — mirrors what the creator configured in Studio */
const DROP_TOKENOMICS: Record<string, Omit<DropTokenomicsConfig, never> & { clubId: string; description: string; longDescription: string }> = {
  'inv-m1': {
    royaltyEquityPct: 20,
    raiseTargetUsd: 82_400,
    includeLiquidityPool: true,
    platformFeePct: 7.5,
    vestingMonths: 3,
    tokenSymbol: '$NOVA',
    clubId: 'club-m1',
    description: 'EP אלקטרוני עם גיוס פעיל — השקיעו בתמלוגי סטרימינג עתידיים.',
    longDescription:
      'חלומות ניאון הוא פרויקט הדגל של נובה אוריון. 20% מהתמלוגים העתידיים (ספוטיפיי, Apple Music) מוצעים לקהילה. היוצר מגייס מימון להפקה, מיקס מאסטר וקמפיין השקה.',
  },
  'inv-m2': {
    royaltyEquityPct: 15,
    raiseTargetUsd: 48_000,
    includeLiquidityPool: true,
    platformFeePct: 7.5,
    vestingMonths: 3,
    tokenSymbol: '$ECHO',
    clubId: 'club-m2',
    description: 'סינגל רוק עם presale פתוח — תמלוגים שקופים on-chain.',
    longDescription:
      'עיר חצות מביאה את סאונד הרוק של האקו לבלוקצ\'יין. משקיעים מקבלים חלק ישיר מהכנסות הזמנה והסטרימינג.',
  },
  'inv-m3': {
    royaltyEquityPct: 25,
    raiseTargetUsd: 28_600,
    includeLiquidityPool: true,
    platformFeePct: 7.5,
    vestingMonths: 3,
    tokenSymbol: '$SADE',
    clubId: 'club-m3',
    description: 'פופ מדברי — גיוס לסינגל הבא והקלטות אולפן.',
    longDescription:
      'יונתן שדה מוכר 25% מתמלוגי ירח מדבר לקהילה המוקדמת. כספי הגיוס מממנים הפקה, וידאו קlip ושיווק.',
  },
  'inv-v1': {
    royaltyEquityPct: 18,
    raiseTargetUsd: 36_000,
    includeLiquidityPool: false,
    platformFeePct: 10,
    vestingMonths: 1,
    tokenSymbol: '$GEN',
    clubId: 'club-v1',
    description: 'אוסף דיגיטלי בראשית — מכירות הדפסות ו-Licensed merch.',
    longDescription:
      'אריה צ\'ן מציע 18% מהכנסות מכירות הדפסות ו-NFT לפטרונים. שקיפות מלאה בחלוקת הרווחים.',
  },
  'inv-g1': {
    royaltyEquityPct: 30,
    raiseTargetUsd: 95_000,
    includeLiquidityPool: true,
    platformFeePct: 7.5,
    vestingMonths: 6,
    tokenSymbol: '$FC',
    clubId: 'club-g1',
    description: 'משחק ספורט אינדי — equity בתמלוגי Steam ו-In-app.',
    longDescription:
      'אגדות הרחוב FC הוא סימולציית ספורט עם מודל תמלוגים לפי הכנסות Steam. 30% מהתמלוגים לקהילה, vesting של 6 חודשים.',
  },
}

function findClubIdForCreator(creatorName: string): string {
  return creatorClubs.find((c) => c.creatorName === creatorName)?.id ?? 'club-m1'
}

function buildDropPage(asset: InvestmentAsset): DropPageDetail | null {
  if (asset.status !== 'presale') return null

  const defaults = {
    royaltyEquityPct: 20,
    raiseTargetUsd: Math.max(25_000, Math.round(asset.price * 18_000)),
    includeLiquidityPool: true,
    platformFeePct: 7.5,
    vestingMonths: 3,
    tokenSymbol: '$VIBE',
    clubId: findClubIdForCreator(asset.creatorName),
    description: `גיוס פעיל לפרויקט ${asset.title} — שקיפות מלאה בטוקנומיקס.`,
    longDescription: `השקיעו ב${asset.title} של ${asset.creatorName}. התמלוגים מהיצירה מחולקים אוטומטית דרך חוזה חכם.`,
  }

  const meta = DROP_TOKENOMICS[asset.id] ?? defaults
  const progress = asset.presaleProgress ?? 0
  const raiseTarget = meta.raiseTargetUsd ?? defaults.raiseTargetUsd
  const raisedUsd = Math.round((raiseTarget * progress) / 100)

  return {
    ...asset,
    description: meta.description,
    longDescription: meta.longDescription,
    tokenSymbol: meta.tokenSymbol,
    clubId: meta.clubId,
    raisedUsd,
    tokenomics: {
      royaltyEquityPct: meta.royaltyEquityPct,
      raiseTargetUsd: raiseTarget,
      includeLiquidityPool: meta.includeLiquidityPool,
      platformFeePct: meta.platformFeePct,
      vestingMonths: meta.vestingMonths,
      tokenSymbol: meta.tokenSymbol,
    },
  }
}

const dropPages: DropPageDetail[] = investmentAssets
  .map(buildDropPage)
  .filter((d): d is DropPageDetail => d != null)

export function getAllDropIds(): string[] {
  return dropPages.map((d) => d.id)
}

export function getDropPageById(dropId: string): DropPageDetail | undefined {
  return dropPages.find((d) => d.id === dropId)
}

export function getFeaturedPresaleDrops(limit = 6): DropPageDetail[] {
  return dropPages
    .filter((d) => d.status === 'presale')
    .slice(0, limit)
}

export { CREATOR_TIER_LABELS, type CreatorCategory, type CreatorTier }
