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
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const handleApproveDriver = async (driverId: string) => {
    try {
      await approveDriver(driverId).unwrap();
      toast.success("Driver approved successfully");
      refetch();
    } catch {
      toast.error("Failed to approve driver");
    }
  };

  const handleSuspendDriver = async (driverId: string) => {
    try {
      await suspendDriver(driverId).unwrap();
      toast.success("Driver suspended successfully");
      refetch();
    } catch {
      toast.error("Failed to suspend driver");
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
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
                        driver.driverStatus === "Suspended" ? "destructive" :
                        driver.driverStatus === "Pending" ? "secondary" :
                        "default"
                      }>
                        {driver.driverStatus || "N/A"}
                      </Badge>
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
                      {/* Pending → Approve/Suspend */}
                      {driver.driverStatus === "Pending" && driver.driverId && (
                        <>
                          <Button size="sm" variant="default" onClick={() => handleApproveDriver(driver.driverId)}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(driver.driverId)}>Suspend</Button>
                        </>
                      )}

                      {/* Approved → Suspend */}
                      {driver.driverStatus === "Approved" && driver.driverId && (
                        <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(driver.driverId)}>Suspend</Button>
                      )}

                      {/* Suspended → Approve */}
                      {driver.driverStatus === "Suspended" && driver.driverId && (
                        <Button size="sm" variant="default" onClick={() => handleApproveDriver(driver.driverId)}>Approve</Button>
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
