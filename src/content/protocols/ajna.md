---
protocol: "Ajna Protocol"
website: "https://ajnafi.com/"
x: "https://x.com/ajnafi"
github: "https://github.com/ajna-finance"
defillama_slug: "ajna-protocol"
chain: "Ethereum"
stage: 2
risks: ["L","L","L","L","L"]
author: ["brianmcmichael"]
submission_date: "2024-11-19"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

The Ajna Protocol is a noncustodial, peer-to-pool, permissionless lending, borrowing and trading system that requires no governance or external price feeds to function. The protocol consists of pools with lenders and borrowers.

# Overview

## Chain

The Ajna Protocol is deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

The protocol is immutable and permissionless by design and no heightened permissions are granted by the protocol code.

> Upgradeability score: L

## Autonomy

The protocol relies on a price bucket mechanism managed by lenders and borrowers, negating the need for any oracles or external feeds.

> Autonomy score: L

## Exit Window

Ajna Protocol's contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

> Exit Window score: L

## Accessibility

Multiple user interfaces exist and are operated by independent actors ensuring access to the protocol and user funds even if an interface is shutdown or censors a user's transactions.

A list of third-party frontends can be found [here](https://www.ajna.finance/).

> Accessibility score: L

# Technical Analysis

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

None. Ajna Protocol is ownerless by design. Copies of the code can be deployed permissionlessly on compatible EVMs.

## Permissions

None. Ajna Protocol is permissionless by design.

## Dependencies

None. Ajna Protocol has no external dependencies. No oracles, no governance. Mechanism design is incentive-based.

## Exit Window

The protocol is completely immutable, thus no exit window is required 🎉

Pools are isolated from each other so damage caused by a market failure or technical flaw in a specific collateral is isolated to the individual pool.

# Security Council

The protocol is completely immutable, thus no Security Council is required 🎉
