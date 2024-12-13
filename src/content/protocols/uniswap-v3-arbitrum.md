---
protocol: "uniswap-v3"
website: "https://app.uniswap.org/"
x: "https://x.com/Uniswap"
github: "https://github.com/Uniswap"
defillama_slug: "uniswap-v3"
chain: "arbitrum"
stage: Review
risks: ["M", "'H'", "L", "H", "M"]
author: ["CookingCryptos"]
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

Uniswap v3 is deployed on the Arbitrum chain, an Ethereum L2 in Stage 1 according to L2BEAT.

> Chain score: M

## Upgradeability

Uniswap V3 on Arbitrum retains significant upgradability permissions, with most critical functions controlled by an Externally Owned Account (EOA) at 0x2BAD8182C09F50c8318d769245beA52C32Be46CD. These permissions include functions such as setOwner and enableFeeAmount within the UniswapV3Factory contract. This setup allows the EOA to transfer ownership or enable new fee tiers, which introduces governance and operational risks. Additionally, pool-level permissions like setFeeProtocol and collectProtocol, which control fee adjustments and withdrawals, are also under the same ownership, further centralizing control and potentially impacting trading and revenue.

Proxy contracts in the protocol are managed through the ProxyAdmin contract, which is also owned by the same EOA. This contract holds critical permissions such as upgrade and upgradeAndCall, enabling modifications to implementation contracts. These permissions carry high risks of introducing vulnerabilities or malicious behavior through updates. TransparentUpgradeableProxy contracts are managed by ProxyAdmin, with control over functions like changeAdmin, upgradeTo, and upgradeToAndCall. These permissions, if exploited, could lead to unintended behavior or system disruptions.

Some immutability exists within the protocol. Certain permissions, such as renounceOwnership and transferOwnership in key contracts like TransparentUpgradeableProxy, are owned by the zero address. This effectively makes them unmodifiable and reduces risks in these specific areas. However, the centralized control over critical functions remains a notable concern.

The EOA ownership of key permissions poses critical risks to the protocol. The ability to update contracts or change governance without decentralized oversight creates vulnerabilities that could impact user funds or the expected performance of the system.

In the course of our analysis, we identified three contracts that are not verified on the blockchain. The three unverified contracts are:

NFTDescriptor: 0x42B24A95702b9986e82d421cC3568932790A48Ec
NonfungibleTokenPositionDescriptor: 0x91ae842A5Ffd8d12023116943e72A606179294f3
Multicall: 0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB
Without access to the source code, we cannot assess the permissions, upgradability, or potential risks associated with these contracts. This introduces an additional layer of uncertainty in the overall evaluation of the protocol.

> Chain score: H

## Autonomy

Uniswap V3 operates independently, with no reliance on external oracles, DeFi protocols, or cross-chain infrastructure. This self-sufficiency minimizes risks from external disruptions, ensuring stable performance.

> Autonomy score: L

## Exit Window

Uniswap V3 does not implement an exit window for its permissions. The protocol’s critical permissions, including those controlled by the EOA at 0x2BAD8182C09F50c8318d769245beA52C32Be46CD, do not have a mechanism that allows users to withdraw funds or adjust their positions in response to an unwanted update before it is executed. This lack of an enforced delay or safeguard exposes users to the risk of immediate changes without recourse, particularly given the reliance on a single externally owned account (EOA) for many sensitive permissions.

> Chain score: H

## Accessibility

Uniswap V3 offers a primary user interface hosted on its official platform, with the source code available publicly on [GitHub](https://github.com/Uniswap/interface)
 for self-hosting. This ensures that users can deploy their own interface in case of a shutdown of the official website. However, the reliance on a single main interface without other independent platforms or in-wallet integrations limits access options in the event of unexpected downtime.

> Accessibility score: M

# Technical Analysis

## Contracts

| Contrat Name                       | Address                                    |
|------------------------------------|--------------------------------------------|
| UniswapV3Factory                   | 0x1F98431c8aD98523631AE4a59f267346ea31F984 |
| Multicall                          | 0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB |
| ProxyAdmin                         | 0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2 |
| TickLens                           | 0xbfd8137f7d1516D3ea5cA83523914859ec47F573 |
| Quoter                             | 0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6 |
| SwapRouter                         | 0xE592427A0AEce92De3Edee1F18E0157C05861564 |
| NFTDescriptor                      | 0x42B24A95702b9986e82d421cC3568932790A48Ec |
| NonfungibleTokenPositionDescriptor | 0x91ae842A5Ffd8d12023116943e72A606179294f3 |
| TransparentUpgradeableProxy        | 0xEe6A57eC80ea46401049E92587E52f5Ec1c24785 |
| NonfungiblePositionManager         | 0xC36442b4a4522E871399CD717aBDD847Ab11FE88 |
| V3Migrator                         | 0xA5644E29708357803b5A882D272c41cC0dF92B34 |
| QuoterV2                           | 0x61fFE014bA17989E743c5F6cB21bF9697530B21e |
| SwapRouter02                       | 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45 |
| Permit2                            | 0x000000000022D473030F116dDEE9F6B43aC78BA3 |
| UniversalRouter                    | 0x5E325eDA8064b456f4781070C0738d849c824258 |
| v3StakerAddress                    | 0xe34139463bA50bD61336E0c446Bd8C0867c6fE65 |

## Permission owners

| Name               | Account                                                                                                                   | Type     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| Undeclared Address | [0x2BAD8182C09F50c8318d769245beA52C32Be46CD](https://arbiscan.io/address/0x2BAD8182C09F50c8318d769245beA52C32Be46CD)      | EOA      |
| ProxyAdmin         | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://arbiscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2#code) | Contract |

## Permissions

| Contract                                | Function          | Impact                                                                                                                                                                                                                                            | Owner                                      |
|-----------------------------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| UniswapV3Factory                        | setOwner          | The setOwner function allows the current owner of the UniswapV3Factory contract to transfer ownership to a new address (_owner). This could lead to ownership takeover if abused.                                                                 | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| UniswapV3Factory                        | enableFeeAmount   | This function enables a new fee tier for pools by the owner. Incorrect tick spacing or fee settings could lead to operational or security vulnerabilities in the protocol.                                                                        | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| UniswapV3Factory(UniswapV3Pool)         | setFeeProtocol    | This function allows the factory owner to set the fee protocol parameters for token0 and token1. Misuse could lead to excessive fees, impacting users trading in the pool.                                                                        | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| UniswapV3Factory(UniswapV3Pool)         | collectProtocol   | This function allows the factory owner to withdraw accumulated protocol fees. If exploited, it could result in unauthorized withdrawal of fees, reducing the protocol’s revenue and potentially affecting its ability to cover operational costs. | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin(Ownable)                     | renounceOwnership | This function allows the owner to relinquish ownership, leaving the contract without an owner. This disables all onlyOwner functions, making future administration impossible.                                                                    | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin(Ownable)                     | transferOwnership | This function allows the owner to transfer ownership to another address. If misused or compromised, ownership could be transferred to a malicious actor, leading to potential contract exploitation.                                              | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin                              | renounceOwnership | This function allows the owner to relinquish ownership, leaving the contract without an owner. This disables all onlyOwner functions, making future administration impossible.                                                                    | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin                              | transferOwnership | This function allows the owner to transfer ownership to another address. If misused or compromised, ownership could be transferred to a malicious actor, leading to potential contract exploitation.                                              | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin                              | changeProxyAdmin  | This function allows the admin of a proxy to be changed. If compromised, a malicious actor could take over proxy administration, leading to unauthorized upgrades or control.                                                                     | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin                              | upgrade           | This function allows upgrading the implementation of a proxy. A malicious upgrade could introduce vulnerabilities or malicious behavior in the proxy's implementation.                                                                            | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin                              | upgradeAndCall    | Similar to upgrade, but also allows calling a function in the new implementation immediately after the upgrade. This increases the attack surface by enabling arbitrary execution during the upgrade process.                                     | 0x2BAD8182C09F50c8318d769245beA52C32Be46CD |
| ProxyAdmin(TransparentUpgradeableProxy) | changeAdmin       | Allows the admin of the proxy to be changed. If misused, control of the proxy could be transferred to a malicious actor, compromising all admin-controlled operations.                                                                            | 0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2 |
| ProxyAdmin(TransparentUpgradeableProxy) | upgradeTo         | Allows the admin to upgrade the proxy to a new implementation. If exploited, a malicious implementation could be deployed, compromising the proxy's functionality.                                                                                | 0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2 |
| ProxyAdmin(TransparentUpgradeableProxy) | upgradeToAndCall  | Similar to upgradeTo, but with the added risk of allowing arbitrary function calls during the upgrade. This can be exploited to execute malicious actions immediately after upgrading the implementation.                                         | 0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2 |
| Ownable(TransparentUpgradeableProxy)    | renounceOwnership | This function allows the current owner to renounce ownership, leaving the contract ownerless. This could render the contract non-upgradable and restrict future changes, potentially locking funds or functionality.                              | 0x0000000000000000000000000000000000000000 |
| Ownable(TransparentUpgradeableProxy)    | transferOwnership | This function allows the current owner to transfer ownership to another address. If misused or called with an invalid address, it could lead to loss of control over the contract.                                                                | 0x0000000000000000000000000000000000000000 |
| ProxyAdmin(TransparentUpgradeableProxy) | renounceOwnership | Similar to Ownable.renounceOwnership, this function could leave the proxy administration without an owner, effectively disabling upgrades and admin changes for the proxy contract, creating operational and security risks.                      | 0x0000000000000000000000000000000000000000 |
| ProxyAdmin(TransparentUpgradeableProxy) | transferOwnership | This function enables the transfer of ownership of the proxy administration to a new address. An incorrect transfer could compromise control over all associated proxies, leading to potential exploitation.                                      | 0x0000000000000000000000000000000000000000 |
| TransparentUpgradeableProxy             | admin             | This function allows the admin to view the current admin address of the proxy. If improperly secured, it could expose sensitive details or allow unauthorized access to privileged functions.                                                     | 0xb753548f6e010e7e680ba186f9ca1bdab2e90cf2 |
| TransparentUpgradeableProxy             | implementation    | This function reveals the address of the current implementation contract. If improperly secured, it could expose sensitive implementation details, potentially allowing attackers to identify and exploit vulnerabilities in the logic.           | 0xb753548f6e010e7e680ba186f9ca1bdab2e90cf2 |

## Dependencies

Uniswap V3 is designed to function autonomously without dependencies on external oracles, other DeFi protocols, specific assets, other DEXs, cross-chain bridges, or cross-chain infrastructure. This design enhances its resilience and reduces potential points of failure.

## Exit Window

Uniswap V3 on Arbitrum does not implement an exit window mechanism. Critical permissions are controlled by the externally owned address (EOA) 0x2BAD8182C09F50C8318d769245beA52C32Be46CD, allowing changes to be executed immediately without delay. This setup leaves users with no opportunity to react or adjust their positions in response to potential unwanted updates.

# Security Council

The protocol doesn't use a multisig on Arbitrum

