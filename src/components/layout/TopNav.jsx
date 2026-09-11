import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useApp } from "../../hooks/useApp";
import SearchBar from "../common/SearchBar";
import NotificationPanel from "../common/NotificationPanel";
import Avatar from "../common/Avatar";

export default function TopNav() {
  const {
    darkMode,
    toggleDarkMode,
    toggleMobileSidebar,
    unreadCount,
    currentUser,
    showToast,
  } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown on outside click
  useEffect(() => {
    function handle(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleProfileClick = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  const handleSignOut = () => {
    setShowProfile(false);
    showToast("Signed out successfully (Demo)", "info");
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 md:px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      {/* Mobile hamburger */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <SearchBar placeholder="Search users, orders, pages..." />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif((p) => !p); setShowProfile(false); }}
            className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce-in">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile((p) => !p); setShowNotif(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <Avatar initials={currentUser?.initials || "AD"} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                {currentUser?.name || "Admin User"}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                {currentUser?.email || "admin@example.com"}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 hidden md:block transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-52 card animate-fade-in z-50 overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {currentUser?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentUser?.email || "admin@example.com"}
                </p>
              </div>
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <User className="w-4 h-4" />
                My Profile
              </button>
              <button
                onClick={() => {
                  setShowProfile(false);
                  showToast("Documentation & Help Center opened", "info");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <HelpCircle className="w-4 h-4" />
                Help & Support
              </button>
              <div className="border-t border-gray-100 dark:border-gray-800 mt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
