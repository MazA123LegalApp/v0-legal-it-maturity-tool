// components/domain-recommendations.tsx

import type React from "react"
import { domainUrlMapping, maturityBandUrlMapping, getImplementationGuideUrl } from "@/lib/maturity-engine"

interface DomainRecommendationsProps {
  domain: string
  maturityBand: string
}

const DomainRecommendations: React.FC<DomainRecommendationsProps> = ({ domain, maturityBand }) => {
  const domainUrl = domainUrlMapping[domain] || "#"
  const maturityBandUrl = maturityBandUrlMapping[maturityBand] || "#"

  const implementationGuideUrl = getImplementationGuideUrl(domain, maturityBand)

  return (
    <div>
      <h3>
        Recommendations for {domain} at Maturity Band {maturityBand}
      </h3>
      <p>
        Learn more about {domain} at{" "}
        <a href={domainUrl} target="_blank" rel="noopener noreferrer">
          {domainUrl}
        </a>
        .
      </p>
      <p>
        Explore Maturity Band {maturityBand} at{" "}
        <a href={maturityBandUrl} target="_blank" rel="noopener noreferrer">
          {maturityBandUrl}
        </a>
        .
      </p>
      <p>
        View the Implementation Guide:{" "}
        <a href={implementationGuideUrl} target="_blank" rel="noopener noreferrer">
          {implementationGuideUrl}
        </a>
        .
      </p>
    </div>
  )
}

export default DomainRecommendations
