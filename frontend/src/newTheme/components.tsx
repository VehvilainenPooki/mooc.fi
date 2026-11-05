import deepmerge from "deepmerge"

import {
  ButtonBaseProps,
  ButtonProps,
  EnhancedLinkProps,
  FormControlProps,
  ListItemButtonProps,
  MenuItemProps,
  TextFieldProps,
} from "@mui/material"
import { ComponentsOverrides, createTheme, Theme } from "@mui/material/styles"

import { themeFontSize } from "../theme/util"
import { bodyFontDeclaration } from "./typography"
import { LinkBehavior } from "/components/Link"
import { cssRole } from "/src/newTheme/roles"

export const withComponents = (theme: Theme) =>
  createTheme(theme, {
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as EnhancedLinkProps,
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        } as TextFieldProps,
      },
      MuiFormControl: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        } as FormControlProps,
        styleOverrides: {
          root: {
            margin: "", // invalid style actually, but anything else would override the text field in forms
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
          disableRipple: true,
        } as ButtonBaseProps,
        styleOverrides: {
          root: {
            ...bodyFontDeclaration,
          },
        },
      },
      MuiMenuItem: {
        defaultProps: {
          LinkComponent: LinkBehavior,
          disableRipple: true,
        } as MenuItemProps,
      },
      MuiListItemButton: {
        defaultProps: {
          LinkComponent: LinkBehavior,
          disableRipple: true,
        } as ListItemButtonProps,
      },
      MuiButton: {
        defaultProps: {
          variant: "text",
          color: "primary",
          disableRipple: true,
          LinkComponent: LinkBehavior,
        } as ButtonProps,
        styleOverrides: {
          root: ({ ownerState: { color } }) =>
            deepmerge<
              NonNullable<ComponentsOverrides<Theme>["MuiButton"]>["root"],
              NonNullable<ComponentsOverrides<Theme>["MuiButton"]>["root"]
            >(
              {
                ...bodyFontDeclaration,
                borderRadius: 0,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                border: "none",
                cursor: "pointer",
                ...themeFontSize(15, 15),
                justifyContent: "center",
                margin: 0,
                padding: "0.5rem",
                transitionDuration: "0.1s",
                transitionProperty: "all",
                minHeight: "44px",
                position: "relative",
                textDecoration: "none",
                ".MuiButton-startIcon": {
                  alignContent: "center",
                  display: "flex",
                  margin: "0",
                  svg: {
                    fontSize: "13px",
                  },
                },
                ".MuiButton-endIcon": {
                  alignContent: "center",
                  display: "flex",
                  margin: "0",
                  paddingRight: "12px",
                  svg: {
                    fontSize: "13px",
                  },
                },
              },
              color === "secondary"
                ? {
                    backgroundColor: "transparent",
                    border: `solid 2px ${cssRole("accent")}`,
                    color: `${cssRole("accent")} !important`,
                    boxShadow: "none",
                    ".MuiButton-startIcon": {
                      fill: cssRole("accent"),
                      paddingLeft: "1rem",
                      paddingRight: 0,
                    },
                    ".MuiButton-endIcon": {
                      fill: cssRole("accent"),
                      paddingLeft: 0,
                      paddingRight: "1rem",
                    },
                    svg: {
                      fill: cssRole("accent"),
                    },
                    "&:hover": {
                      border: `solid 2px ${cssRole("accentHover")}`,
                      color: `${cssRole("accentHover")} !important`,
                      svg: {
                        fill: cssRole("accentHover"),
                        backgroundColor: "inherit",
                      },
                      textDecoration: "underline",
                      backgroundColor: "inherit",
                      boxShadow: "none",
                    },
                    "&:active": {
                      border: `solid 2px ${cssRole("accentPressed")}`,
                      color: cssRole("accentPressed"),
                      svg: {
                        fill: cssRole("accentPressed"),
                      },
                    },
                    ".Mui-disabled": {
                      border: `solid 2px ${cssRole("textDisabled")}`,
                      color: cssRole("textDisabled"),
                      svg: {
                        fill: cssRole("textDisabled"),
                      },
                    },
                  }
                : {
                    backgroundColor: cssRole("accent"),
                    color: `${cssRole("textOnAccent")} !important`,
                    ".MuiButton-startIcon": {
                      padding: "8px 13px",
                      fill: cssRole("textOnAccent"),
                    },
                    ".MuiButton-endIcon": {
                      padding: "8px 12px 8px 13px",
                      fill: cssRole("textOnAccent"),
                    },
                    svg: {
                      fill: cssRole("textOnAccent"),
                      backgroundColor: cssRole("accent"),
                    },
                    "&:hover": {
                      backgroundColor: cssRole("accentHover"),
                    },
                    "&:active": {
                      backgroundColor: cssRole("accentPressed"),
                    },
                    ".Mui-disabled": {
                      backgroundColor: cssRole("surfaceDisabled"),
                      color: cssRole("textOnDisabled"),
                      svg: {
                        fill: cssRole("textOnDisabled"),
                      },
                      "&::after": {
                        bottom: "-2px",
                      },
                    },
                    /*"&:focus": {
                      outline: `solid 2px ${cssRole("focusRing")}`,
                      outlineOffset: "2px",
                    },*/
                    "&::after": {
                      bottom: "-2px",
                    },
                  },
            ),
          /*contained: {
            ...bodyFontDeclaration,
            cursor: "pointer",
            fontWeight: "700",
            position: "relative",
            textDecoration: "none",
            alignItems: "center",
            boxSizing: "border-box",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            maxWidth: "328px",
            padding: "13px 16px",
            ...themeFontSize(16, 18),
            letterSpacing: "-0.3px",
            svg: {
              marginLeft: "8px",
              height: "16px",
              width: "16px",
            },
          },
          text: {
            borderRadius: 0,
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            border: "none",
            cursor: "pointer",
            ...themeFontSize(15, 15),
            justifyContent: "center",
            margin: 0,
            padding: 0,
            transitionDuration: "0.1s",
            transitionProperty: "all",
            minHeight: "44px",
            position: "relative",
            textDecoration: "none",
            ".MuiButton-startIcon": {
              alignContent: "center",
              display: "flex",
              margin: "0",
              svg: {
                fontSize: "13px",
              },
            },
            ".MuiButton-endIcon": {
              alignContent: "center",
              display: "flex",
              margin: "0",
              paddingRight: "12px",
              svg: {
                fontSize: "13px",
              },
            },
            backgroundColor: cssRole("accent"),
            color: cssRole("textOnAccent"),
            "&::after": {
              content: '""',
              display: "block",
              borderBottom: `2px solid ${cssRole("dividerOnAccent")}`,
              position: "absolute",
              bottom: "-3.5px",
              left: "3px",
              right: "3px",
              zIndex: 0,
            },
            "&:disabled": {
              cursor: "not-allowed",
              "&::after": {
                borderBottom: `2px solid ${cssRole("textDisabled")}`,
                bottom: "-3.5px",
              },
            },
          },
          containedSizeLarge: {
            minHeight: "48px",
          },*/
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            height: "auto",
            minHeight: "131px",
            backgroundColor: cssRole("surfaceRaised"),
            zIndex: 100,
            borderBottom: `2px solid ${cssRole("appBarBorder")}`,
            transform: "none",
            [theme.breakpoints.up("lg")]: {
              borderBottom: `1px solid ${cssRole("borderStrong")}`,
              margin: "0 auto",
              maxWidth: "7680px",
            },
          },
        },
      },
      MuiToolbar: {
        defaultProps: {
          disableGutters: true,
          variant: "dense",
        },
        styleOverrides: {
          root: {
            padding: "0 8px",
            display: "flex",
            justifyContent: "space-between",
            minHeight: "0",
            [theme.breakpoints.up("xs")]: {
              minHeight: "48px",
            },
            [theme.breakpoints.up("lg")]: {
              padding: "0 32px",
            },
          },
        },
      },
    },
  } as Partial<Theme>)
