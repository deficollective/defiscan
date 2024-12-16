---
protocol: "PoolTogether-v5"
website: "https://pooltogether.com/"
x: "https://twitter.com/PoolTogether_"
github: ["https://github.com/pooltogether"]
defillama_slug: ["pooltogether-v5"]
chain: "Ethereum"
stage: 2
risks: ["L", "L", "L", "L", "L"]
author: ["CookingCryptos", "sagaciousyves"]
submission_date: "2024-10-23"
publish_date: "2024-10-23"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

PoolTogether-V5 is the newest version of the prize savings protocol; where yield on deposits is awarded as random prizes to depositors. This version is designed to be a hyperstructure; an autonomous, immutable protocol that can be permissionlessly extended by anyone.

A prize savings protocol gives users a chance at a large upside without risking their deposit. Each day, the yield from deposits is awarded randomly as prizes. Users have a chance to win everyone else's yield!

# Overview

## Chain

PoolTogether V5 is deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

Permissions in the PoolTogether-v5 protocol are fully revoked, the protocol is immutable 🎉

> ⚠️ Note that PoolTogether-v5 relies on third-party protocols, in particular as yield sources, which themselves could include upgradeable contracts. It is outside of the scope of this review to analyze these protocols too.

> Upgradeability score: L

## Autonomy

The protocol relies on the Witnet Oracle for randomness in prize draws. If the oracle fails, a new PrizePool and DrawManager must be deployed, though users can still withdraw their deposits and accrued rewards without interruption and are thus not affected by an oracle failure.

> ⚠️ Note that anyone can create a new `PrizeVault` from the `PriceVaultFactory` and link it to third-party yield sources and utility contracts (e.g., `LiquidationPair` or `Claimer`). A flawed or malicious implementation of these contracts could result in the loss or theft of user funds. While it is outside of the scope of this review to analyze the underlying yield sources, it is important to note that PoolTogether v5 does NOT rely on a single external yield source and that PriceVaults are strictly isolated meaning that users only inherit the risks of the vault they are deposited in.

> Autonomy score: L

## Exit Window

PoolTogether's contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

> ⚠️ Note that PoolTogether-v5 relies on third-party protocols, in particular as yield sources, which themselves could exhibit upgradeable contracts. It is outside of the scope of this review to analyze whether appropriate Exit Windows exist on these protocols too.

> Exit Window score: L

## Accessibility

PoolTogether provides access to the protocol through multiple independent interfaces such as [app.cabana.fi](https://app.cabana.fi) and [pooltime.app](https://pooltime.app), ensuring that users can still interact with the protocol even if one interface is unavailable. This diversity in access points helps minimize risks related to interface outages or downtime, offering more flexibility for users.

> Accessibility score: L

# Technical Analysis

## Contracts

| Contract Name                                          | Address                                                                                                                                                                                                                                      |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POOL (Token)                                           | [0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e](https://etherscan.io/address/0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e)                                                                                                                        |
| POOL Prize Vault (V5)                                  | [0x9eE31E845fF1358Bf6B1F914d3918c6223c75573](https://etherscan.io/address/0x9eE31E845fF1358Bf6B1F914d3918c6223c75573)                                                                                                                        |
| RngWitnet                                              | [0xf93329e78feff1145fce03a79d5b356588dea215](https://etherscan.io/address/0xf93329e78feff1145fce03a79d5b356588dea215)                                                                                                                        |
| TwabController                                         | [0x4d5f2cd31701f3e5de77b3f89ee7b80eb87b4acc](https://etherscan.io/address/0x4d5f2cd31701f3e5de77b3f89ee7b80eb87b4acc)                                                                                                                        |
| TwabRewards                                            | [0x2589ff8614f74704741ee3b51851b4ae812f1a21](https://etherscan.io/address/0x2589ff8614f74704741ee3b51851b4ae812f1a21)                                                                                                                        |
| TpdaLiquidationPairFactory                             | [0xa99b3a8503260ab32753c382eac297acd4a43908](https://etherscan.io/address/0xa99b3a8503260ab32753c382eac297acd4a43908)                                                                                                                        |
| TpdaLiquidationRouter                                  | [0x7c210be12bcef8090610914189a0de43e2192ea0](https://etherscan.io/address/0x7c210be12bcef8090610914189a0de43e2192ea0)                                                                                                                        |
| PrizeVaultFactory                                      | [0xd499CcF3e93F4cfb335Ac388E3C896D59cdDe7c3](https://etherscan.io/address/0xd499CcF3e93F4cfb335Ac388E3C896D59cdDe7c3)                                                                                                                        |
| PrizePool                                              | [0x7865d01da4c9ba2f69b7879e6d2483ab6b354d95](https://etherscan.io/address/0x7865d01da4c9ba2f69b7879e6d2483ab6b354d95)                                                                                                                        |
| ClaimerFactory                                         | [0xd84C4c7675e6Eb79eA28D04C001e702cCC679E80](https://etherscan.io/address/0xd84C4c7675e6Eb79eA28D04C001e702cCC679E80)                                                                                                                        |
| Claimer                                                | [0x98CC81798954c35c39b960DfcA3d8b170154aa7e](https://etherscan.io/address/0x98CC81798954c35c39b960DfcA3d8b170154aa7e), [0x54aa02cbc223Fc834949FB1fd8C855e4dA126c7D](https://etherscan.io/address/0x54aa02cbc223Fc834949FB1fd8C855e4dA126c7D) |
| StakingVault (underlying ERC4626 for POOL Prize Vault) | [0x68a100a3729fc04ab26fb4c0862df22ceec2f18b](https://etherscan.io/address/0x68a100a3729fc04ab26fb4c0862df22ceec2f18b)                                                                                                                        |
| DrawManager                                            | [0x98305eb9a29d45ec93ce44ba02b315b631c675a7](https://etherscan.io/address/0x98305eb9a29d45ec93ce44ba02b315b631c675a7)                                                                                                                        |

## Permission Owners

All external permissions are revoked, the protocol is immutable 🎉

## Permissions

| Contract              | Function                  | Impact                                                                                                                                                       | Owner                                                          |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| POOL                  | setMinter                 | The owner of the permission to call setMinter can appoint a new minter. As the name suggests, the minter is allowed to call mint and designate a new minter. | 0x0 (renounced)                                                |
| POOL                  | mint                      | The owner of the permission is allowed to mint new Pool tokens into existence.                                                                               | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | renounceOwnership         | Disables access to permissioned functions for everyone, freezing the parameters to their current values.                                                     | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | transferOwnership         | Allows assigning an address to \_pendingOwner. This address needs to call claimOwnership to become the owner.                                                | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | claimOwnership            | Can only be called by the address equivalent to the value stored at \_pendingOwner.                                                                          | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | depositWithPermit         | Deposit into the Vault and mint Vault shares using permit to approve the underlying asset.                                                                   | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | setClaimer                | Sets a claimer contract for this prize vault, allowing automated bots to claim prizes on behalf of winners.                                                  | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | setLiquidationPair        | Sets the Liquidation Pair, responsible for auctioning yield for the prize token using a TPDA auction method.                                                 | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | setYieldFeePercentage     | Sets the yield fee percentage, which is immutably set to 0.                                                                                                  | 0x0 (renounced)                                                |
| POOL Prize Vault (V5) | setYieldFeeRecipient      | Sets the recipient for the yield fee, which is immutably set to the 0-address.                                                                               | 0x0 (renounced)                                                |
| TwabRewards           | endPromotion              | Allows the creator of a promotion to end the promotion.                                                                                                      | Creator address                                                |
| TwabRewards           | destroyPromotion          | Allows the creator of a promotion to destroy the promotion.                                                                                                  | Creator address                                                |
| PrizePool             | setDrawManager            | Allows the creator to set the DrawManager contract once.                                                                                                     | 0xc516fe1fee5122d66e9427721a63d6c27e1201ca                     |
| PrizePool             | allocateRewardFromReserve | Allows the DrawManager to allocate a reward from the reserve to a recipient.                                                                                 | DrawManager contract0x98305eb9a29D45eC93CE44bA02B315B631c675a7 |
| PrizePool             | awardDraw                 | Allows the Manager to award a draw with the winning random number.                                                                                           | DrawManager contract0x98305eb9a29D45eC93CE44bA02B315B631c675a7 |

## Dependencies

### Randomness Oracle (RngWitnet)

Pooltogether needs randomness to make drawings who should win the yield accrued from all the prize vaults. PoolTogether uses Witnet Oracle for randomness. The oracle endpoint on Ethereum Mainnet is deployed to the address 0xC0FFEE98AD1434aCbDB894BbB752e138c1006fAB. This address has an EOA as owner. The owner is allowed to transfer the ownership, renounce the ownership, set baseFee and change Witnet Service Level Agreement (Number of nodes in the Witnet blockchain that will take part in solving the data request and fees for each node resolving the request).
The oracle endpoint is referenced in the RngWitnet contract without any way to change (address is immutable). RngWitnet is immutably referenced inside the DrawManager. In case of oracle failure, a new DrawManager is needed to be deployed, as well as a new PrizePool and thus a whole new iteration of the PoolTogether protocol. However, claiming prizes and withdraw principal from pools is not affected from a frozen oracle. For claiming prizes a fallback function called withdrawShutdownBalance exists, where for each account and vault the prize money can be withdrawn proportional to the saved tokens and duration in a vault.

### Underlying yield source (linked ERC4626 in a Prize Vault)

In normal conditions depositors should always expect to be able to withdraw their full deposit amount and no more as long as global withdrawal limits meet or exceed their balance. However, since the protocol is fully permissionless everyone can create a new prize vault and link yield source and utility contracts to it. The yield source and the utility contracts like LiquidationPair or Claimer can be implemented with malicious intent, stealing underlying principal or stealing prize.

**While a price vault, or its underlying yield source, can be based on a flawed implementation or be malicious, vaults are strictly isolated meaning that users only assume the risk of a specific vault and yield source but do not inherit risks from other vaults.**

## Exit Window

The protocol is completely immutable, thus no exit window is required 🎉

# Security Council

The protocol is completely immutable, thus no Security Council is required 🎉
