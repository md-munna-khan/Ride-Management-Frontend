/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Earnings.tsx

import { useGetDriverEarningsQuery } from "@/redux/features/driverApi/driverApi";
import { Card, CardContent } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import LoadingSpinner from "@/components/LoadingSpinner";

const Earnings = () => {
  const { data, isLoading } = useGetDriverEarningsQuery({});
  console.log(data)


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
       <LoadingSpinner label="Loading earnings..."/>
      </div>
    );
  }

  const rides = data?.data?.rides || [];
  const totalEarnings = data?.data?.totalEarnings || 0;
  const rideCount = data?.data?.rideCount || 0;

  // ✅ Group rides by Day, Week, Month
  const dailyData = rides.reduce((acc: any[], ride: any) => {
    const date = new Date(ride.timestamps?.completedAt).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.earning += ride.fare;
    } else {
      acc.push({ date, earning: ride.fare });
    }
    return acc;
  }, []);

  const weeklyData = rides.reduce((acc: any[], ride: any) => {
    const week = getWeek(new Date(ride.timestamps?.completedAt));
    const existing = acc.find((d) => d.week === week);
    if (existing) {
      existing.earning += ride.fare;
    } else {
      acc.push({ week, earning: ride.fare });
    }
    return acc;
  }, []);

  const monthlyData = rides.reduce((acc: any[], ride: any) => {
    const month = new Date(ride.timestamps?.completedAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const existing = acc.find((d) => d.month === month);
    if (existing) {
      existing.earning += ride.fare;
    } else {
      acc.push({ month, earning: ride.fare });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 space-y-6 container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Earnings Dashboard</h1>
        <div className="text-sm">Summary of your completed rides and earnings</div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md p-4 rounded-2xl">
          <CardContent>
            <h2 className="text-sm">Total Earnings</h2>
            <p className="text-2xl font-bold text-green-600">${Number(totalEarnings || 0).toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4 rounded-2xl">
          <CardContent>
            <h2 className="text-sm">Total Rides</h2>
            <p className="text-2xl font-bold text-blue-600">{rideCount}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4 rounded-2xl">
          <CardContent>
            <h2 className="text-sm">Avg per Ride</h2>
            <p className="text-2xl font-bold text-indigo-600">${rideCount ? (Number(totalEarnings || 0) / rideCount).toFixed(2) : '0.00'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Chart */}
      <Card className="shadow-md p-4 rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Daily Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earning" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card className="shadow-md p-4 rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Weekly Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earning" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Chart */}
      <Card className="shadow-md p-4 rounded-2xl">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earning" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper: Get Week Number
function getWeek(date: Date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date.valueOf() - firstDay.valueOf()) / 86400000;
  return `W${Math.ceil((pastDays + firstDay.getDay() + 1) / 7)}`;
}

export default Earnings;
