import { useState } from "react";
import { ArrowUpDown, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Avatar from "../common/Avatar";
import { useApp } from "../../hooks/useApp";

const statusVariant = {
  Delivered:  "success",
  Processing: "info",
  Shipped:    "purple",
  Pending:    "warning",
  Cancelled:  "danger",
};

const statusOptions = ["Delivered", "Processing", "Shipped", "Pending", "Cancelled"];

function SortHeader({ label, field, sortField, onSort }) {
  return (
    <th
      onClick={() => onSort(field)}
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={`w-3 h-3 ${sortField === field ? "text-brand-500" : "text-gray-300 dark:text-gray-600"}`} />
      </div>
    </th>
  );
}

export default function RecentOrders({ orders, showActions = false, hideViewAll = false }) {
  const { updateOrderStatus, deleteOrder } = useApp();
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...orders].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField] ?? "";
    const bVal = b[sortField] ?? "";
    const cmp = aVal.toString().localeCompare(bVal.toString());
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <div className="card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {hideViewAll ? "All Orders" : "Recent Orders"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{orders.length} orders listed</p>
        </div>
        {!hideViewAll && (
          <Link
            to="/orders"
            className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1"
          >
            View all <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-gray-800/30">
            <tr>
              <SortHeader label="Order ID"  field="id" sortField={sortField} onSort={handleSort} />
              <SortHeader label="Customer"  field="customer" sortField={sortField} onSort={handleSort} />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Product
              </th>
              <SortHeader label="Amount"    field="amount" sortField={sortField} onSort={handleSort} />
              <SortHeader label="Status"    field="status" sortField={sortField} onSort={handleSort} />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              {showActions && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {sorted.map((order, i) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className="px-4 py-3 text-sm font-mono font-medium text-brand-600 dark:text-brand-400">
                  {order.id}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={order.avatar} size="sm" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {order.customer}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell max-w-[180px] truncate">
                  {order.product}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {order.amount}
                </td>
                <td className="px-4 py-3">
                  {showActions ? (
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="text-xs font-medium py-1 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge variant={statusVariant[order.status] || "default"} dot>
                      {order.status}
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 hidden lg:table-cell whitespace-nowrap">
                  {order.date}
                </td>
                {showActions && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
