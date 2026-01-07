import type { Metadata } from 'next';
import './globals.css';
import { inter, playfairDisplay } from '@/app/lib/fonts';

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
    <html lang="ca" className={`${inter.variable} ${playfairDisplay.variable} !scroll-smooth`}>
      <body className={'antialiased font-sans'}>
        {children}
      </body>
    </html>
  );
}
