import { createTheme, PaletteOptions, Theme } from "@mui/material/styles"

import { common, lightRoles, scales } from "./colors"

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

export const withPalette = (theme: Theme) =>
  createTheme({
    ...theme,
    palette: lightPalette,
  })
