import { useState } from "react";
import { Search, UserPlus, Edit3, Trash2 } from "lucide-react";
import { usersData } from "../data/mockData";
import Avatar from "../components/common/Avatar";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";

const statusVariant = {
  Active:    "success",
  Inactive:  "default",
  Suspended: "danger",
};

const roleVariant = {
  Admin:     "purple",
  Moderator: "info",
  Editor:    "warning",
  User:      "default",
};

export default function Users() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.status === filter;
    return matchSearch && matchFilter;
  });

  const tabs = ["All", "Active", "Inactive", "Suspended"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your {usersData.length} registered users
          </p>
        </div>
        <Button icon={UserPlus} variant="primary">Add User</Button>
      </div>

      <div className="card overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {/* Tab filters */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  filter === tab
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  filter === tab ? "bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {tab === "All" ? usersData.length : usersData.filter((u) => u.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex items-center sm:ml-auto sm:w-64">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="input-base pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 dark:bg-gray-800/30">
              <tr>
                {["User", "Role", "Status", "Orders", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors animate-fade-in">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={user.avatar} size="md" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={roleVariant[user.role] || "default"} size="sm">{user.role}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[user.status] || "default"} dot size="sm">{user.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 dark:text-gray-300 font-medium">{user.orders}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
