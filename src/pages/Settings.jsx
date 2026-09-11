import { useState } from "react";
import { useApp } from "../hooks/useApp";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Moon,
  Sun,
  Check,
} from "lucide-react";
import Avatar from "../components/common/Avatar";
import Button from "../components/common/Button";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const Toggle = ({ enabled, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
      enabled ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default function Settings() {
  const {
    darkMode,
    toggleDarkMode,
    currentUser,
    updateCurrentUser,
    accentColor,
    setAccentColor,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: currentUser?.name || "Admin User",
    email: currentUser?.email || "admin@example.com",
    bio: currentUser?.bio || "Full Stack Developer & UI Designer",
    location: currentUser?.location || "San Francisco, CA",
  });

  const [notifSettings, setNotifSettings] = useState(() => {
    const savedNotifs = localStorage.getItem("admin_notif_pref");
    return savedNotifs
      ? JSON.parse(savedNotifs)
      : { email: true, push: true, orders: true, updates: false, marketing: false };
  });

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    updateCurrentUser(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleToggleNotif = (key) => {
    setNotifSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("admin_notif_pref", JSON.stringify(updated));
      showToast(`Notification preference for ${key} updated`, "info");
      return updated;
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      showToast("Please fill in all password fields", "error");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      showToast("New passwords do not match", "error");
      return;
    }
    if (passwords.newPass.length < 6) {
      showToast("Password must be at least 6 characters long", "error");
      return;
    }
    setPasswords({ current: "", newPass: "", confirm: "" });
    showToast("Password updated successfully!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar tabs */}
        <div className="card p-3 h-fit space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 card p-6 space-y-6 animate-fade-in">
          {/* Profile */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar initials={currentUser?.initials || "AD"} size="xl" />
                <div>
                  <button
                    type="button"
                    onClick={() => showToast("Avatar upload feature ready (Demo)", "info")}
                    className="btn-primary text-xs !py-1.5"
                  >
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    JPG, PNG or GIF. Max 2MB
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                    className="input-base"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    className="input-base resize-none"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                {saved && (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 animate-fade-in">
                    <Check className="w-4 h-4" /> Changes saved!
                  </span>
                )}
                <Button type="submit" icon={Save} className="ml-auto">
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme</h3>
                <div className="flex gap-4">
                  {[
                    { label: "Light", icon: Sun, value: false },
                    { label: "Dark", icon: Moon, value: true },
                  ].map(({ label, icon: Icon, value }) => (
                    <button
                      key={label}
                      onClick={() => {
                        if (darkMode !== value) toggleDarkMode();
                      }}
                      className={`flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 ${
                        darkMode === value
                          ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-brand-300"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          darkMode === value
                            ? "text-brand-600 dark:text-brand-400"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                      </span>
                      {darkMode === value && (
                        <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Accent Color
                </h3>
                <div className="flex gap-3">
                  {[
                    { color: "#8b5cf6", name: "Purple" },
                    { color: "#3b82f6", name: "Blue" },
                    { color: "#10b981", name: "Emerald" },
                    { color: "#f59e0b", name: "Amber" },
                    { color: "#ef4444", name: "Rose" },
                    { color: "#ec4899", name: "Pink" },
                  ].map(({ color, name }) => (
                    <button
                      key={color}
                      onClick={() => {
                        setAccentColor(color);
                        showToast(`Accent color set to ${name}`, "info");
                      }}
                      style={{ background: color }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        accentColor === color
                          ? "ring-4 ring-offset-2 ring-brand-500 ring-offset-white dark:ring-offset-gray-900 scale-110"
                          : "hover:scale-105 opacity-85 hover:opacity-100"
                      }`}
                      title={name}
                    >
                      {accentColor === color && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {[
                { key: "email", label: "Email Notifications", desc: "Receive emails for important updates" },
                { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                { key: "orders", label: "Order Alerts", desc: "Notify when an order changes status" },
                { key: "updates", label: "Product Updates", desc: "Feature releases and changelog" },
                { key: "marketing", label: "Marketing Emails", desc: "Promotions and newsletters" },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <Toggle
                    enabled={notifSettings[key]}
                    onToggle={() => handleToggleNotif(key)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Change Password
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                    placeholder="••••••••"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.newPass}
                    onChange={(e) => setPasswords((p) => ({ ...p, newPass: e.target.value }))}
                    placeholder="••••••••"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                    placeholder="••••••••"
                    className="input-base"
                  />
                </div>
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
              </form>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-500 mb-3">
                  Add an extra layer of security to your account.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Shield}
                  onClick={() => showToast("Two-Factor Authentication setup initiated", "info")}
                >
                  Enable 2FA
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
