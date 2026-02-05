import { SectionCard } from "./section-card";
import { ConcentricDonutChart } from "./concentric-donut-chart";
import { DynamicContentList } from "./dynamic-content-block";
import type { ReviewSectionConfig, CollateralData } from "@/lib/review-page/types";

interface CollateralsSectionProps {
  config: ReviewSectionConfig;
  collaterals: CollateralData;
  metrics: Record<string, string | number>;
}

export function CollateralsSection({
  config,
  collaterals,
  metrics,
}: CollateralsSectionProps) {
  return (
    <SectionCard title={config.title} description={config.description}>
      <ConcentricDonutChart data={collaterals} className="mb-6" />
      <div className="space-y-6">
        {config.subsections.map((sub, i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold mb-2">{sub.title}</h3>
            <DynamicContentList blocks={sub.content} metrics={metrics} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
