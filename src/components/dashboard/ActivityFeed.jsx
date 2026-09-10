import {
  ShoppingCart,
  Server,
  UserPlus,
  Settings,
  Rocket,
} from "lucide-react";

const typeConfig = {
  order:    { icon: ShoppingCart, color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-100 dark:bg-blue-900/30" },
  system:   { icon: Server,       color: "text-gray-600 dark:text-gray-400",    bg: "bg-gray-100 dark:bg-gray-800" },
  user:     { icon: UserPlus,     color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  settings: { icon: Settings,     color: "text-amber-600 dark:text-amber-400",  bg: "bg-amber-100 dark:bg-amber-900/30" },
  deploy:   { icon: Rocket,       color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
};

export default function ActivityFeed({ activities }) {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest events and actions</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => {
          const cfg = typeConfig[activity.type] || typeConfig.system;
          const Icon = cfg.icon;
          return (
            <div
              key={activity.id}
              className="flex gap-3 animate-slide-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Icon dot */}
              <div className="relative flex flex-col items-center">
                <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${cfg.bg}`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                {i < activities.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-gray-100 dark:bg-gray-800" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                  {activity.target && (
                    <span className="ml-1 font-mono text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-1.5 py-0.5 rounded">
                      {activity.target}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
