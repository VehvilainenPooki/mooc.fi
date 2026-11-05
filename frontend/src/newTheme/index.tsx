import { withComponents } from "./components"
import { lightPalette, withPalette } from "./palette"
import { withTypography } from "./typography"

import type {} from "@mui/x-date-pickers/themeAugmentation"
import type {} from "@mui/lab/themeAugmentation"
import type {} from "@mui/material/themeCssVarsAugmentation"

import { omit, pipe } from "remeda"

import {
  createTheme,
  CssVarsThemeOptions,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles"

let baseTheme = createTheme({
  breakpoints: {
    values: {
      xxxs: 0,
      xxs: 360,
      xs: 480,
      sm: 640,
      md: 960,
      desktop: 1024,
      lg: 1200,
      xl: 1600,
      xxl: 7680,
    },
  },
})

baseTheme = pipe(baseTheme, withPalette, withTypography, withComponents)

// Colors live in color schemes and are emitted as CSS variables by
// Experimental_CssVarsProvider. Add more schemes next to `light`.
export const themeOptions = {
  ...omit(baseTheme, ["palette"]),
  colorSchemes: {
    light: { palette: lightPalette },
  },
} as CssVarsThemeOptions

const theme = extendTheme(themeOptions)

export { fontVariableClass } from "./typography"
export default theme
