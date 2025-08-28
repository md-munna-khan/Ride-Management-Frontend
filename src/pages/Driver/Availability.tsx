import { useUpdateOnlineStatusMutation } from "@/redux/features/driverApi/driverApi";
import { useState } from "react";


export default function Availability({ driverId, initialStatus }: { driverId: string; initialStatus: string }) {
  const [online, setOnline] = useState(initialStatus === "Active");
  const [updateStatus] = useUpdateOnlineStatusMutation();

  const toggleOnline = async () => {
    await updateStatus({ driverId, status: online ? "Inactive" : "Active" }).unwrap();
    setOnline(!online);
  };

  return (
    <button
      onClick={toggleOnline}
      className={`px-4 py-2 rounded ${online ? "bg-green-500" : "bg-gray-400"} text-white`}
    >
      {online ? "Online" : "Offline"}
    </button>
  );
}
