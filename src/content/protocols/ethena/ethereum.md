---
chain: "Ethereum"
stage: "O"
reasons: ["Central Custody"]
risks: ["L", "H", "H", "H", "H"]
author: ["sagaciousyves"]
submission_date: "2025-07-23"
publish_date: "2025-07-23"
update_date: "2025-07-23"
---

# Summary

Add a summary of the protocols. What is it? What does it do? etc.

# Ratings

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

## Conclusion

Some text in form of:

The xyz protocol achieves High centralization risk scores for its Upgradeability, Autonomy and Exit Window dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by ...

The project additionally could advance to Stage 2 if ...

# Reviewer's Notes

(Here, anything worth mentioning about what critical permissions you excluded from the scope or some elements that xyz protocol does in a unique way. If nothing seems relevant, just say that :)

⚠️ During our analysis, we identified ...

# Protocol Analysis

Here include the diagram. Please explain what the main contracts are doing within the diagram.

# Dependencies

Go into more detail of the oracle, bridge, or other dependency the defi protocol is using

# Governance

## Relevant Subsection

Here anything relevant to the governance, in this case it could be what you highlighted in "Upgrade Process"

## Security Council

New table with all the multisigs

| Name                     | Account                                                                                                               | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| sUSDe Yield Distribution | [0x71e4f98e8f20c88112489de3dded4489802a3a87](https://etherscan.io/address/0x71e4f98e8f20c88112489de3dded4489802a3a87) | Multisig | ✅          | ❌              | ❌                | ✅             |

# Contracts & Permissions

## Contracts

| Contract Name             | Address                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| USDe                      | [0x4c9EDD5852cd905f086C759E8383e09bff1E68B3](https://etherscan.io/address/0x4c9EDD5852cd905f086C759E8383e09bff1E68B3) |
| EthenaMinting             | [0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3](https://etherscan.io/address/0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3) |
| StakedUSDeV2              | [0x9D39A5DE30e57443BfF2A8307A4256c8797A3497](https://etherscan.io/address/0x9D39A5DE30e57443BfF2A8307A4256c8797A3497) |
| StackingRewardDistributor | [0xf2fa332bD83149c66b09B45670bCe64746C6b439](https://etherscan.io/address/0xf2fa332bD83149c66b09B45670bCe64746C6b439) |
| USDeSilo                  | [0x7FC7c91D556B400AFa565013E3F32055a0713425](https://etherscan.io/address/0x7FC7c91D556B400AFa565013E3F32055a0713425) |
| ENA                       | [0x57e114B691Db790C35207b2e685D4A43181e6061](https://etherscan.io/address/0x57e114B691Db790C35207b2e685D4A43181e6061) |
| sENA (Proxy)              | [0x8bE3460A480c80728a8C4D7a5D5303c85ba7B3b9](https://etherscan.io/address/0x8bE3460A480c80728a8C4D7a5D5303c85ba7B3b9) |
| sENA (Implementation)     | [0x7fd57b46ae1a7b14f6940508381877ee03e1018b](https://etherscan.io/address/0x7fd57b46ae1a7b14f6940508381877ee03e1018b) |
| EnaSilo                   | [0x4655B6A10C83D6bEfF1DC7116436cFD8b4F8d48A](https://etherscan.io/address/0x4655B6A10C83D6bEfF1DC7116436cFD8b4F8d48A) |
| ProxyAdmin                | [0xf849D7792Ff9b30A57656ee10a2776bCb49F4Fe4](https://etherscan.io/address/0xf849D7792Ff9b30A57656ee10a2776bCb49F4Fe4) |

## All Permission Owners

| Name                                 | Account                                                                                                               | Type          |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| Dev Multisig                         | [0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862](https://etherscan.io/address/0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862) | Multisig 4/8  |
| sUSDe Yield Distribution             | [0x71e4f98e8f20c88112489de3dded4489802a3a87](https://etherscan.io/address/0x71e4f98e8f20c88112489de3dded4489802a3a87) | Multisig 4/11 |
| Operator (StakingRewardsDistributor) | [0xe3880B792F6F0f8795CbAACd92E7Ca78F5d3646e](https://etherscan.io/address/0xe3880B792F6F0f8795CbAACd92E7Ca78F5d3646e) | EOA           |
| ProxyAdmin                           | [0xf849D7792Ff9b30A57656ee10a2776bCb49F4Fe4](https://etherscan.io/address/0xf849D7792Ff9b30A57656ee10a2776bCb49F4Fe4) | Contract      |

## Permissions

| Contract                                | Function                    | Impact | Owner                                                |
| --------------------------------------- | --------------------------- | ------ | ---------------------------------------------------- |
| USDe                                    | transferOwnership           | ...    | Dev Multisig                                         |
| USDe                                    | setMinter                   | ...    | Dev Multisig                                         |
| USDe                                    | mint                        | ...    | EthenaMinting                                        |
| USDe                                    | renounceOwnership           | ...    | Dev Multisig                                         |
| EthenaMinting                           | transferAdmin               | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | acceptAdmin                 | ...    | new DEFAULT_ADMIN_ROLE                               |
| EthenaMinting                           | renounceRole                | ...    | respective role owner                                |
| EthenaMinting                           | grantRole                   | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | revokeRole                  | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | mint                        | ...    | MINTER_ROLE                                          |
| EthenaMinting                           | mintWETH                    | ...    | MINTER_ROLE                                          |
| EthenaMinting                           | redeem                      | ...    | REDEEMER_ROLE                                        |
| EthenaMinting                           | setGlobalMaxMintPerBlock    | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | setGlobalMaxRedeemPerBlock  | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | disableMintRedeem           | ...    | GATEKEEPER_ROLE                                      |
| EthenaMinting                           | transferToCustody           | ...    | COLLATERAL_MANAGER_ROLE                              |
| EthenaMinting                           | removeSupportedAsset        | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | removeCustodianAddress      | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | removeMinterRole            | ...    | GATEKEEPER_ROLE                                      |
| EthenaMinting                           | removeRedeemerRole          | ...    | GATEKEEPER_ROLE                                      |
| EthenaMinting                           | removeCollateralManagerRole | ...    | GATEKEEPER_ROLE                                      |
| EthenaMinting                           | removeWhitelistedBenefactor | ...    | GATEKEEPER_ROLE                                      |
| EthenaMinting                           | addCustodianAddress         | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | addWhitelistedBenefactor    | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | addSupportedAsset           | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | setMaxMintPerBlock          | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | setMaxRedeemPerBlock        | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | setTokenType                | ...    | DEFAULT_ADMIN_ROLE                                   |
| EthenaMinting                           | setStablesDeltaLimit        | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedUSDeV2                            | transferInRewards           | ...    | REWARDER_ROLE                                        |
| StakedUSDeV2                            | addToBlacklist              | ...    | BLACKLIST_MANAGER_ROLE                               |
| StakedUSDeV2                            | removeFromBlacklist         | ...    | BLACKLIST_MANAGER_ROLE                               |
| StakedUSDeV2                            | rescueTokens                | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedUSDeV2                            | redistributeLockedAmount    | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedUSDeV2                            | transferAdmin               | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedUSDeV2                            | acceptAdmin                 | ...    | new DEFAULT_ADMIN_ROLE                               |
| StakedUSDeV2                            | renounceRole                | ...    | respective role owner                                |
| StakedUSDeV2                            | grantRole                   | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedUSDeV2                            | revokeRole                  | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedUSDeV2                            | setCooldownDuration         | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakingRewardsDistributor               | renounceOwnership           | ...    | Dev Multisig                                         |
| StakingRewardsDistributor               | transferOwnership           | ...    | Dev Multisig                                         |
| StakingRewardsDistributor               | transferInRewards           | ...    | []                                                   |
| StakingRewardsDistributor               | rescueTokens                | ...    | Dev Multisig                                         |
| StakingRewardsDistributor               | setMintingContract          | ...    | Dev Multisig                                         |
| StakingRewardsDistributor               | approveToMintContract       | ...    | Dev Multisig                                         |
| StakingRewardsDistributor               | revokeApprovals             | ...    | Dev Multisig                                         |
| StakingRewardsDistributor               | setOperator                 | ...    | Dev Multisig                                         |
| USDeSilo                                | withdraw                    | ...    | ['onlyStakingVault']                                 |
| ENA                                     | transferOwnership           | ...    | Dev Multisig                                         |
| ENA                                     | mint                        | ...    | Dev Multisig                                         |
| ENA                                     | renounceOwnership           | ...    | Dev Multisig                                         |
| StakedENA (TransparentUpgradeableProxy) | changeAdmin                 | ...    | ProxyAdmin                                           |
| StakedENA (TransparentUpgradeableProxy) | upgradeTo                   | ...    | ProxyAdmin                                           |
| StakedENA (TransparentUpgradeableProxy) | upgradeToAndCall            | ...    | ProxyAdmin                                           |
| StakedENA (Implementation)              | transferAdmin               | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedENA (Implementation)              | acceptAdmin                 | ...    | new DEFAULT_ADMIN_ROLE                               |
| StakedENA (Implementation)              | renounceRole                | ...    | respective role owner                                |
| StakedENA (Implementation)              | grantRole                   | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedENA (Implementation)              | revokeRole                  | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedENA (Implementation)              | unstake                     | ...    | all users with finished cooldown and not blacklisted |
| StakedENA (Implementation)              | setCooldownDuration         | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedENA (Implementation)              | updateVestingPeriod         | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedENA (Implementation)              | transferInRewards           | ...    | REWARDER_ROLE                                        |
| StakedENA (Implementation)              | addToBlacklist              | ...    | BLACKLIST_MANAGER_ROLE                               |
| StakedENA (Implementation)              | removeFromBlacklist         | ...    | BLACKLIST_MANAGER_ROLE                               |
| StakedENA (Implementation)              | rescueTokens                | ...    | DEFAULT_ADMIN_ROLE                                   |
| StakedENA (Implementation)              | redistributeLockedAmount    | ...    | DEFAULT_ADMIN_ROLE                                   |
| ProxyAdmin                              | changeAdmin                 | ...    | Dev Multisig                                         |
| ProxyAdmin                              | upgradeTo                   | ...    | Dev Multisig                                         |
| ProxyAdmin                              | upgradeToAndCall            | ...    | Dev Multisig                                         |

### Role Permission inside `EthenaMinting`

| Role name               | ID                                                                 | Role Owners                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Role Admin    |
| ----------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| REWARDER_ROLE           | 0xbeec13769b5f410b0584f69811bfd923818456d5edcf426b0e31cf90eed7a3f6 | 0x71e4f98e8f20c88112489de3dded4489802a3a87                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | DEFAULT_ADMIN |
| DEFAULT_ADMIN           | 0x0000000000000000000000000000000000000000000000000000000000000000 | Dev Multisig                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | DEFAULT_ADMIN |
| GATEKEEPER_ROLE         | 0x3c63e605be3290ab6b04cfc46c6e1516e626d43236b034f09d7ede1d017beb0c | 0xab9110d36b030bae812cd3bb7b9de805a64aa7dc, 0x0f566cc38677239bed459047065925654b6d5bd9, 0x496011675b197cc136b48bc19d848fe26d3a8996, 0xb6ecae7413a3e78a3e10f15afe3066e79566cca3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | DEFAULT_ADMIN |
| MINTER_ROLE             | 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6 | 0xd0899998cceb5b3df5cdcfaadd43e53b8e1d553e, 0x655a1b0124b39b2d7c7f62a99627a891fad93b7b, 0x03984ddef40850bb9862ec09037853630d7b6ae4, 0x950c886cc6b9d420455985c3d31090aa060e96c8, 0xcd992cfb025014c01ebc2f2311c3f87aa8411d9c, 0x7d69817ea29244504c1a97b66e2c990f25df7599, 0x6f1d2df2acc5f2da3167ad1967b648207cfc63db, 0x661ca83074b8ec630825d4604455325499f951a1, 0x64004ae464f49c30a188c34e01b0dc66c8beb21e, 0x24be9948466feceb22a9b77b19e404f2119fb962, 0x6fd5ffee1220b0458c2114d6ce7fb4de2bc8fee6, 0x9b6889199627f78470ea230cc7df974239e0a5e5, 0x0b23d23939a1731289eaa04f62ba1dd4ecdd5c7d, 0xb229d6db056750e22499191156bf4c3654df3826, 0x4d394f45dfadef5522759c511702db97690a5c12, 0xa22c29b20f9be2c809979ed606b24fe5286ac8f2, 0x57093ffedc2f49eb3a5a11b63c0f4ca1b75c5cb7, 0xc3309fddfc8297c39a38d5d872a37222f98dad37, 0x57fefb75863cc64fecf11ac99d7a5b60ebe0080f, 0x71c95aaa22696d745e378486b769ee47ca23797c | DEFAULT_ADMIN |
| REDEEMER_ROLE           | 0x44ac9762eec3a11893fefb11d028bb3102560094137c3ed4518712475b2577cc | 0xd0899998cceb5b3df5cdcfaadd43e53b8e1d553e, 0x655a1b0124b39b2d7c7f62a99627a891fad93b7b, 0x03984ddef40850bb9862ec09037853630d7b6ae4, 0x950c886cc6b9d420455985c3d31090aa060e96c8, 0xcd992cfb025014c01ebc2f2311c3f87aa8411d9c, 0x7d69817ea29244504c1a97b66e2c990f25df7599, 0x6f1d2df2acc5f2da3167ad1967b648207cfc63db, 0x661ca83074b8ec630825d4604455325499f951a1, 0x64004ae464f49c30a188c34e01b0dc66c8beb21e, 0x24be9948466feceb22a9b77b19e404f2119fb962, 0x6fd5ffee1220b0458c2114d6ce7fb4de2bc8fee6, 0x9b6889199627f78470ea230cc7df974239e0a5e5, 0x0b23d23939a1731289eaa04f62ba1dd4ecdd5c7d, 0xb229d6db056750e22499191156bf4c3654df3826, 0x4d394f45dfadef5522759c511702db97690a5c12, 0xa22c29b20f9be2c809979ed606b24fe5286ac8f2, 0x57093ffedc2f49eb3a5a11b63c0f4ca1b75c5cb7, 0xc3309fddfc8297c39a38d5d872a37222f98dad37, 0x57fefb75863cc64fecf11ac99d7a5b60ebe0080f, 0x71c95aaa22696d745e378486b769ee47ca23797c | DEFAULT_ADMIN |
| COLLATERAL_MANAGER_ROLE | 0x85e8f2d6819d6b24108062d87ea08f54651bcb8960d98062d3faf96e7873b8b9 | Dev Multisig                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | DEFAULT_ADMIN |

### Role Permission inside `sENA`

| Role name              | ID                                                                 | Role Owners                                | Role Admin    |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------ | ------------- |
| DEFAULT_ADMIN          | 0x0000000000000000000000000000000000000000000000000000000000000000 | Dev Multisig                               | DEFAULT_ADMIN |
| REWARDER_ROLE          | 0xbeec13769b5f410b0584f69811bfd923818456d5edcf426b0e31cf90eed7a3f6 | 0x71e4f98e8f20c88112489de3dded4489802a3a87 | DEFAULT_ADMIN |
| BLACKLIST_MANAGER_ROLE | 0xf988e4fb62b8e14f4820fed03192306ddf4d7dbfa215595ba1c6ba4b76b369ee |                                            | DEFAULT_ADMIN |

### Role Permission inside `StakedUSDeV2`

| Role name     | ID                                                                 | Role Owners                                | Role Admin    |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------ | ------------- |
| DEFAULT_ADMIN | 0x0000000000000000000000000000000000000000000000000000000000000000 | Dev Multisig                               | DEFAULT_ADMIN |
| REWARDER_ROLE | 0xbeec13769b5f410b0584f69811bfd923818456d5edcf426b0e31cf90eed7a3f6 | 0x71e4f98e8f20c88112489de3dded4489802a3a87 | DEFAULT_ADMIN |
