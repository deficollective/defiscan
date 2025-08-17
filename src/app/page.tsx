import React from "react";
import Table from "@/components/table/page";
import { TVLCoverageComponent } from "@/components/tvl-coverage";
import { CombinedStageChart } from "@/components/stage-distribution";
import { ChainCoverageComponent } from "@/components/chain-coverage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeFiScan - Transparency on Decentralization in DeFi",
  description:
    "Comprehensive DeFi protocol analysis platform. Track decentralization stagesand transparency across DeFi protocols on Ethereum, Base, and other chains. Real-time DeFi transparency data.",
  keywords: [
    "DeFi",
    "Scan",
    "DeFiScan",
    "decentralization",
    "protocol analysis",
    "TVL",
    "blockchain",
    "Ethereum",
    "DeFi stages",
    "DeFi transparency",
    "DeFi protocols",
    "Permissions",
  ],
  openGraph: {
    title: "DeFiScan - DeFi Protocol Decentralization Analysis",
    description:
      "Track decentralization progress of DeFi protocols. View stages, TVL, security scores, and infrastructure analysis across multiple blockchains.",
    url: "https://defiscan.info",
    siteName: "DeFiScan",
    type: "website",
    images: [
      {
        url: "https://defiscan.info/images/logo.png",
        width: 800,
        height: 600,
        alt: "DeFiScan - DeFi Protocol Analysis Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeFiScan - DeFi Protocol Decentralization Analysis",
    description:
      "Track decentralization progress of DeFi protocols. View stages, TVL, security scores, and infrastructure analysis.",
    images: ["https://defiscan.info/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <section className="mx-auto pb-8 md:pb-12 md:pt-10 lg:py-10">
      <div className="container mt-2 flex max-w-5xl flex-col gap-10 text-left xl:mt-0">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
          Transparency on Decentralization in DeFi
        </h1>
        <div className="flex flex-col w-full my-2 lg:flex-row gap-4">
          {/* Main Coverage Component */}
          <TVLCoverageComponent className="w-full lg:w-2/3" />

          {/* Right Side Components Grid */}
          <div className="flex flex-col w-full lg:w-1/3 gap-4">
            <CombinedStageChart className="w-full" />
            <ChainCoverageComponent className="w-full" />
          </div>
        </div>

        <div className="mb-32">
          <Table />
        </div>

        <p className="text-sm text-gray-500 -mt-6">
          TVL Data source: DefiLlama
        </p>
      </div>
    </section>
  );
}
