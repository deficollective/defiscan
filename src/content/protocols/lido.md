---
protocol: "Lido"
website: "https://lido.fi/"
x: "https://x.com/LidoFinance"
github: ["https://github.com/lidofinance"]
defillama_slug: ["lido"]
chain: "mainnet"
stage: 0
reasons: [""]
risks: ["L", "L", "L", "L", "L"]
author: ["mmilien_"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Lido is a liquid-staking protocol.

# Overview

## Chain

Lido is currently deployed on Ethereum, Solana, and Polygon. This review focuses on the
Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability

> Upgradeability score: Low/Medium/High

## Autonomy

Uses Chainlink Price Feeds. Fallbacks?

OracleReports for beacon chain stats.

> Autonomy score: Low/Medium/High

## Exit Window

See http://defiscan.info/learn-more#exit-window for more guidance.

> Exit Window score: Low/Medium/High

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

> Accessibility score: Low/Medium/High

# Technical Analysis

## Contracts

| Contract Name                          | Address                                    |
| -------------------------------------- | ------------------------------------------ |
| LidoLocator (Proxy)                    | 0xC1d0b3DE6792Bf6b4b37EccdcC24e45978Cfd2Eb |
| LidoLocator (Implementation)           | 0x3abc4764f0237923d52056cfba7e9aebf87113d3 |
| Lido (Proxy)                           | 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 |
| Lido (Implementation)                  | 0x17144556fd3424edc8fc8a4c940b2d04936d17eb |
| WstETH                                 | 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0 |
| EIP712StETH                            | 0x8F73e4C2A6D852bb4ab2A45E6a9CF5715b3228B7 |
| StakingRouter (Proxy)                  | 0xFdDf38947aFB03C621C71b06C9C70bce73f12999 |
| StakingRouter (Implementation)         | 0x89eDa99C0551d4320b56F82DDE8dF2f8D2eF81aA |
| DepositSecurityModule                  | 0xfFA96D84dEF2EA035c7AB153D8B991128e3d72fD |
| LidoExecutionLayerRewardsVault         | 0x388C818CA8B9251b393131C08a736A67ccB19297 |
| WithdrawalQueueERC721 (Proxy)          | 0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1 |
| WithdrawalQueueERC721 (Implementation) | 0xE42C659Dc09109566720EA8b2De186c2Be7D94D9 |
| WithdrawalsManagerProxy                | 0xB9D7934878B5FB9610B3fE8A5e441e8fad7E293f |
| WithdrawalVault                        | ...                                        |
| Burner                                 | 0xD15a672319Cf0352560eE76d9e89eAB0889046D3 |
| MinFirstAllocationStrategy             | 0x7e70De6D1877B3711b2bEDa7BA00013C7142d993 |

## Permission owners

## Permissions

**TODO**: missing proxy permissions? or none?
| Lido | runScript | ... | ['isInitialized', 'protectState'] |
| Lido | initialized | ... | ['onlyInit'] |
| Lido | initializedAt | ... | ['onlyInit'] |
| Lido | petrify | ... | ['onlyInit'] |
| Lido | initialize | ... | ['onlyInit'] |
| Lido | receiveELRewards | ... | [] |
| Lido | receiveWithdrawals | ... | [] |
| Lido | deposit | ... | [] |
| Lido | \_auth | ... | [] |
| Lido | \_handleOracleReport | ... | [] |

| Contract                               | Function                                               | Impact | Owner                        |
| -------------------------------------- | ------------------------------------------------------ | ------ | ---------------------------- |
| LidoLocator (Proxy)                    | proxy\_\_ossify                                        | ...    | ['onlyAdmin']                |
| LidoLocator (Proxy)                    | proxy\_\_changeAdmin                                   | ...    | ['onlyAdmin']                |
| LidoLocator (Proxy)                    | proxy\_\_upgradeTo                                     | ...    | ['onlyAdmin']                |
| LidoLocator (Proxy)                    | proxy\_\_upgradeToAndCall                              | ...    | ['onlyAdmin']                |
| StakingRouter (Proxy)                  | proxy\_\_ossify                                        | ...    | ['onlyAdmin']                |
| StakingRouter (Proxy)                  | proxy\_\_changeAdmin                                   | ...    | ['onlyAdmin']                |
| StakingRouter (Proxy)                  | proxy\_\_upgradeTo                                     | ...    | ['onlyAdmin']                |
| StakingRouter (Proxy)                  | proxy\_\_upgradeToAndCall                              | ...    | ['onlyAdmin']                |
| StakingRouter (Implementation)         | grantRole                                              | ...    | ['getRoleAdmin', 'onlyRole'] |
| StakingRouter (Implementation)         | revokeRole                                             | ...    | ['getRoleAdmin', 'onlyRole'] |
| StakingRouter (Implementation)         | addStakingModule                                       | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | updateStakingModule                                    | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | updateTargetValidatorsLimits                           | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | updateRefundedValidatorsCount                          | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | reportRewardsMinted                                    | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | updateExitedValidatorsCountByStakingModule             | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | reportStakingModuleExitedValidatorsCountByNodeOperator | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | unsafeSetExitedValidatorsCount                         | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | reportStakingModuleStuckValidatorsCountByNodeOperator  | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | onValidatorsCountsByNodeOperatorReportingFinished      | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | decreaseStakingModuleVettedKeysCountByNodeOperator     | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | setStakingModuleStatus                                 | ...    | ['onlyRole']                 |
| StakingRouter (Implementation)         | deposit                                                | ...    | []                           |
| StakingRouter (Implementation)         | setWithdrawalCredentials                               | ...    | ['onlyRole']                 |
| DepositSecurityModule                  | setOwner                                               | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | setPauseIntentValidityPeriodBlocks                     | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | setMaxOperatorsPerUnvetting                            | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | setGuardianQuorum                                      | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | addGuardian                                            | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | addGuardians                                           | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | removeGuardian                                         | ...    | ['onlyOwner']                |
| DepositSecurityModule                  | unpauseDeposits                                        | ...    | ['onlyOwner']                |
| LidoExecutionLayerRewardsVault         | withdrawRewards                                        | ...    | []                           |
| WithdrawalQueueERC721 (Proxy)          | proxy\_\_ossify                                        | ...    | ['onlyAdmin']                |
| WithdrawalQueueERC721 (Proxy)          | proxy\_\_changeAdmin                                   | ...    | ['onlyAdmin']                |
| WithdrawalQueueERC721 (Proxy)          | proxy\_\_upgradeTo                                     | ...    | ['onlyAdmin']                |
| WithdrawalQueueERC721 (Proxy)          | proxy\_\_upgradeToAndCall                              | ...    | ['onlyAdmin']                |
| WithdrawalQueueERC721 (Implementation) | pauseFor                                               | ...    | ['onlyRole']                 |
| WithdrawalQueueERC721 (Implementation) | pauseUntil                                             | ...    | ['onlyRole']                 |
| WithdrawalQueueERC721 (Implementation) | \_claim                                                | ...    | []                           |
| WithdrawalQueueERC721 (Implementation) | grantRole                                              | ...    | ['getRoleAdmin', 'onlyRole'] |
| WithdrawalQueueERC721 (Implementation) | revokeRole                                             | ...    | ['getRoleAdmin', 'onlyRole'] |
| WithdrawalQueueERC721 (Implementation) | setBaseURI                                             | ...    | ['onlyRole']                 |
| WithdrawalQueueERC721 (Implementation) | setNFTDescriptorAddress                                | ...    | ['onlyRole']                 |
| WithdrawalQueueERC721 (Implementation) | approve                                                | ...    | []                           |
| WithdrawalsManagerProxy                | proxy_upgradeTo                                        | ...    | []                           |
| WithdrawalsManagerProxy                | proxy_changeAdmin                                      | ...    | []                           |
| WithdrawalVault                        | withdrawWithdrawals                                    | ...    | []                           |
| Burner                                 | grantRole                                              | ...    | ['getRoleAdmin', 'onlyRole'] |
| Burner                                 | revokeRole                                             | ...    | ['getRoleAdmin', 'onlyRole'] |
| Burner                                 | requestBurnMyStETHForCover                             | ...    | ['onlyRole']                 |
| Burner                                 | requestBurnSharesForCover                              | ...    | ['onlyRole']                 |
| Burner                                 | requestBurnMyStETH                                     | ...    | ['onlyRole']                 |
| Burner                                 | requestBurnShares                                      | ...    | ['onlyRole']                 |
| Burner                                 | commitSharesToBurn                                     | ...    | []                           |

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
