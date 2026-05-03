import { ReviewApiData, CollateralData } from "@/lib/review-page/types";

const MOCK_DATA: Record<string, ReviewApiData> = {
  "liquity-v2": {
    protocolSlug: "liquity-v2",
    tokenName: "BOLD",
    tokenSymbol: "BOLD",
    collaterals: {
      totalValue: 38_100_000,
      categories: [
        { name: "Native ETH", value: 8_700_000, color: "#627EEA" },
        { name: "WstETH", value: 24_000_000, color: "#00A3FF" },
        { name: "rETH", value: 5_400_000, color: "#E8663D" },
      ],
      assets: [
        {
          name: "ETH",
          value: 8_700_000,
          color: "url(#metallic-eth)",
          category: "Native ETH",
        },
        {
          name: "WstETH",
          value: 24_000_000,
          color: "url(#metallic-wsteth)",
          category: "WstETH",
        },
        {
          name: "rETH",
          value: 5_400_000,
          color: "url(#metallic-reth)",
          category: "rETH",
        },
      ],
    },
    data: {
      totalCollateralValue: "$38.1M",
      ethCollateralValue: "$8.7M",
      ethCollateralPct: "22.8%",
      wstethCollateralValue: "$24M",
      wstethCollateralPct: "63.0%",
      rethCollateralValue: "$5.4M",
      rethCollateralPct: "14.2%",
      totalCollateralValueRaw: 38_100_000,
      ethCollateralValueRaw: 8_700_000,
      wstethCollateralValueRaw: 24_000_000,
      rethCollateralValueRaw: 5_400_000,
      stabilityPoolSize: "$25M",
      totalTroves: "3,241",
    },
  },
  "steakhouse-usdc": {
    protocolSlug: "steakhouse-usdc",
    tokenName: "Steakhouse USDC",
    tokenSymbol: "steakUSDC",
    vault: {
      totalAllocation: 325_860_000,
      markets: [
        {
          name: "cbBTC/USDC",
          allocation: 223_070_000,
          supplyCap: 999_910_000,
          apy: 3.13,
          color: "url(#metallic-cbbtc)",
          lltv: "86%",
        },
        {
          name: "WBTC/USDC",
          allocation: 80_830_000,
          supplyCap: 199_980_000,
          apy: 3.1,
          color: "url(#metallic-wbtc)",
          lltv: "86%",
        },
        {
          name: "wstETH/USDC",
          allocation: 21_960_000,
          supplyCap: 199_980_000,
          apy: 3.42,
          color: "url(#metallic-wsteth-vault)",
          lltv: "86%",
        },
        {
          name: "WETH/USDC",
          allocation: 8_150_000,
          supplyCap: 199_980_000,
          apy: 2.88,
          color: "url(#metallic-weth)",
          lltv: "86%",
        },
      ],
    },
    data: {
      totalAllocation: "$325.9M",
      cbbtcAllocation: "$223.07M",
      cbbtcAllocationPct: "68.5%",
      cbbtcSupplyCap: "$999.91M",
      cbbtcApy: "3.13%",
      wbtcAllocation: "$80.83M",
      wbtcAllocationPct: "24.8%",
      wbtcSupplyCap: "$199.98M",
      wbtcApy: "3.10%",
      wstethAllocation: "$21.96M",
      wstethAllocationPct: "6.7%",
      wstethSupplyCap: "$199.98M",
      wstethApy: "3.42%",
      wethAllocation: "$8.15M",
      wethAllocationPct: "2.5%",
      wethSupplyCap: "$199.98M",
      wethApy: "2.88%",
      totalAllocationRaw: 325_860_000,
      cbbtcAllocationRaw: 223_070_000,
      wbtcAllocationRaw: 80_830_000,
      wstethAllocationRaw: 21_960_000,
      wethAllocationRaw: 8_150_000,
      vaultAddress: "0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB",
      owner: "Steakhouse Financial (5-of-8 multisig)",
      curator: "Steakhouse Financial (2-of-5 multisig)",
      allocator: "Steakhouse (1 EOA)",
      guardian: "Aragon DAO",
      ownerTvs: "$325.9M",
      curatorTvs: "$325.9M",
      allocatorTvs: "$325.9M",
      guardianTvs: "$325.9M",
      timelock: "7-day",
    },
  },
};

class ReviewDataService {
  private static instance: ReviewDataService;
  private cache: Map<string, { data: ReviewApiData; timestamp: number }> =
    new Map();
  private CACHE_DURATION = 5 * 60 * 1000;

  private constructor() {}

  public static getInstance(): ReviewDataService {
    if (!ReviewDataService.instance) {
      ReviewDataService.instance = new ReviewDataService();
    }
    return ReviewDataService.instance;
  }

  public async getReviewData(slug: string): Promise<ReviewApiData | null> {
    const cached = this.cache.get(slug);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    // TODO: Replace with real API call
    const data = MOCK_DATA[slug] ?? null;

    if (data) {
      this.cache.set(slug, { data, timestamp: now });
    }

    return data;
  }

  public async getCollateralData(
    slug: string
  ): Promise<CollateralData | null> {
    const data = await this.getReviewData(slug);
    return data?.collaterals ?? null;
  }
}

export const reviewDataService = ReviewDataService.getInstance();
