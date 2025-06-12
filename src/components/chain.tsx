import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const chains = {
  Ethereum: {
    logo: "https://icons.llamao.fi/icons/chains/rsz_ethereum?w=48&h=48",
    fallback: "ETH",
    alt: "Ethereum Logo",
  },
  Base: {
    logo: "https://icons.llamao.fi/icons/chains/rsz_base?w=48&h=48",
    fallback: "BS",
    alt: "Base Logo",
  },
  Optimism: {
    logo: "https://icons.llamao.fi/icons/chains/rsz_optimism?w=48&h=48",
    fallback: "OP",
    alt: "Optimism Logo",
  },
  Arbitrum: {
    logo: "https://icons.llamao.fi/icons/chains/rsz_arbitrum?w=48&h=48",
    fallback: "ARB",
    alt: "Arbitrum Logo",
  },
  Polygon: {
    logo: "https://icons.llamao.fi/icons/chains/rsz_polygon?w=48&h=48",
    fallback: "POL",
    alt: "Polygon Logo",
  },
};

export type ChainNames = keyof typeof chains;

export const Chain = ({
  name,
  className,
}: {
  name: ChainNames;
  className?: string;
}) => {
  const chain = chains[name];

  return (
    <Avatar
      className={cn("w-6 h-6 flex items-center justify-center", className)}
    >
      <AvatarImage src={chain.logo} alt={chain.alt} />
      <AvatarFallback>{chain.fallback}</AvatarFallback>
    </Avatar>
  );
};
