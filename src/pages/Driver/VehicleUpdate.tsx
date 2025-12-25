/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetMeQuery } from "@/redux/features/userProfileApi/userApi";
import { useUpdateDriverProfileMutation } from "@/redux/features/driverApi/driverApi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function VehicleUpdate() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [updateDriverProfile, { isLoading: updating }] = useUpdateDriverProfileMutation();

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Bike");

  useEffect(() => {
    if (data?.data?.vehicle) {
      setVehicleNumber(data.data.vehicle.vehicleNumber || "");
      setVehicleType(data.data.vehicle.vehicleType || "Bike");
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleNumber.trim()) {
      toast.error("Vehicle number is required");
      return;
    }

    try {
      const payload = {
        vehicle: {
          vehicleNumber: vehicleNumber.trim(),
          vehicleType,
        },
      };

      await updateDriverProfile(payload).unwrap();
      toast.success("Vehicle info updated successfully!");
    } catch (err: any) {
      const message = err?.data?.message || err?.error || "Failed to update vehicle info";
      toast.error(message);
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-6">
        <LoadingSpinner />
      </p>
    );
  return (
    <Card className="container  mx-auto mt-6 shadow-md">
      <CardContent>
        <h2 className="text-xl font-bold mb-4 text-center">Vehicle Information</h2>

        <div className="text-sm text-muted-foreground mb-4">Keep your vehicle details current so riders know what to expect.</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vehicle Number */}
          <div>
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input
              id="vehicleNumber"
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Enter vehicle number"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <div className="flex gap-2">
              <Button type="button" variant={vehicleType === 'Bike' ? 'secondary' : 'ghost'} onClick={() => setVehicleType('Bike')}>Bike</Button>
              <Button type="button" variant={vehicleType === 'Car' ? 'secondary' : 'ghost'} onClick={() => setVehicleType('Car')}>Car</Button>
            </div>
          </div>

          <Button type="submit" disabled={updating} className="w-full">
            {updating ? "Updating..." : "Update Vehicle Info"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
