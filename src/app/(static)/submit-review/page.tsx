import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Review",
};

export default function SubmitReviewPage() {
  return (
    <div className="container relative mb-20 max-w-6xl py-6 lg:py-10 prose prose-headings:text-primary marker:text-gray-600">
      <h1>Submit New Protocol Reviews</h1>

      <h2>Who Can Submit Reviews?</h2>
      <p>
        DeFiScan is an open-source project and everyone can create and submit
        new protocol reviews. We further run initiatives to involve the
        community more closely in this process and increase coverage of the DeFi
        sector. Follow us on <a href="https://x.com/defiscan_info">X</a> or join
        our <a href="https://discord.gg/Z467Ehv6VU">Discord</a> to stay
        up-to-date on any such initiatives.
      </p>

      <h2>Getting Started</h2>
      <p>Follow these steps to create and submit a new protocol review:</p>

      <div>
        <ol>
          <li>
            Fork the DeFiScan GitHub{" "}
            <a href="https://github.com/deficollective/defiscan">repository</a>
          </li>
          <li>
            If you are adding a new protocol:
            <ol>
              <li>
                Copy the{" "}
                <a href="https://github.com/deficollective/defiscan/blob/main/src/content/_protocol_template">
                  template directory
                </a>{" "}
                to create a new protocol directory (see{" "}
                <a href="#repository-structure">Repository Structure</a>)
              </li>
              <li>Fill out `data.json` with protocol information</li>
              <li>
                Rename the review file to match your target chain (e.g.,
                ethereum.md, polygon.md)
              </li>
            </ol>
          </li>
          <li>
            If you are adding a review for an existing protocol on a new chain:
            <ol>
              <li>
                Copy the{" "}
                <a href="https://github.com/deficollective/defiscan/blob/main/src/content/_protocol_template/<chain>.md">
                  template review file
                </a>{" "}
                to the protocol's directory with the appropriate chain name
              </li>
            </ol>
          </li>
          <li>
            Install the{" "}
            <a href="https://github.com/deficollective/permission-scanner">
              Permission Scanner
            </a>{" "}
            tool
          </li>
          <li>
            Generate a report of all permissioned functions in the protocol
          </li>
          <li>
            Complete the protocol review following our{" "}
            <a href="https://deficollective.org/blog/introducing-defiscan">
              methodology
            </a>
          </li>
          <li>
            Submit a PR to the main{" "}
            <a href="https://github.com/deficollective/defiscan">repository</a>
          </li>
          <li>
            Notify the team in our{" "}
            <a href="https://discord.gg/Z467Ehv6VU">Discord</a> for review
          </li>
        </ol>
      </div>

      <h2>Review Guidelines</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Each chain-specific review should focus on the unique aspects and
          risks of that deployment
        </li>
        <li>Include all relevant contract addresses and deployment dates</li>
        <li>Document all privileged functions and admin capabilities</li>
        <li>Highlight any differences in implementation across chains</li>
        <li>Keep the review factual and objective</li>
      </ul>

      <h2 id="repository-structure">Repository Structure</h2>
      <p>All protocol reviews follow this organization:</p>
      <pre className="p-4 rounded-md overflow-x-auto">
        {`protocols/
├── protocol-name/
│   ├── data.json    # Protocol metadata and basic information
│   ├── ethereum.md  # Review for Ethereum deployment
│   ├── polygon.md   # Review for Polygon deployment
│   └── base.md      # Review for Base deployment
└── another-protocol/
    ├── data.json
    └── arbitrum.md`}
      </pre>

      <h3>Directory Contents</h3>
      <ul>
        <li>
          <code>data.json</code> - Essential protocol information:
          <ul className="list-disc pl-6 mt-2">
            <li>Protocol name and description</li>
            <li>Official website and documentation links</li>
            <li>Social media links</li>
            <li>Deployment addresses across different chains</li>
          </ul>
        </li>
        <li>
          <code>&lt;chain&gt;.md</code> - Chain-specific reviews containing:
          <ul className="list-disc pl-6 mt-2">
            <li>Deployment details and contract addresses</li>
            <li>Permission analysis results</li>
            <li>Security considerations</li>
            <li>Risk assessment</li>
          </ul>
        </li>
      </ul>

      <p className="mt-10">
        <strong>Note:</strong> By submitting a PR with a protocol review, you
        agree that the DeFi Collective may freely use the submitted content.
        Please see our <a href="/terms">Terms</a>.
      </p>
    </div>
  );
}
