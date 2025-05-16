---
protocol: "morpho"
website: "https://morpho.org/"
x: "https://x.com/MorphoLabs"
github: ["https://github.com/morpho-org"]
defillama_slug: ["morpho-blue"]
chain: "Ethereum"
stage: 1
reasons: []
risks: ["L", "M", "M", "M", "L"]
author: ["mmilien_"]
submission_date: "2024-11-27"
publish_date: "2025-05-19"
update_date: "1970-01-01"
---

# Summary

Morpho is a lending protocol with permissionless market creation. It enables the deployment of minimal and isolated lending markets by specifying: one collateral asset, one loan asset, a Liquidation Loan To Value (LLTV), an Interest Rate Model (IRM), and an oracle. Users may lend funds directly on individual Morpho Markets or through Morpho Vaults. These vaults are created permissionlessly by third parties, or risk curators, and offer managed lending strategies by aggregating different Morpho Markets. Morpho governance operates within a very limited scope and without direct control over the Morpho protocol.

# Ratings

## Chain

Morpho is deployed on different chains. This review is based on the Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability

The Morpho (markets) protocol and Morpho Vaults are non-upgradeable. No permissions exist in the Morpho protocol that could affect users' funds and unclaimed yield or could otherwise result in non-expected protocol performance. Permissions in Morpho Vaults are owned by the vault creators themselves, aka _Curators_, and thus are not centralized under Morpho governance.

A team multisig, [morpho.eth](#security-council), is able to activate a fee switch and enable new LTV tiers and interest rate models. These permissions can only affect newly created markets with fees enforced in a fixed range.

The [morpho.eth](#security-council) multisig is further in control of the `MORPHO` token and it's upgradeability and minting features. `MORPHO` upgrades or minting can directly impact distributed rewards in the system and thus result in the loss of unclaimed yield.

> Upgradeability score: Medium

## Autonomy

Morpho Markets are configured with an external price oracle based on which the solvency of a position is established. Market creators are free in the price oracle choice thus delegating responsibility to users instead of central governance.

However, the Morpho protocol facilitates oracle creation through a factory, currently `MorphoChainlinkOracleV2Factory`, which is used by more than 35% of Morpho Markets [(read more)](#dependencies).

This factory wraps price feeds compliant with Chainlink's Aggregator interface and assumes that these feeds never fail (liveness and valid prices). Although the price feed is chosen permissionlessly by the market creator, more than 35% of the Morpho Markets rely on a Chainlink curated price feed. Those feeds are controlled in a centralized manner, a multisig account not complying with _Security Council_ requirements, the impact of a failure has to be assessed nonetheless.

An unintended upgrade of the Chainlink price feed contracts could result in stale or inaccurate prices being reported. Since the Morpho oracle reverts on a negative price reported by a Chainlink feed, this failure could result in the permanent freezing of funds in affected markets. With a potential impact on more than 35% of Morpho Markets, or more than 30% of Morpho's TVL, Chainlink is thus assessed as a Medium centralization risk for Morpho.

> Autonomy score: Medium

## Exit Window

The [morpho.eth](#security-council) multisig account owns the permission to enable new Liquidation LTVs and Interest Rate Models to create new Morpho Markets with, but cannot change existing Morpho Markets thus not affecting existing user positions.

The Morpho protocol exposes critical permissions in the `MORPHO` token that can impact users' unclaimed `MORPHO` rewards and thus result in a Medium Upgradeability risk. This risk is not mitigated with an onchain governance system and appropriate Exit Windows.

> Exit Window score: Medium

## Accessibility

The main morpho interface is [app.morpho.org](https://app.morpho.org/). An RPC-only fallback interface ([fallback.morpho.org](https://fallback.morpho.org)) exists, offering an alternative in case of failure of the main interace. Finally, a backup solution allows users to self-host and access morpho following instructions on [this repository](https://github.com/morpho-org/morpho-blue-offchain-public).

In addition to that, morpho is also accessible through several interfaces such as [monarchlend](https://www.monarchlend.xyz), [summer.fi](https://summer.fi/borrow?protocol=morphoblue), [DefiSaver](https://app.defisaver.com/morpho), [Instadapp](https://defi.instadapp.io/metamorpho), and [Contango](https://app.contango.xyz/).

Finally, [lite.morpho.org](https://lite.morpho.org/) provides access to Morpho on Polygon, Optimism, and World Chain.

> Accessibility score: Low

## Conclusion

The Morpho Ethereum mainnet protocol achieves _Low_ centralization scores for the _Chain_ and _Accessibility_ dimensions. The upgradeability of the `MORPHO` token that is not protected with an onchain governance system and _Exit Window_ and its trusted Chainlink dependency result in _Medium_ _Upgradeability_, _Exit Window_ and _Autonomy_ risks and **Stage 1** decentralization.

The protocol could advance to **Stage 2** by; 1) transferring control over the `MORPHO` permissions to onchain governance with a 30-day _Exit Window_ and 2) implementing a fallback mechanism around the Chainlink oracle dependency (or Chainlink adopting a Security Council setup for its own multisig account).

> Overall score: Stage 1

# Reviewer's Notes

We further want to highlight the following observations which did not directly factor into the scoring:

- ⚠️ Curators of Morpho Vaults are in control of critical permissions which can result in the _loss of user funds_ and _loss of unclaimed yield_. These permissions only have a direct impact on users in the respective vault and thus do not contribute to the centralization of the Morpho protocol. Vault owners can name guardians with the capability to cancel bad behaviors of curators, when the actions they are taking is increasing the risk towards the end user.

# Protocol Analysis

An overview of the Morpho protocol can be seen in the diagram below.

![Overview of the Morpho protocol](./diagrams/morpho-overview.png)

<!-- See [Whitepaper: Morpho Protocol](https://github.com/morpho-org/morpho-blue/blob/main/morpho-blue-whitepaper.pdf) -->

# Dependencies

Morpho Markets are configured with an external price oracle based on which the solvency of a position is established.
Market creators are free in chosing an appropriate price oracle implementation. However, once created, the feed cannot be updated.
The Morpho protocol facilitates the creation of price oracles, and markets, with the `MorphoChainlinkOracleV2Factory`.
This factory creates new price oracles which are compliant with Chainlink's Aggregator Interface. Thereby, the factory makes important assumptions on the liveness and validity of prices returned by the feed as documented in the source code as follows:

```
/// - Staleness is not checked because it's assumed that the Chainlink feed keeps its promises on this.
/// - The price is not checked to be in the min/max bounds because it's assumed that the Chainlink feed keeps its
/// promises on this.
```

Note that the price oracle in a Morpho market cannot be updated (markets are immutable). A permanent failure or staleness of the price feed can thus result in user funds being permanently frozen in Morpho Markets.

At the time of writing this review, more than 35% of the live Morpho Markets, or more than 30% of Morpho's TVL, make use of this standard price oracle and a Chainlink curated price feed. An analysis of this with results can be found on our [GitHub](https://github.com/deficollective/morpho-oracles-analysis). Thus, even though technically not enforced, Chainlink forms a critical dependency of the Morpho protocol.

The Chainlink oracle system itself is upgradeable potentially resulting in the publishing of unintended or malicious prices. The permissions to upgrade are controlled by a multisig account with a 4-of-9 signers threshold. This multisig account is listed in the Chainlink docs but signers are not publicly announced. The Chainlink multisig thus does not suffice the Security Council requirements specified by either L2Beat or DeFiScan resulting in a High centralization score.

# Governance

Morpho does not yet have an onchain governance system with control over protocol permissions. Instead, permissioned functions are controlled by the [morpho.eth](#security-council) (Morpho protocol and `MORPHO` token) and [MorphoRewards](#security-council) (distribution of rewards) multisig accounts.

## Security Council

&nbsp;

| Name                   | Account                                                                                                               | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| morpho.eth             | [0xBDE0c70BdC242577c52dFAD53389F82fd149EA5a](https://basescan.org/address/0xBDE0c70BdC242577c52dFAD53389F82fd149EA5a) | Multisig 5/9 | ✅          | ✅              | ❌                | ❌             |
| MorphoRewards Multisig | [0xF057afeEc22E220f47AD4220871364e9E828b2e9](https://etherscan.io/address/0xF057afeEc22E220f47AD4220871364e9E828b2e9) | Multisig 3/5 | ❌          | ✅              | ❌                | ❌             |

## Exit Window

The Morpho protocol exposes permissions that allow the [morpho.eth](#security-council) multisig account to enable new Liquidation Loan-to-Value ratios and Interest Rate Models for future market creation. These functions do not impose risks of loss of funds or unclaimed yield on users and thus do not need to be protected with an Exit Window.

However, critical permissions in the `MORPHO` token allow the same multisig account to upgrade the token contract or mint more tokens. These permissions can result in the loss of unclaimed `MORPHO` rewards and thus expose a _Medium_ upgradeability risk. The permissions are not protected with onchain governance and an Exit Window, instead the [morpho.eth](#security-council) multisig account can upgrade and mint on the `MORPHO` token contract instantly.

# Contracts & Permissions

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

## All Permission owners

| Name                   | Account                                                                                                               | Type         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| morpho.eth             | [0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa](https://etherscan.io/address/0xcBa28b38103307Ec8dA98377ffF9816C164f9AFa) | Multisig 5/9 |
| MorphoRewards Multisig | [0xF057afeEc22E220f47AD4220871364e9E828b2e9](https://etherscan.io/address/0xF057afeEc22E220f47AD4220871364e9E828b2e9) | Multisig 3/5 |
| Morpho                 | [0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb](https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb) | Contract     |

<!-- potential additional permission owners:

Morpho operations multisig: 0x640428D38189B11B844dAEBDBAAbbdfbd8aE0143 (3/9)
SafeOwner: 0x0b9915C13e8E184951Df0d9C0b104f8f1277648B -->

## Permissions

| Contract                     | Function                   | Impact                                                                                                                                                                                                                                              | Owner                            |
| ---------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Morpho                       | setOwner                   | Sets newOwner as owner of the contract.                                                                                                                                                                                                             | morpho.eth                       |
| Morpho                       | enableIrm                  | Enables irm as a possible IRM for market creation. Once set an interest rate cannot be disabled.                                                                                                                                                    | morpho.eth                       |
| Morpho                       | enableLltv                 | Enables lltv as a possible LLTV for market creation.                                                                                                                                                                                                | morpho.eth                       |
| Morpho                       | setFee                     | Sets the newFee for the given market marketParams. Fees are taken on the interests and can be of up to 25%.                                                                                                                                         | morpho.eth                       |
| Morpho                       | setFeeRecipient            | Sets newFeeRecipient as feeRecipient of the fee, the address who will benefit from the fees, if any.                                                                                                                                                | morpho.eth                       |
| AdaptiveCurveIrm             | borrowRate                 | Returns the borrow rate per second (scaled by WAD) of the market `marketParams` and eventually adjust according to the parameters. Can only be called by the main Morpho contract upon interest collection.                                         | Morpho                           |
| UniversalRewardsDistributor  | setRootUpdater             | Grants the _Updater_ role to a specific address, typically an offchain bot. The _Updaters_ compute merkle trees of reward distribution and submit the root on-chain.                                                                                | MorphoRewards Multisig           |
| UniversalRewardsDistributor  | submitRoot                 | Submit the root of a merkle tree. The offline-computed tree allows the distribution of reward tokens to users. The tree could be wrong or malicious to distribute undeserved rewards. The root is only accepted once the timelock delay has passed. | Updater                          |
| UniversalRewardsDistributor  | revokePendingRoot          | Revokes a root during the timelock delay, before final acceptance. This can be used to cancel a malicious reward distribution.                                                                                                                      | MorphoRewards Multisig           |
| UniversalRewardsDistributor  | setRoot                    | Accepts the root as final if the correct delay has passed and the root wasn't revoked.                                                                                                                                                              | MorphoRewards Multisig           |
| UniversalRewardsDistributor  | setTimelock                | Sets a timelock for root updates. New roots submitted will be frozen for this amount of time so that the owner may cancel them.                                                                                                                     | MorphoRewards Multisig           |
| UniversalRewardsDistributor  | setOwner                   | Sets a new owner for the contract. The owner needs to accept ownership.                                                                                                                                                                             | MorphoRewards Multisig           |
| MetaMorphoV1_1               | setOwner                   | Sets a new owner, the owner has all rights on the contract, can set fees and grant access roles.                                                                                                                                                    | Vault Owner                      |
| MetaMorphoV1_1               | transferOwnership          | Transfers ownership of the contract to another addres who needs to accept it.                                                                                                                                                                       | Vault Owner                      |
| MetaMorphoV1_1               | renounceOwnership          | Renounces ownership over the contract. No new owner can be named.                                                                                                                                                                                   | Vault Owner                      |
| MetaMorphoV1_1               | setName                    | Sets the name of the vault's ERC-20.                                                                                                                                                                                                                | Vault Owner                      |
| MetaMorphoV1_1               | setSymbol                  | Sets the symbol of the vault's ERC-20.                                                                                                                                                                                                              | Vault Owner                      |
| MetaMorphoV1_1               | setCurator                 | Sets the curator. Curators can decrease/increase supply caps, allocate funds, force market removals.                                                                                                                                                | Vault Owner                      |
| MetaMorphoV1_1               | setIsAllocator             | Grants Allocator role to an addres. Allocators can decide on the order of the markets to supply/borrow from.                                                                                                                                        | Vault Owner                      |
| MetaMorphoV1_1               | setSkimRecipient           | Sets the recepient of skimming: collection of leftover tokens set to the contract.                                                                                                                                                                  | Vault Owner                      |
| MetaMorphoV1_1               | submitTimelock             | Sets the timelock. Timelock is the delay between critical changes dones by the curator and allocator and the moment they take actions. The owner and guardian can use this delay to cancel those transactions.                                      | Vault Owner                      |
| MetaMorphoV1_1               | setFee                     | Sets a fee that is taken on users' yield. The max fee is set to 25% of interests.                                                                                                                                                                   | Vault Owner                      |
| MetaMorphoV1_1               | setFeeRecipient            | Sets the fee recipient. The address that will receive the collected fees.                                                                                                                                                                           | Vault Owner                      |
| MetaMorphoV1_1               | submitGuardian             | Names a new guardian for the contract. The guardian can cancel critical transactions during the timelock delay. The new guardian takes its functions only after the timelock delay has passed.                                                      | Vault Owner                      |
| MetaMorphoV1_1               | submitCap                  | Submits a new supply cap for a specific market. The new cap only takes effect after the timelock delay.                                                                                                                                             | Vault Owner, Vault Curator       |
| MetaMorphoV1_1               | submitMarketRemoval        | Removes a market from the vault. The removal only takes effect after the timelock delay.                                                                                                                                                            | Vault Owner                      |
| MetaMorphoV1_1               | setSupplyQueue             | Sets a queue of markets for fund allocation in order.                                                                                                                                                                                               | Vault Owner, Curator, Allocators |
| MetaMorphoV1_1               | updateWithdrawQueue        | Updates the queue of markets to withdraw from in order.                                                                                                                                                                                             | Vault Owner, Curator, Allocators |
| MetaMorphoV1_1               | reallocate                 | Reallocate the funds on different markets.                                                                                                                                                                                                          | Vault Owner, Curator, Allocators |
| MetaMorphoV1_1               | revokePendingTimelock      | Revokes a timelock before it takes effect.                                                                                                                                                                                                          | Vault Owner, Guardian            |
| MetaMorphoV1_1               | revokePendingCap           | Cancel a market supply cap before it takes effect                                                                                                                                                                                                   | Vault Owner, Guardian            |
| MetaMorphoV1_1               | revokePendingMarketRemoval | Cancels a market removal before it takes effect.                                                                                                                                                                                                    | Vault Owner, Guardian            |
| MorphoTokenEthereum (MORPHO) | upgradeToAndCall           | Upgrades the contract to a new implementation. This can potentially change the logic of the token and could be used to steal funds.                                                                                                                 | morpho.eth                       |
| MorphoTokenEthereum (MORPHO) | transferOwnership          | Transfer ownership of the contract to a new adress. The new owner needs to accept ownership. The new owner has minting right and upgrade right on the `MORPHO` token and therefore extreme power.                                                   | morpho.eth                       |
| MorphoTokenEthereum (MORPHO) | renounceOwnership          | Unrevokably abandons ownership of the contract. This would make the `MORPHO` contract immutable and prevent further mints.                                                                                                                          | morpho.eth                       |
| MorphoTokenEthereum (MORPHO) | mint                       | Mints `MORPHO` tokens to a new address and increase the total supply. This can be abused to dillute the value of `MORPHO` or influence governance decisions in the future.                                                                          | morpho.eth                       |
