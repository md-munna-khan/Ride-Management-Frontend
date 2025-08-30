

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import {
//   useAcceptRideMutation,
//   useRejectRideMutation,
//   useUpdateRidingStatusMutation,
//   useCompleteRideMutation,
 
//   useUpdateOnlineStatusMutation,
//   useGetDriverProfileQuery,
//   useUpdateLocationMutation,
//   useGetRequestedRidesQuery,
 
// } from "@/redux/features/driverApi/driverApi";
// import { toast } from "sonner";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";


// // Fix default marker icon
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
//   // ===== Hooks =====
//   const { data: driverProfile, refetch } = useGetDriverProfileQuery({});
//   const [updateOnlineStatus] = useUpdateOnlineStatusMutation();
//   const [updateDriverLocation] = useUpdateLocationMutation();
//   const [acceptRide] = useAcceptRideMutation();
//   const [rejectRide] = useRejectRideMutation();
//   const [updateRidingStatus] = useUpdateRidingStatusMutation();
//   const [completeRide] = useCompleteRideMutation();
//   // const { data, isLoading } = useGetDriverRidesQuery({
//   //   status: "REQUESTED",
//   //   page: 1,
//   //   limit: 10,
//   // });
//   const { data, isLoading } = useGetRequestedRidesQuery({
//     status: "REQUESTED",
//     page: 1,
//     limit: 10,
//   });


//   const [driverCoords, setDriverCoords] = useState<[number, number] | null>(null);
//   const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

//   // ===== Track driver live location =====
//   useEffect(() => {
//     if (!driverProfile?.data?._id || driverProfile?.data?.onlineStatus !== "Active") return;

//     const watchId = navigator.geolocation.watchPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setDriverCoords([latitude, longitude]);

//         try {
//           await updateDriverLocation({
//             driverId: driverProfile.data._id,
//             coordinates: [longitude, latitude],
//           }).unwrap();
//         } catch (err) {
//           console.error("Failed to update driver location", err);
//         }
//       },
//       console.error,
//       { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, [driverProfile, updateDriverLocation]);

//   // ===== Get user's location =====
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
//         (err) => console.error(err),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   // ===== Toggle online/offline =====
//   const handleToggleAvailability = async () => {
//     const driverId = driverProfile?.data?._id;
//     if (!driverId) return toast.error("Driver ID not available");

//     const newStatus =
//       driverProfile?.data?.onlineStatus === "Active" ? "Offline" : "Active";

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

//   // ===== Ride actions mapping =====
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

//   const rides = data?.data || [];

//   return (
//     <div className="space-y-6">
//       {/* Availability Toggle */}
//       <div className="flex items-center justify-between p-4 border rounded shadow">
//         <p>
//           <strong>Status:</strong>{" "}
//           <span
//             className={`${
//               driverProfile?.data?.onlineStatus === "Active"
//                 ? "text-green-600"
//                 : "text-red-600"
//             }`}
//           >
//             {driverProfile?.data?.onlineStatus || "Offline"}
//           </span>
//         </p>
//         <button
//           onClick={handleToggleAvailability}
//           className="px-4 py-2 bg-indigo-600 text-white rounded"
//         >
//           {driverProfile?.data?.onlineStatus === "Active" ? "Go Offline" : "Go Online"}
//         </button>
//       </div>

//       {/* Incoming Rides */}
//       <h2 className="text-lg font-semibold">Incoming Ride Requests</h2>
//       {isLoading ? (
//         <p className="text-center mt-4">Loading rides...</p>
//       ) : rides.length === 0 ? (
//         <p className="text-center mt-4">No rides available.</p>
//       ) : (
//         <div className="space-y-4">
//           {rides.map((ride: any) => {
//             const actions = nextActions[ride.rideStatus] || [];

//             return (
//               <div key={ride._id} className="p-4 border rounded shadow">
//                 <p>
//                   <strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Destination:</strong> {ride.destination?.address || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Fare:</strong> ${ride.fare || 0}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {ride.rideStatus}
//                 </p>

//                 <div className="flex gap-2 mt-2">
//                   {actions.map((action) => {
//                     const handleClick = async () => {
//                       try {
//                         toast.loading(`${action.label} in progress...`);

//                         switch (action.status) {
//                           case "ACCEPTED":
//                             await acceptRide(ride._id).unwrap();
//                             break;
//                           case "REJECTED":
//                             await rejectRide(ride._id).unwrap();
//                             break;
//                           case "PICKED_UP":
//                           case "IN_TRANSIT":
//                           case "CANCELLED":
//                             await updateRidingStatus({
//                               rideId: ride._id,
//                               status: action.status,
//                             }).unwrap();
//                             break;
//                           case "COMPLETED":
//                             await completeRide(ride._id).unwrap();
//                             break;
//                         }

//                         await refetch();
//                         toast.dismiss();
//                         toast.success(`${action.label} successful`);
//                       } catch (err) {
//                         toast.dismiss();
//                         toast.error(`Failed to ${action.label}`);
//                         console.error(err);
//                       }
//                     };

//                     let bgColor = "bg-blue-500";
//                     if (action.status === "REJECTED" || action.status === "CANCELLED") bgColor = "bg-red-500";
//                     if (action.status === "COMPLETED") bgColor = "bg-green-700";
//                     if (action.status === "IN_TRANSIT") bgColor = "bg-indigo-500";
//                     if (action.status === "PICKED_UP") bgColor = "bg-teal-500";

//                     return (
//                       <button
//                         key={action.status}
//                         onClick={handleClick}
//                         className={`px-3 py-1 text-white rounded ${bgColor}`}
//                       >
//                         {action.label}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Map */}
//       <h2 className="text-lg font-semibold">Live Map</h2>
//       {userCoords && driverCoords ? (
//         <div className="w-full h-[500px]">
//           <MapContainer center={userCoords} zoom={14} style={{ height: "100%", width: "100%" }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <RecenterMap coords={userCoords} />
//             <Marker position={userCoords}>
//               <Popup>You are here</Popup>
//             </Marker>
//             <Marker position={driverCoords}>
//               <Popup>Driver is here</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       ) : (
//         <p>Loading map...</p>
//       )}
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRidingStatusMutation,
  useCompleteRideMutation,
  useUpdateOnlineStatusMutation,
  useGetDriverProfileQuery,
  useUpdateLocationMutation,
  useGetRequestedRidesQuery,
} from "@/redux/features/driverApi/driverApi";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Auto-center map
function RecenterMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom(), { animate: true });
  }, [coords, map]);
  return null;
}

export default function ActiveRides() {
  // ===== Queries & Mutations =====
  const { data: driverProfile, refetch } = useGetDriverProfileQuery({});
  const [updateOnlineStatus] = useUpdateOnlineStatusMutation();
  const [updateDriverLocation] = useUpdateLocationMutation();
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();
  const [updateRidingStatus] = useUpdateRidingStatusMutation();
  const [completeRide] = useCompleteRideMutation();
  const { data: rideData, isLoading } = useGetRequestedRidesQuery({
    status: "REQUESTED",
    page: 1,
    limit: 10,
  });

  // ===== State =====
  const [driverCoords, setDriverCoords] = useState<[number, number] | null>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  const rides = rideData?.data || [];

  // ===== Track Driver Live Location =====
  useEffect(() => {
    if (!driverProfile?.data?._id || driverProfile?.data?.onlineStatus !== "Active") return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setDriverCoords([latitude, longitude]);

        try {
          await updateDriverLocation({
            driverId: driverProfile.data._id,
            coordinates: [longitude, latitude],
          }).unwrap();
        } catch (err) {
          console.error("Failed to update driver location", err);
        }
      },
      console.error,
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [driverProfile, updateDriverLocation]);

  // ===== Get User Location =====
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
      console.error,
      { enableHighAccuracy: true }
    );
  }, []);

  // ===== Toggle Online / Offline =====
  const handleToggleAvailability = async () => {
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

  // ===== Ride Actions Mapping =====
  const nextActions: Record<string, { label: string; status: string }[]> = {
    REQUESTED: [
      { label: "Accept", status: "ACCEPTED" },
      { label: "Reject", status: "REJECTED" },
    ],
    ACCEPTED: [
      { label: "Picked Up", status: "PICKED_UP" },
      { label: "Cancel", status: "CANCELLED" },
    ],
    PICKED_UP: [
      { label: "In Transit", status: "IN_TRANSIT" },
      { label: "Cancel", status: "CANCELLED" },
    ],
    IN_TRANSIT: [
      { label: "Complete", status: "COMPLETED" },
      { label: "Cancel", status: "CANCELLED" },
    ],
  };

  // ===== Handle Ride Action =====
  const handleRideAction = async (rideId: string, actionStatus: string, actionLabel: string) => {
    try {
      toast.loading(`${actionLabel} in progress...`);
      switch (actionStatus) {
        case "ACCEPTED":
          await acceptRide(rideId).unwrap();
          break;
        case "REJECTED":
          await rejectRide(rideId).unwrap();
          break;
        case "PICKED_UP":
        case "IN_TRANSIT":
        case "CANCELLED":
          await updateRidingStatus({ rideId, status: actionStatus }).unwrap();
          break;
        case "COMPLETED":
          await completeRide(rideId).unwrap();
          break;
      }
      await refetch();
      toast.dismiss();
      toast.success(`${actionLabel} successful`);
    } catch (err) {
      toast.dismiss();
      toast.error(`Failed to ${actionLabel}`);
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Online Status Toggle */}
      <div className="flex items-center justify-between p-4 border rounded shadow">
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`${
              driverProfile?.data?.onlineStatus === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {driverProfile?.data?.onlineStatus || "Offline"}
          </span>
        </p>
        <button
          onClick={handleToggleAvailability}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {driverProfile?.data?.onlineStatus === "Active" ? "Go Offline" : "Go Online"}
        </button>
      </div>

      {/* Ride Requests */}
      <h2 className="text-lg font-semibold">Incoming Ride Requests</h2>
      {isLoading ? (
        <p className="text-center mt-4">Loading rides...</p>
      ) : rides.length === 0 ? (
        <p className="text-center mt-4">No rides available.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride: any) => {
            const actions = nextActions[ride.rideStatus] || [];
            return (
              <div key={ride._id} className="p-4 border rounded shadow">
                <p>
                  <strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}
                </p>
                <p>
                  <strong>Destination:</strong> {ride.destination?.address || "N/A"}
                </p>
                <p>
                  <strong>Fare:</strong> ${ride.fare || 0}
                </p>
                <p>
                  <strong>Status:</strong> {ride.rideStatus}
                </p>

                <div className="flex gap-2 mt-2">
                  {actions.map((action) => {
                    let bgColor = "bg-blue-500";
                    if (action.status === "REJECTED" || action.status === "CANCELLED") bgColor = "bg-red-500";
                    if (action.status === "COMPLETED") bgColor = "bg-green-700";
                    if (action.status === "IN_TRANSIT") bgColor = "bg-indigo-500";
                    if (action.status === "PICKED_UP") bgColor = "bg-teal-500";

                    return (
                      <button
                        key={action.status}
                        onClick={() => handleRideAction(ride._id, action.status, action.label)}
                        className={`px-3 py-1 text-white rounded ${bgColor}`}
                      >
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Live Map */}
      <h2 className="text-lg font-semibold">Live Map</h2>
      {userCoords && driverCoords ? (
        <div className="w-full h-[500px]">
          <MapContainer center={userCoords} zoom={14} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RecenterMap coords={userCoords} />
            <Marker position={userCoords}>
              <Popup>You are here</Popup>
            </Marker>
            <Marker position={driverCoords}>
              <Popup>Driver is here</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}
