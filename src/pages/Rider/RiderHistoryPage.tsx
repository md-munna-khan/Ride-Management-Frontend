// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import {
//   useGetRideHistoryQuery,
//   useGetRideDetailsQuery,
// } from "@/redux/features/rideApi/rideApi";

// const RideHistoryPage = () => {
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);

//   const [status, setStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [minFare, setMinFare] = useState("");
//   const [maxFare, setMaxFare] = useState("");

//   // ✅ ride details state
//   const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

//   const { data, isLoading, isError } = useGetRideHistoryQuery({
//     page,
//     limit,
//     status,
//     startDate,
//     endDate,
//     minFare,
//     maxFare,
//   });
// console.log(data)
//   // ✅ ride details query
//   const {
//     data: rideDetails,
//     isLoading: detailsLoading,
//     isError: detailsError,
//   } = useGetRideDetailsQuery(selectedRideId!, {
//     skip: !selectedRideId,
//   });

//   // ✅ Safe destructure
//   const rides = data?.data?.rides || [];
//   const pagination = data?.data?.pagination;

//   if (isLoading)
//     return <p className="text-center">Loading ride history...</p>;
//   if (isError)
//     return (
//       <p className="text-center text-red-500">Failed to load rides.</p>
//     );

//   const handleRideDetails = (rideId: string) => {
//     setSelectedRideId(rideId);
//   };

//   const closeModal = () => {
//     setSelectedRideId(null);
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Ride History</h2>

//       {/* Filters */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All Status</option>
//           <option value="REQUESTED">Requested</option>
//           <option value="ACCEPTED">Accepted</option>
//           <option value="IN_TRANSIT">In Transit</option>
//           <option value="COMPLETED">Completed</option>
//           <option value="CANCELLED">Cancelled</option>
//           <option value="REJECTED">Rejected</option>
//         </select>

//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border p-2 rounded"
//         />

//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           placeholder="Min Fare"
//           value={minFare}
//           onChange={(e) => setMinFare(e.target.value)}
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           placeholder="Max Fare"
//           value={maxFare}
//           onChange={(e) => setMaxFare(e.target.value)}
//           className="border p-2 rounded"
//         />

//         <button
//           onClick={() => setPage(1)} // reset to first page when filtering
//           className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Ride History Table */}
//       <div className="overflow-x-auto">
//         <table className="table-auto border-collapse border border-gray-300 w-full">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Driver</th>
//               <th className="border p-2">Destination</th>
//               <th className="border p-2">Fare</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rides.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center p-4">
//                   No rides found
//                 </td>
//               </tr>
//             ) : (
//               rides.map((ride: any) => (
//                 <tr key={ride._id} className="hover:bg-gray-50">
//                   <td className="border p-2">
//                     {new Date(ride.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="border p-2">{ride.driverId?.name || "N/A"}</td>
//                   <td className="border p-2">
//                     {ride.destination?.address || "N/A"}
//                   </td>
//                   <td className="border p-2">${ride.fare}</td>

//                   <td
//                     className={`border p-2 font-semibold ${
//                       ride.status === "COMPLETED"
//                         ? "text-green-600"
//                         : ride.status === "CANCELLED"
//                         ? "text-red-600"
//                         : ride.status === "REJECTED"
//                         ? "text-red-500"
//                         : ride.status === "IN_TRANSIT"
//                         ? "text-blue-500"
//                         : "text-yellow-600"
//                     }`}
//                   >
//                     {ride.rideStatus}
//                   </td>
//                   <td className="border p-2 text-center">
//                     <button
//                       onClick={() => handleRideDetails(ride._id)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {pagination && (
//         <div className="flex justify-center items-center mt-6 gap-4">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span>
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <button
//             disabled={page === pagination.totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Ride Details Modal */}
//       {selectedRideId && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             {detailsLoading ? (
//               <p>Loading ride details...</p>
//             ) : detailsError ? (
//               <p className="text-red-500">Failed to load ride details.</p>
//             ) : rideDetails ? (
//               <div>
//                 <h3 className="text-xl font-bold mb-2">Ride Details</h3>
//                 <p>
//                   <strong>Driver:</strong>{" "}
//                   {rideDetails?.data?.driverId?.name || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Fare:</strong> ${rideDetails?.data?.fare}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {rideDetails?.data?.rideStatus}
//                 </p>
//                 <p>
//                   <strong>Pickup:</strong>{" "}
//                   {rideDetails?.data?.pickupLocation?.address || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Destination:</strong>{" "}
//                   {rideDetails?.data?.destination?.address || "N/A"}
//                 </p>
//               </div>
//             ) : (
//               <p>No details found.</p>
//             )}

//             <button
//               onClick={closeModal}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RideHistoryPage;

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
    status: status === "all" ? "" : status,
    startDate,
    endDate,
    minFare,
    maxFare,
  });

  const {
    data: rideDetails,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useGetRideDetailsQuery(selectedRideId!, {
    skip: !selectedRideId,
  });

  const rides = data?.data?.rides || [];
  const pagination = data?.data?.pagination;

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
                            ? "secondary" // এখানে "success" এর জায়গায় "secondary" বা "default" use করো
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
