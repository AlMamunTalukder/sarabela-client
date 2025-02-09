'use client'

import Discussed from "@/components/News/Discussed";
import ImportantNews from "@/components/News/ImportantNews";
import ReadNews from "@/components/News/ReadNews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { sortByDate } from "./sort";

interface TopNewsProps {
  basePath?: string;
  category: string;
}
const SideTabs = ({ category, basePath = "/" }: TopNewsProps) => {
  const { newsData, loading, error } = useSpecificNewsData(category)
  if (loading) {
    return <h3>Loading.......</h3>
  }
  if (error) {
    return <h3>Oops! data not found.</h3>
  }

  const sortNewsData = sortByDate(newsData, 'postDate')

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
        <ReadNews sortNewsData={sortNewsData} category={category} basePath={basePath} />
      </TabsContent>
      <TabsContent value="important">
        <ImportantNews category={category} basePath={basePath} />
      </TabsContent>
      <TabsContent value="discussed">
        <Discussed sortNewsData={sortNewsData} category={category} basePath={basePath} />
      </TabsContent>
    </Tabs>
  );
};

export default SideTabs;
