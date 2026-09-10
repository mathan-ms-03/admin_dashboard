import { revenueData } from "../data/mockData";
import RevenueChart from "../components/dashboard/RevenueChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const trafficData = [
  { source: "Direct",   value: 38, color: "#8b5cf6" },
  { source: "Organic",  value: 28, color: "#06b6d4" },
  { source: "Referral", value: 18, color: "#10b981" },
  { source: "Social",   value: 16, color: "#f59e0b" },
];

const weeklyData = [
  { day: "Mon", users: 420 },
  { day: "Tue", users: 580 },
  { day: "Wed", users: 490 },
  { day: "Thu", users: 710 },
  { day: "Fri", users: 860 },
  { day: "Sat", users: 380 },
  { day: "Sun", users: 210 },
];

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Deep insights into your platform's performance
        </p>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Page Views",       value: "1.24M", delta: "+18%", up: true },
          { label: "Avg. Session",     value: "4m 32s", delta: "+5%",  up: true },
          { label: "Conversion Rate",  value: "3.8%",  delta: "-0.3%", up: false },
          { label: "Churn Rate",       value: "1.2%",  delta: "-0.5%", up: true },
        ].map(({ label, value, delta, up }) => (
          <div key={label} className="card p-4 animate-fade-in">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <span className={`text-xs font-semibold ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {delta} vs last month
            </span>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <RevenueChart data={revenueData} />

      {/* Bottom row: bar + pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly active users */}
        <div className="card p-5 animate-fade-in">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Weekly Active Users</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Daily unique visitors this week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} className="text-gray-500 dark:text-gray-400" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} className="text-gray-500 dark:text-gray-400" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--tw-bg)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="users" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic sources */}
        <div className="card p-5 animate-fade-in">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Traffic Sources</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Where your users are coming from</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={CustomPieLabel}
                >
                  {trafficData.map((entry) => (
                    <Cell key={entry.source} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 min-w-[140px]">
              {trafficData.map(({ source, value, color }) => (
                <div key={source} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{source}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
