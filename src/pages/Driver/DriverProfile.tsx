/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState } from "react";


export default function DriverProfile({ driver }: { driver: any }) {
  const [formData, setFormData] = useState({
    name: driver.name || "",
    phone: driver.phone || "",
    vehicleNumber: driver.vehicle?.vehicleNumber || "",
    vehicleType: driver.vehicle?.vehicleType || "",
  });

  const [updateProfile, { isLoading }] = useUpdateDriverProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ driverId: driver._id, data: formData }).unwrap();
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4">Driver Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Name"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Phone"
        />
        <input
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Vehicle Number"
        />
        <input
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Vehicle Type"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
