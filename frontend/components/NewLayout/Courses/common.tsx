import { PaletteColor } from "@mui/material"

import newTheme from "/src/newTheme"

import { CourseStatus, TagCoreFieldsFragment } from "/graphql/generated"

export type CourseTagFields = Pick<
  TagCoreFieldsFragment,
  "id" | "name" | "abbreviation" | "types"
>

export const allowedLanguages = ["fi", "en", "se", "other_language"]

export const sortByLanguage = (a: CourseTagFields, b: CourseTagFields) => {
  if (allowedLanguages.indexOf(a.id) === -1) {
    return 1
  }
  if (allowedLanguages.indexOf(b.id) === -1) {
    return -1
  }
  return allowedLanguages.indexOf(a.id) - allowedLanguages.indexOf(b.id)
}

const difficultyOrder = ["beginner", "intermediate", "advanced"]

export const sortByDifficulty = (a: CourseTagFields, b: CourseTagFields) =>
  difficultyOrder.indexOf(a.id) - difficultyOrder.indexOf(b.id)

export const courseStatuses: readonly CourseStatus[] = [
  CourseStatus.Active,
  CourseStatus.Upcoming,
  CourseStatus.Ended,
]
export const courseColorSchemes: Record<
  string,
  PaletteColor[keyof PaletteColor]
> = {
  "cyber-security": newTheme.vars.palette.crimson.dark2!,
  programming: newTheme.vars.palette.green.dark2!,
  "pilvipohjaiset-websovellukset": newTheme.vars.palette.blue.dark2!,
  "tekoaly-ja-data": newTheme.vars.palette.purple.dark2!,
  other: newTheme.vars.palette.gray.dark1!,
  program: newTheme.vars.palette.green.dark2, // dev
  webdev: newTheme.vars.palette.blue.dark2, // dev
}

export const tagColorSchemes: Record<string, PaletteColor[keyof PaletteColor]> =
  {
    other: newTheme.vars.palette.gray.dark1!,
    difficulty: newTheme.vars.palette.blue.dark1!,
    module: newTheme.vars.palette.purple.dark1!,
    language: newTheme.vars.palette.green.dark1!,
    program: newTheme.vars.palette.green.dark2, // dev
    webdev: newTheme.vars.palette.blue.dark2, // dev
  }

export const moduleColorSchemes: Record<
  string,
  PaletteColor[keyof PaletteColor]
> = {
  "cyber-security": newTheme.vars.palette.crimson.dark3!,
  programming: newTheme.vars.palette.green.dark3!,
  "pilvipohjaiset-websovellukset": newTheme.vars.palette.blue.dark3!,
  "tekoaly-ja-data": newTheme.vars.palette.purple.dark3!,
  other: newTheme.vars.palette.gray.dark2!,
  program: newTheme.vars.palette.green.dark3, // dev
  webdev: newTheme.vars.palette.blue.dark3, // dev
}
