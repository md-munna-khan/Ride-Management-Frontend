/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */


// import { useEffect, useState } from "react";
// import {
//   useGetActiveRidesQuery,
//   useGetRequestedRidesQuery,
//   useGetDriverProfileQuery,
//   useUpdateOnlineStatusMutation,
//   useUpdateLocationMutation,
//   useAcceptRideMutation,
//   useRejectRideMutation,
//   usePickUpRideMutation,
//   useMarkInTransitMutation,
//   useCompleteRideMutation,
//   useUpdateRidingStatusMutation,
// } from "@/redux/features/driverApi/driverApi";
// import { toast } from "sonner";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";


// // Leaflet default icon fix
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// // Auto-center map
// function RecenterMap({ coords }: { coords: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(coords, map.getZoom(), { animate: true });
//   }, [coords, map]);
//   return null;
// }

// export default function ActiveRides() {
//   // ==== Queries & Mutations ====
//   const { data: driverProfile, refetch } = useGetDriverProfileQuery({});
//   const { data: activeRidesData, isLoading: activeLoading } = useGetActiveRidesQuery({});
//   const { data: requestedRidesData, isLoading: requestedLoading } = useGetRequestedRidesQuery({});



//   const [updateOnlineStatus] = useUpdateOnlineStatusMutation();
//   const [updateLocation] = useUpdateLocationMutation();
//   const [updateRidingStatus] = useUpdateRidingStatusMutation();
//   const [acceptRide] = useAcceptRideMutation();
//   const [rejectRide] = useRejectRideMutation();
//   const [pickUpRide] = usePickUpRideMutation();
//   const [markInTransit] = useMarkInTransitMutation();
//   const [completeRide] = useCompleteRideMutation();

//   // ==== State ====
//   const [driverCoords, setDriverCoords] = useState<[number, number] | null>(null);
//   const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

//   const activeRides = activeRidesData?.data || [];
//   const requestedRides = requestedRidesData?.data || [];


//   // ==== Track Driver Location ====
//   useEffect(() => {
//     if (!driverProfile?.data?._id || driverProfile?.data?.onlineStatus !== "Active") return;
//     const watchId = navigator.geolocation.watchPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setDriverCoords([latitude, longitude]);
//         try {
//           await updateLocation({ driverId: driverProfile.data._id, coordinates: [longitude, latitude] }).unwrap();
//         } catch (err) {
//           console.error(err);
//         }
//       },
//       console.error,
//       { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
//     );
//     return () => navigator.geolocation.clearWatch(watchId);
//   }, [driverProfile, updateLocation]);

//   // Get user location
//   useEffect(() => {
//     navigator.geolocation?.getCurrentPosition(
//       (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
//       console.error,
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   // Toggle online/offline
//   const handleToggleStatus = async () => {
//     const driverId = driverProfile?.data?._id;
//     if (!driverId) return toast.error("Driver ID not available");
//     const newStatus = driverProfile?.data?.onlineStatus === "Active" ? "Offline" : "Active";
//     try {
//       toast.loading("Updating status...");
//       await updateOnlineStatus({ driverId, onlineStatus: newStatus }).unwrap();
//       await refetch();
//       toast.dismiss();
//       toast.success(`You are now ${newStatus}`);
//     } catch (err) {
//       toast.dismiss();
//       toast.error("Failed to update status");
//       console.error(err);
//     }
//   };

//   // Ride Actions mapping
//   const nextActions: Record<string, { label: string; status: string }[]> = {
//     REQUESTED: [
//       { label: "Accept", status: "ACCEPTED" },
//       { label: "Reject", status: "REJECTED" },
//     ],
//     ACCEPTED: [
//       { label: "Picked Up", status: "PICKED_UP" },
//       { label: "Cancel", status: "CANCELLED" },
//     ],
//     PICKED_UP: [
//       { label: "In Transit", status: "IN_TRANSIT" },
//       { label: "Cancel", status: "CANCELLED" },
//     ],
//     IN_TRANSIT: [
//       { label: "Complete", status: "COMPLETED" },
//       { label: "Cancel", status: "CANCELLED" },
//     ],
//   };

//   const handleRideAction = async (rideId: string, actionStatus: string, label: string) => {
//     try {
//       toast.loading(`${label}...`);
//       switch (actionStatus) {
//         case "ACCEPTED": await acceptRide(rideId).unwrap(); break;
//         case "REJECTED": await rejectRide(rideId).unwrap(); break;
//         case "PICKED_UP": await pickUpRide(rideId).unwrap(); break;
//         case "IN_TRANSIT": await markInTransit(rideId).unwrap(); break;
//         case "COMPLETED": await completeRide(rideId).unwrap(); break;
//         case "CANCELLED": console.log("Cancelled"); break;
//       }
//       await refetch();
//       toast.dismiss();
//       toast.success(`${label} successful`);
//     } catch (err) {
//       toast.dismiss();
//       toast.error(`Failed to ${label}`);
//       console.error(err);
//     }
//   };

//   // RidingStatus options
//   const ridingStatusOptions: ('idle' | 'waiting_for_pickup' | 'in_transit' | 'unavailable')[] = [
//     "idle",
//     "waiting_for_pickup",
//     "in_transit",
//     "unavailable",
//   ];

//   // ==== Render ====
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const renderRideCard = (ride: any) => {
//     const actions = nextActions[ride.rideStatus] || [];
//     return (
//       <div key={ride._id} className="p-4 border rounded shadow">
//         <p><strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}</p>
//         <p><strong>Destination:</strong> {ride.destination?.address || "N/A"}</p>
//         <p><strong>Fare:</strong> ${ride.fare || 0}</p>
//         <p><strong>Status:</strong> {ride.rideStatus}</p>
//         <p><strong>Riding Status:</strong> {ride.driver?.ridingStatus || "idle"}</p>

//         {/* Ride action buttons */}
//         <div className="flex gap-2 mt-2">
//           {actions.map((action) => {
//             let bg = "bg-blue-500";
//             if (["REJECTED","CANCELLED"].includes(action.status)) bg = "bg-red-500";
//             if (action.status === "COMPLETED") bg = "bg-green-700";
//             if (action.status === "IN_TRANSIT") bg = "bg-indigo-500";
//             if (action.status === "PICKED_UP") bg = "bg-teal-500";
//             return (
//               <button key={action.status} onClick={() => handleRideAction(ride._id, action.status, action.label)}
//                 className={`px-3 py-1 text-white rounded ${bg}`}>
//                 {action.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Riding status update buttons */}
//         <div className="flex gap-2 mt-2">
//           {ridingStatusOptions.map((status) => (
//             <button
//               key={status}
//               onClick={async () => {
//                 try {
//                   if (!driverProfile?.data?._id) return toast.error("Driver ID missing");
//                   await updateRidingStatus({ driverId: driverProfile.data._id, ridingStatus: status }).unwrap();
//                   await refetch();
//                   toast.success(`Riding status updated to ${status}`);
//                 } catch (err) {
//                   toast.error("Failed to update riding status");
//                   console.error(err);
//                 }
//               }}
//               className={`px-2 py-1 rounded text-white ${
//                 status === "idle" ? "bg-green-500" :
//                 status === "waiting_for_pickup" ? "bg-yellow-500" :
//                 status === "in_transit" ? "bg-indigo-500" :
//                 "bg-red-500"
//               }`}
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Online Toggle */}
//       <div className="flex items-center justify-between p-4 border rounded shadow">
//         <p>
//           <strong>Status:</strong>{" "}
//           <span className={driverProfile?.data?.onlineStatus === "Active" ? "text-green-600" : "text-red-600"}>
//             {driverProfile?.data?.onlineStatus || "Offline"}
//           </span>
//         </p>
//         <button onClick={handleToggleStatus} className="px-4 py-2 bg-indigo-600 text-white rounded">
//           {driverProfile?.data?.onlineStatus === "Active" ? "Go Offline" : "Go Online"}
//         </button>
//       </div>

//       {/* Requested Rides */}
//       <h2 className="text-lg font-semibold">Requested Rides</h2>
//       {requestedLoading ? (
//         <p className="text-center mt-4">Loading rides...</p>
//       ) : requestedRides.length === 0 ? (
//         <p className="text-center mt-4">No requested rides.</p>
//       ) : (
//         requestedRides.map(renderRideCard)
//       )}

//       {/* Active Rides */}
//       <h2 className="text-lg font-semibold">Active Rides</h2>
//       {activeLoading ? (
//         <p className="text-center mt-4">Loading rides...</p>
//       ) : activeRides.length === 0 ? (
//         <p className="text-center mt-4">No active rides.</p>
//       ) : (
//         activeRides.map(renderRideCard)
//       )}

//       {/* Map */}
//       <h2 className="text-lg font-semibold">Live Map</h2>
//       {userCoords && driverCoords ? (
//         <div className="w-full h-[500px]">
//           <MapContainer center={userCoords} zoom={14} style={{ height: "100%", width: "100%" }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <RecenterMap coords={userCoords} />
//             <Marker position={userCoords}><Popup>You are here</Popup></Marker>
//             <Marker position={driverCoords}><Popup>Driver is here</Popup></Marker>
//           </MapContainer>
//         </div>
//       ) : <p>Loading map...</p>}
//     </div>
//   );
// }


import React, { useEffect, useState, lazy, Suspense } from "react";
import { toast } from "sonner";
import {
  useGetActiveRidesQuery,
  useGetRequestedRidesQuery,
  useGetDriverProfileQuery,
  useUpdateOnlineStatusMutation,
  useUpdateLocationMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  usePickUpRideMutation,
  useMarkInTransitMutation,
  useCompleteRideMutation,
  useUpdateRidingStatusMutation,
  useCancelRideMutation,
} from "@/redux/features/driverApi/driverApi";
import { useMap } from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load components
const MapComponent = lazy(() => import("../MapComponent"));
const SOSButton = lazy(() => import("../SOSButton"));

// Auto-center map on coords change
function RecenterMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom(), { animate: true });
  }, [coords, map]);
  return null;
}

export default function ActiveRides() {
  const { data: driverProfile, refetch } = useGetDriverProfileQuery({});
  const { data: activeRidesData, isLoading: activeLoading } = useGetActiveRidesQuery({});
  const { data: requestedRidesData, isLoading: requestedLoading } = useGetRequestedRidesQuery({});

  const [updateOnlineStatus] = useUpdateOnlineStatusMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [updateRidingStatus] = useUpdateRidingStatusMutation();
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();
  const [pickUpRide] = usePickUpRideMutation();
  const [markInTransit] = useMarkInTransitMutation();
  const [completeRide] = useCompleteRideMutation();
  const [cancelRide] = useCancelRideMutation();

  const [driverCoords, setDriverCoords] = useState<[number, number] | null>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  const activeRides = activeRidesData?.data || [];
  const requestedRides = requestedRidesData?.data || [];

  // Track driver location
  useEffect(() => {
    if (!driverProfile?.data?._id || driverProfile?.data?.onlineStatus !== "Active") return;
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setDriverCoords([latitude, longitude]);
        try {
          await updateLocation({ driverId: driverProfile.data._id, coordinates: [longitude, latitude] }).unwrap();
        } catch (err) { console.error(err); }
      },
      console.error,
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [driverProfile, updateLocation]);

  // Get user location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
      console.error,
      { enableHighAccuracy: true }
    );
  }, []);

  const handleToggleStatus = async () => {
    const driverId = driverProfile?.data?._id;
    if (!driverId) return toast.error("Driver ID not available");
    const newStatus = driverProfile?.data?.onlineStatus === "Active" ? "Offline" : "Active";
    try {
      toast.loading("Updating status...");
      await updateOnlineStatus({ driverId, onlineStatus: newStatus }).unwrap();
      await refetch();
      toast.dismiss();
      toast.success(`You are now ${newStatus}`);
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to update status");
      console.error(err);
    }
  };

 const nextActions: Record<string, { label: string; status: string }[]> = {
  REQUESTED: [{ label: "Accept", status: "ACCEPTED" }, { label: "Reject", status: "REJECTED" }],
  ACCEPTED: [{ label: "Picked Up", status: "PICKED_UP" }, { label: "Cancel", status: "CANCELLED" }],
  PICKED_UP: [{ label: "In Transit", status: "IN_TRANSIT" }, { label: "Cancel", status: "CANCELLED" }],
  IN_TRANSIT: [{ label: "Complete", status: "COMPLETED" }, { label: "Cancel", status: "CANCELLED" }],
};


  const handleRideAction = async (rideId: string, actionStatus: string, label: string) => {
  try {
    toast.loading(`${label}...`);
    switch (actionStatus) {
      case "ACCEPTED": await acceptRide(rideId).unwrap(); break;
      case "REJECTED": await rejectRide(rideId).unwrap(); break;
      case "PICKED_UP": await pickUpRide(rideId).unwrap(); break;
      case "IN_TRANSIT": await markInTransit(rideId).unwrap(); break;
      case "COMPLETED": await completeRide(rideId).unwrap(); break;
      case "CANCELLED": await cancelRide(rideId).unwrap();
    }
    await refetch();
    toast.dismiss();
    toast.success(`${label} successful`);
  } catch (err) {
    toast.dismiss();
    toast.error(`Failed to ${label}`);
    console.error(err);
  }
};


  const ridingStatusOptions: ('idle' | 'waiting_for_pickup' | 'in_transit' | 'unavailable')[] = ["idle","waiting_for_pickup","in_transit","unavailable"];

  const renderRideCard = (ride: any) => {
    const actions = nextActions[ride.rideStatus] || [];
    return (
      <Card key={ride._id} className="mb-4">
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span><strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}</span>
            <Badge variant={ride.rideStatus === "IN_TRANSIT" ? "secondary" : "default"}>{ride.rideStatus}</Badge>
          </div>
          <div><strong>Destination:</strong> {ride.destination?.address || "N/A"}</div>
          <div><strong>Fare:</strong> ${ride.fare || 0}</div>
          <div><strong>Riding Status:</strong> {ride.driver?.ridingStatus || "idle"}</div>

          <div className="flex flex-wrap gap-2 mt-2">
            {actions.map(action => (
              <Button key={action.status} variant="outline" size="sm" onClick={() => handleRideAction(ride._id, action.status, action.label)}>
                {action.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {ridingStatusOptions.map(status => (
              <Button key={status} size="sm" variant={status === "idle" ? "destructive" : "default"}
                onClick={async () => {
                  try {
                    if (!driverProfile?.data?._id) return toast.error("Driver ID missing");
                    await updateRidingStatus({ driverId: driverProfile.data._id, ridingStatus: status }).unwrap();
                    await refetch();
                    toast.success(`Riding status updated to ${status}`);
                  } catch (err) {
                    toast.error("Failed to update riding status");
                    console.error(err);
                  }
                }}
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-4">
      {/* Online status */}
      <Card>
        <CardContent className="flex justify-between items-center">
          <div>
            <strong>Status:</strong>{" "}
            <span className={driverProfile?.data?.onlineStatus === "Active" ? "text-green-600" : "text-red-600"}>
              {driverProfile?.data?.onlineStatus || "Offline"}
            </span>
          </div>
          <Button onClick={handleToggleStatus}>{driverProfile?.data?.onlineStatus === "Active" ? "Go Offline" : "Go Online"}</Button>
        </CardContent>
      </Card>

      {/* Requested Rides */}
      <h2 className="text-lg font-semibold">Requested Rides</h2>
      {requestedLoading ? <p><LoadingSpinner/></p> : requestedRides.length === 0 ? <p>No requested rides.</p> : requestedRides.map(renderRideCard)}

      {/* Active Rides */}
      <h2 className="text-lg font-semibold">Active Rides</h2>
      {activeLoading ? <p><LoadingSpinner/></p> : activeRides.length === 0 ? <p>No active rides.</p> : activeRides.map(renderRideCard)}

      

      {/* Live Map */}
      <h2 className="text-lg font-semibold">Live Map</h2>
      {userCoords && driverCoords && (
        <div className="w-full h-[500px] z-0 ">
          <Suspense fallback={<p>Loading map...</p>}>
            <MapComponent userCoords={userCoords} driverCoords={driverCoords} />
          </Suspense>
          {/* SOS Button - fixed */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 z-100 md:top-6 md:right-6 lg:top-8 lg:right-8">
          <SOSButton />
        </div>
      </Suspense>
        </div>
        
      )}
      
    </div>
  );
}
