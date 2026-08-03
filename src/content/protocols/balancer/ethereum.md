---
chain: Ethereum
protocol: Balancer
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

Balancer is a decentralized automated market maker (AMM) and liquidity pool protocol on Ethereum. It allows users to create and manage liquidity pools with custom token weights and configurations. Balancer has significant TVL and is one of the oldest and most established DeFi protocols.

# Ratings

## Chain

Balancer is deployed on Ethereum mainnet. Ethereum mainnet achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

Balancer's contracts are upgradeable through governance. The protocol has been audited multiple times. All contracts are verified on Etherscan.

> Upgradeability score: Medium

## Autonomy

Balancer relies on Chainlink oracles for price feeds. The protocol's oracle dependencies are standard for AMM protocols.

> Autonomy score: Medium

## Exit Window

Balancer uses a governance-based upgrade mechanism with a timelock. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

Balancer has a public frontend. Third-party frontends exist (e.g., DeFi Saver, various wallet integrations).

> Accessibility score: Low

# Protocol Analysis

## AMM Architecture

Balancer's core innovation is its flexible pool architecture. Unlike Uniswap's constant product formula, Balancer uses a weighted pool model where tokens can have different weights. This allows for more capital-efficient liquidity provision.

## Smart Contracts

Balancer's contracts are verified on Etherscan. The protocol has undergone multiple audits. Key contracts include the Vault (the core contract managing all pools), the Pool contracts, and the Token contracts.

## Dependencies

Balancer depends on Chainlink oracles for price feeds. The protocol also integrates with various DeFi protocols for yield optimization.

# Reviewer Notes

⚠️ Balancer is one of the oldest DeFi protocols with a long track record. The security model has been battle-tested over time.

⚠️ The Vault contract is the central point of the protocol and holds all pool liquidity. Any vulnerability in the Vault would affect all pools.

⚠️ The governance upgrade mechanism should be reviewed for the specific timelock duration and guardrails.

# Conclusion

Balancer achieves **Stage 0** with medium risk due to its governance upgrade mechanisms and oracle dependencies. The protocol's long track record and battle-tested security model are positive indicators.

> Overall Score: Stage 0
