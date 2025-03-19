export const trackVisitorData = async () => {
  try {
    // Fetch the public IP using ipify API
    const ipResponse = await fetch("https://api.ipify.org?format=json")
    const { ip } = await ipResponse.json()

    // Fetch the location data based on the IP
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
    const locationData = await locationResponse.json()

    // Collecting all visitor details
    return {
      ip,
      country: locationData.country_name,
      city: locationData.city,
      region: locationData.region,
      isp: locationData.org,
      browser: navigator.userAgent, // Browser info
      referrer: document.referrer, // Referrer URL
      visitedAt: new Date().toISOString(), // Time of visit in ISO format
    }
  } catch (error) {
    console.error("Error collecting visitor data:", error)
    return null // In case of error, return null
  }
}

export const trackVisitor = async () => {
  try {
    // Check if visitor has already been tracked
    if (typeof window !== "undefined" && localStorage.getItem("visitor_tracked")) {
      return null
    }

    // Get visitor data
    const visitorData = await trackVisitorData()

    if (!visitorData) {
      throw new Error("Failed to collect visitor data")
    }

    // Send to our Next.js API route
    const response = await fetch("/api/track-visitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    })

    if (!response.ok) {
      throw new Error("Failed to track visitor")
    }

    // Set flag in localStorage to prevent duplicate tracking
    if (typeof window !== "undefined") {
      localStorage.setItem("visitor_tracked", "true")
    }

    return await response.json()
  } catch (error) {
    console.error("Error tracking visitor:", error)
    return null
  }
}

