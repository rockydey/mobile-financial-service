import { API } from "../../API/API";

export const transactionSlice = API.injectEndpoints({
  endpoints: (builder) => {
    return {
      sendMoney: builder.mutation({
        query: (data) => {
          return {
            url: "/send-money",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["Transaction"],
      }),

      cashOut: builder.mutation({
        query: (data) => {
          return {
            url: "/cash-out",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["Transaction"],
      }),

      cashIn: builder.mutation({
        query: (data) => {
          return {
            url: "/cash-in",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["Transaction"],
      }),
    };
  },
});

export const { useSendMoneyMutation, useCashOutMutation, useCashInMutation } =
  transactionSlice;
