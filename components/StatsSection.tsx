'use client';

interface StatsSectionProps {
  stats: {
    total_registered: number;
    present: number;
    absent: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statCards = [
    {
      label: 'Total Registered',
      value: stats.total_registered,
      icon: '👥',
      color: 'from-blue-600 to-blue-400',
    },
    {
      label: 'Present',
      value: stats.present,
      icon: '✅',
      color: 'from-emerald-600 to-emerald-400',
    },
    {
      label: 'Absent',
      value: stats.absent,
      icon: '❌',
      color: 'from-red-600 to-red-400',
    },
  ];

  return (
    <div
      className="grid grid-cols-3 gap-4 my-8 animate-slide-up"
      style={{ animationDelay: '0.3s' }}
    >
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-emerald-950/40 to-teal-950/20 backdrop-blur-xl border-2 border-emerald-700/25 rounded-2xl p-4 text-center transition-all duration-300 hover:border-emerald-700/50 hover:shadow-lg hover:shadow-emerald-600/20 hover:scale-105 cursor-default"
        >
          <div className="text-3xl font-black text-emerald-400 mb-2">
            {card.value}
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
