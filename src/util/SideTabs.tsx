import Discussed from "@/components/News/Discussed";
import ImportantNews from "@/components/News/ImportantNews";
import ReadNews from "@/components/News/ReadNews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TopNewsProps {
  basePath?: string;
}
const SideTabs = ({ basePath = "/international" }: TopNewsProps) => {
  return (
    <Tabs defaultValue="most_read" defaultChecked className="bg-white">
      <TabsList>
        <TabsTrigger value="most_read" className="font-semibold">
          অধিক পঠিত
        </TabsTrigger>
        <TabsTrigger value="important" className="font-semibold">
          গুরুত্বপূর্ণ
        </TabsTrigger>
        <TabsTrigger value="discussed" className="font-semibold">
          আলোচিত
        </TabsTrigger>
      </TabsList>
      <TabsContent value="most_read">
        <ReadNews basePath={basePath}/>
      </TabsContent>
      <TabsContent value="important">
        <ImportantNews basePath={basePath}/>
      </TabsContent>
      <TabsContent value="discussed">
        <Discussed basePath={basePath}/>
      </TabsContent>
    </Tabs>
  );
};

export default SideTabs;
