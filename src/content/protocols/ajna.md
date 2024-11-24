---
protocol: "Ajna V2"
website: "https://ajnafi.com/"
x: "https://x.com/ajnafi"
github: "https://github.com/ajna-finance"
defillama_slug: "ajna-v2"
chain: "Ethereum"
stage: 1
risks: ["L","L","L","L","M"]
author: ["brianmcmichael"]
submission_date: "2024-11-19"
publish_date: "2024-11-23"
acknowledge_date: "2024-11-22"
update_date: "1970-01-01"
---

# Summary

The Ajna Protocol is a decentralized, noncustodial system for permissionless lending and borrowing that functions without governance or external price feeds. It operates through isolated pools where lenders provide liquidity at market-driven price levels, and borrowers secure loans using fungible or non-fungible collateral, ensuring autonomy, fairness, and resilience.

# Overview

## Chain

The Ajna Protocol is deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

The protocol is immutable and permissionless by design and no heightened permissions are granted by the protocol code.

Ajna does not require ownership permissions because it is fully decentralized and permissionless, allowing anyone to create, lend, or borrow in pools without the need for approval. Its governance-free design eliminates centralized control, relying on deterministic smart contract rules and market-driven mechanisms to ensure fair and transparent operations.

> Upgradeability score: L

## Autonomy

The protocol has no external dependencies.

Ajna eliminates external dependencies by using a market-driven system where lenders specify lending prices and borrowers provide collateral, removing the need for oracles. Its self-regulating mechanisms, such as price buckets and utilization-based interest rate adjustments, ensure fair and efficient market operation without reliance on external price feeds​.

> Autonomy score: L

## Exit Window

Ajna Protocol's contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

> Exit Window score: L

## Accessibility

Two user interfaces exist and are operated by independent actors. However, on one of the two frontends (summer.fi) users hold their positions not with their EOAs/Smart Account directly but instead with a smart account by summer.fi for which no simple UI exists to withdraw/transfer positions through another UI.

To get a low risk for accessibility, users should be able to at least withdraw their position through a second, independent UI and clear instructions how to do so.

A list of third-party frontends can be found [here](https://www.ajna.finance/).

> Accessibility score: M

# Technical Analysis

See [Whitepaper: AJNA PROTOCOL: Automated Lending Markets](https://www.ajna.finance/pdf/Ajna_Protocol_Whitepaper_01-11-2024.pdf)

## Contracts

| Contract Name            | Address                                    |
| ------------------------ | ------------------------------------------ |
| AJNA token               | [0x9a96ec9B57Fb64FbC60B423d1f4da7691Bd35079](https://etherscan.io/address/0x9a96ec9B57Fb64FbC60B423d1f4da7691Bd35079)                     |
| ERC20 factory            | [0x6146DD43C5622bB6D12A5240ab9CF4de14eDC625](https://etherscan.io/address/0x6146DD43C5622bB6D12A5240ab9CF4de14eDC625)                     |
| ERC721 factory           | [0x27461199d3b7381De66a85D685828E967E35AF4c](https://etherscan.io/address/0x27461199d3b7381De66a85D685828E967E35AF4c)                     |
| PoolInfoUtils            | [0x30c5eF2997d6a882DE52c4ec01B6D0a5e5B4fAAE](https://etherscan.io/address/0x30c5eF2997d6a882DE52c4ec01B6D0a5e5B4fAAE)                     |
| PoolInfoUtilsMulticall   | [0xe4e553243264f2bF7C135F1eC3a8c09078731227](https://etherscan.io/address/0xe4e553243264f2bF7C135F1eC3a8c09078731227)                     |
| PositionManager          | [0x87B0F458d8F1ACD28A83A748bFFbE24bD6B701B1](https://etherscan.io/address/0x87B0F458d8F1ACD28A83A748bFFbE24bD6B701B1)                     |
| BurnWrapper              | [0x936Ab482d6bd111910a42849D3A51Ff80BB0A711](https://etherscan.io/address/0x936Ab482d6bd111910a42849D3A51Ff80BB0A711)                     |
| GrantFund                | [0x74d5b005ca64a5C9EE3611Bdc6F6C02D93C84b2f](https://etherscan.io/address/0x74d5b005ca64a5C9EE3611Bdc6F6C02D93C84b2f)                     |

## Permission owners

None. Ajna does not have any permissioned owners because it operates as a fully decentralized, governance-free protocol, with all functions controlled by deterministic smart contract rules. Anyone can deploy the protocol on compatible EVMs, ensuring its accessibility and independence from centralized authority or ownership.

## Permissions

None. 🎉

## Dependencies

None.

Ajna Finance enables borrowing and lending without external oracles by relying on a market-driven mechanism where lenders specify the price (in terms of quote tokens per unit of collateral) they are willing to lend at. This design eliminates the need for external price feeds by aggregating lender inputs into "price buckets," which act as discrete pricing tiers for collateral. Borrowers can access liquidity by pledging collateral against these buckets, while the protocol automatically adjusts interest rates based on pool utilization and collateralization levels. This ensures stability and fairness through self-regulating market dynamics, independent of external dependencies​.

Ajna's liquidation works without oracles by triggering auctions when a loan's collateralization falls below the pool's Lowest Utilized Price (LUP). Liquidation is initiated by users posting a bond and proceeds through a Dutch auction, where collateral is sold at decaying prices until the debt is repaid. This market-driven process ensures fair price discovery, with penalties discouraging unnecessary liquidations and rewards incentivizing valid ones.

## Exit Window

The protocol is completely immutable, thus no exit window is required. 🎉

# Security Council

None. Ajna does not require a security council because its protocol is fully decentralized and permissionless, with deterministic rules governing operations such as interest rates, liquidations, and collateral management. By eliminating governance and relying on market-driven mechanisms, Ajna avoids the need for centralized oversight or decision-making. Additionally, the protocol underwent eight external [audits](https://github.com/ajna-finance/audits) prior to launch, ensuring its security and reliability from the outset.
