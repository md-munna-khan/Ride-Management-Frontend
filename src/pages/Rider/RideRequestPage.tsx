/* eslint-disable @typescript-eslint/no-explicit-any */



import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useRequestRideMutation } from "@/redux/features/rideApi/rideApi";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RideRequestPage() {
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD" | "WALLET">("CASH");
  const [fare, setFare] = useState<number | null>(null);

  const [requestRide] = useRequestRideMutation();

  // Estimate fare
  const estimateFare = () => {
    if (pickupCoords && destinationCoords) {
      setFare(Math.floor(Math.random() * 300) + 100); // demo calculation
    } else {
      toast("Please select pickup and destination points on the map.");
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupCoords || !destinationCoords || !fare || !paymentMethod) {
      toast("Please select pickup, destination, payment method, and estimate fare.");
      return;
    }

    // Build payload
    const payload = {
      pickupLocation: {
        type: "Point",
        coordinates: [pickupCoords[1], pickupCoords[0]], // [lng, lat]
        address: `Lat: ${pickupCoords[0]}, Lng: ${pickupCoords[1]}`,
      },
      destination: {
        type: "Point",
        coordinates: [destinationCoords[1], destinationCoords[0]],
        address: `Lat: ${destinationCoords[0]}, Lng: ${destinationCoords[1]}`,
      },
      paymentMethod, 
      fare,
      rideStatus: "REQUESTED",
      timestamps: {
        requestedAt: new Date().toISOString(),
      },
    };

    try {
      console.log("Payload:", payload);
      const res = await requestRide(payload).unwrap();
      console.log("Ride Requested:", res);
      toast("Ride requested successfully!");

      // Reset form
      setPickupCoords(null);
      setDestinationCoords(null);
      setFare(null);
      setPaymentMethod("CASH");
    } catch (err: any) {
      console.error(err);
      toast("Failed to request ride");
    }
  };

  // Marker selection component
  function LocationMarker({ onSelect }: { onSelect: (coords: [number, number]) => void }) {
    useMapEvents({
      click(e) {
        onSelect([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Request a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <h3 className="font-medium">Select Pickup & Destination on Map</h3>
          <MapContainer
            center={[23.777524, 90.428047]}
            zoom={13}
            style={{ height: 300, width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {pickupCoords && <Marker position={pickupCoords} />}
            {destinationCoords && <Marker position={destinationCoords} />}
            <LocationMarker
              onSelect={(coords) => {
                if (!pickupCoords) setPickupCoords(coords);
                else if (!destinationCoords) setDestinationCoords(coords);
              }}
            />
          </MapContainer>
          <p className="text-sm text-gray-500 mt-2">
            Pickup: {pickupCoords ? `${pickupCoords[0]}, ${pickupCoords[1]}` : "Click on map"} <br />
            Destination: {destinationCoords ? `${destinationCoords[0]}, ${destinationCoords[1]}` : "Click on map"}
          </p>
        </div>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value as "CASH" | "CARD" | "WALLET")
          }
          className="border p-2 w-full rounded"
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="WALLET">Wallet</option>
        </select>

        <button
          type="button"
          onClick={estimateFare}
          className="bg-gray-200 px-3 py-2 rounded w-full"
        >
          Estimate Fare
        </button>

        {fare && <p className="text-green-600">Estimated Fare: ${fare}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Request Ride
        </button>
      </form>
    </div>
  );
}
