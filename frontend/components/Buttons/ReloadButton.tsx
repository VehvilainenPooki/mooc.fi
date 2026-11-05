import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

import { getRoles } from "/src/newTheme/roles"

export const ReloadButton = styled(Button)(
  ({ theme }) => `
  background-color: ${(theme.vars ?? theme).palette.background.paper};
  color: ${getRoles(theme).danger};
  padding: 1rem;
  margin: auto;
`,
)
