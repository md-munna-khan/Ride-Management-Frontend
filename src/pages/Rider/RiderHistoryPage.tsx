import { useState } from "react";
import { useGetRideHistoryQuery } from "@/redux/features/rideApi/rideApi";

export default function RideHistoryPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { data, isLoading } = useGetRideHistoryQuery({ page, limit: 5, status });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Ride History</h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="">All</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <ul className="space-y-2">
        {data?.rides?.map((ride: any) => (
          <li key={ride._id} className="border p-3 rounded">
            <p><strong>From:</strong> {ride.pickup}</p>
            <p><strong>To:</strong> {ride.destination}</p>
            <p><strong>Status:</strong> {ride.status}</p>
            <p><strong>Fare:</strong> ${ride.fare}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
