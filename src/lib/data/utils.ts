import * as data from "#site/content";
import { defiLlama, ChainTvlData } from "@/services/defillama";
import { Project } from "../types";
import { Stage } from "../types";

export async function loadReviews() {
    // TODO: This is fetching all the protocols. only fetch the ones we need...
    const apiData = await defiLlama.getProtocolsWithCache();

    const protocols = data.protocols.map((protocol) => {

        const defillama_data = protocol.defillama_slug.map(slug => {
            const res = apiData.find(d => d.slug == slug);

            return res;
        });

        let protocol_tvl = 0;

        const reviews = data.reviews
            .filter(r => r.slug.split("/")[1] === protocol.id)
            .map(r => {
                // Force TVL to "n/a" for specific Aave instances
                if (protocol.id === "aave" && (r.instance === "EtherFi" || r.instance === "Prime")) {
                    return {tvl: "n/a" as const, ...r};
                }

                // Add TVL for each chain.
                const tvl = defillama_data
                    .map(d => d?.chainTvls?.[r.chain] ?? 0)
                    .reduce((a, b) => a + b, 0)

                // Add chain tvl to protocol total tvl
                protocol_tvl += tvl;

                return {tvl, ...r};
            });

        let type = defillama_data[0]?.category || "";
        let logo = defillama_data[0]?.logo || reviews[0]?.logo || "";

        return {
            ...protocol,
            tvl: protocol_tvl,
            type,
            logo,
            reviews
        } as Project;
    });

    return protocols;
}

export interface TvlByStageData {
  date: number;
  stage0: number;
  stage1: number;
  stage2: number;
  other: number;
}

export async function loadHistoricalTvlByStage(): Promise<TvlByStageData[]> {
  // Get historical chain TVL data
  const historicalData = await defiLlama.getHistoricalChainTvl();
  
  // Get current projects with their stages and TVL
  const projects = await loadReviews();
  
  // Calculate total TVL from all tracked projects
  const totalTrackedTvl = projects.reduce((sum, project) => {
    return sum + (typeof project.tvl === 'number' ? project.tvl : 0);
  }, 0);
  
  // Map historical data to include stage breakdown
  return historicalData.map((dataPoint) => {
    const totalTvl = dataPoint.tvl;
    
    // If we have no tracked projects, treat all as "other"
    if (totalTrackedTvl === 0) {
      return {
        date: dataPoint.date,
        stage0: 0,
        stage1: 0,
        stage2: 0,
        other: totalTvl
      };
    }
    
    // Calculate the proportion of tracked vs untracked TVL
    const trackedProportion = Math.min(totalTrackedTvl / totalTvl, 1);
    const untrackedTvl = totalTvl * (1 - trackedProportion);
    
    // Calculate TVL by stage based on current project distribution
    let stage0Tvl = 0;
    let stage1Tvl = 0;
    let stage2Tvl = 0;
    
    projects.forEach(project => {
      if (typeof project.tvl !== 'number') return;
      
      // Use the highest stage among all reviews for this project
      const stages = project.reviews.map(r => r.stage).filter(s => s !== undefined);
      if (stages.length === 0) return;
      
      // Get the highest numeric stage (excluding infrastructure stages)
      const numericStages = stages
        .map(stage => {
          if (typeof stage === 'string' && stage.startsWith('I')) {
            return parseInt(stage.slice(1)); // I0 -> 0, I1 -> 1, I2 -> 2
          }
          return typeof stage === 'number' ? stage : 0;
        })
        .filter(s => !isNaN(s));
      
      const highestStage = numericStages.length > 0 ? Math.max(...numericStages) : 0;
      
      // Calculate this project's historical TVL proportion
      const projectProportion = project.tvl / totalTrackedTvl;
      const projectHistoricalTvl = totalTvl * trackedProportion * projectProportion;
      
      // Add to appropriate stage bucket
      if (highestStage === 0) {
        stage0Tvl += projectHistoricalTvl;
      } else if (highestStage === 1) {
        stage1Tvl += projectHistoricalTvl;
      } else if (highestStage === 2) {
        stage2Tvl += projectHistoricalTvl;
      }
    });
    
    return {
      date: dataPoint.date,
      stage0: stage0Tvl,
      stage1: stage1Tvl,
      stage2: stage2Tvl,
      other: untrackedTvl
    };
  });
}