import { Metadata } from "next";
import { notFound } from "next/navigation";
import { reviewDataService } from "@/services/review-data";
import { ReviewPageLayout } from "@/components/review-page/review-page-layout";
import type { ReviewConfig } from "@/lib/review-page/types";

interface ReviewPageProps {
  params: { slug: string };
}

async function getConfig(slug: string): Promise<ReviewConfig | null> {
  try {
    const config = await import(
      `@/content/review-configs/${slug}.json`
    );
    return config.default as ReviewConfig;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const config = await getConfig(params.slug);
  if (!config) return { title: "Review not found | DeFiScan" };

  return {
    title: `${config.protocolName} Review | DeFiScan`,
    description: `Review of ${config.protocolName} (${config.tokenName}) on ${config.chain}`,
    robots: { index: false, follow: false },
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const config = await getConfig(params.slug);
  if (!config) notFound();

  const apiData = await reviewDataService.getReviewData(params.slug);
  if (!apiData) notFound();

  return (
    <article className="container relative mx-auto py-6 lg:py-10 max-w-5xl">
      <ReviewPageLayout config={config} apiData={apiData} />
    </article>
  );
}
