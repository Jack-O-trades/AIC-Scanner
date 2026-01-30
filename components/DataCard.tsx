'use client';

interface DataCardProps {
  name?: string;
  registration_number?: string;
  message?: string;
  status: string;
  visible: boolean;
}

export default function DataCard({
  name,
  registration_number,
  message,
  status,
  visible,
}: DataCardProps) {
  if (!visible) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-900/15 to-teal-900/10 border-2 border-emerald-700/30 rounded-2xl p-6 shadow-lg animate-slide-up">
      {registration_number && (
        <div className="mb-4">
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            Registration Number
          </div>
          <div className="text-2xl font-bold text-slate-100 break-all">
            {registration_number}
          </div>
        </div>
      )}

      {name && (
        <div className="mb-4">
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            Name
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {name}
          </div>
        </div>
      )}

      {message && (
        <div>
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            Message
          </div>
          <div className="text-lg text-slate-300">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
