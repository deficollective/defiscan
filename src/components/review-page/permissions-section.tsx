"use client";

import { SectionCard } from "./section-card";
import {
  DynamicContentList,
  TagBadge,
  interpolateData,
} from "./dynamic-content-block";
import type { ReviewSectionConfig } from "@/lib/review-page/types";

interface PermissionsSectionProps {
  config: ReviewSectionConfig;
  data: Record<string, string | number>;
}

export function PermissionsSection({
  config,
  data,
}: PermissionsSectionProps) {
  return (
    <SectionCard title={config.title} description={config.description}>
      <div className="space-y-6">
        {config.subsections.map((sub, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold">{sub.title}</h3>
              {sub.badge && (
                <TagBadge variant={sub.badgeVariant ?? "default"}>
                  {sub.badge}
                </TagBadge>
              )}
            </div>
            {sub.subtitle && (
              <p className="text-xs text-muted-foreground mb-2">
                {interpolateData(sub.subtitle, data)}
              </p>
            )}
            <DynamicContentList blocks={sub.content} data={data} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
