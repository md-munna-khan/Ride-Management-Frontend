

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetRideHistoryQuery,
  useGetRideDetailsQuery,
} from "@/redux/features/rideApi/rideApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const RideHistoryPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");

  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetRideHistoryQuery({
    page,
    limit,
    rideStatus: status === "all" ? "" : status,
    startDate,
    endDate,
    minFare,
    maxFare,
  });
console.log(data)
  const {
    data: rideDetails,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useGetRideDetailsQuery(selectedRideId!, {
    skip: !selectedRideId,
  });

  const rides = data?.data?.rides || [];
  const pagination = data?.data?.pagination;
  console.log(rides)

  if (isLoading) return <p className="text-center">Loading ride history...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load rides.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Ride History</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="REQUESTED">Requested</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Min Fare"
          value={minFare}
          onChange={(e) => setMinFare(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Fare"
          value={maxFare}
          onChange={(e) => setMaxFare(e.target.value)}
        />

        <Button onClick={() => setPage(1)}>Search</Button>
      </div>

      {/* Ride History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rides</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No rides found
                  </TableCell>
                </TableRow>
              ) : (
                rides.map((ride: any) => (
                  <TableRow key={ride._id}>
                    <TableCell>
                      {new Date(ride.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{ride.driverId?.name || "N/A"}</TableCell>
                    <TableCell>{ride.destination?.address || "N/A"}</TableCell>
                    <TableCell>${ride.fare}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ride.rideStatus === "COMPLETED"
                            ? "secondary" 
                            : ride.rideStatus === "CANCELLED" ||
                              ride.rideStatus === "REJECTED"
                            ? "destructive"
                            : ride.rideStatus === "IN_TRANSIT"
                            ? "default"
                            : "outline"
                        }
                      >
                        {ride.rideStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => setSelectedRideId(ride._id)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Ride Details Dialog */}
      <Dialog
        open={!!selectedRideId}
        onOpenChange={() => setSelectedRideId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
          </DialogHeader>
          {detailsLoading ? (
            <p>Loading ride details...</p>
          ) : detailsError ? (
            <p className="text-red-500">Failed to load ride details.</p>
          ) : rideDetails ? (
            <div className="space-y-2">
              <p>
                <strong>Driver:</strong>{" "}
                {rideDetails?.data?.driverId?.name || "N/A"}
              </p>
              <p>
                <strong>Fare:</strong> ${rideDetails?.data?.fare}
              </p>
              <p>
                <strong>Status:</strong> {rideDetails?.data?.rideStatus}
              </p>
              <p>
                <strong>Pickup:</strong>{" "}
                {rideDetails?.data?.pickupLocation?.address || "N/A"}
              </p>
              <p>
                <strong>Destination:</strong>{" "}
                {rideDetails?.data?.destination?.address || "N/A"}
              </p>
            </div>
          ) : (
            <p>No details found.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RideHistoryPage;
