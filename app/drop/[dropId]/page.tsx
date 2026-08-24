import { notFound } from 'next/navigation'
import { DropFundraiseView } from '@/components/drop/drop-fundraise-view'
import { getAllDropIds, getDropPageById } from '@/lib/drop-page-data'

export function generateStaticParams() {
  return getAllDropIds().map((dropId) => ({ dropId }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dropId: string }>
}) {
  const { dropId } = await params
  const drop = getDropPageById(dropId)
  if (!drop) {
    return { title: 'גיוס לא נמצא | VIBE' }
  }
  return {
    title: `${drop.title} — גיוס | VIBE`,
    description: drop.description,
  }
}

export default async function DropFundraisePage({
  params,
}: {
  params: Promise<{ dropId: string }>
}) {
  const { dropId } = await params
  const drop = getDropPageById(dropId)

  if (!drop) {
    notFound()
  }

  return <DropFundraiseView drop={drop} />
}
