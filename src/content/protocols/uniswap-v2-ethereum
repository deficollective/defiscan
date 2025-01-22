---
protocol: "Uniswap-V2"
website: "https://blog.uniswap.org/uniswap-v2"
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

> Chain score: L

## Upgradeability

The Uniswap V2 protocol allows governance via the GovernorBravoDelegator contract to manage parameters such as fees through the FeeToSetter and Timelock contracts. While these permissions enable fee management and address updates, the core contracts (UniswapV2Factory, UniswapV2Pair) are immutable, ensuring no entity can alter core functionalities, pause trades, or disrupt protocol behavior.

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

| Contract Name     | Address                                                                                                               |
|-------------------|-----------------------------------------------------------------------------------------------------------------------|
| UniswapV2Factory  | [0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f](https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f) |
| UniswapV2Pair     | [0x6d49fc21049917c0b77a222d6fd492c2765aefd7](https://etherscan.io/address/0x6d49fc21049917c0b77a222d6fd492c2765aefd7) |
| UniswapV2Router02 | [0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D](https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D) |
| FeeToSetter       | [0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360](https://etherscan.io/address/0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360) |
| Timelock          | [0x1a9C8182C09F50C8318d769245beA52c32BE35BC](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC) |
| GovernorBravo     | [0x408ED6354d4973f66138C91495F2f2FCbd8724C3](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) |

## Permission owners

| Name          | Account                                                                                                               | Type     |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ---------|
| FeeToSetter   | [0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360](https://etherscan.io/address/0x18e433c7Bf8A2E1d0197CE5d8f9AFAda1A771360) | Contract |
| GovernorBravo | [0x408ED6354d4973f66138C91495F2f2FCbd8724C3](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) | Contract |
| TimeLock      | [0x1a9C8182C09F50C8318d769245beA52c32BE35BC](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC) | Contract |

## Permissions

| Contract               | Function            | Impact                                                                                                                                                                                                                                        | Owner                                   |
|------------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| UniswapV2Factory       | setFeeTo            | This function allows the feeToSetter to set the address where protocol fees are collected. If abused, fees could be redirected to an unauthorized address, leading to loss of user funds                                                      | FeeToSetter                             |
| UniswapV2Factory       | setFeeToSetter      | This function permits the current feeToSetter to assign a new feeToSetter. A malicious actor could take control and redirect fees or alter the fee settings.                                                                                  | FeeToSetter                             |
| FeeToSetter            | setOwner            | Allows the current owner to transfer full control to a new address. A transfer to a malicious owner could compromise fee management.                                                                                                          | Timelock                                |
| FeeToSetter            | setFeeToSetter      | Changes the feeToSetter address in UniswapV2Factory after the vesting period. This could redirect control to an external entity.                                                                                                              | Timelock                                |
| FeeToSetter            | toggleFees          | Enables or disables fees in the factory. A malicious owner could manipulate this function to impact users or disrupt revenue flows.                                                                                                           | Timelock                                |
| TimeLock               | queueTransaction    | Queues a transaction that can be executed once a delay (between 2 and 30 days) has passed. This can impact the own `TimeLock`'s settings (change admin, set delays) or interaction with any other contract the `TimeLock` has permissions on. | GovernorBravoDelegator                  |
| TimeLock               | cancelTransaction   | Cancels a pending transaction and removes it from the queue. This allows the DAO to cancel one of its own decision before it is executed.                                                                                                     | GovernorBravoDelegator                  |
| TimeLock               | executeTransaction  | Executes a transaction that was previously queued, if the corresponding delay has passed.                                                                                                                                                     | GovernorBravoDelegator                  |
| GovernorBravoDelegator | \_setImplementation | Updates the implementation of the `GovernorBravo` (DAO) contract. Can only be triggered by the DAO itself. The new contract would inherit all the DAO permissions mentioned above.                                                            | TimeLocked DAO contract (GovernerBravo) |

## Dependencies

No external dependency has been found.

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravo` contract.
The lock period is at least two days and up to 30 days for governance actions.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.

# Security Council

No security council needed because on-chain governance is in place.
