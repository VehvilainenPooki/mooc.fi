import { EnhancedButton } from "@mui/material"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

import { getRoles } from "/src/newTheme/roles"

export const ButtonWithPaddingAndMargin = styled(Button)`
  margin: 0.5rem;
  color: ${({ theme, color }) =>
    color === "secondary"
      ? getRoles(theme).buttonSecondaryText
      : color === "primary"
      ? getRoles(theme).textOnAccent
      : color ?? getRoles(theme).text};
  font-size: 18px;
  padding: 0.5em;
` as EnhancedButton
