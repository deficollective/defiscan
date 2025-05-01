---
protocol: "Lido V2"
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

# Ratings

## Chain

Lido is currently deployed on Ethereum, Solana, and Polygon. This review focuses on the
Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability

> Upgradeability score: Low/Medium/High

## Autonomy

Uses Chainlink Price Feeds. Why? Fallbacks?

OracleReports for beacon chain stats.

> Autonomy score: Low/Medium/High

## Exit Window

See http://defiscan.info/learn-more#exit-window for more guidance.

> Exit Window score: Low/Medium/High

## Accessibility

Lido has a main frontend at [stake.lido.fi](https://stake.lido.fi). This UI is released on IPFS and there are
instructions in the [docs](https://docs.lido.fi/ipfs/about) to access the latest release using any IPFS gateway of choice.

In addition to that, it offers an extended list of [UI integration elements](https://ui.lido.fi/) to help others integrate interaction with the Lido contracts. Several third-party applications or wallets, such as Metamask, Argent, and Infinex use this integration to enable direct interaction with Lido. Those apps, in addition to IPFS, represent an acceptable backup solution to access the protocol.

> Accessibility score: Low

# Informational

# Protocol Analysis

StakingRouter: registry of staking modules. allocates stake to modules. distribute protocol fees
Modules can be ative, paused (no more deposits, but rewards), stopped (no deposits, no rewards).

Bots and Guardians are involved in the making a deposit. DepositContract

There is a strategy (MinFirstAllocationStrategy) that chooses to which validator to distribute the stake too.

Fee is in two parts: module fee, treasury fee, in %

Staking module: contract that manages its own subset of validators.

## Liquid Staking

## Staking Modules

# Dependencies

# Governance

The `Aragon Kernel` is the core contract in the Aragon framework, serving as the foundation for decentralized organizations (DAOs). It acts as both a registry for applications and the central permissions management system.

The `Aragon TokenManager` is an Aragon application that manages the `LDO` governance token, providing functionality for token distribution, vesting, and control.

The Finance contract is part of the Aragon OS ecosystem and serves as a financial controller for DAOs, including Lido. It manages:Treasury funds through a Vault. Period-based accounting. Scheduled and immediate payments. Budget controls for different tokens. Transaction recording and reporting

## External Permission Owners and Security Council

## Exit Window

# Contracts & Permissions

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
| MiniMeToken                            | 0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32 |
| InsuranceFund                          | 0x8B3f33234ABD88493c0Cd28De33D583B70beDe35 |

- all the others below
  | OssifiableProxy | 0x0De4Ea0184c2ad0BacA7183356Aea5B8d5Bf5c6e |
  | ValidatorsExitBusOracle | ... |
  | HashConsensus | 0xD624B08C83bAECF0807Dd2c6880C3154a5F0B288 |

To SCAN:
Aragon Agent: 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c (proxy)(impl name = Agent)
Aragon Voting 0x2e59A20f205bB85a89C53f1936454680651E618e

HashConsensus 0xD624B08C83bAECF0807Dd2c6880C3154a5F0B288
HashConsensus FOR THE EXIT BUS: 0x7FaDB6358950c5fAA66Cb5EB8eE5147De3df355a
ValidatorsExitBus (proxy OssifiableProxy name ValidatorsExitBusOracle) 0x0De4Ea0184c2ad0BacA7183356Aea5B8d5Bf5c6e
AccountingOracle 0x852deD011285fe67063a08005c71a85690503Cee (proxy) (impl name AccountingOracle)

To check: The legacy oracle, + its Repo contract listed in governance, is it still in use?

{
"name": "GateSeal",
"address": "0xEe06EA501f7d9DC6F4200385A8D910182D155d3e"
},
{
"name": "GateSeal Factory",
"address": "0x6c82877cac5a7a739f16ca0a89c0a328b8764a24"
},
{
"name": "GateSeal",
"address": "0xf9C9fDB4A5D2AA1D836D5370AB9b28BC1847e178"
}
The Last GateSeal was deployed 55 days ago, why is it used?

All the Repo and Registry contracts have same logic but different proxy state. To differentiate / explain

## Permission owners

0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c admin of LidoLocator

0x8772E3a2D86B9347A2688f9bc1808A6d8917760C Gate Seal Committee (via 0x1ad5cb2955940f998081c1ef5f5f00875431aa90) (_expired_)

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

| Contract                       | Function                                               | Impact                                                                                                                                                                                                                                                                                                                                        | Owner                             |
| ------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| LidoLocator (Proxy)            | proxy\_\_ossify                                        | Ossifies the proxy. This freezes the current implementation of the `LidoLocator` and effectively makes it non-upagreable by changing the proxy admin to the zero address.                                                                                                                                                                     | Aragon Agent                      |
| LidoLocator (Proxy)            | proxy\_\_changeAdmin                                   | Changes the proxy admin. The admin can update the entire implementation and logic of the `LidoLocator`.                                                                                                                                                                                                                                       | Aragon Agent                      |
| LidoLocator (Proxy)            | proxy\_\_upgradeTo                                     | Upgrades the implementation of the `LidoLocator` This can change the entire logic of the contract including change ownership of funds locked in the contract, if any.                                                                                                                                                                         | Aragon Agent                      |
| LidoLocator (Proxy)            | proxy\_\_upgradeToAndCall                              | Upgrades the implementation of the `LidoLocator` (similarly to _proxy\_\_upgradeTo _), and then calls a function in the new contract.                                                                                                                                                                                                         | Aragon Agent                      |
| StakingRouter (Proxy)          | proxy\_\_ossify                                        | Ossifies the proxy. This freezes the current implementation of the `StakingRouter` and effectively makes it non-upagreable by changing the proxy admin to the zero address.                                                                                                                                                                   | Aragon Agent                      |
| StakingRouter (Proxy)          | proxy\_\_changeAdmin                                   | Changes the proxy admin. The admin can update the entire implementation and logic of the `StakingRouter`.                                                                                                                                                                                                                                     | Aragon Agent                      |
| StakingRouter (Proxy)          | proxy\_\_upgradeTo                                     | Upgrades the implementation of the `StakingRouter` This can change the entire logic of the contract including change ownership of funds locked in the contract, if any.                                                                                                                                                                       | Aragon Agent                      |
| StakingRouter (Proxy)          | proxy\_\_upgradeToAndCall                              | Upgrades the implementation of the `StakingRouter` (similarly to _proxy\_\_upgradeTo _), and then calls a function in the new contract.                                                                                                                                                                                                       | Aragon Agent                      |
| StakingRouter (Implementation) | grantRole                                              | ...                                                                                                                                                                                                                                                                                                                                           | ['getRoleAdmin', 'onlyRole']      |
| StakingRouter (Implementation) | revokeRole                                             | ...                                                                                                                                                                                                                                                                                                                                           | ['getRoleAdmin', 'onlyRole']      |
| StakingRouter (Implementation) | addStakingModule                                       | Registers a staking module specifying a name, contract, fee settings, and limits on the shares and validators. The new module can receive ETH deposits. **TODO**: more detail                                                                                                                                                                 | Aragon Agent                      |
| StakingRouter (Implementation) | updateStakingModule                                    | Updates the settings of an existing Staking Module. This can change the fees or the limits set on deposits and staking shares.                                                                                                                                                                                                                | Aragon Agent                      |
| StakingRouter (Implementation) | updateTargetValidatorsLimits                           | Adjusts the maximum number of validators a specific node operator within a staking module can manage. This influences risk distribution within the protocol.                                                                                                                                                                                  | Aragon Agent                      |
| StakingRouter (Implementation) | updateRefundedValidatorsCount                          | Updates the count of validators that have been refunded for a specific node operator.                                                                                                                                                                                                                                                         | Aragon Agent                      |
| StakingRouter (Implementation) | reportRewardsMinted                                    | Reports rewards that have been minted and notifies each module of the rewards they received by calling a dedicated function in the respective module's contract.                                                                                                                                                                              | Lido (Proxy)                      |
| StakingRouter (Implementation) | updateExitedValidatorsCountByStakingModule             | ...                                                                                                                                                                                                                                                                                                                                           | AccountingOracle                  |
| StakingRouter (Implementation) | reportStakingModuleExitedValidatorsCountByNodeOperator | ...                                                                                                                                                                                                                                                                                                                                           | AccountingOracle                  |
| StakingRouter (Implementation) | unsafeSetExitedValidatorsCount                         | ...                                                                                                                                                                                                                                                                                                                                           | AccountingOracle                  |
| StakingRouter (Implementation) | reportStakingModuleStuckValidatorsCountByNodeOperator  | ...                                                                                                                                                                                                                                                                                                                                           | AccountingOracle                  |
| StakingRouter (Implementation) | onValidatorsCountsByNodeOperatorReportingFinished      | ...                                                                                                                                                                                                                                                                                                                                           | AccountingOracle                  |
| StakingRouter (Implementation) | decreaseStakingModuleVettedKeysCountByNodeOperator     | Reduces the number of validators a specific node operator can run. This doesn't affect existing validators but may prevent the node operators to create new validators if it has reached the new limit count.                                                                                                                                 | DepositSecurityModule             |
| StakingRouter (Implementation) | setStakingModuleStatus                                 | Changes the status of a staking module. Modules may be Active, Paused, or Stopped. When Paused no more deposits can be added but the rewards are still distributed. If stopped no more deposits can be added and the rewards go to the protocol treasury instead.                                                                             | Aragon Agent                      |
| StakingRouter (Implementation) | deposit                                                | ...                                                                                                                                                                                                                                                                                                                                           | Lido (Proxy)                      |
| StakingRouter (Implementation) | setWithdrawalCredentials                               | Sets the withdraw credentials of each module. The credentials are used to withdraw ETH on the Consensus Layer side. No address currently has the permission to change those credentials.                                                                                                                                                      | 0x0                               |
| DepositSecurityModule          | setOwner                                               | Sets the owner of the contract. This role is dedicated to the DAO. The owner can add new guardians, change the quorum, and unpause the deposits.                                                                                                                                                                                              | Aragon Agent                      |
| DepositSecurityModule          | setPauseIntentValidityPeriodBlocks                     | Sets the window of validity of a pause intent. This is the reaction time allowed for guardians to pause deposits. When a guardian wants to pause deposits it specifies a block number, the pause is only applied if the current block number is within the validity period of the specified block. This is to avoid replay of pause messages. | Aragon Agent                      |
| DepositSecurityModule          | pauseDeposits                                          | Pauses the deposits. Funds can no longer be deposited into new validators until deposits are unpaused. This can be called by any guardian when a frontrunning by a node operator is suspected and prevents the loss of user funds through deposits.                                                                                           | DepositSecurityModule (Guardian)  |
| DepositSecurityModule          | unvetSigningKeys                                       | Unvets signing keys for the given node operators. This can be called by any guardian when a frontrunning by a node operator is suspectedand prevents the loss of user funds through deposits.                                                                                                                                                 | DepositSecurityModule (Guardian)  |
| DepositSecurityModule          | depositsBufferedETH                                    | Deposits ETH into a given validator using `Lido.deposit`. The message must include at least 4/6 signatures from guardians for it to be valid.                                                                                                                                                                                                 | DepositSecurityModule (Guardians) |
| DepositSecurityModule          | setMaxOperatorsPerUnvetting                            | Sets a limit on how many node operators can have their vetted signing keys unvetted in one transaction, as a safeguard against drastic changes.                                                                                                                                                                                               | Aragon Agent                      |
| DepositSecurityModule          | setGuardianQuorum                                      | Sets the quorum value. This is the minimum number of guardians that need to take part in a deposit for it to be valid.                                                                                                                                                                                                                        | Aragon Agent                      |
| DepositSecurityModule          | addGuardian                                            | Adds a guardian and sets a new custom quorum value. Guardians co-sign deposits to reduce the risk of collusion with node operators.                                                                                                                                                                                                           | Aragon Agent                      |
| DepositSecurityModule          | addGuardians                                           | Adds multiple guardians and sets a new custom quorum value. Guardians co-sign deposits to reduce the risk of collusion with node operators.                                                                                                                                                                                                   | Aragon Agent                      |
| DepositSecurityModule          | removeGuardian                                         | Removes a guardian and                                                                                                                                                                                                                                                                                                                        | Aragon Agent                      |
| DepositSecurityModule          | unpauseDeposits                                        | unpauses the deposits without delay.                                                                                                                                                                                                                                                                                                          | Aragon Agent                      |

| AccountingOracle (Proxy) | proxy\_\_ossify | Ossifies the proxy. This freezes the current implementation of the `AccountingOracle` and effectively makes it non-upagreable by changing the proxy admin to the zero address. | Aragon Agent |
| AccountingOracle (Proxy) | proxy\_\_changeAdmin | Changes the proxy admin. The admin can update the entire implementation and logic of the `AccountingOracle`. | Aragon Agent |
| AccountingOracle (Proxy) | proxy\_\_upgradeTo | Upgrades the implementation of the `AccountingOracle` This can change the entire logic of the contract including change ownership of funds locked in the contract, if any. | Aragon Agent |
| AccountingOracle (Proxy) | proxy\_\_upgradeToAndCall | Upgrades the implementation of the `AccountingOracle` (similarly to _proxy\_\_upgradeTo _), and then calls a function in the new contract. | Aragon Agent |

| AccountingOracle (Implementation) | submitReportData | Submits a report for a given reference slot on the beacon chain. This report includes information on the number of Lido validators on the consensus layer, their cumulative balance, exited validators, balance of the rewards and withdrawal vaults, and the simulated share rate (total ether / all shares emitted). This information is then processed and transmitted to other Lido contracts. It will influence how shares are rebased and whether validators will be exited/created in future slots. The report of wrong data could therefore lead to the loss of unclaimed yield or loss of user funds. | HashConsensus (Committee Members) |
| AccountingOracle (Implementation) | submitReportExtraDataEmpty | Informs that no extra data is submitted for the given slot. | HashConsensus (Committee Members) |
| AccountingOracle (Implementation) | submitReportExtraDataList | Submits extra data for a slot. This allows the consensus committee to compute the extra data asynchronously and report it later than the main report data. If the deadline has passed or the next report has started then no more extra data can be added for a slot. | HashConsensus (Committee Members) |
| AccountingOracle (Implementation) | submitConsensusReport | Pushes the hash of the report built by the consensus committee. This ensures that the data reported and processed matches the consensus. | HashConsensus |
| AccountingOracle (Implementation) | discardConsensusReport | Discards the report for the current slot. This can only be called when (all conditions met): a consensus was pushed, the processing hasn't started, the deadline is not expired, and there is no consensus to replace the current one. This may happen if a member changers their report, is moved from the set, or the quorum value gets increased. | HashConsensus |
| AccountingOracle (Implementation) | setConsensusContract | Sets the consensus contract to use. The consensus contract is currently `HashConsensus`, it can decide who is a committee member and push the consensus proof to the `AccountingOracle`. | Aragon Agent |
| AccountingOracle (Implementation) | setConsensusVersion | Sets the current consensus version used. The version refers to a set of rules that the members must agree on when building the report. | Aragon Agent |
| AccountingOracle (Implementation) | grantRole | Grants a role within the contract to a specific address. There are roles to allow the management of the consensus contract or the right to submit data. None of these role are currently in use. | Aragon Agent |
| AccountingOracle (Implementation) | revokeRole | Revokes a role for a specific address. | Aragon Agent |

| HashConsensus | submitReport | Used by oracle members to submit hash of the data calculated for the given reference slot. If consensus is reached (more submissions of the same report than the quorum amount) the `HashConsensus` contract submits this report to the processing contract (either `AccountingOracle` or `ValidatorsExitBusOracle`) to enable processing. | HashConsensus (Committee Members) |
| HashConsensus | disableConsensus | Temporarily disables consensus by increasing the quorum value an unreachable number. This prevents any consensus from being reached. Consensus needs to be re-enabled using `setQuorum`. | DISABLE_CONSENSUS_ROLE |
| HashConsensus | addMember | Adds a member to the consensus committee. Members can contribute to building consensus and submit reports. | MANAGE_MEMBERS_AND_QUORUM_ROLE, (DISABLE_CONSENSUS_ROLE if consensus is disabled) |
| HashConsensus | removeMember | Removes a member from the consensus committee. | MANAGE_MEMBERS_AND_QUORUM_ROLE, (DISABLE_CONSENSUS_ROLE if consensus is disabled) |
| HashConsensus | setQuorum | Sets the quorum value. This is the amount of equal reports that need to be accumulated for each slot for a report to be considered valid and ready for processing. A value higher the the number of members in the committee would make consensus impossible. | MANAGE_MEMBERS_AND_QUORUM_ROLE, DISABLE_CONSENSUS_ROLE (only allowed to set unreachable quorum) |
| HashConsensus | updateInitialEpoch | Changes when to oracle reporting system starts, given it hasn't started yet. This function can no longer becalled. | 0x0 |
| HashConsensus | setFastLaneLengthSlots | Sets the duration of a fast lane rotation in slots. Members in the fast lane can (and are expected to) submit their report during a dedicated fast lane time window before submissions are open to all other members. The members in the fast lanes are rotated at a rate set using this function. The goal is to enforce active participation of all oracle members, preventing lazy copying. | MANAGE_FAST_LANE_CONFIG_ROLE |
| HashConsensus | setFrameConfig | Sets the configuration of frames. Frames are time window of equal lenghts referencing the processing of a slot and the corresponding deadline. A report based on the consensus layer must be built and consensus must be reached before each deadline. | MANAGE_FRAME_CONFIG_ROLE |
| HashConsensus | setReportProcessor | Sets the processor contract to which the reports are sent over to. There are two `HashConsensus` contracts in use, one that uses the `AccountingOracle` and one that uses `ValidatorsExitBusOracle` as processor. | MANAGE_REPORT_PROCESSOR_ROLE |
| HashConsensus | grantRole | Grants a role within the contract to a specific address. This may allow addresses to execute any of the functions above related to the specific role. | DEFAULT_ADMIN |
| HashConsensus | revokeRole | Revokes a role for a specific address.| DEFAULT_ADMIN |

| ValidatorsExitBusOracle (Proxy) | proxy\_\_ossify | Ossifies the proxy. This freezes the current implementation of the `ValidatorsExitBusOracle` and effectively makes it non-upagreable by changing the proxy admin to the zero address. | Aragon Agent |
| ValidatorsExitBusOracle (Proxy) | proxy\_\_changeAdmin | Changes the proxy admin. The admin can update the entire implementation and logic of the `ValidatorsExitBusOracle`. | Aragon Agent |
| ValidatorsExitBusOracle (Proxy) | proxy\_\_upgradeTo | Upgrades the implementation of the `ValidatorsExitBusOracle` This can change the entire logic of the contract including change ownership of funds locked in the contract, if any. | Aragon Agent |
| ValidatorsExitBusOracle (Proxy) | proxy\_\_upgradeToAndCall | Upgrades the implementation of the `ValidatorsExitBusOracle` (similarly to proxy\_\_upgradeTo \_), and then calls a function in the new contract. | Aragon Agent |
| ValidatorsExitBusOracle (Implementation) | resume | Resumes the contract if it was paused. | Aragon Agent |
| ValidatorsExitBusOracle (Implementation) | pauseFor | Pauses the validator exit request processing for a specified duration. | GateSeal Committee (expired) |
| ValidatorsExitBusOracle (Implementation) | pauseUntil | Pauses the validator exit request processing until a specific timestamp. | GateSeal Committee (expired) |
| ValidatorsExitBusOracle (Implementation) | submitReportData | Submits report data containing validator exit requests for processing. | HashConsensus (Committee Members) |

| ValidatorsExitBusOracle (Implementation) | submitConsensusReport | Pushes the hash of the exit report built by the consensus committee. This ensures that the data reported and processed matches the consensus. | HashConsensus |
| ValidatorsExitBusOracle (Implementation) | discardConsensusReport | Discards the validator exit report for the current slot. This can only be called when (all conditions met): a consensus was pushed, the processing hasn't started, the deadline is not expired, and there is no consensus to replace the current one. This may happen if a member changers their report, is moved from the set, or the quorum value gets increased. | HashConsensus |
| ValidatorsExitBusOracle (Implementation) | setConsensusContract | Sets the consensus contract to use. The consensus contract is currently `HashConsensus`, it can decide who is a committee member and push the consensus proof to the `ValidatorsExitBusOracle`. | Aragon Agent |
| ValidatorsExitBusOracle (Implementation) | setConsensusVersion | Sets the current consensus version used. The version refers to a set of rules that the members must agree on when building the report. | Aragon Agent |
| ValidatorsExitBusOracle (Implementation) | grantRole | Grants a role within the contract to a specific address. The Pause role allows the role owners to pause the exit request processing. There are roles to allow the management of the consensus contract or the right to submit data. These role are currently not in use. | Aragon Agent |
| ValidatorsExitBusOracle (Implementation) | revokeRole | Revokes a role for a specific address. | Aragon Agent |

| WithdrawalVault (Proxy) | proxy_upgradeTo | Upgrades the implementation of the `WithdrawalVault` This can change the entire logic of the contract including change ownership of funds locked in the contract, if any. | Aragon Voting |
| WithdrawalVault (Proxy) | proxy_changeAdmin | Changes the proxy admin. The admin can update the entire implementation and logic of the `WithdrawalVault`. | Aragon Voting |
| WithdrawalVault (Implementation) | withdrawWithdrawals | Transfer the amount of accumulated withdrawals (from validators) to the Lido contract. | Lido (contract) |
| LidoExecutionLayerRewardsVault | withdrawRewards | Move all accumulated Execution Layer rewards (MEV, tx priority) to the Lido contract. Can only be called by the Lido contract. | Lido (contract) |

| WithdrawalQueueERC721 (Proxy) | proxy\_\_ossify | Ossifies the proxy. This freezes the current implementation of the `WithdrawalQueueERC721` and effectively makes it non-upagreable by changing the proxy admin to the zero address. | Aragon Agent |
| WithdrawalQueueERC721 (Proxy) | proxy\_\_changeAdmin | Changes the proxy admin. The admin can update the entire implementation and logic of the `WithdrawalQueueERC721`. | Aragon Agent |
| WithdrawalQueueERC721 (Proxy) | proxy\_\_upgradeTo | Upgrades the implementation of the `WithdrawalQueueERC721` This can change the entire logic of the contract including change ownership of funds locked in the contract, if any. | Aragon Agent |
| WithdrawalQueueERC721 (Proxy) | proxy\_\_upgradeToAndCall | Upgrades the implementation of the `WithdrawalQueueERC721` (similarly to _proxy\_\_upgradeTo _), and then calls a function in the new contract. | Aragon Agent |
| WithdrawalQueueERC721 (Implementation) | finalize | Finalizes a batch of withdrawal requests, allowing the corresponding ETH to be claimed by users. This is meant to be called by the Lido contract once the corresponding ETH has been unlocked from the Withdrawal vault. | Lido (contract), Aragon Agent|
| WithdrawalQueueERC721 (Implementation) | pauseFor | Pause withdrawal requests placement and finalization for particular \_duration. Claiming finalized requests will still be available. The current multisig with this permission is expired and can no longer execute this function. | Seal Committee (expired), Aragon Agent |
| WithdrawalQueueERC721 (Implementation) | pauseUntil | Pause withdrawal requests placement and finalization until a given timestamp. Claiming finalized requests will still be available. The current multisig with this permission is expired and can no longer execute this function. | Seal Committee (expired), Aragon Agent |
| WithdrawalQueueERC721 (Implementation) | resume | Resumes withdrawal requests placement and finalization. | Seal Committee (expired), Aragon Agent |
| WithdrawalQueueERC721 (Implementation) | setBaseURI | Sets the unstETH NFT token URI. This is the URI used to display information about the NFT. the unstETH NFT is used to issue withdrawal requests and allows users to claim their ETH once the request is finalized. | Aragon Agent |
| WithdrawalQueueERC721 (Implementation) | setNFTDescriptorAddress | Sets the address of a sperarate contract that will be repsonsible for generating a complete token URI (see `setBaseURI`). This offers more flexibility than the base URI approach. | Aragon Agent|
| WithdrawalQueueERC721 (Implementation) | grantRole | Grants a role within the contract to a specific address. There are role to pause the contract, set URIs, and finalize withdrawals. The finalization role should only be granted to the Lido contract, as it could put user funds at risk if called maliciously. | ['getRoleAdmin', 'onlyRole'] |
| WithdrawalQueueERC721 (Implementation) | revokeRole | Revokes a role given to a specific address. | ['getRoleAdmin', 'onlyRole'] |

| Burner | requestBurnMyStETHForCover | Tranfers stETH from the sender and irreversibly locks it on the burner contract. This increases the cover-backed burning counter. A share burn meant to _cover_ is to compensate a slashing event. | Aragon Agent|
| Burner | requestBurnSharesForCover | Transfers stETH shares from another user (who should have approved) and locks it on the burner contract. This increases the cover-backed burning counter. A share burn meant to _cover_ is to compensate a slashing event. | Role REQUEST_BURN_SHARES_ROLE |
| Burner | requestBurnMyStETH | Tranfers stETH from the sender and irreversibly locks it on the burner contract. This increases the non-cover backed burning counter. | Aragon Agent |
| Burner | requestBurnShares | Transfers stETH shares from another user (who should have approved) and locks it on the burner contract. This increases the non-cover backed burning counter. | REQUEST_BURN_SHARES_ROLE|
| Burner | commitSharesToBurn | Marks previously requested to burn cover and non-cover shares as burnt. This function is meant to be called by the `Lido` contract in the same tx as the share burning it actually done.| Lido (contract) (stETH) |
| Burner | grantRole | Grants a role within the contract to a specific address. There are roles to allow burning stETH either from a delegated address or from the caller itself. Only the Governance is currently allowed to burn its own stETH. | Aragon Agent |
| Burner | revokeRole | Revokes a role to a specific address. | Aragon Agent |

| MiniMeToken (LDO Token) | changeController | ... | ['onlyController'] |
| MiniMeToken (LDO Token) | transferFrom | ... | [] |
| MiniMeToken (LDO Token) | approve | ... | [] |
| MiniMeToken (LDO Token) | generateTokens | ... | ['onlyController'] |
| MiniMeToken (LDO Token) | destroyTokens | ... | ['onlyController'] |
| MiniMeToken (LDO Token) | enableTransfers | ... | ['onlyController'] |
| MiniMeToken (LDO Token) | fallback | ... | [] |
| MiniMeToken (LDO Token) | claimTokens | ... | ['onlyController'] |

| Kernel | setApp | Sets the implementation contract (code logic) that corresponds to a given namespace and app ID in the registry. All proxies in this namespace with this AppID will now point to this new implementation. | ['arr', 'auth'] |
| Kernel | newAppInstance | Creates a new upgradeable application instance by deploying the proxy. The instance has an app ID and will use the implementation contract (code logic) currently associated with this ID. | ['arr', 'auth'] |
| Kernel | newPinnedAppInstance | Creates a new non-upgradeable (pinned) application instance. The instance has an app ID and will use the implementation contract (code logic) associated with this ID. | ['arr', 'auth'] |
| Kernel | setRecoveryVaultAppId | Sets the recovery vault. A contract to recover assets if neeeded. The current vault is the Aragon Agent contract. | ['arr', 'auth'] |

| ACL | runScript | ... | ['isInitialized', 'protectState'] |
| ACL | createPermission | Creates a new permission and specifies its permission manager and the role ID. | ['auth', 'noPermissionManager'] |
| ACL | grantPermission | Grants a permission (a role) to an entity. The entity can then perform all the actions associated with the role. Optionally the manager can specify parameters associated with the permission that could grant additional permisisons specifically for those parameters. | ['onlyPermissionManager'] |
| ACL | revokePermission | Revokes a permission from an entity. | ['onlyPermissionManager'] |
| ACL | setPermissionManager | Sets a permission (role)'s manaer. The manager can grant and revoke the permissions for that role ID. | ['onlyPermissionManager'] |
| ACL | removePermissionManager | Removes the permission manager for a role and sets it to the zero address. This role can no longer be granted or revoked, but a new manager can still be named using the `createPermission` function. | ['onlyPermissionManager'] |
| ACL | burnPermissionManager | Permanently locks a permission so it can never be modified. This is done by changing the manager to a `BURN_ENTITY`. | ['onlyPermissionManager'] |
| ACL | createBurnedPermission | Permanently locks a permission so it can never be modified. This variant is called when the manager of the role was already the zero address.| ['auth', 'noPermissionManager'] |

| Voting | changeSupportRequiredPct | Changes the required percentage of "yes" votes for a proposal to pass. The number has to be greater or equal than the quorum and less than 100%. | ['arr', 'authP'] |
| Voting | changeMinAcceptQuorumPct | Changes the minimum quorum required for a proposal to pass. This is the percentage of "yes" votes in regard to the total voting power. The new value has to be less or equal than the support percentage. | ['arr', 'authP'] |
| Voting | unsafelyChangeVoteTime | Changes the total duration of voting. This affects all existing unexecuted votes. The new value has to be greater than the objection time and will effectively change the main voting period. The main voting period is the time before objection during which users can vote "yes" or "no" for proposals. If the new time is smaller than the passed time on existing proposals this would fast forward the proposals to the objection or closed phase. | ['auth'] |
| Voting | unsafelyChangeObjectionPhaseTime | Changes the duration of the objection phase. This affects all existing unexecuted votes and could be used to remove, fast forward, or exten the objection phase on existing and future proposals. The new value has to be less than the total vote time. | ['auth'] |
| Voting | newVote | Creates a proposal with an associated execution script and description metadata. If the proposal is accepted the script will be executed and could perform any action that the Voting contract is allowed to do. | ['auth'] |
| Voting | forward | Similar to `newVote` but without any description metadata. This is meant to be called as a result of other governance processes or smart contracts. | checks permissions by kernerl |

| Agent | transfer | Transfers a given ERC20 token out of the contract to a given address. | ['arr', 'authP'] |
| Agent | forward | Executes a script as the Agent. This is meant to be called by the Voting contract to execute proposals through the Agent. | [] |
| Agent | execute | Executes arbitrary function calls to any external contract with a given ETH value. This can perform any action that is allowed to the Aragon Agent in other Lido contracts, which includes critical ones. | ['_getSig', 'arr', 'authP'] |
| Agent | safeExecute | Similar to `execute` but with protections for known critical tokens. It ensures there are no direct calls to the protected tokens, the token balances don't decrease, and the list of protected tokens doesn't change. | ['_getSig', 'arr', 'authP'] |
| Agent | addProtectedToken | Adds a token to the protected list (maximum of 10 tokens). Those tokens are safeguarded when proposals are executed using `safeExecute`. | ['arr', 'authP'] |
| Agent | removeProtectedToken | Removes a token from the protected list. | ['arr', 'authP'] |
| Agent | presignHash | Pre-approves a hash according to ERC-1271. It allows the governance to approve a hash so that it is considered valid once verified. This allows the approval of a message without requiring the contract to actually sign it. | ['arr', 'authP'] |
| Agent | setDesignatedSigner | Adds a designated signer. The external address can sign messages on behalf of the Agent according to ERC-1271. | ['arr', 'authP'] |

| TokenManager | runScript | ... | ['isInitialized', 'protectState'] |
| TokenManager | mint | Mints a given amount of `LDO` token to a specified address. | ['arr', 'authP'] |
| TokenManager | issue | Mints a given amount of `LDO` token to the `TokenManager`. This is used to create a treasury of tokens that can later be assigned. | ['arr', 'authP'] |
| TokenManager | assign | Assigns a given amount of `LDO` tokens to a recipient. The tokens are directly taken out of the `TokenManager` and transferred to the recipient. | ['arr', 'authP'] |
| TokenManager | assignVested | ASsigns a given of `LDO` tokens to a recipient with a specific vesting plan. The full amount is transferred to the address but the `LDO` token is trusted to call the `TokenManager` upon each transfer and enforce the vesting plan. The plan can optionally contain a revokable flag which allows the manager to cancel the remaining locked tokens in a plan at any time before the plan expires. | ['arr', 'authP'] |
| TokenManager | burn | Burns the given amount of `LDO` tokens of any given address. This allows this contract to burn any user's `LDO` tokens. | ['arr', 'authP'] |
| TokenManager | revokeVesting | Revokes a user's vesting plan. This will cancel all the tokens that are still locked. | ['arr', 'authP', 'vestingExists'] |
| TokenManager | forward | Runs an Aragon EVM script on behalf of a token holder. The token holder needs to have permission and the contract uses a blakclist to prevent the holder from executing actions on behalf of the `TokenManager`. | [] |

| Finance | runScript | ... | ['isInitialized', 'protectState'] |
| Finance | newImmediatePayment | Makes a new instant payment of a given amount of tokens to a receiver. The tokens are taken out of the vault. The current vault is the `AragonAgent` | ['_arr', 'authP', 'getTimestamp', 'transitionsPeriod'] |
| Finance | newScheduledPayment | Creates a new recurring payment. Recurring payments have a starting date, an intervale at which they can be executed, and a total amount of executions. The intervals are fixed and in reference to the starting timestamp, the payment can be manually executed once per interval. It may also be executed late. | ['_arr', 'authP', 'transitionsPeriod'] |
| Finance | setPeriodDuration | Sets the accounting period duration. The period is used for accounting and budget restrictions. The new duration will be effective from the next period. | ['arr', 'authP', 'transitionsPeriod'] |
| Finance | setBudget | Sets the spending budget of a given token for per accounting period. This budget is enforced for each payment and resets at the end of the accounting period. | ['arr', 'authP', 'transitionsPeriod'] |
| Finance | removeBudget | Removes the budget for a token and enables unlimited spending. | ['arr', 'authP', 'transitionsPeriod'] |
| Finance | executePayment | Executes a schedule payment as many times as possible according to the current timestamp and payment limit. | ['arr', 'authP', 'scheduledPaymentExists', 'transitionsPeriod'] |
| Finance | receiverExecutePayment | Similar to `executePayment`but can be called by the payment's receiver. | ['scheduledPaymentExists', 'transitionsPeriod'] |
| Finance | setPaymentStatus | Sets the status of a scheduled payment as active or inactive. When inactive the payment can no longer be triggered. If reactivated the missed payment intervals can still be triggered in retrospect. | ['arr', 'authP', 'scheduledPaymentExists'] |

| APMRegistry | runScript | ... | ['isInitialized', 'protectState'] |
| APMRegistry | newRepo | ... | ['auth'] |
| APMRegistry | newRepoWithVersion | ... | ['auth'] |

| InsuranceFund | renounceOwnership | ... | 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c |
| InsuranceFund | transferOwnership | ... | 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c |
| InsuranceFund | transferEther | ... | 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c |
| InsuranceFund | transferERC20 | ... | 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c |
| InsuranceFund | transferERC721 | ... | 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c |
| InsuranceFund | transferERC1155 | ... | 0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c |

## Access Control

### Role Permissions in AccountOracle

| Role name     | ID                                                                 | Role Owners  | Role Admin    |
| ------------- | ------------------------------------------------------------------ | ------------ | ------------- |
| DEFAULT_ADMIN | 0x0000000000000000000000000000000000000000000000000000000000000000 | Aragon Agent | DEFAULT_ADMIN |

### Role Permissions in HashConsensus

| Role name                      | ID                                                                 | Role Owners  | Role Admin    |
| ------------------------------ | ------------------------------------------------------------------ | ------------ | ------------- |
| DEFAULT_ADMIN                  | 0x0000000000000000000000000000000000000000000000000000000000000000 | Aragon Agent | DEFAULT_ADMIN |
| DISABLE_CONSENSUS_ROLE         | 0x10b016346186602d93fc7a27ace09ba944baf9453611b186d36acd3d3d667dc0 |              | DEFAULT_ADMIN |
| MANAGE_FAST_LANE_CONFIG_ROLE   | 0x4af6faa30fabb2c4d8d567d06168f9be8adb583156c1ecb424b4832a7e4d6717 |              | DEFAULT_ADMIN |
| MANAGE_FRAME_CONFIG_ROLE       | 0x921f40f434e049d23969cbe68d9cf3ac1013fbe8945da07963af6f3142de6afe |              | DEFAULT_ADMIN |
| MANAGE_REPORT_PROCESSOR_ROLE   | 0xc5219a8d2d0107a57aad00b22081326d173df87bad251126f070df2659770c3e |              | DEFAULT_ADMIN |
| MANAGE_MEMBERS_AND_QUORUM_ROLE | 0x66a484cf1a3c6ef8dfd59d24824943d2853a29d96f34a01271efc55774452a51 | Aragon Agent | DEFAULT_ADMIN |

### Role Permissions in ValidatorsExitBusOracle

| Role name                      | ID                                                                 | Role Owners                  | Role Admin    |
| ------------------------------ | ------------------------------------------------------------------ | ---------------------------- | ------------- |
| DEFAULT_ADMIN                  | 0x0000000000000000000000000000000000000000000000000000000000000000 | Aragon Agent                 | DEFAULT_ADMIN |
| MANAGE_CONSENSUS_CONTRACT_ROLE | 0x04a0afbbd09d5ad397fc858789da4f8edd59f5ca5098d70faa490babee945c3b |                              | DEFAULT_ADMIN |
| MANAGE_CONSENSUS_VERSION_ROLE  | 0xc31b1e4b732c5173dc51d519dfa432bad95550ecc4b0f9a61c2a558a2a8e4341 |                              | DEFAULT_ADMIN |
| PAUSE_ROLE                     | 0x139c2898040ef16910dc9f44dc697df79363da767d8bc92f2e310312b816e46d | GateSeal Committee (expired) | DEFAULT_ADMIN |
| RESUME_ROLE                    | 0x2fc10cc8ae19568712f7a176fb4978616a610650813c9d05326c34abb62749c7 |                              | DEFAULT_ADMIN |
| SUBMIT_DATA_ROLE               | 0x65fa0c17458517c727737e4153dd477fa3e328cf706640b0f68b1a285c5990da |                              | DEFAULT_ADMIN |

### Role Permissions in WithdrawalQueueERC721

| Role name             | ID                                                                 | Role Owners                  | Role Admin    |
| --------------------- | ------------------------------------------------------------------ | ---------------------------- | ------------- |
| DEFAULT_ADMIN         | 0x0000000000000000000000000000000000000000000000000000000000000000 | Aragon Agent                 | DEFAULT_ADMIN |
| FINALIZE_ROLE         | 0x485191a2ef18512555bd4426d18a716ce8e98c80ec2de16394dcf86d7d91bc80 | Lido (contract)              | DEFAULT_ADMIN |
| MANAGE_TOKEN_URI_ROLE | 0xbe882725f03f148e7c5a5e63ec45f182f7dcdb6bb8b92311ade5a6d138e0ee0f |                              | DEFAULT_ADMIN |
| ORACLE_ROLE           | 0x68e79a7bf1e0bc45d0a330c573bc367f9cf464fd326078812f301165fbda4ef1 | AccountingOracle             | DEFAULT_ADMIN |
| PAUSE_ROLE            | 0x139c2898040ef16910dc9f44dc697df79363da767d8bc92f2e310312b816e46d | GateSeal Committee (expired) | DEFAULT_ADMIN |
| RESUME_ROLE           | 0x2fc10cc8ae19568712f7a176fb4978616a610650813c9d05326c34abb62749c7 |                              | DEFAULT_ADMIN |

### Role Permissions in Burner

| Role name                  | ID                                                                 | Role Owners                                          | Role Admin    |
| -------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- | ------------- |
| DEFAULT_ADMIN              | 0x0000000000000000000000000000000000000000000000000000000000000000 | Aragon Agent                                         | DEFAULT_ADMIN |
| REQUEST_BURN_SHARES_ROLE   | 0x4be29e0e4eb91f98f709d98803cba271592782e293b84a625e025cbb40197ba8 | Lido (contract), NodeOperatorsRegistry, CSAccounting | DEFAULT_ADMIN |
| REQUEST_BURN_MY_STETH_ROLE | 0x28186f938b759084eea36948ef1cd8b40ec8790a98d5f1a09b70879fe054e5cc | Aragon Agent                                         | DEFAULT_ADMIN |
