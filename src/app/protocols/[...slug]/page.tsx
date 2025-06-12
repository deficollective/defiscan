// import { Metadata } from "next";
import {
  reviews as allReviews,
  protocols as allProtocols,
} from "#site/content";
import { BigPizzaRosette } from "@/components/rosette/big-rosette";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { cn, getProtocolDisplayName } from "@/lib/utils";
import { getRiskDescriptions } from "@/components/rosette/data-converter/data-converter";
import { Mdx } from "@/components/mdx-component";
import { ProtocolLinks } from "@/components/protocol/links";
import { ReviewTimeline } from "@/components/protocol/timeline";
import { Separator } from "@/components/ui/separator";
import { Stage } from "@/lib/types";
import { StageBadge } from "@/components/stage";
import { TooltipProvider } from "@/components/rosette/tooltip/tooltip";
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

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] };
// }): Promise<Metadata> {
//   const protocol = await getProtocolFromParams(params.slug);

//   if (!protocol) {
//     return {
//       title: "Protocol not found",
//       description: "Protocol details could not be found.",
//     };
//   }

//   return {
//     title: protocol.protocol,
//     description: "DeFi Scan decentralization report for " + protocol.protocol,
//     authors: {
//       name: protocol.author!.join(", "),
//     },
//   };
// }

export default async function ProtocolPageItem({
  params,
}: ProtocolPageItemProps) {
  const protocol = await getProtocolFromParams(params.slug);
  if (!protocol) {
    return <div>Protocol not found</div>; // Handle not found case
  }

  return (
    <article className="container relative mx-auto py-6 lg:py-10 max-w-7xl">
      <div>
        <div className="grid gap-2 grid-cols-4 lg:grid-rows-1">
          <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col w-full gap-2">
              <div className="flex items-end gap-4 py-2">
                <h1 className="text-3xl shrink-0 text-primary">
                  {getProtocolDisplayName(protocol.protocol || 'Unknown Protocol', protocol.instance)}
                </h1>
              </div>
            </div>
            <div className="mt-auto" />

            <Separator className="w-full mt-2 mb-2" />
            <StageBadge
              stage={protocol.stage! as Stage}
              className="h-8 mb-2"
              reasons={protocol.reasons}
            />
            <ProtocolLinks protocol={protocol} />
          </div>
          <ReviewTimeline
            className="col-span-full lg:col-span-2"
            protocol={protocol}
          />
          <div className="flex flex-col gap-2 row-start-2 col-span-full sm:col-start-3 sm:row-start-1 sm:col-span-2 lg:col-span-1 lg:col-start-4">
            <Card className="h-full flex items-center justify-center">
              <CardContent className="pb-0 flex justify-center">
                <TooltipProvider>
                  <BigPizzaRosette
                    values={getRiskDescriptions(protocol.risks!)}
                  />
                </TooltipProvider>
              </CardContent>
            </Card>
          </div>
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
