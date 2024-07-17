'use client'
import { IconBrandDiscord, IconBrandX } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { motion } from 'framer-motion'
import Orbiting from './components/orbiting'
import useMobile from '@/hooks/useMobile'
import RedoText from '@/components/redo-text'
import TokenInfo from './components/token-info'

const linkMap = new Map()
linkMap.set('twitter', 'https://twitter.com/nostrcommunity')
linkMap.set('discord', 'https://discord.gg/r9bQZn6hst')
linkMap.set('bitcoin', 'https://bitcoin.org')
linkMap.set('lightning', 'https://lightning.engineering/')
linkMap.set('nostr', 'https://nostr.com')
linkMap.set('lnfi', 'https://mainnet.nostrassets.com')

const year = new Date().getFullYear()

const Landpage = () => {
  const isMobile = useMobile()

  return (
    <motion.div className="pt-24 md:pt-32 max-w-[960px] mx-auto h-[50vh]">
      <motion.p className="mb-24 md:mb-32 px-8 md:px-0 text-3xl md:text-5xl text-center font-bold">
        Welcome to $NOSTR community
      </motion.p>
      <motion.div className="px-8 md:px-0 text-2xl md:text-4xl text-center">
        <RedoText
          texts={[
            `What's $NOSTR?`,
            `It's the first meme on Lighting Network.`,
            `What? Just a memecoin?`,
            `No!`,
            `We will make Lightning Network and Nostr ubiquitous!`,
          ]}
          textSize={isMobile ? 24 : 36}
        />
      </motion.div>
    </motion.div>
  )
}

const Footer = () => {
  return (
    <footer className="max-w-[960px] mx-auto px-8 md:px-0 pb-12 md:pb-24 flex justify-between">
      <div className="font-semibold">$NOSTR Community {year}</div>
      <div className="flex">
        <Link
          href={linkMap.get('twitter')}
          target="_blank"
          className="flex mr-4"
        >
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconBrandX />
          </motion.div>
        </Link>
        <Link href={linkMap.get('discord')} target="_blank" className="flex">
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconBrandDiscord />
          </motion.div>
        </Link>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <Landpage />
      <Orbiting />
      <TokenInfo />
      <Footer />
    </>
  )
}
