"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadNews from "../News/ReadNews";
import Discussed from "../News/Discussed";
import GoodNews from "../News/GoodNews";
const SaidTabs = () => {
  return (
    <Tabs defaultValue="Read" defaultChecked>
      <TabsList>
        <TabsTrigger value="Read" className="font-semibold">
          পঠিত
        </TabsTrigger>
        <TabsTrigger value="Discussed" className="font-semibold">
          আলোচিত
        </TabsTrigger>
        <TabsTrigger value="GoodNews" className="font-semibold">
          সুখবর
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Read">
        {/* this is last news  */}
        <ReadNews tagName={'most-readable'}/>
      </TabsContent>
      <TabsContent value="Discussed">
        {/* this is important news */}
        <Discussed  tagName={`discussed`}/>
      </TabsContent>
      <TabsContent value="GoodNews">
        {/* this is important news */}
        <GoodNews tagName={`good-news`}/>
      </TabsContent>
    </Tabs>
  );
};

export default SaidTabs;
