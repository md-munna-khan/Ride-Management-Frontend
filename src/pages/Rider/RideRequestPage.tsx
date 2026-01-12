
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, lazy, Suspense, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import {
  useRequestRideMutation,
  useGetRideDetailsQuery,
  useGiveRiderFeedbackMutation,
} from "@/redux/features/rideApi/rideApi";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

import { useNavigate } from "react-router";

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

  const navigate = useNavigate();
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CARD" | "WALLET"
  >("CASH");
  const [fare, setFare] = useState<number | null>(null);
  const [rideId, setRideId] = useState<string | null>(null);
  const { data: rideDetails } = useGetRideDetailsQuery(rideId as string, {
    skip: !rideId,
    pollingInterval: 5000,
  });
  const currentRide = rideDetails?.data ?? rideDetails ?? null;
  const [giveRiderFeedback, { isLoading: isSubmittingFeedback }] = useGiveRiderFeedbackMutation();

  const [requestRide] = useRequestRideMutation();

   // Estimate fare
  const estimateFare = () => {
    if (pickupCoords && destinationCoords) {
      const randomfare = Math.floor(Math.random() * 300) + 100;
      setFare(randomfare);
    }
  };
  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      estimateFare();
    }
  }, [pickupCoords, destinationCoords]);

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
        address: pickupAddress ?? `Lat: ${pickupCoords[0]}, Lng: ${pickupCoords[1]}`,
      },
      destination: {
        type: "Point",
        coordinates: [destinationCoords[1], destinationCoords[0]],
        address: destinationAddress ?? `Lat: ${destinationCoords[0]}, Lng: ${destinationCoords[1]}`,
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

      // capture created ride id to start polling for status
      const created = res?.data ?? res;
      const id = created?._id || created?.id || created?.ride?._id;
      if (id) setRideId(String(id));

      setPickupCoords(null);
      setDestinationCoords(null);
      setFare(null);
      setPaymentMethod("CASH");
       navigate(`/rides/${id}`);
    } catch (err: any) {
      console.error(err);
      toast(err?.data?.message || "Failed to request ride.");
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

  // Reverse geocode pickup and destination coords to human-readable addresses
  useEffect(() => {
    let cancelled = false;
    const fetchAddress = async (coords: [number, number] | null, setter: (val: string | null) => void) => {
      if (!coords) {
        setter(null);
        return;
      }
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
        );
        if (cancelled) return;
        setter(res.data?.display_name || `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
      } catch (err) {
        console.error("Reverse geocode failed", err);
        setter(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
      }
    };

    fetchAddress(pickupCoords, setPickupAddress);
    return () => {
      cancelled = true;
    };
  }, [pickupCoords]);

  useEffect(() => {
    let cancelled = false;
    const fetchAddress = async (coords: [number, number] | null, setter: (val: string | null) => void) => {
      if (!coords) {
        setter(null);
        return;
      }
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
        );
        if (cancelled) return;
        setter(res.data?.display_name || `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
      } catch (err) {
        console.error("Reverse geocode failed", err);
        setter(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
      }
    };

    fetchAddress(destinationCoords, setDestinationAddress);
    return () => {
      cancelled = true;
    };
  }, [destinationCoords]);

  return (
    <Card className="w-full mx-auto shadow-lg relative container z-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Request a Ride</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Map Section */}
          <div>
            <Label className="mb-2 block">Select Pickup & Destination</Label>
            <div className="overflow-hidden rounded-lg shadow-sm border relative z-0 max-w-full">
              <MapContainer
                center={[23.777524, 90.428047]}
                zoom={13}
                className="w-full h-64 sm:h-96 block z-0"
                style={{ maxWidth: '100%' }}
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
              {/* SOS Button overlay on map */}
              <Suspense fallback={null}>
                <div className="absolute   top-2 right-2 z-50">
                  <SOSButton />
                </div>
              </Suspense>
            </div>
            {/* Ride status box (updates via polling) */}
            {currentRide && (
              <div className="mt-4 p-3 border rounded-lg bg-muted">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Ride Status</div>
                  <div>
                    <Badge variant={currentRide.rideStatus === "IN_TRANSIT" ? "secondary" : "default"}>{currentRide.rideStatus}</Badge>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div><strong>Pickup:</strong> {currentRide.pickupLocation?.address || "N/A"}</div>
                  <div><strong>Destination:</strong> {currentRide.destination?.address || "N/A"}</div>
                  <div><strong>Fare:</strong> ${currentRide.fare || 0}</div>
                </div>

                {currentRide.rideStatus === "COMPLETED" && (
                  <div className="mt-3">
                    {currentRide.riderFeedback ? (
                      <div className="text-sm">
                        <div><strong>Your rating:</strong> {currentRide.riderFeedback.rating}</div>
                        <div><strong>Your comment:</strong> {currentRide.riderFeedback.feedback || "-"}</div>
                      </div>
                    ) : (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            await giveRiderFeedback({ rideId: currentRide._id, feedback: { rating: Number((e.target as any).rating.value), feedback: (e.target as any).comment.value } }).unwrap();
                            toast.success("Feedback submitted");
                          } catch (err: any) {
                            console.error(err);
                            toast.error(err?.data?.message || "Failed to submit feedback");
                          }
                        }}
                        className="space-y-2"
                      >
                        <div>
                          <Label className="mb-1 block">Rating</Label>
                          <select name="rating" className="w-full p-2 border rounded" defaultValue={5}>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                          </select>
                        </div>
                        <div>
                          <Label className="mb-1 block">Comment</Label>
                          <textarea name="comment" className="w-full p-2 border rounded" rows={3} placeholder="Write a quick review..." />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" disabled={isSubmittingFeedback}>{isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}</Button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

         

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm">
                <div>
                  <strong>Pickup:</strong>{' '}
                  {pickupAddress
                    ? pickupAddress
                    : pickupCoords
                    ? `${pickupCoords[0].toFixed(5)}, ${pickupCoords[1].toFixed(5)}`
                    : 'Click on map'}
                </div>
                <div>
                  <strong>Destination:</strong>{' '}
                  {destinationAddress
                    ? destinationAddress
                    : destinationCoords
                    ? `${destinationCoords[0].toFixed(5)}, ${destinationCoords[1].toFixed(5)}`
                    : 'Click on map'}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setPickupCoords(null);
                    setDestinationCoords(null);
                    setPickupAddress(null);
                    setDestinationAddress(null);
                    setFare(null);
                  }}
                >
                  Clear
                </Button>
              
              </div>
            </div>
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

