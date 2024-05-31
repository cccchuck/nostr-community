import { useEffect, useState } from 'react'

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const matchMobileMedia = window.matchMedia('(max-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) =>
      setIsMobile(e.matches ? true : false)

    matchMobileMedia.addEventListener('change', handleChange)
    setIsMobile(matchMobileMedia.matches ? true : false)

    return () => {
      matchMobileMedia.removeEventListener('change', handleChange)
    }
  }, [])

  return isMobile
}

export default useMobile
