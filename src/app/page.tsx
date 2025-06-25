import React from "react";
import Table from "@/components/table/page";
import { TVLCoverageComponent } from "@/components/tvl-coverage";
import { CombinedStageChart } from "@/components/stage-distribution";
import { ChainCoverageComponent } from "@/components/chain-coverage";

export default function Home() {
  return (
    <section className="mx-auto pb-8 md:pb-12 md:pt-10 lg:py-10">
      <div className="container mt-6 flex max-w-5xl flex-col gap-10 text-left xl:mt-0">
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
        <p className="text-sm text-gray-500 -mt-6">TVL Data source: DefiLlama</p>
        
        <div className="mb-32">
          <Table />
        </div>
      </div>
    </section>
  );
}
