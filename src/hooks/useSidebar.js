import { useApp } from "./useApp";

export function useSidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    mobileSidebarOpen,
    toggleMobileSidebar,
    setMobileSidebarOpen,
  } = useApp();

  return {
    sidebarOpen,
    toggleSidebar,
    mobileSidebarOpen,
    toggleMobileSidebar,
    setMobileSidebarOpen,
  };
}

export default useSidebar;
