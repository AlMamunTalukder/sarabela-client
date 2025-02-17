import { baseApi } from "../api/baseApi";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleNews: builder.query({
      query: (slug) => ({
        url: `/news/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "news", id: slug }],
    }),
  }),
});

export const { useGetSingleNewsQuery } = newsApi;
