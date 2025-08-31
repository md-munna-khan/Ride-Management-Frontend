/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetDriverProfileQuery,
  useUpdateDriverProfileMutation,
} from "@/redux/features/driverApi/driverApi";
import { useChangePasswordMutation } from "@/redux/features/rideApi/rideApi";
import UpdatePassword from "../User/UpdatePassword";



interface DriverProfileType {
  name?: string;
  email?: string;
  phoneNumber?: string;
  vehicleNumber?: string;
  vehicleType?: "Bike" | "Car";
}

const DriverProfile: React.FC = () => {
  const { data: profileData, isLoading, refetch } = useGetDriverProfileQuery({});
  const [updateDriverProfile, { isLoading: isUpdating }] = useUpdateDriverProfileMutation({});
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation({});
console.log(profileData)
  const [profile, setProfile] = useState<DriverProfileType>({});
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  // Initialize profile data
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDriverProfile({ data: profile }).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(passwords).unwrap();
      toast.success("Password updated successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Password update failed");
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded space-y-6">
      <h2 className="text-xl font-semibold mb-4">Driver Profile</h2>

      {/* Profile Info Form */}
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={profile.name || ""}
          onChange={handleProfileChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={profile.email || ""}
          onChange={handleProfileChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={profile.phoneNumber || ""}
          onChange={handleProfileChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="vehicleNumber"
          value={profile.vehicleNumber || ""}
          onChange={handleProfileChange}
          placeholder="Vehicle Number"
          className="w-full border p-2 rounded"
        />
        <select
          name="vehicleType"
          value={profile.vehicleType || ""}
          onChange={handleProfileChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Change Password</h3>
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handlePasswordChange}
          placeholder="Old Password"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          placeholder="New Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={isChangingPassword}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isChangingPassword ? "Updating..." : "Update Password"}
        </button>
      </form>
      <UpdatePassword/>
    </div>
  );
};

export default DriverProfile;
