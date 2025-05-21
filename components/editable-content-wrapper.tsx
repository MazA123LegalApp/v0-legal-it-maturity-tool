import type { ReactNode } from "react"

interface EditableContentWrapperProps {
  type: string
  domain: string
  maturityBand: string
  id?: string
  title?: string
  children: ReactNode
}

export function EditableContentWrapper({
  type,
  domain,
  maturityBand,
  id,
  title,
  children,
}: EditableContentWrapperProps) {
  // This is a server component that just renders the children
  // In the future, we can enhance this to load content from the database
  return <>{children}</>
}
