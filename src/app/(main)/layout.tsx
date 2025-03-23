import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import Navbar from "@/components/Navbar/Navbar"
import ScrollToTop from "@/components/ScrolltoTop/ScrolltoTop"
import BreakingNews from "@/components/Share/BreakingNews/BreakingNews"
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

// Define default metadata for SEO
export const metadata: Metadata = {
  title: {
    template: "%s | সারাবেলা নিউজ২৪",
    default: "সারাবেলা নিউজ২৪ - বাংলাদেশের সর্বশেষ খবর",
  },
  description: "সারাবেলা নিউজ২৪ - জাতীয়, রাজনীতি, আর্ন্তজাতিক, খেলাধুলা, বিনোদন, তথ্য ও প্রযুক্তি, অর্থনীতি সহ সকল সর্বশেষ খবর",
  keywords: [
    "সারাবেলা নিউজ২৪",
    "বাংলাদেশ খবর",
    "জাতীয়",
    "রাজনীতি",
    "আর্ন্তজাতিক",
    "খেলাধুলা",
    "বিনোদন",
    "তথ্য ও প্রযুক্তি",
    "অর্থনীতি",
    "বিবিধ",
    "ভ্রমণ ও পর্যটন",
    "লাইফ স্টাইল",
    "ধর্ম ও ইসলাম",
    "শিক্ষা",
    "নারী",
    "স্বাস্থ্য",
    "চাকরি",
  ],
  authors: [{ name: "সারাবেলা নিউজ২৪", url: "https://sarabelanews24.com" }],
  creator: "সারাবেলা নিউজ২৪",
  publisher: "সারাবেলা নিউজ২৪",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sarabelanews24.com"),
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "সারাবেলা নিউজ২৪ - বাংলাদেশের সর্বশেষ খবর",
    description: "সারাবেলা নিউজ২৪ - জাতীয়, রাজনীতি, আর্ন্তজাতিক, খেলাধুলা, বিনোদন, তথ্য ও প্রযুক্তি, অর্থনীতি সহ সকল সর্বশেষ খবর",
    url: "https://sarabelanews24.com",
    siteName: "সারাবেলা নিউজ২৪",
    images: [
      {
        url: "https://sarabelanews24.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সারাবেলা নিউজ২৪",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "সারাবেলা নিউজ২৪",
    description: "সারাবেলা নিউজ২৪ - জাতীয়, রাজনীতি, আর্ন্তজাতিক, খেলাধুলা, বিনোদন, তথ্য ও প্রযুক্তি, অর্থনীতি সহ সকল সর্বশেষ খবর",
    images: ["https://sarabelanews24.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

// Define viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" dir="ltr">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang tags for language/region targeting */}
        <link rel="alternate" hrefLang="bn-bd" href="https://sarabelanews24.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://sarabelanews24.com/" />
      </head>
      <body className="flex flex-col min-h-screen relative">
        <header className="z-30">
          <Header />
        </header>
        <nav className="sticky top-0 z-40" aria-label="মূল নেভিগেশন">
          <Navbar />
        </nav>
        <main className="flex-grow mb-[50px]" id="main-content">
          {children}
        </main>
        <div
          className="hidden lg:flex fixed bottom-0 left-0 right-0 z-50"
          aria-label="ব্রেকিং নিউজ"
          role="complementary"
        >
          <BreakingNews />
        </div>
        <footer className="relative z-30" role="contentinfo">
          <Footer />
        </footer>
        <ScrollToTop />

        {/* Structured Data for News Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "সারাবেলা নিউজ২৪",
              url: "https://sarabelanews24.com",
              logo: "https://sarabelanews24.com/logo.png",
              sameAs: [
                "https://www.facebook.com/sarabelanews24",
                "https://www.twitter.com/sarabelanews24",
                "https://www.youtube.com/sarabelanews24",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
              },
              publishingPrinciples: "https://sarabelanews24.com/about-us",
              diversityPolicy: "https://sarabelanews24.com/diversity-policy",
              ethicsPolicy: "https://sarabelanews24.com/ethics-policy",
              masthead: "https://sarabelanews24.com/masthead",
              foundingDate: "2020-01-01",
              actionableFeedbackPolicy: "https://sarabelanews24.com/feedback-policy",
            }),
          }}
        />

        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://sarabelanews24.com",
              name: "সারাবেলা নিউজ২৪",
              description:
                "সারাবেলা নিউজ২৪ - জাতীয়, রাজ���ীতি, আর্ন্তজাতিক, খেলাধুলা, বিনোদন, তথ্য ও প্রযুক্তি, অর্থনীতি সহ সকল সর্বশেষ খবর",
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

        {/* Breadcrumb Structured Data - Will be overridden by page-specific breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "হোম",
                  item: "https://sarabelanews24.com",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}

