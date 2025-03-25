import LeadSection from "@/components/LeadNews/LeadSection"
import Entertainment from "@/components/Entertainment/Entertainment"
import International from "@/components/International/International"
import Sports from "@/components/Sports/Sports"
import Trending from "@/components/Trending/Trending"
import Bangladesh from "@/components/Bangladesh/Bangladesh"
import AllNews from "@/components/AllNews/AllNews"
import AllCountry from "@/components/AllCountry/AllCountry"
import PhotoGallery from "@/components/Gallery/PhotoGallery"
import VideoGallery from "@/components/Gallery/VideoGallery"
import Advertisement_1 from "@/util/Advertisement_1"
import banner from "../../../public/asset/sarabelanews24-banner.png"
import BreakingNews from "@/components/Share/BreakingNews/BreakingNews"
import Script from "next/script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "সারাবেলা নিউজ ২৪ - সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন",
  description:
    "সারাবেলা নিউজ ২৪ থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, রাজনৈতিক আপডেট, অর্থনীতি, স্বাস্থ্য, শিক্ষা এবং প্রযুক্তি সম্পর্কিত সর্বশেষ তথ্য পান।",
  alternates: {
    canonical: "/",
  },
}

const Page = () => {
  return (
    <>
      <div className="lg:hidden mt-2">
        <BreakingNews />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <section aria-label="প্রধান সংবাদ">
          <LeadSection />
        </section>
        <section aria-label="সকল দেশের সংবাদ">
          <AllCountry />
        </section>
        <section aria-label="বাংলাদেশ সংবাদ">
          <Bangladesh />
        </section>
        <section aria-label="ট্রেন্ডিং সংবাদ">
          <Trending />
        </section>
        <section aria-label="বিনোদন সংবাদ">
          <Entertainment />
        </section>
        <section aria-label="খেলাধুলা সংবাদ">
          <Sports />
        </section>
        <Advertisement_1 banner={banner} />
        <section aria-label="আন্তর্জাতিক সংবাদ">
          <International />
        </section>
        <section aria-label="ভিডিও গ্যালারি">
          <VideoGallery />
        </section>
        <section aria-label="ফটো গ্যালারি">
          <PhotoGallery />
        </section>
        <section aria-label="সকল সংবাদ">
          <AllNews />
        </section>
      </div>

      {/* HomePage Schema */}
      <Script
        id="schema-org-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://sarabelanews24.com/#webpage",
            url: "https://sarabelanews24.com/",
            name: "সারাবেলা নিউজ ২৪ - সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন",
            isPartOf: {
              "@id": "https://sarabelanews24.com/#website",
            },
            about: {
              "@id": "https://sarabelanews24.com/#organization",
            },
            description:
              "সারাবেলা নিউজ ২৪ থেকে সর্বশেষ বাংলা খবর, আন্তর্জাতিক সংবাদ, খেলাধুলা, বিনোদন, রাজনৈতিক আপডেট, অর্থনীতি, স্বাস্থ্য, শিক্ষা এবং প্রযুক্তি সম্পর্কিত সর্বশেষ তথ্য পান।",
            inLanguage: "bn-BD",
            potentialAction: [
              {
                "@type": "ReadAction",
                target: ["https://sarabelanews24.com/"],
              },
            ],
          }),
        }}
      />
    </>
  )
}

export default Page

