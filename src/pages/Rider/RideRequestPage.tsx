

// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useRequestRideMutation } from "@/redux/features/rideApi/rideApi";
// import { toast } from "sonner";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";

// // Fix default marker icon issue in React Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// export default function RideRequestPage() {
//   const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
//     null
//   );
//   const [destinationCoords, setDestinationCoords] = useState<
//     [number, number] | null
//   >(null);
//   const [paymentMethod, setPaymentMethod] = useState<
//     "CASH" | "CARD" | "WALLET"
//   >("CASH");
//   const [fare, setFare] = useState<number | null>(null);

//   const [requestRide] = useRequestRideMutation();

//   // Estimate fare
//   const estimateFare = () => {
//     if (pickupCoords && destinationCoords) {
//       setFare(Math.floor(Math.random() * 300) + 100); // demo calculation
//     } else {
//       toast("Please select pickup and destination points on the map.");
//     }
//   };

//   // Submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!pickupCoords || !destinationCoords || !fare || !paymentMethod) {
//       toast("Please select pickup, destination, payment method, and estimate fare.");
//       return;
//     }

//     const payload = {
//       pickupLocation: {
//         type: "Point",
//         coordinates: [pickupCoords[1], pickupCoords[0]], // [lng, lat]
//         address: `Lat: ${pickupCoords[0]}, Lng: ${pickupCoords[1]}`,
//       },
//       destination: {
//         type: "Point",
//         coordinates: [destinationCoords[1], destinationCoords[0]],
//         address: `Lat: ${destinationCoords[0]}, Lng: ${destinationCoords[1]}`,
//       },
//       paymentMethod,
//       fare,
//       rideStatus: "REQUESTED",
//       timestamps: {
//         requestedAt: new Date().toISOString(),
//       },
//     };

//     try {
//       const res = await requestRide(payload).unwrap();
//       console.log("Ride Requested:", res);
//       toast("Ride requested successfully!");

//       setPickupCoords(null);
//       setDestinationCoords(null);
//       setFare(null);
//       setPaymentMethod("CASH");
//     } catch (err: any) {
//       console.error(err);
//       toast("Failed to request ride");
//     }
//   };

//   // Marker selection component
//   function LocationMarker({
//     onSelect,
//   }: {
//     onSelect: (coords: [number, number]) => void;
//   }) {
//     useMapEvents({
//       click(e) {
//         onSelect([e.latlng.lat, e.latlng.lng]);
//       },
//     });
//     return null;
//   }

//   return (
//     <Card className="w-full mx-auto shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold">Request a Ride</CardTitle>
//       </CardHeader>

//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           {/* Map Section */}
//           <div>
//             <Label className="mb-2 block">Select Pickup & Destination</Label>
//             <MapContainer
//               center={[23.777524, 90.428047]}
//               zoom={13}
//               style={{ height: 300, width: "100%", zIndex:0, borderRadius: "12px" }}
//             >
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               {pickupCoords && <Marker position={pickupCoords} />}
//               {destinationCoords && <Marker position={destinationCoords} />}
//               <LocationMarker
//                 onSelect={(coords) => {
//                   if (!pickupCoords) setPickupCoords(coords);
//                   else if (!destinationCoords) setDestinationCoords(coords);
//                 }}
//               />
//             </MapContainer>
//             <p className="text-sm text-gray-500 mt-2">
//               Pickup:{" "}
//               {pickupCoords
//                 ? `${pickupCoords[0]}, ${pickupCoords[1]}`
//                 : "Click on map"}{" "}
//               <br />
//               Destination:{" "}
//               {destinationCoords
//                 ? `${destinationCoords[0]}, ${destinationCoords[1]}`
//                 : "Click on map"}
//             </p>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <Label className="mb-1 block">Payment Method</Label>
//             <Select
//               value={paymentMethod}
//               onValueChange={(val) =>
//                 setPaymentMethod(val as "CASH" | "CARD" | "WALLET")
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Payment Method" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="CASH">Cash</SelectItem>
//                 <SelectItem value="CARD">Card</SelectItem>
//                 <SelectItem value="WALLET">Wallet</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Estimate Fare */}
//           <Button
//             type="button"
//             variant="secondary"
//             className="w-full"
//             onClick={estimateFare}
//           >
//             Estimate Fare
//           </Button>

//           {fare && (
//             <p className="text-green-600 font-medium">
//               Estimated Fare: ${fare}
//             </p>
//           )}
//         </CardContent>

//         <CardFooter>
//           <Button type="submit" className="w-full">
//             Request Ride
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, lazy, Suspense } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useRequestRideMutation } from "@/redux/features/rideApi/rideApi";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// ✅ Lazy load SOS button
const SOSButton = lazy(() => import("../SOSButton"));

// Fix default marker icon issue in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RideRequestPage() {
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null
  );
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CARD" | "WALLET"
  >("CASH");
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
      const res = await requestRide(payload).unwrap();
      console.log("Ride Requested:", res);
      toast("Ride requested successfully!");

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
  function LocationMarker({
    onSelect,
  }: {
    onSelect: (coords: [number, number]) => void;
  }) {
    useMapEvents({
      click(e) {
        onSelect([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <Card className="w-full mx-auto shadow-lg relative">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Request a Ride</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Map Section */}
          <div className="relative">
            <Label className="mb-2 block">Select Pickup & Destination</Label>
            <MapContainer
              center={[23.777524, 90.428047]}
              zoom={13}
              style={{ height: 300, width: "100%", zIndex: 0, borderRadius: "12px" }}
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

            {/* ✅ SOS Button fixed at top-right */}
            <Suspense fallback={null}>
              <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6 lg:top-8 lg:right-8">
                <SOSButton />
              </div>
            </Suspense>

            <p className="text-sm text-gray-500 mt-2">
              Pickup:{" "}
              {pickupCoords
                ? `${pickupCoords[0]}, ${pickupCoords[1]}`
                : "Click on map"}{" "}
              <br />
              Destination:{" "}
              {destinationCoords
                ? `${destinationCoords[0]}, ${destinationCoords[1]}`
                : "Click on map"}
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-1 block">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={(val) =>
                setPaymentMethod(val as "CASH" | "CARD" | "WALLET")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="CARD">Card</SelectItem>
                <SelectItem value="WALLET">Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estimate Fare */}
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={estimateFare}
          >
            Estimate Fare
          </Button>

          {fare && (
            <p className="text-green-600 font-medium">
              Estimated Fare: ${fare}
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Request Ride
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

