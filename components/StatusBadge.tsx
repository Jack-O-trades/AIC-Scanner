'use client';

interface StatusBadgeProps {
  status: 'idle' | 'scanning' | 'success' | 'error' | 'already_marked' | 'not_registered' | 'loading';
}

const statusConfig = {
  idle: {
    icon: '📱',
    text: 'Ready to Scan',
    class: 'bg-gradient-to-r from-emerald-950/25 to-teal-950/10 border-emerald-700/40 text-emerald-400',
  },
  scanning: {
    icon: '🔍',
    text: 'Scanning...',
    class: 'bg-gradient-to-r from-emerald-950/25 to-teal-950/10 border-emerald-700/40 text-emerald-400',
  },
  loading: {
    icon: '⏳',
    text: 'Processing...',
    class: 'bg-gradient-to-r from-emerald-950/25 to-teal-950/10 border-emerald-700/40 text-emerald-400',
  },
  success: {
    icon: '✅',
    text: 'Attendance Marked!',
    class: 'bg-gradient-to-r from-emerald-950/25 to-emerald-900/15 border-emerald-700/60 text-emerald-400 shadow-lg shadow-emerald-600/50',
  },
  already_marked: {
    icon: '⚠️',
    text: 'Already Marked',
    class: 'bg-gradient-to-r from-amber-950/25 to-orange-900/10 border-amber-700/60 text-amber-300 shadow-lg shadow-amber-600/20',
  },
  not_registered: {
    icon: '❌',
    text: 'Not Registered',
    class: 'bg-gradient-to-r from-red-950/25 to-red-900/10 border-red-700/60 text-red-400 shadow-lg shadow-red-600/30',
  },
  error: {
    icon: '⚡',
    text: 'Error Occurred',
    class: 'bg-gradient-to-r from-red-950/25 to-red-900/10 border-red-700/60 text-red-400 shadow-lg shadow-red-600/30',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 font-semibold text-lg backdrop-blur-sm transition-all duration-300 animate-slide-up ${config.class}`}
    >
      <span className={status === 'loading' || status === 'scanning' ? 'animate-pulse-custom text-2xl' : 'text-2xl'}>
        {config.icon}
      </span>
      <span>{config.text}</span>
    </div>
  );
}
