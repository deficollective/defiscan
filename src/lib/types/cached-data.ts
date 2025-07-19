export interface CachedProtocolData {
  id: string;
  protocol: string;
  type: string;
  logo: string;
  tvl: number;
  chainTvls: Record<string, number>;
  defillama_slugs: string[];
}

export interface CachedDataFile {
  generatedAt: string;
  protocolCount: number;
  protocols: CachedProtocolData[];
}