import type React from "react"

interface DomainOverviewTemplateProps {
  children: React.ReactNode
}

export const DomainOverviewTemplate: React.FC<DomainOverviewTemplateProps> = ({ children }) => {
  return <div className="container mx-auto px-4 py-8 max-w-5xl">{children}</div>
}

export default DomainOverviewTemplate
