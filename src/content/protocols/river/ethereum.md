---
chain: Ethereum
protocol: River
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
      { text: "Assets are not in custody by a centralized entity", status: "unfixed" },
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

River is a chain-abstraction stablecoin protocol that connects liquidity across multiple ecosystems. The protocol powers the omni-CDP stablecoin satUSD, allowing users to collateralize assets on one chain and mint on another. River has $80.05M in TVL across its main protocol and $116.62M in TVL for its Omni-CDP variant deployed across 12 chains.

# Ratings

## Chain

River operates across multiple chains including Base, BSC, BSquared, Ethereum, and others. The multi-chain deployment introduces cross-chain trust assumptions.

> Chain score: Medium

## Upgradeability

River's contracts have been independently audited (1 audit report on file). The protocol uses a multi-chain architecture with a timelock-based upgrade mechanism.

> Upgradeability score: Medium

## Autonomy

River relies on multiple oracle providers (Chainlink, DIA, Api3, and others) for price discovery across its 12-chain deployment.

> Autonomy score: Medium

## Exit Window

The protocol uses a timelock for upgrades. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

The protocol has a public frontend. Third-party frontends have not been identified.

> Accessibility score: Medium

# Protocol Analysis

## Omni-CDP Architecture

River's omni-CDP system allows users to collateralize assets on one chain and mint the satUSD stablecoin on another. This cross-chain functionality introduces additional complexity and trust assumptions.

## Smart Contracts

River's codebase has been independently audited with 1 audit report on file. Contracts are verified on multiple chains.

## Dependencies

River depends on multiple oracle providers across its 12-chain deployment. The multi-chain architecture increases the attack surface.

# Reviewer Notes

⚠️ The River Omni-CDP variant ($116M TVL) is a separate deployment from the main River protocol ($80M TVL). Both should be reviewed independently.

⚠️ The protocol raised $14M in funding (Jan 2026 strategic round, Jan 2026 $12M round).

⚠️ The multi-chain deployment (12 chains) increases the attack surface and complexity of the security model.

# Conclusion

River achieves **Stage 0** with medium risk due to multi-chain dependencies and oracle complexity. The protocol's cross-chain architecture requires further security analysis.

> Overall Score: Stage 0
