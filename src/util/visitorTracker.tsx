'use client'

export const trackVisitorData = async () => {
  try {
    // Fetch the public IP
    const ipResponse = await fetch("https://api.ipify.org?format=json")
    const { ip } = await ipResponse.json()

    // Fetch detailed location data (Use a premium API for more details)
    const locationResponse = await fetch(`https://ipwhois.app/json/${ip}`)
    const locationData = await locationResponse.json()

    // Collect all available visitor details
    return {
      ip,
      country: locationData.country,
      city: locationData.city,
      region: locationData.region,
      postal: locationData.postal, // ZIP or Postal Code
      latitude: locationData.latitude, // Latitude
      longitude: locationData.longitude, // Longitude
      isp: locationData.isp, // Internet Service Provider
      browser: navigator.userAgent, // Browser info
      referrer: document.referrer, // Referrer URL
      visitedAt: new Date().toISOString(), // Time of visit
    }
  } catch (error) {
    console.error("Error collecting visitor data:", error)
    return null
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

