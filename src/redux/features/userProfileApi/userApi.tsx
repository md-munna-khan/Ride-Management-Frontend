import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current logged-in user
   getMe: builder.query({
  query: () => ({
    url: "/users/me",
    method: "GET", // optional, default is GET
  }),
  providesTags: ["USER","RIDER"],
}),
    // Update profile (name & phoneNumber only)
    updateProfile: builder.mutation({
      query: ({ id, name, phone }: { id: string; name: string; phone: string }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { name, phone },
      }),
      invalidatesTags: ["USER","RIDER"], // Refetch user data after update
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;

