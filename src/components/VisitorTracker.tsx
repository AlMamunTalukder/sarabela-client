"use client"

import { trackVisitor } from "@/util/visitorTracker"
import { useEffect } from "react"


export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitorOnMount = async () => {
      try {
        await trackVisitor()
      } catch (error) {
        console.error("Error in visitor tracking component:", error)
      }
    }

    trackVisitorOnMount()
  }, [])

  // This component doesn't render anything visible
  return null
}

