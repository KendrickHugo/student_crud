import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Notification({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const { type = 'info', message } = notification;

  const styleConfig = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      closeHover: 'hover:bg-emerald-100 text-emerald-700',
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
      closeHover: 'hover:bg-rose-100 text-rose-700',
    },
    info: {
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      icon: <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />,
      closeHover: 'hover:bg-indigo-100 text-indigo-700',
    },
  }[type] || {
    bg: 'bg-slate-50 border-slate-200 text-slate-900',
    icon: <Info className="w-5 h-5 text-slate-600 flex-shrink-0" />,
    closeHover: 'hover:bg-slate-100 text-slate-700',
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-2 duration-300">
      <div
        className={`flex items-start space-x-3 p-4 rounded-xl border shadow-lg ${styleConfig.bg}`}
      >
        {styleConfig.icon}
        <div className="flex-1 text-sm font-medium pt-0.5">{message}</div>
        <button
          onClick={onDismiss}
          className={`p-1 rounded-md transition-colors ${styleConfig.closeHover}`}
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
