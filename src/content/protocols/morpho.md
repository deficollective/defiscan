---
protocol: "morpho"
website: "https://morpho.org/"
x: "https://x.com/MorphoLabs"
github: "https://github.com/morpho-org"
defillama_slug: ["morpho"]
chain: "Ethereum"
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

Morpho is deployed on Ethereum mainnet.

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
| Adaptive Curve Interest Rate Model | 0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC |
| Morpho Chainlink Oracle V2 Factory | 0x3A7bB36Ee3f3eE32A60e9f2b33c1e5f2E83ad766 |
| Morpho Vault Factory               | 0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101 |
| EthereumBundlerV2                  | 0x4095F064B8d3c3548A3bebfd0Bbfd04750E30077 |

## Permission owners

| Name       | Account                                                                                                               | Type         |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| morpho.eth | [0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa](https://etherscan.io/address/0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa) | Multisig 5/9 |

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
