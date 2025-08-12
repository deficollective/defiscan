'use client';

import React, { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChainTvlData, defiLlama } from '@/services/defillama';

const chartConfig = {
  tvl: {
    label: 'TVL',
    color: '#7c22b2',
  },
} satisfies ChartConfig;

type ChartProps = {
  className?: string;
};

const Chart: React.FC<ChartProps> = ({ className }) => {
  const [data, setData] = useState<ChainTvlData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await defiLlama.getHistoricalChainTvl();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Card className={'w-2/3' + className}>
      <CardHeader>
        <div className="-mt-4 -mb-">
          <CardDescription>Total Value Locked (TVL) in DeFi</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value * 1000);
                return date.toLocaleDateString('en-US');
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="tvl" fill={`var(--color-tvl)`} stroke={`var(--color-tvl)`} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
