import type { Metadata } from 'next'
import { PortfolioShell } from '@/components/portfolio/portfolio-shell'

export const metadata: Metadata = {
  title: 'תיק משקיע | VIBE',
  description:
    'סקירת תיק, אסימונים, תמלוגים ומועדונים — כל ההשקעות שלך במקום אחד.',
}

export default function InvestorPortfolioPage() {
  return <PortfolioShell />
}
