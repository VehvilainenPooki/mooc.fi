import { useMemo } from "react"

import mediaQuery from "css-mediaquery"
import { useRouter } from "next/router"

import {
  createTheme,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles"

import useIsOld from "./useIsOld"
import { datePickersfiFI, fiFI } from "/lib/locale"
import { themeOptions as newThemeOptions } from "/src/newTheme"
import originalTheme from "/src/theme"

const getMediaQueryDefaultProps = (deviceType?: string) => {
  const ssrMatchMedia = (query: string) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: deviceType === "mobile" ? "0px" : "1024px",
    }),
  })

  return {
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia,
        },
      },
    },
  }
}

export default function useThemeWithLocale(deviceType?: string) {
  const router = useRouter()
  const { locale = "fi" } = router

  const isOld = useIsOld()

  // The new theme uses CSS variables (Experimental_CssVarsProvider), the old
  // one a plain theme (ThemeProvider).
  const themeWithLocale = useMemo(() => {
    const localeOptions =
      locale === "fi" ? [fiFI, datePickersfiFI] : ([] as object[])
    const extraOptions = [
      ...localeOptions,
      getMediaQueryDefaultProps(deviceType),
    ]

    return isOld
      ? {
          isCssVarsTheme: false as const,
          theme: createTheme(originalTheme, ...extraOptions),
        }
      : {
          isCssVarsTheme: true as const,
          theme: extendTheme(newThemeOptions, ...extraOptions),
        }
  }, [isOld, locale, deviceType])

  return themeWithLocale
}
