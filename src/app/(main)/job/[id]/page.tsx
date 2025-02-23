import { fetchMetadata } from "@/util/FetchMetadata"
import NewsSingleDetails from "../../../../components/Share/_components/NewsSingleDetails"
import type { Metadata } from "next"

type Params = { id: string }
type SearchParams = { [key: string]: string | string[] | undefined }

type GenerateMetadataProps = {
    params: Promise<Params>
    searchParams: Promise<SearchParams>
}

export async function generateMetadata(
    { params }: GenerateMetadataProps,

): Promise<Metadata> {
    const { id } = await params
    return await fetchMetadata(id)
}

type PageProps = {
    params: Promise<Params>
    searchParams: Promise<SearchParams>
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params

    return <NewsSingleDetails id={id} basePath="/job" />
}

export default Page

