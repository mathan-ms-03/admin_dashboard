import { useState, useRef, useEffect } from "react";
import { Search, X, User, Users, ShoppingCart, LayoutDashboard, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

export default function SearchBar({ placeholder = "Search anything...", className = "" }) {
  const { searchQuery, setSearchQuery, users, orders } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const pages = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard, category: "Page" },
    { name: "Users", path: "/users", icon: Users, category: "Page" },
    { name: "Orders", path: "/orders", icon: ShoppingCart, category: "Page" },
    { name: "Analytics", path: "/analytics", icon: BarChart3, category: "Page" },
    { name: "Settings", path: "/settings", icon: Settings, category: "Page" },
  ];

  const query = searchQuery.trim().toLowerCase();

  const matchedPages = query
    ? pages.filter((p) => p.name.toLowerCase().includes(query))
    : [];

  const matchedUsers = query && users
    ? users
        .filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        )
        .slice(0, 3)
    : [];

  const matchedOrders = query && orders
    ? orders
        .filter(
          (o) =>
            o.id.toLowerCase().includes(query) ||
            o.customer.toLowerCase().includes(query) ||
            o.product.toLowerCase().includes(query)
        )
        .slice(0, 3)
    : [];

  const hasResults =
    matchedPages.length > 0 || matchedUsers.length > 0 || matchedOrders.length > 0;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (path) => {
    navigate(path);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="input-base pl-9 pr-9"
      />
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            setIsOpen(false);
          }}
          className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Global Search Results Dropdown */}
      {isOpen && query && (
        <div className="absolute left-0 top-full mt-2 w-full md:w-96 card shadow-2xl animate-fade-in z-50 overflow-hidden max-h-96 overflow-y-auto">
          {hasResults ? (
            <div className="p-2 space-y-2">
              {matchedPages.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Pages
                  </p>
                  {matchedPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.path}
                        onClick={() => handleSelect(page.path)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <Icon className="w-4 h-4 text-brand-500" />
                        <span className="font-medium">{page.name}</span>
                        <span className="ml-auto text-[10px] text-gray-400">Jump to page</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {matchedUsers.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Users
                  </p>
                  {matchedUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelect("/users")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-emerald-500" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 capitalize">{user.role}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedOrders.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Orders
                  </p>
                  {matchedOrders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => handleSelect("/orders")}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <ShoppingCart className="w-4 h-4 text-cyan-500" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs">{order.id} – {order.product}</p>
                        <p className="text-[11px] text-gray-400">{order.customer}</p>
                      </div>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {order.amount}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 px-4 text-center text-xs text-gray-400 dark:text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
