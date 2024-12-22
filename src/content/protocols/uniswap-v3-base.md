---
protocol: "Uniswap-V3"
website: "https://blog.uniswap.org/uniswap-v3"
x: "https://x.com/uniswap"
github:
  [
    "https://github.com/Uniswap/v3-core",
    "https://github.com/Uniswap/v3-periphery/",
  ]
defillama_slug: ["uniswap-v3"]
chain: "Base"
stage: "R"
risks: ["H", "L", "L", "L", "L"]
author: ["mmilien","CookingCryptos"]
submission_date: "2024-11-12"
publish_date: "2024-12-16"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---
⚠️ During our analysis, we identified two unverified contracts, [ProxyAdmin](https://basescan.org/address/0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9#code) and [TransparentUpgradeableProxy](https://basescan.org/address/0x4615C383F85D0a2BbED973d83ccecf5CB7121463#code), on Base. While these contracts remain unverified, if they match the deployed code on Ethereum mainnet, we can confirm the upgradability risk remains low. We strongly recommend that Uniswap verifies these contracts to ensure transparency and alignment with their security standards.

# Summary

Uniswap v3 is an AMM that builds upon Uniswap v2 by introducing a concentrated liquidity model, providing liquidity providers with granular control over capital allocation. Unlike v2, where liquidity is distributed uniformly across all price ranges, v3 allows LPs to specify custom price ranges in which their liquidity is active. This approach significantly improves capital efficiency, as LPs can concentrate their assets in high-demand price ranges, earning fees only within those specified ranges.
Uniswap v3 also introduces multiple fee tiers (0.01%, 0.05%, 0.3%, and 1%) to support different asset volatility profiles, allowing LPs to adjust their fee preferences based on expected risk and return. Additionally, it incorporates "range orders," which effectively turn liquidity positions into limit orders, further enhancing LP strategy flexibility.
The protocol is deployed across multiple chains enabling a wide range of use cases across decentralized finance (DeFi) applications.

# Overview

## Chain

Uniswap v3 is deployed on various chains. This review is based on the Base chain, an Ethereum L2 in Stage 0 according to L2BEAT.

> Chain score: H

## Upgradeability

The Uniswap DAO can change parameters such as fees through the `GorvernorBravoDelegator` contract.
Apart from the fees set by the governance, the protocol's contracts are immutable. No party is able to pause, revert trade execution, or otherwise change the behavior of the protocol.

No User funds nor unclaimed yield are affected by the remaining permissions.

Note that a `TransparentProxy` with the DAO as admin is used for the `NonFungibleTokenPositionDescriptor`, which is used for token descriptions.
However, this does not impact user funds or otherwise materially change the expected performance of the protocol.

> Upgradeabillity score: L

## Autonomy

There are no particular dependencies for the Uniswap protocol.

> Autonomy score: L

## Exit Window

No "Medium" or "High" risk permissions are found in the protocol that require protection with an Exit Window, but parameters such as protocol fees can be changed by the DAO. Note that the permissions controlled by the DAO are protected with a 1-week on-chain voting window and 2 to 30 days Exit Window for approved updates.

> Exit score: L

## Accessibility

Uniswap is accessible through multiple frontends. Uniswap offers main access through their main deployment: https://app.uniswap.org/. In addition to that,
the frontend app is also hosted on IPFS see here https://github.com/Uniswap/interface/releases. Further details on the maintenance and access of the interface hosted on IPFS can be found [here](https://blog.uniswap.org/uniswap-interface-ipfs). Additionally, users are offered the possibility to self host the frontend from here: https://github.com/Uniswap/interface.

> Accessibility score: L

# Technical Analysis

## Contracts

| Contrat Name                       | Address                                    |
|------------------------------------|--------------------------------------------|
| UniswapV3Factory                   | 0x33128a8fC17869897dcE68Ed026d694621f6FDfD |
| Multicall                          | 0x091e99cb1C49331a94dD62755D168E941AbD0693 |
| ProxyAdmin                         | 0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9 |
| TickLens                           | 0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d |
| NFTDescriptor                      | 0xF9d1077fd35670d4ACbD27af82652a8d84577d9F |
| NonfungibleTokenPositionDescriptor | 0x4f225937EDc33EFD6109c4ceF7b560B2D6401009 |
| TransparentUpgradeableProxy        | 0x4615C383F85D0a2BbED973d83ccecf5CB7121463 |
| NonfungiblePositionManager         | 0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1 |
| V3Migrator                         | 0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7 |
| QuoterV2                           | 0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a |
| SwapRouter02                       | 0x2626664c2603336E57B271c5C0b26F421741e481 |
| Permit2                            | 0x000000000022D473030F116dDEE9F6B43aC78BA3 |
| UniversalRouter                    | 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD |
| v3StakerAddress                    | 0x42bE4D6527829FeFA1493e1fb9F3676d2425C3C1 |


## Permission owners

| Name               | Account                                                                                                                   | Type           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------- |
|   | [](https://basescan.org/address/)      |  |
| | [](https://basescan.org/address/) |  |

## Permissions

| Contract                    | Function          | Impact                                                                                                                                                                                                                                              | Owner             |
|-----------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|


## Dependencies

No external dependency has been found.

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravo` contract.
The lock period is at least two days and up to 30 days for governance actions.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.
Additionally, governance actions initiated on Ethereum (L1) are enforced on Base (L2). This cross-chain enforcement ensures that Timelock decisions on L1 are consistently applied to the contracts on L2.

# Security Council

No security council needed because on-chain governance on Ethereum is in place, from which decisions get sent to Base.
