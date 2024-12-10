---
protocol: "Ethena"
website: "https://ethena.fi/"
x: "https://x.com/ethena_labs"
github: "https://github.com/ethena-labs"
defillama_slug: ["ethena"]
chain: "Ethereum"
stage: 0
risks: ["L", "L", "H", "H", "M"]
author: ["andrijdavid"]
submission_date: "2024-12-10"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary


Ethena is a synthetic dollar protocol built on Ethereum that provides a crypto-native solution for money not reliant on traditional banking system infrastructure. It introduces the 'Internet Bond,' a globally accessible dollar-denominated rewards instrument. Ethena's synthetic dollar, USDe, is fully backed by staked crypto assets (Etherum and Bitcoin) and its corresponding short futures positions. Ethena employs delta-hedging strategies to maintain stability and generate yields for users.

# Overview

## Chain

The Ethena protocol is deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

Ethena's smart contracts are not upgradable but the ability to set and update roles introduces a level of flexibility and risk. 

> Upgradeability: L

## Autonomy

Ethena's contracts have dependencies on external roles and addresses, such as the minter, redeemer, and custodian addresses. 

> Autonomy score: H

## Exit Window

Ethena's contracts have processes for transferring admin rights and setting role without any exit window. 

> Exit Window score: H

## Accessibility

Only a single user interface exists.

> Accessibility score: M

# Technical Analysis

## Contracts

| Contract Name | Address |
| ------------- | ------- |
| USDe    | [0x4c9EDD5852cd905f086C759E8383e09bff1E68B3](https://etherscan.io/address/0x4c9EDD5852cd905f086C759E8383e09bff1E68B3)   |
| EthenaMinting    | [0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3](https://etherscan.io/address/0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3)   |
| StakedUSDeV2  | [0x9D39A5DE30e57443BfF2A8307A4256c8797A3497](https://etherscan.io/address/0x9D39A5DE30e57443BfF2A8307A4256c8797A3497)    |
| StackingRewardDistributor | [0xf2fa332bD83149c66b09B45670bCe64746C6b439](https://etherscan.io/address/0xf2fa332bd83149c66b09b45670bce64746c6b439) |
| ENA | [0x57e114B691Db790C35207b2e685D4A43181e6061](https://etherscan.io/address/0x57e114B691Db790C35207b2e685D4A43181e6061) |
| sENA | [0x8bE3460A480c80728a8C4D7a5D5303c85ba7B3b9](https://etherscan.io/token/0x8bE3460A480c80728a8C4D7a5D5303c85ba7B3b9) |

## Permission owners

Ethena utilises a gnosis safe multisig to hold ownership of its smart contracts. All multisig keys are cold wallets and each multisig requires 7/10 or more confirmations before transactions are approved. This multisig is purely for the purpose of owning the smart contracts, and will not hold funds or do other on chain actions.


| Name | Account                                       | Type         |
| ---- | --------------------------------------------- | ------------ |
| Dev   | [0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862](https://etherscan.io/address/0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862) | Multisig 4/8|
| Hot Swap | [0x4423198f26764a8ce9ac8f1683c476854c885d9d](https://etherscan.io/address/0x4423198f26764a8ce9ac8f1683c476854c885d9d) | Multisig 4/8 |
| sUSDe Payout Fund | [0x71e4f98e8f20c88112489de3dded4489802a3a87](https://etherscan.io/address/0x71e4f98e8f20c88112489de3dded4489802a3a87) | Multisig 4/8 |
| Protocol Treasury | [0xa2af0b03aaf167cfc9624c6ef587581b6fcced92](https://etherscan.io/address/0xa2af0b03aaf167cfc9624c6ef587581b6fcced92) | Multisig 5/9 |
| Trading Operations | [0x0a0b96A730ED5CDa84bcB63c1Ee2edCb6B7764d6](https://etherscan.io/address/0x0a0b96A730ED5CDa84bcB63c1Ee2edCb6B7764d6) | Multisig 4/8 |
| Reserve Fund | [0x2b5ab59163a6e93b4486f6055d33ca4a115dd4d5](https://etherscan.io/address/0x2b5ab59163a6e93b4486f6055d33ca4a115dd4d5) | Multisig 4/8 |



## Permissions

| Contract                  | Function                    | Impact                                                                         | Owner                                      |
|---------------------------|-----------------------------|--------------------------------------------------------------------------------|--------------------------------------------|
| USDe                      | transferOwnership           | Allows the owner to transfer ownership to a new address.                       | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| USDe                      | renounceOwnership           | Allows the owner to renounce ownership, setting the owner to the zero address. | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| USDe                      | setMinter                   | Allows the owner to set the minter address, which can mint new tokens.         | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | transferAdmin               | Allows the owner to transfer admin rights to a new address.                    | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | acceptAdmin                 | Allows the pending admin to accept admin rights.                               | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | grantRole                   | Allows the owner to grant a role to an address.                                | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | revokeRole                  | Allows the owner to revoke a role from an address.                             | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | renounceRole                | Allows the owner to renounce a role.                                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | mint                        | Allows the owner to mint new tokens.                                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | mintWETH                    | Allows the owner to mint new WETH tokens.                                      | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | redeem                      | Allows the owner to redeem tokens.                                             | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setGlobalMaxMintPerBlock    | Allows the owner to set the global maximum mint per block.                     | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setGlobalMaxRedeemPerBlock  | Allows the owner to set the global maximum redeem per block.                   | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | disableMintRedeem           | Allows the owner to disable minting and redeeming.                             | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | confirmDelegatedSigner      | Allows the owner to confirm a delegated signer.                                | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | transferToCustody           | Allows the owner to transfer tokens to custody.                                | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | removeSupportedAsset        | Allows the owner to remove a supported asset.                                  | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | removeCustodianAddress      | Allows the owner to remove a custodian address.                                | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | removeMinterRole            | Allows the owner to remove the minter role from an address.                    | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | removeRedeemerRole          | Allows the owner to remove the redeemer role from an address.                  | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | removeCollateralManagerRole | Allows the owner to remove the collateral manager role from an address.        | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | removeWhitelistedBenefactor | Allows the owner to remove a whitelisted benefactor.                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | addCustodianAddress         | Allows the owner to add a custodian address.                                   | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | addWhitelistedBenefactor    | Allows the owner to add a whitelisted benefactor.                              | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setApprovedBeneficiary      | Allows the owner to set an approved beneficiary.                               | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | addSupportedAsset           | Allows the owner to add a supported asset.                                     | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setMaxMintPerBlock          | Allows the owner to set the maximum mint per block.                            | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setMaxRedeemPerBlock        | Allows the owner to set the maximum redeem per block.                          | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setTokenType                | Allows the owner to set the token type.                                        | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| EthenaMinting             | setStablesDeltaLimit        | Allows the owner to set the stables delta limit.                               | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakedUSDeV2              | transferInRewards           | Allows the owner to transfer rewards into the contract.                        | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakedUSDeV2              | addToBlacklist              | Allows the owner to add an address to the blacklist.                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakedUSDeV2              | removeFromBlacklist         | Allows the owner to remove an address from the blacklist.                      | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakedUSDeV2              | rescueTokens                | Allows the owner to rescue tokens from the contract.                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakedUSDeV2              | redeemLockedAmount          | Allows the owner to redeem the locked amount.                                  | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakedUSDeV2              | setCooldownDuration         | Allows the owner to set the cooldown duration.                                 | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | transferOwnership           | Allows the owner to transfer ownership to a new address.                       | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | renounceOwnership           | Allows the owner to renounce ownership, setting the owner to the zero address. | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | transferInRewards           | Allows the owner to transfer rewards into the contract.                        | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | rescueTokens                | Allows the owner to rescue tokens from the contract.                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | setMintingContract          | Allows the owner to set the minting contract address.                          | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | approveToMintContract       | Allows the owner to approve the mint contract to spend tokens.                 | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | revokeApprovals             | Allows the owner to revoke approvals for the mint contract.                    | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| StakingRewardsDistributor | setOperator                 | Allows the owner to set the operator address.                                  | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| ENA                       | transferOwnership           | Allows the owner to transfer ownership to a new address.                       | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| ENA                       | renounceOwnership           | Allows the owner to renounce ownership, setting the owner to the zero address. | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |
| ENA                       | mint                        | Allows the owner to mint new tokens.                                           | 0x3B0AAf6e6fCd4a7cEEf8c92C32DFeA9E64dC1862 |


## Dependencies

The Ethena protocol has several critical dependencies that introduce significant risks:

    - Centralized Exchanges (CEX): Essential for maintaining delta-neutral positions, crucial for the stablecoin mechanism.
    - Oracles: Relies on CEX (Binance, Bybit, Okx, Deribit, Bitmex and Bitget), Pyth, and Redstone for accurate and timely price feeds.
    - Off-Exchange Settlement Providers: Depends on services like Copper, Ceffu, and Cobo for secure custody and settlement.
    - Cloud Infrastructure: Deployed on AWS regions in Hong Kong (AP-EAST-1) and Ireland (EU-WEST-1), introducing a dependency on cloud services.

These dependencies, while necessary for the protocol's operation, also present potential points of failure and risk.

## Exit Window

No time-locks have been found.

# Security Council

| Requirement                                             | Dev | Hot Swap | sUSDe Payout Fund | Protocol Treasury | Trading Operations | Reserve Fund |
|---------------------------------------------------------|-----|----------|-------------------|-------------------|--------------------|--------------|
| At least 7 signers                                      | ✅   | ✅        | ✅                 | ✅                 | ✅                  | ✅            |
| At least 51% threshold                                  | ❌   | ❌        | ❌                 | ✅                 | ❌                  | ❌            |
| At least 50% non-team signers                           | ❌   | ❌        | ❌                 | ❌                 | ❌                  | ❌            |
| Signers are publicly announced (with name or pseudonym) | ❌   | ❌        | ❌                 | ❌                 | ❌                  | ❌            |
