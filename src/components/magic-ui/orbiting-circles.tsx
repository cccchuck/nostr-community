import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  isMobile = false,
}: {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  isMobile?: boolean
}) {
  const [xy, setXy] = useState<[number, number]>([0.5, 0.5])
  useEffect(() => {
    setTimeout(() => {
      // Mobile 无需 Hack SVG 位置
      if (isMobile) return
      const btc = document.querySelector('img[alt="Bitcoin"]')?.parentElement
      if (btc) {
        const { innerWidth, innerHeight } = window
        const { offsetLeft, offsetTop, clientWidth, clientHeight } = btc
        setXy([
          (offsetLeft + clientWidth / 2) / innerWidth,
          (offsetTop + clientHeight / 2) / innerHeight,
        ])
      }
    }, 1000)
  }, [])
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-white/10 stroke-1"
            cx={isMobile ? '50%' : `${xy[0] * 100}%`}
            cy={isMobile ? '50%' : `${xy[1] * 100}%`}
            r={radius}
            fill="none"
            strokeDasharray={'4 4'}
          />
        </svg>
      )}

      <div
        style={
          {
            '--duration': duration,
            '--radius': radius,
            '--delay': -delay,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex h-full w-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] ',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
