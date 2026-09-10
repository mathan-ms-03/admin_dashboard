import { useState } from "react";
import { Download, Search } from "lucide-react";
import { recentOrders } from "../data/mockData";
import RecentOrders from "../components/dashboard/RecentOrders";
import Button from "../components/common/Button";

const statusKeys = ["All", "Delivered", "Processing", "Shipped", "Pending", "Cancelled"];

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = recentOrders.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = filtered
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + parseFloat(o.amount.replace(/[$,]/g, "")), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track and manage all customer orders
          </p>
        </div>
        <Button icon={Download} variant="outline">Export CSV</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders",   value: recentOrders.length,   color: "text-brand-600 dark:text-brand-400" },
          { label: "Delivered",      value: recentOrders.filter((o) => o.status === "Delivered").length,   color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Pending",        value: recentOrders.filter((o) => o.status === "Pending").length,     color: "text-amber-600 dark:text-amber-400" },
          { label: "Revenue (Delivered)", value: `$${totalRevenue.toLocaleString()}`, color: "text-violet-600 dark:text-violet-400" },
        ].map(({ label, value }) => (
          <div key={label} className="card p-4 text-center animate-fade-in">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-1.5">
            {statusKeys.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border ${
                  statusFilter === s
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-400 dark:hover:border-brand-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative flex items-center sm:ml-auto sm:w-56">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="input-base pl-9"
            />
          </div>
        </div>

        {/* Table reuse */}
        <RecentOrders orders={filtered} />
        {filtered.length === 0 && (
          <p className="text-center py-8 text-sm text-gray-400 dark:text-gray-500">
            No orders match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
