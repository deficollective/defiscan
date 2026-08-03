---
chain: Ethereum
protocol: Convex Finance
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

Convex Finance is a yield optimization protocol on Ethereum that simplifies Curve Finance liquidity provision. It allows users to earn trading fees and CRV emissions without needing to manage complex Curve gauge weights. Convex has significant TVL and is one of the most established DeFi protocols in the Curve ecosystem.

# Ratings

## Chain

Convex is deployed on Ethereum mainnet. Ethereum mainnet achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

Convex's contracts are upgradeable through governance. The protocol has been audited multiple times. All contracts are verified on Etherscan.

> Upgradeability score: Medium

## Autonomy

Convex depends on Curve Finance as its underlying lending market. It also relies on Chainlink oracles for price feeds.

> Autonomy score: Medium

## Exit Window

Convex uses a governance-based upgrade mechanism with a timelock. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

Convex has a public frontend. Third-party frontends exist (e.g., various wallet integrations, DeFi aggregators).

> Accessibility score: Low

# Protocol Analysis

## Yield Optimization

Convex's core product is yield optimization for Curve liquidity providers. Users deposit their Curve LP tokens into Convex, which automatically stakes them in the appropriate Curve gauges to maximize CRV emissions and trading fees.

## Smart Contracts

Convex's contracts are verified on Etherscan. The protocol has undergone multiple audits. Key contracts include the ConvexContract (the main contract managing user deposits and rewards), the CurveLiquidityGauge contract, and various reward distribution contracts.

## Dependencies

Convex depends on Curve Finance as its underlying protocol. It also depends on Chainlink oracles for price feeds. Any vulnerability in Curve could cascade to Convex.

# Reviewer Notes

⚠️ Convex is deeply integrated with Curve Finance, making it dependent on Curve's security model.

⚠️ The protocol's dependency on Curve's gauge system means that changes to Curve's governance could affect Convex users.

⚠️ The governance upgrade mechanism should be reviewed for the specific timelock duration and guardrails.

# Conclusion

Convex achieves **Stage 0** with medium risk due to its dependency on Curve Finance and governance upgrade mechanisms. The protocol's long track record and integration with Curve are positive indicators.

> Overall Score: Stage 0
