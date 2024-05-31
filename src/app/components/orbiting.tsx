import { MotionStyle, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import OrbitingCircles from '@/components/magic-ui/orbiting-circles'
import useMobile from '@/hooks/useMobile'

import Logo from '@/assets/logo.jpg'
import BTC_LOGO from '@/assets/btc.svg'
import LL_LOGO from '@/assets/ll.svg'
import LNFI_LOGO from '@/assets/lnfi.svg'

const BTC_WEBSITE = 'https://bitcoin.org'
const LL_WEBSITE = 'https://lightning.engineering'
const LNFI_WEBSITE = 'https://lnfi.network'

const ORBITING_CONFIG_MOBILE = {
  btc: {
    width: 25,
    height: 25,
    radius: 25,
  },
  ll: {
    width: 14,
    height: 28,
    radius: 60,
  },
  lnfi: {
    width: 25,
    height: 25,
    radius: 100,
  },
  $nostr: {
    width: 25,
    height: 25,
    radius: 100,
  },
  nostr: {
    radius: 150,
  },
}

const ORBITING_CONFIG = {
  btc: {
    width: 60,
    height: 60,
    radius: 60,
  },
  ll: {
    width: 30,
    height: 60,
    radius: 150,
  },
  lnfi: {
    width: 60,
    height: 60,
    radius: 240,
  },
  $nostr: {
    width: 60,
    height: 60,
    radius: 240,
  },
  nostr: {
    radius: 330,
  },
}

const Orbiting = ({ style }: { style?: MotionStyle }) => {
  const isMobile = useMobile()
  const [orbitingConfig, setOrbitingConfig] = useState<
    typeof ORBITING_CONFIG_MOBILE
  >(ORBITING_CONFIG_MOBILE)
  const orbitingCn = useMemo(
    () =>
      `h-[${isMobile ? 25 : 60}px] w-[${
        isMobile ? 25 : 60
      }px] border-none bg-transparent`,
    [isMobile]
  )

  useEffect(() => {
    if (isMobile) {
      setOrbitingConfig(ORBITING_CONFIG_MOBILE)
    } else {
      setOrbitingConfig(ORBITING_CONFIG)
    }
  }, [isMobile])

  return (
    <div className="relative">
      <motion.div
        className={`flex justify-center items-center w-screen ${
          isMobile ? 'h-[50vh]' : 'h-screen'
        }`}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        style={style}
      >
        <OrbitingCircles
          path
          className={orbitingCn}
          duration={21}
          radius={orbitingConfig.btc.radius}
          isMobile={isMobile}
        >
          <Link href={BTC_WEBSITE} target="_blank">
            <Image
              src={BTC_LOGO}
              alt="Bitcoin"
              width={orbitingConfig.btc.width}
              height={orbitingConfig.btc.height}
            />
          </Link>
        </OrbitingCircles>
        <OrbitingCircles
          path
          className={orbitingCn}
          reverse
          duration={21}
          radius={orbitingConfig.ll.radius}
          isMobile={isMobile}
        >
          <Link href={LL_WEBSITE} target="_blank">
            <Image
              src={LL_LOGO}
              alt="Lightning Labs"
              width={orbitingConfig.ll.width}
              height={orbitingConfig.ll.height}
            />
          </Link>
        </OrbitingCircles>
        <OrbitingCircles
          path
          className={orbitingCn}
          duration={21}
          delay={21}
          radius={orbitingConfig.lnfi.radius}
          isMobile={isMobile}
        >
          <Link href={LNFI_WEBSITE} target="_blank">
            <Image
              src={LNFI_LOGO}
              alt="LnFi"
              width={orbitingConfig.lnfi.width}
              height={orbitingConfig.lnfi.height}
            />
          </Link>
        </OrbitingCircles>
        <OrbitingCircles
          path
          className={orbitingCn}
          duration={21}
          radius={orbitingConfig.$nostr.radius}
          isMobile={isMobile}
        >
          <Image
            src={Logo}
            alt="$NOSTR"
            width={orbitingConfig.$nostr.width}
            height={orbitingConfig.$nostr.height}
            className="rounded-[50%]"
          />
        </OrbitingCircles>
        <OrbitingCircles
          path
          className={orbitingCn}
          reverse
          duration={21}
          radius={orbitingConfig.nostr.radius}
          isMobile={isMobile}
        >
          <Link
            href={'https://nostr.com'}
            target="_blank"
            className="font-bold text-xl md:text-3xl text-sky-100"
          >
            NOSTR
          </Link>
        </OrbitingCircles>
      </motion.div>
    </div>
  )
}

export default Orbiting
