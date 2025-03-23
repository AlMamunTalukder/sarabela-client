import { baseApi } from "../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ commentData, id }) => ({
        url: `/comment/create-comment/${id}`,
        method: "POST",
        data: commentData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "news", id }],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
