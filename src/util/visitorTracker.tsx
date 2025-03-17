// utils/visitorTracker.js

export const trackVisitorData = async () => {
    try {
      // Fetch the public IP using ipify API
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();
  
      // Fetch the location data based on the IP
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationResponse.json();
  
      // Collecting all visitor details
      return {
        ip,
        country: locationData.country_name,
        city: locationData.city,
        region: locationData.region,
        isp: locationData.org,
        browser: navigator.userAgent, // Browser info
        referrer: document.referrer, // Referrer URL
        visitedAt: new Date(), // Time of visit
      };
    } catch (error) {
      console.error("Error collecting visitor data:", error);
      return null; // In case of error, return null
    }
  };
  