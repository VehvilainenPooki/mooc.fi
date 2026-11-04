import { EnhancedLink, EnhancedLinkProps, Link as MUILink } from "@mui/material"
import { styled } from "@mui/material/styles"

import ArrowLeft from "../Icons/ArrowLeft"
import ArrowRight from "../Icons/ArrowRight"
import { getRoles } from "/src/newTheme/roles"
import { fontSize } from "/src/theme/util"

const ctaLinkVariants = ["link-list", "default"] as const

export type CTALinkVariant = (typeof ctaLinkVariants)[number]

const Link = styled(MUILink)(
  ({ theme }) => `
  ${fontSize(16, 24)}
  font-weight: 600;
  align-items: center;
  color: ${getRoles(theme).accent};
  display: inline-grid;
  gap: 16px;
  grid-auto-flow: column;
  letter-spacing: -0.5px;
  overflow: hidden;
  text-decoration: none;

  &:hover, &:focus {
    text-decoration: underline;

    ${CTALinkIcon} {
      background-color: ${getRoles(theme).accent};
    }
  }
`,
) as EnhancedLink

export const CTALinkIcon = styled("span")(
  ({ theme }) => `
  align-items: center;
  background-color: ${getRoles(theme).accentAlt};
  display: inline-flex;
  height: 40px;
  justify-content: center;
  width: 40px;

  svg {
    fill: ${getRoles(theme).textOnAccent};
  }
`,
)

export interface CTALinkProps extends EnhancedLinkProps {
  linkVariant?: CTALinkVariant
}

const CTALink = (props: CTALinkProps) => {
  const { children, target, linkVariant, ...rest } = props

  const isExternal = target === "_blank"

  return (
    <Link target={target} {...rest}>
      {children}
      <CTALinkIcon>
        {isExternal ? (
          <ArrowLeft sx={{ fontSize: "24px" }} />
        ) : (
          <ArrowRight sx={{ fontSize: "24px" }} />
        )}
      </CTALinkIcon>
    </Link>
  )
}

export default CTALink
