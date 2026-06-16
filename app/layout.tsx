import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import InteractiveNetworkBackground from "@/components/background/InteractiveNetworkBackground";
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
  title: "Diego Javier van den Hoeven | Data Science & AI",
  description:
    "Data Science & AI student building machine learning systems, data pipelines, and interactive visualization.",
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
      <body className="min-h-full font-sans">
        <InteractiveNetworkBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
