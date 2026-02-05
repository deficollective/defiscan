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
        { name: "WstETH", value: 24_000_000, color: "#8A92B2" },
        { name: "rETH", value: 5_400_000, color: "#E8663D" },
      ],
      assets: [
        {
          name: "ETH",
          value: 8_700_000,
          color: "#627EEA",
          category: "Native ETH",
        },
        {
          name: "WstETH",
          value: 24_000_000,
          color: "#8A92B2",
          category: "WstETH",
        },
        {
          name: "rETH",
          value: 5_400_000,
          color: "#E8663D",
          category: "rETH",
        },
      ],
    },
    metrics: {
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
