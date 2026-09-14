import { statsData, recentActivity, revenueData } from "../data/mockData";
import { useApp } from "../hooks/useApp";
import StatsCard from "../components/dashboard/StatsCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import RevenueChart from "../components/dashboard/RevenueChart";
import UserProfileCard from "../components/dashboard/UserProfileCard";

export default function Dashboard() {
  const { orders, users } = useApp();

  const dynamicStats = statsData.map((stat) => {
    if (stat.id === 2) {
      return { ...stat, value: (24510 + users.length).toLocaleString() };
    }
    if (stat.id === 3) {
      return { ...stat, value: orders.length.toString() };
    }
    return stat;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Welcome back, Admin! Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dynamicStats.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Revenue Chart – full width */}
      <RevenueChart data={revenueData} />

      {/* Bottom grid: orders + activity + profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders spans 2 cols */}
        <div className="lg:col-span-2">
          <RecentOrders orders={orders.slice(0, 5)} />
        </div>

        {/* Activity feed */}
        <ActivityFeed activities={recentActivity} />
      </div>

      {/* User Profile + quick insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserProfileCard />

        {/* Quick Stats panel */}
        <div className="lg:col-span-2 card p-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Insights</h2>
          <div className="space-y-4">
            {[
              { label: "Order Completion Rate", value: 87, color: "bg-violet-500" },
              { label: "Customer Satisfaction",  value: 94, color: "bg-emerald-500" },
              { label: "Revenue Goal Progress",  value: 73, color: "bg-blue-500" },
              { label: "Support Ticket Resolution", value: 62, color: "bg-amber-500" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{value}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
