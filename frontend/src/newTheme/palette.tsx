import { createTheme, PaletteOptions, Theme } from "@mui/material/styles"

import { common, darkRoles, lightRoles, scales } from "./colors"

export const lightPalette: PaletteOptions = {
  primary: {
    main: "#0e688b",
  },
  secondary: {
    main: "#fff",
  },
  background: {
    default: "#fff",
    paper: "#fff",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  common,
  roles: lightRoles,
  ...scales,
  contrastThreshold: 4.5,
}

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: darkRoles.accent,
  },
  secondary: {
    main: darkRoles.surfaceRaised,
  },
  background: {
    default: "#121417",
    paper: darkRoles.surfaceRaised,
  },
  text: {
    primary: darkRoles.text,
    secondary: darkRoles.textMuted,
    disabled: darkRoles.textDisabled,
  },
  divider: "rgba(255, 255, 255, 0.12)",
  common,
  roles: darkRoles,
  ...scales,
  contrastThreshold: 4.5,
}

export const withPalette = (theme: Theme) =>
  createTheme({
    ...theme,
    palette: lightPalette,
  })
