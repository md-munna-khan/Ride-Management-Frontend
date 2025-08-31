/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import { useChangePasswordMutation } from "@/redux/features/rideApi/rideApi";
import { Eye, EyeOff } from "lucide-react"; // Lucide icons
import { toast } from "sonner";

// Optional: simple beep sound on success
const playSuccessSound = () => {
  const audio = new Audio("/success-sound.mp3"); // place sound file in public folder
  audio.play();
};

const UpdatePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(passwords).unwrap();
      toast.success("Password updated successfully");
      playSuccessSound();
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Password update failed");
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-6 max-w-md mx-auto p-4 shadow rounded">
      <h3 className="text-lg font-medium mb-2">Change Password</h3>

      {/* Old Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handlePasswordChange}
          placeholder="Old Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-2 top-2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          placeholder="New Password"
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-2 top-2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={isChangingPassword}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {isChangingPassword ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default UpdatePassword;
