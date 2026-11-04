import {
  ButtonBase,
  EnhancedButtonBase,
  EnhancedButtonBaseProps,
} from "@mui/material"
import { styled } from "@mui/material/styles"

import ArrowRight from "../Icons/ArrowRight"
import { fontSize } from "/src/theme/util"

const ctaButtonVariants = [
  "transparent-background",
  "black-background",
  "white-background",
  "blue-background",
  "hero-white",
  "hero-blue",
  "hero-black",
  "dark-blue-background",
] as const

export type CTAButtonVariant = (typeof ctaButtonVariants)[number]

const EnhancedMUIButton = styled(ButtonBase)(
  ({ theme }) => `
    cursor: pointer;
    font-weight: 700;
    position: relative;
    text-decoration: none;

    &.transparent-background,
    &.black-background,
    &.blue-background,
    &.white-background,
    &.hero-white,
    &.hero-blue,
    &.hero-black,
    &.dark-blue-background {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      height: 100%;
      justify-content: center;
      max-width: 328px;
      padding: 13px 16px;

      .text {
        ${fontSize(16, 18)}
        letter-spacing: -0.3px;
      }

      .link-icon {
        display: flex;
        margin-left: 8px;

        svg {
          height: 16px;
          width: 16px;
        }
      }
    }

    &.dark-blue-background {
      background-color: ${theme.vars.palette.roles.accentStrong};
      border: 4px solid ${theme.vars.palette.roles.borderOnAccent};
      color: ${theme.vars.palette.roles.textOnAccent};

      .link-icon svg {
        background-color: ${theme.vars.palette.roles.accentStrong};
        fill: ${theme.vars.palette.roles.textOnAccent};
      }

      .text {
        color: ${theme.vars.palette.roles.textOnAccent};
      }
    }

    &.transparent-background {
      background-color: ${theme.vars.palette.background.paper};
      border: 4px solid ${theme.vars.palette.roles.borderStrong};
      color: ${theme.vars.palette.roles.text};

      .link-icon svg {
        background-color: ${theme.vars.palette.background.paper};
        fill: ${theme.vars.palette.roles.text};
      }

      .text {
        color: ${theme.vars.palette.roles.text};
      }
    }

    &.black-background {
      background-color: ${theme.vars.palette.roles.surfaceInverse};
      border: 4px solid ${theme.vars.palette.roles.borderOnInverse};
      color: ${theme.vars.palette.roles.textOnInverse};

      .link-icon svg {
        background-color: ${theme.vars.palette.roles.surfaceInverse};
        fill: ${theme.vars.palette.roles.textOnInverse};
      }

      .text {
        color: ${theme.vars.palette.roles.textOnInverse};
      }

      &:hover {
        background-color: ${theme.vars.palette.roles.accentHover};

        .link-icon svg {
          background-color: ${theme.vars.palette.roles.accentHover};
        }
      }

      &:focus {
        background-color: ${theme.vars.palette.roles.accent};

        .link-icon svg {
          background-color: ${theme.vars.palette.roles.accent};
        }
      }
    }

    &.blue-background {
      background-color: ${theme.vars.palette.roles.accentAlt};
      border: 4px solid ${theme.vars.palette.roles.borderOnAccent};
      color: ${theme.vars.palette.roles.textOnAccent};

      .link-icon svg {
        background-color: ${theme.vars.palette.roles.accentAlt};
        fill: ${theme.vars.palette.roles.textOnAccent};
      }

      .text {
        color: ${theme.vars.palette.roles.textOnAccent};
      }

      &:hover {
        background-color: ${theme.vars.palette.roles.accent};

        .link-icon svg {
          background-color: ${theme.vars.palette.roles.accent};
        }
      }

      &:focus {
        background-color: ${theme.vars.palette.roles.accentHover};

        .link-icon svg {
          background-color: ${theme.vars.palette.roles.accentHover};
        }
      }
    }

    &.white-background {
      background-color: ${theme.vars.palette.background.paper};
      border: 4px solid ${theme.vars.palette.roles.accentAlt};
      color: ${theme.vars.palette.roles.accentAlt};

      .link-icon svg {
        background-color: ${theme.vars.palette.background.paper};
        fill: ${theme.vars.palette.roles.accentAlt};
      }

      .text {
        color: ${theme.vars.palette.roles.accentAlt};
      }

      &:hover {
        border-color: ${theme.vars.palette.roles.accentHover};

        .text {
          color: ${theme.vars.palette.roles.accentHover};
        }

        .link-icon svg {
          fill: ${theme.vars.palette.roles.accentHover};
        }
      }

      &:focus {
        border-color: ${theme.vars.palette.roles.accentHover};

        .text {
          color: ${theme.vars.palette.roles.accentHover};
        }

        .link-icon svg {
          fill: ${theme.vars.palette.roles.accentHover};
        }
      }
    }

    &.hero-white {
      background-color: ${theme.vars.palette.roles.accentAlt};
      color: ${theme.vars.palette.roles.textOnAccent};

      .link-icon svg {
        background-color: ${theme.vars.palette.roles.accentAlt};
        fill: ${theme.vars.palette.roles.textOnAccent};
      }

      .text {
        color: ${theme.vars.palette.roles.textOnAccent};
      }

      &:hover {
        background-color: ${theme.vars.palette.roles.accentHover};

        .link-icon svg {
          background-color: ${theme.vars.palette.roles.accentHover};
        }
      }

      &:focus {
        background-color: ${theme.vars.palette.roles.accentHover};

        .link-icon svg {
          background-color: ${theme.vars.palette.roles.accentHover};
        }
      }
    }

    &.hero-black {
      background-color: ${theme.vars.palette.roles.surfaceInverse};
      border: 4px solid ${theme.vars.palette.roles.borderOnInverse};
      color: ${theme.vars.palette.roles.textOnInverse};

      .link-icon svg {
        background-color: ${theme.vars.palette.roles.surfaceInverse};
        fill: ${theme.vars.palette.roles.textOnInverse};
      }

      .text {
        color: ${theme.vars.palette.roles.textOnInverse};
      }

      &:hover {
        border-color: ${theme.vars.palette.roles.accentOnFill};

        .text {
          color: ${theme.vars.palette.roles.accentOnFill};
        }

        .link-icon svg {
          fill: ${theme.vars.palette.roles.accentOnFill};
        }
      }

      &:focus {
        border-color: ${theme.vars.palette.roles.accentOnFill};

        .text {
          color: ${theme.vars.palette.roles.accentOnFill};
        }

        .link-icon svg {
          fill: ${theme.vars.palette.roles.accentOnFill};
        }
      }
    }

    &.hero-blue {
      background-color: ${theme.vars.palette.roles.accent};
      border: 4px solid ${theme.vars.palette.roles.borderOnAccent};
      color: ${theme.vars.palette.roles.textOnAccent};

      .link-icon svg {
        background-color: ${theme.vars.palette.roles.accent};
        fill: ${theme.vars.palette.roles.textOnAccent};
      }

      .text {
        color: ${theme.vars.palette.roles.textOnAccent};
      }

      &:hover {
        border-color: ${theme.vars.palette.roles.accentOnFill};

        .text {
          color: ${theme.vars.palette.roles.accentOnFill};
        }

        .link-icon svg {
          fill: ${theme.vars.palette.roles.accentOnFill};
        }
      }

      &:focus {
        border-color: ${theme.vars.palette.roles.accentOnFill};

        .text {
          color: ${theme.vars.palette.roles.accentOnFill};
        }

        .link-icon svg {
          fill: ${theme.vars.palette.roles.accentOnFill};
        }
      }
    }
  `,
) as EnhancedButtonBase

export interface CTAButtonProps extends EnhancedButtonBaseProps {
  variant?: CTAButtonVariant
}

const CTAButton = ({ variant, children, ...props }: CTAButtonProps) => {
  const buttonVariant = variant ?? "blue-background"

  return (
    <EnhancedMUIButton
      {...props}
      className={`${props.className ?? ""} ${buttonVariant}`}
    >
      <span className="text">{children}</span>
      <span className="link-icon">
        <ArrowRight sx={{ fontSize: "48px" }} />
      </span>
    </EnhancedMUIButton>
  )
}

export default CTAButton
