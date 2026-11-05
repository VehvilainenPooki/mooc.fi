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
  "cyber-security": newTheme.vars.palette.roles.courseCyberSecurity,
  programming: newTheme.vars.palette.roles.courseProgramming,
  "pilvipohjaiset-websovellukset": newTheme.vars.palette.roles.courseCloud,
  "tekoaly-ja-data": newTheme.vars.palette.roles.courseAi,
  other: newTheme.vars.palette.roles.courseOther,
  program: newTheme.vars.palette.roles.courseProgramming, // dev
  webdev: newTheme.vars.palette.roles.courseCloud, // dev
}

export const tagColorSchemes: Record<string, PaletteColor[keyof PaletteColor]> =
  {
    other: newTheme.vars.palette.roles.tagOther,
    difficulty: newTheme.vars.palette.roles.tagDifficulty,
    module: newTheme.vars.palette.roles.tagModule,
    language: newTheme.vars.palette.roles.tagLanguage,
    program: newTheme.vars.palette.roles.courseProgramming, // dev
    webdev: newTheme.vars.palette.roles.courseCloud, // dev
  }

export const moduleColorSchemes: Record<
  string,
  PaletteColor[keyof PaletteColor]
> = {
  "cyber-security": newTheme.vars.palette.roles.moduleCyberSecurity,
  programming: newTheme.vars.palette.roles.moduleProgramming,
  "pilvipohjaiset-websovellukset": newTheme.vars.palette.roles.moduleCloud,
  "tekoaly-ja-data": newTheme.vars.palette.roles.moduleAi,
  other: newTheme.vars.palette.roles.moduleOther,
  program: newTheme.vars.palette.roles.moduleProgramming, // dev
  webdev: newTheme.vars.palette.roles.moduleCloud, // dev
}
