import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '我妻農場 | 宮城県角田市のお米 農家直販',
  description:
    '宮城県角田市の我妻農場から、丹精込めて育てた新鮮なお米を直接お届けします。白米・玄米を各種サイズで販売中。',
  generator: '',
  icons: {
    icon: [
      { url: '/images/icon-round-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icon-round-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-round-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/images/icon-round-32.png',
    apple: [{ url: '/images/apple-icon-round.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3efe4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`light bg-background ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
