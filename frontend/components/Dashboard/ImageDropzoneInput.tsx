import React, { useCallback, useEffect, useState } from "react"

import { DropzoneState, FileRejection, useDropzone } from "react-dropzone"

import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { useTranslator } from "/hooks/useTranslator"
import CommonTranslations from "/translations/common"
import { cssRole } from "/src/newTheme/roles"

// Chrome only gives dragged file mimetype on drop, so all filetypes would appear rejected on drag
const isChrome =
  typeof window !== "undefined"
    ? !!(window as any).chrome &&
      (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime)
    : false

const DropzoneContainer = styled("div", {
  shouldForwardProp: (prop) =>
    typeof prop !== "string" ||
    !["isDragActive", "isDragAccept", "error"].includes(prop), // TODO: should I list _all_ dropzonestate things
})<DropzoneState & { error: MessageProps["error"] }>(
  ({ isDragActive, isDragAccept, error }) => `
  display: flex;
  width: 100%;
  min-height: 250px;
  align-items: center;
  border-width: 2px;
  border-radius: 4px;
  border-style: ${isDragActive ? "solid" : "dashed"};
  padding: 20px;
  background-color: ${() => {
    if (isDragActive) {
      return isDragAccept ? cssRole("dropzoneAcceptBg") : cssRole("dropzoneRejectBg")
    }
    if (error) {
      return cssRole("dropzoneRejectBg")
    }
    return cssRole("surfaceRaised")
  }};
  border-color: ${() => {
    if (isDragActive) {
      return isDragAccept ? cssRole("dropzoneAccept") : cssRole("dangerStrong")
    }
    return cssRole("inputBorder")
  }};
  transition: border 0.24s ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: ${cssRole("dropzoneAccept")};
  }
  justify-content: center;
  position: relative;
`,
)

const ErrorMessage = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error: MessageProps["error"] }>(
  ({ error }) => `
  color: ${error ? cssRole("dangerStrong") : cssRole("text")};
`,
)

interface MessageProps {
  message: string
  error?: boolean
}

interface DropzoneProps {
  inputRef?: React.RefCallback<HTMLDivElement>
  onImageLoad: (result: string | ArrayBuffer | null) => void
  onImageAccepted: (field: File) => void
  thumbnail?: string
}

const ImageDropzoneInput = ({
  inputRef,
  onImageAccepted,
  onImageLoad,
  thumbnail,
  children,
}: React.PropsWithChildren<DropzoneProps>) => {
  const t = useTranslator(CommonTranslations)
  const [status, setStatus] = useState<MessageProps>({
    message: t("imageDropMessage"),
  })

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      const reader = new FileReader()

      reader.onload = () => onImageLoad(reader.result)

      if (accepted.length) {
        onImageAccepted(accepted[0])
        reader.readAsDataURL(accepted[0])
      }

      if (rejected.length) {
        setStatus({ message: t("imageNotAnImage"), error: true })
        setTimeout(() => setStatus({ message: t("imageDropMessage") }), 2000)
      }
    },
    [setStatus],
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    inputRef: dropzoneInputRef,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".gif", ".svg", ".webp"],
    },
    multiple: false,
    preventDropOnDocument: true,
  })

  inputRef?.(dropzoneInputRef.current)

  useEffect(() => {
    if (isDragActive && isDragReject && !isChrome) {
      setStatus({ message: t("imageNotAcceptableFormat"), error: true })
    } else if (isDragActive) {
      setStatus({ message: t("imageDropHere") })
    } else {
      setStatus({ message: t("imageDropMessage") })
    }
  }, [isDragActive, isDragReject])

  return (
    <DropzoneContainer
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragAccept={isChrome || isDragAccept}
      error={status.error}
    >
      {children}
      <input {...getInputProps()} />
      {!thumbnail && (
        <ErrorMessage variant="body1" align="center" error={status.error}>
          {status.message}
        </ErrorMessage>
      )}
    </DropzoneContainer>
  )
}

export default ImageDropzoneInput
