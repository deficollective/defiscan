import { ChevronDown, ExternalLink, Globe, Waypoints, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { ReviewTimeline } from "./timeline";
import { getProtocolDisplayName } from "@/lib/utils";
import { reviews as allReviews } from "#site/content";

export const ProtocolLinks = ({ protocol }: { protocol: any }) => {
  // Get all reviews for this protocol to show proper instance names
  const protocolReviews = allReviews.filter((r) => r.slugAsParams.includes(protocol.id));
  
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
            <Clock className="w-4 h-4 mr-2" /> Review Timeline
            <ChevronDown className="w-3 h-3 ml-auto " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96">
          <ReviewTimeline
            className="border-0 shadow-none"
            protocol={protocol}
          />
        </DropdownMenuContent>
      </DropdownMenu>
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
          {protocol.github?.map((slug: string, index: number) => (
            <DropdownMenuItem key={`github-${index}`}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={slug}
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center">
                  <FaGithub className="w-4 h-4 mr-2" />
                  {slug.replace('https://github.com/', '')}
                </div>
                <ExternalLink className="w-3 h-3 ml-4" />
              </a>
            </DropdownMenuItem>
          ))}
          {protocol.defillama_slug?.map((slug: string, index: number) => (
            <DropdownMenuItem key={`defillama-${index}`}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://defillama.com/protocol/${slug}`}
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {slug}
                </div>
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
          {protocolReviews.map((review, i: number) => (
            <DropdownMenuItem key={`review-${i}`} asChild>
              <Link href={`/protocols/${review.slugAsParams}`}>
                {getProtocolDisplayName(review.chain, review.instance)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
