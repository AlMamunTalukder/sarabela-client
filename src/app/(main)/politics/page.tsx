import Advertisement_2 from "@/util/Advertisement_2";
import OtherNews from "@/util/OtherNews";
import SideTabs from "@/util/SideTabs";
import TopNews from "@/util/TopNews";
import banner from "@public/asset/banner.jpg";
const Page = () => {


  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-3/4 lg:pr-4 lg:order-1 order-2">
          <TopNews basePath="/politics" />
          <Advertisement_2 banner={banner} />
          <OtherNews basePath="/politics"/>
        </div>
        <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start lg:order-2 order-1">
          <SideTabs basePath="/politics"/>
        </div>
      </div>
    </div>
  );
};

export default Page;
