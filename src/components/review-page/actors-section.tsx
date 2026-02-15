import { SectionCard } from "./section-card";
import { DynamicContentList } from "./dynamic-content-block";
import type { ReviewSectionConfig } from "@/lib/review-page/types";

interface ActorsSectionProps {
  config: ReviewSectionConfig;
  data: Record<string, string | number>;
}

export function ActorsSection({ config, data }: ActorsSectionProps) {
  return (
    <SectionCard title={config.title} description={config.description}>
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
