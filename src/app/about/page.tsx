import { Suspense } from "react";
import { authors } from "#site/content";
import { AuthorCard } from "@/components/author";

export default function AboutPage() {
  // Filter authors to only show team members
  const teamMembers = authors.filter(author => author.teamMember);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">About DeFiScan</h1>
      </div>

      {/* Our Mission Section */}
      <section className="space-y-4">
        <h2 className="text-primary font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">Our Mission</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            DeFiScan is dedicated to increasing transparency and trust in the decentralized finance (DeFi) ecosystem. 
            We provide comprehensive analysis and ratings of DeFi protocols, helping users make informed decisions about 
            their participation in various protocols.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our goal is to evaluate and track the decentralization progress of DeFi protocols across multiple 
            dimensions, including governance, autonomy, accessibility, and operational decentralization. By providing 
            clear, objective assessments, we aim to promote higher standards and better practices across the entire DeFi space. Read more about our framework <a href="/learn-more" className="text-primary underline hover:text-primary/80">here</a>.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-6">
        <h2 className="text-primary font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((author) => (
            <Suspense key={author.slug} fallback={<div className="animate-pulse bg-muted h-32 rounded-lg" />}>
              <AuthorCard author={author} />
            </Suspense>
          ))}
        </div>
      </section>

      {/* Funding Section */}
      <section className="space-y-4">
        <h2 className="text-primary font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">Funding</h2>
        <h3 className="text-lg font-semibold text-primary">Grants</h3>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            DeFiScan is supported by grants from the Ethereum Foundation and other prominent organizations in the 
            DeFi ecosystem. This funding enables us to maintain our independence and continue providing unbiased 
            analysis of DeFi protocols.
          </p>
          <h3 className="text-lg font-semibold text-primary">The DeFi Collective</h3>
          <p className="text-muted-foreground leading-relaxed">
            We are committed to transparency in our funding sources. [...]
          </p>
        </div>
      </section>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "About - DeFiScan",
    description: "Learn more about DeFiScan's mission, team, and funding",
  };
}