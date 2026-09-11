import { useApp } from "../../hooks/useApp";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: "border-emerald-500/30 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
    error: "border-rose-500/30 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
    info: "border-brand-500/30 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl shadow-xl border ${
          bgStyles[toast.type] || bgStyles.info
        } backdrop-blur-xl`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={dismissToast}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
