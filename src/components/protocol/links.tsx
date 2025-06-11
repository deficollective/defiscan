import { ChevronDown, ExternalLink, Globe, Waypoints } from "lucide-react";
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

export const ProtocolLinks = ({ protocol }: { protocol: any }) => {
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
