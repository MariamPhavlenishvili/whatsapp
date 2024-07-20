import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatsApp | Secure and Reliable Free Private Messaging and Calling",
  description: `Text between different phones is broken.
     Messy likes, blurry photos and risky security. 
     But there’s a solution to end this cross-device drama. 
     Switch to WhatsApp to message seamlessly and privately with friends and family, on any device.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <link rel="icon" href="/icons/whatsapp.svg" sizes="32x32" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
