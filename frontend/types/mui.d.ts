/* eslint-disable @typescript-eslint/ban-types */
import { LinkProps as NextLinkProps } from "next/link"

import { ListItemButtonTypeMap } from "@mui/material"
import { ButtonTypeMap } from "@mui/material/Button"
import { ButtonBaseTypeMap, ExtendButtonBase } from "@mui/material/ButtonBase"
import { IconButtonTypeMap } from "@mui/material/IconButton"
import { LinkTypeMap } from "@mui/material/Link"
import { MenuItemTypeMap } from "@mui/material/MenuItem"
import {
  OverridableComponent,
  OverrideProps,
} from "@mui/material/OverridableComponent"
import { ComponentsOverrides } from "@mui/material/styles"

import { LinkBehavior } from "/components/Link"

type DefaultNextLinkProps = Omit<
  NextLinkProps,
  {
    [K in Exclude<keyof NextLinkProps, undefined>]: K extends `on${string}`
      ? K
      : never
  }[keyof NextLinkProps]
>

declare module "@mui/material/Link" {
  export type EnhancedLinkProps<
    D extends React.ElementType = LinkTypeMap["defaultComponent"],
    P = {},
  > = OverrideProps<
    LinkTypeMap<P & Partial<DefaultNextLinkProps>, D>,
    D & typeof LinkBehavior
  >
  export type EnhancedLink<
    D extends React.ElementType = LinkTypeMap["defaultComponent"],
    P = {},
  > = OverridableComponent<LinkTypeMap<P & Partial<DefaultNextLinkProps>, D>>
  const Link: OverridableComponent<
    LinkTypeMap<Partial<DefaultNextLinkProps>, typeof LinkBehavior>
  >
}

declare module "@mui/material/ButtonBase" {
  export type EnhancedButtonBaseProps<
    D extends React.ElementType = ButtonBaseTypeMap["defaultComponent"],
    P = {},
  > = OverrideProps<ButtonBaseTypeMap<P & Partial<DefaultNextLinkProps>, D>, D>
  export type EnhancedButtonBase<
    D extends React.ElementType = ButtonBaseTypeMap["defaultComponent"],
    P = {},
  > = ExtendButtonBase<ButtonBaseTypeMap<P & Partial<DefaultNextLinkProps>, D>>
  const ButtonBase: ExtendButtonBase<
    ButtonBaseTypeMap<Partial<DefaultNextLinkProps>>
  >
}

declare module "@mui/material/Button" {
  export type EnhancedButtonProps<
    D extends React.ElementType = ButtonTypeMap["defaultComponent"],
    P = {},
  > = OverrideProps<ButtonTypeMap<P & Partial<DefaultNextLinkProps>, D>, D>
  export type EnhancedButton<
    D extends React.ElementType = ButtonTypeMap["defaultComponent"],
    P = {},
  > = ExtendButtonBase<ButtonTypeMap<P & Partial<DefaultNextLinkProps>, D>>
  const Button: ExtendButtonBase<ButtonTypeMap<Partial<DefaultNextLinkProps>>>
}

declare module "@mui/material/MenuItem" {
  export type EnhancedMenuItemProps<
    D extends React.ElementType = MenuItemTypeMap["defaultComponent"],
    P = {},
  > = OverrideProps<MenuItemTypeMap<P & Partial<DefaultNextLinkProps>, D>, D>
  export type EnhancedMenuItem<
    D extends React.ElementType = MenuItemTypeMap["defaultComponent"],
    P = {},
  > = ExtendButtonBase<MenuItemTypeMap<P & Partial<DefaultNextLinkProps>, D>>
  const MenuItem: ExtendButtonBase<
    MenuItemTypeMap<Partial<DefaultNextLinkProps>>
  >
}

declare module "@mui/material/ListItemButton" {
  export type EnhancedListItemButtonProps<
    RootComponent extends
      React.ElementType = ListItemButtonTypeMap["defaultComponent"],
    AdditionalProps = {},
  > = OverrideProps<
    ListItemButtonTypeMap<
      AdditionalProps & Partial<DefaultNextLinkProps>,
      RootComponent
    >,
    RootComponent
  > & { component?: React.ElementType }
  export type EnhancedListItemButton<
    D extends React.ElementType = ButtonTypeMap["defaultComponent"],
    P = {},
  > = ExtendButtonBase<ButtonTypeMap<P & Partial<DefaultNextLinkProps>, D>>
  const ListItemButton: ExtendButtonBase<
    ListItemButtonTypeMap<Partial<DefaultNextLinkProps>>
  >
}

declare module "@mui/material/IconButton" {
  export type EnhancedIconButtonProps<
    D extends React.ElementType = IconButtonTypeMap["defaultComponent"],
    P = {},
  > = OverrideProps<IconButtonTypeMap<P & Partial<DefaultNextLinkProps>, D>, D>
  export type EnhancedIconButton<
    D extends React.ElementType = ButtonTypeMap["defaultComponent"],
    P = {},
  > = ExtendButtonBase<IconButtonTypeMap<P & Partial<DefaultNextLinkProps>, D>>
  const IconButton: ExtendButtonBase<
    IconButonTypeMap<Partial<DefaultNextLinkProps>>
  >
}

declare module "@mui/material/Typography" {
  // add typography variants - also needs to be declared in "styles"
  interface TypographyPropsVariantOverrides {
    ingress: true
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    // adds breakpoints
    xxxs: true
    xxs: true
    desktop: true
    xxl: true
  }

  // add typography variants - also needs to be declared in Typography
  interface TypographyVariants {
    ingress: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    ingress?: React.CSSProperties
  }

  interface Theme {
    blue: React.CSSProperties["color"]
    clear: React.CSSProperties["color"]
    crimson: React.CSSProperties["color"]
    gray: React.CSSProperties["color"]
    green: React.CSSProperties["color"]
    purple: React.CSSProperties["color"]
    red: React.CSSProperties["color"]
    yellow: React.CSSProperties["color"]
  }

  interface ThemeOptions {
    blue?: React.CSSProperties["color"]
    clear?: React.CSSProperties["color"]
    crimson?: React.CSSProperties["color"]
    gray?: React.CSSProperties["color"]
    green?: React.CSSProperties["color"]
    purple?: React.CSSProperties["color"]
    red?: React.CSSProperties["color"]
    yellow?: React.CSSProperties["color"]
  }
  interface Palette {
    blue: Palette["primary"]
    clear: Palette["primary"]
    crimson: Palette["primary"]
    gray: Palette["primary"]
    green: Palette["primary"]
    purple: Palette["primary"]
    red: Palette["primary"]
    yellow: Palette["primary"]
  }
  interface PaletteOptions {
    blue?: PaletteOptions["primary"]
    clear?: PaletteOptions["primary"]
    crimson?: PaletteOptions["primary"]
    gray?: PaletteOptions["primary"]
    green?: PaletteOptions["primary"]
    purple?: PaletteOptions["primary"]
    red?: PaletteOptions["primary"]
    yellow?: PaletteOptions["primary"]
  }

  // Semantic color roles of the new theme. Every color scheme gives all of them
  // a value; leaf code reads them as theme.vars.palette.roles.*
  interface ColorRoles {
    surfaceRaised: string
    surfaceSunken: string
    surfaceHover: string
    surfaceInverse: string
    surfaceInverseHover: string
    surfaceInverseBorder: string
    text: string
    textHeading: string
    textMuted: string
    textDisabled: string
    textOnAccent: string
    textOnInverse: string
    textOnInverseMuted: string
    border: string
    borderStrong: string
    borderOnInverse: string
    link: string
    linkDisabled: string
    navText: string
    navLink: string
    focusRing: string
    accent: string
    accentHover: string
    accentPressed: string
    shadow: string
    accentAlt: string
    accentStrong: string
    accentOnFill: string
    borderOnAccent: string
    borderSubtle: string
    borderDisabled: string
    dividerOnAccent: string
    separator: string
    surfaceSubtle: string
    surfaceHighlight: string
    textStrong: string
    textSubtle: string
    textLabel: string
    textOnAccentHover: string
    shadowSoft: string
    cardShadow: string
    skeleton: string
    skeletonSoft: string
    imagePlaceholder: string
    courseCyberSecurity: string
    courseProgramming: string
    courseCloud: string
    courseAi: string
    courseOther: string
    moduleCyberSecurity: string
    moduleProgramming: string
    moduleCloud: string
    moduleAi: string
    moduleOther: string
    tagOther: string
    tagDifficulty: string
    tagModule: string
    tagLanguage: string
    textSubtitle: string
    textOnDanger: string
    buttonSecondaryText: string
    surfaceTranslucent: string
    borderMuted: string
    entryBorder: string
    shadowRaised: string
    shadowRaisedHover: string
    tooltipSurface: string
    tooltipBorder: string
    tooltipIcon: string
    tooltipIconHover: string
    danger: string
    successFill: string
    warningFill: string
    dangerFill: string
    infoFill: string
    infoFg: string
    infoBg: string
    infoBorder: string
    infoText: string
    codeSurface: string
    surfaceAttention: string
    surfaceNote: string
    surfaceWarningStrong: string
    accentBright: string
    codeSurfaceTinted: string
    imageBackdrop: string
    imageFallback: string
    certificateButton: string
    noticeDangerBg: string
    panelBorder: string
    panelDivider: string
    panelText: string
    panelTextSecondary: string
    panelTextMuted: string
    panelShadow: string
    dangerHighlight: string
    dangerText: string
    dangerStrong: string
    textSecondary: string
    placeholderMuted: string
    chipSurface: string
    editorSectionRule: string
    editorHeading: string
    editorRemoveButton: string
    editorBackdrop: string
    requiredLabel: string
    optionalLabel: string
    inputBorder: string
    inputBorderHover: string
    tabSurface: string
    tabSurfaceHover: string
    tabSurfaceActive: string
    tabShadow: string
    tabInnerGlow: string
    tabUnderline: string
    dropzoneAcceptBg: string
    dropzoneRejectBg: string
    dropzoneAccept: string
    overlayButton: string
    overlayButtonDanger: string
    overlayShadow: string
    overlayShadowInset: string
    surfaceHidden: string
    surfaceMuted: string
    borderLight: string
    listDivider: string
    tableBorder: string
    iconAccent: string
    statusActive: string
    statusUpcoming: string
    statusEnded: string
    progressTrack: string
    progressFill: string
    progressFillSecondary: string
  }
  interface Palette {
    roles: ColorRoles
  }
  interface PaletteOptions {
    roles?: ColorRoles
  }

  interface PaletteColor {
    light1?: string
    light2?: string
    light3?: string
    dark1?: string
    dark2?: string
    dark3?: string
  }
  interface SimplePaletteColorOptions {
    light1?: string
    light2?: string
    light3?: string
    dark1?: string
    dark2?: string
    dark3?: string
  }
  //

  interface ComponentNameToClassKey {
    MUIDataTableHeadCell:
      | "root"
      | "contentWrapper"
      | "data"
      | "dragCursor"
      | "fixedHeader"
      | "hintIconAlone"
      | "hintIconWithSortIcon"
      | "mypopper"
      | "sortAction"
      | "sortActive"
      | "sortLabelRoot"
      | "toolButton"
      | "tooltip"
    MUIDataTable:
      | "root"
      | "caption"
      | "liveAnnounce"
      | "paper"
      | "responsiveScroll"
      | "tableRoot"
      | "responsiveBase" // not sure it's there

    MUIDataTableToolbar:
      | "root"
      | "actions"
      | "filterCloseIcon"
      | "filterPaper"
      | "fullWidthActions"
      | "fullWidthLeft"
      | "fullWidthRoot"
      | "fullWidthTitleText"
      | "icon"
      | "iconActive"
      | "left"
      | "searchIcon"
      | "titleRoot"
      | "titleText"
  }
  interface Components<Theme = unknown> {
    MUIDataTableHeadCell?: {
      styleOverrides?: ComponentsOverrides<Theme>["MUIDataTableHeadCell"]
    }
    MUIDataTable?: {
      styleOverrides?: ComponentsOverrides<Theme>["MUIDataTable"]
    }
    MUIDataTableToolbar?: {
      styleOverrides?: ComponentsOverrides<Theme>["MUIDataTableToolbar"]
    }
  }
}

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    brand: {
      main: string
      soft: string
      bright: string
      light: string
      active: string
      dark: string
      nearlyBlack: string
    }
    link: {
      blue: string
      disabled: string
    }
    grayscale: {
      white: string
      slightlyGray: string
      light: string
      medium: string
      backgroundBox: string
      tabsBorder: string
      backgroundArrow: string
      mediumDark: string
      dark: string
      darkText: string
      black: string
    }
    additional: {
      red: {
        light: string
        dark: string
      }
      purple: {
        light: string
      }
      yellow: {
        light: string
        main: string
      }
      skyblue: string
      orange: string
      green: {
        light: string
        dark: string
      }
    }
    hover: {
      gray: string
    }
  }
}
