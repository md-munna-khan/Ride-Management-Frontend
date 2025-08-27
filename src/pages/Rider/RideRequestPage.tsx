import { useState } from "react";
import { useRequestRideMutation } from "@/redux/features/rideApi/rideApi";

export default function RideRequestPage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [fare, setFare] = useState<number | null>(null);

  const [requestRide] = useRequestRideMutation();

  const estimateFare = () => {
    if (pickup && destination) {
      setFare(Math.floor(Math.random() * 300) + 100); // demo calculation
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await requestRide({ pickup, destination, paymentMethod }).unwrap();
    console.log("Ride Requested:", res);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Request a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="wallet">Wallet</option>
        </select>

        <button type="button" onClick={estimateFare} className="bg-gray-200 px-3 py-2 rounded w-full">
          Estimate Fare
        </button>

        {fare && <p className="text-green-600">Estimated Fare: ${fare}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Request Ride
        </button>
      </form>
    </div>
  );
}
