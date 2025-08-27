
import { useGetRideDetailsQuery } from "@/redux/features/rideApi/rideApi";
import { useParams } from "react-router";

export default function RideDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetRideDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;

  const ride = data?.ride;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Ride Details</h2>
      <p><strong>Pickup:</strong> {ride.pickup}</p>
      <p><strong>Destination:</strong> {ride.destination}</p>
      <p><strong>Status:</strong> {ride.status}</p>
      <p><strong>Driver:</strong> {ride.driver?.name}</p>
      <p><strong>Phone:</strong> {ride.driver?.phone}</p>
      <p><strong>Started:</strong> {ride.startTime}</p>
      <p><strong>Completed:</strong> {ride.endTime}</p>
    </div>
  );
}
