/* eslint-disable @typescript-eslint/no-unused-vars */



/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import UpdatePassword from "../User/UpdatePassword";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useGetMeQuery, useUpdateProfileMutation } from "@/redux/features/userProfileApi/userApi";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import VehicleUpdate from "./VehicleUpdate";

const DriverProfile: React.FC = () => {
  const { data, isLoading: loadingUser } = useGetMeQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      setName(data?.data?.name || "");
      setPhone(data?.data?.phone || "");
      setPreviewUrl(data?.data?.picture || null);
    }
  }, [data]);
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
      const id = data?.data?._id || data?.data?.id || "";
      // If user uploaded a new picture, send multipart/form-data
      if (pictureFile) {
        const formData = new FormData();
        formData.append("file", pictureFile);
        if (name.trim()) formData.append("name", name.trim());
        if (phone.trim()) formData.append("phone", phone.trim());
        await updateProfile({ id, userData: formData } as any).unwrap();
      } else {
        const userData: any = {};
        if (name.trim()) userData.name = name.trim();
        if (phone.trim()) userData.phone = phone.trim();
        await updateProfile({ id, userData }).unwrap();
      }
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      const message = err?.data?.message || err?.error || "Failed to update profile";
      toast.error(message);
    }
  };

  if (loadingUser) return <div className="text-center mt-6"><LoadingSpinner/></div>;
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-2xl font-bold text-slate-700">{data?.data?.name ? data.data.name.split(' ').map((n:string)=>n[0]).slice(0,2).join('') : 'D'}</div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{data?.data?.name || 'Your Name'}</h2>
                <p className="text-sm">{data?.data?.email || 'No email'}</p>
                <p className="text-xs">{data?.data?.vehicle ? `${data.data.vehicle.vehicleType} • ${data.data.vehicle.vehicleNumber}` : 'No vehicle information'}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Profile Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-2">
                  <SingleImageUploader onChange={(f) => { setPictureFile(f); if (f) setPreviewUrl(URL.createObjectURL(f)); }} />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <Button type="submit" disabled={updating} className="w-full">{updating ? 'Updating...' : 'Update Profile'}</Button>
              </form>
            </div>
            <div className="mt-6">
              <UpdatePassword />
            </div>
          </CardContent>
        </Card>

        <div className="w-full md:w-80">
          <VehicleUpdate />
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;


