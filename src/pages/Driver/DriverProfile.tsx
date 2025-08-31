/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetDriverProfileQuery,
  useUpdateDriverProfileMutation,

 
} from "@/redux/features/driverApi/driverApi";

interface DriverProfileType {
  name?: string;
  email?: string;
  phoneNumber?: string;
  vehicleNumber?: string;
  vehicleType?: "Bike" | "Car";
  password?: string;
}

const DriverProfile: React.FC = () => {
  const { data: profileData, isLoading, refetch } = useGetDriverProfileQuery({});
  const [updateDriverProfile, { isLoading: isUpdating }] =
    useUpdateDriverProfileMutation({});

  const [profile, setProfile] = useState<DriverProfileType>({});

  useEffect(() => {
    if (profileData) {
      setProfile({
        name: profileData.name,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        vehicleNumber: profileData.vehicle?.vehicleNumber,
        vehicleType: profileData.vehicle?.vehicleType,
      });
    }
  }, [profileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send profile data under `data` key
      await updateDriverProfile({ data: profile }).unwrap();
      toast.success("Profile updated successfully");
      refetch(); // Refresh profile
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Driver Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={profile.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={profile.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={profile.phoneNumber || ""}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="vehicleNumber"
          value={profile.vehicleNumber || ""}
          onChange={handleChange}
          placeholder="Vehicle Number"
          className="w-full border p-2 rounded"
        />
        <select
          name="vehicleType"
          value={profile.vehicleType || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>
        <input
          type="password"
          name="password"
          value={profile.password || ""}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default DriverProfile;
