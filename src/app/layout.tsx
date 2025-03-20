import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Tiro_Bangla } from "next/font/google"
import Providers from "@/lib/Provider"
import ThemeAndServiceWorker from "@/provider/ThemeServiceWorker"
import VisitorTracker from "@/provider/VisitorTracker"
import Script from "next/script"

const tiro_Bangla = Tiro_Bangla({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
})

export const metadata: Metadata = {
  title: "সারাবেলা নিউজ ২৪ - সর্বশেষ বাংলা খবর",
  description: "সারাবেলা নিউজ ২৪ থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, এবং রাজনৈতিক আপডেট পান।",
  keywords:
    "বাংলা নিউজ, চাকরি, স্বাস্থ্য, ভ্রমণ ও পর্যটন, ক্যাম্পাস, নারী, তথ্য ও প্রযুক্তি, জাতীয়, আন্তর্জাতিক, অর্থনীতি, বিনোদন, খেলা, সারাবেলা নিউজ, সারাবেলা, sarabela news, sarabelanews, sarabelanews24",
  authors: [{ name: "Sarabela News 24" }],
  creator: "Sarabela News 24",
  publisher: "Sarabela News 24",
  metadataBase: new URL("https://sarabelanews24.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://sarabelanews24.com/",
    title: "সারাবেলা নিউজ ২৪ - সর্বশেষ বাংলা খবর",
    description: "সারাবেলা নিউজ ২৪ থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, এবং রাজনৈতিক আপডেট পান।",
    siteName: "সারাবেলা নিউজ ২৪",
    images: [
      {
        url: "https://sarabelanews24.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সারাবেলা নিউজ ২৪",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সারাবেলা নিউজ ২৪ - সর্বশেষ বাংলা খবর",
    description: "সারাবেলা নিউজ ২৪ থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, এবং রাজনৈতিক আপডেট পান।",
    images: ["https://sarabelanews24.com/twitter-image.jpg"],
    creator: "@sarabelanews24",
    site: "@sarabelanews24",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-site-verification-code", // Add your Google verification code here
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "theme-color": "#ffffff",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`bg-white dark:bg-gray-800 dark:text-white ${tiro_Bangla.className}`}>
        <Providers>
          <ThemeAndServiceWorker />
          <VisitorTracker />
          {children}
        </Providers>

        {/* Schema.org structured data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "সারাবেলা নিউজ ২৪",
              alternateName: "Sarabela News 24",
              url: "https://sarabelanews24.com/",
              logo: {
                "@type": "ImageObject",
                url: "https://sarabelanews24.com/logo.png",
                width: 600,
                height: 60,
              },
              sameAs: [
                "https://facebook.com/sarabelanews24",
                "https://twitter.com/sarabelanews24",
                "https://instagram.com/sarabelanews24",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+01957713249",
                contactType: "Customer Service",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://sarabelanews24.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}

