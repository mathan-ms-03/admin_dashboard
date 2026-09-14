import { useState, useEffect, useCallback } from "react";
import {
  notifications as initialNotifications,
  usersData as initialUsers,
  recentOrders as initialOrders,
} from "../data/mockData";
import { AppContext } from "./context";

export function AppProvider({ children }) {
  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("admin_notifications");
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Search query
  const [searchQuery, setSearchQuery] = useState("");

  // Current user profile
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("admin_user_profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Admin User",
          email: "admin@example.com",
          role: "Super Admin",
          bio: "Full Stack Developer & UI Designer",
          location: "San Francisco, CA",
          initials: "AD",
        };
  });

  // Accent color
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("admin_accent_color") || "#8b5cf6";
  });

  // Users data state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("admin_users");
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Orders data state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("admin_orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Accent color effect
  useEffect(() => {
    localStorage.setItem("admin_accent_color", accentColor);
    document.documentElement.style.setProperty("--brand-primary", accentColor);
  }, [accentColor]);

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem("admin_users", JSON.stringify(users));
  }, [users]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem("admin_orders", JSON.stringify(orders));
  }, [orders]);

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem("admin_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Toggles
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);

  // Notification actions
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read", "info");
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Profile actions
  const updateCurrentUser = (data) => {
    setCurrentUser((prev) => {
      const initials = (data.name || prev.name)
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      const updated = { ...prev, ...data, initials };
      localStorage.setItem("admin_user_profile", JSON.stringify(updated));
      return updated;
    });
    showToast("Profile settings saved successfully!", "success");
  };

  // User management actions
  const addUser = (newUser) => {
    const initials = newUser.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const userWithDefaults = {
      id: Date.now(),
      avatar: initials,
      orders: 0,
      joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      ...newUser,
    };
    setUsers((prev) => [userWithDefaults, ...prev]);
    showToast(`User "${newUser.name}" added successfully!`, "success");
  };

  const updateUser = (id, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const initials = (updatedFields.name || u.name)
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
          return { ...u, ...updatedFields, avatar: initials };
        }
        return u;
      })
    );
    showToast("User details updated successfully!", "success");
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User removed successfully", "info");
  };

  // Order management actions
  const addOrder = (newOrder) => {
    const initials = newOrder.customer
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const orderWithDefaults = {
      id: `#ORD-${String(orders.length + 1).padStart(3, "0")}`,
      avatar: initials,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      ...newOrder,
    };
    setOrders((prev) => [orderWithDefaults, ...prev]);
    showToast(`Order "${orderWithDefaults.id}" added successfully!`, "success");
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    showToast(`Order ${id} status updated to ${status}`, "info");
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    showToast(`Order ${id} removed successfully`, "info");
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        sidebarOpen,
        toggleSidebar,
        mobileSidebarOpen,
        toggleMobileSidebar,
        setMobileSidebarOpen,
        notifications,
        unreadCount,
        markAllRead,
        markAsRead,
        searchQuery,
        setSearchQuery,
        currentUser,
        updateCurrentUser,
        accentColor,
        setAccentColor,
        users,
        addUser,
        updateUser,
        deleteUser,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        toast,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
