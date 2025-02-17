
import { fetchMetadata } from "@/util/FetchMetadata";
import NewsSingleDetails from "../../../../components/Share/_components/NewsSingleDetails";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
    const { slug } = params; 
    return await fetchMetadata(slug);
}

const Page = () => {
    return <NewsSingleDetails basePath="/economy" />;
};

export default Page;
