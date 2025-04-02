---
protocol: "Uniswap-V3"
website: "https://uniswap.org/"
x: "https://x.com/uniswap"
github:
  [
    "https://github.com/Uniswap/v3-core",
    "https://github.com/Uniswap/v3-periphery/",
  ]
defillama_slug: ["uniswap-v3"]
chain: "Polygon"
stage: 0
reasons: []
risks: ["H", "L", "L", "L", "L"]
author: ["mmilien", "CookingCryptos", "sagaciousyves"]
submission_date: "2025-01-16"
publish_date: "2025-01-22"
update_date: "2025-01-31"
---

# Summary

Uniswap v3 is an AMM that builds upon Uniswap v2 by introducing a concentrated liquidity model, providing liquidity providers with granular control over capital allocation. Unlike v2, where liquidity is distributed uniformly across all price ranges, v3 allows LPs to specify custom price ranges in which their liquidity is active. This approach significantly improves capital efficiency, as LPs can concentrate their assets in high-demand price ranges, earning fees only within those specified ranges.
Uniswap v3 also introduces multiple fee tiers (0.01%, 0.05%, 0.3%, and 1%) to support different asset volatility profiles, allowing LPs to adjust their fee preferences based on expected risk and return. Additionally, it incorporates "range orders," which effectively turn liquidity positions into limit orders, further enhancing LP strategy flexibility.
The protocol is deployed across multiple chains enabling a wide range of use cases across decentralized finance (DeFi) applications.

# Overview

## Chain

Uniswap v3 is deployed on various chains. This review is based on the Polygon PoS chain, an EVM-compatible, proof-of-stake sidechain for Ethereum. Polygon PoS does not compose over a functional proof system. Instead, the chain relies on "single entities to safely update the state. A malicious proposer can finalize an invalid state, which can cause loss of funds." [[1]](https://l2beat.com/scaling/projects/polygon-pos)

> Chain score: High

## Upgradeability

Two potential updates can be implemented for the contracts deployed on Polygon that comprise the Uniswap V3 deployment:

1. Adjusting the Fee Parameter
2. Updating the `NonFungibleTokenPositionDescriptor` Implementation (via the proxy upgradeable pattern)

These updates require a governance vote on the Ethereum chain through Uniswap's on-chain governance system. The execution of this vote is trustless but involves the Polygon native cross-chain messaging protocol. This protocol can censor valid governance vote results or include invalid results. The risk of such malicious activity is reflected in the [#Chain](#chain) score.

Beyond these updates, the protocol’s contracts are immutable. No entity has the ability to pause, revert trade execution, or alter the protocol's behavior in any other way. Importantly, no user funds or unclaimed yield are impacted by the remaining permissions or by the risk of manipulating Uniswap governance vote results through Polygon's cross-chain messaging protocol.

> Upgradeability score: Low

## Autonomy

There are no particular dependencies for the Uniswap protocol.

> Autonomy score: Low

## Exit Window

No "Medium" or "High" risk permissions are found in the protocol that require protection with an Exit Window, but parameters such as protocol fees can be changed by the DAO. Note that the permissions controlled by the DAO are protected with a 1-week on-chain voting window and 2 to 30 days Exit Window for approved updates.

> Exit score: Low

## Accessibility

Uniswap is accessible through multiple frontends. Uniswap offers main access through their main deployment: https://app.uniswap.org/. In addition to that,
the frontend app is also hosted on IPFS see here https://github.com/Uniswap/interface/releases. Further details on the maintenance and access of the interface hosted on IPFS can be found [here](https://blog.uniswap.org/uniswap-interface-ipfs). Additionally, users are offered the possibility to self host the frontend from here: https://github.com/Uniswap/interface.

> Accessibility score: Low

# Technical Analysis

## Contracts

| Contract Name                      | Address                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| UniswapV3Factory                   | [0x1F98431c8aD98523631AE4a59f267346ea31F984](https://polygonscan.com/address/0x1F98431c8aD98523631AE4a59f267346ea31F984) |
| Multicall                          | [0x1F98415757620B543A52E61c46B32eB19261F984](https://polygonscan.com/address/0x1F98415757620B543A52E61c46B32eB19261F984) |
| ProxyAdmin                         | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://polygonscan.com/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) |
| TickLens                           | [0xbfd8137f7d1516D3ea5cA83523914859ec47F573](https://polygonscan.com/address/0xbfd8137f7d1516D3ea5cA83523914859ec47F573) |
| Quoter                             | [0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6](https://polygonscan.com/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6) |
| SwapRouter                         | [0xE592427A0AEce92De3Edee1F18E0157C05861564](https://polygonscan.com/address/0xE592427A0AEce92De3Edee1F18E0157C05861564) |
| NFTDescriptor                      | [0x42B24A95702b9986e82d421cC3568932790A48Ec](https://polygonscan.com/address/0x42B24A95702b9986e82d421cC3568932790A48Ec) |
| NonfungibleTokenPositionDescriptor | [0x91ae842A5Ffd8d12023116943e72A606179294f3](https://polygonscan.com/address/0x91ae842A5Ffd8d12023116943e72A606179294f3) |
| TransparentUpgradeableProxy        | [0xEe6A57eC80ea46401049E92587E52f5Ec1c24785](https://polygonscan.com/address/0xEe6A57eC80ea46401049E92587E52f5Ec1c24785) |
| NonfungiblePositionManager         | [0xC36442b4a4522E871399CD717aBDD847Ab11FE88](https://polygonscan.com/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88) |
| V3Migrator                         | [0xA5644E29708357803b5A882D272c41cC0dF92B34](https://polygonscan.com/address/0xA5644E29708357803b5A882D272c41cC0dF92B34) |
| QuoterV2                           | [0x61fFE014bA17989E743c5F6cB21bF9697530B21e](https://polygonscan.com/address/0x61fFE014bA17989E743c5F6cB21bF9697530B21e) |
| SwapRouter02                       | [0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45](https://polygonscan.com/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45) |
| Permit2                            | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://polygonscan.com/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |
| UniversalRouter                    | [0xec7BE89e9d109e7e3Fec59c222CF297125FEFda2](https://polygonscan.com/address/0xec7BE89e9d109e7e3Fec59c222CF297125FEFda2) |
| v3StakerAddress                    | [0xe34139463bA50bD61336E0c446Bd8C0867c6fE65](https://polygonscan.com/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65) |
| EthereumProxy                      | [0x8a1B966aC46F42275860f905dbC75EfBfDC12374](https://polygonscan.com/address/0x8a1B966aC46F42275860f905dbC75EfBfDC12374) |

## Permission owners

| Name          | Account                                                                                                                  | Type                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| EthereumProxy | [0x8a1B966aC46F42275860f905dbC75EfBfDC12374](https://polygonscan.com/address/0x8a1B966aC46F42275860f905dbC75EfBfDC12374) | Cross-chain proxy contract |

## Permissions

| Contract         | Function          | Impact                                                                                                                                                                                                                                   | Owner                                                                             |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| UniswapV3Factory | setOwner          | Changes the owner to a new address. The DAO can appoint a new owner which can set fees on various pools (setProtocolFee), collect fees on behalf of the protocol and allow new tick spaces for new deployed pools.                       | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |
| UniswapV3Factory | enableFeeAmount   | Enables the creation of new fee tiers for pools by enabling a specific fee amount paired with a corresponding tick spacing.                                                                                                              | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |
| ProxyAdmin       | renounceOwnership | Abandons ownership of the contract. The DAO would renounce the access to the administrative functions of the contracts, which includes upgrading the `NonFungibleTokenPositionDescriptor` contract.                                      | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |
| ProxyAdmin       | changeProxyAdmin  | Updates the admin of the `TransparentUpgradeableProxy`: the account with the rights to upgrade the proxy's implementation. This would replace the role of the `ProxyAdmin` contract and could be used to upgrade (replace) `ProxyAdmin`. | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |
| ProxyAdmin       | transferOwnership | Updates the owner of the `ProxyAdmin` contract: the account with the rights to change the admin of the proxy and upgrade the `NonFungibleTokenPositionDescriptor` contract.                                                              | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |
| ProxyAdmin       | upgrade           | Triggers the upgrade of the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions.                                                                                                                 | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |
| ProxyAdmin       | upgradeAndCall    | Triggers the upgrade of the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions and then call a function in the new contract.                                                                    | EthereumProxy , controlled by TimeLocked DAO contract (GovernorBravo) on Ethereum |

## Governance Decision Enforcement from L1 to Polygon

When a vote has passed on the [Governor Contract](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) on Ethereum Mainnet, the decision gets queued by calling `queue` (the payload is then stored on the [Timelock contract](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC)). After the waiting period has passed any address can permissionessly call `execute` on the Governor contract which calls `executeTransaction` on the Timelock contract.

If a vote has passed and is queued that has changes for the Polygon deployment the payload must specify as target the L1 contract for Cross-chain messaging by Polygon called [FxRoot](https://etherscan.io/address/0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2). This in turn calls `syncState` on the [StateSender contract](https://etherscan.io/address/0x28e4F3a7f651294B9564800b2D01f35189A5bFbE). This emits an event `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)`.

> "All the validators on the Heimdall chain (Consensus Layer) receive this event and one of them, whoever wishes to get the transaction fees for state sync sends this transaction to Heimdall. Once state-sync transaction on Heimdall has been included in a block, it is added to pending state-sync list" [[2]](#sources).

The Execution Layer (Bor chain) Validators pick this up and include a transaction where [StateReceiver](https://polygonscan.com/address/0x0000000000000000000000000000000000001001) calls the function `onStateReceive` on [FxChild](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a) which calls the function ` processMessageFromRoot` on the [EthereumProxy](https://polygonscan.com/address/0x8a1B966aC46F42275860f905dbC75EfBfDC12374).

This means that a sufficiently large validator set has the ability to censor Uniswap governance vote results that are to be executed on the Polygon chain or include invalid governance vote results.

However, due to the limited permissions given to Uniswap governance, the impact of a censored/malicious governance vote result by the validators remains low.

## Dependencies

No external dependency has been found.

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol fees can be changed by the DAO. A Timelock protects the contracts and updates are governed by the GovernorBravo contract. The lock period is at least two days and up to 30 days for governance actions. When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.
Subsequently, governance actions initiated on Ethereum (L1) are enforced on Polygon (L2) with some guarantees (see [Governance Decision Enforcement from L1 to Polygon](#governance-decision-enforcement-from-l1-to-polygon)).

# Security Council

No security council needed because on-chain governance on Ethereum is in place, from which decisions get sent to Polygon.

# Sources

- [1] https://l2beat.com/scaling/projects/polygon-pos
- [2] https://docs.polygon.technology/pos/architecture/bor/state-sync/
