import { useEffect, useRef } from "react";
import {
  Bell,
  ShoppingCart,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings,
  X,
  Check,
} from "lucide-react";
import { useApp } from "../../hooks/useApp";

const typeConfig = {
  order:   { icon: ShoppingCart, color: "text-blue-500",   bg: "bg-blue-100 dark:bg-blue-900/30" },
  alert:   { icon: AlertTriangle, color: "text-rose-500",  bg: "bg-rose-100 dark:bg-rose-900/30" },
  user:    { icon: Users, color: "text-emerald-500",       bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  payment: { icon: CheckCircle, color: "text-violet-500",  bg: "bg-violet-100 dark:bg-violet-900/30" },
  system:  { icon: Settings, color: "text-gray-500",       bg: "bg-gray-100 dark:bg-gray-800" },
};

export default function NotificationPanel({ onClose }) {
  const { notifications, unreadCount, markAllRead, markAsRead } = useApp();
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-96 card animate-fade-in z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-500" />
          <span className="font-semibold text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-600 text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/50">
        {notifications.map((notif) => {
          const { icon: Icon, color, bg } = typeConfig[notif.type] || typeConfig.system;
          return (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`flex gap-3 px-5 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                !notif.read ? "bg-brand-50/50 dark:bg-brand-900/10" : ""
              }`}
            >
              <div className={`flex-shrink-0 w-9 h-9 rounded-xl ${bg} flex items-center justify-center mt-0.5`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-500 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {notif.message}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 text-center">
        <button className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
}
