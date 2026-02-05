import { ReviewHeader } from "./review-header";
import { CollateralsSection } from "./collaterals-section";
import { DependenciesSection } from "./dependencies-section";
import { ActorsSection } from "./actors-section";
import { CodeAuditsSection } from "./code-audits-section";
import type { ReviewConfig, ReviewApiData } from "@/lib/review-page/types";

interface ReviewPageLayoutProps {
  config: ReviewConfig;
  apiData: ReviewApiData;
}

export function ReviewPageLayout({ config, apiData }: ReviewPageLayoutProps) {
  return (
    <div className="space-y-8">
      <ReviewHeader
        tokenName={config.tokenName}
        protocolName={config.protocolName}
        chain={config.chain}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <CollateralsSection
          config={config.sections.collaterals}
          collaterals={apiData.collaterals}
          metrics={apiData.metrics}
        />

        <div className="space-y-8">
          <DependenciesSection
            config={config.sections.dependencies}
            metrics={apiData.metrics}
          />

          <ActorsSection
            config={config.sections.actors}
            metrics={apiData.metrics}
          />
        </div>
      </div>

      <CodeAuditsSection
        config={config.sections.codeAndAudits}
        metrics={apiData.metrics}
      />
    </div>
  );
}
