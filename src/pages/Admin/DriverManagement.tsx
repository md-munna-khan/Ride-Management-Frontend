/* eslint-disable @typescript-eslint/no-explicit-any */
/* DriverManagement.tsx */
import React, { useState } from "react";
import { toast } from "sonner";
import { useApproveDriverMutation, useGetAllUsersQuery, useSuspendDriverMutation } from "@/redux/features/adminApi/adminApi";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";

const DriverManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const params: Record<string, any> = { page: 1, limit: 20, role: "DRIVER" };
  if (search) params.searchTerm = search;
  if (statusFilter !== "all") params.driverStatus = statusFilter;

  const { data, isLoading, refetch } = useGetAllUsersQuery(params);
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

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Input placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 min-w-[200px]" />
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => refetch()} className="bg-blue-600 text-white">Filter</Button>
        </div>

        {/* Table */} 
        {isLoading ? (
          <div className="flex justify-center"><LoadingSpinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
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
                    <td className="border px-4 py-2">{driver?.name}</td>
                    <td className="border px-4 py-2">{driver?.email}</td>
                    <td className="border px-4 py-2">
                      <Badge variant={
                        driver.driverStatus === "SUSPENDED" ? "destructive" :
                        driver.driverStatus === "PENDING" ? "secondary" :
                        "default"
                      }>
                        {driver.driverStatus || "N/A"}
                      </Badge>
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
                      {/* Pending → Approve/Suspend */}
                      {driver.driverStatus === "PENDING" && driver.driverId && (
                        <>
                          <Button size="sm" variant="default" onClick={() => handleApproveDriver(driver.driverId)} disabled={actionLoadingId === driver.driverId}>
                            {actionLoadingId === driver.driverId ? "Working..." : "Approve"}
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(driver.driverId)} disabled={actionLoadingId === driver.driverId}>
                            {actionLoadingId === driver.driverId ? "Working..." : "Suspend"}
                          </Button>
                        </>
                      )}

                      {/* Approved → Suspend */}
                      {driver.driverStatus === "APPROVED" && driver.driverId && (
                        <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(driver.driverId)} disabled={actionLoadingId === driver.driverId}>
                          {actionLoadingId === driver.driverId ? "Working..." : "Suspend"}
                        </Button>
                      )}

                      {/* Suspended → Approve */}
                      {driver.driverStatus === "SUSPENDED" && driver.driverId && (
                        <Button size="sm" variant="default" onClick={() => handleApproveDriver(driver.driverId)} disabled={actionLoadingId === driver.driverId}>
                          {actionLoadingId === driver.driverId ? "Working..." : "Approve"}
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
