import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const iconMap = { DollarSign, Users, ShoppingCart, TrendingDown, TrendingUp };

const gradients = {
  violet:  "from-violet-500 to-purple-600",
  blue:    "from-blue-500 to-cyan-500",
  emerald: "from-emerald-500 to-teal-500",
  rose:    "from-rose-500 to-pink-500",
};

export default function StatsCard({ title, value, change, trend, icon, bgColor, color }) {
  const Icon = iconMap[icon] || DollarSign;
  const isUp = trend === "up";

  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in group cursor-default">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bgColor || gradients[color] || gradients.violet} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Trend badge */}
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
          isUp
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
            : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
        }`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>

      {/* Value & Title */}
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {value}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{title}</p>
      </div>

      {/* Bottom bar */}
      <div className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${bgColor || gradients[color]}`}
          style={{ width: isUp ? "70%" : "35%", transition: "width 1s ease" }}
        />
      </div>
    </div>
  );
}
