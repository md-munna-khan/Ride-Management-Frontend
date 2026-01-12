import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ User Management
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users/all-users",
        method: "GET",
        params
      }),
      providesTags: ["ADMIN_USERS"],
    }),
       getAllDrivers: builder.query({
      query: () => ({
        url: "/drivers/all-drivers",
        method: "GET",
  
      }),
      providesTags: ["ADMIN_DRIVERS"],
    }),

    blockUnblockUser: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["ADMIN_USERS"],
    }),

    approveDriver: builder.mutation({
      query: (id: string) => ({
        url: `/drivers/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN_DRIVERS", "DRIVER"],
    }),

    suspendDriver: builder.mutation({
      query: (id: string) => ({
        url: `/drivers/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN_DRIVERS", "DRIVER"],
    }),
getAnalytics: builder.query({
  query: () => ({
    url: "/users/admin", 
    method: "GET",
  }),
  providesTags: ["ADMIN_ANALYTICS"],
}),


  
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUnblockUserMutation,
useGetAllDriversQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useGetAnalyticsQuery,


} = adminApi;
