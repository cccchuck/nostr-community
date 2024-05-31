import useMobile from '@/hooks/useMobile'
import { cn } from '@/lib/utils'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

type CursorBlinkerProps = {
  height?: number
}

export const CursorBlinker = ({ height = 16 }: CursorBlinkerProps) => {
  return (
    <motion.div
      className="inline-block w-[1px] bg-sky-100"
      style={{ height }}
      animate={{
        opacity: [0, 0, 1, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatDelay: 0,
          ease: 'linear',
          times: [0, 0.5, 0.5, 1],
        },
      }}
    />
  )
}

type RedoTextProps = {
  texts: string[]
  textSize: number
}

const RedoText = ({ texts, textSize }: RedoTextProps) => {
  const textIdx = useMotionValue(0)
  const count = useMotionValue(0)
  const countMax = Math.max(...texts.map((text) => text.length))
  const updatedThisRound = useMotionValue(true)

  const text = useTransform(textIdx, (latest) => texts[latest] || '')
  const length = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(length, (latest) =>
    text.get().slice(0, latest)
  )

  useEffect(() => {
    animate(count, countMax, {
      type: 'tween',
      delay: 0,
      duration: 1,
      ease: 'easeIn',
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false)
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIdx.get() === texts.length - 1) {
            textIdx.set(0)
          } else {
            textIdx.set(textIdx.get() + 1)
          }
          updatedThisRound.set(true)
        }
      },
    })
  }, [])

  return (
    <>
      <motion.span>{displayText}</motion.span>
      <CursorBlinker height={textSize} />
    </>
  )
}

export default RedoText
