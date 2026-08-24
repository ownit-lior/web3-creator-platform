import { notFound } from 'next/navigation'
import { ClubPageView } from '@/components/club/club-page-view'
import { getAllClubIds, getClubPageById } from '@/lib/club-page-data'

export function generateStaticParams() {
  return getAllClubIds().map((creatorId) => ({ creatorId }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ creatorId: string }>
}) {
  const { creatorId } = await params
  const club = getClubPageById(creatorId)
  if (!club) {
    return { title: 'מועדון לא נמצא | VIBE' }
  }
  return {
    title: `${club.name} | מועדון יוצרים — VIBE`,
    description: club.bio,
  }
}

export default async function CreatorClubPage({
  params,
}: {
  params: Promise<{ creatorId: string }>
}) {
  const { creatorId } = await params
  const club = getClubPageById(creatorId)

  if (!club) {
    notFound()
  }

  return <ClubPageView club={club} />
}
