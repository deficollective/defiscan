---
protocol: "morpho"
website: "https://morpho.org/"
x: "https://x.com/MorphoLabs"
github: "https://github.com/morpho-org"
defillama_slug: ["morpho"]
chain: "Base"
stage: 0
risks: ["L", "L", "?", "L", "L"]
author: ["author-1", "author-2"]
submission_date: "2024-11-27"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "2024-11-27"
---

# Summary

Morpho is a trustless and efficient lending primitive with permissionless market creation. It enables the deployment of minimal and isolated lending markets by specifying: one collateral asset, one loan asset, a Liquidation Loan To Value (LLTV), an Interest Rate Model (IRM), and an oracle. The protocol is trustless and was designed to be more efficient and flexible than any other decentralized lending platform.

# Overview

## Chain

Morpho is deployed on Base.

> Chain score: L

## Upgradeability

Morpho is fully permissionless, allowing anyone to create, lend, or borrow in markets without the need for approval.

The 600 lines of code of the protocol are fully immutable. The Morpho DAO has the possibility to activate a fee switch parameter, ala Uniswap.

> Upgradeability score: L

## Autonomy

Each Morpho market relies on an oracle, the latter being configured with feeds. Those feeds are compliant with the Chainlink Aggregator pattern.

> Autonomy score: ?

## Exit Window

Morpho contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

> Exit Window score: L

## Accessibility

There are different user interfaces, the most popular ones being:

- the main app [app.morpho.org](https://app.morpho.org/)
- the [monarchlend](https://www.monarchlend.xyz) interface
- the [summer.fi](https://summer.fi/borrow?protocol=morphoblue) interface
- the [DefiSaver](https://app.defisaver.com/morpho) interface
- the [Instadapp](https://defi.instadapp.io/metamorpho) interface
- the [Contango](https://app.contango.xyz/) interface
- ...

> Accessibility score: L

# Technical Analysis

See [Whitepaper: Morpho Protocol](https://github.com/morpho-org/morpho-blue/blob/main/morpho-blue-whitepaper.pdf)

## Contracts

| Contract Name                      | Address                                    |
| ---------------------------------- | ------------------------------------------ |
| Morpho                             | 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb |
| Adaptive Curve Interest Rate Model | 0x46415998764C29aB2a25CbeA6254146D50D22687 |
| Morpho Chainlink Oracle V2 Factory | 0x2DC205F24BCb6B311E5cdf0745B0741648Aebd3d |
| Morpho Vault Factory               | 0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101 |
| ChainAgnosticBundlerV2             | 0x23055618898e202386e6c13955a58D3C68200BFB |

## Permission owners

| Name       | Account                                                                                                               | Type         |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| morpho.eth | [0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa](https://basescan.org/address/0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa) | Multisig 5/9 |

## Permissions

| Contract | Function         | Impact                                                                  | Owner      |
| -------- | ---------------- | ----------------------------------------------------------------------- | ---------- |
| Morpho   | setOwner         | Sets newOwner as owner of the contract.                                 | morpho.eth |
| Morpho   | enableIrm        | Enables irm as a possible IRM for market creation.                      | morpho.eth |
| Morpho   | enableLltv       | Enables lltv as a possible LLTV for market creation.                    | morpho.eth |
| Morpho   | setFee           | Sets the newFee for the given market marketParams.                      | morpho.eth |
| Morpho   | setFeeRecipient  | Sets newFeeRecipient as feeRecipient of the fee.                        | morpho.eth |
| Morpho   | setAuthorization | Sets the authorization for authorized to manage msg.sender's positions. | morpho.eth |

## Dependencies

External oracle feeds are used in Morpho markets.

## Exit Window

The protocol is completely immutable, thus no exit window is required. 🎉

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ✅     | At least 7 signers                                      |
| ✅     | At least 51% threshold                                  |
| ✅     | At least 50% non-team signers                           |
| ✅     | Signers are publicly announced (with name or pseudonym) |

> https://docs.morpho.org/governance/organization/multisigs-and-addresses#morpho-dao-signers-59-multisig
