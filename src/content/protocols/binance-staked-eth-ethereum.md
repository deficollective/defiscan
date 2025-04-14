---
protocol: "Binance Staked ETH"
website: "https://www.binance.com/en/earn/ethereum-staking"
x: "https://x.com/binance"
github: ["https://github.com/binance"]
defillama_slug: ["binance-staked-eth"]
chain: "Ethereum"
stage: 0
reasons: ["remove", "if none"]
risks: ["x", "x", "x", "x", "x"]
author: ["author-1", "author-2"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Add a summary of the protocols. What is it? What does it do? etc.

# Overview

## Chain

See http://defiscan.info/learn-more#chain for more guidance.

> Chain score: Low/Medium/High

## Upgradeability

In the upgradability section & risk we address bytecode upgrades and parameter changes that are permissioned.

We wrote a section explaining the Upgradeability Risk in our framework here: See http://defiscan.info/learn-more#upgradability

For some practical guidance follow this steps. It will help you in writing a nice report:

1. Run the [permission scanner](https://github.com/deficollective/permission-scanner)
2. Fill in all the permissioned functions in the table (`## Permissions`)
   - Remember: Each function with a permission needs to be considered when determining the risk on Upgradability
3. Get a mechanistic and precise understanding of each permissioned function
4. Assess impact for each function, look out for
   - loss/blocking of user funds
   - loss of unclaimed yield
   - change expected behavior significantly (blacklisting/kyc/fees/...)
5. Write the impact column based on your understanding
   - A good tipp when writing the impact column below, think of least 2,3 sentences:
   1. First sentence: what it does technically, e.g "It assigns a new address to the owner variable"
   2. Second: what is the impact within the system, e.g "The owner is permissioned to raise fees"
   3. Third: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield.
6. Summarise and abstract away technical details in this section here (`## Upgradeability`)

> Upgradeability score: Low/Medium/High

## Autonomy

See http://defiscan.info/learn-more#autonomy for more guidance.

> Autonomy score: Low/Medium/High

## Exit Window

See http://defiscan.info/learn-more#exit-window for more guidance.

> Exit Window score: Low/Medium/High

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

> Accessibility score: Low/Medium/High

# Technical Analysis

## Contracts

| Contract Name                     | Address                                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| wBETH (Proxy)                     | [0xa2E3356610840701BDf5611a53974510Ae27E2e1](https://etherscan.io/address/0xa2E3356610840701BDf5611a53974510Ae27E2e1) |
| wBETH (Implementation)            | [0x9e021c9607bd3adb7424d3b25a2d35763ff180bb](https://etherscan.io/address/0x9e021c9607bd3adb7424d3b25a2d35763ff180bb) |
| ExchangeRateUpdater (Oracle)      | [0x81720695e43A39C52557Ce6386feB3FAAC215f06](https://etherscan.io/address/0x81720695e43A39C52557Ce6386feB3FAAC215f06) |
| UnwrapTokenProxy (Proxy)          | [0x79973d557CD9dd87eb61E250cc2572c990e20196](https://etherscan.io/address/0x79973d557CD9dd87eb61E250cc2572c990e20196) |
| UnwrapTokenV1ETH (Implementation) | [0x542059d658624df6452b22b10302a15a6ab59f10](https://etherscan.io/address/0x542059d658624df6452b22b10302a15a6ab59f10) |

## Permission owners

| Name                                     | Account                                                                                                               | Type |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---- |
| Owner, Blacklister, MasterMinter, Pauser | [0x099d699C07Bbc8eE6eB5703746063E04B2aA62A7](https://etherscan.io/address/0x099d699C07Bbc8eE6eB5703746063E04B2aA62A7) | EOA  |
| Operator                                 | [0x2B59215778e99035CF38663454eF1240a7AE70F5](https://etherscan.io/address/0x2B59215778e99035CF38663454eF1240a7AE70F5) | EOA  |
| Owner UnwrapTokenV1ETH                   | [0x86Fd4673527F9d5999C5e490Ab98766c0CFA8801](https://etherscan.io/address/0x86Fd4673527F9d5999C5e490Ab98766c0CFA8801) | EOA  |

## Permissions

| Contract      | Function     | Impact                                                                                                                               | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| contract name | functionname | Description in 3 Sentences.                                                                                                          | owner of the permission |
| contract name | functionname | First sentence: what it does technically, e.g "It assigns a new address to the owner variable".                                      | owner of the permission |
| contract name | functionname | Second sentence: what is the impact within the system, e.g "The owner is permissioned to raise fees".                                | owner of the permission |
| contract name | functionname | Third sentence: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield. | owner of the permission |

## Dependencies

Explain the autonomy section in more technical details.

## Exit Window

Explain the exit window in more technical details.

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-insider signers                        |
| ❌     | Signers are publicly announced (with name or pseudonym) |
