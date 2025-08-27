import { useChangePasswordMutation, useUpdateProfileMutation } from "@/redux/features/rideApi/rideApi";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface RiderProfilePageProps {
  user: {
    _id: string;
    name: string;
    phone: string;
  };
}

export default function RiderProfilePage({ user }: RiderProfilePageProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ id: user._id, data: { name, phone } }).unwrap();
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.data?.message || "Update failed");
    }
  };

  const handleChangePassword = async (oldPass: string, newPass: string) => {
    try {
      await changePassword({ oldPassword: oldPass, newPassword: newPass }).unwrap();
      toast.success("Password changed!");
    } catch (err: any) {
      toast.error(err.data?.message || "Password change failed");
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Profile</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input w-full"
        placeholder="Name"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input w-full"
        placeholder="Phone"
      />
      <button onClick={handleUpdateProfile} className="btn w-full">
        Update Profile
      </button>

      {/* Change Password Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          id="oldPass"
          className="input w-full mt-2"
        />
        <input
          type="password"
          placeholder="New Password"
          id="newPass"
          className="input w-full mt-2"
        />
        <button
          onClick={() => {
            const oldPass = (document.getElementById("oldPass") as HTMLInputElement).value;
            const newPass = (document.getElementById("newPass") as HTMLInputElement).value;
            handleChangePassword(oldPass, newPass);
          }}
          className="btn w-full mt-2"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
