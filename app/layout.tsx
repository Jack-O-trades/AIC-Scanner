import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QR Attendance Scanner',
  description: 'Real-time QR code attendance tracking system',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
