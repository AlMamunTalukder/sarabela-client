"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LastNews from "../News/LastNews";
import ImportantNews from "../News/ImportantNews";
import DailyIslam from "../News/DailyIslam";


const SaidTabs = () => {

  return (
    <Tabs defaultValue="last" defaultChecked className="bg-white">
      <TabsList>
        <TabsTrigger value="last" className="font-semibold">
          সর্বশেষ
        </TabsTrigger>
        <TabsTrigger value="important" className="font-semibold">
          গুরুত্বপূর্ণ
        </TabsTrigger>
        <TabsTrigger value="dailyIslam" className="font-semibold">
          দৈনন্দিন ইসলাম
        </TabsTrigger>
      </TabsList>
      <TabsContent value="last">
        <LastNews tagName="last" />
      </TabsContent>
      <TabsContent value="important">
        <ImportantNews category="" basePath=""/>
      </TabsContent>
      <TabsContent  value="dailyIslam">
        <DailyIslam tagName="daily-islam" />
      </TabsContent>
    </Tabs>
  );
};


export default SaidTabs;
