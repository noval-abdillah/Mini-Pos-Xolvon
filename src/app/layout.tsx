import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini POS - Xolvon Project",
  description: "Aplikasi Point of Sale sederhana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-[#F9FAFB] text-[#111827]`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
