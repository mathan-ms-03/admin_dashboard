export default function Badge({ children, variant = "default", size = "sm", dot = false }) {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    danger:  "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
    info:    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    purple:  "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400",
  };

  const dotColors = {
    default: "bg-gray-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger:  "bg-rose-500",
    info:    "bg-blue-500",
    purple:  "bg-violet-500",
  };

  const sizes = {
    xs: "px-1.5 py-0.5 text-[10px]",
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]} font-medium`}>
      {dot && (
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors[variant]} mr-1.5`} />
      )}
      {children}
    </span>
  );
}
