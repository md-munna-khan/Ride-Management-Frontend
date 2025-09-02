import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current logged-in user
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET", // optional, default is GET
      }),
      providesTags: ["USER", "RIDER"],
    }),
    // Update profile (name & phoneNumber only)
    // updateProfile: builder.mutation({
    //   query: ({ id, payload }) => ({
    //     url: `/users/${id}`,
    //     method: "PATCH",
    //     data: payload,
    //   }),
    //   invalidatesTags: ["USER", "RIDER"], // Refetch user data after update
    // }),

    updateProfile: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["USER","RIDER"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;
