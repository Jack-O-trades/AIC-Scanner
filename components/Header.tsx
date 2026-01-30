'use client';

export default function Header() {
  return (
    <div className="text-center mb-10 animate-slide-down">
      <div className="inline-block bg-emerald-950 border border-emerald-700 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wider">
        📱 QR Scanner
      </div>
      
      <div className="text-4xl mb-3">📊</div>
      
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
        Attendance Tracker
      </h1>
      
      <p className="text-slate-400 text-lg font-normal">
        Real-time QR code attendance tracking system
      </p>
    </div>
  );
}
