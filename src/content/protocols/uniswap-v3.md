---
protocol: "Uniswap-V3"
website: "https://blog.uniswap.org/uniswap-v3"
x: "https://x.com/uniswap"
github: "https://github.com/Uniswap/v3-periphery/"
defillama_slug: "uniswap-v3"
chain: "Ethereum Mainnet"
stage: 1
risks: ["L", "M", "L", "M", "L"]
author: ["Emilien"]
submission_date: "2024-11-12"
publish_date: "2024-12-14"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Uniswap v3 is an AMM that builds upon Uniswap v2 by introducing a concentrated liquidity model, providing liquidity providers with granular control over capital allocation. Unlike v2, where liquidity is distributed uniformly across all price ranges, v3 allows LPs to specify custom price ranges in which their liquidity is active. This approach significantly improves capital efficiency, as LPs can concentrate their assets in high-demand price ranges, earning fees only within those specified ranges.
Uniswap v3 also introduces multiple fee tiers (0.01%, 0.05%, 0.3%, and 1%) to support different asset volatility profiles, allowing LPs to adjust their fee preferences based on expected risk and return. Additionally, it incorporates "range orders," which effectively turn liquidity positions into limit orders, further enhancing LP strategy flexibility.
The protocol is deployed across multiple chains enabling a wide range of use cases across decentralized finance (DeFi) applications.

# Overview

## Chain

Uniswap is deployed on Ethereum mainnet, Arbitrum, Optimism, Polygon, Base, BNB,
Avalanche C-Chain, CELO, Blast, ZKsync, Zora, and WorldChain. This analysis is
based on the contracts deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

Uniswap pools are permissionless with anyone being able to swap. Nonetheless the Uniswap DAO
(UNI token holders) can change parameters such as fees through the GorvernorBravoDelegator contract.
Apart from the fees set by the governance, the protocol's contracts are immutable. No party is able to
pause, reverse trade execution, or otherwise change the behavior of the protocol.

Note that a TransparentProxy with the DAO as admin is used for the NonFungibleTokenPositionDescriptor, which is used for token descriptions.
This should not impact the safety of the protocol.

> Upgradeabillity score: M

## Autonomy

There are no particular dependencies for the Uniswap protocol.

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. Propositions can be voted on over the duration of a week, and if a
proposal is approved it can take effect between 2 and 30 days later.

> Exit score: M

## Accessibility

Although there is only a unique official uniswap frontend, Uniswap Labs offers an [open source interface](https://github.com/Uniswap/interface) for all Uniswap protocols. The web app is also hosted on IPFS.

> Accessibility score: L

# Technical Analysis

## Contracts

| Contract Name                      | Address                                    |
| ---------------------------------- | ------------------------------------------ |
| UniswapV3Factory                   | 0x1F98431c8aD98523631AE4a59f267346ea31F984 |
| Multicall2                         | 0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696 |
| ProxyAdmin                         | 0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2 |
| TickLens                           | 0xbfd8137f7d1516D3ea5cA83523914859ec47F573 |
| Quoter                             | 0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6 |
| SwapRouter                         | 0xE592427A0AEce92De3Edee1F18E0157C05861564 |
| NFTDescriptor                      | 0x42B24A95702b9986e82d421cC3568932790A48Ec |
| NonfungibleTokenPositionDescriptor | 0x91ae842A5Ffd8d12023116943e72A606179294f3 |
| TransparentUpgradeableProxy        | 0xEe6A57eC80ea46401049E92587E52f5Ec1c24785 |
| NonfungiblePositionManager         | 0xC36442b4a4522E871399CD717aBDD847Ab11FE88 |
| V3Migrator                         | 0xA5644E29708357803b5A882D272c41cC0dF92B34 |

## Permission owners

| Name                        | Account                                                                            | Type                |
| --------------------------- | ---------------------------------------------------------------------------------- | ------------------- |
| ProxyAdmin                  | [address](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC) | TimeLock Contract   |
| TransparentUpgradeableProxy | [address](https://etherscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) | ProxyAdmin Contract |
| GovernerBravo               | [address](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) | Contract            |

## Permissions

| Contract                         | Function          | Impact                                                  | Owner                                   |
| -------------------------------- | ----------------- | ------------------------------------------------------- | --------------------------------------- |
| UniswapV3Factory                 | setOwner          | changes the owner to a new address                      | TimeLocked DAO contract (GovernorBravo) |
| UniswapV3Factory                 | enableFeeAmount   | enables a fee amount for a given tick spacing           | TimeLocked DAO contract (GovernorBravo) |
| UniswapV3Factory (UniswapV3Pool) | setFeeProtocol    | set the protocol's % share of the fees                  | TimeLocked DAO contract (GovernorBravo) |
| UniswapV3Factory (UniswapV3Pool) | collectProtocol   | withdraw accumulated protocol fees to custom address    | TimeLocked DAO contract (GovernorBravo) |
| ProxyAdmin                       | renounceOwnership | abandons ownership to the contract                      | TimeLocked DAO contract (GovernorBravo) |
| ProxyAdmin                       | changeProxyAdmin  | changes ownership to the contract                       | TimeLocked DAO contract (GovernorBravo) |
| ProxyAdmin                       | upgrade           | upgrades the contract                                   | TimeLocked DAO contract (GovernorBravo) |
| TransparentUpgradeableProxy      | changeAdmin       | update the proxy admin                                  | TimeLocked DAO contract (GovernorBravo) |
| TransparentUpgradeableProxy      | upgradeTo         | upgrade the NonfungibleTokenPositionDescriptor contract | TimeLocked DAO contract (GovernorBravo) |
| TransparentUpgradeableProxy      | upgradeToAndCall  | upgrade the contract and call a function                | TimeLocked DAO contract (GovernorBravo) |
| Ownable                          | transferOwnership | changes the owner                                       | 0x0                                     |
| Ownable                          | renounceOwnership | abandons ownership                                      | 0x0                                     |
| ProxyAdmin                       | transferOwnership | changes the owner                                       | 0x0                                     |
| ProxyAdmin                       | renounceOwnership | abandons ownership                                      | 0x0                                     |

## Dependencies

No external dependency has been found.

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. Timelocks protect the contracts and update are governed by the Governor Bravo contract.
The lock period is at least two days and up to 30 days for governance actions.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.
