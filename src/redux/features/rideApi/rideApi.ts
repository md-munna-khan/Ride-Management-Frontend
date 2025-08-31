import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Ride request
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/rides/request",
        method: "POST",
        data: rideData, 
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Get my rides
    getMyRides: builder.query({
      query: () => ({
        url: "/rides/me",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    updateRideStatus: builder.mutation({
  query: ({ rideId, status }) => ({
    url: `/rides/${rideId}/status`,
    method: "PATCH",
    data: { status },
  }),
  invalidatesTags: ["RIDE"],
}),

    // Get ride history (with pagination and status)
    getRideHistory: builder.query({
      query: ({ page = 1, limit = 10, status }) => ({
        url: "/rides/me",
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: ["RIDE"],
    }),

    // Get single ride details
    getRideDetails: builder.query({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
// update Profile 
updateProfile: builder.mutation({
  query: ({ id, data }) => ({
    url: `/users/${id}`,
    method: "PATCH",
    data,
  }),
  invalidatesTags: ["RIDER"],
}),

// change Password
changePassword: builder.mutation({
  query: (data) => ({
    url: "/auth/change-password",
    method: "POST",
    data,
  }),
}),
  }),
});


// hooks export
export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetRideHistoryQuery,
  useGetRideDetailsQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation, 
  useUpdateRideStatusMutation
} = rideApi;
