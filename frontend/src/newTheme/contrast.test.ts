import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { ColorRoleValues, rolesByTheme } from "./colors"

// WCAG 2.2 AA: 4.5:1 for text, 3:1 for UI component boundaries and focus
// indicators (1.4.3, 1.4.11). Each pair is a role used as text or a boundary
// on the role it is drawn on.
type Role = keyof ColorRoleValues
const TEXT = 4.5
const UI = 3
const pairs: Array<[Role, Role, number]> = [
  ["text", "surfaceRaised", TEXT],
  ["text", "surfaceSunken", TEXT],
  ["textHeading", "surfaceRaised", TEXT],
  ["textMuted", "surfaceRaised", TEXT],
  ["textMuted", "surfaceSunken", TEXT],
  ["textLabel", "surfaceRaised", TEXT],
  ["textSubtitle", "surfaceRaised", TEXT],
  ["textSecondary", "surfaceRaised", TEXT],
  ["link", "surfaceRaised", TEXT],
  ["navLink", "surfaceRaised", TEXT],
  ["accent", "surfaceRaised", TEXT],
  ["accentAlt", "surfaceRaised", TEXT],
  ["textOnAccent", "accent", TEXT],
  ["textOnAccent", "accentHover", TEXT],
  ["textOnAccent", "accentPressed", TEXT],
  ["textOnAccent", "tabSurface", TEXT],
  ["textOnAccent", "statusActive", TEXT],
  ["textOnAccent", "certificateButton", TEXT],
  ["textOnAccent", "editorRemoveButton", TEXT],
  ["textOnInverse", "surfaceInverse", TEXT],
  ["textOnInverseMuted", "surfaceInverse", TEXT],
  ["textOnInverse", "surfaceWarningStrong", TEXT],
  ["textOnDanger", "danger", TEXT],
  ["textOnDanger", "noticeDangerBg", TEXT],
  ["infoText", "infoBg", TEXT],
  ["panelText", "surfaceRaised", TEXT],
  ["panelTextSecondary", "surfaceRaised", TEXT],
  ["panelTextMuted", "surfaceRaised", TEXT],
  ["requiredLabel", "surfaceRaised", TEXT],
  ["optionalLabel", "surfaceRaised", TEXT],
  ["dangerText", "surfaceRaised", TEXT],
  ["dangerStrong", "surfaceRaised", TEXT],
  ["editorHeading", "surfaceRaised", TEXT],
  ["focusRing", "surfaceRaised", UI],
  ["focusRing", "surfaceInverse", UI],
  ["borderStrong", "surfaceRaised", UI],
  ["inputBorder", "surfaceRaised", UI],
  ["infoFg", "infoBg", UI],
]

const NAMED: Record<string, string> = {
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
}

const parse = (color: string): [number, number, number, number] => {
  const value = NAMED[color] ?? color.trim()
  if (value.startsWith("#")) {
    let hex = value.slice(1)
    if (hex.length <= 4) {
      hex = [...hex].map((c) => c + c).join("")
    }
    const alpha = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      alpha,
    ]
  }
  const [r, g, b, a = 1] = (value.match(/[\d.]+/g) ?? []).map(Number)
  return [r, g, b, a]
}

const composite = (color: string, background: [number, number, number]) => {
  const [r, g, b, a] = parse(color)
  return [r, g, b].map(
    (channel, i) => channel * a + background[i] * (1 - a),
  ) as [number, number, number]
}

const luminance = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast of `foreground` drawn on `background`, both possibly
 * translucent; the background sits on white. */
export const contrast = (foreground: string, background: string) => {
  const bg = composite(background, [255, 255, 255])
  const fg = composite(foreground, bg)
  const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
  return (light + 0.05) / (dark + 0.05)
}

describe("theme color contrast", () => {
  for (const [themeName, roles] of Object.entries(rolesByTheme)) {
    for (const [foreground, background, minimum] of pairs) {
      it(`${themeName}: ${foreground} on ${background} is at least ${minimum}:1`, () => {
        const ratio = contrast(roles[foreground], roles[background])
        assert.ok(
          ratio >= minimum,
          `${roles[foreground]} on ${roles[background]} is ${ratio.toFixed(
            2,
          )}:1`,
        )
      })
    }
  }
})
