---
protocol: "Compound-V3"
website: "https://compound.finance/"
x: "https://x.com/compoundfinance"
github: ["https://github.com/compound-finance/compound-protocol"]
defillama_slug: ["compound-v3"]
chain: "Ethereum"
stage: 1
reasons: []
risks: ["L", "H", "L", "H", "M"]
author: ["mmilien_"]
submission_date: "2025-01-26"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Compound III is an EVM compatible protocol that enables supplying of crypto assets as collateral in order to borrow the base asset. Accounts can also earn interest by supplying the base asset to the protocol.

# Overview

## Chain

The initial deployment of Compound III is on Ethereum mainnet and the base asset is USDC.

Risk: Low

## Upgradeability

The `Comet`s and `Configuration` contracts can be changed at any time with a delay of 2 days once a proposal is accepted. The comet contracts manages all deposits and borrows. A security council can pause the contracts at any time.

Risk: High

## Autonomy

The protocol uses Chainlink's oracle to get the price of the base token. If te oracle fails it may
be replaced only with a contract upgrade triggered from the DAO (3+ days delay).

Risk: Low

## Exit Window

Upon upgrade there is a delay of 2 days allowing user to react. Nonetheless
the withdrawals can be paused by a security council with no delay.

Risk: High

## Accessibility

The frontend of Compound V3 is open source. Instructions to deploy it locally or deploy it
on IPFS are available [here](https://github.com/compound-finance/palisade). There is no registry
of alternative deployments.

Risk: Medium

# Technical Analysis

## Contracts

| Contract Name                 | Address                                    |
| ----------------------------- | ------------------------------------------ |
| cUSDCv3 (Comet Proxy)         | 0xc3d688B66703497DAA19211EEdff47f25384cdc3 |
| cUSDCv3(Comet Implementation) | 0x528c57A87706C31765001779168b42f24c694E1b |
| cUSDCv3 Ext                   | 0x285617313887d43256F852cAE0Ee4de4b68D45B0 |
| Bulker                        | 0x74a81F84268744a40FEBc48f8b812a1f188D80C3 |
| Configurator                  | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 |
| Configurator Implementation   | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F |
| Proxy Admin                   | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 |
| Comet Factory                 | 0xa7F7De6cCad4D83d81676717053883337aC2c1b4 |
| Rewards                       | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 |
| Governor                      | 0xc0Da02939E1441F497fd74F78cE7Decb17B66529 |
| TimeLock                      | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 |
| Comp                          | 0xc00e94Cb662C3520282E6f5717214004A7f26888 |

## Permission owners

| Name           | Account                                                                            | Type         |
| -------------- | ---------------------------------------------------------------------------------- | ------------ |
| Pause Guardian | [address](https://etherscan.io/address/0xbbf3f1421D886E9b2c5D716B5192aC998af2012c) | Multisig 4/8 |
| TimeLock (DAO) | [address](https://etherscan.io/address/0x6d903f6003cca6255D85CcA4D3B5E5146dC33925) | Contract     |
| Governor (DAO) | [address](https://etherscan.io/address/0xc0Da02939E1441F497fd74F78cE7Decb17B66529) | Contract     |

## Permissions

| Contract                    | Function                              | Impact                                                                                                                                                                                                                          | Owner                          |
| --------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| cUSDCv3                     | changeAdmin                           | Updates the admin of this proxy contract. The admin can update the implementation contract. The new admin would replace the `ProxyAdmin` contract, it could be used if the `ProxyAdmin` contract is upgraded/replaced.          | ProxyAdmin                     |
| cUSDCv3                     | upgradeTo                             | Triggers the update of the `cUSDCv3 Implementation` contract with a new contract.                                                                                                                                               | ProxyAdmin                     |
| cUSDCv3                     | upgradeToAndCall                      | Triggers the update of the `cUSDCv3 Implementation` contract with a new contract and then calls a function in the new contract.                                                                                                 | ProxyAdmin                     |
| cUSDCv3 Implementation      | pause                                 | This function pauses the specified protocol functionality in the event of an unforeseen vulnerability. Deposits, transfers, and withdrawals may be paused. This may be called by either the DAO or security council.            | Timelock (DAO) & PauseGuardian |
| cUSDCv3 Implementation      | withdrawReserves                      | Allows governance to withdraw base token reserves from the protocol and send them to a specified address.                                                                                                                       | Timelock (DAO)                 |
| cUSDCv3 Implementation      | approveThis                           | Sets the Comet contract’s ERC-20 allowance of an asset for a manager address. The approved address can freely transfer ERC-20 tokens out of the Comet contract.                                                                 | Timelock (DAO)                 |
| Configurator                | changeAdmin                           | update the admin of this proxy contract. The admin can update the implementation contract. The new admin would replace the `ProxyAdmin` contract, it could be used if the `ProxyAdmin` contract is upgraded/replaced.           | Timelock (DAO)                 |
| Configurator                | upgradeTo                             | Triggers the update of the `Congiruator Implementation` contract with a new contract.                                                                                                                                           | Timelock (DAO)                 |
| Configurator                | upgradeToAndCall                      | Triggers the update of the `Congiruator Implementation` contract with a new contract and then calls a function in the new contract.                                                                                             | Timelock (DAO)                 |
| Configurator Implementation | setFactory                            | Ssets the official contract address of the Comet factory.                                                                                                                                                                       | 0x0                            |
| Configurator Implementation | setConfiguration                      | Sets the entire Configuration for a Comet proxy                                                                                                                                                                                 | 0x0                            |
| Configurator Implementation | setGovernor                           | Sets the official contract address of the Compound III protocol Governor for subsequent proposals.                                                                                                                              | 0x0                            |
| Configurator Implementation | setPauseGuardian                      | Sets the official contract address of the Compound III protocol pause guardian. This address has the power to pause supply, transfer, withdraw, absorb, and buy collateral operations within Compound III.                      | 0x0                            |
| Configurator Implementation | setBaseTokenPriceFeed                 | Sets the official contract address of the price feed of the protocol base asset.                                                                                                                                                | 0x0                            |
| Configurator Implementation | setExtensionDelegate                  | Sets the official contract address of the protocol’s Comet extension delegate. The methods in CometExt.sol are able to be called via the same proxy as Comet.sol.                                                               | 0x0                            |
| Configurator Implementation | setSupplyKink                         | Sets the supply interest rate utilization curve kink for the Compound III base asset.                                                                                                                                           | 0x0                            |
| Configurator Implementation | setSupplyPerYearInterestRateSlopeLow  | Sets the supply interest rate slope low bound in the approximate amount of seconds in one year.                                                                                                                                 | 0x0                            |
| Configurator Implementation | setSupplyPerYearInterestRateSlopeHigh | Ssets the supply interest rate slope high bound in the approximate amount of seconds in one year.                                                                                                                               | 0x0                            |
| Configurator Implementation | setSupplyPerYearInterestRateBase      | Sets the supply interest rate slope base in the approximate amount of seconds in one year.                                                                                                                                      | 0x0                            |
| Configurator Implementation | setBorrowKink                         | Sets the borrow interest rate utilization curve kink for the Compound III base asset.                                                                                                                                           | 0x0                            |
| Configurator Implementation | setBorrowPerYearInterestRateSlopeLow  | Sets the borrow interest rate slope low bound in the approximate amount of seconds in one year.                                                                                                                                 | 0x0                            |
| Configurator Implementation | setBorrowPerYearInterestRateSlopeHigh | Sets the borrow interest rate slope high bound in the approximate amount of seconds in one year.                                                                                                                                | 0x0                            |
| Configurator Implementation | setBorrowPerYearInterestRateBase      | Sets the borrow interest rate slope base in the approximate amount of seconds in one year.                                                                                                                                      | 0x0                            |
| Configurator Implementation | setStoreFrontPriceFactor              | Sets the fraction of the liquidation penalty that goes to buyers of collateral instead of the protocol. This factor is used to calculate the discount rate of collateral for sale as part of the account absorption process.    | 0x0                            |
| Configurator Implementation | setBaseTrackingSupplySpeed            | Sets the rate at which base asset supplier accounts accrue rewards.                                                                                                                                                             | 0x0                            |
| Configurator Implementation | setBaseTrackingBorrowSpeed            | Sets the rate at which base asset borrower accounts accrue rewards.                                                                                                                                                             | 0x0                            |
| Configurator Implementation | setBaseMinForRewards                  | Sets the minimum amount of base asset supplied to the protocol in order for accounts to accrue rewards.                                                                                                                         | 0x0                            |
| Configurator Implementation | setBaseBorrowMin                      | Sets the minimum amount of base token that is allowed to be borrowed.                                                                                                                                                           | 0x0                            |
| Configurator Implementation | setTargetReserves                     | Sets the target reserves amount. Once the protocol reaches this amount of reserves of base asset, liquidators cannot buy collateral from the protocol.                                                                          | 0x0                            |
| Configurator Implementation | addAsset                              | Adds an asset to the protocol through governance.                                                                                                                                                                               | 0x0                            |
| Configurator Implementation | updateAsset                           | Modifies an existing asset’s configuration parameters.                                                                                                                                                                          | 0x0                            |
| Configurator Implementation | updateAssetPriceFeed                  | Updates the price feed contract address for a specific asset.                                                                                                                                                                   | 0x0                            |
| Configurator Implementation | updateAssetBorrowCollateralFactor     | Updates the borrow collateral factor for an asset in the protocol.                                                                                                                                                              | 0x0                            |
| Configurator Implementation | updateAssetLiquidateCollateralFactor  | Updates the liquidation collateral factor for an asset in the protocol.                                                                                                                                                         | 0x0                            |
| Configurator Implementation | updateAssetLiquidationFactor          | Updates the liquidation factor for an asset in the protocol.                                                                                                                                                                    | 0x0                            |
| Configurator Implementation | updateAssetSupplyCap                  | Sets the maximum amount of an asset that can be supplied to the protocol. Supply transactions will revert if the total supply would be greater than this number as a result.                                                    | 0x0                            |
| Configurator Implementation | transferGovernor                      | Changes the address of the Configurator’s Governor.                                                                                                                                                                             | 0x0                            |
| Proxy Admin                 | changeProxyAdmin                      | Updates the admin of one of the proxy contracts: the account with the rights to upgrade the implementations of `Comet` and `Configurator`. This would replace the ProxyAdmin contract and could be used to replace ProxyAdmin . | Timelock (DAO)                 |
| Proxy Admin                 | upgrade                               | Triggers the update of either the `cUSDCv3 Implementation` contract or the `Configurator Implementation` contract.                                                                                                              | Timelock (DAO)                 |
| Proxy Admin                 | upgradeAndCall                        | Triggers the update of either the `cUSDCv3 Implementation` contract or the `Configurator Implementation` contract and calls a function in the new contract.                                                                     | Timelock (DAO)                 |
| Proxy Admin                 | renounceOwnership                     | Abandons ownership of the contract. The DAO would renounce the access to the administrative functions of the contracts, which includes upgrading the `Comet Implementation` and `Configurator Implementation` contracts.        | Timelock (DAO)                 |
| Proxy Admin                 | transferOwnership                     | Updates the owner of the `ProxyAdmin` contract: the account with the rights to change the admin of the proxy and upgrade the implementation contracts.                                                                          | Timelock (DAO)                 |
| Proxy Admin                 | deployAndUpgradeTo                    | Deploy a new Comet and upgrade the implementation of the Comet proxy                                                                                                                                                            | Timelock (DAO)                 |
| Proxy Admin                 | deployUpgradeToAndCall                | Deploy a new Comet and upgrade the implementation of the Comet proxy, then call a function in the new contract.                                                                                                                 | Timelock (DAO)                 |
| Rewards                     | setRewardConfig                       | Set the reward token for a Comet instance.                                                                                                                                                                                      | Timelock (DAO)                 |
| Rewards                     | withdrawToken                         | Withdraw reward tokens from the contract.                                                                                                                                                                                       | Timelock (DAO)                 |
| Rewards                     | transferGovernor                      | Transfers the governor rights to a new address.                                                                                                                                                                                 | Timelock (DAO)                 |
| Rewards                     | claimTo                               | Claim rewards from a comet instance to a target address .                                                                                                                                                                       | Timelock (DAO)                 |
| Governor                    | \_setImplementation                   | Updates the implementation of the `Governor` contract. Can only be triggered by the DAO itself. The new contract would inherit all the DAO permissions mentioned above.                                                         | Timelock (DAO)                 |
| TimeLock                    | setDelay                              | Updates the delay to wait between when a proposal is accepted and when it is executed.                                                                                                                                          | Timelock (DAO)                 |
| TimeLock                    | setPendingAdmin                       | Updates the TimeLock's admin. This can be used if the Governor contract is updated.                                                                                                                                             | Timelock (DAO)                 |
| TimeLock                    | queueTransaction                      | Queues a transaction that can be executed once a delay. Current dela is 2 days. This can impact the own TimeLock 's settings (change admin, set delays) or interaction with any other contract the DAO has permissions on.      | Governor (DAO)                 |
| TimeLock                    | cancelTransaction                     | Cancels a pending transaction and removes it from the queue. This allows the DAO to cancel one of its own decision before it is executed.                                                                                       | Governor (DAO)                 |
| TimeLock                    | executeTransaction                    | Executes a transaction that was previously queued, if the corresponding delay has passed.                                                                                                                                       | Governor (DAO)                 |

# Security Council

A security council called `Pause Guardian` has the power to pause all deposits, withdrawals, and transfers
in the protocol. The guardian is currently a 4/8 multisig made of Compound DAO community members. The signers are announced [here](https://www.comp.xyz/t/community-multisig-4-of-6-deployment/134/18).

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ✅     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ✅     | At least 50% non-team signers                           |
| ✅     | Signers are publicly announced (with name or pseudonym) |
