"use client"

import type React from "react"

import { EditableContent } from "./editable-content"

interface EditableContentWrapperProps {
  children: React.ReactNode
  type: string
  domain?: string
  maturityBand?: string
  id?: string
  title?: string
}

export function EditableContentWrapper({
  children,
  type,
  domain,
  maturityBand,
  id,
  title,
}: EditableContentWrapperProps) {
  return (
    <EditableContent type={type} domain={domain} maturityBand={maturityBand} id={id} title={title}>
      {children}
    </EditableContent>
  )
}
