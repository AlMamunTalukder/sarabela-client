import LeadSection from "@/components/LeadNews/LeadSection";
import Entertainment from "@/components/Entertainment/Entertainment";
import International from "@/components/International/International";
import Sports from "@/components/Sports/Sports";
import Trending from "@/components/Trending/Trending";
import Bangladesh from "@/components/Bangladesh/Bangladesh";
import AllNews from "@/components/AllNews/AllNews";
import AllCountry from "@/components/AllCountry/AllCountry";
import PhotoGallery from "@/components/Gallery/PhotoGallery";
import VideoGallery from "@/components/Gallery/VideoGallery";
import Advertisement_1 from "@/util/Advertisement_1";
import banner from "@public/asset/banner.jpg";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <LeadSection />
      <AllCountry />
      <Bangladesh />
      <Trending />
      <Entertainment />
      <Sports />
      <Advertisement_1 banner={banner} />
      <International />
      <VideoGallery />
      <PhotoGallery />
      <AllNews />
    </div>
  );
};

export default Page;
