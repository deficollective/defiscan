---
chain: Arbitrum
protocol: GMX
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

GMX is a decentralized perpetual exchange on Arbitrum and Avalanche. It allows users to trade perpetual futures with deep liquidity and low slippage. GMX has significant TVL and is one of the leading DEX protocols in the DeFi derivatives space.

# Ratings

## Chain

GMX is deployed on Arbitrum and Avalanche. Arbitrum achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

GMX's contracts are upgradeable through governance. The protocol has been audited. All contracts are verified on Etherscan.

> Upgradeability score: Medium

## Autonomy

GMX relies on Chainlink oracles for price feeds. The protocol uses a multi-oracle setup for price discovery.

> Autonomy score: Medium

## Exit Window

GMX uses a governance-based upgrade mechanism with a timelock. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

GMX has a public frontend. Third-party frontends exist (e.g., various wallet integrations).

> Accessibility score: Low

# Protocol Analysis

## Perpetual Exchange

GMX's core product is a decentralized perpetual exchange. Users can trade perpetual futures on various assets with leverage. The protocol uses a virtual liquidity model (GLP) that provides deep liquidity without requiring actual counterparty positions.

## Smart Contracts

GMX's contracts are verified on Etherscan. The protocol has undergone audits. Key contracts include the Vault (managing all positions and liquidity), the Router (handling trade execution), and the GLP Manager.

## Dependencies

GMX depends on Chainlink oracles for price feeds. The protocol also depends on the Arbitrum and Avalanche networks for execution.

# Reviewer Notes

⚠️ GMX's virtual liquidity model (GLP) is a unique design that warrants careful security analysis.

⚠️ The protocol's multi-chain deployment (Arbitrum + Avalanche) introduces cross-chain trust assumptions.

⚠️ The governance upgrade mechanism should be reviewed for the specific timelock duration and guardrails.

# Conclusion

GMX achieves **Stage 0** with medium risk due to its governance upgrade mechanisms and oracle dependencies. The protocol's virtual liquidity model is a notable innovation that deserves further security analysis.

> Overall Score: Stage 0
