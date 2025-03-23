import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags:['category'],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
