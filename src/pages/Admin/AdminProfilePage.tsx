/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UpdatePassword from "../User/UpdatePassword";
import SingleImageUploader from "@/components/SingleImageUploader";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userProfileApi/userApi";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminProfilePage: React.FC = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPhone(data.data.phone || "");
      setPreviewUrl(data.data.picture || null);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error("Name and phone are required");
      return;
    }

    const phoneRegex = /^(?:\+8801\d{9}|01\d{9})$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number format");
      return;
    }

    try {
      const id = data?.data?._id || data?.data?.id;

      if (pictureFile) {
        const formData = new FormData();
        formData.append("file", pictureFile);
        formData.append("name", name.trim());
        formData.append("phone", phone.trim());
        await updateProfile({ id, userData: formData } as any).unwrap();
      } else {
        await updateProfile({
          id,
          userData: { name: name.trim(), phone: phone.trim() },
        }).unwrap();
      }

      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  const initials = data?.data?.name
    ? data.data.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
    : "A";

  return (
    <section className="container mx-auto px-4 py-10">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <h2 className="text-2xl font-bold">Admin Profile</h2>
          <p className="text-sm">
            Manage your personal information and security
          </p>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-3xl font-semibold">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="mt-4 w-full">
              <SingleImageUploader
                onChange={(file) => {
                  setPictureFile(file);
                  if (file) setPreviewUrl(URL.createObjectURL(file));
                }}
              />
            </div>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-5"
          >
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            <Button type="submit" disabled={updating} className="w-full">
              {updating ? "Updating..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Section */}
      <div className="mt-10">
        <UpdatePassword />
      </div>
    </section>
  );
};

export default AdminProfilePage;
