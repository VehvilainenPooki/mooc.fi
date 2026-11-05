// The registered themes and the user's theme preference.
//
// Adding a theme means adding its color scheme to the new theme and its name
// here. The preference is kept in a cookie only: "system" (or no cookie)
// follows the operating system's light/dark setting.

export const themeNames = ["light", "dark"] as const
export type ThemeName = (typeof themeNames)[number]
export type ThemePreference = ThemeName | "system"

export const THEME_COOKIE = "mooc-theme"
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

export const isThemeName = (value: unknown): value is ThemeName =>
  (themeNames as ReadonlyArray<unknown>).includes(value)

export const readThemePreference = (): ThemePreference => {
  if (typeof document === "undefined") {
    return "system"
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=([^;]*)`),
  )
  const value = match ? decodeURIComponent(match[1]) : undefined
  return isThemeName(value) ? value : "system"
}

export const writeThemePreference = (preference: ThemePreference) => {
  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(
    preference,
  )}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`
}

const systemPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches

/** The theme to show for a preference: "system" picks dark when the OS asks
 * for it and a dark theme is registered, otherwise the first theme. */
export const resolveTheme = (preference: ThemePreference): ThemeName => {
  if (preference !== "system") {
    return preference
  }
  const dark = themeNames.find((name) => name === ("dark" as ThemeName))
  return systemPrefersDark() && dark ? dark : themeNames[0]
}

/** Runs before the first paint (see _document), so the page never flashes
 * the wrong theme. Kept dependency-free: it is inlined as a string. */
export const themeInitScript = `(function () {
  try {
    var names = ${JSON.stringify(themeNames)};
    var match = document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE}=([^;]*)/);
    var preference = match ? decodeURIComponent(match[1]) : "system";
    if (names.indexOf(preference) === -1) {
      var dark = names.indexOf("dark") !== -1 && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      preference = dark ? "dark" : names[0];
    }
    document.documentElement.setAttribute("data-mui-color-scheme", preference);
    document.documentElement.style.colorScheme = preference === "dark" ? "dark" : "light";
  } catch (e) {}
})();`
