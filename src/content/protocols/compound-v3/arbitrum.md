---
chain: "Arbitrum"
stage: 0
reasons: []
risks: ["M", "H", "H", "H", "L"]
author: ["mmilien_"]
submission_date: "2025-02-18"
publish_date: "2025-03-18"
update_date: "1970-01-01"
stage_requirements:
  [
    [
      { text: "Assets are not in custody by a centralized entity", status: "fixed" },
      { text: "All contracts are verified", status: "fixed" },
      { text: "Source-available codebase", status: "fixed" },
      { text: "Public documentation exists", status: "fixed" },
    ],
    [
      { text: "Upgrades with potential of “loss of funds” not protected with Exit Window >= 7 days OR a sufficient Security Council", status: "unfixed" },
      { text: "Dependency with a High centralization score without mitigation", status: "unfixed" },
      { text: "Frontend backups or self-hosting option exists", status: "fixed"},
    ],
    [
      { text: "Upgrades with potential of “loss of funds or unclaimed yield” not protected with onchain governance AND Exit Window >= 30 days", status: "unfixed" },
      { text: "Dependencies with High or Medium centralization score and no mitigations.", status: "unfixed" },
      { text: "Alternative third-party frontends exist", status: "fixed" }
    ],
  ]
---

# Summary

Compound-v3 is a lending protocol that accepts a base asset as liquidity and allows borrowing this base asset with a variety of other assets as collateral. Multiple base assets are supported such as USDC.e, USDC, WETH, and USDT. Each base asset represents an isolated lending market managed by a separate instance of the protocol. Compound governance is able to update various parameters for each of these markets.

# Ratings

## Chain

Compound III is deployed on various chains. This review is based on the Arbitrum chain, an Ethereum L2 in Stage 1 according to L2BEAT.

> Chain score: Medium

## Upgradeability

The Compound-v3 protocol is fully upgradeable allowing for the update of governance and markets logic and state (specifically the `Governance` and `Comet` implementation contracts). This can result in the loss of funds or unclaimed yield as well as lead to other changes in the expected performance of the protocol.

The permission to upgrade the protocol is controlled by an onchain governance system with `COMP` token holders submitting and voting on respective proposals. A multisig account, the `ProposalGuardian`, has the permission to cancel proposals to mitigate the risk of malicious or otherwise unintended proposals. This role can potentially be abused to censor proposals.

Furthermore, another multisig account, the `PauseGuardian`, has the permission to pause markets, disabling depositing and withdrawing assets, if suspicious activity is detected. This role can potentially be abused to freeze funds and unclaimed yield in the protocol.

Upgrades happen through governance proposal on Ethereum Mainnet. A `Bridge Receiver` receives messages from the mainnet governance and sends them to a local `TimeLock` that ensures the transactions are only executed during the correct execution period, after a delay.

> Upgradeability score: High

## Autonomy

The compound-v3 protocol relies on a Chainlink oracle feed to price collateral and base assets in the system. The protocol does not validate asset prices returned by Chainlink or offer a fallback oracle mechanism. The replacement of a stale or untrusted oracle feed requires a Compound governance vote with a delay (see [Exit Window](#exit-window)).

Chainlink achieves a _High_ centralization risk score as discussed in a separate report [here](/protocols/chainlink-oracles/ethereum).

> Autonomy score: High

## Exit Window

Permissions, including protocol upgrades, are controlled by an onchain governance system on Ethereum mainnet. `COMP` holders are able to create new proposals (requires 25,000 `COMP`) and vote on proposals (at least 400,000 votes are required for a valid proposal). A minimum voting period of 3 days is enforced as well as a delay of 3 days for the implementation of successful proposals.

While this does not meet the 7-day exit window requirement, malicious or unintended proposals can be intercepted by the `ProposalGuardian` multisig account.

However, the `ProposalGuardian` multisig accounts does not meet the Security Council requirements ([see below](#security-council)).

> Exit Window score: High

## Accessibility

The frontend of Compound V3 is open source. Instructions to deploy it locally or deploy it
on IPFS are available [here](https://github.com/compound-finance/palisade). However, the frontend depends on a separate backend that is accessed through [v3-api.compound.finance/](https://v3-api.compound.finance/). Therefore, self-hosting does not help if the backend is down.
Nonetheless, compound is supported on third-party apps like DeFiSaver. These apps build an acceptable backup solution in case of failure of the official frontend and backend.

> Accessibility score: Low

## Conclusion

The Compound-v3 Ethereum mainnet protocol achieves High centralization risk scores for its _Upgradeability_, _Autonomy_ and _Exit Window_ dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by 1) adopting a _Security Council_ setup for the `ProposalGuardian` multisig accounts, and 2) implementing validity checks and a fallback mechanism around the Chainlink oracle (or Chainlink adopting a _Security Council_ setup for its own multisig account).

> Overall score: Stage 0

# Reviewer Notes

⚠️ During our analysis, we noticed many of the contract addresses listed in the [official documentation](https://docs.compound.finance/) are out of date. This is most likely explained by the high frequency of updates to the implementation contracts. The list in this review was last updated on the 20th of February 2025.

# Protocol Analysis

Below is an overview of the contracts from the Compound V3 protocol.

![Overview of the compound protocol](../diagrams/compound-v3-arbitrum-overview.png)

## Upgrade process

Any market parameter change requires a new `Comet` deployment. Governance decisions are taken on Ethereum mainnet and sent out through Arbitrum's
cross-chain messaging system. The upgrade process is as follows:

1.  Governance approved upgrade is sent out through the cross-chain messaging system and subject to an additional 1-day delay.
1.  New parameters are set using setters in the `Configurator` contract.
1.  The `ProxyAdmin` contract uses `deployAndUpgradeTo`:
    1. Deploys a new comet contract through the `Configurator`, which uses the `CometFactory`.
    2. Updates the corresponding `Comet Proxy` to point to this newly deployed contract.

A malicious update could simply perform the update to the `Comet Proxy`to introduce a malicious `Comet Implementation` contract, effectively stealing funds.
This is because the `upgrade` function can still be called by the DAO in addition to `deployAndUpgradeTo`, allowing the DAO to deploy `Comet` contracts not created by the `Configurator`.

The process is illustrated below.

![Update scheme for a comet contract](../diagrams/compound-v3-update-arbitrum.png)

# Dependencies

The compound-v3 protocol relies on a Chainlink oracle feed to price collateral and base assets in the system. The protocol does not validate asset prices returned by Chainlink feeds other than checking for a zero-value. The protocol further does not offer a fallback pricing mechanism in case the Chainlink oracle feeds are stale or untrusted. If not performing as expected, Chainlink oracle feeds can only be replaced through a regular Compound governance proposal with a delay (see Exit Window).

Chainlink achieves a _High_ centralization risk score as discussed in a separate report [here](/protocols/chainlink-oracles/ethereum).

# Governance

The Compound protocol is governed and upgraded by `COMP` token-holders on Ethereum Mainnet. The details of the governance process can be read in the Ethereum mainnet review of Compound V3 [here](/protocols/compound-v3).

## Security Council

A security council called `Pause Guardian` has the power to pause all deposits, withdrawals, and transfers
in the Arbitrum `Comet` contracts. The guardian is currently a 4/7 multisig made of a diverse set of signers including more than 50% outsiders (community members, non-affiliated entities). The signers are announced [here](https://www.comp.xyz/t/community-multisig-4-of-6-deployment/134/18) but do not match the current set.
A `Proposal Guardian` on Ethereum Mainnet has the power to cancel Governance Proposals before their executions. It is composed of a 4/8 multisig made of the same entities announced for the `Pause Guardian`, with one additional signer that prevents the `Proposal Guardian` to qualify as a security council according to our requirements.

&nbsp;

| Name              | Account                                                                                                               | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| Pause Guardian    | [0x78E6317DD6D43DdbDa00Dce32C2CbaFc99361a9d](https://arbiscan.io/address/0x78E6317DD6D43DdbDa00Dce32C2CbaFc99361a9d)  | Multisig 4/7 | ✅          | ✅              | ❌                | ❌             |
| Proposal Guardian | [0xbbf3f1421D886E9b2c5D716B5192aC998af2012c](https://etherscan.io/address/0xbbf3f1421D886E9b2c5D716B5192aC998af2012c) | Multisig 4/8 | ✅          | ❌              | ✅                | ✅             |

# Contracts & Permissions

## Contracts

&nbsp;

| Contract Name                    | Address                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| cUSDC.ev3 (Comet Proxy)          | [0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA](https://arbiscan.io/address/0xc3d688B66703497DAA19211EEdff47f25384cdc3) |
| cUSDC.ev3 (Comet Implementation) | [0x75E6946E4d3A374F94232Dc0fbB6240Ae217e869](https://arbiscan.io/address/0x75E6946E4d3A374F94232Dc0fbB6240Ae217e869) |
| cUSDC.ev3 Ext                    | [0x1B2E88cC7365d90e7E81392432482925BD8437E9](https://arbiscan.io/address/0x1B2E88cC7365d90e7E81392432482925BD8437E9) |
| cUSDCv3 (Comet Proxy)            | [0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf](https://arbiscan.io/address/0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf) |
| cUSDCv3 (Comet Implementation)   | [0x7AB43dfe0f5DF2C0BEFb3267AD4fAa773b2c05a1](https://arbiscan.io/address/0x7AB43dfe0f5DF2C0BEFb3267AD4fAa773b2c05a1) |
| cUSDCv3 Ext                      | [0x1B2E88cC7365d90e7E81392432482925BD8437E9](https://arbiscan.io/address/0x1B2E88cC7365d90e7E81392432482925BD8437E9) |
| WETH (Comet Proxy)               | [0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486](https://arbiscan.io/address/0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486) |
| WETH (Comet Implementation)      | [0x6493C8f4da3D6c77aF93412250b353E4c31d0A74](https://arbiscan.io/address/0x6493C8f4da3D6c77aF93412250b353E4c31d0A74) |
| WETH Ext                         | [0x5404872d8f2e24b230EC9B9eC64E3855F637FB93](https://arbiscan.io/address/0x5404872d8f2e24b230EC9B9eC64E3855F637FB93) |
| USDT (Comet Proxy)               | [0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07](https://arbiscan.io/address/0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07) |
| USDT (Comet Implementation)      | [0x4fc5BA5a2CeDec9Ccf0C0a0ca90b59fFbB6B7BD5](https://arbiscan.io/address/0x4fc5BA5a2CeDec9Ccf0C0a0ca90b59fFbB6B7BD5) |
| USDT Ext                         | [0x698A949f3b4f7a5DdE236106F25Fa0eAcA0FcEF1](https://arbiscan.io/address/0x698A949f3b4f7a5DdE236106F25Fa0eAcA0FcEF1) |
| Bulker                           | [0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d](https://arbiscan.io/address/0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d) |
| Configurator                     | [0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775](https://arbiscan.io/address/0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775) |
| Configurator Implementation      | [0x8495AF03fb797E2965bCB42Cb0693e1c15614798](https://arbiscan.io/address/0x8495AF03fb797E2965bCB42Cb0693e1c15614798) |
| Proxy Admin                      | [0xD10b40fF1D92e2267D099Da3509253D9Da4D715e](https://arbiscan.io/address/0xD10b40fF1D92e2267D099Da3509253D9Da4D715e) |
| Comet Factory                    | [0xe2AA5194E45B043AfdD6E98F467c0B1c13484ae9](https://arbiscan.io/address/0xe2AA5194E45B043AfdD6E98F467c0B1c13484ae9) |
| Rewards                          | [0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae](https://arbiscan.io/address/0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae) |
| TimeLock                         | [0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A](https://arbiscan.io/address/0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A) |
| Bridge Receiver                  | [0x42480C37B249e33aABaf4c22B20235656bd38068](https://arbiscan.io/address/0x42480C37B249e33aABaf4c22B20235656bd38068) |

## All Permission Owners

| Name                    | Account                                                                                                               | Type         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Pause Guardian          | [0x78E6317DD6D43DdbDa00Dce32C2CbaFc99361a9d](https://arbiscan.io/address/0x78E6317DD6D43DdbDa00Dce32C2CbaFc99361a9d)  | Multisig 4/7 |
| Proposal Guardian       | [0xbbf3f1421D886E9b2c5D716B5192aC998af2012c](https://etherscan.io/address/0xbbf3f1421D886E9b2c5D716B5192aC998af2012c) | Multisig 4/8 |
| Arbitrum TimeLock       | [0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A](https://arbiscan.io/address/0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A)  | Contract     |
| Arbitrum BridgeReceiver | [0x42480C37B249e33aABaf4c22B20235656bd38068](https://arbiscan.io/address/0x42480C37B249e33aABaf4c22B20235656bd38068)  | Contract     |

## Permissions

| Contract                      | Function                              | Impact                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Owner                                           |
| ----------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Comet Proxy                   | changeAdmin                           | Updates the admin of this proxy contract. The admin can update the implementation contract. The new admin would replace the `ProxyAdmin` contract, it could be used if the `ProxyAdmin` contract is upgraded/replaced.                                                                                                                                                                                                                                    | ProxyAdmin                                      |
| Comet Proxy                   | upgradeTo                             | Triggers the update of the `Comet Implementation` contract with a new contract.                                                                                                                                                                                                                                                                                                                                                                           | ProxyAdmin                                      |
| Comet Proxy                   | upgradeToAndCall                      | Triggers the update of the `Comet Implementation` contract with a new contract and then calls a function in the new contract.                                                                                                                                                                                                                                                                                                                             | ProxyAdmin                                      |
| Comet Implementation          | pause                                 | This function pauses the specified protocol functionality in the event of an unforeseen vulnerability. Deposits, transfers, and withdrawals may be paused. This may be called by either the DAO or the Pause Guardian.                                                                                                                                                                                                                                    | Arbitrum TimeLock (Mainnet DAO) & PauseGuardian |
| Comet Implementation          | withdrawReserves                      | Allows governance to withdraw base token reserves from the protocol and send them to a specified address.                                                                                                                                                                                                                                                                                                                                                 | Arbitrum TimeLock (Mainnet DAO)                 |
| Comet Implementation          | approveThis                           | Sets the Comet contract’s ERC-20 allowance of an asset for a manager address. The approved address can freely transfer ERC-20 tokens out of the Comet contract.                                                                                                                                                                                                                                                                                           | Arbitrum TimeLock (Mainnet DAO)                 |
| Bulker                        | sweepToken                            | Transfers an ERC-20 token held by this contract to any other address. Can be used to recover/use funds sent to the contract by accident as the Bulker is not meant to hold tokens.                                                                                                                                                                                                                                                                        | Arbitrum TimeLock (Mainnet DAO)                 |
| Bulker                        | sweepNativeToken                      | Transfers ETH held by this contract to any other address. Can be used to recover/use funds sent to the contract by accident as the Bulker is not meant to hold ETH.                                                                                                                                                                                                                                                                                       | Arbitrum TimeLock (Mainnet DAO)                 |
| Bulker                        | transferAdmin                         | Transfers admin rights on the bulker. The only admin permissions are sweeping tokens from the contract.                                                                                                                                                                                                                                                                                                                                                   | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Proxy)          | changeAdmin                           | Update the admin of this proxy contract. The admin can update the implementation contract. The new admin would replace the `ProxyAdmin` contract, it could be used if the `ProxyAdmin` contract is upgraded/replaced.                                                                                                                                                                                                                                     | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Proxy)          | upgradeTo                             | Triggers the update of the `Congiruator Implementation` contract with a new contract.                                                                                                                                                                                                                                                                                                                                                                     | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Proxy)          | upgradeToAndCall                      | Triggers the update of the `Congiruator Implementation` contract with a new contract and then calls a function in the new contract.                                                                                                                                                                                                                                                                                                                       | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setFactory                            | Sets the official contract address of the `Comet Factory`.                                                                                                                                                                                                                                                                                                                                                                                                | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setConfiguration                      | Sets the entire Configuration for a `Comet Proxy` contract.                                                                                                                                                                                                                                                                                                                                                                                               | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setGovernor                           | Sets the official contract address of the Compound III protocol Governor for subsequent proposals. This can be used when the Governance is updated.                                                                                                                                                                                                                                                                                                       | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setPauseGuardian                      | Sets the official contract address of the Compound III protocol pause guardian. This address has the power to pause supply, transfer, withdraw, absorb, and buy collateral operations within Compound III.                                                                                                                                                                                                                                                | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBaseTokenPriceFeed                 | Sets the official contract address of the price feed of the protocol base asset. This can be used to change the oracle used for a given base asset. An abusive update could point to a malicious price feed and put user's funds at risk.                                                                                                                                                                                                                 | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setExtensionDelegate                  | Sets the official contract address of the protocol’s `Comet` extension delegate. The methods in `CometExt` are able to be called via the same proxy as `Comet`. The extension contract is used for auxiliary functions, to reduce the size of the original `Comet (Implementation)` contract. A malicious extension contract could have the same impact as a malicious `Comet (Implementation)` and steal users' funds.                                   | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setSupplyKink                         | Sets the supply interest rate utilization curve kink for the Compound III base asset. The kink is an utilization rate of the base asset, above which the interest rate increases more rapidly. An overly low supply kink might lead to excessive interest accrual, discouraging deposits, while a high borrow kink might enable unsustainably cheap borrowing, increasing risk exposure.                                                                  | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setSupplyPerYearInterestRateSlopeLow  | Sets the supply interest rate slope low bound in the approximate amount of seconds in one year. This slope dictates how quickly interest rates change for suppliers when the utilization is under the kink.                                                                                                                                                                                                                                               | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setSupplyPerYearInterestRateSlopeHigh | Sets the supply interest rate slope high bound in the approximate amount of seconds in one year. This slope dictates how quickly interest rates change for suppliers when the utilization is above the kink.                                                                                                                                                                                                                                              | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setSupplyPerYearInterestRateBase      | Sets the supply interest rate slope base in the approximate amount of seconds in one year. This is the base interest rate, to which will be added the variable rate as a function of the utilization and kink.                                                                                                                                                                                                                                            | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBorrowKink                         | Sets the borrow interest rate utilization curve kink for the Compound III base asset. The kink is an utilization rate of the base asset, above which the interest rate increases more rapidly. An overly low supply kink might lead to excessive interest accrual, discouraging deposits, while a high borrow kink might enable unsustainably cheap borrowing, increasing risk exposure.                                                                  | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBorrowPerYearInterestRateSlopeLow  | Sets the borrow interest rate slope low bound in the approximate amount of seconds in one year. This slope dictates how quickly interest rates change for borrowers when the utilization is under the kink.                                                                                                                                                                                                                                               | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBorrowPerYearInterestRateSlopeHigh | Sets the borrow interest rate slope high bound in the approximate amount of seconds in one year. This slope dictates how quickly interest rates change for borrowers when the utilization is above the kink.                                                                                                                                                                                                                                              | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBorrowPerYearInterestRateBase      | Sets the borrow interest rate slope base in the approximate amount of seconds in one year. This is the base interest rate for borrowers, to which will be added the variable rate as a function of the utilization and kink.                                                                                                                                                                                                                              | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setStoreFrontPriceFactor              | Sets the fraction of the liquidation penalty that goes to buyers of collateral instead of the protocol. This factor is used to calculate the discount rate of collateral for sale as part of the account absorption process. This helps determine the “discount” rate that liquidators receive when purchasing collateral. If set too low, liquidators would not be incentivized to liquidate under-collateralized positions, opening a risk of bad debt. | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBaseTrackingSupplySpeed            | Sets the rate at which base asset supplier accounts accrue rewards. If set too high, the protocol could over-distribute rewards, diluting token value.                                                                                                                                                                                                                                                                                                    | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBaseTrackingBorrowSpeed            | Sets the rate at which base asset borrower accounts accrue rewards. set too high, the protocol could over-distribute rewards, diluting token value.                                                                                                                                                                                                                                                                                                       | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBaseMinForRewards                  | Sets the minimum amount of base asset supplied to the protocol in order for accounts to accrue rewards.                                                                                                                                                                                                                                                                                                                                                   | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setBaseBorrowMin                      | Sets the minimum amount of base token that is allowed to be borrowed.                                                                                                                                                                                                                                                                                                                                                                                     | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | setTargetReserves                     | Sets the target reserves amount. Once the protocol reaches this amount of reserves of base asset, liquidators cannot buy collateral from the protocol. A target too low could expose the protocol to under-reserved conditions during liquidations, risking insolvency.                                                                                                                                                                                   | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | addAsset                              | Adds an asset to the protocol through governance. This involves specifying all necessary risk and collateral parameters for the new asset.                                                                                                                                                                                                                                                                                                                | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | updateAsset                           | Modifies an existing asset’s configuration parameters. This can include changes to interest rates and kink parameters.                                                                                                                                                                                                                                                                                                                                    | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | updateAssetPriceFeed                  | Updates the price feed contract address for a specific asset. An abusive update could point to a malicious price feed and put user's funds at risk through wrongful liquidations or price manipulation attacks.                                                                                                                                                                                                                                           | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | updateAssetBorrowCollateralFactor     | Updates the borrow collateral factor for an asset in the protocol: the fraction of an asset’s value that can be borrowed against. If set too high this can increase the likelihood of defaults. This value is checked for bounds at the time of deployment.                                                                                                                                                                                               | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | updateAssetLiquidateCollateralFactor  | Updates the liquidation collateral factor for an asset in the protocol: the threshold at which an asset’s collateral becomes eligible for liquidation. This value is checked for bounds at the time of deployment.                                                                                                                                                                                                                                        | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | updateAssetLiquidationFactor          | Updates the liquidation factor for an asset in the protocol, the amount that is paid out to an underwater account upon liquidation. This value is checked for bounds at the time of deployment.                                                                                                                                                                                                                                                           | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | updateAssetSupplyCap                  | Sets the maximum amount of an asset that can be supplied to the protocol. Supply transactions will revert if the total supply would be greater than this number as a result.                                                                                                                                                                                                                                                                              | Arbitrum TimeLock (Mainnet DAO)                 |
| Configurator (Implementation) | transferGovernor                      | Changes the address of the Configurator’s Governor. This should only be used when the governance is updated, as a malicious governor would have multiple ways to steal funds using the above functions.                                                                                                                                                                                                                                                   | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | changeProxyAdmin                      | Updates the admin of one of the proxy contracts: the account with the rights to upgrade the implementations of `Comet` and `Configurator`. A malicious admin could hijack the whole protocol.                                                                                                                                                                                                                                                             | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | upgrade                               | Triggers the update of either a `Comet (Implementation)` contract or `Configurator (Implementation)` contract. A malicious proposal not stopped by the `ProposerGuardian` could use this function to replace a `Comet (Implementation)` contract and steal funds.                                                                                                                                                                                         | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | upgradeAndCall                        | Triggers the update of either a `Comet (Implementation)` contract or `Configurator (Implementation)` contract and calls a function in the new contract. A malicious proposal not stopped by the `ProposerGuardian` could use this function to replace a `Comet (Implementation)` contract and steal funds.                                                                                                                                                | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | renounceOwnership                     | Abandons ownership of the contract. The DAO would renounce the access to the administrative functions of the contracts, which includes upgrading the `Comet Implementation` and `Configurator Implementation` contracts. Without other prior adaptations this could present a vulnerability as it would freeze the parameters of the `Comet (Implementation)`contracts.                                                                                   | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | transferOwnership                     | Updates the owner of the `ProxyAdmin` contract: the account with the rights to change the admin of the proxy and upgrade the implementation contracts.                                                                                                                                                                                                                                                                                                    | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | deployAndUpgradeTo                    | Deploy a new `Comet (Implementation)` using the `Configurator` and upgrade the implementation of the `Comet Proxy`. This bundles the transactions to ensure a correct update.                                                                                                                                                                                                                                                                             | Arbitrum TimeLock (Mainnet DAO)                 |
| CometProxyAdmin               | deployUpgradeToAndCall                | Deploy a new `Comet (Implementation)` using the `Configurator` and upgrade the implementation of the `Comet Proxy`, then call a function in the new contract.                                                                                                                                                                                                                                                                                             | Arbitrum TimeLock (Mainnet DAO)                 |
| CometRewards                  | setRewardConfig                       | Set the reward token for a `Comet` instance.                                                                                                                                                                                                                                                                                                                                                                                                              | Arbitrum TimeLock (Mainnet DAO)                 |
| CometRewards                  | withdrawToken                         | Withdraw reward tokens from the contract. This could drain all the tokens held on the contract to any output address if the DAO approves the proposal.                                                                                                                                                                                                                                                                                                    | Arbitrum TimeLock (Mainnet DAO)                 |
| CometRewards                  | transferGovernor                      | Transfers the governor rights to a new address. A malicious governor could withdraw all reward tokens.                                                                                                                                                                                                                                                                                                                                                    | Arbitrum TimeLock (Mainnet DAO)                 |
| TimeLock                      | setDelay                              | Updates the delay to wait between when a proposal is accepted and when it is executed.                                                                                                                                                                                                                                                                                                                                                                    | ArbitrumBridgeReceiver (Mainnet DAO)            |
| TimeLock                      | setPendingAdmin                       | Updates the TimeLock's admin. This can be used if the Governor contract is updated.                                                                                                                                                                                                                                                                                                                                                                       | ArbitrumBridgeReceiver (Mainnet DAO)            |
| TimeLock                      | acceptAdmin                           | Needs to be called by the new (pending) admin to accept the role.                                                                                                                                                                                                                                                                                                                                                                                         | Pending Admin                                   |
| TimeLock                      | queueTransaction                      | Queues a transaction that can be executed once a delay has passed. The current delay is 2 days. This can impact the own TimeLock's settings (change admin, set delays) or interaction with any other contract the DAO has permissions on.                                                                                                                                                                                                                 | ArbitrumBridgeReceiver (Mainnet DAO)            |
| TimeLock                      | cancelTransaction                     | Cancels a pending transaction and removes it from the queue. This allows the DAO to cancel one of its own decision before it is executed.                                                                                                                                                                                                                                                                                                                 | ArbitrumBridgeReceiver (Mainnet DAO)            |
| TimeLock                      | executeTransaction                    | Executes a transaction that was previously queued, if the corresponding delay has passed.                                                                                                                                                                                                                                                                                                                                                                 | Governor (DAO)                                  |

The permissions for all Comet contracts (USDC, WETH, wsETH, USDT, USDS) are similar and therefore only
represented once as `Comet Proxy` and `Comet Implementation`in the table above.
