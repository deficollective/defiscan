---
protocol: "Curve Finance"
website: "https://curve.finance/"
x: "https://x.com/CurveFinance"
github: ["https://github.com/CurveFi"]
defillama_slug: ["curve-dex"]
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "H", "L", "H", "L"]
author: ["Saint Rat"]
submission_date: "2025-05-29"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Curve Finance is a protocol consisting of a _decentralized exchange (DEX)_ focused on stablecoin and correlated-asset swaps, _isolated lending markets (Llamalend)_, and an overcollateralized _stablecoin (crvUSD)_.

Governance of all products, as well as the protocol itself, is managed entirely through the _Curve DAO_, using a vote-escrowed token model (veCRV) where voting power is proportional to the amount of CRV locked and the remaining lock duration (up to four years).

# Ratings

## Chain

Curve Finance's core governance (the DAO) operates exclusively on Ethereum mainnet. Although Curve products are deployed across multiple EVM-compatible chains, this review focuses only on the Ethereum mainnet. As a mature Layer 1 blockchain, Ethereum falls into the lowest risk category.

> Chain score: Low

## Upgradeability

The Curve DAO manages all upgrades, primarily through the `OwnershipAgentProxy`, which executes successful governance votes. Most Curve contracts have an owner or manager with varying permissions, all ultimately controlled by the DAO.

The DAO's powers are extensive. It can upgrade core DAO contracts or delegate permissions to other entities through governance. It also controls key parameters, such as interest rate policies in `crvUSD` and lending markets, fee settings, and liquidity concentration in pools. Additionally, it can mint `crvUSD` without limits and manages the `scrvUSD` vault, both of which could be used maliciously. All admin/ownership actions are locked behind governance votes, with some power allocated to the `EmergencyDAO` to stop gauges (`CRV` emission), fee distributors, or pegkeepers, in case of emergency.

The implementation contracts of the DEX's pools can be updated for future pools only, which does not impact users' funds and unclaimed yield.

As possible updates may result in the _loss of user funds_, this results in a _High upgradeability score_.

> Upgradeability score: High

## Autonomy

The only external dependency in Curve is the CoWSwap burner used in the DAO’s revenue collection architecture. It submits limit orders that are guaranteed to execute only within predefined parameter ranges, converting collected tokens into `crvUSD`. If this mechanism fails or malfunctions, DAO revenue remains in its original token until it can be manually swapped through Curve pools via a DAO vote, or `EmergencyDAO` intervention.

> Autonomy score: Low

## Exit Window

All governance votes occur over a 7-day period, with voting frontloaded in the first half due to the linear decay of _veCRV_ voting power after 3.5 days (see more on this in the [governance section](#governance)). There is no mandatory delay between the end of voting and execution. While the voting duration and decay mechanics provide some opportunity for users to react, this does not qualify as a formal delay under the framework.

> Exit Window score: High

## Accessibility

Curve's primary user interface is hosted at [curve.finance](https://curve.finance/). Other interfaces also provide most core functionality, including [crvhub.com](https://crvhub.com), [curvemonitor.com](https://curvemonitor.com), and [DeFi Saver](https://app.defisaver.com/). Different third-party apps integrate directly with Curve, allowing swaps to route through Curve regardless of the UI’s status.

The full frontend code is open source and available at the [Curve Frontend GitHub repository](https://github.com/curvefi/curve-frontend), although there are currently no published instructions for self-hosting.

> Accessibility score: Low

## Conclusion

Curve received a _Low_ centralization risk score for its _Chain_ and _Accessibility_ criteria. Nonetheless, it received a _High_ centralization risk score for its _Upgradeability_ and _Exit Window_. Overall, this grants Curve a rating of **Stage 0**.

There are three primary paths for Curve to advance to Stage 1 under the existing framework:

1. Relinquish some control at the DAO level, specifically over crvUSD minting and scrvUSD vault management such that loss of user funds is no longer possible through DAO actions.
2. Expand the authority of the `EmergencyDAO` to include a veto right on governance proposals, effectively enabling it to stop proposals that could result in the loss of user funds.
3. Introduce a mandatory 7-day delay between the approval, and execution of governance proposals which may result in the loss of user funds.

# Reviewer's Notes

Zap contracts were excluded from this review, as they have no permissioned functions and are optional to use.

Deployments on other chains, including their associated cross-chain messaging contracts and the supporting Ethereum infrastructure, are also out of scope.

Only the latest versions of each contract implementation were analyzed. While Curve has used various contract versions over time, they have all mostly followed the same architecture and permission structure.

# Protocol Analysis

## Decentralized Exchange (DEX)

Curve’s DEX is the foundation of all products within the protocol, and user assets within pools are safe, except from smart contract risk. There are three main types of pools:

- **Stableswap**: Stablecoin and stable-asset pools with up to 8 assets
- **Twocrypto**: Pools with 2 volatile assets
- **Tricrypto**: Pools with 3 volatile assets

In addition, Curve supports:

- **Basepools**: Stableswap pools whose LP tokens can be used as assets in other pools
- **Metapools**: Pools that include a Basepool LP token as one of the underlying assets
