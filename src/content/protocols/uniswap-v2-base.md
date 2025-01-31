---
protocol: "Uniswap-V2"
website: "https://app.uniswap.org"
x: "https://x.com/uniswap"
github:
  [
    "https://github.com/Uniswap/v2-core",
    "https://github.com/Uniswap/v2-periphery",
  ]
defillama_slug: ["uniswap-v2"]
chain: "Base"
stage: 0
reasons: []
risks: ["H", "L", "L", "L", "L"]
author: ["CookingCryptos"]
submission_date: "2025-01-14"
publish_date: "2025-01-29"
update_date: "1970-01-01"
---

# Summary

Uniswap v2 is a decentralized automated market maker (AMM) that builds upon the original Uniswap protocol by introducing several key features to enhance functionality and flexibility for liquidity providers (LPs) and traders. Unlike its predecessor, Uniswap v2 enables direct token-to-token swaps, eliminating the need to route trades through ETH as an intermediary.
Another notable improvement is the introduction of flash swaps, which allow users to withdraw assets without upfront capital as long as the borrowed amount is returned by the end of the transaction. This feature facilitates advanced use cases like arbitrage, collateral swapping, and debt refinancing.
Additionally, Uniswap v2 integrates price oracles that mitigate manipulation risks by providing time-weighted average prices (TWAP) over a given period, which has become a critical component for DeFi protocols reliant on secure pricing mechanisms.

# Overview

## Chain

Uniswap v2 is deployed on various chains. This review is based on the Base chain, an Ethereum L2 in Stage 0 according to L2BEAT.

> Chain score: H

## Upgradeability

The Uniswap V2 protocol allows UNI token holders to update certain fee parameters through an on-chain governance process. These updates enable the token holders to activate and deactivate protocol fees and to change the recipient of such fees.

These updates require a governance vote on the Ethereum chain through Uniswap's on-chain governance system. The execution of this vote is trustless but involves the Base (Optimism stack) native cross-chain messaging protocol. This protocol cannot censor governance vote results and hence does not introduce new risks.

Apart from these fee parameters, the protocol's contracts are immutable. No party is able to pause, revert trade execution, or otherwise change the behavior of the protocol.

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

| Contract Name                          | Address                                                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| UniswapV2Factory                       | [0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6](https://basescan.org/address/0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6) |
| UniswapV2Pair                          | [0xb3b850f720d0d2f38a0189d8a986ff5f8d8d34bb](https://basescan.org/address/0xb3b850f720d0d2f38a0189d8a986ff5f8d8d34bb) |
| UniswapV2Router02                      | [0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24](https://basescan.org/address/0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24) |
| CrossChainAccount                      | [0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9](https://basescan.org/address/0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9) |


The `UniswapV2Pair`'s address is an example instance of the contract. All pairs share the same implementation (based of Factory Pattern).

## Permission owners

| Name              | Account                                                                                                               | Type     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| CrossChainAccount | [0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9](https://basescan.org/address/0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9) | Contract |

## Permissions

| Contract               | Function            | Impact                                                                                                                                                                                                                                                                                                                                                                                                                   | Owner             |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| UniswapV2Factory       | setFeeTo            | This function allows the `FeeToSetter` to set the address where protocol fees are collected. If `feeTo` is the 0-address no fees are collected on any of the Uniswap V2 Pools. If fees are collected (`feeTo` != 0-address) they are fixed to be 1/6 of the LP collected fees from the moment where the fee switch is activated. If abused by the FeeToSetter role, fees could be redirected to an unauthorized address. | CrossChainAccount |
| UniswapV2Factory       | setFeeToSetter      | This function permits the current `FeeToSetter` to assign a new `FeeToSetter`. A malicious actor could take control and redirect fees or alter the fee settings (see `setFeeTo`).                                                                                                                                                                                                                                        | CrossChainAccount |


## Governance Decision Enforcement from L1 to Base

When a vote has passed on the [Governor Contract](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) on Ethereum Mainnet, the decision gets queued by calling `queue` (the payload is then stored on the [Timelock contract](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC)). After the waiting period has passed any address can permissionessly call `execute` on the Governor contract which calls `executeTransaction` on the Timelock contract.

If a vote has passed and is queued that has changes for the Base deployment the payload must specify as target the L1 contract for Cross-chain messaging by Base called [L1CrossDomainMessenger](https://etherscan.io/address/0x866E82a600A1414e583f7F13623F1aC5d58b0Afa).

When the transaction for executing the payload arrives at the L1CrossDomainMessenger and the triggered subsequent cross-chain handling succeeded as well (fulfilled with the OP Stack), the Base chain includes a transaction where [L2CrossDomainMessenger](https://basescan.org/address/0x4200000000000000000000000000000000000007) calls the function ` forward(address target, bytes memory data)` on the [CrossChainAccount](https://basescan.org/address/0x31fafd4889fa1269f7a13a66ee0fb458f27d72a9).

By calling `forward` on the CrossChainAccount, the `target` gets called with the `data` as shown in the following code snipped:

`(bool success, bytes memory res) = target.call(data);`

Only the Timelock contract on the L1 is allowed to trigger this on the L2. The target and data could e.g specify `UniswapV2Factory` (target) and `setFeeTo` with arguments `address _feeTo` (data) to set the address where protocol fees are collected.

Since Base's native cross-chain messaging protocol cannot be censored by intermediaries, this cross-chain governance process does not introduce new risks for the Uniswap-v2 deployment on Base (apart from the risks captured with the Base chain score). 

## Dependencies

No external dependency has been found.

## Exit Window

The protocol fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravoDelegator` contract.
The lock period is at least two days and up to 30 days for governance actions. If the fee switch gets ever activated it fixed at 1/6 of the LP collected fees.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days. Subsequently, governance actions initiated on Ethereum (L1) are enforced on Base (L2) with very strong guarantees ([see Governance Decision Enforcement from L1 to Base](#governance-decision-enforcement-from-l1-to-base)).

# Security Council

No security council needed because on-chain governance is in place.

