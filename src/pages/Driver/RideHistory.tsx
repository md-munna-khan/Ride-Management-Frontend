/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDriverRidesQuery } from "@/redux/features/driverApi/driverApi";
import React, { useState } from "react";

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("COMPLETED");

  const { data, isLoading } = useGetDriverRidesQuery({
    status,
    page,
    limit: 5,
  });

  if (isLoading) return <p>Loading ride history...</p>;

  const rides = data?.data || [];

  return (
    <div className="p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4">Ride History</h2>

      {/* Status Filter */}
      <div className="mb-4">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1); // Reset page when status changes
          }}
          className="border p-2 rounded"
        >
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="ACCEPTED">Accepted</option>
        </select>
      </div>

      {/* Ride List */}
      <div className="space-y-3">
        {rides.length === 0 ? (
          <p className="text-center text-gray-500">No rides found. here is too</p>
        ) : (
          rides.map((ride: any) => (
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
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => {
            if (rides.length > 0) setPage((prev) => prev + 1);
          }}
          disabled={rides.length === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
