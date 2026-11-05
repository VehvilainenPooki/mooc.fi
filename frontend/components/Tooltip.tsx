import React from "react"

import { PropsOf } from "@emotion/react"
import InfoIcon from "@mui/icons-material/Info"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Typography, TypographyProps } from "@mui/material"
import { css, styled, Theme } from "@mui/material/styles"
import MUITooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip"

import { getRoles } from "/src/newTheme/roles"

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} classes={{ popper: className }} />
))(
  ({ theme }) => `
  & .${tooltipClasses.tooltip} {
    background-color: ${getRoles(theme).tooltipSurface};
    color: ${(theme.vars ?? theme).palette.text.primary};
    max-width: 300px;
    font-size: ${theme.typography.pxToRem(12)};
    border: 1px solid ${getRoles(theme).tooltipBorder};
    cursor: pointer;
  }
`,
) as typeof MUITooltip

const IconStyle = (theme: Theme) => css`
  --icon-color: ${getRoles(theme).tooltipIcon};
  --icon-hover-color: ${getRoles(theme).tooltipIconHover};

  cursor: help;
  transition: all 0.2s ease-in-out;
  color: var(--icon-color);
  :hover {
    color: var(--icon-hover-color);
    scale: 1.2;
  }
`

const InfoTooltipBase = styled(Tooltip)`
  :hover {
    cursor: help;
  }
`

const InfoOutlined = styled(InfoOutlinedIcon, {
  shouldForwardProp: (prop) => prop !== "iconClor" && prop !== "hoverColor",
})<{ iconColor?: string; hoverColor?: string }>(
  ({ theme, iconColor, hoverColor }) => `
  ${IconStyle(theme).styles}
  ${iconColor ? `--icon-color: ${iconColor};` : ""}
  ${hoverColor ? `--icon-hover-color: ${hoverColor};` : ""}
`,
)

const Info = styled(InfoIcon, {
  shouldForwardProp: (prop) => prop !== "iconColor" && prop !== "hoverColor",
})<{ iconColor?: string; hoverColor?: string }>(
  ({ theme, iconColor, hoverColor }) => `
  ${IconStyle(theme).styles}
  ${iconColor ? `--icon-color: ${iconColor};` : ""}
  ${hoverColor ? `--icon-hover-color: ${hoverColor};` : ""}
`,
)

const TooltipWrapper = styled("span")`
  display: flex;
`

interface InfoTooltipProps {
  label?: string
  labelProps?: Omit<TypographyProps, "component"> & {
    component?: React.ElementType
  }
  titleProps?: Omit<TypographyProps, "component"> & {
    component?: React.ElementType
  }
  outlined?: boolean
  IconProps?: PropsOf<typeof Info>
}

export const InfoTooltip = ({
  label,
  outlined = true,
  IconProps,
  labelProps,
  titleProps,
  ...props
}: InfoTooltipProps & Omit<TooltipProps, "children">) => (
  <TooltipWrapper id={`tooltip-${label}`}>
    <InfoTooltipBase
      {...props}
      title={
        <>
          {label && (
            <Typography variant="subtitle2" {...labelProps}>
              {label}
            </Typography>
          )}
          <Typography variant="caption" {...titleProps}>
            {props.title}
          </Typography>
        </>
      }
    >
      {outlined ? <InfoOutlined {...IconProps} /> : <Info {...IconProps} />}
    </InfoTooltipBase>
  </TooltipWrapper>
)

export default Tooltip
