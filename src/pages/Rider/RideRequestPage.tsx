import { useRequestRideMutation } from "@/redux/features/rideApi/rideApi";
import React, { useState } from "react";

import toast from "react-hot-toast";



export default function RideRequestPage() {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [requestRide, { isLoading }] = useRequestRideMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestRide({ pickup, destination, paymentMethod }).unwrap();
      toast.success("Ride requested successfully!");
      setPickup("");
      setDestination("");
    } catch (err: any) {
      toast.error(err.data?.message || "Request failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="input"
        required
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="input"
        required
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="input"
      >
        <option value="cash">Cash</option>
        <option value="bkash">Online</option>
    
      </select>
      <button type="submit" disabled={isLoading} className="btn">
        {isLoading ? "Requesting..." : "Request Ride"}
      </button>
    </form>
  );
}



