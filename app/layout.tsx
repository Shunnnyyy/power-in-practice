import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Power in Practice | Everyday Electricity Notes",
  description:
    "A Toronto-based personal study of electricity habits, night photography, public data, and the small systems behind everyday power use.",
  openGraph: {
    title: "Power in Practice",
    description:
      "Looking at everyday electricity through field photography, pricing data, and small practical experiments.",
    url: "https://power-in-practice.vercel.app",
    siteName: "Power in Practice",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
