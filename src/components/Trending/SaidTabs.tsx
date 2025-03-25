import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Opinion from "../News/Opinion";
import MeetUp from "../News/MeetUp";
import FeatureNews from "../News/FeatureNews";

const SaidTabs = () => {
  return (
    <Tabs defaultValue="meetUp" defaultChecked className="bg-white">
      <TabsList>
        <TabsTrigger value="meetUp" className="font-semibold">
          সাক্ষাৎকার
        </TabsTrigger>
        <TabsTrigger value="opinion" className="font-semibold">
          মতামত
        </TabsTrigger>
        <TabsTrigger value="Feature" className="font-semibold">
          ফিচার
        </TabsTrigger>
      </TabsList>
      <TabsContent value="meetUp">
        <MeetUp />
      </TabsContent>
      <TabsContent value="opinion">
        <Opinion />
      </TabsContent>
      <TabsContent value="Feature">
        <FeatureNews />
      </TabsContent>
    </Tabs>
  );
};

export default SaidTabs;
