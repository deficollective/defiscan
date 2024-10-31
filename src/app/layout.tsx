import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import App from "@/components/app";
import Head from "next/head";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
const airnt = localFont({
  src: "../fonts/Airnt.ttf",
  variable: "--font-airnt",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | DeFi Scan",
    default: "DeFi Scan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* You can also specify other sizes or formats if needed */}
        <link rel="icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" sizes="16x16" href="/favicon.ico" />
      </Head>
      <body
        className={cn(
          "min-h-screen antialiased font-airnt bg-background",
          airnt.variable
        )}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
