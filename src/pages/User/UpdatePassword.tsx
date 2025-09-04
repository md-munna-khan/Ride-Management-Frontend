/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";

// import { useChangePasswordMutation } from "@/redux/features/rideApi/rideApi";
// import { Eye, EyeOff } from "lucide-react"; // Lucide icons
// import { toast } from "sonner";

// // Optional: simple beep sound on success
// const playSuccessSound = () => {
//   const audio = new Audio("/success-sound.mp3"); // place sound file in public folder
//   audio.play();
// };

// const UpdatePassword: React.FC = () => {
//   const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });
//   };

//   const toggleShowPassword = () => setShowPassword(!showPassword);

//   const handlePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await changePassword(passwords).unwrap();
//       toast.success("Password updated successfully");
//       playSuccessSound();
//       setPasswords({ oldPassword: "", newPassword: "" });
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Password update failed");
//     }
//   };

//   return (
//     <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-6 max-w-md mx-auto p-4 shadow rounded">
//       <h3 className="text-lg font-medium mb-2">Change Password</h3>

//       {/* Old Password */}
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           name="oldPassword"
//           value={passwords.oldPassword}
//           onChange={handlePasswordChange}
//           placeholder="Old Password"
//           className="w-full border p-2 rounded"
//         />
//         <button
//           type="button"
//           onClick={toggleShowPassword}
//           className="absolute right-2 top-2 text-gray-500"
//         >
//           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//         </button>
//       </div>

//       {/* New Password */}
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           name="newPassword"
//           value={passwords.newPassword}
//           onChange={handlePasswordChange}
//           placeholder="New Password"
//           className="w-full border p-2 rounded"
//         />
//         <button
//           type="button"
//           onClick={toggleShowPassword}
//           className="absolute right-2 top-2 text-gray-500"
//         >
//           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//         </button>
//       </div>

//       <button
//         type="submit"
//         disabled={isChangingPassword}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         {isChangingPassword ? "Updating..." : "Update Password"}
//       </button>
//     </form>
//   );
// };
import React, { useState } from "react";
import { useChangePasswordMutation } from "@/redux/features/rideApi/rideApi";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UpdatePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(passwords).unwrap();
      toast.success("Password updated successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Password update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 shadow-md rounded space-y-6 bg-white"
    >
      <h3 className="text-lg  font-semibold">Change Password</h3>

      {/* Old Password */}
      <div className="relative ">
        <Label htmlFor="oldPassword">Old Password</Label>
        <Input
          id="oldPassword"
          name="oldPassword"
          type={showPassword ? "text" : "password"}
          value={passwords.oldPassword}
          onChange={handleChange}
          placeholder="Enter old password"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          value={passwords.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};

export default UpdatePassword;
