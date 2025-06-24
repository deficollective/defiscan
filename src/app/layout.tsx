import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import App from "@/components/app";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: {
    template: "%s | DeFiScan",
    default: "DeFiScan - DeFi Protocol Decentralization Analysis",
  },
  description: "Comprehensive DeFi protocol analysis platform. Track decentralization stages and transparency across DeFi protocols on multiple blockchains.",
  keywords: ["DeFi", "decentralization", "protocol analysis", "blockchain", "smart contracts", "DeFi transparency"],
  metadataBase: new URL("https://defiscan.info"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased font-lexend bg-background",
          lexend.variable
        )}
      >
        <App>{children}</App>
      </body>
    </html>
  );
}
