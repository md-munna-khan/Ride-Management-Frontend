import { baseApi } from "@/redux/baseApi";


export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all rides assigned to logged-in driver
    getDriverRides: builder.query({
      query: ({ status, page = 1, limit = 10 }) => ({
        url: "/rides/driver",
        method: "GET",
        params: { status, page, limit },
      }),
      providesTags: ["DRIVER", "RIDE"],
    }),

    // Update online/offline status
    updateOnlineStatus: builder.mutation({
      query: ({ driverId, status }) => ({
        url: `/drivers/online-status/${driverId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // Update riding status (idle/on ride)
    updateRidingStatus: builder.mutation({
      query: ({ driverId, status }) => ({
        url: `/drivers/riding-status/${driverId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // Accept a ride
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // Reject a ride
    rejectRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // Complete a ride
    completeRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // Get earnings summary
    getEarnings: builder.query({
      query: () => ({
        url: "/rides/earnings/me",
        method: "GET",
      }),
      providesTags: ["DRIVER", "RIDE"],
    }),

    // Update driver profile
    updateDriverProfile: builder.mutation({
      query: ({ driverId, data }) => ({
        url: `/drivers/${driverId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["DRIVER"],
    }),
  }),
});

export const {
  useGetDriverRidesQuery,
  useUpdateOnlineStatusMutation,
  useUpdateRidingStatusMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  useCompleteRideMutation,
useGetEarningsQuery,
  useUpdateDriverProfileMutation,
} = driverApi;
