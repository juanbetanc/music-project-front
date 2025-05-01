// app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Gloupper',
  description: 'Descubre y contrata los servicios de artistas independientes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      {children}
    </AppProviders>
  );
}
