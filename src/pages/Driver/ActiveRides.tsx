


/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRidingStatusMutation,
  useCompleteRideMutation,
  useGetDriverRidesQuery,
  useUpdateOnlineStatusMutation,
  useGetDriverProfileQuery,

} from "@/redux/features/driverApi/driverApi";
import { toast } from "sonner";

export default function ActiveRides() {
  // ✅ Get driver profile
  const { data: driverProfile,refetch } = useGetDriverProfileQuery({});

  const [updateOnlineStatus] = useUpdateOnlineStatusMutation();
  console.log(driverProfile)


  // ✅ Ride actions
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();
  const [updateRidingStatus] = useUpdateRidingStatusMutation();
  const [completeRide] = useCompleteRideMutation();

  // ✅ Fetch incoming rides
  const { data, isLoading } = useGetDriverRidesQuery({
    status: "REQUESTED",
    page: 1,
    limit: 10,
  });

  if (isLoading) return <p>Loading rides...</p>;

  // ✅ Next possible actions for each ride status
  const nextActions: Record<string, { label: string; status: string }[]> = {
    REQUESTED: [
      { label: "Accept", status: "ACCEPTED" },
      { label: "Reject", status: "REJECTED" },
    ],
    ACCEPTED: [
      { label: "Picked Up", status: "PICKED_UP" },
      { label: "Cancel", status: "CANCELLED" },
    ],
    PICKED_UP: [
      { label: "In Transit", status: "IN_TRANSIT" },
      { label: "Cancel", status: "CANCELLED" },
    ],
    IN_TRANSIT: [
      { label: "Complete", status: "COMPLETED" },
      { label: "Cancel", status: "CANCELLED" },
    ],
  };

  const rides = data?.data || [];
const handleToggleAvailability = async () => {
  const driverId = driverProfile?.data?._id;
  if (!driverId) {
    toast.error("Driver ID not available");
    return;
  }

  const newStatus =
    driverProfile?.data?.onlineStatus === "Active" ? "Offline" : "Active";

  try {
  
    toast.loading("Updating status...");
    await updateOnlineStatus({ driverId, onlineStatus: newStatus }).unwrap();

  
    await refetch();

    toast.dismiss();
    toast.success(`You are now ${newStatus}`);
  } catch (err) {
    toast.dismiss();
    toast.error("Failed to update status");
    console.error("Failed to update status", err);
  }
};

  return (
    <div className="space-y-6">
      {/* Availability Toggle */}
      <div className="flex items-center justify-between p-4 border rounded shadow">
      <p>
  <strong>Status:</strong>{" "}
  <span
    className={`${
      driverProfile?.data?.onlineStatus === "Active"
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    {driverProfile?.data?.onlineStatus || "Offline"}
  </span>
</p>
<button
  onClick={handleToggleAvailability}
  className="px-4 py-2 bg-indigo-600 text-white rounded"
>
  {driverProfile?.data?.onlineStatus === "Active" ? "Go Offline" : "Go Online"}
</button>


      </div>

      {/* Ride Requests */}
      <h2 className="text-lg font-semibold">Incoming Ride Requests</h2>
      {rides.length === 0 ? (
        <p className="text-center mt-4">No rides available.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride: any) => {
            const actions = nextActions[ride.rideStatus] || [];

            return (
              <div key={ride._id} className="p-4 border rounded shadow">
                <p>
                  <strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}
                </p>
                <p>
                  <strong>Destination:</strong>{" "}
                  {ride.destination?.address || "N/A"}
                </p>
                <p>
                  <strong>Fare:</strong> ${ride.fare || 0}
                </p>
                <p>
                  <strong>Status:</strong> {ride.rideStatus}
                </p>

                <div className="flex gap-2 mt-2">
                  {actions.map((action) => {
                    const handleClick = () => {
                      switch (action.status) {
                        case "ACCEPTED":
                          acceptRide(ride._id);
                          break;
                        case "REJECTED":
                          rejectRide(ride._id);
                          break;
                        case "PICKED_UP":
                        case "IN_TRANSIT":
                        case "CANCELLED":
                          updateRidingStatus({
                            rideId: ride._id,
                            status: action.status,
                          });
                          break;
                        case "COMPLETED":
                          completeRide(ride._id);
                          break;
                      }
                    };

                    // ✅ Button colors
                    let bgColor = "bg-blue-500";
                    if (action.status === "REJECTED" || action.status === "CANCELLED")
                      bgColor = "bg-red-500";
                    if (action.status === "COMPLETED") bgColor = "bg-green-700";
                    if (action.status === "IN_TRANSIT") bgColor = "bg-indigo-500";
                    if (action.status === "PICKED_UP") bgColor = "bg-teal-500";

                    return (
                      <button
                        key={action.status}
                        onClick={handleClick}
                        className={`px-3 py-1 text-white rounded ${bgColor}`}
                      >
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
