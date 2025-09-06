


/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  useApproveDriverMutation,
  useBlockUnblockUserMutation,
  useGetAllUsersQuery,
  useSuspendDriverMutation,
} from "@/redux/features/adminApi/adminApi";
import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const UserManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const params: Record<string, any> = { page: 1, limit: 20 };
  if (search) params.searchTerm = search;
  if (roleFilter !== "all") params.role = roleFilter;
  if (statusFilter !== "all") params.status = statusFilter;

  const { data, isLoading, refetch } = useGetAllUsersQuery(params);

  const [blockUnblockUser] = useBlockUnblockUserMutation();
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const handleBlockToggle = async (id: string, status: string) => {
    try {
      const newStatus = status === "BLOCKED" ? "UNBLOCKED" : "BLOCKED";
      await blockUnblockUser({ id, status: newStatus }).unwrap();
      toast.success(`User ${newStatus} successfully`);
      refetch();
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const handleApproveDriver = async (driverId: string) => {
    try {
      await approveDriver(driverId);
      toast.success("Driver approved successfully");
      refetch();
    } catch {
      toast.error("Failed to approve driver");
    }
  };

  const handleSuspendDriver = async (driverId: string) => {
    try {
      await suspendDriver(driverId);
      toast.success("Driver suspended successfully");
      refetch();
    } catch {
      toast.error("Failed to suspend driver");
    }
  };

  return (
    <Card className="p-6">
      <CardContent>
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px]"
          />

          <Select onValueChange={setRoleFilter} value={roleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="RIDER">Rider</SelectItem>
              <SelectItem value="DRIVER">Driver</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="UNBLOCKED">Unblocked</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => refetch()} className="bg-blue-600 text-white">
            Filter
          </Button>
        </div>

        {/* User Table */}
        {isLoading ? (
          <div className="flex justify-center"><LoadingSpinner /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((user: any) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      <Badge variant={user.status === "BLOCKED" ? "destructive" : "secondary"}>
                        {user.status}
                      </Badge>
                    </td>
                    {/* <td className="border px-4 py-2 flex flex-wrap gap-2">
                      {user.role === "RIDER" && (
                        <Button
                          size="sm"
                          variant={user.status === "BLOCKED" ? "secondary" : "destructive"}
                          onClick={() => handleBlockToggle(user._id, user.status)}
                        >
                          {user.status === "BLOCKED" ? "UNBLOCK" : "BLOCK"}
                        </Button>

                      )}
                    
                    

                      {user.role === "DRIVER" && (
                        <>
                          {user.status !== "Approved" && (
                            <Button size="sm" variant="default" onClick={() => handleApproveDriver(user.driverId)}>
                              Approve
                            </Button>
                          )}
                          {user.status !== "Suspended" && (
                            <Button size="sm" variant="destructive" onClick={() => handleSuspendDriver(user.driverId)}>
                              Suspend
                            </Button>
                          )}
                        </>
                      )}
                    </td> */}


                    <td className="border px-4 py-2 flex flex-wrap gap-2">
  {/* Block/Unblock for Riders */}
  {user.role === "RIDER" && (
    <Button
      size="sm"
      variant={user.status === "BLOCKED" ? "secondary" : "destructive"}
      onClick={() => handleBlockToggle(user._id, user.status)}
    >
      {user.status === "BLOCKED" ? "UNBLOCK" : "BLOCK"}
    </Button>
  )}

  {/* Approve Rider → Driver application */}
  {user.driverStatus === "Pending" && user.driverId && (
    <Button
      size="sm"
      variant="default"
      onClick={() => handleApproveDriver(user.driverId)}
    >
      Approve
    </Button>
  )}

  {/* DRIVER actions */}
  {user.role === "DRIVER" && (
    <>
      {user.status !== "Approved" && (
        <Button
          size="sm"
          variant="default"
          onClick={() => handleApproveDriver(user.driverId)}
        >
          Approve
        </Button>
      )}
      {user.status !== "Suspended" && (
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleSuspendDriver(user.driverId)}
        >
          Suspend
        </Button>
      )}
    </>
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

export default UserManagement;
