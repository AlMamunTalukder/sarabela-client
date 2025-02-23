
import { fetchMetadata } from "@/util/FetchMetadata";
import NewsSingleDetails from "../../../../components/Share/_components/NewsSingleDetails";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = params;
    return await fetchMetadata(id);
}

type PageProps = {
    params: { id: string };
};

const Page = ({ params }: PageProps) => {
    const { id } = params; 
    console.log(id);
    return <NewsSingleDetails id={id} basePath="/national" />;
};

export default Page;
