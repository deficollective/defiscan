---
protocol: "morpho"
website: "https://morpho.org/"
x: "https://x.com/MorphoLabs"
github: "https://github.com/morpho-org"
defillama_slug: ["morpho-blue"]
chain: "Ethereum"
stage: 2
risks: ["L", "L", "L", "L", "L"]
author: ["author-1", "author-2"]
submission_date: "2024-11-27"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "2024-11-27"
---

# Summary

Morpho is a trustless and efficient lending primitive with permissionless market creation. It enables the deployment of minimal and isolated lending markets by specifying: one collateral asset, one loan asset, a Liquidation Loan To Value (LLTV), an Interest Rate Model (IRM), and an oracle. Morpho's rates stay between the supply rate and the borrow rate of the pool, reducing the interests paid by the borrowers while increasing the interests earned by the suppliers. It means that you are getting boosted peer-to-peer rates or, in the worst case scenario, the APY of the pool.

# Overview

## Chain

Morpho is deployed on Ethereum mainnet as well as Base. This review focuses on the Ethereum mainnet deployment.

> Chain score: L

## Upgradeability

Morpho is fully permissionless, allowing anyone to create, lend, or borrow in markets without the need for approval.

The 600 lines of code of the protocol are fully immutable. The Morpho DAO has the possibility to activate a fee switch parameter, similar to Uniswap's fee structure.

⚠️ Although the Morpho protocol contracts are immutable, we note that the `MORPHO` token is currently upgradeable and mintable. The permissions belong to the `morpho.eth` multisig with currently no delay. As the token is not an active part of the protocol we decided not to include it in the scope of this review.

> Upgradeability score: L

## Autonomy

Each Morpho market relies on an oracle, the latter being configured with feeds. Those feeds are compliant with the Chainlink Aggregator pattern.

⚠️ It is important to note that each market creator is free to choose its oracle and could potentially use unreliable, centralized, or malicious oracles. As market creation is a permissionless endeavor, we decided that the Vault oracles were out of the scope of this review.

> Autonomy score: L

## Exit Window

Morpho's market contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

⚠️ We note that this is different for the `MORPHO` token, as it can be upgraded and minted at any time with no delay(see [upgradeability](#upgradeability)).

> Exit Window score: L

## Accessibility

The main morpho interface is [app.morpho.org](https://app.morpho.org/). A backup solution allows users to self-host and access morpho following instructions on [this repository](https://github.com/morpho-org/morpho-blue-offchain-public).
In addition to that, morpho is also accessible through several interfaces such as [monarchlend](https://www.monarchlend.xyz), [summer.fi](https://summer.fi/borrow?protocol=morphoblue), [DefiSaver](https://app.defisaver.com/morpho), [Instadapp](https://defi.instadapp.io/metamorpho), and [Contango](https://app.contango.xyz/).

> Accessibility score: L

# Technical Analysis

See [Whitepaper: Morpho Protocol](https://github.com/morpho-org/morpho-blue/blob/main/morpho-blue-whitepaper.pdf)

## Contracts

| Contract Name                                      | Address                                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Morpho                                             | [0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb](https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb) |
| Adaptive Curve Interest Rate Model                 | [0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC](https://etherscan.io/address/0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC) |
| Morpho Chainlink Oracle V2 Factory                 | [0x3A7bB36Ee3f3eE32A60e9f2b33c1e5f2E83ad766](https://etherscan.io/address/0x3A7bB36Ee3f3eE32A60e9f2b33c1e5f2E83ad766) |
| Morpho Vault Factory                               | [0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101](https://etherscan.io/address/0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101) |
| Morpho Vault Factory V1.1                          | [0x1897A8997241C1cD4bD0698647e4EB7213535c24](https://etherscan.io/address/0x1897A8997241C1cD4bD0698647e4EB7213535c24) |
| EthereumBundlerV2                                  | [0x4095F064B8d3c3548A3bebfd0Bbfd04750E30077](https://etherscan.io/address/0x4095F064B8d3c3548A3bebfd0Bbfd04750E30077) |
| Public Allocator                                   | [0xfd32fA2ca22c76dD6E550706Ad913FC6CE91c75D](https://etherscan.io/address/0xfd32fA2ca22c76dD6E550706Ad913FC6CE91c75D) |
| PreLiquidation Factory                             | [0x6FF33615e792E35ed1026ea7cACCf42D9BF83476](https://etherscan.io/address/0x6FF33615e792E35ed1026ea7cACCf42D9BF83476) |
| Universal Rewards Distributor Factory (UrdFactory) | [0x9baA51245CDD28D8D74Afe8B3959b616E9ee7c8D](https://etherscan.io/address/0x9baA51245CDD28D8D74Afe8B3959b616E9ee7c8D) |
| Universal Rewards Distributor                      | [0x330eefa8a787552dc5cad3c3ca644844b1e61ddb](https://etherscan.io/address/0x330eefa8a787552dc5cad3c3ca644844b1e61ddb) |
| MORPHO                                             | [0x58D97B57BB95320F9a05dC918Aef65434969c2B2](https://etherscan.io/address/0x58D97B57BB95320F9a05dC918Aef65434969c2B2) |
| MORPHO wrapper                                     | [0x9D03bb2092270648d7480049d0E58d2FcF0E5123](https://etherscan.io/address/0x9D03bb2092270648d7480049d0E58d2FcF0E5123) |

<!-- | Public Allocator | [0xfd32fA2ca22c76dD6E550706Ad913FC6CE91c75D](https://etherscan.io/address/0xfd32fA2ca22c76dD6E550706Ad913FC6CE91c75D) | -->

## Permission owners

| Name                   | Account                                                                                                               | Type         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| morpho.eth             | [0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa](https://etherscan.io/address/0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa) | Multisig 5/9 |
| MorphoRewards Multisig | [0xF057afeEc22E220f47AD4220871364e9E828b2e9](https://etherscan.io/address/0xF057afeEc22E220f47AD4220871364e9E828b2e9) | Multisig 3/5 |
| Morpho                 | [0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb](https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb) | Contract     |

<!-- potential additional permission owners:

Morpho operations multisig: 0x640428D38189B11B844dAEBDBAAbbdfbd8aE0143 (3/9)
Morpho rewards multisig: 0xF057afeEc22E220f47AD4220871364e9E828b2e9 (3/5)
SafeOwner: 0x0b9915C13e8E184951Df0d9C0b104f8f1277648B -->

## Permissions

| Contract                    | Function          | Impact                                                                                                                                                                                                                                              | Owner                  |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Morpho                      | setOwner          | Sets newOwner as owner of the contract.                                                                                                                                                                                                             | morpho.eth             |
| Morpho                      | enableIrm         | Enables irm as a possible IRM for market creation. Once set an interest rate cannot be disabled.                                                                                                                                                    | morpho.eth             |
| Morpho                      | enableLltv        | Enables lltv as a possible LLTV for market creation.                                                                                                                                                                                                | morpho.eth             |
| Morpho                      | setFee            | Sets the newFee for the given market marketParams. Fees are taken on the interests and can be of up to 25%.                                                                                                                                         | morpho.eth             |
| Morpho                      | setFeeRecipient   | Sets newFeeRecipient as feeRecipient of the fee, the address who will benefit from the fees, if any.                                                                                                                                                | morpho.eth             |
| AdaptiveCurveIrm            | borrowRate        | Returns the borrow rate per second (scaled by WAD) of the market `marketParams` and eventually adjust according to the parameters. Can only be called by the main Morpho contract upon interest collection.                                         | Morpho                 |
| UniversalRewardsDistributor | setRootUpdater    | Grants the _Updater_ role to a specific address, typically an offchain bot. The _Updaters_ compute merkle trees of reward distribution and submit the root on-chain.                                                                                | MorphoRewards Multisig |
| UniversalRewardsDistributor | submitRoot        | Submit the root of a merkle tree. The offline-computed tree allows the distribution of reward tokens to users. The tree could be wrong or malicious to distribute undeserved rewards. The root is only accepted once the timelock delay has passed. | Updater                |
| UniversalRewardsDistributor | revokePendingRoot | Revokes a root during the timelock delay, before final acceptance. This can be used to cancel a malicious reward distribution.                                                                                                                      | MorphoRewards Multisig |
| UniversalRewardsDistributor | setRoot           | Accepts the root as final if the correct delay has passed and the root wasn't revoked.                                                                                                                                                              | MorphoRewards Multisig |
| UniversalRewardsDistributor | setTimelock       | Sets a timelock for root updates. New roots submitted will be frozen for this amount of time so that the owner may cancel them.                                                                                                                     | MorphoRewards Multisig |
| UniversalRewardsDistributor | setOwner          | Sets a new owner for the contract. The owner needs to accept ownership.                                                                                                                                                                             | MorphoRewards Multisig |

## Dependencies

Each Morpho market relies on an oracle, the latter being configured with feeds. Those feeds are compliant with the Chainlink Aggregator pattern, but there are no other garanties or requirements on the oracles, such as sanity checks, timestamp checks, or emergency stops.

⚠️ It is important to note that each market creator is free to choose its oracle and could potentially use unreliable, centralized, or malicious oracles. As market creation is a permissionless endeavor, we decided that the Vault oracles were out of the scope of this review.

> Autonomy score: L

## Exit Window

The protocol is completely immutable, thus no exit window is required. 🎉

⚠️ We note that this is different for the `MORPHO` token, as it can be upgraded and minted at any time with no delay(see [upgradeability](#upgradeability)).

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

https://docs.morpho.org/governance/organization/multisigs-and-addresses#morpho-dao-signers-59-multisig

| Requirement                                             | morpho.eth |
| ------------------------------------------------------- | ---------- |
| At least 7 signers                                      | ✅         |
| At least 51% threshold                                  | ✅         |
| At least 50% non-team signers                           | ❌         |
| Signers are publicly announced (with name or pseudonym) | ❌         |
