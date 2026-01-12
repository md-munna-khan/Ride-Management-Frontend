

/* eslint-disable @typescript-eslint/no-explicit-any */
/* DriverManagement.tsx */
import React, { useState } from "react";
import { toast } from "sonner";
import { useApproveDriverMutation, useGetAllDriversQuery, useSuspendDriverMutation } from "@/redux/features/adminApi/adminApi";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";

const DriverManagement: React.FC = () => {
 
  const { data, isLoading, refetch } = useGetAllDriversQuery(undefined);

  console.log(data)
  console.log(data)
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const handleApproveDriver = async (driverId: string) => {
    setActionLoadingId(driverId);
    try {
      await approveDriver(driverId).unwrap();
      toast.success("Driver approved successfully");
      refetch();
    } catch (err: any) {
      const message = err?.data?.message || err?.error || err?.message || "Failed to approve driver";
      toast.error(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSuspendDriver = async (driverId: string) => {
    setActionLoadingId(driverId);
    try {
      await suspendDriver(driverId).unwrap();
      toast.success("Driver suspended successfully");
      refetch();
    } catch (err: any) {
      const message = err?.data?.message || err?.error || err?.message || "Failed to suspend driver";
      toast.error(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <Card className="p-6">
      <CardContent>
        <h1 className="text-2xl font-bold mb-6">Driver Management</h1>

        

        {/* Table */} 
        {isLoading ? (
          <div className="flex justify-center"><LoadingSpinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="">
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Driver Status</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((driver: any) => (
                  <tr key={driver._id}>
                    <td className="border px-4 py-2">{driver?.userId?.name}</td>
                    <td className="border px-4 py-2">{driver?.userId?.email}</td>
                    <td className="border px-4 py-2">
                      <Badge variant={
                        driver.status === "SUSPENDED" ? "destructive" :
                        driver.status === "PENDING" ? "secondary" :
                        "default"
                      }>
                        {driver.status || "N/A"}
                      </Badge>
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
                      {/* Pending → Approve/Suspend */}
                      {driver.status === "PENDING" && (
                        <>
                          <Button size="sm" variant="default" onClick={() => handleApproveDriver(driver._id)} disabled={actionLoadingId === driver._id}>
                            {actionLoadingId === driver._id ? "Working..." : "Approve"}
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(driver._id)} disabled={actionLoadingId === driver._id}>
                            {actionLoadingId === driver._id ? "Working..." : "Suspend"}
                          </Button>
                        </>
                      )}

                      {/* Approved → Suspend */}
                      {driver.status === "APPROVED" && (
                        <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(driver._id)} disabled={actionLoadingId === driver._id}>
                          {actionLoadingId === driver._id ? "Working..." : "Suspend"}
                        </Button>
                      )}

                      {/* Suspended → Approve */}
                      {driver.status === "SUSPENDED" && (
                        <Button size="sm" variant="default" onClick={() => handleApproveDriver(driver._id)} disabled={actionLoadingId === driver._id}>
                          {actionLoadingId === driver._id ? "Working..." : "Approve"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverManagement;

