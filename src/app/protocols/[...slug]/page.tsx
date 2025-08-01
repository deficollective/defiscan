import { Metadata } from "next";
import {
  reviews as allReviews,
  protocols as allProtocols,
} from "#site/content";
import { DimensionBadgesContainer } from "@/components/dimension-badges-container";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { cn, getProtocolDisplayName } from "@/lib/utils";
import { getRiskDescriptions } from "@/components/rosette/data-converter/data-converter";
import { Mdx } from "@/components/mdx-component";
import { ProtocolLinks } from "@/components/protocol/links";
import { RotatingText } from "@/components/rotating-text";
import { Separator } from "@/components/ui/separator";
import { Stage } from "@/lib/types";
import { StageBadge } from "@/components/stage";
import { StageProgressBar } from "@/components/stage-progress-bar";
import { StageRequirements } from "@/components/stage-requirements";
import Link from "next/link";

import "@/styles/mdx.css";

interface ProtocolPageItemProps {
  params: {
    slug: string[];
  };
}

async function getProtocolFromParams(slug: string[]) {
  const id = slug[0];
  const protocol = allProtocols.find((p) => p.id === id);

  const reviewSlug = slug.join("/");
  const review = allReviews.find((r) => r.slugAsParams === reviewSlug);
  const chains = allReviews
    .filter((r) => r.slugAsParams.includes(id))
    .map((r) => r.chain);

  return { ...protocol, ...review, chains };
}

export async function generateStaticParams(): Promise<
  ProtocolPageItemProps["params"][]
> {
  return allReviews.map((review) => ({
    slug: review.slugAsParams.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const protocol = await getProtocolFromParams(params.slug);

  if (!protocol) {
    return {
      title: "Protocol not found | DeFiScan",
      description: "The requested DeFi protocol analysis could not be found. Browse our database of DeFi protocols and their decentralization stages.",
      openGraph: {
        title: "Protocol not found | DeFiScan",
        description: "The requested DeFi protocol analysis could not be found.",
        url: "https://defiscan.info",
        siteName: "DeFiScan",
        type: "website",
      },
    };
  }

  const stageName = protocol.stage === 0 ? "Stage 0" : 
                   protocol.stage === 1 ? "Stage 1" : 
                   protocol.stage === 2 ? "Stage 2" : 
                   protocol.stage === "R" ? "Review" : 
                   protocol.stage === "O" ? "Others" : 
                   protocol.stage?.toString().startsWith("I") ? `Infrastructure ${protocol.stage}` : 
                   `Stage ${protocol.stage}`;

  const chainText = protocol.chain ? ` on ${protocol.chain}` : "";

  return {
    title: `${protocol.protocol} Analysis - ${stageName} | DeFiScan`,
    description: `Comprehensive decentralization analysis of ${protocol.protocol}${chainText}. Current stage: ${stageName}. View security assessment, infrastructure details, and risk analysis.`,
    keywords: [
      protocol.protocol,
      "DeFi",
      "decentralization",
      "centralization", 
      "protocol analysis",
      stageName,
      protocol.chain,
      "Protocol Permissions",
      "DeFi stages"
    ].filter((keyword): keyword is string => Boolean(keyword)),
    authors: protocol.author ? {
      name: protocol.author.join(", "),
    } : undefined,
    openGraph: {
      title: `${protocol.protocol} - ${stageName} Analysis | DeFiScan`,
      description: `Detailed decentralization analysis of ${protocol.protocol}${chainText}. Stage: ${stageName}. Centralization assessment and infrastructure review.`,
      url: `https://defiscan.info/protocols/${params.slug.join("/")}`,
      siteName: "DeFiScan",
      type: "article",
      images: [
        {
          url: "https://defiscan.info/images/logo.png",
          width: 800,
          height: 600,
          alt: `${protocol.protocol} DeFi Protocol Analysis`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${protocol.protocol} - ${stageName} Analysis`,
      description: `Decentralization analysis: ${stageName} on ${chainText}. View full security assessment on DeFiScan.`,
      images: ["https://defiscan.info/images/logo.png"],
    },
  };
}

export default async function ProtocolPageItem({
  params,
}: ProtocolPageItemProps) {
  const protocol = await getProtocolFromParams(params.slug);
  if (!protocol) {
    return <div>Protocol not found</div>; // Handle not found case
  }

  return (
    <article className="container relative mx-auto py-6 lg:py-10 max-w-7xl 2xl:max-w-none">
      <div>
        <div className="grid gap-2 grid-cols-4 lg:grid-rows-1">
          <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col w-full gap-2">
              <div className="flex items-end gap-4 py-2">
                <RotatingText
                  text={getProtocolDisplayName(protocol.protocol || 'Unknown Protocol', protocol.instance)}
                  className="text-3xl text-primary shrink-0"
                  speed={4}
                />
              </div>
            </div>
            <div className="mt-auto" />

            <Separator className="w-full mt-2 mb-2" />
            <StageBadge
              stage={protocol.stage! as Stage}
              className="h-8 mb-2 self-start"
              reasons={protocol.reasons}
            />
            <ProtocolLinks protocol={protocol} />
          </div>
          <div className="col-span-full lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4 text-primary">Protocol Decentralization</h2>
                  <StageProgressBar 
                    stage={protocol.stage! as Stage}
                    stage_requirements={protocol.stage_requirements}
                    className="mb-4"
                  />
                  {!protocol.stage!.toString().startsWith("I") && <StageRequirements 
                    stage={protocol.stage! as Stage}
                    stage_requirements={protocol.stage_requirements}
                    className="mt-4 text-left"
                  />}
                </div>
              </CardContent>
            </Card>
          </div>
          {!(typeof protocol.stage === 'string' && protocol.stage.startsWith('I')) && (
            <div className="flex flex-col gap-2 row-start-2 col-span-full sm:col-start-3 sm:row-start-1 sm:col-span-2 lg:col-span-1 lg:col-start-4">
              <Card className="h-full">
                <CardContent className="p-0 w-full h-full">
                  <div className="text-center" style={{ marginLeft: '2px', marginRight: '2px' }}>
                    <h2 className="text-xl font-semibold mb-4 text-primary mt-6">Risk Areas</h2>
                    <DimensionBadgesContainer
                      values={getRiskDescriptions(protocol.risks!)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-12">
          <Mdx code={protocol.body!} />
        </div>
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 size-4" />
            See all Protocols
          </Link>
        </div>
      </div>
    </article>
  );
}
