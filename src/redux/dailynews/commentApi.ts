import { baseApi } from "../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ commentData, id }) => ({
        url: `/comment/create-comment/${id}`,
        method: "POST",
        data: commentData,
      }),
    }),
    

    getAllComment: builder.query({
      query: (newsId) => ({
        url: `/comment/${newsId}`,
        method: "GET",
      }),
      providesTags: (result) => (result ? ["comment"] : []),
    }),
  }),
});

export const { useCreateCommentMutation, useGetAllCommentQuery } = commentApi;
