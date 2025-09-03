import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: config.baseUrl,
  //     credentials: "include",
  //   }),
  tagTypes: ["RIDER","RIDE","ADMIN_ANALYTICS","DRIVER","RIDE_OVERSIGHT","EARNINGS","DriverRides","USER","ADMIN_DRIVERS","ADMIN_USERS"],
  endpoints: () => ({}),
});
