export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) {
  const variants = {
    primary: "btn-primary",
    ghost:   "btn-ghost",
    danger:  "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition-all duration-200 active:scale-95",
    outline: "inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm transition-all duration-200 active:scale-95",
  };

  const sizes = {
    sm:  "!px-3 !py-1.5 !text-xs",
    md:  "",
    lg:  "!px-6 !py-3 !text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : Icon && (
        <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      {children}
      {IconRight && <IconRight className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
}
