---
protocol: "Kodiak Finance"
website: "https://kodiak.finance"
x: "https://x.com/kodiakfi"
github: ["https://github.com/Kodiak-Finance"]
defillama_slug: ["kodiak-v3"]
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

| Contract Name              | Address                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| UniswapV3Factory           | [0xD84CBf0B02636E7f53dB9E5e45A616E05d710990](https://etherscan.io/0xD84CBf0B02636E7f53dB9E5e45A616E05d710990) |
| UniswapV2Factory           | [0x5e705e184d233ff2a7cb1553793464a9d0c3028f](https://etherscan.io/0x5e705e184d233ff2a7cb1553793464a9d0c3028f) |
| NonfungiblePositionManager | [0xFE5E8C83FFE4d9627A75EaA7Fee864768dB989bD](https://etherscan.io/0xFE5E8C83FFE4d9627A75EaA7Fee864768dB989bD) |
| SwapRouter                 | [0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690](https://etherscan.io/0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690) |
| SwapRouter02               | [0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4](https://etherscan.io/0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4) |
| UniswapV2Router02          | [0xd91dd58387Ccd9B66B390ae2d7c66dBD46BC6022](https://etherscan.io/0xd91dd58387Ccd9B66B390ae2d7c66dBD46BC6022) |
| QuoterV2                   | [0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B](https://etherscan.io/0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B) |
| MixedRouteQuoterV1         | [0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB](https://etherscan.io/0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB) |
| TickLens                   | [0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48](https://etherscan.io/0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48) |
| Multicall                  | [0x89ff70257bc747F310bB538eeFC46aDD763e75d8](https://etherscan.io/0x89ff70257bc747F310bB538eeFC46aDD763e75d8) |
| Multicall3                 | [0xcA11bde05977b3631167028862bE2a173976CA11](https://etherscan.io/0xcA11bde05977b3631167028862bE2a173976CA11) |
| KodiakIslandFactory        | [0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6](https://etherscan.io/0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6) |
| KodiakIslandRouter         | [0x679a7C63FC83b6A4D9C1F931891d705483d4791F](https://etherscan.io/0x679a7C63FC83b6A4D9C1F931891d705483d4791F) |
| KodiakIsland               | [0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590](https://etherscan.io/0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590) |
| KodiakFarmFactory          | [0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF](https://etherscan.io/0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF) |
| KodiakFarm                 | [0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa](https://etherscan.io/0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa) |
| xKDK                       | [0xe8D7b965BA082835EA917F2B173Ff3E035B69eeB](https://etherscan.io/0xe8D7b965BA082835EA917F2B173Ff3E035B69eeB) |
| PandaFactory               | [0xc8e180C0C07940994cCDD44D59ea649fF291AC7D](https://etherscan.io/0xc8e180C0C07940994cCDD44D59ea649fF291AC7D) |

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
