import { useState } from "react";
import { Search, UserPlus, Edit3, Trash2, X, Check } from "lucide-react";
import { useApp } from "../hooks/useApp";
import Avatar from "../components/common/Avatar";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";

const statusVariant = {
  Active: "success",
  Inactive: "default",
  Suspended: "danger",
};

const roleVariant = {
  Admin: "purple",
  Moderator: "info",
  Editor: "warning",
  User: "default",
};

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.status === filter;
    return matchSearch && matchFilter;
  });

  const tabs = ["All", "Active", "Inactive", "Suspended"];

  const handleOpenAdd = () => {
    setFormData({ name: "", email: "", role: "User", status: "Active" });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    addUser(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    updateUser(editingUser.id, formData);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your {users.length} registered users
          </p>
        </div>
        <Button icon={UserPlus} variant="primary" onClick={handleOpenAdd}>
          Add User
        </Button>
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
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    filter === tab
                      ? "bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {tab === "All"
                    ? users.length
                    : users.filter((u) => u.status === tab).length}
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
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors animate-fade-in"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={user.avatar} size="md" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={roleVariant[user.role] || "default"} size="sm">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[user.status] || "default"} dot size="sm">
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {user.orders}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400">
                    {user.joined}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
                        title="Edit User"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        title="Delete User"
                      >
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

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card w-full max-w-md p-6 animate-bounce-in shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Add New User</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAdd} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Sarah Connor"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. sarah@example.com"
                  className="input-base"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                    className="input-base"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                    className="input-base"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={Check}>
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card w-full max-w-md p-6 animate-bounce-in shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit User Details</h2>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="input-base"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                    className="input-base"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                    className="input-base"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={Check}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
