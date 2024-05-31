import { useState, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState('light')

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

  return theme
}

export default useTheme
