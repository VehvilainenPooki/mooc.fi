import { useId } from "react"

import { styled } from "@mui/material/styles"

import { useTranslator } from "/hooks/useTranslator"
import { useThemePreference } from "/src/newTheme/ThemePreference"
import { ThemePreference } from "/src/newTheme/themes"
import CommonTranslations from "/translations/common"

const Container = styled("div")(
  ({ theme }) => `
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.vars.palette.roles.textOnInverse};
  font-size: 0.875rem;
`,
)

const Select = styled("select")(
  ({ theme }) => `
  background-color: ${theme.vars.palette.roles.surfaceInverse};
  color: ${theme.vars.palette.roles.textOnInverse};
  border: 1px solid ${theme.vars.palette.roles.borderOnInverse};
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font: inherit;

  &:focus-visible {
    outline: 2px solid ${theme.vars.palette.roles.focusRing};
    outline-offset: 2px;
  }
`,
)

/** Lets the user pick a theme or follow the system setting. Hidden while
 * only one theme is registered. */
function ThemeSwitch() {
  const t = useTranslator(CommonTranslations)
  const id = useId()
  const { preference, setPreference, themeNames } = useThemePreference()

  if (themeNames.length < 2) {
    return null
  }

  const label = (name: string) => {
    switch (name) {
      case "light":
        return t("themeLight")
      case "dark":
        return t("themeDark")
      default:
        return name
    }
  }

  return (
    <Container>
      <label htmlFor={id}>{t("theme")}</label>
      <Select
        id={id}
        value={preference}
        onChange={(event) =>
          setPreference(event.target.value as ThemePreference)
        }
      >
        <option value="system">{t("themeSystem")}</option>
        {themeNames.map((name) => (
          <option key={name} value={name}>
            {label(name)}
          </option>
        ))}
      </Select>
    </Container>
  )
}

export default ThemeSwitch
