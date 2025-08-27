import { useState, useEffect } from "react";
import { useUpdateProfileMutation, useChangePasswordMutation } from "@/redux/features/rideApi/rideApi";
import { useAppSelector } from "@/redux/hook";


export default function RiderProfilePage() {
  // Redux state থেকে logged in user আনছি
  const user = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  // যখন user state change হবে, তখন input এ update হবে
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateProfile({ id: user._id, data: { name, phone } }).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile!");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await changePassword({ oldPassword: "123456", newPassword: "654321" }).unwrap();
      alert("Password changed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to change password!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Your Name"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Phone Number"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-4 py-2 rounded w-full mb-3"
      >
        Update Profile
      </button>

      <button
        onClick={handlePasswordChange}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Change Password
      </button>
    </div>
  );
}
