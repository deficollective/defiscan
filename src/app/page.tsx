import React from "react";
import Chart from "@/components/chart";
import Table from "@/components/table/page";
import { PieChartComponent } from "@/components/pie-charts/piechart";

export default function Home() {
  return (
    <section className="mx-auto pb-8 md:pb-12 md:pt-10 lg:py-10">
      <div className="container mt-6 flex max-w-5xl flex-col gap-10 text-left xl:mt-0">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
          Verifiable insights into the maturity and risks of DeFi
        </h1>
        <div className="flex flex-col w-full my-2 lg:flex-row">
          <Chart className="w-full border border-secondary lg:w-2/3" />

          <div className="flex flex-col w-full lg:w-1/3 mt-4 lg:mt-0">
            <div className="flex flex-row lg:w-full">
              <PieChartComponent
                groupByKey="stage"
                operation="count"
                baseColor="#ae7ef4"
                chartTitle="#Projects by Stage"
                labelValueDescription="Stage-2"
                className="w-1/2"
              />
              <PieChartComponent
                groupByKey="stage"
                operation="sum"
                baseColor="#ae7ef4"
                chartTitle="TVL by Stage"
                labelValueDescription="Total TVL"
                className="w-1/2 lg:mt-0"
              />
            </div>

            <div className="flex flex-row lg:w-full mt-4 md:mt-0">
              <PieChartComponent
                groupByKey="chain"
                operation="count"
                baseColor="#ae7ef4"
                chartTitle="Projects by Chain"
                labelValueDescription="Top Source"
                className="w-1/2"
              />
              <PieChartComponent
                groupByKey="chain"
                operation="sum"
                baseColor="#ae7ef4"
                chartTitle="TVL by Chain"
                labelValueDescription="Most TVL"
                className="w-1/2 lg:mt-0"
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 -mt-10">Data source: DefiLlama</p>
        <div className="mb-32">
          <Table />
        </div>
      </div>
    </section>
  );
}
