import { Card } from "@mui/material"
import { styled } from "@mui/material/styles"

import { H1NoBackground, SubtitleNoBackground } from "/components/Text/headers"
import { cssRole } from "/src/newTheme/roles"

const RedBackground = styled(Card)`
  background-color: ${cssRole("surfaceWarningStrong")};
  color: ${cssRole("textOnInverse")};
`
const NoOsMessage = () => {
  return (
    <RedBackground>
      <H1NoBackground component="h2" variant="h4" align="center">
        Could not detect Operating system
      </H1NoBackground>
      <SubtitleNoBackground align="center">
        Please select your operating system from the menu above
      </SubtitleNoBackground>
    </RedBackground>
  )
}

export default NoOsMessage
