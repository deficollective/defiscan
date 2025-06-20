import * as data from "#site/content";
import { defiLlama } from "@/services/defillama";
import { Project } from "../types";

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