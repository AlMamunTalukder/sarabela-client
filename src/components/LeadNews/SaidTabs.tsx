"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LastNews from "../News/LastNews";
import ImportantNews from "../News/ImportantNews";
import DailyIslam from "../News/DailyIslam";

type BaseProps = {
  basePath: string
}
const SaidTabs = ({ basePath }: BaseProps) => {
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
        {/* this is last news  */}
        <LastNews basePath={basePath} />
      </TabsContent>
      <TabsContent value="important">
        {/* this is important news */}
        <ImportantNews basePath={basePath} />
      </TabsContent>
      <TabsContent value="dailyIslam">
        {/* this is important news */}
        <DailyIslam basePath={basePath} />
      </TabsContent>
    </Tabs>
  );
};

export default SaidTabs;
