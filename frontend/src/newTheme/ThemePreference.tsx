import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { GlobalStyles } from "@mui/material"

import {
  readThemePreference,
  resolveTheme,
  ThemeName,
  themeNames,
  ThemePreference,
  writeThemePreference,
} from "./themes"
import useColorScheme from "/lib/reexports/useColorScheme"

interface ThemePreferenceContextValue {
  preference: ThemePreference
  activeTheme: ThemeName
  themeNames: ReadonlyArray<ThemeName>
  setPreference: (preference: ThemePreference) => void
}

const ThemePreferenceContext = createContext<ThemePreferenceContextValue>({
  preference: "system",
  activeTheme: themeNames[0],
  themeNames,
  setPreference: () => undefined,
})

export const useThemePreference = () => useContext(ThemePreferenceContext)

// MUI keeps its own copy of the mode in localStorage; the preference lives in
// a cookie only, so those copies are removed after MUI writes them.
const MUI_STORAGE_KEYS = [
  "mui-mode",
  "mui-color-scheme-light",
  "mui-color-scheme-dark",
]

// When the system asks for more contrast, muted text and soft borders use the
// active theme's full-strength text and border colors.
const moreContrastStyles = {
  "@media (prefers-contrast: more)": {
    ":root[data-mui-color-scheme]": {
      "--mui-palette-roles-textMuted": "var(--mui-palette-roles-text)",
      "--mui-palette-roles-textLabel": "var(--mui-palette-roles-text)",
      "--mui-palette-roles-textSubtitle": "var(--mui-palette-roles-text)",
      "--mui-palette-roles-textSecondary": "var(--mui-palette-roles-text)",
      "--mui-palette-roles-border": "var(--mui-palette-roles-borderStrong)",
      "--mui-palette-roles-borderMuted":
        "var(--mui-palette-roles-borderStrong)",
      "--mui-palette-roles-inputBorder":
        "var(--mui-palette-roles-borderStrong)",
    },
  },
}

/** Applies the cookie preference to MUI's CSS-variables theme. Must be
 * rendered inside the CssVarsProvider. */
export function ThemePreferenceProvider({ children }: React.PropsWithChildren) {
  const { setMode, setColorScheme } = useColorScheme()
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readThemePreference)
  const [activeTheme, setActiveTheme] = useState<ThemeName>(() =>
    resolveTheme(preference),
  )

  // "system" can change while the page is open.
  useEffect(() => {
    setActiveTheme(resolveTheme(preference))
    if (preference !== "system" || !window.matchMedia) {
      return
    }
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setActiveTheme(resolveTheme("system"))
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [preference])

  useEffect(() => {
    // Never MUI's "system" mode: it would use MUI's generated dark palette
    // even when no dark theme is registered.
    const mode = activeTheme === ("dark" as ThemeName) ? "dark" : "light"
    setMode(mode)
    setColorScheme({ [mode]: activeTheme })
    document.documentElement.style.colorScheme = mode
    // MUI is the parent component, so its effects (and writes) run after
    // this one; remove its copies on the next tick.
    const timeout = window.setTimeout(() =>
      MUI_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key)),
    )
    return () => window.clearTimeout(timeout)
  }, [activeTheme, setMode, setColorScheme])

  const setPreference = useCallback((next: ThemePreference) => {
    writeThemePreference(next)
    setPreferenceState(next)
  }, [])

  const value = useMemo(
    () => ({ preference, activeTheme, themeNames, setPreference }),
    [preference, activeTheme, setPreference],
  )

  return (
    <ThemePreferenceContext.Provider value={value}>
      <GlobalStyles styles={moreContrastStyles} />
      {children}
    </ThemePreferenceContext.Provider>
  )
}
