import type { Metadata } from 'next'
import { StudioShell } from '@/components/studio/studio-shell'

export const metadata: Metadata = {
  title: 'סטודיו יוצרים | VIBE',
  description:
    'מרכז הבקרה שלך — ניהול פרויקטים, קהילה, גיוס הון ותמלוגים במקום אחד.',
}

export default function CreatorStudioPage() {
  return <StudioShell />
}
