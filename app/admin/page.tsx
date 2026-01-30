'use client';

import { useEffect, useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';

interface Attendee {
  id: number;
  registration_number: string;
  name: string;
  attended: boolean;
  checked_in_at: string | null;
}

export default function AdminPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAttendees = async () => {
      try {
        const response = await fetch('/admin/attendees/');
        const html = await response.text();
        
        // Parse HTML to extract attendee data
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const rows = doc.querySelectorAll('tbody tr');
        const attendeesData: Attendee[] = [];

        rows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          if (cells.length > 0) {
            const nameCell = cells[2]?.textContent?.trim();
            const statusCell = cells[3]?.textContent?.trim();
            const timeCell = cells[4]?.textContent?.trim();

            if (nameCell) {
              attendeesData.push({
                id: attendeesData.length + 1,
                registration_number: cells[1]?.textContent?.trim() || '',
                name: nameCell,
                attended: statusCell?.includes('Present') || false,
                checked_in_at: timeCell && timeCell !== '—' ? timeCell : null,
              });
            }
          }
        });

        setAttendees(attendeesData);
      } catch (error) {
        console.error('Failed to fetch attendees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAttendees();
  }, []);

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />

      <div className="container max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-down">
          <div className="inline-block bg-emerald-950 border border-emerald-700 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
            🛠 Admin Panel
          </div>

          <div className="text-4xl mb-3">🚀</div>

          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Attendance Dashboard
          </h1>

          <p className="text-slate-400 text-lg font-normal">
            All Attendees Management
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-gradient-to-br from-emerald-950/50 to-teal-950/30 backdrop-blur-2xl border-2 border-emerald-700/20 rounded-3xl p-8 shadow-2xl animate-slide-up">
          <div className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <span>All Attendees</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-teal-400 text-lg">
              Loading attendees...
            </div>
          ) : attendees.length === 0 ? (
            <div className="text-center py-12 text-teal-400 text-lg">
              No attendees found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-700/25 to-teal-700/15">
                    <th className="text-left px-4 py-3 font-bold text-emerald-300 uppercase text-xs tracking-wider">#</th>
                    <th className="text-left px-4 py-3 font-bold text-emerald-300 uppercase text-xs tracking-wider">Registration No.</th>
                    <th className="text-left px-4 py-3 font-bold text-emerald-300 uppercase text-xs tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 font-bold text-emerald-300 uppercase text-xs tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 font-bold text-emerald-300 uppercase text-xs tracking-wider">Checked In At</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee, index) => (
                    <tr
                      key={attendee.id}
                      className={`border-b border-emerald-700/30 transition-all duration-300 hover:bg-emerald-900/15 ${
                        index % 2 === 0
                          ? 'bg-gradient-to-r from-emerald-900/8 to-teal-900/5'
                          : 'bg-gradient-to-r from-emerald-950/40 to-teal-950/20'
                      }`}
                    >
                      <td className="px-4 py-3 text-slate-300">{index + 1}</td>
                      <td className="px-4 py-3 text-slate-300 font-semibold">{attendee.registration_number}</td>
                      <td className="px-4 py-3 text-slate-200">{attendee.name}</td>
                      <td className="px-4 py-3">
                        {attendee.attended ? (
                          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/15 text-emerald-300 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-600/40">
                            ✓ Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600/20 to-slate-600/15 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold border border-slate-600/40">
                            ○ Absent
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs font-mono">
                        {formatTime(attendee.checked_in_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-right text-sm text-slate-400">
            Total attendees: <span className="font-bold text-emerald-400">{attendees.length}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
