import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/app/lib/fonts';

export const metadata: Metadata = {
  title: 'Nalu',
  description: 'Aigua pura amb essència d’illa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="!scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
