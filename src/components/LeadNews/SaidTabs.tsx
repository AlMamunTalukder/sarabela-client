"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LastNews from "../News/LastNews";
import ImportantNews from "../News/ImportantNews";
import DailyIslam from "../News/DailyIslam";


const SaidTabs = () => {
const category = ''

  return (
    <Tabs defaultValue="latest" defaultChecked>
      <TabsList>
        <TabsTrigger value="latest" className="font-semibold">
          সর্বশেষ
        </TabsTrigger>
        <TabsTrigger value="important" className="font-semibold">
          গুরুত্বপূর্ণ
        </TabsTrigger>
        <TabsTrigger value="dailyIslam" className="font-semibold">
          দৈনন্দিন ইসলাম
        </TabsTrigger>
      </TabsList>
      <TabsContent value="latest">
        <LastNews/>
      </TabsContent>
      <TabsContent value="important">
        <ImportantNews basePath="" category={category}/>
      </TabsContent>
      <TabsContent  value="dailyIslam">
        <DailyIslam tagName="daily-islam" />
      </TabsContent>
    </Tabs>
  );
};


export default SaidTabs;
