/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetDriverRidesQuery } from "@/redux/features/driverApi/driverApi";

const RideHistory = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetDriverRidesQuery({
    status,
    page,
    limit: 5,
  });
console.log(data)
  if (isLoading) return <p className="text-center">Loading rides...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load rides.</p>;

  const rides = data?.data?.rides || [];
  const pagination = data?.data?.pagination || {};

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ride History</h2>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <select
          className="border p-2 rounded"
          value={status || ""}
          onChange={(e) =>
            setStatus(e.target.value || undefined)
          }
        >
          <option value="">All</option>
          <option value="REQUESTED">Requested</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="PICKED_UP">Picked Up</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Rides List */}
      <div className="space-y-4">
        {rides.map((ride: any) => (
          <div key={ride._id} className="border p-4 rounded shadow">
            <p><span className="font-semibold">RiderId:</span> {ride.riderId || "N/A"}</p>
         
            <p><span className="font-semibold">Status:</span> {ride.rideStatus}</p>
            <p><span className="font-semibold">Requested:</span> {ride.timestamps?.requestedAt ? new Date(ride.timestamps.requestedAt).toLocaleString() : "N/A"}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RideHistory;
