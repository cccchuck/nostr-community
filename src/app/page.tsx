'use client'
import { IconBrandDiscord, IconBrandX } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'

const linkMap = new Map()
linkMap.set('twitter', 'https://twitter.com/nostrcommunity')
linkMap.set('discord', 'https://discord.gg/r9bQZn6hst')
linkMap.set('bitcoin', 'https://bitcoin.org')
linkMap.set('lightning', 'https://lightning.engineering/')
linkMap.set('nostr', 'https://nostr.com')
linkMap.set('lnfi', 'https://mainnet.nostrassets.com')

export default function Home() {
  const [theme, setTheme] = useState('light')
  const year = useMemo(() => new Date().getFullYear(), [])

  useEffect(() => {
    const matchDarkMedia = window.matchMedia('(prefers-color-scheme: dark')
    const handleChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? 'dark' : 'light')

    matchDarkMedia.addEventListener('change', handleChange)
    setTheme(matchDarkMedia.matches ? 'dark' : 'light')

    return () => {
      matchDarkMedia.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <>
      <main className="max-w-[800px] mx-auto pt-12 md:pt-24 font-mono">
        <h1 className="mb-12 font-semibold text-[36px] md:text-[45px] lg:text-[54px] text-center text-stone-900 dark:text-stone-100">
          $NOSTR Community
        </h1>
        <div className="mb-12 flex justify-center items-center">
          <Image
            src="/banner.jpeg"
            alt="$NOSTR Community"
            width={150}
            height={150}
            className="rounded-3xl"
          />
        </div>
        <p className="mb-8 text-[16px] md:text-[20px] lg:text-[24px] text-center">
          $NOSTR is a community-led memecoin.
        </p>
        <div className="mb-24 flex justify-center">
          <button
            className="
            px-6
            py-2
            font-semibold
            shadow-sm
            text-fuchsia-100
            bg-fuchsia-600
            hover:bg-fuchsia-700
            dark:text-fuchsia-100 
            dark:bg-fuchsia-600 
            dark:hover:bg-fuchsia-700 
            rounded-lg 
            transition-all 
            duration-200
            hover:scale-[1.03]
            hover:shadow-md"
          >
            <Link href={linkMap.get('discord')} target="_blank">
              Get Started
            </Link>
          </button>
        </div>
        <div className="mb-24 grid gap-4 grid-cols-2 md:grid-cols-4 auto-cols-auto">
          <div className="flex justify-center items-center">
            <Link href={linkMap.get('bitcoin')} target="_blank">
              <Image src="/btc.svg" alt="Bitcoin" width={100} height={100} />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link href={linkMap.get('lightning')} target="_blank">
              <Image
                src={theme === 'light' ? '/ll-w.svg' : '/ll.svg'}
                alt="Lightning Labs"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href={linkMap.get('nostr')}
              target="_blank"
              className="font-bold text-2xl md:text-3xl text-slate-900 dark:text-sky-100"
            >
              Nostr
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href={linkMap.get('lnfi')}
              target="_blank"
              className="font-bold text-2xl md:text-3xl text-slate-900 dark:text-sky-100"
            >
              LnFi
            </Link>
          </div>
        </div>
      </main>
      <footer className="max-w-[800px] mx-auto px-8 md:px-0 pb-12 md:pb-24 flex justify-between">
        <div className="font-semibold">$NOSTR Community {year}</div>
        <div className="flex">
          <Link
            href={linkMap.get('twitter')}
            target="_blank"
            className="flex mr-4"
          >
            <IconBrandX />
          </Link>
          <Link href={linkMap.get('discord')} target="_blank" className="flex">
            <IconBrandDiscord />
          </Link>
        </div>
      </footer>
    </>
  )
}
