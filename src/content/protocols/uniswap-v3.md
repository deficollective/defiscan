---
protocol: "uniswap-v3"
website: "https://app.uniswap.org/"
x: "https://x.com/Uniswap"
github: "https://github.com/Uniswap"
defillama_slug: "uniswap-v3"
chain: "arbitrum"
stage: 0
risks: ["M", "'M'", "L", "H", "M"]
author: ["CookingCrytpos"]
submission_date: "2024-11-21"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Uniswap v3 is an AMM that builds upon Uniswap v2 by introducing a concentrated liquidity model, providing liquidity providers with granular control over capital allocation. Unlike v2, where liquidity is distributed uniformly across all price ranges, v3 allows LPs to specify custom price ranges in which their liquidity is active. This approach significantly improves capital efficiency, as LPs can concentrate their assets in high-demand price ranges, earning fees only within those specified ranges.
Uniswap v3 also introduces multiple fee tiers (0.01%, 0.05%, 0.3%, and 1%) to support different asset volatility profiles, allowing LPs to adjust their fee preferences based on expected risk and return. Additionally, it incorporates "range orders," which effectively turn liquidity positions into limit orders, further enhancing LP strategy flexibility.
The protocol is deployed across multiple chains enabling a wide range of use cases across decentralized finance (DeFi) applications.


# Overview

## Chain

See http://defiscan.info/learn-more#chain for more guidance.

## Upgradeability

See http://defiscan.info/learn-more#upgradability for more guidance.

## Autonomy

See http://defiscan.info/learn-more#autonomy for more guidance.

## Exit Window

See http://defiscan.info/learn-more#exit-window for more guidance.

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

# Technical Analysis

## Contracts

| Contract Name | Address |
| ------------- | ------- |
| contract 1    | 0x123   |
| contract 2    | 0x456   |

## Permission owners

| Name | Account                                       | Type         |
| ---- | --------------------------------------------- | ------------ |
| name | [address](https://etherscan.io/address/0x...) | Multisig x/y |

## Permissions

| Contract      | Function     | Impact      | Owner                   |
| ------------- | ------------ | ----------- | ----------------------- |
| contract name | functionname | description | owner of the permission |

## Dependencies

insert text

## Exit Window

insert text

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-team signers                           |
| ❌     | Signers are publicly announced (with name or pseudonym) |

