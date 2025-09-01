/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import UpdatePassword from "../User/UpdatePassword";
import { useGetMeQuery, useUpdateProfileMutation } from "@/redux/features/userProfileApi/userApi";

const RiderProfilePage = () => {
  const { data, isLoading: loadingUser } = useGetMeQuery({});
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPhone(data.data.phone || "");
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic frontend validation
    if (!name.trim() || !phone.trim()) {
      toast.error("Name and Phone are required");
      return;
    }

    // Validate phone format for Bangladesh
    const phoneRegex = /^(?:\+8801\d{9}|01\d{9})$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be valid: +8801XXXXXXXXX or 01XXXXXXXXX");
      return;
    }

    try {
      await updateProfile({ id: data.data._id, name: name.trim(), phone: phone.trim() }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      // Display backend error if available
      const message = err?.data?.message || err?.error || "Failed to update profile";
      toast.error(message);
    }
  };

  if (loadingUser) return <p className="text-center mt-6">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="+8801XXXXXXXXX"
            required
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Update password section */}
      <div className="mt-6">
        <UpdatePassword />
      </div>
    </div>
  );
};

export default RiderProfilePage;
