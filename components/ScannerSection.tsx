'use client';

import { useEffect, useRef, useState } from 'react';
import StatusBadge from './StatusBadge';
import DataCard from './DataCard';

interface ScannerSectionProps {
  onScanSuccess: () => void;
}

export default function ScannerSection({ onScanSuccess }: ScannerSectionProps) {
  const readerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error' | 'already_marked' | 'not_registered' | 'loading'>('idle');
  const [scannedData, setScannedData] = useState<{
    name?: string;
    registration_number?: string;
    message?: string;
  } | null>(null);

  useEffect(() => {
    let html5QrcodeScanner: any;
    let scannerInitialized = false;

    const initializeScanner = async () => {
      try {
        const { Html5QrcodeScanner } = await import('html5-qrcode');
        
        html5QrcodeScanner = new Html5QrcodeScanner(
          'reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            disableFlip: false,
          },
          false
        );

        html5QrcodeScanner.render(
          onScanSuccess2,
          (error: any) => {
            console.warn('Scanner error:', error);
          }
        );

        scannerInitialized = true;
      } catch (error) {
        console.error('Failed to initialize scanner:', error);
      }
    };

    const onScanSuccess2 = async (decodedText: string) => {
      try {
        html5QrcodeScanner.pause(true);
        
        setStatus('loading');
        const formData = new FormData();
        formData.append('registration_number', decodedText);

        const response = await fetch('/scan/', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          setStatus(result.status as any);
          setScannedData({
            name: result.name,
            registration_number: result.registration_number,
            message: result.message,
          });
          onScanSuccess();
          
          // Resume after 2 seconds
          setTimeout(() => {
            html5QrcodeScanner.resume();
          }, 2000);
        } else {
          setStatus(result.status as any);
          setScannedData({
            message: result.message,
          });
          
          setTimeout(() => {
            html5QrcodeScanner.resume();
          }, 2000);
        }
      } catch (error) {
        console.error('Scan error:', error);
        setStatus('error');
        setScannedData({
          message: 'An error occurred while processing the QR code',
        });
        
        setTimeout(() => {
          html5QrcodeScanner?.resume();
        }, 2000);
      }
    };

    initializeScanner();

    return () => {
      if (scannerInitialized && html5QrcodeScanner) {
        try {
          html5QrcodeScanner.clear();
        } catch (error) {
          console.warn('Error clearing scanner:', error);
        }
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="space-y-6">
      <StatusBadge status={status} />
      
      <div className="bg-gradient-to-br from-emerald-950/50 to-teal-950/30 backdrop-blur-2xl border-2 border-emerald-700/20 rounded-3xl p-8 shadow-2xl animate-slide-up">
        <div
          id="reader"
          ref={readerRef}
          className="w-full rounded-2xl border-4 border-emerald-600/40 shadow-lg shadow-emerald-600/20"
          style={{
            aspectRatio: '1',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-emerald-600/30 shadow-inner" />
      </div>

      {scannedData && (
        <DataCard
          name={scannedData.name}
          registration_number={scannedData.registration_number}
          message={scannedData.message}
          status={status}
          visible={true}
        />
      )}
    </div>
  );
}
