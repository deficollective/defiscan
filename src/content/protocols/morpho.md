---
protocol: "morpho"
website: "https://morpho.org/"
x: "https://x.com/MorphoLabs"
github: ["https://github.com/morpho-org"]
defillama_slug: ["morpho-blue"]
chain: "Ethereum"
stage: 2
reasons: []
risks: ["L", "L", "L", "L", "L"]
author: ["author-1", "author-2"]
submission_date: "2024-11-27"
publish_date: "1970-01-01"
update_date: "2024-11-27"
---

# Summary

Morpho is a trustless and efficient lending primitive with permissionless market creation. It enables the deployment of minimal and isolated lending markets by specifying: one collateral asset, one loan asset, a Liquidation Loan To Value (LLTV), an Interest Rate Model (IRM), and an oracle. Users may lend funds directly on individual Morpho markets or through Morpho Vaults. These vaults are created permissionlessly by third parties, or risk curators, and offer managed lending strategies by aggregating different Morpho markets.

# Overview

## Chain

Morpho is deployed on different chains. This review is based on the Ethereum mainnet deployment.

> Chain score: L

## Upgradeability

The Morpho (markets) protocol and Morpho Vaults are non-upgradeable. No permissions exist in the Morpho protocol that could affect users' funds and unclaimed yield or could otherwise result in non-expected protocol performance.

On the other hand, Morpho Vaults expose users to critical permissions that could result in the loss of user funds. However, control over these permissions is owned by the vault's risk curators and not by Morpho governance, the team or otherwise affiliated entities. The Morpho Vault permissions thus do not introduce centralization risk.

A team multisig, `morpho.eth`, is able to activate a fee switch and enable new LTV tiers and interest rate models. These permissions can only affect newly created markets and future yield, with fees enforced in a fixed range.

⚠️ Note that the `MORPHO` token is upgradeable and mintable by the `morpho.eth` multisig without an Exit Window enforced. Since the MORPHO token does not serve a function in the Morpho protocol and Morpho Vaults, not directly and not through governance, this is not included in the assessment here.

> Upgradeability score: L

## Autonomy

Morpho markets are configured with an external price oracle based on which the solvency of a position is established.
While market creators are free in the price oracle choice, most use Morpho's price oracle factory.
This factory makes use of Chainlink price feeds and assumes that these feeds never fail (liveness and valid prices).
Since Morpho markets are immutable, the price oracle cannot be updated post market creation, a stale Chainlink feed can result in the temporary or permanent freezing of user funds.

The Chainlink oracle system itself is upgradeable without decentralized ownership over those permissions. This dependency thus introduces centralization risk in the Morpho protocol.

> Autonomy score: H

## Exit Window

The Morpho protocol and Morpho Vaults do not expose centrally controlled permissions with a potential impact of loss of user funds or unclaimed yield. Hence, an Exit Window is not required.

> Exit Window score: L

## Accessibility

The main morpho interface is [app.morpho.org](https://app.morpho.org/). A backup solution allows users to self-host and access morpho following instructions on [this repository](https://github.com/morpho-org/morpho-blue-offchain-public).

In addition to that, morpho is also accessible through several interfaces such as [monarchlend](https://www.monarchlend.xyz), [summer.fi](https://summer.fi/borrow?protocol=morphoblue), [DefiSaver](https://app.defisaver.com/morpho), [Instadapp](https://defi.instadapp.io/metamorpho), and [Contango](https://app.contango.xyz/).

> Accessibility score: L

## Conclusion

The Morpho Ethereum mainnet protocol achieves Low centralization scores for the Chain, Upgradeability, Exit Window and Accessibility dimensions. However, it exhibits a High centralization risk score for its trusted Chainlink dependency. It thus ranks Stage 0.

The protocol could reach Stage 2 by implementing validity checks and a fallback mechanism around the Chainlink oracle (or Chainlink adopting a Security Council setup for its own multisig account).

We further want to highlight the following observations which did not directly factor into the scoring:

- ⚠️ The `MORPHO` token is upgradeable and mintable by a multisig account `morpho.eth` which does not meet our security council requirements.
- ⚠️ The markets are created in a permissionless fashion, letting the creator almost free choice of the oracle used. Nohting prevents the use of malicious or centralized oracles.
- ⚠️ The multisig `morpho.eth` can impact future vaults by allowing the use of new interest rate models and liquidation loan-to-value ratios.

> Overall score: Stage 0

# Technical Analysis

An overview of the Morpho protocol can be seen in the diagram below.

![Overview of the Morpho protocol](./diagrams/morpho-overview.png)

<!-- See [Whitepaper: Morpho Protocol](https://github.com/morpho-org/morpho-blue/blob/main/morpho-blue-whitepaper.pdf) -->

## Contracts

| Contract Name                                      | Address                                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Morpho                                             | [0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb](https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb) |
| Adaptive Curve Interest Rate Model                 | [0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC](https://etherscan.io/address/0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC) |
| Morpho Chainlink Oracle V2 Factory                 | [0x3A7bB36Ee3f3eE32A60e9f2b33c1e5f2E83ad766](https://etherscan.io/address/0x3A7bB36Ee3f3eE32A60e9f2b33c1e5f2E83ad766) |
| Morpho Vault Factory V1.1                          | [0x1897A8997241C1cD4bD0698647e4EB7213535c24](https://etherscan.io/address/0x1897A8997241C1cD4bD0698647e4EB7213535c24) |
| Morpho Vault V1.1                                  | [0x1897A8997241C1cD4bD0698647e4EB7213535c24](https://etherscan.io/address/0x1897A8997241C1cD4bD0698647e4EB7213535c24) |
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

| Contract                    | Function                   | Impact                                                                                                                                                                                                                                              | Owner                            |
| --------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Morpho                      | setOwner                   | Sets newOwner as owner of the contract.                                                                                                                                                                                                             | morpho.eth                       |
| Morpho                      | enableIrm                  | Enables irm as a possible IRM for market creation. Once set an interest rate cannot be disabled.                                                                                                                                                    | morpho.eth                       |
| Morpho                      | enableLltv                 | Enables lltv as a possible LLTV for market creation.                                                                                                                                                                                                | morpho.eth                       |
| Morpho                      | setFee                     | Sets the newFee for the given market marketParams. Fees are taken on the interests and can be of up to 25%.                                                                                                                                         | morpho.eth                       |
| Morpho                      | setFeeRecipient            | Sets newFeeRecipient as feeRecipient of the fee, the address who will benefit from the fees, if any.                                                                                                                                                | morpho.eth                       |
| AdaptiveCurveIrm            | borrowRate                 | Returns the borrow rate per second (scaled by WAD) of the market `marketParams` and eventually adjust according to the parameters. Can only be called by the main Morpho contract upon interest collection.                                         | Morpho                           |
| UniversalRewardsDistributor | setRootUpdater             | Grants the _Updater_ role to a specific address, typically an offchain bot. The _Updaters_ compute merkle trees of reward distribution and submit the root on-chain.                                                                                | MorphoRewards Multisig           |
| UniversalRewardsDistributor | submitRoot                 | Submit the root of a merkle tree. The offline-computed tree allows the distribution of reward tokens to users. The tree could be wrong or malicious to distribute undeserved rewards. The root is only accepted once the timelock delay has passed. | Updater                          |
| UniversalRewardsDistributor | revokePendingRoot          | Revokes a root during the timelock delay, before final acceptance. This can be used to cancel a malicious reward distribution.                                                                                                                      | MorphoRewards Multisig           |
| UniversalRewardsDistributor | setRoot                    | Accepts the root as final if the correct delay has passed and the root wasn't revoked.                                                                                                                                                              | MorphoRewards Multisig           |
| UniversalRewardsDistributor | setTimelock                | Sets a timelock for root updates. New roots submitted will be frozen for this amount of time so that the owner may cancel them.                                                                                                                     | MorphoRewards Multisig           |
| UniversalRewardsDistributor | setOwner                   | Sets a new owner for the contract. The owner needs to accept ownership.                                                                                                                                                                             | MorphoRewards Multisig           |
| MetaMorphoV1_1              | setOwner                   | Sets a new owner, the owner has all rights on the contract, can set fees and grant access roles.                                                                                                                                                    | Vault Owner                      |
| MetaMorphoV1_1              | transferOwnership          | Transfers ownership of the contract to another addres who needs to accept it.                                                                                                                                                                       | Vault Owner                      |
| MetaMorphoV1_1              | renounceOwnership          | Renounces ownership over the contract. No new owner can be named.                                                                                                                                                                                   | Vault Owner                      |
| MetaMorphoV1_1              | setName                    | Sets the name of the vault's ERC-20.                                                                                                                                                                                                                | Vault Owner                      |
| MetaMorphoV1_1              | setSymbol                  | Sets the symbol of the vault's ERC-20.                                                                                                                                                                                                              | Vault Owner                      |
| MetaMorphoV1_1              | setCurator                 | Sets the curator. Curators can decrease/increase supply caps, allocate funds, force market removals.                                                                                                                                                | Vault Owner                      |
| MetaMorphoV1_1              | setIsAllocator             | Grants Allocator role to an addres. Allocators can decide on the order of the markets to supply/borrow from.                                                                                                                                        | Vault Owner                      |
| MetaMorphoV1_1              | setSkimRecipient           | Sets the recepient of skimming: collection of leftover tokens set to the contract.                                                                                                                                                                  | Vault Owner                      |
| MetaMorphoV1_1              | submitTimelock             | Sets the timelock. Timelock is the delay between critical changes dones by the curator and allocator and the moment they take actions. The owner and guardian can use this delay to cancel those transactions.                                      | Vault Owner                      |
| MetaMorphoV1_1              | setFee                     | Sets a fee that is taken on users' yield. The max fee is set to 25% of interests.                                                                                                                                                                   | Vault Owner                      |
| MetaMorphoV1_1              | setFeeRecipient            | Sets the fee recipient. The address that will receive the collected fees.                                                                                                                                                                           | Vault Owner                      |
| MetaMorphoV1_1              | submitGuardian             | Names a new guardian for the contract. The guardian can cancel critical transactions during the timelock delay. The new guardian takes its functions only after the timelock delay has passed.                                                      | Vault Owner                      |
| MetaMorphoV1_1              | submitCap                  | Submits a new supply cap for a specific market. The new cap only takes effect after the timelock delay.                                                                                                                                             | Vault Owner, Vault Curator       |
| MetaMorphoV1_1              | submitMarketRemoval        | Removes a market from the vault. The removal only takes effect after the timelock delay.                                                                                                                                                            | Vault Owner                      |
| MetaMorphoV1_1              | setSupplyQueue             | Sets a queue of markets for fund allocation in order.                                                                                                                                                                                               | Vault Owner, Curator, Allocators |
| MetaMorphoV1_1              | updateWithdrawQueue        | Updates the queue of markets to withdraw from in order.                                                                                                                                                                                             | Vault Owner, Curator, Allocators |
| MetaMorphoV1_1              | reallocate                 | Reallocate the funds on different markets.                                                                                                                                                                                                          | Vault Owner, Curator, Allocators |
| MetaMorphoV1_1              | revokePendingTimelock      | Revokes a timelock before it takes effect.                                                                                                                                                                                                          | Vault Owner, Guardian            |
| MetaMorphoV1_1              | revokePendingCap           | Cancel a market supply cap before it takes effect                                                                                                                                                                                                   | Vault Owner, Guardian            |
| MetaMorphoV1_1              | revokePendingMarketRemoval | Cancels a market removal before it takes effect.                                                                                                                                                                                                    | Vault Owner, Guardian            |

## Dependencies

Morpho markets are configured with an external price oracle based on which the solvency of a position is established.
Market creators are free in chosing an appropriate price oracle implementation. However, once created, the feed cannot be updated.
The Morpho protocol facilitates the creation of price oracles, and markets, with the `MorphoChainlinkOracleV2Factory`.
This factory creates new price oracles which make use of Chainlink's price feeds. Thereby, the factory makes important assumptions on the liveness and validity of prices returned by Chainlink as documented in the source code as follows:

```
/// - Staleness is not checked because it's assumed that the Chainlink feed keeps its promises on this.
/// - The price is not checked to be in the min/max bounds because it's assumed that the Chainlink feed keeps its
/// promises on this.
```

Note that the price oracle in a Morpho market cannot be updated (markets are immutable). A permanent failure of Chainlink, or staleness of its price feed, can thus result in user funds being permanently frozen in Morpho markets.

At the time of writing this review, about X% of the live Morpho markets make use of this standard price oracle and Chainlink feeds. Thus, even though technically not enforced, Chainlink forms a critical dependency of the Morpho protocol.

The Chainlink oracle system itself is upgradeable potentially resulting in the publishing of unintended or malicious prices. The permissions to upgrade are controlled by a multisig account with a 4-of-9 signers threshold. This multisig account is listed in the Chainlink docs but signers are not publicly announced. The Chainlink multisig thus does not suffice the Security Council requirements specified by either L2Beat or DeFiScan resulting in a High centralization score.


> Autonomy score: L

## Exit Window

The protocol is completely immutable, thus no exit window is required. 🎉

⚠️ We note that this is different for the `MORPHO` token, as it can be upgraded and minted at any time with no delay(see [upgradeability](#upgradeability)).

# Security Council

Permissioned functions in the main `Morpho` contract are controlled by a multisig which does not
meet our security council requirements. Nonetheless those permissions do not put users' funds
or yield at risk and do not have additional capabilities for emergency situations.

&nbsp;

| Requirement                                             | morpho.eth |
| ------------------------------------------------------- | ---------- |
| At least 7 signers                                      | ✅         |
| At least 51% threshold                                  | ✅         |
| At least 50% non-team signers                           | ❌         |
| Signers are publicly announced (with name or pseudonym) | ❌         |
