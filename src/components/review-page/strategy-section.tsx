import { SectionCard } from "./section-card";
import { VaultChart } from "./vault-chart";
import { DynamicContentList } from "./dynamic-content-block";
import type { ReviewSectionConfig, VaultData } from "@/lib/review-page/types";

interface StrategySectionProps {
  config: ReviewSectionConfig;
  vault: VaultData;
  data: Record<string, string | number>;
}

export function StrategySection({
  config,
  vault,
  data,
}: StrategySectionProps) {
  return (
    <SectionCard title={config.title} description={config.description}>
      <VaultChart data={vault} className="mb-6" />
      <div className="space-y-6">
        {config.subsections.map((sub, i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold mb-2">{sub.title}</h3>
            <DynamicContentList blocks={sub.content} data={data} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
