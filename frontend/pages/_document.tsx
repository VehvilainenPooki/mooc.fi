import React from "react"

import { DocumentProps, Head, Html, Main, NextScript } from "next/document"

import newTheme, {
  fontVariableClass as newFontVariableClass,
} from "/src/newTheme"
import { themeInitScript } from "/src/newTheme/themes"
import originalTheme, {
  fontVariableClass as originalFontVariableClass,
} from "/src/theme"

function CustomDocument(props: DocumentProps) {
  const isOld = props.__NEXT_DATA__.page.includes("_old")

  const themeColor = isOld
    ? originalTheme.palette.primary.main
    : newTheme.colorSchemes.light.palette.primary.main
  const fontVariableClass = isOld
    ? originalFontVariableClass
    : newFontVariableClass

  return (
    <Html lang={props.locale ?? "fi"} dir="ltr" className={fontVariableClass}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={themeColor} />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <body>
        {!isOld && (
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default CustomDocument
