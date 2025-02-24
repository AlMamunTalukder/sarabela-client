import { baseApi } from "../api/baseApi";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleNews: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "news", id: id }],
    }),
  }),
});

export const { useGetSingleNewsQuery } = newsApi;
