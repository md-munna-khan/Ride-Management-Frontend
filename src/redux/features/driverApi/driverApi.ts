


// import { baseApi } from "@/redux/baseApi";

// export const driverApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Get all rides assigned to logged-in driver
//     getDriverRides: builder.query({
//       query: ({ status, page = 1, limit = 10 }) => ({
//         url: "/rides/driver",
//         method: "GET",
//         params: { status, page, limit },
//       }),
//       providesTags: ["DRIVER", "RIDE"],
//     }), 

//     // ✅ Get all requested
//     getRequestedRides: builder.query({
//       query: () => ({
//         url: "/rides/requested",
//         method: "GET",
       
//       }),
//       providesTags: ["DRIVER", "RIDE"],
//     }),         

//     // ✅ Get logged-in driver profile
//     getDriverProfile: builder.query({
//       query: () => ({
//         url: "/drivers/me", 
//         method: "GET",
//       }),
//       providesTags: ["DRIVER"],
//     }),

//     // ✅ Update online/offline status
//     updateOnlineStatus: builder.mutation({
//       query: ({ driverId, onlineStatus }) => ({
//         url: `/drivers/online-status/${driverId}`,
//         method: "PATCH",
//       data: { onlineStatus },
//       }),
//       invalidatesTags: ["DRIVER", "RIDE"],
//     }),

//     // ✅ Update driver riding status
//  updateRidingStatus: builder.mutation({
//   query: ({ driverId, ridingStatus }) => ({
//     url: `/drivers/riding-status/${driverId}`,
//     method: "PATCH",
//     data: { ridingStatus },
//   }),
//   invalidatesTags: ["DRIVER", "RIDE"],
// }),


//     // ✅ Accept a ride
//     acceptRide: builder.mutation({
//       query: (rideId) => ({
//         url: `/rides/${rideId}/accept`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["DRIVER", "RIDE"],
//     }),

//     // ✅ Reject a ride
//     rejectRide: builder.mutation({
//       query: (rideId) => ({
//         url: `/rides/${rideId}/reject`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["DRIVER", "RIDE"],
//     }),

//     // ✅ Complete a ride
//     completeRide: builder.mutation({
//       query: (rideId) => ({
//         url: `/rides/${rideId}/complete`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["DRIVER", "RIDE"],
//     }),

//     // ✅ Get earnings summary
//     getEarnings: builder.query({
//       query: () => ({
//         url: "/rides/earnings/me",
//         method: "GET",
//       }),
//       providesTags: ["DRIVER", "RIDE"],
//     }),


//     // ✅ Update driver profile
//     updateDriverProfile: builder.mutation({
//       query: ({ driverId, data }) => ({
//         url: `/drivers/${driverId}`,
//         method: "PATCH",
//         data: data, // fixed
//       }),
//       invalidatesTags: ["DRIVER"],
//     }),

//     updateLocation: builder.mutation({
//   query: ({ driverId, coordinates }: { driverId: string; coordinates: [number, number] }) => ({
//     url: `/drivers/location/${driverId}`,
//     method: "PATCH",
//     data: { coordinates },
//   }),
//   invalidatesTags: ["DRIVER", "RIDE"],
// }),
//   }),
// });

// export const {
//   useGetDriverRidesQuery,
//   useGetDriverProfileQuery,
//   useUpdateOnlineStatusMutation,
//   useUpdateRidingStatusMutation,
//   useAcceptRideMutation,
//   useRejectRideMutation,
//   useCompleteRideMutation,
//   useGetEarningsQuery,
//   useUpdateDriverProfileMutation,
//   useUpdateLocationMutation,
//   useGetRequestedRidesQuery,

// } = driverApi;
import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all active rides for driver
    getActiveRides: builder.query({
      query: () => ({
        url: "/rides/active",
        method: "GET",
      }),
      providesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Get all requested rides
    getRequestedRides: builder.query({
      query: () => ({
        url: "/rides/requested",
        method: "GET",
      }),
      providesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Get logged-in driver profile
    getDriverProfile: builder.query({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    // ✅ Update online/offline status
    updateOnlineStatus: builder.mutation({
      query: ({ driverId, onlineStatus }) => ({
        url: `/drivers/online-status/${driverId}`,
        method: "PATCH",
        data: { onlineStatus },
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),
    // ✅ Update online/offline status
    updateRidingStatus: builder.mutation({
      query: ({ driverId, ridingStatus }) => ({
        url: `/drivers/riding-status/${driverId}`,
        method: "PATCH",
        data: { ridingStatus },
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Update driver location
    updateLocation: builder.mutation({
      query: ({ driverId, coordinates }: { driverId: string; coordinates: [number, number] }) => ({
        url: `/drivers/location/${driverId}`,
        method: "PATCH",
        data: { coordinates },
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Accept a ride
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Reject a ride
    rejectRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Mark pickup complete
    pickUpRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/pickup`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Mark ride as in transit
    markInTransit: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/transit`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),

    // ✅ Complete a ride
    completeRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDE"],
    }),
  }),
});

export const {
  useGetActiveRidesQuery,
  useUpdateRidingStatusMutation,
  useGetRequestedRidesQuery,
  useGetDriverProfileQuery,
  useUpdateOnlineStatusMutation,
  useUpdateLocationMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  usePickUpRideMutation,
  useMarkInTransitMutation,
  useCompleteRideMutation,
} = driverApi;
