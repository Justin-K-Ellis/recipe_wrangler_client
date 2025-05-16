// "use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import { useState } from "react";

import Header from "./components/Header";
// import AuthContext from "./auth/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Wrangler",
  description: "Move through recipes with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [authState, setAuthState] = useState(null);

  return (
    <html lang="en" data-theme="cmyk" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {/* <AuthContext.Provider value={{ authState, setAuthState }}> */}
        <Header />
        {children}
        {/* </AuthContext.Provider> */}
      </body>
    </html>
  );
}
