import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Rubik, Heebo } from 'next/font/google'
import { Web3Provider } from '@/components/web3-provider'
import './globals.css'

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OwnIt — כלכלת יוצרים מבוזרת',
  description:
    'הפלטפורמה שבה אמנים בונים קהילה ריבונית, מנפיקים יצירות כ-NFT, מוכרים כרטיסים ומגייסים מימון עתידי ישירות מהמעריצים.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#020617',
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
      className={`dark bg-background ${rubik.variable} ${heebo.variable}`}
    >
      <body className="font-sans antialiased">
        <Web3Provider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Web3Provider>
      </body>
    </html>
  )
}
