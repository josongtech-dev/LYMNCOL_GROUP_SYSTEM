import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './themeContextInstance'
import type { ThemeMode } from './themeContextInstance'

const STORAGE_KEY = 'lymncon-theme-mode'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
    window.localStorage.setItem(STORAGE_KEY, themeMode)
  }, [themeMode])

  const value = useMemo(
    () => ({
      themeMode,
      toggleTheme: () =>
        setThemeMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [themeMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
