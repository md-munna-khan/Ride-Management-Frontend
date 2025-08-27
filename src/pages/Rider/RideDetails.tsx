import { useGetRideDetailsQuery } from "@/redux/features/rideApi/rideApi";
import React from "react";
import { useParams } from "react-router";


const RideDetails = () => {
  const { rideId } = useParams();
  const { data, isLoading, error } = useGetRideDetailsQuery(rideId!);

  if (isLoading) return <p>Loading ride...</p>;
  if (error) return <p>Error fetching ride</p>;

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2>Ride Details</h2>
      <p>Pickup: {data?.pickup}</p>
      <p>Destination: {data?.destination}</p>
      <p>Driver: {data?.driver?.name || "Not assigned yet"}</p>
      <p>Status: {data?.status}</p>
      <p>Fare: {data?.fare}</p>
    </div>
  );
};

export default RideDetails;
