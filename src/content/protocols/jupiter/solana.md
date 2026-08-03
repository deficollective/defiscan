---
chain: Solana
protocol: Jupiter
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "L"]
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

Jupiter is the leading DEX aggregator on Solana, providing the best swap routes across multiple decentralized exchanges. The protocol has significant volume and is a critical piece of Solana DeFi infrastructure. Jupiter aggregates liquidity from various AMMs and liquidity pools to provide optimal trading paths for users.

# Ratings

## Chain

Jupiter is deployed on Solana. Solana achieves a *Medium* centralization risk score due to its validator set composition.

> Chain score: Medium

## Upgradeability

Jupiter's programs are upgradeable through governance. The protocol has been audited. All programs are verified on Solana explorers.

> Upgradeability score: Medium

## Autonomy

Jupiter relies on various oracle sources for price discovery across its aggregated DEX routes.

> Autonomy score: Medium

## Exit Window

Jupiter uses a governance-based upgrade mechanism. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

Jupiter has a public frontend. Third-party frontends and wallet integrations exist.

> Accessibility score: Low

# Protocol Analysis

## DEX Aggregation

Jupiter's core product is DEX aggregation. The protocol searches across multiple Solana DEXs (Raydium, Orca, Phoenix, etc.) to find the best swap routes for users. This includes splitting trades across multiple pools for optimal price execution.

## Smart Contracts

Jupiter's programs are verified on Solana explorers. The protocol has undergone audits. Key programs include the Jupiter Aggregator (handling swap routing) and the Jupiter API (providing price quotes).

## Dependencies

Jupiter depends on multiple Solana DEXs for liquidity. It also depends on Solana's oracle infrastructure for price feeds.

# Reviewer Notes

⚠️ Jupiter is a critical piece of Solana DeFi infrastructure with high volume.

⚠️ The protocol's aggregation model means it depends on the security of all integrated DEXs.

⚠️ Solana's validator set composition introduces chain-level centralization risks.

# Conclusion

Jupiter achieves **Stage 0** with medium risk due to its dependency on multiple DEXs and chain-level factors. The protocol's role as Solana's leading DEX aggregator makes it a significant target for security review.

> Overall Score: Stage 0
