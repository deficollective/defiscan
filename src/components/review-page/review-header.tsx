import { Badge } from "@/components/ui/badge";

interface ReviewHeaderProps {
  tokenName: string;
  protocolName: string;
  chain: string;
}

export function ReviewHeader({
  tokenName,
  protocolName,
  chain,
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
    </div>
  );
}
