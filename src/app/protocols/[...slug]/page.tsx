"use client";

import { Metadata } from "next";
import {
  reviews as allReviews,
  protocols as allProtocols,
} from "#site/content";
import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx-component";
import {
  ChevronDown,
  ChevronLeft,
  ExternalLink,
  Globe,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { BigPizzaRosette } from "@/components/rosette/big-rosette";
import { getRiskDescriptions } from "@/components/rosette/data-converter/data-converter";
import { TooltipProvider } from "@/components/rosette/tooltip/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";
import { StageBadge } from "@/components/stage";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

const ProtocolLinks = ({ protocol }: { protocol: any }) => {
  console.log("pc:: ", protocol.chains);
  return (
    <div className="flex flex-col gap-1">
      <Button variant="outline" size="sm" asChild className="border-border">
        <a target="_blank" rel="noopener noreferrer" href={protocol.website}>
          <Globe className="w-4 h-4 mr-2" />
          Website
          <ExternalLink className="w-3 h-3 ml-auto " />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-border">
            <Waypoints className="w-4 h-4 mr-2" /> Socials
            <ChevronDown className="w-3 h-3 ml-auto " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48 w-full">
          <DropdownMenuItem>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={protocol.socials.x}
              className="flex items-center "
            >
              <FaXTwitter className="w-4 h-4 mr-2" /> @
              {protocol.socials.x?.replace("https://x.com/", "")}
              <ExternalLink className="w-3 h-3 ml-4" />
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-border">
            <FaGithub className="w-4 h-4 mr-2" /> Github
            <ChevronDown className="w-3 h-3 ml-auto " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48 w-full">
          {protocol.github!.map((slug: string, index: number) => (
            <DropdownMenuItem key={index}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`
                          ${slug}`}
                className="w-full flex justify-between items-center"
              >
                {slug}
                <ExternalLink className="w-3 h-3 ml-4" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-border">
            DefiLlama
            <ChevronDown className="w-3 h-3 ml-auto " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48 w-full">
          {protocol.defillama_slug!.map((slug: string, index: number) => (
            // TODO: create a proper defillama link
            <DropdownMenuItem key={index}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`
                        ${slug}`}
                className="flex items-center justify-between w-full"
              >
                {slug}
                <ExternalLink className="w-3 h-3 ml-4" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-border">
            {protocol.chain}
            <ChevronDown className="w-3 h-3 ml-auto " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48 w-full">
          {protocol.chains.map((c: string, i: number) => (
            <DropdownMenuItem key={`chain-${i}`} asChild>
              <Link href={`/protocols/${protocol.id}/${c.toLowerCase()}`}>
                {c}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ReviewTimeline = ({
  protocol,
  className,
}: {
  protocol: any;
  className: string;
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>Review Timeline</CardHeader>
      <CardContent>
        <div className="flex flex-col justify-end">
          <ul className="font-mono text-xs list-disc list-inside pb-4">
            <li>
              This review has been submitted by {protocol.author!.join(", ")} on{" "}
              {protocol.submission_date!.split("T")[0]}.
            </li>
            <li>
              It was reviewed and published by the DeFi Collective team on{" "}
              {protocol.publish_date!.split("T")[0]}.
            </li>
            <li>
              {protocol.update_date!.split("T")[0] === "1970-01-01"
                ? "The review has not been updated since the initial submission"
                : "The last update to the review was made on " +
                  protocol.update_date!.split("T")[0]}
              .
            </li>

            {/* 
            <li>
              This review has been submitted by {protocol.author!.join(", ")} on{" "}
              {protocol.submission_date!.split("T")[0]}.
            </li>
            <li>
              It was reviewed and published by the DeFi Collective team on{" "}
              {protocol.publish_date!.split("T")[0]}.
            </li>
            <li>
              The {protocol.protocol} team has{" "}
              {protocol.submission_date!.split("T")[0] === "1970-01-01"
                ? "NOT acknowledged the review"
                : "acknowledged the review on " +
                  protocol.acknowledge_date!.split("T")[0]}
              .
            </li>
            <li>
              {protocol.update_date!.split("T")[0] === "1970-01-01"
                ? "The review has not been updated since the initial submission"
                : "The last update to the review was made on " +
                  protocol.update_date!.split("T")[0]}
              .
            </li> */}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          This content is provided "as is" and "as available". Read more in our
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"../../terms"}
            className="text-blue-500 hover:underline"
          >
            {" "}
            Terms
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default async function ProtocolPageItem({
  params,
}: ProtocolPageItemProps) {
  const protocol = await getProtocolFromParams(params.slug);

  if (!protocol) {
    return <div>Protocol not found</div>; // Handle not found case
  }

  return (
    <article className="container relative mx-auto py-6 lg:py-10">
      <div>
        <div className="grid gap-2 grid-cols-4 lg:grid-rows-1">
          <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col w-full gap-2">
              <div className="flex items-end gap-4 py-2">
                {/* <div className="w-10 h-10 aspect-square border "></div> */}
                <h1 className="text-3xl shrink-0 text-primary">
                  {protocol.protocol}
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
