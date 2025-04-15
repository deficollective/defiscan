---
protocol: "Royco"
website: "https://www.royco.org/"
x: "https://x.com/roycoprotocol"
github: ["https://github.com/roycoprotocol/royco"]
defillama_slug: ["royco-protocol"]
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

| Contract Name       | Address                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| PointsFactory       | [0x19112AdBDAfB465ddF0b57eCC07E68110Ad09c50](https://etherscan.io/address/0x19112AdBDAfB465ddF0b57eCC07E68110Ad09c50) |
| WrappedVaultFactory | [0x75e502644284edf34421f9c355d75db79e343bca](https://etherscan.io/address/0x75e502644284edf34421f9c355d75db79e343bca) |
| WrappedVault        | [0x3c44c20377e252567d283dc7746d1bea67eb3e66](https://etherscan.io/address/0x3c44c20377e252567d283dc7746d1bea67eb3e66) |
| VaultMarketHub      | [0xa97eCc6Bfda40baf2fdd096dD33e88bd8e769280](https://etherscan.io/address/0xa97eCc6Bfda40baf2fdd096dD33e88bd8e769280) |
| WeirollWallet       | [0x40a1c08084671E9A799B73853E82308225309Dc0](https://etherscan.io/address/0x40a1c08084671E9A799B73853E82308225309Dc0) |
| RecipeMarketHub     | [0x783251f103555068c1E9D755f69458f39eD937c0](https://etherscan.io/address/0x783251f103555068c1E9D755f69458f39eD937c0) |
| WeirollWalletHelper | [0x07899ac8BE7462151d6515FCd4773DD9267c9911](https://etherscan.io/address/0x07899ac8BE7462151d6515FCd4773DD9267c9911) |

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
