import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. IMPORT DU PROVIDER (Attention au chemin ../src)
import { LanguageProvider } from "../src/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skin AI",
  description: "Dermatology AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. ON ENVELOPPE TOUT LE SITE ICI */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}