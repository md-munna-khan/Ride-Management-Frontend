// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetRidesOversightQuery } from "@/redux/features/rideApi/rideApi";
// import { useState } from "react";

// export const RidesManagement: React.FC = () => {
//   const [status, setStatus] = useState("");
//   const [driverId, setDriverId] = useState("");
//   const [riderId, setRiderId] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const { data, isLoading, refetch } = useGetRidesOversightQuery({
//     rideStatus:status,
//     driverId,
//     riderId,
//     startDate,
//     endDate,
//     page: 1,
//     limit: 20,
//   });
// console.log(data)
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Ride Oversight</h1>

//       <div className="flex gap-2 mb-4 flex-wrap">
//         <input type="text" placeholder="Driver ID" value={driverId} onChange={(e) => setDriverId(e.target.value)} />
//         <input type="text" placeholder="Rider ID" value={riderId} onChange={(e) => setRiderId(e.target.value)} />
//         <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value="">All Status</option>
//           <option value="REQUESTED">Requested</option>
//           <option value="ACCEPTED">Accepted</option>
//           <option value="IN_TRANSIT">In Progress</option>
//           <option value="COMPLETED">Completed</option>
//           <option value="CANCELLED">Cancelled</option>
//         </select>
//         <button onClick={() => refetch()} className="bg-blue-600 text-white px-4 rounded">Filter</button>
//       </div>

//       {isLoading ? <p>Loading...</p> : (
//         <table className="w-full border border-gray-200">
//           <thead>
//             <tr>
//               <th>Ride ID</th>
//               <th>Driver</th>
//               <th>Rider</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Fare</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.data.map((ride: any) => (
//               <tr key={ride._id}>
//                 <td>{ride._id}</td>
//                 <td>{ride.driverId?.name || "N/A"}</td>
//                 <td>{ride.riderId?.name || "N/A"}</td>
//                 <td>{ride.rideStatus}</td>
//                 <td>{new Date(ride.createdAt).toLocaleString()}</td>
//                 <td>{ride.fare}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetRidesOversightQuery } from "@/redux/features/rideApi/rideApi";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";

export const RidesManagement: React.FC = () => {
  const [status, setStatus] = useState("");
  const [driverId, setDriverId] = useState("");
  const [riderId, setRiderId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, refetch } = useGetRidesOversightQuery({
    rideStatus: status,
    driverId,
    riderId,
    startDate,
    endDate,
    page: 1,
    limit: 20,
  });

  return (
    <Card className="p-6">
      <CardContent>
        <h1 className="text-2xl font-bold mb-6">Ride Oversight</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Input
            placeholder="Driver ID"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="min-w-[150px]"
          />
          <Input
            placeholder="Rider ID"
            value={riderId}
            onChange={(e) => setRiderId(e.target.value)}
            className="min-w-[150px]"
          />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="min-w-[150px]"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="min-w-[150px]"
          />

          <Select value={status || "all"} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="REQUESTED">Requested</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="IN_TRANSIT">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => refetch()} className="bg-blue-600 text-white">
            Filter
          </Button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2 text-left">Ride ID</th>
                  <th className="border px-4 py-2 text-left">Driver</th>
                  <th className="border px-4 py-2 text-left">Rider</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">Fare</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((ride: any) => (
                  <tr key={ride._id}>
                    <td className="border px-4 py-2">{ride._id}</td>
                    <td className="border px-4 py-2">
                      {ride.driverId?.name || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {ride.riderId?.name || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      <Badge
                        variant={
                          ride.rideStatus === "CANCELLED"
                            ? "destructive"
                            : ride.rideStatus === "COMPLETED"
                            ? "secondary" // replace "success" with "secondary"
                            : "secondary"
                        }
                      >
                        {ride.rideStatus}
                      </Badge>
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(ride.createdAt).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{ride.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
