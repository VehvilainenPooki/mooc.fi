import { FieldArray } from "formik"

import { Button, ButtonGroup } from "@mui/material"
import { styled } from "@mui/material/styles"

import { FormSubtitle } from "../common"
import { initialTranslation } from "./form-validation"
import { useTranslator } from "/hooks/useTranslator"
import CoursesTranslations from "/translations/courses"
import { cssRole } from "/src/newTheme/roles"

const ButtonGroupContainer = styled(ButtonGroup)`
  width: 90%;
  margin: auto;
  display: flex;
  margin-bottom: 1rem;
  margin-top: 1 rem;
`
interface ButtonProps {
  selected: boolean
}
const StyledLanguageButton = styled(Button)<ButtonProps>`
  width: 33%;
  background-color: ${cssRole("tabSurface")};
  margin: 0.5rem;
  padding: 3rem;
  color: ${cssRole("textOnAccent")};
  font-size: 21px;
  box-shadow:
    0px 2px 3px ${cssRole("tabShadow")},
    inset 0px 0px 2px ${cssRole("tabInnerGlow")};
  border: 1px solid ${cssRole("tabSurface")};
  &:hover {
    background-color: ${cssRole("tabSurfaceHover")};
    border: 1px solid ${cssRole("tabSurfaceHover")};
    color: ${cssRole("text")};
  }
  &:disabled {
    box-shadow: 0px 0px 0px ${cssRole("tabShadow")};
    background-color: ${cssRole("tabSurfaceActive")};
    color: ${cssRole("textOnAccent")};
    border: 1px solid ${cssRole("tabSurfaceActive")};
    ${(props) => `text-decoration: ${props.selected ? `underline` : `none`};`}
  }
`
interface LanguageSelectorProps {
  selectedLanguage: string
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>
}

const CourseLanguageSelector = (props: LanguageSelectorProps) => {
  const { selectedLanguage, setSelectedLanguage } = props
  const t = useTranslator(CoursesTranslations)
  return (
    <>
      <FormSubtitle variant="h6" component="h3" align="center">
        {t("courseLanguageSelectTitle")}
      </FormSubtitle>
      <FieldArray name="course_translations">
        {(helpers) => (
          <ButtonGroupContainer
            color="secondary"
            aria-label="course language select button group"
            id="course_translations"
            disabled={selectedLanguage == "both"}
          >
            <StyledLanguageButton
              onClick={() => {
                setSelectedLanguage(
                  selectedLanguage === "en_US" ? "both" : "fi_FI",
                )
                helpers.push({ ...initialTranslation, language: "fi_FI" })
              }}
              disabled={
                selectedLanguage === "fi_FI" || selectedLanguage === "en_US"
              }
              selected={selectedLanguage === "fi_FI"}
            >
              {t("courseFinnish")}
            </StyledLanguageButton>
            <StyledLanguageButton
              disabled={
                selectedLanguage === "en_US" || selectedLanguage === "fi_FI"
              }
              selected={selectedLanguage === "en_US"}
              onClick={() => {
                setSelectedLanguage(
                  selectedLanguage === "fi_FI" ? "both" : "en_US",
                )
                helpers.push({ ...initialTranslation, language: "en_US" })
              }}
            >
              {t("courseEnglish")}
            </StyledLanguageButton>
            <StyledLanguageButton
              selected={selectedLanguage === "both"}
              onClick={() => {
                if (selectedLanguage === "") {
                  helpers.push({
                    ...initialTranslation,
                    language: "en_US",
                  })
                  helpers.push({
                    ...initialTranslation,
                    language: "fi_FI",
                  })
                } else if (selectedLanguage === "fi") {
                  helpers.push({ ...initialTranslation, language: "en_US" })
                } else {
                  helpers.push({
                    ...initialTranslation,
                    language: "fi_FI",
                  })
                }

                setSelectedLanguage("both")
              }}
            >
              {t("courseBoth")}
            </StyledLanguageButton>
          </ButtonGroupContainer>
        )}
      </FieldArray>
    </>
  )
}

export default CourseLanguageSelector
