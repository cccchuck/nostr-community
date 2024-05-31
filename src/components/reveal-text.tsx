import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'

type RevealTextProps = {
  text: string
  progress: MotionValue<number>
}

const RevealText = ({ text, progress }: RevealTextProps) => {
  const count = useTransform(progress, [0, 1], [0, text.length])
  const length = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(length, (latest) => text.slice(0, latest))

  return <motion.span>{displayText}</motion.span>
}

export default RevealText
