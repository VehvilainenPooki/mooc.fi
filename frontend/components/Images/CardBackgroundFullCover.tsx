import Image from "next/image"

import { styled } from "@mui/material/styles"

import { getRoles } from "/src/newTheme/roles"

export const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
`

export const FullCoverTextBackground = styled("div")(
  ({ theme }) => `
  width: 100%;
  height: 100%;
  background-color: ${getRoles(theme).surfaceTranslucent};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`,
)

export const CourseImageBase = styled("div")`
  height: 230px;
  width: 100%;
`
