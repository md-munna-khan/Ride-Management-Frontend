/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LoadingSpinner from "@/components/LoadingSpinner";

// Leaflet default icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  userCoords: [number, number] | null;
  driverCoords: [number, number] | null;
}

const MapComponent: React.FC<MapProps> = ({ userCoords, driverCoords }) => {
  if (!userCoords) return <p><LoadingSpinner/></p>;

  return (
    <MapContainer
      center={userCoords}
      zoom={14}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {userCoords && <Marker position={userCoords}><Popup>You are here</Popup></Marker>}
      {driverCoords && <Marker position={driverCoords}><Popup>Driver</Popup></Marker>}
    </MapContainer>
  );
};

export default MapComponent;
