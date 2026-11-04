import { ColorRoles, Theme } from "@mui/material/styles"

import { lightPalette } from "./palette"

// Color roles for components that also render under the old theme
// (pages/_old). The old theme has no CSS variables, so it gets the light
// values; the new theme gets its CSS variables.
export const getRoles = (theme: Theme): ColorRoles =>
  theme.vars?.palette.roles ?? (lightPalette.roles as ColorRoles)
