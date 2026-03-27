import { Badge } from "@/components/ui/badge";

interface ReviewHeaderProps {
  tokenName: string;
  protocolName: string;
  chain: string;
  address?: string;
}

export function ReviewHeader({
  tokenName,
  protocolName,
  chain,
  address,
}: ReviewHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {tokenName}
      </h1>
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg text-muted-foreground">{protocolName}</span>
        <Badge variant="outline">{chain}</Badge>
      </div>
      {address && (
        <div className="mt-1">
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary font-mono transition-colors"
          >
            {address}
          </a>
        </div>
      )}
    </div>
  );
}
