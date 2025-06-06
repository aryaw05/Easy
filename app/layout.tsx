"use client";

import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import "../lib/icon/font_awesome";
// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  const pathname = usePathname();
  const disabledNavbar = ["/login", "/register", "/blog-write/editor"];
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <SessionProvider session={session}>
          <div>
            {!disabledNavbar?.includes(pathname) && <Navbar />}
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
