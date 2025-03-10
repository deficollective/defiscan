---
protocol: "Uniswap-V2"
website: "https://uniswap.org"
x: "https://x.com/uniswap"
github:
  [
    "https://github.com/Uniswap/v2-core",
    "https://github.com/Uniswap/v2-periphery",
  ]
defillama_slug: ["uniswap-v2"]
chain: "Ethereum"
stage: 2
reasons: []
risks: ["L", "L", "L", "L", "L"]
author: ["CookingCryptos"]
submission_date: "2025-01-14"
publish_date: "2025-01-22"
update_date: "1970-01-01"
---

# Summary

Uniswap v2 is a decentralized automated market maker (AMM) that builds upon the original Uniswap protocol by introducing several key features to enhance functionality and flexibility for liquidity providers (LPs) and traders. Unlike its predecessor, Uniswap v2 enables direct token-to-token swaps, eliminating the need to route trades through ETH as an intermediary.
Another notable improvement is the introduction of flash swaps, which allow users to withdraw assets without upfront capital as long as the borrowed amount is returned by the end of the transaction. This feature facilitates advanced use cases like arbitrage, collateral swapping, and debt refinancing.
Additionally, Uniswap v2 integrates price oracles that mitigate manipulation risks by providing time-weighted average prices (TWAP) over a given period, which has become a critical component for DeFi protocols reliant on secure pricing mechanisms.

# Overview

## Chain

Uniswap v2 is deployed on various chains. This review is based on the Ethereum mainnet deployment of the protocol.

> Chain score: Low

## Upgradeability

The Uniswap V2 protocol allows UNI token holders to update certain fee parameters through an on-chain governance process. These updates enable the token holders to activate and deactivate protocol fees and to change the recipient of such fees.

Apart from these fee parameters, the protocol's contracts are immutable. No party is able to pause, revert trade execution, or otherwise change the behavior of the protocol.

> Upgradeabillity score: Low

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

| Contract Name                          | Address                                                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| UniswapV2Factory                       | [0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f](https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f) |
| UniswapV2Pair                          | [0x0C722a487876989Af8a05FFfB6e32e45cc23FB3A](https://etherscan.io/address/0x0C722a487876989Af8a05FFfB6e32e45cc23FB3A) |
| UniswapV2Router02                      | [0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D](https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D) |
| FeeToSetter                            | [0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360](https://etherscan.io/address/0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360) |
| Timelock                               | [0x1a9C8182C09F50C8318d769245beA52c32BE35BC](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC) |
| GovernorBravoDelegator (Proxy)         | [0x408ED6354d4973f66138C91495F2f2FCbd8724C3](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) |
| GovernorBravoDelegate (Implementation) | [0x53a328f4086d7c0f1fa19e594c9b842125263026](https://etherscan.io/address/0x53a328f4086d7c0f1fa19e594c9b842125263026) |

The `UniswapV2Pair`'s address is an example instance of the contract. All pairs share the same implementation (based of Factory Pattern).

## Permission owners

| Name          | Account                                                                                                               | Type     |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| FeeToSetter   | [0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360](https://etherscan.io/address/0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360) | Contract |
| GovernorBravo | [0x408ED6354d4973f66138C91495F2f2FCbd8724C3](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) | Contract |
| TimeLock      | [0x1a9C8182C09F50C8318d769245beA52c32BE35BC](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC) | Contract |

## Permissions

| Contract               | Function            | Impact                                                                                                                                                                                                                                                                                                                                                                                                                   | Owner                                                                  |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| UniswapV2Factory       | setFeeTo            | This function allows the `FeeToSetter` to set the address where protocol fees are collected. If `feeTo` is the 0-address no fees are collected on any of the Uniswap V2 Pools. If fees are collected (`feeTo` != 0-address) they are fixed to be 1/6 of the LP collected fees from the moment where the fee switch is activated. If abused by the FeeToSetter role, fees could be redirected to an unauthorized address. | FeeToSetter                                                            |
| UniswapV2Factory       | setFeeToSetter      | This function permits the current `FeeToSetter` to assign a new `FeeToSetter`. A malicious actor could take control and redirect fees or alter the fee settings (see `setFeeTo`).                                                                                                                                                                                                                                        | FeeToSetter                                                            |
| FeeToSetter            | setOwner            | Allows the current owner to transfer control over `setFeeToSetter` and `toggleFees` to a new address. A transfer to a malicious owner could compromise fee management.                                                                                                                                                                                                                                                   | Timelock                                                               |
| FeeToSetter            | setFeeToSetter      | Changes the `feeToSetter` address in the UniswapV2Factory by calling the function with the same name on the Factory contract. This could redirect control to an external entity.                                                                                                                                                                                                                                         | Timelock                                                               |
| FeeToSetter            | toggleFees          | Enables or disables fees for all pools deployed by the Factory. This function calls `setFeeTo` on the Factory with the `feeTo` address stored inside `FeeToSetter`. The fee if enabled, is fixed at 1/6 of the LP fees starting from the moment where the fee switch is activated.                                                                                                                                       | Timelock                                                               |
| TimeLock               | queueTransaction    | Queues a transaction that can be executed once a delay (between 2 and 30 days) has passed. This can impact the own `TimeLock`'s settings (change admin, set delays) or interaction with any other contract the `TimeLock` has permissions on, e.g calling a function on `FeeToSetter`.                                                                                                                                   | GovernorBravoDelegator                                                 |
| TimeLock               | cancelTransaction   | Cancels a pending transaction and removes it from the queue. This allows the DAO to cancel one of its own decision before it is executed.                                                                                                                                                                                                                                                                                | GovernorBravoDelegator                                                 |
| TimeLock               | executeTransaction  | Executes a transaction that was previously queued, if the corresponding delay has passed.                                                                                                                                                                                                                                                                                                                                | GovernorBravoDelegator                                                 |
| GovernorBravoDelegator | \_setImplementation | Updates the implementation of the `GovernorBravoDelegate` (DAO) contract whwere the `GovernorBravoDelegator` is pointing to. The permisison to call this function lies with the admin, which is the TimeLock contract. The new contract specifies the implementation for the GovernorBravo (DAO) contract.                                                                                                               | Timelock                                                               |
| GovernorBravoDelegate  | \_setPendingAdmin   | Set a new address for the admin of the GovernorBravo. The new appointed admin has to call `_acceptAdmin` before the transfer of admin rights is final.                                                                                                                                                                                                                                                                   | Timelock                                                               |
| GovernorBravoDelegate  | \_acceptAdmin       | A newly appointed admin of the Governor has to call `_acceptAdmin`.                                                                                                                                                                                                                                                                                                                                                      | only Pending Admin (assigned via setPendingAdmin), currently 0-address |

## Dependencies

No external dependency has been found.

## Exit Window

The protocol fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravoDelegator` contract.
The lock period is at least two days and up to 30 days for governance actions. If the fee switch gets ever activated it fixed at 1/6 of the LP collected fees.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.

# Security Council

No security council needed because on-chain governance is in place.
