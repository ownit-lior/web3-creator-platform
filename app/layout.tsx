import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Assistant,
  Cormorant_Garamond,
  Frank_Ruhl_Libre,
} from 'next/font/google'
import { AppThirdwebProvider } from '@/components/thirdweb-provider'
import './globals.css'

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  variable: '--font-aura-sans',
  display: 'swap',
})

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  variable: '--font-aura-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-aura-brand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INOVIX — כל המערכות. תכנון אחד.',
  description:
    'לא רק מתקינים מערכות — מחברים אותן לפתרון אחד. בית חכם, אודיו־וידאו, תשתיות ואבטחה בתכנון משולב.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ececea',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`scroll-smooth ${assistant.variable} ${frankRuhl.variable} ${cormorant.variable}`}
    >
      <body className="font-[family-name:var(--font-aura-sans)] antialiased">
        <AppThirdwebProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AppThirdwebProvider>
      </body>
    </html>
  )
}
