// DeFiLlama API Type
export interface Protocol {
  slug: string;
  tvl: number;
  logo: string;
  category: string;
  name: string;
  chains: string[];
  chainTvls: ChainTvls;
}

interface ChainTvls {
  [chainName: string]: number;
}

export interface ChainTvlData {
  date: number;
  tvl: number;
}

class DeFiLlamaService {
  private readonly BASE_URL = "https://api.llama.fi";

  // Singleton pattern
  private static instance: DeFiLlamaService;

  private constructor() {}

  public static getInstance(): DeFiLlamaService {
    if (!DeFiLlamaService.instance) {
      DeFiLlamaService.instance = new DeFiLlamaService();
    }
    return DeFiLlamaService.instance;
  }

  // Generic fetch method with error handling
  private async fetch<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error(`Error fetching from DeFiLlama API: ${error}`);
      throw error;
    }
  }

  // Get all protocols
  public async getProtocols(): Promise<Protocol[]> {
    return this.fetch<Protocol[]>("/protocols");
  }

  // Get historical TVL data
  public async getHistoricalChainTvl(
    startTimestamp: number = 1577833200 // Default to Jan 1, 2020
  ): Promise<ChainTvlData[]> {
    const data = await this.fetch<ChainTvlData[]>("/v2/historicalChainTvl");
    return data.filter((x) => x.date > startTimestamp);
  }

  // Get TVL for specific protocol
  public async getProtocolTvl(slug: string): Promise<number> {
    const data = await this.fetch<Protocol>(`/protocol/${slug}`);
    return data.tvl;
  }

  // Get protocol data with caching
  private cache: Map<string, { data: Protocol[]; timestamp: number }> =
    new Map();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  public async getProtocolsWithCache(): Promise<Protocol[]> {
    const cached = this.cache.get("protocols");
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    const data = await this.getProtocols();
    this.cache.set("protocols", { data, timestamp: now });
    return data;
  }
}

// Export singleton instance
export const defiLlama = DeFiLlamaService.getInstance();
