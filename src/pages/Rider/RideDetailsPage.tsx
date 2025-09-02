/* eslint-disable @typescript-eslint/no-explicit-any */


import { useGetRideDetailsQuery } from "@/redux/features/rideApi/rideApi";
import { useParams } from "react-router";

const RideDetailsPage = () => {
  const { rideId } = useParams<{ rideId: string }>();
console.log("Ride ID from params:", rideId);

  const { data: ride, isLoading, isError } = useGetRideDetailsQuery(rideId || "");
  console.log(rideId,ride)
  if (isLoading) return <p className="text-center">Loading ride details...</p>;
  if (isError || !ride) return <p className="text-center text-red-500">Ride not found.</p>;

  const { driverId, riderId, pickupLocation, destination, fare, rideStatus, timestamps } = ride;
  console.log(ride)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ride Details</h2>

      {/* Driver & Rider Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Driver Info</h3>
          <p><strong>Name:</strong> {driverId?.name || "N/A"}</p>
          <p><strong>Email:</strong> {driverId?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {driverId?.phone || "N/A"}</p>
          <p><strong>Vehicle:</strong> {driverId?.vehicleType || "N/A"}</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Rider Info</h3>
          <p><strong>Name:</strong> {riderId?.name || "N/A"}</p>
          <p><strong>Email:</strong> {riderId?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {riderId?.phone || "N/A"}</p>
        </div>
      </div>

      {/* Ride Info */}
      <div className="p-4 border rounded mb-6">
        <h3 className="font-semibold mb-2">Ride Info</h3>
        <p><strong>Pickup:</strong> {pickupLocation?.address || "N/A"}</p>
        <p><strong>Destination:</strong> {destination?.address || destination || "N/A"}</p>
        <p><strong>Fare:</strong> ${fare}</p>
        <p><strong>Status:</strong> 
          <span className={`font-semibold ${
            rideStatus === "COMPLETED"
              ? "text-green-600"
              : rideStatus === "CANCELLED"
              ? "text-red-600"
              : rideStatus === "IN_TRANSIT"
              ? "text-blue-500"
              : "text-yellow-600"
          }`}>
            {rideStatus}
          </span>
        </p>
      </div>

      {/* Ride Timeline */}
      <div className="p-4 border rounded mb-6">
        <h3 className="font-semibold mb-2">Ride Timeline</h3>
        <ul className="list-disc pl-5 space-y-1">
          {timestamps?.requestedAt && <li>Requested: {new Date(timestamps.requestedAt).toLocaleString()}</li>}
          {timestamps?.acceptedAt && <li>Accepted: {new Date(timestamps.acceptedAt).toLocaleString()}</li>}
          {timestamps?.pickedUpAt && <li>Picked Up: {new Date(timestamps.pickedUpAt).toLocaleString()}</li>}
          {timestamps?.inTransitAt && <li>In Transit: {new Date(timestamps.inTransitAt).toLocaleString()}</li>}
          {timestamps?.completedAt && <li>Completed: {new Date(timestamps.completedAt).toLocaleString()}</li>}
        </ul>
      </div>

      {/* Optional Map Placeholder */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">Map (Optional)</h3>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          Map will appear here
        </div>
      </div>
    </div>
  );
};

export default RideDetailsPage;
