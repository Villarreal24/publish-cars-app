// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { DataForm } from "../../types/formTypes"

interface TestResponse {
  message: string
}

export const carsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  reducerPath: "carsApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Cars"],
  endpoints: build => ({
    getHome: build.query<TestResponse, void>({
      query: () => "/",
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: [{ type: "Cars" }],
    }),
    postPublishCarForm: build.mutation<TestResponse, DataForm>({
      query: formData => ({
        url: "/publish",
        method: "POST",
        body: formData,
      }),
    }),
  }),
})

export const { useGetHomeQuery, usePostPublishCarFormMutation } = carsApi
