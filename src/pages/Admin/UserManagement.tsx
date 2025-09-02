/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/admin/UserManagement.tsx

import { useApproveDriverMutation, useBlockUnblockUserMutation, useGetAllUsersQuery, useSuspendDriverMutation } from "@/redux/features/adminApi/adminApi";
import { useState } from "react";
import { toast } from "sonner";


const UserManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const params: Record<string, any> = {
    page: 1,
    limit: 20,
  };

  if (search) params.searchTerm = search;
  if (roleFilter) params.role = roleFilter;
  if (statusFilter) params.status = statusFilter;

  const { data, isLoading, refetch } = useGetAllUsersQuery(params);
console.log(data)

  const [blockUnblockUser] = useBlockUnblockUserMutation();
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();



const handleBlockToggle = async (id: string, status: string) => {
  try {
    const newStatus = status === "BLOCKED" ? "UNBLOCKED" : "BLOCKED"; 
    await blockUnblockUser({ id, status: newStatus }).unwrap();
    toast.success(`User ${newStatus} successfully`);
    refetch();
  } catch (err) {
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
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 flex-1 min-w-[200px]"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Roles</option>
          <option value="RIDER">Rider</option>
          <option value="DRIVER">Driver</option>
          <option value="ADMIN">Admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Status</option>
          <option value="UNBLOCKED">Unblocked</option>
          <option value="BLOCKED">Blocked</option>
          <option value="Suspended">Suspended</option>
          <option value="Approved">Approved</option>
        </select>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Filter
        </button>
      </div>

      {/* User Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user : any) => (
              <tr key={user._id}>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.role}</td>
                <td className="border px-2 py-1">{user.status}</td>
                <td className="border px-2 py-1 flex gap-1 flex-wrap">
                  {/* Block/Unblock Rider */}
                  {user.role === "RIDER" && (
                    <button
                      onClick={() => handleBlockToggle(user._id, user.status)}
                      className={`px-2 py-1 rounded text-white ${
                        user.status === "BLOCKED" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.status === "BLOCKED" ? "UNBLOCKED" : "BLOCKED"}
                    </button>
                  )}

                  {/* Approve/Suspend Driver */}
                  {user.role === "DRIVER" && (
                    <>
                      {user.status !== "Approved" && (
                        <button
                          onClick={() => handleApproveDriver(user.driverId)}
                          className="px-2 py-1 bg-blue-600 text-white rounded"
                        >
                          Approve
                        </button>
                      )}
                      {user.status !== "Suspended" && (
                        <button
                          onClick={() => handleSuspendDriver(user.driverId)}
                          className="px-2 py-1 bg-red-600 text-white rounded"
                        >
                          Suspend
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;


