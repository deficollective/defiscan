---
protocol: "Pancakeswap-V3"
website: "https://pancakeswap.finance/"
x: "https://x.com/pancakeswap"
github: ["https://github.com/pancakeswap/"]
defillama_slug: ["pancakeswap-amm-v3"]
chain: "BSC"
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

| Contract Name                                         | Address                                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| PancakeV3Factory                                      | [0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865](https://bscscan.com/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865) |
| PancakeV3PoolDeployer                                 | [0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9](https://bscscan.com/address/0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9) |
| SwapRouter                                            | [0x1b81D678ffb9C0263b24A97847620C99d213eB14](https://bscscan.com/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14) |
| SmartRouter                                           | [0x13f4EA83D0bd40E75C8222255bc855a974568Dd4](https://bscscan.com/address/0x13f4EA83D0bd40E75C8222255bc855a974568Dd4) |
| V3Migrator                                            | [0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2](https://bscscan.com/address/0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2) |
| NonfungiblePositionManager                            | [0x46A15B0b27311cedF172AB29E4f4766fbE7F4364](https://bscscan.com/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364) |
| QuoterV2                                              | [0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997](https://bscscan.com/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997) |
| TickLens                                              | [0x9a489505a00cE272eAa5e07Dba6491314CaE3796](https://bscscan.com/address/0x9a489505a00cE272eAa5e07Dba6491314CaE3796) |
| UniswapInterfaceMulticall (PancakeInterfaceMulticall) | [0xac1cE734566f390A94b00eb9bf561c2625BF44ea](https://bscscan.com/address/0xac1cE734566f390A94b00eb9bf561c2625BF44ea) |
| MixedRouteQuoterV1                                    | [0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86](https://bscscan.com/address/0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86) |
| TokenValidator                                        | [0x864ED564875BdDD6F421e226494a0E7c071C06f8](https://bscscan.com/address/0x864ED564875BdDD6F421e226494a0E7c071C06f8) |
| MasterChefV3                                          | [0x556B9306565093C855AEA9AE92A594704c2Cd59e](https://bscscan.com/address/0x556B9306565093C855AEA9AE92A594704c2Cd59e) |

## Permission owners

| Name | Account                                     | Type         |
| ---- | ------------------------------------------- | ------------ |
| name | [0x...](https://etherscan.io/address/0x...) | Multisig x/y |
| name | [0x...](https://etherscan.io/address/0x...) | Contract     |
| name | [0x...](https://etherscan.io/address/0x...) | EOA          |

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
