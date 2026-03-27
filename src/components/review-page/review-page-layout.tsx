import { ReviewHeader } from "./review-header";
import { CollateralsSection } from "./collaterals-section";
import { StrategySection } from "./strategy-section";
import { DependenciesSection } from "./dependencies-section";
import { ActorsSection } from "./actors-section";
import { PermissionsSection } from "./permissions-section";
import { CodeAuditsSection } from "./code-audits-section";
import type {
  ReviewConfig,
  ReviewApiData,
  StablecoinSections,
  VaultSections,
} from "@/lib/review-page/types";
import { isVaultReview } from "@/lib/review-page/types";

interface ReviewPageLayoutProps {
  config: ReviewConfig;
  apiData: ReviewApiData;
}

export function ReviewPageLayout({ config, apiData }: ReviewPageLayoutProps) {
  const isVault = isVaultReview(config);

  return (
    <div className="space-y-8">
      <ReviewHeader
        tokenName={config.tokenName}
        protocolName={config.protocolName}
        chain={config.chain}
        address={config.address}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          {isVault ? (
            <StrategySection
              config={(config.sections as VaultSections).strategy}
              vault={apiData.vault!}
              data={apiData.data}
            />
          ) : (
            <CollateralsSection
              config={(config.sections as StablecoinSections).collaterals}
              collaterals={apiData.collaterals!}
              data={apiData.data}
            />
          )}

          <DependenciesSection
            config={config.sections.dependencies}
            data={apiData.data}
          />
        </div>

        <div className="space-y-8">
          {isVault && (
            <PermissionsSection
              config={(config.sections as VaultSections).permissions}
              data={apiData.data}
            />
          )}

          {!isVault && (
            <ActorsSection
              config={(config.sections as StablecoinSections).actors}
              data={apiData.data}
            />
          )}

          <CodeAuditsSection
            config={config.sections.codeAndAudits}
            data={apiData.data}
          />
        </div>
      </div>
    </div>
  );
}
