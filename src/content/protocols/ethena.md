---
protocol: "Ethena"
website: "https://ethena.fi/"
x: "https://x.com/ethena_labs"
github: "https://github.com/ethena-labs"
defillama_slug: ["ethena"]
chain: "Ethereum"
stage: 0
risks: ["L", "x", "x", "x", "x"]
author: ["author-1", "author-2"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary


Ethena is a synthetic dollar protocol built on Ethereum that provides a crypto-native solution for money not reliant on traditional banking system infrastructure. It introduces the 'Internet Bond,' a globally accessible dollar-denominated rewards instrument. Ethena's synthetic dollar, USDe, is fully backed by staked crypto assets (Etherum and Bitcoin) and its corresponding short futures positions. Ethena employs delta-hedging strategies to maintain stability and generate yields for users.

# Overview

## Chain

The Liquity protocol is deployed on Ethereum mainnet.

> Chain score: L

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
| USDe    | 0x4c9EDD5852cd905f086C759E8383e09bff1E68B3   |
| EthenaMinting    | 0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3   |
| StakedUSDeV2  | 0x9D39A5DE30e57443BfF2A8307A4256c8797A3497    |
|

## Permission owners

Ethena utilises a gnosis safe multisig to hold ownership of its smart contracts. All multisig keys are cold wallets and each multisig requires 7/10 or more confirmations before transactions are approved. This multisig is purely for the purpose of owning the smart contracts, and will not hold funds or do other on chain actions.


| Name | Account                                       | Type         |
| ---- | --------------------------------------------- | ------------ |
| ?? | [0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862](https://etherscan.io/address/0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862) | Multisig 7/10 |

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
