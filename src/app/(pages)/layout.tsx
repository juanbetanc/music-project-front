import dynamic from 'next/dynamic';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import ClientNavbar from '@/components/ClientNavbar';
import { HydratedContent } from '@/components/HydratedContent';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Mi Aplicación',
//   description: 'Descripción de mi aplicación',
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HydratedContent>
          {children}
        </HydratedContent>
      </body>
    </html>
  );
}
