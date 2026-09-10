import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card px-4 py-3 text-sm shadow-xl">
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
            <span className="capitalize">{entry.name}:</span>
            <span className="font-semibold">${(entry.value / 1000).toFixed(1)}k</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data }) {
  const [view, setView] = useState("both");

  const showRevenue  = view === "both" || view === "revenue";
  const showExpenses = view === "both" || view === "expenses";

  return (
    <div className="card p-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Revenue Overview</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Monthly performance for 2026</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {[
            { key: "both",     label: "All" },
            { key: "revenue",  label: "Revenue" },
            { key: "expenses", label: "Expenses" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                view === key
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "currentColor" }}
            className="text-gray-500 dark:text-gray-400"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "currentColor" }}
            className="text-gray-500 dark:text-gray-400"
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          {showRevenue && (
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          )}
          {showExpenses && (
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fill="url(#colorExpenses)"
              dot={{ r: 4, fill: "#06b6d4", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary stats */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Revenue</span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">$84.3k</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Expenses</span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">$45.0k</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-500 dark:text-gray-400">Net Profit</span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">$39.3k</span>
        </div>
      </div>
    </div>
  );
}
