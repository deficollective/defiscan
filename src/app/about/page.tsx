import { Suspense } from "react";
import { authors } from "#site/content";
import { AuthorCard } from "@/components/author";

export default function AboutPage() {
  // Filter authors to only show team members
  const teamMembers = authors.filter((author) => author.teamMember);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
          About DeFiScan
        </h1>
      </div>

      {/* Our Mission Section */}
      <section className="space-y-4">
        <h2 className="text-primary font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
          Our Mission
        </h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            DeFiScan is dedicated to increasing transparency and trust in the
            decentralized finance (DeFi) ecosystem. We provide comprehensive
            analysis and ratings of DeFi protocols, helping users make informed
            decisions about their participation in various protocols.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our goal is to evaluate and track the decentralization progress of
            DeFi protocols across multiple dimensions, including governance,
            autonomy, accessibility, and operational decentralization. By
            providing clear, objective assessments, we aim to promote higher
            standards and better practices across the entire DeFi space. Read
            more about our framework{" "}
            <a
              href="/framework"
              className="text-primary underline hover:text-primary/80"
            >
              here
            </a>
            .
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-6">
        <h2 className="text-primary font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
          Team
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((author) => (
            <Suspense
              key={author.slug}
              fallback={
                <div className="animate-pulse bg-muted h-32 rounded-lg" />
              }
            >
              <AuthorCard author={author} />
            </Suspense>
          ))}
        </div>
      </section>

      {/* Funding Section */}
      <section className="space-y-4">
        <h2 className="text-primary font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl tracking-tight">
          Funding
        </h2>
        <p>
          {" "}
          To maximize neutrality and accuracy of the reporting, DeFiscan is not
          a business. DeFiScan is a public good, provided entirely for free
          under an open-source license. Yet, reviewing protocols requires time
          and expertise; several sources of funding are harnessed to enable the
          existence of DeFiScan under the current model:
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Grants</h3>
            <p className="text-muted-foreground leading-relaxed">
              Various organizations in the DeFi ecosystem support DeFiScan with
              grants, such as the{" "}
              <a
                href="/blog/ef-grants/"
                className="text-primary underline hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ethereum Foundation
              </a>
              . This funding enables us to maintain our independence and
              continue providing unbiased analysis of DeFi protocols.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Donations
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Entities and individuals can donate to the DeFi Collective /
              DeFiScan to support the mission.{" "}
              <a
                href="https://debank.com/profile/0xDc6f869d2D34E4aee3E89A51f2Af6D54F0F7f690"
                className="text-primary underline hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donations are accepted on grants.deficollective.eth
              </a>
              . DeFiScan is also represented on several crowd-sourced donation
              platforms:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>
                <a
                  href="https://octant.app/project/8/0x4396F167ef86ECBAC27682Eb33AFCa13693dFe40"
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Octant
                </a>
              </li>
              <li>
                <a
                  href="https://giveth.io/project/defiscan"
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Giveth
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              DeFiCollective
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Finally, the DeFi Collective covers the remaining operating
              expenses incurred for DeFiScan. The DeFi Collective is a
              non-profit organization using its own treasury assets to fund its
              operations and fulfill its mission. To maximize transparency,{" "}
              <a
                href="https://deficollective.org/categories/monthly-report/"
                className="text-primary underline hover:text-primary/80"
              >
                monthly reports are published
              </a>
              .
            </p>
          </div>
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
