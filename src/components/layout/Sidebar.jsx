import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
} from "lucide-react";
import { useApp } from "../../hooks/useApp";

const iconMap = {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
};

const navLinks = [
  { name: "Dashboard",  path: "/",          icon: "LayoutDashboard" },
  { name: "Users",      path: "/users",     icon: "Users" },
  { name: "Orders",     path: "/orders",    icon: "ShoppingCart" },
  { name: "Analytics",  path: "/analytics", icon: "BarChart3" },
  { name: "Settings",   path: "/settings",  icon: "Settings" },
];

function SidebarContent({ isMobile = false, sidebarOpen, toggleSidebar, setMobileSidebarOpen }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-gray-800 ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-glow">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {(sidebarOpen || isMobile) && (
          <div>
            <span className="font-bold text-base text-gradient">AdminPro</span>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase">
              Dashboard
            </p>
          </div>
        )}
        {isMobile && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!sidebarOpen && !isMobile && (
          <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-semibold text-center mb-3">
            Menu
          </p>
        )}
        {(sidebarOpen || isMobile) && (
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold px-3 mb-3">
            Main Menu
          </p>
        )}
        {navLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => isMobile && setMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""} ${!sidebarOpen && !isMobile ? "justify-center !px-2" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-brand-600 dark:text-brand-400" : ""}`} />
                  {(sidebarOpen || isMobile) && (
                    <span className="animate-fade-in">{link.name}</span>
                  )}
                  {isActive && (sidebarOpen || isMobile) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {(sidebarOpen || isMobile) && (
        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
          <div className="rounded-xl bg-gradient-to-br from-brand-500/10 to-purple-500/10 dark:from-brand-900/30 dark:to-purple-900/30 p-3 border border-brand-100 dark:border-brand-900/50">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Upgrade to Pro</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Get access to all features and unlimited data.</p>
            <button className="w-full btn-primary !py-1.5 !text-xs justify-center">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Collapse toggle (desktop only) */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full py-3 border-t border-gray-100 dark:border-gray-800 text-gray-400 hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useApp();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out flex-shrink-0 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
        style={{ height: "100vh", position: "sticky", top: 0 }}
      >
        <SidebarContent
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 lg:hidden transform transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          isMobile
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
      </div>
    </>
  );
}
