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
    // getAllUsers: builder.query({
    //   query: ({ search, role, status, page = 1, limit = 10 }) => ({
    //     url: "/users/all-users",
    //     method: "GET",
    //     params: { search, role, status, page, limit },
    //   }),
    //   providesTags: ["ADMIN_USERS"],
    // }),

    blockUnblockUser: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["ADMIN_USERS"],
    }),

    // // 2️⃣ Driver Management
    // getAllDrivers: builder.query({
    //   query: ({ page = 1, limit = 10, status }) => ({
    //     url: "/drivers",
    //     method: "GET",
    //     params: { page, limit, status },
    //   }),
    //   providesTags: ["ADMIN_DRIVERS"],
    // }),

    approveDriver: builder.mutation({
      query: (id: string) => ({
        url: `/drivers/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN_DRIVERS"],
    }),

    suspendDriver: builder.mutation({
      query: (id: string) => ({
        url: `/drivers/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN_DRIVERS"],
    }),
getAnalytics: builder.query({
  query: () => ({
    url: "/users/admin", 
    method: "GET",
  }),
  providesTags: ["ADMIN_ANALYTICS"],
}),
    // // 3️⃣ Ride Oversight
    // getAllRides: builder.query({
    //   query: ({
    //     status,
    //     startDate,
    //     endDate,
    //     driverId,
    //     riderId,
    //     page = 1,
    //     limit = 10,
    //   }) => ({
    //     url: "/rides",
    //     method: "GET",
    //     params: { status, startDate, endDate, driverId, riderId, page, limit },
    //   }),
    //   providesTags: ["ADMIN_RIDES"],
    // }),

    // updateRideStatus: builder.mutation({
    //   query: ({ rideId, status }: { rideId: string; status: string }) => ({
    //     url: `/rides/${rideId}/status`,
    //     method: "PATCH",
    //     data: { status },
    //   }),
    //   invalidatesTags: ["ADMIN_RIDES"],
    // }),

    // // 4️⃣ Analytics Dashboard
    // getAnalytics: builder.query({
    //   query: () => ({
    //     url: "/stats/admin",
    //     method: "GET",
    //   }),
    //   providesTags: ["ADMIN_ANALYTICS"],
    // }),

    // // 5️⃣ Admin Profile Management
    // getAdminProfile: builder.query({
    //   query: () => ({
    //     url: "/users/me",
    //     method: "GET",
    //   }),
    //   providesTags: ["ADMIN_PROFILE"],
    // }),

    // updateAdminProfile: builder.mutation({
    //   query: ({ id, data }: { id: string; data: any }) => ({
    //     url: `/users/${id}`,
    //     method: "PATCH",
    //     data,
    //   }),
    //   invalidatesTags: ["ADMIN_PROFILE"],
    // }),

  
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUnblockUserMutation,
//   useGetAllDriversQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useGetAnalyticsQuery,
//   useGetAllRidesQuery,
//   useUpdateRideStatusMutation,
//   useGetAnalyticsQuery,
//   useGetAdminProfileQuery,
//   useUpdateAdminProfileMutation,

} = adminApi;
