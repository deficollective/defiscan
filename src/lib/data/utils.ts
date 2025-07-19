import * as data from "#site/content";
import { defiLlama } from "@/services/defillama";
import { Project } from "../types";
import { CachedDataFile } from "../types/cached-data";
import cachedProtocolData from "./cached-protocol-data.json";

export function loadReviews() {
    const protocols = data.protocols.map((protocol) => {
        // Find cached data for this protocol
        const typedCachedData = cachedProtocolData as CachedDataFile;
        const cachedData = typedCachedData.protocols.find(p => p.id === protocol.id);
        
        const reviews = data.reviews
            .filter(r => r.slug.split("/")[1] === protocol.id)
            .map(r => {
                // Force TVL to "n/a" for specific Aave instances
                if (protocol.id === "aave" && (r.instance === "EtherFi" || r.instance === "Prime")) {
                    return {tvl: "n/a" as const, ...r};
                }

                // Use cached TVL data if available
                if (cachedData && cachedData.chainTvls && r.chain in cachedData.chainTvls) {
                    return {tvl: cachedData.chainTvls[r.chain], ...r};
                }

                // Fallback to 0 if no cached data
                return {tvl: 0, ...r};
            });

        // Use cached data for immediate loading
        const totalTvl = reviews.reduce((sum, review) => {
            return sum + (review.tvl === "n/a" ? 0 : review.tvl);
        }, 0);

        return {
            ...protocol,
            tvl: totalTvl,
            type: cachedData?.type || "",
            logo: cachedData?.logo || "/images/placeholder.png",
            reviews,
            isLoading: false // Data is immediately available from cache
        } as Project & { isLoading: boolean };
    });

    return protocols;
}

export async function loadReviewsWithTvl() {
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
            reviews,
            isLoading: false
        } as Project & { isLoading: boolean };
    });

    return protocols;
}