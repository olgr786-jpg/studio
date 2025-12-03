import type { Metadata } from 'next';
import './globals.css';
import { inter, dmSerifDisplay } from '@/app/lib/fonts';

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
    <html lang="ca" className={`${inter.variable} ${dmSerifDisplay.variable} !scroll-smooth`}>
      <body className={'antialiased font-sans'}>
        {children}
      </body>
    </html>
  );
}
