import type { Metadata } from 'next';
import ClientNavbar from '@/components/ClientNavbar';

// export const metadata: Metadata = {
//   title: 'Music Project',
//   description: 'Descubre y compra música digital de artistas independientes',
// };

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {children}
      </main>
    </div>
  );
}
