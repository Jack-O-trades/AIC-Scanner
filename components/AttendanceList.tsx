'use client';

interface Attendee {
  id: number;
  registration_number: string;
  name: string;
  attended: boolean;
  checked_in_at: string | null;
}

interface AttendanceListProps {
  attendees: Attendee[];
}

export default function AttendanceList({ attendees }: AttendanceListProps) {
  const formatTime = (dateString: string | null) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return '—';
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-emerald-950/50 to-teal-950/30 backdrop-blur-2xl border-2 border-emerald-700/20 rounded-3xl p-7 max-h-96 overflow-y-auto shadow-2xl animate-slide-up"
      style={{ animationDelay: '0.4s' }}
    >
      <div className="text-xl font-bold text-emerald-400 mb-5 flex items-center gap-3">
        <span className="text-2xl">📋</span>
        <span>Recent Attendees</span>
      </div>

      {attendees.length === 0 ? (
        <div className="text-center text-teal-400 py-12 text-lg font-medium">
          No attendees checked in yet
        </div>
      ) : (
        <ul className="space-y-3">
          {attendees.map((attendee) => (
            <li
              key={attendee.id}
              className="bg-gradient-to-r from-emerald-900/10 to-teal-900/5 border-l-4 border-emerald-400 px-4 py-3 rounded-xl flex justify-between items-center transition-all duration-300 hover:from-emerald-900/15 hover:to-teal-900/10 hover:shadow-md hover:shadow-emerald-600/10 hover:translate-x-1"
            >
              <div className="flex-1">
                <div className="text-base font-semibold text-slate-100 mb-1">
                  {attendee.name}
                </div>
                <div className="text-xs text-slate-500">
                  {attendee.registration_number}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-teal-400 font-semibold bg-emerald-950/30 px-3 py-1 rounded-lg">
                  {formatTime(attendee.checked_in_at)}
                </div>
                <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                  Present
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
