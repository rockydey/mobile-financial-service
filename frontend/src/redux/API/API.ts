import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiTags from "./tags";

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("financial-auth-token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [...apiTags],
  endpoints: () => ({}),
});
