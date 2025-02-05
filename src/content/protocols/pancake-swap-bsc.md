---
protocol: "Pancake-Swap"
website: "https://v1exchange.pancakeswap.finance"
x: "https://x.com/PancakeSwap"
github: [https://github.com/pancakeswap]
defillama_slug: ["pancakeswap-amm"]
chain: "Bsc"
stage: 0
reasons: []
risks: ["H", "L", "L", "L", "M"]
author: ["CookingCryptos"]
submission_date: "2025-02-05"
publish_date: "2025-01-22"
update_date: "1970-01-01"
---

# Summary

PancakeSwap is an AMM initially launched on BNB Smart Chain, promoting community participation through a fair launch model. Users can stake its own token in Syrup Pools to earn rewards and provide liquidity to trading pairs for additional rewards. Its governance system allows token holders to vote on protocol updates, with core features like yield farming and governance.

# Overview

## Chain

PancakeSwap is deployed on various chains. This review is based on the BNB Smart Chain (BSC), an EVM-compatible blockchain using a proof-of-staked-authority (PoSA) consensus mechanism. BNB Smart Chain relies on a limited set of validators to validate blocks and maintain the network state. The reliance on a smaller validator set increases centralization risks and the potential for malicious block proposals.

No functional proof system is in place, meaning the chain depends on validator honesty rather than cryptographic guarantees. A malicious or compromised validator majority could theoretically alter the state or reorder transactions, posing risks of user fund loss in extreme scenarios.

> Chain score: H

## Upgradeability



> Upgradeabillity score: L

## Autonomy

There are no particular dependencies for the Pancake Swap protocol.

> Autonomy score: L

## Exit Window


> Exit score: L

## Accessibility

PancakeSwap provides its main user interface through pancakeswap.finance. Additionally, a public option for self-hosting the frontend is available through its GitHub repository. However, no additional independent interfaces or in-wallet access have been found.

> Accessibility score: M

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

