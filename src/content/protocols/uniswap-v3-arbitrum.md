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
chain: "Arbitrum"
stage: "O"
reasons: ["Unverified Contracts"]
risks: ["M", "L", "L", "L", "L"]
author: ["mmilien", "CookingCryptos"]
submission_date: "2024-11-12"
publish_date: "2024-12-16"
update_date: "1970-01-01"
---

⚠️ During our analysis, we identified three unverified contracts, [NFTDescriptor](https://arbiscan.io/address/0x42B24A95702b9986e82d421cC3568932790A48Ec#code), [NonfungibleTokenPositionDescriptor](https://arbiscan.io/address/0x91ae842A5Ffd8d12023116943e72A606179294f3#code) and [Multicall](https://arbiscan.io/address/0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB#code), on Arbitrum. While these contracts remain unverified, if they match the deployed code on Ethereum mainnet, we can confirm the upgradability risk remains low. We strongly recommend that Uniswap verifies these contracts to ensure transparency and alignment with their security standards.

# Summary

Uniswap v3 is an AMM that builds upon Uniswap v2 by introducing a concentrated liquidity model, providing liquidity providers with granular control over capital allocation. Unlike v2, where liquidity is distributed uniformly across all price ranges, v3 allows LPs to specify custom price ranges in which their liquidity is active. This approach significantly improves capital efficiency, as LPs can concentrate their assets in high-demand price ranges, earning fees only within those specified ranges.
Uniswap v3 also introduces multiple fee tiers (0.01%, 0.05%, 0.3%, and 1%) to support different asset volatility profiles, allowing LPs to adjust their fee preferences based on expected risk and return. Additionally, it incorporates "range orders," which effectively turn liquidity positions into limit orders, further enhancing LP strategy flexibility.
The protocol is deployed across multiple chains enabling a wide range of use cases across decentralized finance (DeFi) applications.

# Overview

## Chain

Uniswap v3 is deployed on various chains. This review is based on the Arbitrum chain, an Ethereum L2 in Stage 1 according to L2BEAT.

> Chain score: M

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

| Contrat Name                       | Address                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| UniswapV3Factory                   | [0x1F98431c8aD98523631AE4a59f267346ea31F984](https://arbiscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984) |
| Multicall                          | [0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB](https://arbiscan.io/address/0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB) |
| ProxyAdmin                         | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://arbiscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) |
| TickLens                           | [0xbfd8137f7d1516D3ea5cA83523914859ec47F573](https://arbiscan.io/address/0xbfd8137f7d1516D3ea5cA83523914859ec47F573) |
| Quoter                             | [0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6](https://arbiscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6) |
| SwapRouter                         | [0xE592427A0AEce92De3Edee1F18E0157C05861564](https://arbiscan.io/address/0xE592427A0AEce92De3Edee1F18E0157C05861564) |
| NFTDescriptor                      | [0x42B24A95702b9986e82d421cC3568932790A48Ec](https://arbiscan.io/address/0x42B24A95702b9986e82d421cC3568932790A48Ec) |
| NonfungibleTokenPositionDescriptor | [0x91ae842A5Ffd8d12023116943e72A606179294f3](https://arbiscan.io/address/0x91ae842A5Ffd8d12023116943e72A606179294f3) |
| TransparentUpgradeableProxy        | [0xEe6A57eC80ea46401049E92587E52f5Ec1c24785](https://arbiscan.io/address/0xEe6A57eC80ea46401049E92587E52f5Ec1c24785) |
| NonfungiblePositionManager         | [0xC36442b4a4522E871399CD717aBDD847Ab11FE88](https://arbiscan.io/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88) |
| V3Migrator                         | [0xA5644E29708357803b5A882D272c41cC0dF92B34](https://arbiscan.io/address/0xA5644E29708357803b5A882D272c41cC0dF92B34) |
| QuoterV2                           | [0x61fFE014bA17989E743c5F6cB21bF9697530B21e](https://arbiscan.io/address/0x61fFE014bA17989E743c5F6cB21bF9697530B21e) |
| SwapRouter02                       | [0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45](https://arbiscan.io/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45) |
| Permit2                            | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://arbiscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |
| UniversalRouter                    | [0x5E325eDA8064b456f4781070C0738d849c824258](https://arbiscan.io/address/0x5E325eDA8064b456f4781070C0738d849c824258) |
| v3StakerAddress                    | [0xe34139463bA50bD61336E0c446Bd8C0867c6fE65](https://arbiscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65) |
| L2 Alias                           | [0x2BAD8182C09F50c8318d769245beA52C32Be46CD](https://arbiscan.io/address/0x2BAD8182C09F50c8318d769245beA52C32Be46CD) |

## Permission owners

| Name              | Account                                                                                                                   | Type           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- |
| L2 Alias Timelock | [0x2BAD8182C09F50c8318d769245beA52C32Be46CD](https://arbiscan.io/address/0x2BAD8182C09F50c8318d769245beA52C32Be46CD)      | Alias Contract |
| ProxyAdmin        | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://arbiscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2#code) | Contract       |

## Permissions

| Contract                    | Function          | Impact                                                                                                                                                                                                                                              | Owner             |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| UniswapV3Factory            | setOwner          | Changes the owner to a new address. The DAO can appoint a new owner which can set fees on various pools (setProtocolFee), collect fees on behalf of the protocol and allow new tick spaces for new deployed pools.                                  | L2 Alias Timelock |
| UniswapV3Factory            | enableFeeAmount   | Enables the creation of new fee tiers for pools by enabling a specific fee amount paired with a corresponding tick spacing.                                                                                                                         | L2 Alias Timelock |
| UniswapV3Pool               | setFeeProtocol    | Allows the owner to set a fee percentage that is deducted from the LPs fees. It only affects the pool where the function is called. The fee is required to be less than 10% of the total accumulated fees. It only affects future accumulated fees. | L2 Alias Timelock |
| UniswapV3Pool               | collectProtocol   | Withdraws the accumulated protocol fees to a custom address. The DAO triggers the withdraw and specifies the address.                                                                                                                               | L2 Alias Timelock |
| ProxyAdmin                  | renounceOwnership | Abandons ownership of the contract. The DAO would renounce the access to the administrative functions of the contracts, which includes upgrading the `NonFungibleTokenPositionDescriptor` contract.                                                 | L2 Alias Timelock |
| ProxyAdmin                  | transferOwnership | Updates the owner of the `ProxyAdmin` contract: the account with the rights to change the admin of the proxy and upgrade the `NonFungibleTokenPositionDescriptor` contract.                                                                         | L2 Alias Timelock |
| ProxyAdmin                  | changeProxyAdmin  | Updates the admin of the `TransparentUpgradeableProxy`: the account with the rights to upgrade the proxy's implementation. This would replace the role of the `ProxyAdmin` contract and could be used to upgrade (replace) `ProxyAdmin`.            | L2 Alias Timelock |
| ProxyAdmin                  | upgrade           | Triggers the upgrade of the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions.                                                                                                                            | L2 Alias Timelock |
| ProxyAdmin                  | upgradeAndCall    | Triggers the upgrade of the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions and then call a function in the new contract.                                                                               | L2 Alias Timelock |
| TransparentUpgradeableProxy | changeAdmin       | Updates the proxy's admin: the account with the rights to upgrade the proxy's implementation. This would replace the role of the `ProxyAdmin` contract and could be used to upgrade (replace) `ProxyAdmin`.                                         | ProxyAdmin        |
| TransparentUpgradeableProxy | upgradeTo         | Upgrades the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions.                                                                                                                                           | ProxyAdmin        |
| TransparentUpgradeableProxy | upgradeToAndCall  | Upgrades the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions and then call a function in the new contract.                                                                                              | ProxyAdmin        |

## Dependencies

No external dependency has been found.

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravo` contract.
The lock period is at least two days and up to 30 days for governance actions.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.
Additionally, governance actions initiated on Ethereum (L1) are enforced on Arbitrum (L2). This cross-chain enforcement ensures that Timelock decisions on L1 are consistently applied to the contracts on L2.

# Security Council

No security council needed because on-chain governance on Ethereum is in place, from which decisions get sent to Arbitrum.
