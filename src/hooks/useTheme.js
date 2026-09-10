import { useApp } from "./useApp";

export function useTheme() {
  const { darkMode, toggleDarkMode } = useApp();
  return { darkMode, toggleDarkMode };
}

export default useTheme;
