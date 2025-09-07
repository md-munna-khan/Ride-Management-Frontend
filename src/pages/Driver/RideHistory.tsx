

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDriverRidesQuery } from "@/redux/features/driverApi/driverApi";
import LoadingSpinner from "@/components/LoadingSpinner";

const RideHistory = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetDriverRidesQuery({
    status,
    page,
    limit: 5,
  });

  if (isLoading)
    return <p className="text-center mt-6 text-gray-600"><LoadingSpinner/></p>;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-6">
        Failed to load rides.
      </p>
    );

  const rides = data?.data?.rides || [];
  const pagination = data?.data?.pagination || {};

  const getBadgeVariant = (rideStatus: string) => {
    switch (rideStatus) {
      case "COMPLETED":
        return "default"; 
      case "CANCELLED":
      case "REJECTED":
        return "destructive";
      case "IN_TRANSIT":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Ride History</h2>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        <Select
          value={status || "ALL"}
          onValueChange={(value) =>
            setStatus(value === "ALL" ? undefined : value)
          }
        >
          <SelectTrigger className="w-48 h-12">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="REQUESTED">Requested</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="PICKED_UP">Picked Up</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ride List */}
      <div className="space-y-5">
        {rides.map((ride: any) => (
          <div
            key={ride._id}
            className="border rounded-xl shadow-md p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-semibold">Rider:</span>{" "}
                {ride.riderId || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Requested:</span>{" "}
                {ride.timestamps?.requestedAt
                  ? new Date(ride.timestamps.requestedAt).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {ride.destination?.address || "N/A"}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-lg font-medium">
                Fare: <span className="text-blue-600">${ride.fare}</span>
              </p>
              <Badge variant={getBadgeVariant(ride.rideStatus)}>
                {ride.rideStatus}
              </Badge>
            </div>
          </div>
        ))}

        {rides.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No rides found</p>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span className="font-medium">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RideHistory;
