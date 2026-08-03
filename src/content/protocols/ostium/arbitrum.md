---
chain: Arbitrum
protocol: Ostium
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "M"]
author: wilnowilx
submission_date: 2026-08-03
publish_date: 2026-08-03
update_date: 1970-01-01
stage_requirements:
  [
    [
      { text: "Assets are not in custody by a centralized entity", status: "fixed" },
      { text: "All contracts are verified", status: "fixed" },
      { text: "Source-available codebase", status: "fixed" },
      { text: "Public documentation exists", status: "fixed" },
    ],
    [
      { text: "Upgrades with potential of loss of funds not protected with Exit Window >= 7 days OR a sufficient Security Council", status: "unfixed" },
      { text: "Dependency with a High centralization score without mitigation", status: "unfixed" },
      { text: "No Frontend backup or self-hosting option exists", status: "unfixed" },
    ],
    [
      { text: "Upgrades with potential of loss of funds or unclaimed yield not protected with onchain governance AND Exit Window >= 30 days", status: "unfixed" },
      { text: "Dependencies with High or Medium centralization score and no mitigations.", status: "unfixed" },
      { text: "No alternative third-party frontends exist", status: "unfixed" },
    ],
  ]
---

# Summary

Ostium is a decentralized perpetual swap exchange on Arbitrum for real-world assets (RWA). The protocol offers synthetic perpetuals across forex, commodities, indices, stocks, and crypto from a single USDC-collateralized account. Ostium raised a $20M Series A led by General Catalyst and Jump Crypto. The protocol has $19.61M in TVL and $269.60M in open interest.

# Ratings

## Chain

Ostium is deployed exclusively on Arbitrum, which concentrates execution risk but simplifies the trust model. Arbitrum achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

Ostium's contracts have been independently audited (1 audit report on file). The protocol uses a timelock-based upgrade mechanism.

> Upgradeability score: Medium

## Autonomy

Ostium relies on two oracle providers (Stork, Chainlink) for price discovery. The dual-oracle setup provides some redundancy.

> Autonomy score: Medium

## Exit Window

The protocol uses a timelock for upgrades. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

The protocol has a public frontend. Third-party frontends have not been identified.

> Accessibility score: Medium

# Protocol Analysis

## Perpetual Futures

Ostium offers synthetic perpetual futures on RWA assets including equity indices (S&P 500, Nasdaq-100), forex pairs, commodities, and individual stocks (NVIDIA, Microsoft). Maximum leverage is 200x with maker fees of 0.02% and taker fees of 0.05%.

## Smart Contracts

Ostium's codebase has been independently audited with 1 audit report on file. Contracts are verified on Arbitrum.

## Dependencies

Ostium depends on Chainlink and Stork oracles for price feeds. The dual-oracle setup provides some redundancy but both are external dependencies.

# Reviewer Notes

⚠️ The TVL figure varies between sources ($19.61M DefiLlama vs $37.8M PerpVision). The discrepancy may be due to different measurement methodologies.

⚠️ Ostium's 200x maximum leverage is extremely high and represents significant risk for users.

⚠️ The protocol's focus on RWA perp trading is a niche but growing segment of DeFi.

# Conclusion

Ostium achieves **Stage 0** with medium risk due to oracle dependencies and high leverage. The protocol's RWA focus differentiates it from generic DeFi protocols.

> Overall Score: Stage 0
