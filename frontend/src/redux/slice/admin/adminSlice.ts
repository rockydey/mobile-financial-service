import { API } from "../../API/API";

export const adminSlice = API.injectEndpoints({
  endpoints: (builder) => {
    return {
      getVerifyAgent: builder.query({
        query: () => {
          return {
            url: `/verify-agent`,
            method: "GET",
          };
        },
        providesTags: ["Admin"],
      }),

      approveAgent: builder.mutation({
        query: (id) => {
          return {
            url: `/verify-agent/${id}`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Admin"],
      }),

      getAllAgents: builder.query({
        query: () => {
          return {
            url: `/agents`,
            method: "GET",
          };
        },
        providesTags: ["Admin"],
      }),

      getAllUsers: builder.query({
        query: () => {
          return {
            url: `/users`,
            method: "GET",
          };
        },
        providesTags: ["Admin"],
      }),

      blockUser: builder.mutation({
        query: (id) => {
          return {
            url: `/block-user/${id}`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Admin"],
      }),

      deleteUser: builder.mutation({
        query: (id) => {
          return {
            url: `/delete-user/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Admin"],
      }),
    };
  },
});

export const {
  useGetVerifyAgentQuery,
  useApproveAgentMutation,
  useGetAllAgentsQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
} = adminSlice;
