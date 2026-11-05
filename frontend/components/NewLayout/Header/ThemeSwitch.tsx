import React, { useId, useState } from "react"

import { MenuItem, MenuList } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useEventCallback } from "@mui/material/utils"

import CaretDownIcon from "../Icons/CaretDown"
import CaretUpIcon from "../Icons/CaretUp"
import MoonIcon from "../Icons/Moon"
import SunIcon from "../Icons/Sun"
import {
  LanguageSwitchContainer,
  LanguageSwitchMenu,
  LanguageSwitchToggle,
} from "./LanguageSwitch"
import { useTranslator } from "/hooks/useTranslator"
import { useThemePreference } from "/src/newTheme/ThemePreference"
import { ThemeName, ThemePreference } from "/src/newTheme/themes"
import { fontSize } from "/src/theme/util"
import CommonTranslations from "/translations/common"

// The language switch hides its leading icon on small screens; here the icon is the label, so it
// always shows. With no text to give it a line height, the toggle is held to the language
// switch's height, so the open-menu strip along its bottom edge doesn't cover the icon.
const ThemeSwitchToggle = styled(LanguageSwitchToggle)(
  ({ theme }) => `
  grid-template-columns: repeat(2, auto);

  svg:first-of-type {
    display: inline-block !important;
  }
  ${theme.breakpoints.up("lg")} {
    grid-template-columns: repeat(2, auto);
    min-height: 24px;
  }
`,
)

const ThemeOptionList = styled(MenuList)`
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
`

const ThemeOption = styled(MenuItem)(
  ({ theme }) => `
  ${fontSize(16, 24)}
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0;
  padding: 12px;
  color: ${theme.vars.palette.roles.navLink};
  border: 2px solid transparent;

  &:hover,
  &.Mui-focusVisible {
    color: ${theme.vars.palette.roles.accent};
    background-color: ${theme.vars.palette.roles.surfaceHover};
  }

  &.Mui-selected,
  &.Mui-selected.Mui-focusVisible {
    color: ${theme.vars.palette.roles.text};
    background-color: transparent;
    border-color: ${theme.vars.palette.roles.borderStrong};

    &:hover {
      background-color: ${theme.vars.palette.roles.surfaceHover};
    }
  }
`,
)

/** An icon button showing the active theme. It opens a menu to pick a theme or follow the system
 * setting. Hidden while only one theme is registered. */
function ThemeSwitch() {
  const t = useTranslator(CommonTranslations)
  const id = useId()
  const toggleId = `theme-switch-${id}`
  const menuId = `theme-switch-menu-${id}`
  const { preference, activeTheme, setPreference, themeNames } =
    useThemePreference()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOpen = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
  )
  const handleClose = useEventCallback(() => {
    setAnchorEl(null)
  })

  if (themeNames.length < 2) {
    return null
  }

  const label = (name: ThemePreference) => {
    switch (name) {
      case "system":
        return t("themeSystem")
      case "light":
        return t("themeLight")
      case "dark" as ThemeName:
        return t("themeDark")
      default:
        return name
    }
  }

  const options: ThemePreference[] = ["system", ...themeNames]
  const isDark = activeTheme === ("dark" as ThemeName)

  return (
    <LanguageSwitchContainer>
      <ThemeSwitchToggle
        id={toggleId}
        aria-label={`${t("theme")}: ${label(preference)}`}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
      >
        {isDark ? (
          <MoonIcon sx={{ fontSize: "16px" }} />
        ) : (
          <SunIcon sx={{ fontSize: "16px" }} />
        )}
        {open ? (
          <CaretUpIcon sx={{ fontSize: "8px" }} />
        ) : (
          <CaretDownIcon sx={{ fontSize: "8px" }} />
        )}
      </ThemeSwitchToggle>
      <LanguageSwitchMenu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
      >
        <ThemeOptionList autoFocusItem={open} aria-labelledby={toggleId}>
          {options.map((option) => (
            <ThemeOption
              key={option}
              role="menuitemradio"
              aria-checked={option === preference}
              selected={option === preference}
              onClick={() => {
                setPreference(option)
                handleClose()
              }}
            >
              {label(option)}
            </ThemeOption>
          ))}
        </ThemeOptionList>
      </LanguageSwitchMenu>
    </LanguageSwitchContainer>
  )
}

export default ThemeSwitch
