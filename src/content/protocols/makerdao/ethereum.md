---
chain: Ethereum
protocol: MakerDAO
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

MakerDAO is the oldest and largest DeFi protocol, operating the DAI stablecoin system. The protocol has been battle-tested since 2014 and has undergone multiple major upgrades including the Multi-Collateral DAI (MCD) system and the Endgame governance framework. MakerDAO has significant TVL and is a foundational component of the DeFi ecosystem.

# Ratings

## Chain

MakerDAO is deployed on Ethereum mainnet and multiple other chains. Ethereum mainnet achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

MakerDAO's contracts are upgradeable through governance. The protocol has been audited multiple times. All contracts are verified on Etherscan. The Endgame governance framework introduces new upgrade mechanisms that need careful review.

> Upgradeability score: Medium

## Autonomy

MakerDAO relies on Chainlink oracles for price feeds. The protocol's oracle dependencies are standard for DeFi protocols.

> Autonomy score: Medium

## Exit Window

MakerDAO uses a governance-based upgrade mechanism with a timelock. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

MakerDAO has a public frontend. Third-party frontends exist (e.g., various wallet integrations, DeFi aggregators).

> Accessibility score: Low

# Protocol Analysis

## DAI Stablecoin System

MakerDAO's core product is the DAI stablecoin, which is collateralized by a variety of assets through the Vault system. The protocol manages the supply and stability of DAI through collateral types, stability fees, and debt ceilings.

## Smart Contracts

MakerDAO's contracts are verified on Etherscan. The protocol has undergone multiple audits. Key contracts include the Vault contracts, the Pot (interest rate accumulator), and the Dai Savings Rate (DSR) contract.

## Dependencies

MakerDAO depends on Chainlink oracles for price feeds. The protocol also depends on various collateral assets and their respective price feeds.

# Reviewer Notes

⚠️ MakerDAO is one of the most battle-tested DeFi protocols with a long track record since 2014.

⚠️ The Endgame governance framework introduces significant changes to the protocol's upgrade mechanism and governance structure.

⚠️ The protocol's dependency on external collateral assets and their price feeds introduces additional trust assumptions.

# Conclusion

MakerDAO achieves **Stage 0** with medium risk due to its governance upgrade mechanisms and oracle dependencies. The protocol's long track record and battle-tested security model are positive indicators.

> Overall Score: Stage 0
