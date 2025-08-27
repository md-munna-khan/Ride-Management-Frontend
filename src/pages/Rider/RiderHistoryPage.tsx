import { useGetRideHistoryQuery } from "@/redux/features/rideApi/rideApi";
import  { useState } from "react";




export default function RiderHistoryPage() {
 

  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetRideHistoryQuery({ page, limit: 10 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rides</p>;

  return (
    <div className="space-y-2">
      {data?.rides.map((ride: any) => (
        <div key={ride._id} className="p-4 border rounded">
          <p>Pickup: {ride.pickup}</p>
          <p>Destination: {ride.destination}</p>
          <p>Status: {ride.status}</p>
          <p>Fare: {ride.fare}</p>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={data?.rides.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}


