import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import App from "@/components/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next"

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: {
    template: "%s | DeFiScan",
    default: "DeFiScan",
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
          "min-h-screen antialiased font-lexend bg-background",
          lexend.variable
        )}
      >
        <App>{children}</App>
        <Analytics /> {/* Vercel Analytics */}
      </body>
    </html>
  );
}
