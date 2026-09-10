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
  { id: "profile",       label: "Profile",       icon: User },
  { id: "appearance",    label: "Appearance",    icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security",      label: "Security",      icon: Shield },
];

const Toggle = ({ enabled, onToggle }) => (
  <button
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
  const { darkMode, toggleDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved]         = useState(false);
  const [profile, setProfile]     = useState({ name: "Admin User", email: "admin@example.com", bio: "Full Stack Developer & UI Designer", location: "San Francisco, CA" });
  const [notifSettings, setNotifSettings] = useState({ email: true, push: true, orders: true, updates: false, marketing: false });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
            <>
              <div className="flex items-center gap-4">
                <Avatar initials="AD" size="xl" />
                <div>
                  <button className="btn-primary text-xs !py-1.5">Change Photo</button>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                    className="input-base"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    className="input-base resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme</h3>
                <div className="flex gap-4">
                  {[
                    { label: "Light", icon: Sun, value: false },
                    { label: "Dark",  icon: Moon, value: true },
                  ].map(({ label, icon: Icon, value }) => (
                    <button
                      key={label}
                      onClick={() => { if (darkMode !== value) toggleDarkMode(); }}
                      className={`flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 ${
                        darkMode === value
                          ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-brand-300"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${darkMode === value ? "text-brand-600 dark:text-brand-400" : "text-gray-400"}`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                      {darkMode === value && <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Accent Color</h3>
                <div className="flex gap-3">
                  {["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"].map((c) => (
                    <button
                      key={c}
                      style={{ background: c }}
                      className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 hover:scale-110 transition-transform"
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {[
                { key: "email",     label: "Email Notifications",   desc: "Receive emails for important updates" },
                { key: "push",      label: "Push Notifications",    desc: "Browser push notifications" },
                { key: "orders",    label: "Order Alerts",          desc: "Notify when an order changes status" },
                { key: "updates",   label: "Product Updates",       desc: "Feature releases and changelog" },
                { key: "marketing", label: "Marketing Emails",      desc: "Promotions and newsletters" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <Toggle
                    enabled={notifSettings[key]}
                    onToggle={() => setNotifSettings((p) => ({ ...p, [key]: !p[key] }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Change Password</h3>
                {["Current Password", "New Password", "Confirm Password"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>
                    <input type="password" placeholder="••••••••" className="input-base" />
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">Two-Factor Authentication</p>
                <p className="text-xs text-amber-700 dark:text-amber-500 mb-3">Add an extra layer of security to your account.</p>
                <Button variant="outline" size="sm" icon={Shield}>Enable 2FA</Button>
              </div>
            </div>
          )}

          {/* Save */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 animate-fade-in">
                <Check className="w-4 h-4" /> Changes saved!
              </span>
            )}
            <Button icon={Save} onClick={handleSave} className="ml-auto">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
