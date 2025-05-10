---
protocol: "PancakeSwap-v2"
website: "https://pancakeswap.finance/"
x: "https://x.com/PancakeSwap"
github: ["https://github.com/pancakeswap"]
defillama_slug: ["pancakeswap-amm"]
chain: "Binance Smart Chain"
stage: 0
reasons: ["remove", "if none"]
risks: ["x", "x", "x", "x", "x"]
author: ["noemacee"]
submission_date: "2025-04-11"
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

| Contract Name   | Address                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| PancakeFactory  | [0xca143ce32fe78f1f7019d7d551a6402fc5350c73](https://bscscan.com/address/0xca143ce32fe78f1f7019d7d551a6402fc5350c73) |
| PancakeRouter   | [0x10ED43C718714eb63d5aA57B78B54704E256024E](https://bscscan.com/address/0x10ED43C718714eb63d5aA57B78B54704E256024E) |
| GnosisSafeProxy | [0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e](https://bscscan.com/address/0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e) |

## Permission owners

| Name | Account                                     | Type         |
| ---- | ------------------------------------------- | ------------ |
| name | [0x...](https://etherscan.io/address/0x...) | Multisig x/y |
| name | [0x...](https://etherscan.io/address/0x...) | Contract     |
| name | [0x...](https://etherscan.io/address/0x...) | EOA          |

## Permission

| Contract       | Function                                                  | Impact | Owner      |
| -------------- | --------------------------------------------------------- | ------ | ---------- |
| PancakeFactory | setFeeTo                                                  | ...    | []         |
| PancakeFactory | setFeeToSetter                                            | ...    | []         |
| PancakeRouter  | receive                                                   | ...    | []         |
| PancakeRouter  | addLiquidity                                              | ...    | ['ensure'] |
| PancakeRouter  | addLiquidityETH                                           | ...    | ['ensure'] |
| PancakeRouter  | removeLiquidity                                           | ...    | ['ensure'] |
| PancakeRouter  | removeLiquidityETH                                        | ...    | ['ensure'] |
| PancakeRouter  | removeLiquidityWithPermit                                 | ...    | ['ensure'] |
| PancakeRouter  | removeLiquidityETHWithPermit                              | ...    | ['ensure'] |
| PancakeRouter  | removeLiquidityETHSupportingFeeOnTransferTokens           | ...    | ['ensure'] |
| PancakeRouter  | removeLiquidityETHWithPermitSupportingFeeOnTransferTokens | ...    | ['ensure'] |
| PancakeRouter  | swapExactTokensForTokens                                  | ...    | ['ensure'] |
| PancakeRouter  | swapTokensForExactTokens                                  | ...    | ['ensure'] |
| PancakeRouter  | swapExactETHForTokens                                     | ...    | ['ensure'] |
| PancakeRouter  | swapTokensForExactETH                                     | ...    | ['ensure'] |
| PancakeRouter  | swapExactTokensForETH                                     | ...    | ['ensure'] |
| PancakeRouter  | swapETHForExactTokens                                     | ...    | ['ensure'] |
| PancakeRouter  | swapExactTokensForTokensSupportingFeeOnTransferTokens     | ...    | ['ensure'] |
| PancakeRouter  | swapExactETHForTokensSupportingFeeOnTransferTokens        | ...    | ['ensure'] |
| PancakeRouter  | swapExactTokensForETHSupportingFeeOnTransferTokens        | ...    | ['ensure'] |

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
