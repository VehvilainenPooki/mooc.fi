import { Card, CardContent } from "@mui/material"
import { styled } from "@mui/material/styles"

import { getRoles } from "/src/newTheme/roles"

export const ErrorMessageBackground = styled(Card)(
  ({ theme }) => `
  background-color: ${getRoles(theme).danger};
  max-width: 75%;
  margin: 2rem auto 2rem auto;
  color: ${getRoles(theme).textOnDanger};
`,
)

export const ErrorMessageContentArea = styled(CardContent)`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
`
