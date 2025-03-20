import { baseApi } from "../api/baseApi";

const shareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShareCounts: builder.query({
      query: (newsId) => ({
        url: `/share/${newsId}`,
        method: "GET",
      }),
      providesTags: ["share"],
    }),
    shareNews: builder.mutation({
      query: (data) => {

        return {
          url: "/share",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["share"],
    }),
  }),
});

export const { useShareNewsMutation, useGetShareCountsQuery } = shareApi;
