import { Paper } from "@mui/material"
import { styled } from "@mui/material/styles"

import { getRoles } from "/src/newTheme/roles"

export const EntryContainer = styled(Paper)(
  ({ theme }) => `
  border-left: 2px solid ${getRoles(theme).entryBorder};
  padding: 20px;
`,
)
