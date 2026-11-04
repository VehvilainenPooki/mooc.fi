import { ColorRoles, Theme } from "@mui/material/styles"

import newTheme from "."
import { lightPalette } from "./palette"

const lightRoles = lightPalette.roles as ColorRoles

// Color roles for components that also render under the old theme
// (pages/_old). The old theme has no CSS variables, so it gets the light
// values; the new theme gets its CSS variables.
export const getRoles = (theme: Theme): ColorRoles =>
  theme.vars?.palette.roles ?? lightRoles

// A role as a CSS value for styles that don't receive the theme, e.g.
// `styled("div")` with a static template. MUI writes it as the role's CSS
// variable with the light value as fallback, so it also works under the old
// theme.
export const cssRole = (name: keyof ColorRoles): string =>
  newTheme.vars.palette.roles[name]
