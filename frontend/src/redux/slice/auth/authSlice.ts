import { API } from "../../API/API";

const URL = "/auth";

export const authSliceApi = API.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (body) => {
          return {
            url: `${URL}/register`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["User"],
      }),

      login: builder.mutation({
        query: (body) => {
          return {
            url: `${URL}/login`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["User"],
      }),

      getMe: builder.query({
        query: () => {
          return {
            url: `${URL}/me`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
} = authSliceApi;
