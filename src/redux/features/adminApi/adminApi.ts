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
