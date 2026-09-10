const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-indigo-500 to-blue-500",
];

function getColorClass(initials) {
  const idx = initials.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
}

export default function Avatar({ initials = "U", size = "md", src = null, className = "" }) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const colorClass = getColorClass(initials);

  if (src) {
    return (
      <img
        src={src}
        alt={initials}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white dark:ring-gray-800 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center font-semibold text-white flex-shrink-0 ring-2 ring-white dark:ring-gray-800 ${className}`}
    >
      {initials}
    </div>
  );
}
