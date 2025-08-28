/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRidingStatusMutation,
  useCompleteRideMutation,
  useGetDriverRidesQuery,
} from "@/redux/features/driverApi/driverApi";

export default function ActiveRides() {
  const { data, isLoading } = useGetDriverRidesQuery({
    status: "REQUESTED",
    page: 1,
    limit: 10,
  });

  console.log("Driver rides data:", data);

  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();
  const [updateRidingStatus] = useUpdateRidingStatusMutation();
  const [completeRide] = useCompleteRideMutation();

  if (isLoading) return <p>Loading rides...</p>;

  // Map of allowed next actions for each rideStatus
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

  // Correct rides array from API
  const rides = data?.data || [];

  if (rides.length === 0) {
    return <p className="text-center mt-4">No rides available.</p>;
  }

  return (
    <div className="space-y-4">
      {rides.map((ride: any) => {
        const actions = nextActions[ride.rideStatus] || [];

        return (
          <div key={ride._id} className="p-4 border rounded shadow">
            <p>
              <strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}
            </p>
            <p>
              <strong>Destination:</strong> {ride.destination?.address || "N/A"}
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
                      updateRidingStatus({ rideId: ride._id, status: action.status });
                      break;
                    case "COMPLETED":
                      completeRide(ride._id);
                      break;
                  }
                };

                // Button color based on action
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
  );
}
