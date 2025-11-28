"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Data structures
const introContent = {
  title: "What is DeFiScan?",
  paragraphs: [
    "The maturity of DeFi technology progresses through several stages characterized by different degrees of decentralization. Upon deployment, DeFi protocols often expose critical risks from central dependencies and permissions controlled by centralized operators. As the protocol matures, these risks are eliminated e.g. through the introduction of fallback mechanisms, Security Councils and exit windows. To date, however, these stages have not been formalized resulting in a lack of transparency around the maturity and related risks of DeFi protocols.",
    "DeFiScan offers a framework formalizing the decentralization stages of DeFi technology and allowing, for the first time, to assess and monitor the technology's maturity in a verifiable manner. This framework consists of two parts:",
  ],
  bulletPoints: [
    'A centralization risk scoring system based on a scale of "High", "Medium" and "Low" severity risks',
    "A formalization of the decentralization stages which relates directly to the risk scores achieved by a DeFi protocol",
  ],
  blogLink: {
    text: "blog post",
    url: "https://deficollective.org/blog/introducing-defiscan/",
  },
};

const introContent2 = {
  title: "What is DeFiScan NOT?",
  paragraphs: [
    "DeFiScan strictly focuses on the analysis and monitoring of the decentralization stage of DeFi protocols. It does NOT assess or make any statement about other aspects like:",
  ],
  bulletPoints: [
    "Smart contract risks",
    "Regulatory/compliance risks",
    "UX",
    "Financial performance",
    "Any other risk associated with DeFi protocols",
  ],
};

const riskData = [
  {
    category: "Chain",
    risks: {
      high: "L2Beat Stage 0",
      medium: "L2Beat Stage 1",
      low: "Ethereum mainnet or a comparable L1, or L2Beat Stage 2",
    },
    anchor: "chain",
  },
  {
    category: "Upgradeability",
    risks: {
      high: "Possible upgrades may result in the theft or loss of user funds",
      medium:
        "Possible upgrades may result in the theft or loss of unclaimed yield or may otherwise materially change the expected performance of the system (but user funds remain unaffected)",
      low: "Possible upgrades do not materially change the expected performance of the system (or result in the theft or loss of user funds and unclaimed yield)",
    },
    anchor: "upgradability",
  },
  {
    category: "Autonomy",
    risks: {
      high: "Dependencies may cause theft or loss of user funds and exhibit Stage 0, or equivalent, centralization",
      medium:
        "Dependencies may cause theft or loss of unclaimed yield, or may otherwise materially change the expected protocol performance, OR dependencies exhibit Stage 1, or equivalent, decentralization",
      low: "Dependencies (if any) cannot materially change the expected protocol performance, OR dependencies exhibit Stage 2, or equivalent, decentralization",
    },
    anchor: "autonomy",
  },
  {
    category: "Exit Window",
    risks: {
      high: "Upgradeability score is 'High' AND permissions are protected with an exit window of less than 7 days (or no Exit Window)",
      medium:
        "Upgradeability score is 'Medium' OR permissions are protected with an exit window of at least 7 days",
      low: "Upgradeability score is 'Low' OR permissions are transferred to an onchain governance process with an exit window of at least 30 days",
    },
    anchor: "exit-window",
  },
  {
    category: "Accessibility",
    risks: {
      high: "A single user interface exists without a backup solution resulting in the temporary freezing of user funds if the interface is shutdown",
      medium:
        "A single user interface exists with public access to a backup solution such as a self-hosting app",
      low: "Multiple independent user interfaces exist, e.g. websites, in-wallet access, etc., guaranteeing access to user funds even if one interface is shutdown",
    },
    anchor: "accessibility",
  },
];

const stagesData = [
  {
    stage: "Stage 0",
    description:
      "This is the first stage of a DeFi protocol where basic requirements give the technology a decentralized foundation. Critical permissions are still controlled by centralized operators and external dependencies may expose critical risks to users. Yet, its foundation allows for the gradual decentralization and elimination of these risks.",
    qualifications: [
      "✅ Blockchain-based, financial protocol",
      "✅ Assets are not in custody by a centralized entity",
      "✅ Public documentation exists that outlines the protocol components and expected performance",
      "✅ Source-available codebase",
      "✅ Verified contracts",
    ],
  },
  {
    stage: "Stage 1",
    description:
      "In the second stage, risks from critical permissions and dependencies are significantly reduced by either revoking critical permissions, or establishing a Security Council to control such permissions, or enforcing an exit window of at least 7 days so users can withdraw funds in case of an unwanted protocol update. Critical risks from external dependencies are mitigated by the implementation of appropriate fallback mechanisms. Furthermore, the underlying chain cannot censor users' transactions and a backup user interface exists guaranteeing access to user funds.",
    qualifications: [
      '✅ At least a "Medium" risk score for Chain, Autonomy, Accessibility',
      '✅ IF Exit Window receives "High" risk, THEN a Security Council must be in place with ownership of or veto over permissions',
    ],
  },
  {
    stage: "Stage 2",
    description:
      "The final stage is reached when critical permissions have either been revoked or delegated to an on-chain governance system with ample time for users to exit in case of an unwanted protocol update. Risks from external dependencies have been further reduced such that users' funds and unclaimed yield remain unaffected by a failure. In addition, different independent user interfaces and a fully decentralized underlying chain guarantee access to users' funds at any time.",
    qualifications: [
      '✅ At least "Low" risk score for Chain, Autonomy, Exit Window, Accessibility',
    ],
  },
];

const securityCouncilRequirements = [
  "At least 7 signers",
  "At least 51% threshold",
  "At least 50% non-insider signers",
  "Signers are publicly announced (with name or pseudonym)",
];

const othersData = {
  description:
    "The system does not meet basic Stage 0 requirements, or critical information is missing for a complete assessment, and thus cannot be characterized as a DeFi technology.",
  qualifications: [
    "✅ Blockchain-based, financial protocol",
    "❌ Assets are not in custody by a centralized entity",
    "❌ Public documentation exists that outlines the protocol components and expected performance",
    "❌ Source-available codebase",
    "❌ Verified contracts",
  ],
};

const updateData = [
  {
    name: "Version 1.2",
    description:
      'Shifting security council requirements from "non-team" to "non-insiders". Clarifying security councils\' role in relation to governance. Specifying requirements on the decentralization of dependencies.',
    date: "Mar. 2025",
    link: "/blog/defiscan-update-methodology-batch-2",
  },
  {
    name: "Version 1.1",
    description:
      'Introducing the "Others" category and different clarifications on the protocols\' scope and exit window.',
    date: "Dec. 2024",
    link: "/blog/defiscan-update-methodology",
  },
  {
    name: "Framework Launch",
    description:
      "Initial release of the DeFiScan framework with centralization risk scoring and stage definitions.",
    date: "Oct. 2024",
    link: "/blog/introducing-defiscan/",
  },
  {
    name: "Protocol Guidelines",
    description:
      "Initial release of the guidelines for the characterization of Genuine DeFi systems and the identification of On-chain CeFi services.",
    date: "Apr. 2024",
    link: "/blog/tdc-protocol-guidelines",
  },
];

function createIdFromTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// Components
const IntroSection = () => (
  <>
    <a href={`#${createIdFromTitle("WTF is DeFiScan?")}`}>
      <h1
        id={createIdFromTitle("WTF is DeFiScan?")}
        className="inline-block tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ scrollMarginTop: "100px" }}
      >
        {introContent.title}
      </h1>
    </a>

    <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
      {introContent.paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : ""}>
          {paragraph}
        </p>
      ))}
      <ul className="list-disc ml-6">
        {introContent.bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <br></br>
      <h1 className="inline-block tracking-tight mb-6 text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        {introContent2.title}
      </h1>
      {introContent2.paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? "mt-4" : ""}>
          {paragraph}
        </p>
      ))}
      <ul className="list-disc ml-6">
        {introContent2.bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <p className="mt-4">
        Here we provide an overview of the framework. For a more detailed
        discussion, please refer to the introduction{" "}
        <a
          href={introContent.blogLink.url}
          className="font-medium text-primary hover:underline"
        >
          {introContent.blogLink.text}
        </a>
        .
      </p>
    </div>
  </>
);

const RisksSection = () => (
  <>
    <a href={`#${createIdFromTitle("DeFi Centralization Risks")}`}>
      <h1
        id={createIdFromTitle("DeFi Centralization Risks")}
        className="inline-block mt-10 tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ scrollMarginTop: "100px" }}
      >
        DeFi Centralization Risks
      </h1>
    </a>

    <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
      {/* Mobile Accordion View */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {riskData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {item.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <span className="inline-block mb-2 px-2 py-1 bg-red-500 text-white rounded">
                      High
                    </span>
                    <p className="text-sm">{item.risks.high}</p>
                  </div>
                  <div>
                    <span className="inline-block mb-2 px-2 py-1 bg-yellow-500 text-white rounded">
                      Medium
                    </span>
                    <p className="text-sm">{item.risks.medium}</p>
                  </div>
                  <div>
                    <span className="inline-block mb-2 px-2 py-1 bg-green-500 text-white rounded">
                      Low
                    </span>
                    <p className="text-sm">{item.risks.low}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <td className="border px-4 py-2 text-left font-bold">
                Risk / Scores
              </td>
              <td className="border px-4 py-2 text-left font-bold">High</td>
              <td className="border px-4 py-2 text-left font-bold">Medium</td>
              <td className="border px-4 py-2 text-left font-bold">Low</td>
            </tr>
          </thead>
          <tbody>
            {riskData.map((item) => (
              <tr
                key={item.category}
                className="hover:bg-accent transition"
                onClick={() => (window.location.href = `#${item.anchor}`)}
              >
                <td className="px-6 py-4 border">{item.category}</td>
                <td className="px-6 py-4 border">{item.risks.high}</td>
                <td className="px-6 py-4 border">{item.risks.medium}</td>
                <td className="px-6 py-4 border">{item.risks.low}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const StagesSection = () => (
  <>
    <a href={`#${createIdFromTitle("DeFi Stages Framework")}`}>
      <h1
        id={createIdFromTitle("DeFi Stages Framework")}
        className="inline-block mt-10 tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ scrollMarginTop: "100px" }}
      >
        DeFi Stages Framework
      </h1>
    </a>

    <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
      {/* Mobile Accordion View */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {stagesData.map((stage, index) => (
            <AccordionItem key={index} value={`stage-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {stage.stage}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm">{stage.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Qualification</h3>
                    <ul className="list-none text-sm space-y-2">
                      {stage.qualifications.map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <td className="px-6 py-4 border font-bold">Stage</td>
              <td className="px-6 py-4 border font-bold">Description</td>
              <td className="px-6 py-4 border font-bold">Qualification</td>
            </tr>
          </thead>
          <tbody>
            {stagesData.map((stage) => (
              <tr key={stage.stage} className="hover:bg-accent transition">
                <td className="px-6 py-4 border whitespace-nowrap">
                  {stage.stage}
                </td>
                <td className="px-6 py-4 border">{stage.description}</td>
                <td className="px-6 py-4 border">
                  <ul className="list-none list-inside">
                    {stage.qualifications.map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const SecurityCouncilSection = () => (
  <>
    <a href={`#${createIdFromTitle("Security Council Requirements")}`}>
      <h1
        id={createIdFromTitle("Security Council Requirements")}
        className="mt-10 text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ scrollMarginTop: "100px" }}
      >
        Security Council Requirements
      </h1>
    </a>

    <div className="flex-1 my-6 text-left text-muted-foreground lg:text-start xl:text-base">
      <p className="mb-4">
        A Security Council can represent an effective intermediate step of
        decentralized control over permissions that cannot be revoked or
        protected with an Exit Window. In particular, a Security Council enables
        a protocol to mitigate risks of centralized control over such
        permissions and enter Stage 1.
      </p>
      <p className="mb-4">
        Any multisig account with the following minimal requirements is an
        acceptable Security Council setup:
      </p>
      <ul className="list-disc ml-6">
        {securityCouncilRequirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
      <p className="mb-4 mt-4">
        Note that we refer to an "insider" as any party of the "inner circle" of
        individuals or entities developing, maintaining and operating the
        protocol, such as the "team members" or a company mandated to perform
        certain services.
      </p>
      <p className="mb-4">
        These requirements translate to a set of at least 7 signers, identified
        through their name or pseudonym, and a threshold qualified by a majority
        of signers including at least one "outsider".
      </p>
    </div>
  </>
);

const OthersSection = () => (
  <>
    <a href={`#${createIdFromTitle("Others Protocol Category")}`}>
      <h1
        id={createIdFromTitle("Others Protocol Category")}
        className="mt-10 text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ scrollMarginTop: "100px" }}
      >
        Others Protocol Category
      </h1>
    </a>

    <div className="flex-1 my-6 text-left text-muted-foreground lg:text-start xl:text-base">
      <p className="mb-4">
        The stages framework considers a set of basic requirements to enter
        Stage 0 and qualify as a DeFi protocol. The <i>Others</i> protocol
        category captures protocols which are built using blockchain technology
        and serve a financial use case but do not meet one or more of the Stage
        0 requirements:
      </p>
      <ul className="list-none space-y-2">
        {othersData.qualifications.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
      <p className="mt-4">
        The <i>Others</i> protocol category thus shines a light on protocols
        which either fail to disclose the required information publicly, such as
        documentation (aka a Whitepaper) or software source-code, or do not meet
        basic requirements to qualify as a <i>DeFi</i> protocol.
      </p>
    </div>
  </>
);

const FrameworkUpdatesSection = () => (
  <>
    <a href={`#${createIdFromTitle("Framework Updates")}`}>
      <h1
        id={createIdFromTitle("Framework Updates")}
        className="mt-10 text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ scrollMarginTop: "100px" }}
      >
        Framework Updates
      </h1>
    </a>

    <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
      <p className="mb-6">
        Our framework evolves over time based on community feedback and
        learnings from protocol reviews. Here you can find a summary of major
        updates and changes.
      </p>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <td className="border px-4 py-2 text-left font-bold">Update</td>
              <td className="border px-4 py-2 text-left font-bold">
                Description
              </td>
              <td className="border px-4 py-2 text-left font-bold whitespace-nowrap">
                Date
              </td>
              <td className="border px-4 py-2 text-left font-bold whitespace-nowrap">
                More Info
              </td>
            </tr>
          </thead>
          <tbody>
            {updateData.map((update, index) => (
              <tr key={index} className="hover:bg-accent transition">
                <td className="px-4 py-3 border">{update.name}</td>
                <td className="px-4 py-3 border">{update.description}</td>
                <td className="px-4 py-3 border whitespace-nowrap">
                  {update.date}
                </td>
                <td className="px-4 py-3 border">
                  <a
                    href={update.link}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default function LearnMorePage() {
  return (
    <div className="container relative mb-20 max-w-6xl py-6 lg:py-10">
      <IntroSection />
      <RisksSection />
      <StagesSection />
      <SecurityCouncilSection />
      <OthersSection />
      <FrameworkUpdatesSection />
    </div>
  );
}
