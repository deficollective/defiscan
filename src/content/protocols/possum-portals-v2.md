---
protocol: "Possum-Portals-v2"
website: "https://www.possumlabs.io"
x: "https://x.com/Possum_Labs"
github: ["https://github.com/PossumLabsCrypto"]
defillama_slug: ["possum-labs"]
chain: "Arbitrum"
stage: 0
risks: ["M", "H", "H", "M", "H"]
author: ["stengarl", "sagaciousyves"]
submission_date: "2024-10-23"
publish_date: "2024-10-23"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Possum Labs introduces frictionless and efficient yield trading. its network of yield related protocols creates a positive sum flywheel for PSM and our ecosystem partners.

# Overview

## Chain

Possum is deployed on the Arbitrum chain, an Ethereum L2 in Stage 1 according to L2BEAT.

> Chain score: M

## Upgradeability

The Possum Portals v2 protocol consists of two main components: _Portals_ and _Adapters_.

Permissions in the Portals contracts are fully revoked, these contracts are immutable 🎉

Each Portal has an associated Adapter contract which enables interactions with external protocols such as swapping on 1Inch. These Adapter contracts are upgradeable with the permission owned by a hybrid governance system. Upgrades could involve a new, flawed or malicious Adapter implementation and can thus result in the loss or theft of user funds.

Furthermore, governance, through the _Core-v1_ module, allows PSM stakers to allocate capital to various Portals or Possum accounts more generally and thereby enable different products. A Multisig owns the permission to update a whitelist with accounts eligible for capital allocations. Removing an account from the whitelist effectively censors it for future rewards. Users can still withdraw funds and unclaimed yield and thus are unaffected by this.

> Upgradeability score: H

## Autonomy

Portals-v2 rely on Vaultka, a yield-generating protocol where assets are staked to generate returns. The stability and security of Vaultka are crucial for the Portals' functionality. If Vaultka were compromised, this could lead to the loss of user funds, loss of unclaimed yield, and otherwise materially change the protocol's expected behavior.

Arbitrageurs, on the other hand, exploit arbitrage opportunities when the value of accrued assets exceeds the fixed PSM required to buy them. Their participation is permissionless and the protocol does not rely on a direct user-service provider relationship. Instead, the protocol directly incentivizes Arbitrageurs and participation is open to all. As a result, the protocol does not depend on individual external "service providers" to fulfull this role.

In conclusion, Vaultka, and other potential Portal v2 integrations, introduce an important external dependency in the Possum protocol.

> Autonomy score: H

## Exit Window

The protocol's Adapter contracts are upgradable with hybrid governance process consisting of the following steps:

1. The Treasury Multisig proposes a new Adapter contract
2. Stakers in the Portal, associated with the specific Adapter, approve the upgrade through an on-chain vote requiring a simple majority (>50% of Yes votes)
3. Users can withdraw funds prior to the upgrade during a 7-day exit window
4. The implementation of the vote, and Adapter upgrade, is executed permissionlessly via `executeMigration()`

It is important to note that a new Adapter implementation is only proposed by the Multisig but then has to be accepted by the Stakers in the respective Portal. If accepted, a 7-day exit window for all users is enforced.

> Exit Window score: M

## Accessibility

Currently, Possum Labs offers only a single user interface without a backup solution in case of the shutdown of the user interface or censoring of users.

> Accessibility score: H

# Technical Analysis

## Contracts

| **Contract Name**                          | **Address**                                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| PSM                                        | [0x17A8541B82BF67e10B0874284b4Ae66858cb1fd5](https://arbiscan.io/address/0x17A8541B82BF67e10B0874284b4Ae66858cb1fd5) |
| PossumCore                                 | [0xb12192f4E3AcCb5D33589Ed683701F69a272EA26](https://arbiscan.io/address/0xb12192f4E3AcCb5D33589Ed683701F69a272EA26) |
| Virtual LP                                 | [0x212Bbd56F6D4F999B2845adebd8cec147851E383](https://arbiscan.io/address/0x212Bbd56F6D4F999B2845adebd8cec147851E383) |
| bVKA-L (MintBurnToken)                     | [0x61D3657fa8F7618Ebe7E05B4026C28b13BB0d805](https://arbiscan.io/address/0x61D3657fa8F7618Ebe7E05B4026C28b13BB0d805) |
| USDC Portal (PortalV2MultiAsset)           | [0x9167CFf02D6f55912011d6f498D98454227F4e16](https://arbiscan.io/address/0x9167CFf02D6f55912011d6f498D98454227F4e16) |
| USDC Portal Energy Token (MintBurnToken)   | [0x6bD75940B568b5400D6971Ed0542FC252C1eCC4E](https://arbiscan.io/address/0x6bD75940B568b5400D6971Ed0542FC252C1eCC4E) |
| USDC Portal NFT (PortalNFT)                | [0x1C64e6560b9267c5De60d7aFCB298b9494d1cC42](https://arbiscan.io/address/0x1C64e6560b9267c5De60d7aFCB298b9494d1cC42) |
| USDC Portal Adapter (AdapterV1)            | [0x44d583Ee73B6D9B4c8B830049DbCc0FA2c9580C0](https://arbiscan.io/address/0x44d583Ee73B6D9B4c8B830049DbCc0FA2c9580C0) |
| USDC.e Portal (PortalV2MultiAsset)         | [0xE8EfFf304D01aC2D9BA256b602D736dB81f20984](https://arbiscan.io/address/0xE8EfFf304D01aC2D9BA256b602D736dB81f20984) |
| USDC.e Portal Energy Token (MintBurnToken) | [0x1229D05c703fa195921C02F288D7111206B4C7E2](https://arbiscan.io/address/0x1229D05c703fa195921C02F288D7111206B4C7E2) |
| USDC.e Portal NFT (PortalNFT)              | [0x616AE6765Ae491d606Fc9EA3f31fe8BDAe47CE45](https://arbiscan.io/address/0x616AE6765Ae491d606Fc9EA3f31fe8BDAe47CE45) |
| USDC.e Portal Adapter (AdapterV1)          | [0x5872664ce990466f2e41bd7c576Fc0CdFA2A080a](https://arbiscan.io/address/0x5872664ce990466f2e41bd7c576Fc0CdFA2A080a) |
| ETH Portal (PortalV2MultiAsset)            | [0xe771545aaDF6feC3815B982fe2294F7230C9c55b](https://arbiscan.io/address/0xe771545aaDF6feC3815B982fe2294F7230C9c55b) |
| ETH Portal Energy Token (MintBurnToken)    | [0xA9Ee3b373843008a56178Fc3047fbD1C145c5a12](https://arbiscan.io/address/0xA9Ee3b373843008a56178Fc3047fbD1C145c5a12) |
| ETH Portal NFT (PortalNFT)                 | [0xbCF4bd2c5F0e7f7EF2aE1b5d9Bb3A1e235b56c95](https://arbiscan.io/address/0xbCF4bd2c5F0e7f7EF2aE1b5d9Bb3A1e235b56c95) |
| ETH Portal Adapter (AdapterV1)             | [0xd47571Db7362800814ef0798baD5F3fDdaEfcd30](https://arbiscan.io/address/0xd47571Db7362800814ef0798baD5F3fDdaEfcd30) |
| WBTC Portal (PortalV2MultiAsset)           | [0x919B37b5f2f1DEd2a1f6230Bf41790e27b016609](https://arbiscan.io/address/0x919B37b5f2f1DEd2a1f6230Bf41790e27b016609) |
| WBTC Portal Energy Token (MintBurnToken)   | [0xe6635d1B3CC0697C16BF4E02Dd5D89a0dA2bdD5b](https://arbiscan.io/address/0xe6635d1B3CC0697C16BF4E02Dd5D89a0dA2bdD5b) |
| WBTC Portal NFT (PortalNFT)                | [0x19cd08Aa2042c57eC823733cDA1768bdA18718fd](https://arbiscan.io/address/0x19cd08Aa2042c57eC823733cDA1768bdA18718fd) |
| WBTC Portal Adapter (AdapterV1)            | [0x59aF1881a44E90B3a0DbA85CebA55Dd95344b989](https://arbiscan.io/address/0x59aF1881a44E90B3a0DbA85CebA55Dd95344b989) |
| ARB Portal (PortalV2MultiAsset)            | [0x523a93037c47Ba173E9080FE8EBAeae834c24082](https://arbiscan.io/address/0x523a93037c47Ba173E9080FE8EBAeae834c24082) |
| ARB Portal Energy Token (MintBurnToken)    | [0x28302fb6F403496B8F6DFcFA9d492C837061A520](https://arbiscan.io/address/0x28302fb6F403496B8F6DFcFA9d492C837061A520) |
| ARB Portal NFT (PortalNFT)                 | [0x83A7EED6B703af82F4944D59c92C1919a9d3A93A](https://arbiscan.io/address/0x83A7EED6B703af82F4944D59c92C1919a9d3A93A) |
| ARB Portal Adapter (AdapterV1)             | [0xc62190C2b9413e8482a5895E8739E4632507f99d](https://arbiscan.io/address/0xc62190C2b9413e8482a5895E8739E4632507f99d) |
| LINK Portal (PortalV2MultiAsset)           | [0x51623b54753E07Ba9B3144Ba8bAB969D427982b6](https://arbiscan.io/address/0x51623b54753E07Ba9B3144Ba8bAB969D427982b6) |
| LINK Portal Energy Token (MintBurnToken)   | [0x8f2301d6Ed2dE8C8A99Db85eFb8C28d3224e5212](https://arbiscan.io/address/0x8f2301d6Ed2dE8C8A99Db85eFb8C28d3224e5212) |
| LINK Portal NFT (PortalNFT)                | [0x377BCEea5A7e2E8f677Ed93bb95E9813c67dC765](https://arbiscan.io/address/0x377BCEea5A7e2E8f677Ed93bb95E9813c67dC765) |
| LINK Portal Adapter (AdapterV1)            | [0x0DAe61Bd94b081F65D009f7d72f8f4d48dFB1375](https://arbiscan.io/address/0x0DAe61Bd94b081F65D009f7d72f8f4d48dFB1375) |
| TimeRift                                   | [0x6df4EF024089ab148078fdD88f5BF0Ee63248D3E](https://arbiscan.io/address/0x6df4EF024089ab148078fdD88f5BF0Ee63248D3E) |

## Permission Owners

| Name              | Account                                                                                                              | Type         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | ------------ |
| Treasury Multisig | [0xAb845D09933f52af5642FC87Dd8FBbf553fd7B33](https://arbiscan.io/address/0xAb845D09933f52af5642FC87Dd8FBbf553fd7B33) | Multisig 2/3 |

## Permissions

| Contract                                   | Function                    | Impact                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Owner                                        |
| ------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| PossumCore                                 | updateWhitelist             | The Guardian (role immutably assigned to the Treasury multisig) can list and delist addresses that can receive PSM incentives. There is at least 3 permanent addresses that cannot be delisted (Treasury, HLP Portal and PortalsV2 VirtualLP). Users receive CF when staking PSM with the PossumCore contract. With `distributeCoreFragments` users can decide which addresses should receive PSM by delegating their CF, in return the user gets a claim PSM rewards when unstaking. | Treasury                                     |
| Virtual LP                                 | registerPortal              | Function to add new Portals to the registry, for which PSM, PE, and bTokens can be swapped.                                                                                                                                                                                                                                                                                                                                                                                           | 0x0 (renounced)                              |
| USDC Portal Energy Token (MintBurnToken)   | mint                        | This function allows the permission owner to mint new PE tokens for the USDC Portal.                                                                                                                                                                                                                                                                                                                                                                                                  | USDC Portal contract (immutable reference)   |
| USDC Portal NFT (PortalNFT)                | mint                        | This function allows the permission owner to mint new Portal NFTs.                                                                                                                                                                                                                                                                                                                                                                                                                    | USDC Portal contract (immutable reference)   |
| USDC Portal NFT (PortalNFT)                | redeem                      | Redeem Position NFT to receive an internal Account in Portal.                                                                                                                                                                                                                                                                                                                                                                                                                         | USDC Portal contract (immutable reference)   |
| USDC Portal Adapter (AdapterV1)            | proposeMigrationDestination | Allow the contract owner to propose a new Adapter contract for migration. The principal stakers need to accept with >50% of the staked capital in an on-chain vote.                                                                                                                                                                                                                                                                                                                   | Treasury                                     |
| USDC.e Portal Energy Token (MintBurnToken) | mint                        | This function allows the permission owner to mint new PE tokens for the USDC.e Portal.                                                                                                                                                                                                                                                                                                                                                                                                | USDC.e Portal contract (immutable reference) |
| USDC.e Portal NFT (PortalNFT)              | mint                        | This function allows the permission owner to mint new Portal NFTs.                                                                                                                                                                                                                                                                                                                                                                                                                    | USDC.e Portal contract (immutable reference) |
| USDC.e Portal NFT (PortalNFT)              | redeem                      | Redeem Position NFT to receive an internal Account in Portal.                                                                                                                                                                                                                                                                                                                                                                                                                         | USDC.e Portal contract (immutable reference) |
| USDC.e Portal Adapter (AdapterV1)          | proposeMigrationDestination | Allow the contract owner to propose a new Adapter contract for migration. The principal stakers need to accept with >50% of the staked capital in an on-chain vote.                                                                                                                                                                                                                                                                                                                   | Treasury                                     |
| ETH Portal Energy Token (MintBurnToken)    | mint                        | This function allows the permission owner to mint new PE tokens for the ETH Portal.                                                                                                                                                                                                                                                                                                                                                                                                   | ETH Portal contract (immutable reference)    |
| ETH Portal NFT (PortalNFT)                 | mint                        | This function allows the permission owner to mint new Portal NFTs.                                                                                                                                                                                                                                                                                                                                                                                                                    | ETH Portal contract (immutable reference)    |
| ETH Portal NFT (PortalNFT)                 | redeem                      | Redeem Position NFT to receive an internal Account in Portal.                                                                                                                                                                                                                                                                                                                                                                                                                         | ETH Portal contract (immutable reference)    |
| ETH Portal Adapter (AdapterV1)             | proposeMigrationDestination | Allow the contract owner to propose a new Adapter contract for migration. The principal stakers need to accept with >50% of the staked capital in an on-chain vote.                                                                                                                                                                                                                                                                                                                   | Treasury                                     |
| WBTC Portal Energy Token (MintBurnToken)   | mint                        | This function allows the permission owner to mint new PE tokens for the WBTC Portal.                                                                                                                                                                                                                                                                                                                                                                                                  | WBTC Portal contract (immutable reference)   |
| WBTC Portal NFT (PortalNFT)                | mint                        | This function allows the permission owner to mint new Portal NFTs.                                                                                                                                                                                                                                                                                                                                                                                                                    | WBTC Portal contract (immutable reference)   |
| WBTC Portal NFT (PortalNFT)                | redeem                      | The function allows the permission owner to renounce ownership over all permissioned functions in this contract.                                                                                                                                                                                                                                                                                                                                                                      | WBTC Portal contract (immutable reference)   |
| WBTC Portal Adapter (AdapterV1)            | proposeMigrationDestination | Allow the contract owner to propose a new Adapter contract for migration. The principal stakers need to accept with >50% of the staked capital in an on-chain vote.                                                                                                                                                                                                                                                                                                                   | Treasury                                     |
| ARB Portal Energy Token (MintBurnToken)    | mint                        | This function allows the permission owner to mint new PE tokens for the ARB Portal.                                                                                                                                                                                                                                                                                                                                                                                                   | ARB Portal contract (immutable reference)    |
| ARB Portal NFT (PortalNFT)                 | mint                        | This function allows the permission owner to mint new Portal NFTs.                                                                                                                                                                                                                                                                                                                                                                                                                    | ARB Portal contract (immutable reference)    |
| ARB Portal NFT (PortalNFT)                 | redeem                      | Redeem Position NFT to receive an internal Account in Portal.                                                                                                                                                                                                                                                                                                                                                                                                                         | ARB Portal contract (immutable reference)    |
| ARB Portal Adapter (AdapterV1)             | proposeMigrationDestination | Allow the contract owner to propose a new Adapter contract for migration. The principal stakers need to accept with >50% of the staked capital in an on-chain vote.                                                                                                                                                                                                                                                                                                                   | Treasury                                     |
| LINK Portal Energy Token (MintBurnToken)   | mint                        | This function allows the permission owner to mint new PE tokens for the LINK Portal.                                                                                                                                                                                                                                                                                                                                                                                                  | LINK Portal contract (immutable reference)   |
| LINK Portal NFT (PortalNFT)                | mint                        | This function allows the permission owner to mint new Portal NFTs.                                                                                                                                                                                                                                                                                                                                                                                                                    | LINK Portal contract (immutable reference)   |
| LINK Portal NFT (PortalNFT)                | redeem                      | Redeem Position NFT to receive an internal Account in Portal.                                                                                                                                                                                                                                                                                                                                                                                                                         | LINK Portal contract (immutable reference)   |
| LINK Portal Adapter (AdapterV1)            | proposeMigrationDestination | Allow the contract owner to propose a new Adapter contract for migration. The principal stakers need to accept with >50% of the staked capital in an on-chain vote.                                                                                                                                                                                                                                                                                                                   | Treasury                                     |

## Dependencies

Certain staking assets within the Possum ecosystem are subject to centralized control, including potential blacklisting or custodial risks (e.g., USDC/.e, WBTC). Furthermore, the upgradeability of staked assets (HLP) and underlying protocols (HMX & Vaultka) could lead to compatibility issues with Portals after updates. Decisions made by centralized managers of these assets and protocols could potentially render interactions with Portals or underlying protocols impossible, potentially resulting in complete loss of user funds. It's important to note that Possum Labs has no control over these entities, and due to its immutable design, Portals cannot actively adapt to changes in underlying protocols or assets.

## Exit Window

For each type of principal there exists a portal and a related adapter contract. Adapter contracts are upgradable. The Possum Labs multisig can propose a new address, but the token owners need to accept with a majority (>50%) vote. If the vote gets through, the new implementation is enforced 7 days after vote surpassed 50%. The migration is then triggered permissionlessly via executeMigration() on the old adapter contract itself.

No time-locks have been found. All upgrades take place immediately.

# Security Council

| Requirement                                             | Treasury Multisig |
| ------------------------------------------------------- | :---------------: |
| At least 7 signers                                      |        ❌         |
| At least 51% threshold                                  |        ✅         |
| At least 50% non-team signers                           |        ❌         |
| Signers are publicly announced (with name or pseudonym) |        ❌         |

Info sourced from here: [https://possum-labs.gitbook.io/docs/smart-contracts/treasury](https://possum-labs.gitbook.io/docs/smart-contracts/treasury).
