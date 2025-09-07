/* eslint-disable @typescript-eslint/no-unused-vars */




/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import UpdatePassword from "../User/UpdatePassword";
import { useGetMeQuery, useUpdateProfileMutation } from "@/redux/features/userProfileApi/userApi";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminProfilePage: React.FC = () => {
  const { data, isLoading: loadingUser } = useGetMeQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (data?.data) {
      setName(data?.data?.name || "");
      setPhone(data?.data?.phone || "");
    }
  }, [data]);
console.log(data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error("Name and Phone are required");
      return;
    }

    const phoneRegex = /^(?:\+8801\d{9}|01\d{9})$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be valid: +8801XXXXXXXXX or 01XXXXXXXXX");
      return;
    }

    try {
      const id = data.data._id;
      const userData: any = {};
      if (name.trim()) userData.name = name.trim();
      if (phone.trim()) userData.phone = phone.trim();

       await updateProfile({ id, userData }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      const message = err?.data?.message || err?.error || "Failed to update profile";
      toast.error(message);
    }
  };

  if (loadingUser) return <div className="text-center mt-6"><LoadingSpinner/></div>;

  return (
    <Card className="max-w-md mx-auto mt-6 p-10">
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801XXXXXXXXX"
              required
            />
          </div>

          <Button type="submit" disabled={updating} className="w-full">
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </form>

        {/* Update password section */}
        <div className="mt-6">
          <UpdatePassword />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfilePage;

