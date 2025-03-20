import "./globals.css";
import { Tiro_Bangla } from "next/font/google";
import Providers from "@/lib/Provider";
import ThemeAndServiceWorker from "@/provider/ThemeServiceWorker";
import VisitorTracker from "@/provider/VisitorTracker";
import Head from "next/head";

const tiro_Bangla = Tiro_Bangla({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sarabela News 24 - Latest News in Bangladesh",
  description: "Read the latest news on politics, sports, entertainment, technology, health, travel, and more on Sarabela News 24.",
  keywords: "বাংলা নিউজ, চাকরি, স্বাস্থ্য, ভ্রমণ ও পর্যটন, ক্যাম্পাস, নারী, তথ্য ও প্রযুক্তি, জাতীয়, আন্তর্জাতিক, অর্থনীতি, বিনোদন, খেলা",
  author: "Sarabela News 24",
  siteUrl: "https://sarabelanews24.com/",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <Head>
        {/* Basic SEO Meta Tags */}
        <title>সারাবেলা নিউজ 24 - সর্বশেষ বাংলা খবর</title>
        <meta name="description" content="সারাবেলা নিউজ 24 থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, এবং রাজনৈতিক আপডেট পান।" />
        <meta name="keywords" content="সারাবেলা নিউজ, বাংলা নিউজ, আজকের খবর, ব্রেকিং নিউজ, আন্তর্জাতিক সংবাদ" />
        <meta name="author" content="Sarabela News 24" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Social Media */}
        <meta property="og:title" content="সারাবেলা নিউজ 24 - সর্বশেষ বাংলা খবর" />
        <meta property="og:description" content="সারাবেলা নিউজ 24 থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, এবং রাজনৈতিক আপডেট পান।" />
        <meta property="og:image" content="https://sarabelanews24.com/og-image.jpg" />
        <meta property="og:url" content="https://sarabelanews24.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for Social Sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="সারাবেলা নিউজ 24 - সর্বশেষ বাংলা খবর" />
        <meta name="twitter:description" content="সারাবেলা নিউজ 24 থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, এবং রাজনৈতিক আপডেট পান।" />
        <meta name="twitter:image" content="https://sarabelanews24.com/twitter-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Sarabela News 24",
              "url": "https://sarabelanews24.com/",
              "logo": "https://sarabelanews24.com/logo.png",
              "sameAs": [
                "https://facebook.com/sarabelanews24",
                "https://twitter.com/sarabelanews24"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+01957713249",
                "contactType": "Customer Service"
              }
            })
          }}
        />
      </Head>

      <Providers>
        <body className={`bg-white dark:bg-gray-800 dark:text-white ${tiro_Bangla.className}`}>
          <ThemeAndServiceWorker />
          <VisitorTracker />
          {children}
        </body>
      </Providers>
    </html>
  );
}
