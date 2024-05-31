import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '$NOSTR Community',
  description: '$NOSTR will go the moon',
  openGraph: {
    type: 'website',
    url: 'https://nostr.community',
    title: '$NOSTR Community',
    description: 'The first memecoin on Lightning Network',
    images: [
      {
        url: 'https://nostr.community/logo.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
