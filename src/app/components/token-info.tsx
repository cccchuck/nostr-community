import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import RevealText from '@/components/reveal-text'
import meme0 from '@/assets/logo.jpg'
import meme1 from '@/assets/memes/meme1.jpeg'
import meme2 from '@/assets/memes/meme2.jpeg'
import meme3 from '@/assets/memes/meme3.jpeg'
import meme4 from '@/assets/memes/meme4.jpeg'
import Image from 'next/image'
import useMobile from '@/hooks/useMobile'

type ListProps = {
  text: string
}

const tokenomics = [
  '90% is allocated to Community via Fair Mint',
  '5% is allocated to Ecosystem Fund',
  '5% is allocated to Team',
]

const memes = [meme0, meme1, meme2, meme3, meme4]

const List = ({ text }: ListProps) => {
  return (
    <div className="pl-2 md:pl-4 pb-8 flex items-center">
      <div className="mr-2 md:mr-4 min-w-2 min-h-2 rounded-sm bg-white" />
      <p className="md:text-xl">{text}</p>
    </div>
  )
}

const TokenInfo = () => {
  const isMobile = useMobile()
  const targetRef = useRef(null)
  const tokenomicsContentRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const tokenomicsTitleProgress = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, 1]
  )
  const tokenomicsContentProgress = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    // The 216 is the height on mobile
    [0, tokenomicsContentRef.current?.offsetHeight || 216]
  )

  const aboutTokenTitleProgress = useTransform(
    scrollYProgress,
    [0.5, 0.6],
    [0, 1]
  )
  const aboutTokenContentProgress = useTransform(
    scrollYProgress,
    [0.7, 1],
    // 250 is the height on pc and 200 is the height on mobile
    [0, isMobile ? 200 : 250]
  )

  return (
    <motion.div ref={targetRef} className="max-w-[960px] mx-auto h-[200vh]">
      <div className="sticky top-0">
        <h2 className="px-8 md:px-0 pt-8 md:pt-12 mb-8 text-2xl md:text-4xl font-bold">
          <RevealText text="Tokenomics" progress={tokenomicsTitleProgress} />
        </h2>
        <motion.div
          className="px-8 md:px-0 overflow-hidden"
          style={{ height: tokenomicsContentProgress }}
        >
          <div ref={tokenomicsContentRef}>
            {tokenomics.map((text) => (
              <List key={text} text={text} />
            ))}
          </div>
        </motion.div>
        <h2 className="px-8 md:px-0 pt-8  mb-8 text-2xl md:text-4xl font-bold">
          <RevealText text="About $NOSTR" progress={aboutTokenTitleProgress} />
        </h2>
        <motion.div
          className="px-8 md:px-0 overflow-hidden"
          style={{ height: aboutTokenContentProgress }}
        >
          <div className="pb-4 flex w-full overflow-x-scroll">
            {memes.map((meme, index) => (
              <Image
                key={index}
                className="mr-[50px] last:mr-0 rounded-xl"
                src={meme}
                width={isMobile ? 200 : 250}
                height={isMobile ? 200 : 250}
                alt="$NOSTR"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TokenInfo
