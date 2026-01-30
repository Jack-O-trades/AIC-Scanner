'use client';

import { useEffect, useState } from 'react';
import ScannerSection from '@/components/ScannerSection';
import StatsSection from '@/components/StatsSection';
import AttendanceList from '@/components/AttendanceList';
import Header from '@/components/Header';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  const [stats, setStats] = useState({ total_registered: 0, present: 0, absent: 0 });
  const [attendees, setAttendees] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchStats();
    fetchAttendees();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats/');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchAttendees = async () => {
    try {
      const response = await fetch('/api/attendees/');
      const data = await response.json();
      setAttendees(data.attendees);
    } catch (error) {
      console.error('Failed to fetch attendees:', error);
    }
  };

  const handleScanSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      
      <div className="container max-w-2xl mx-auto px-6 py-8 relative z-10">
        <Header />
        <ScannerSection onScanSuccess={handleScanSuccess} />
        <StatsSection stats={stats} />
        <AttendanceList attendees={attendees} />
        
        <p className="text-center text-sm text-teal-400 mt-8 font-medium">
          Real-time attendance tracking powered by QR codes
        </p>
      </div>
    </main>
  );
}
