/* eslint-disable @typescript-eslint/no-explicit-any */


import React from "react";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Earnings() {
  const { data, isLoading } = useGetEarningsQuery(undefined);

  if (isLoading) return <p>Loading earnings...</p>;

  // Example: Convert server earnings data to chart format
  const chartData = data?.dailyEarnings?.map((item: any) => ({
    date: new Date(item.date).toLocaleDateString(),
    earnings: item.amount,
  }));

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Earnings Dashboard</h2>
      <p className="mb-2">Total Earnings: ${data?.total || 0}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
