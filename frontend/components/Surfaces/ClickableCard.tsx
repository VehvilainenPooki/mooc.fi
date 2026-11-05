import { ButtonBase, EnhancedButtonBase } from "@mui/material"
import { styled } from "@mui/material/styles"

import { getRoles } from "/src/newTheme/roles"

export const ClickableButtonBase = styled(ButtonBase)(
  ({ theme }) => `
  background-color: ${(theme.vars ?? theme).palette.background.paper};
  position: relative;
  box-shadow: 18px 7px 28px -12px ${getRoles(theme).shadowRaised};

  &:hover {
    box-shadow: 18px 7px 48px -12px ${getRoles(theme).shadowRaisedHover};
    transition-duration: 0.4s;
    cursor: pointer;
  }
`,
) as EnhancedButtonBase

export const ShadowedDiv = styled("div")(
  ({ theme }) => `
  position: relative;
  box-shadow: 18px 7px 28px -12px ${getRoles(theme).shadowRaised};
`,
)

export const ClickableDiv = styled(ShadowedDiv)(
  ({ theme }) => `
  &:hover {
    box-shadow: 18px 7px 48px -12px ${getRoles(theme).shadowRaisedHover};
    transition-duration: 0.4s;
    cursor: pointer;
  }
`,
)
