

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
import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

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

  // Build chart data: rides per day
  const chartMap: Record<string, number> = {};
  rides.forEach((r: any) => {
    const d = r.timestamps?.requestedAt ? new Date(r.timestamps.requestedAt) : new Date(r.createdAt || Date.now());
    const key = d.toLocaleDateString();
    chartMap[key] = (chartMap[key] || 0) + 1;
  });
  const chartData = Object.keys(chartMap)
    .map((k) => ({ date: k, rides: chartMap[k] }))
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Ride History</h2>
        <p className="text-sm text-muted-foreground">Overview of your completed and past rides</p>
      </div>

      {/* Area chart: rides per day */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Rides Over Time</h3>
            <p className="text-sm text-muted-foreground">Daily ride count</p>
          </div>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="rides" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRides)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <Select
          value={status || "ALL"}
          onValueChange={(value) => setStatus(value === "ALL" ? undefined : value)}
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
            className="border rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col gap-1 max-w-xl">
              <p className="text-sm text-muted-foreground">Rider</p>
              <p className="font-semibold">{ride.riderId?.name || ride.riderId || 'N/A'}</p>
              <p className="text-xs text-muted-foreground mt-2">Requested: {ride.timestamps?.requestedAt ? new Date(ride.timestamps.requestedAt).toLocaleString() : 'N/A'}</p>
              <p className="text-sm mt-1">Destination: <span className="font-medium">{ride.destination?.address || 'N/A'}</span></p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-lg font-medium">Fare: <span className="text-blue-600">${Number(ride.fare || 0).toFixed(2)}</span></p>
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
