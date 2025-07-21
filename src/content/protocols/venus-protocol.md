---
protocol: "venus-core"
website: "https://venus.io/"
x: "https://x.com/VenusProtocol"
github: ["https://github.com/VenusProtocol/venus-protocol#"]
defillama_slug: ["venus-core-pool"]
chain: "Binance"
stage: 0
reasons: []
risks: ["H", "H", "L", "H", "M"]
author: ["GiantDole"]
submission_date: "2025-07-02"
publish_date: "1970-01-01"
update_date: "1970-01-01"
--- 

# Summary

The Venus Protocol is a lending protocol deployed on Binance Smart Chain. Users can create lending positions by depositing BEP20 tokens or BNB in the respective lending pools. This allows them to create borrow positions for supported BEP20 tokens or BNB against their collateral. If a position becomes liquidatable, anyone can execute the liquidation for an incentive. 

The upgrades and parameter changes are protected by onchain governance of XVS holders. Any XVS holder posessing a minimum amount can create a proposal voted on by the community. If the proposal passes, it can be executed after 2 days in most cases, and 1 hour for fast track proposals accepted for certain functionalities.

# Ratings

## Chain

This report is concerned with Venus Core Protocol deployed on Binance Smart Chain (BSC). BSC achieves a *High* centralization score.

> Chain score: High

## Upgradeability

All upgradeable contracts can currently be upgraded by governance through the normal timelock which implements a delay of 2 days. 

> Upgradeability score: High 

## Parameter Changes

Venus Protocol has numerous permissioned functions that allow for parameter changes without requiring contract upgrades. These parameters can significantly impact protocol behavior and user funds.
In the tables blow, the `admin` refers to the Normal Timelock contract, while the `accessControlManager` is a granular permission contract that delegates specific rights to various roles, as detailed in the Permissions table.

### Market Parameters

| Function | Impact | Owner |
| --- | --- | --- |
| `_setCollateralFactor()` | Sets the percentage of an asset's value that can be borrowed against. Higher collateral factors increase liquidation risk for users. A malicious actor could set factors too high, causing mass liquidations, or too low, preventing efficient capital usage. | `admin`, `Multisig Critical` |
| `_setLiquidationIncentive()` | Sets the bonus liquidators receive when liquidating positions. High incentives can lead to predatory liquidations, while low incentives may prevent necessary liquidations during market stress. | `admin` |
| `_setMarketBorrowCaps()` | Limits how much can be borrowed from a market. Setting caps too low could prevent legitimate borrowing, while removing caps could allow excessive borrowing that threatens protocol solvency. | `admin`, `Multisig Critical` |
| `_setMarketSupplyCaps()` | Limits how much can be supplied to a market. Low caps restrict capital inflows, while removing caps on risky assets could concentrate too much risk in the protocol. | `admin`, `Multisig Critical` |
| `_setReserveFactor()` | Determines what percentage of interest goes to protocol reserves. High reserve factors reduce user yield, while low factors may not build sufficient protocol reserves for emergencies. | `accessControlManager` |
| `_setInterestRateModel()` | Changes how interest rates respond to utilization. An exploitative model could set rates unfavorably for borrowers or lenders, redirecting value unfairly. | `accessControlManager` |

### Protocol Control

| Function | Impact | Owner |
| --- | --- | --- |
| `_setActionsPaused()` | Pauses specific actions (supply, borrow, etc.) for individual markets. This can prevent users from accessing their funds or managing positions during critical market events. | `admin`, `Pause Guardian` |
| `_setProtocolPaused()` | Pauses all protocol operations. While useful in emergencies, it completely blocks user access to their funds until unpaused. | `admin`, `Pause Guardian` |
| `_setForcedLiquidation()` | Enables forced liquidations for a market regardless of health factor. This could be used to liquidate healthy positions, stealing user collateral through forced liquidations. | `accessControlManager` |
| `_setForcedLiquidationForUser()` | Enables forced liquidations for a specific user. This could be used to target and liquidate specific users even if their positions are healthy. | `accessControlManager` |
| `_supportMarket()` | Adds new markets to the protocol. Adding unsafe or malicious tokens could introduce systemic risk to the entire protocol. | `admin` |
| `unlistMarket()` | Removes markets from the protocol. This could force users to repay loans or withdraw funds from deprecated markets, potentially at unfavorable times. | `accessControlManager` |

### Oracle and Price Feed Control

| Function | Impact | Owner |
| --- | --- | --- |
| `_setPriceOracle()` | Changes the oracle contract used for asset pricing. A malicious oracle could manipulate prices to force unfair liquidations or enable exploitative borrowing. | `admin` |
| `setTokenConfig()` | Sets oracle configuration for assets. Misconfigured oracles could lead to incorrect pricing, enabling exploits or causing unfair liquidations. | `accessControlManager` |
| `setOracle()` | Changes individual oracle feeds. Replacing reliable oracles with manipulated ones could enable price exploitation. | `accessControlManager` |
| `enableOracle()` | Enables/disables specific oracle feeds. Disabling reliable oracles could force fallback to less secure price sources. | `accessControlManager` |
| `pause()/unpause()` | Pauses the entire oracle system. This would freeze all protocol operations requiring price data, effectively locking user funds. | `accessControlManager` |

### Reward and Token Management

| Function | Impact | Owner |
| --- | --- | --- |
| `_setVenusSpeeds()` | Sets emission rates for XVS rewards. Manipulating these rates could unfairly distribute incentives or suddenly reduce expected yields for users. | `admin` |
| `_grantXVS()` | Directly grants XVS tokens to recipients. Could be used to mint rewards to insiders or malicious addresses, diluting token value. | `admin` |
| `seizeVenus()` | Allows seizing XVS from any address. This function could be used to confiscate user tokens without justification. | `accessControlManager` |
| `setRewardAmountPerBlockOrSecond()` | Changes reward distribution rates in the XVS Vault. Sudden changes could significantly impact expected yields for stakers. | `accessControlManager` |

### Liquidation Controls

| Function | Impact | Owner |
| --- | --- | --- |
| `restrictLiquidation()` | Toggles whether liquidations are restricted to an allowlist. This could centralize liquidations to preferred parties, preventing fair market access. | `accessControlManager` |
| `addToAllowlist()` | Adds addresses to the liquidator allowlist. Selective allowlisting could give unfair advantages to certain liquidators. | `accessControlManager` |
| `setTreasuryPercent()` | Sets percentage of liquidation proceeds going to treasury. High percentages reduce liquidator incentives, potentially slowing necessary liquidations. | `accessControlManager` |
| `setMinLiquidatableVAI()` | Sets minimum VAI debt that can be liquidated. Setting this too high could prevent small position liquidations, increasing protocol risk. | `accessControlManager` |

### VAI Stablecoin Parameters

| Function | Impact | Owner |
| --- | --- | --- |
| `setBaseRate()` | Sets base interest rate for VAI minting. High rates could make VAI uncompetitive, while low rates might not adequately compensate for risk. | `admin`, `Fast Track Timelock` |
| `setFloatRate()` | Sets floating interest rate for VAI. Improper rates could destabilize the peg or discourage VAI usage. | `admin`, `Fast Track Timelock` |
| `setMintCap()` | Sets maximum total supply for VAI. Setting this to zero would halt all new VAI minting, while excessive caps could lead to oversupply. | `admin`, `Fast Track Timelock` |
| `toggleOnlyPrimeHolderMint()` | Restricts VAI minting to only Prime token holders. This could suddenly prevent most users from minting VAI, centralizing control. | `accessControlManager` |

All these parameter changes can be executed without changing contract bytecode but still significantly impact protocol behavior and user funds. The most critical parameters are controlled by the Normal Timelock (admin) with a 48-hour delay, while some parameters can be adjusted more quickly through the Fast Track Timelock or security multisigs. This creates a centralized control structure where governance has extensive power to alter protocol behavior in ways that could potentially harm users.

## Autonomy

The oracle risk is mitigated by integrating several oracles per asset. Only if two of three oracles return a price within the accepted boundaries, the price will be accepted. Otherwise, the transaction reverts.

> Autonomy score: Low

## Exit Window

The upgradeability score is High and most permissions are protected with an exit window of 2 days, while some can be changed within 1 hour.

> Exit Window score: High

## Accessibility

The Venus Protocol frontend is open source and can be self-hosted. The repo can be found [here](https://github.com/VenusProtocol/venus-protocol-interface). No wallets or alternative interfaces were found that offer full integration, although some staking positions can be managed, e.g., through the Bitget wallet.

> Accessibility score: Medium

## Conclusion
The Venus protocol achieves High centralization risk scores for its Upgradeability, Chain and Exit Window dimensions. Due to the High centralization risk of the Binance Smart Chain, it ranks Stage 0.

The protocol could reach Stage 1 by deploying on a more decentralized chain of stage 1.

The project additionally could advance to Stage 2 if
1) multiple different user interfaces existed
2) the ability to upgrade contracts was removed OR the timelock delay to upgrade contracts was at least 30 days
3) the protocol was deployed on a more decentralized chain of stage 2.

# Reviewer's Notes

The analysis focuses on the core risks associated with lending, liquidations, and centralized control within the main protocol. It does not extend to a full risk analysis of newer, more complex additions like the **Prime Token program** or the **cross-chain governance and token wrapping functionalities** (`XVSBridgeAdmin`, `XVSProxyOFTSrc`). These systems introduce their own unique economic and smart contract risks that are beyond the scope of this core protocol review.

A unique architectural feature is the `Comptroller`'s use of the **Diamond Standard (EIP-2535)**, where logic is delegated to multiple `Facet` contracts. This allows for more granular and potentially safer upgrades compared to monolithic proxy upgrades, as changes can be isolated to specific facets of the protocol's logic.


# Protocol Analysis

In this section, the Venus Protocol will be analyzed in its following components: The core lending protocol, the incentive mechansim, and the treasury. The governance structure will be analyzed in the subsequent section.

## Core Lending

The core lending components consist of the `Comptroller` and `VToken` contracts. The `Comptroller` is a proxy contracts that delegates calls to one of four `Facet` contracts, which are generally resposible for managing all lending markets: 
- `MarketFacet`: responsible for market management like entering / exiting markets and listings
- `PolicyFacet`: enforces policies for minting, borrowing, liquidating, etc.
- `RewardFacet`: distributes the XVS rewards
- `SetterFacet`: contains admin functions for setting protocol parameters

Each `Facet` can be individually upgraded through the `Comptroller` and are abstracted away in the displayed diagram.  
For each market, one `VToken` contract is deployed which contains all the functionalities for supplying, borrowing, and liquidating the respective asset. s

![Venus Core Lending](./diagrams/venus_lending_core.png)

## Incentives

The `RewardFacet`, which is part of the `Comptroller` Diamond Proxy structure, is responsible for distributing rewards. Users can call the `claimVenus()` function to claim the `XVS` accrued from supplying and borrowing accross all markets. For each market, two parameters can be set that define the reward per block for borrowing and supplying activities, respectively. 
Furthermore, users can stake their `XVS` in the `XVSVault` for additional `XVS` yield.

## Treasury

A fraction ( `reserveFactor`) of the borrower interest paid is automatically added to the venus protocol `reserve`. The reserves are stored in the individual `vToken` contracts and are managed by the `Comptroller`. 
The reserves are collected to the treasury through the `_reduceReserves()` function of each `vToken` contract. Once the reserves are in the treasury, governance can vote on proposals to spend the treasury.

# Dependencies

The Venus Protocol implements a three oracle system where the price of at least two of those oracles are compared to each other. If the price diversion between those oracle feeds is above or below a defined threshold, the transaction will revert. The transaction will also revert if two of the three oracles return invalid values.

Venus currently supports the following oracles: Chainlink, RedStone, Pyth, TWAP (PancakeSwap), and Binance Oracle. For any asset pool, the three oracles as well as the threshold boundaries are individually configured. These configs can only be set and changed by the governance.

# Governance

Venus protocol utilized Compound's `Governor Bravo` framework to implement their governance structure. 
Any privileged access roles in the entire protocol are either directly or indirectly controlled by the governance. A three-tiered timelock structure is implemented for different proposal urgencies that can be specified in the proposal. However, only the `Normal Timelock` and `Fast Timelock` contracts are currently utilized. The `Normal Timelock` is configured as the `admin` of all contracts with such a privileged role, while the `Fast Timelock` has specific access rights through the `accessControlManager`.
While their configuration can change, these timelock contracts are currently configured as follows:
* `Normal Timelock`:
   * `votingDelay`: 1 block
   * `votingPeriod`: 57600 blocks
   * `proposalThreshold` : 300,000 XVS
   * `timelock delay`: 48 hours
* `Fast Timelock`:
   * `votingDelay`: 1 block
   * `votingPeriod`: 57600 blocks
   * `proposalThreshold` : 300,000 XVS
   * `timelock delay`: 1 hour
* `Critical Timelock` (currently unused):
   * `votingDelay`: 1 block
   * `votingPeriod`: 14400 blocks
   * `proposalThreshold` : 300,000 XVS
   * `timelock delay`: 1 hour

The governance process is as follows:
1. *Proposal Creation*: A user with enough `XVS` creates a proposal with a set of transactions to execute and the timelock to be used. Dependent on the chosen timelock, the timelock parameters change as outlined above.
2. *Voting*: In the timelock-dependent `votingPeriod`, `XVS` holders can vote. To be successful, a minimum number of votes must be cast and the majority of votes needs to vote `For` the proposal.
3. *Timelock Queuing*: The passed proposal is sent to the respective timelock contract.
4. *Execution*: Anyone can execute the set of transactions after the respective `timelock delay` has passed.

In the following diagram, the governance structure is outlined while abstracting the specific permissioned contract. Specific functions, as outlined in the Permissions section, will query the `accessControlManager` to authorize transactions.

![Venus Governance](./diagrams/venus_governance.png)

## Security Council

The Venus Protocol has deployed three Gnosis Safe contracts, which are currently 3/6 multisigs. Neither of these contracts currently adhere to the minimum requirements for a secure council.
The security council contracts serve the purpose of executing functionalities in the case of an emergency, in which it would not be feasible to wait for a proposal to pass and the timelock delay. Nevertheless, the granted access rights are limited and can always be assigned or revoked by the governance structure. 
The security councils can be given access rights to specific functions by the protocol governance through the `accessControlManager` contract. 

| Name          | Account                                     | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------- | ------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| Multisig Critical | [0x7B1AE5Ea599bC56734624b95589e7E8E64C351c9](https://bscscan.com/address/0x7B1AE5Ea599bC56734624b95589e7E8E64C351c9) | Multisig 3/6 | ❌          | ❌              | ❌                | ❌             |
| Pause Guardian | [0x1C2CAc6ec528c20800B2fe734820D87b581eAA6B](https://bscscan.com/address/0x1C2CAc6ec528c20800B2fe734820D87b581eAA6B) | Multisig 3/6 | ❌          | ❌              | ❌                | ❌             |
| Treasury Guardian | [0x3a3284dC0FaFfb0b5F0d074c4C704D14326C98cF](https://bscscan.com/address/0x3a3284dC0FaFfb0b5F0d074c4C704D14326C98cF) | Multisig 3/6 | ❌          | ❌              | ❌                | ❌             |

## Upgrade Process

The upgrade process for the Venus Protocol is comprehensive and managed entirely by onchain governance. The upgrade process can be split into two distinct categories: parameter changes and contract logic upgrades.

### Parameter Changes
Parameter changes are executed by calling privileged functions on various protocol contracts. Control over these functions is managed through a multi-layered permissions structure:
1.  **Direct `admin` Control**: The most critical parameters are directly alterable by the `admin` role, which is the `Normal Timelock` contract (48-hour delay).
2.  **Access Control Manager (`ACM`)**: Most parameters are owned by the `AccessControlManager` contract. This contract grants specific permissions to different roles, enabling fine-grained control. For instance:
    *   The `Normal Timelock` is granted permission for significant but non-emergency changes.
    *   The `Fast Track Timelock` (1-hour delay) is granted permission for less critical or more urgent parameter updates (e.g., VAI interest rates).
    *   Emergency multisigs like `Pause Guardian` and `Multisig Critical` are granted access to functions that pause the protocol or adjust critical risk parameters during emergencies, bypassing the standard governance process.

### Contract Upgrades (Code Changes)
Upgrades to the smart contract logic itself also follow the governance process, primarily through the `Normal Timelock` (48-hour delay). Venus employs two main upgrade patterns:

1.  **Diamond Proxy (`Comptroller`)**: The main `Comptroller` is a Diamond Proxy. Upgrades are performed via `diamondCut` proposals, which allow governance to add, replace, or remove individual `Facets` (e.g., `PolicyFacet`, `RewardFacet`). This modularity allows for isolated changes without redeploying the entire `Comptroller`.
2.  **Beacon Proxies (`VTokens`)**: The markets (`VToken` contracts) are deployed as proxies pointing to a central `UpgradeableBeacon`. To upgrade all markets at once, a governance proposal simply needs to change the implementation contract address within the beacon. This single transaction atomically upgrades the logic for all `VToken` contracts.

# Contracts & Permissions

## Contracts

| Contract Name | Address                                     |
| ------------- | ------------------------------------------- |
| Comptroller (Proxy)   | [0xfD36E2c2a6789Db23113685031d7F16329158384](https://bscscan.com/address/0xfD36E2c2a6789Db23113685031d7F16329158384) |
| Diamond    | [0x347ba9559fFC65A94af0F6a513037Cd4982b7b18](https://bscscan.com/address/0x347ba9559fFC65A94af0F6a513037Cd4982b7b18) |
| MarketFacet    | [0x4b093a3299F39615bA6b34B7897FDedCe7b83D63](https://bscscan.com/address/0x4b093a3299F39615bA6b34B7897FDedCe7b83D63) |
| PolicyFacet    | [0x93e7Ff7c87B496aE76fFb22d437c9d46461A9B51](https://bscscan.com/address/0x93e7Ff7c87B496aE76fFb22d437c9d46461A9B51) |
| RewardFacet    | [0xc2F6bDCEa4907E8CB7480d3d315bc01c125fb63C](https://bscscan.com/address/0xc2F6bDCEa4907E8CB7480d3d315bc01c125fb63C) |
| SetterFacet    | [0x9B0D9D7c50d90f23449c4BbCAA671Ce7cd19DbCf](https://bscscan.com/address/0x9B0D9D7c50d90f23449c4BbCAA671Ce7cd19DbCf) |
| VenusLens    | [0xe4C455cBf870A86399043B8A36A669FfA1583e95](https://bscscan.com/address/0xe4C455cBf870A86399043B8A36A669FfA1583e95) |
| ResilientOracle (Proxy)  | [0x6592b5DE802159F3E74B2486b091D11a8256ab8A](https://bscscan.com/address/0x6592b5DE802159F3E74B2486b091D11a8256ab8A) |
| ResilientOracle    | [0xb5d7a073d77102ad56b7482b18e7204c1a71c8b9](https://bscscan.com/address/0xb5d7a073d77102ad56b7482b18e7204c1a71c8b9) |
| AccessControlManager    | [0x4788629ABc6cFCA10F9f969efdEAa1cF70c23555](https://bscscan.com/address/0x4788629ABc6cFCA10F9f969efdEAa1cF70c23555) |
| PoolRegistry (Proxy)                                                   | [0x9F7b01A536aFA00EF10310A162877fd792cD0666](https://bscscan.com/address/0x9F7b01A536aFA00EF10310A162877fd792cD0666) |
| PoolRegistry (Implementation)                                          | [0xc4953e157d057941a9a71273b0af4d4477ed2770](https://bscscan.com/address/0xc4953e157d057941a9a71273b0af4d4477ed2770) |
| PoolLens                                                               | [0x0461c613433d42C06831C8e60Bf0C86FC9495072](https://bscscan.com/address/0x0461c613433d42C06831C8e60Bf0C86FC9495072) |
| ProxyAdmin                                                             | [0x6beb6D2695B67FEb73ad4f172E8E2975497187e4](https://bscscan.com/address/0x6beb6D2695B67FEb73ad4f172E8E2975497187e4) |
| UpgradeableBeacon (Comptroller Beacon) (Core Pool)                     | [0x38B4Efab9ea1bAcD19dC81f19c4D1C2F9DeAe1B2](https://bscscan.com/address/0x38B4Efab9ea1bAcD19dC81f19c4D1C2F9DeAe1B2) |
| Unitroller (Comptroller) (Core Pool)                                   | [0xfD36E2c2a6789Db23113685031d7F16329158384](https://bscscan.com/address/0xfD36E2c2a6789Db23113685031d7F16329158384) |
| UpgradeableBeacon (VToken) (Core Pool)                                 | [0x2b8A1C539ABaC89CbF7E2Bc6987A0A38A5e660D4](https://bscscan.com/address/0x2b8A1C539ABaC89CbF7E2Bc6987A0A38A5e660D4) |
| SwapRouter (Core Pool)                                                 | [0x8938E6dA30b59c1E27d5f70a94688A89F7c815a4](https://bscscan.com/address/0x8938E6dA30b59c1E27d5f70a94688A89F7c815a4) |
| VBep20Delegator (Proxy) (vAAVE) (Core Pool)                            | [0x26DA28954763B92139ED49283625ceCAf52C6f94](https://bscscan.com/address/0x26DA28954763B92139ED49283625ceCAf52C6f94) |
| VBep20Delegator (Proxy) (vADA) (Core Pool)                             | [0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec](https://bscscan.com/address/0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec) |
| VBep20Delegator (Proxy) (vBCH) (Core Pool)                             | [0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176](https://bscscan.com/address/0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176) |
| VBep20Delegator (Proxy) (vBETH) (Core Pool)                            | [0x972207A639CC1B374B893cc33Fa251b55CEB7c07](https://bscscan.com/address/0x972207A639CC1B374B893cc33Fa251b55CEB7c07) |
| VBep20Delegator (Proxy) (vBNB) (Core Pool)                             | [0xA07c5b74C9B40447a954e1466938b865b6BBea36](https://bscscan.com/address/0xA07c5b74C9B40447a954e1466938b865b6BBea36) |
| VBep20Delegator (Proxy) (vBTC) (Core Pool)                             | [0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B](https://bscscan.com/address/0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B) |
| VBep20Delegator (Proxy) (vBUSD) (Core Pool)                            | [0x95c78222B3D6e262426483D42CfA53685A67Ab9D](https://bscscan.com/address/0x95c78222B3D6e262426483D42CfA53685A67Ab9D) |
| VBep20Delegator (Proxy) (vCAKE) (Core Pool)                            | [0x86aC3974e2BD0d60825230fa6F355fF11409df5c](https://bscscan.com/address/0x86aC3974e2BD0d60825230fa6F355fF11409df5c) |
| VBep20Delegator (Proxy) (vDAI) (Core Pool)                             | [0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1](https://bscscan.com/address/0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1) |
| VBep20Delegator (Proxy) (vDOGE) (Core Pool)                            | [0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71](https://bscscan.com/address/0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71) |
| VBep20Delegator (Proxy) (vDOT) (Core Pool)                             | [0x1610bc33319e9398de5f57B33a5b184c806aD217](https://bscscan.com/address/0x1610bc33319e9398de5f57B33a5b184c806aD217) |
| VBep20Delegator (Proxy) (vETH) (Core Pool)                             | [0xf508fCD89b8bd15579dc79A6827cB4686A3592c8](https://bscscan.com/address/0xf508fCD89b8bd15579dc79A6827cB4686A3592c8) |
| VBep20Delegator (Proxy) (vFDUSD) (Core Pool)                           | [0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba](https://bscscan.com/address/0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba) |
| VBep20Delegator (Proxy) (vFIL) (Core Pool)                             | [0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343](https://bscscan.com/address/0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343) |
| VBep20Delegator (Proxy) (vLINK) (Core Pool)                            | [0x650b940a1033B8A1b1873f78730FcFC73ec11f1f](https://bscscan.com/address/0x650b940a1033B8A1b1873f78730FcFC73ec11f1f) |
| VBep20Delegator (Proxy) (vlisUSD) (Core Pool)                          | [0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab](https://bscscan.com/address/0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab) |
| VBep20Delegator (Proxy) (vLTC) (Core Pool)                             | [0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B](https://bscscan.com/address/0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B) |
| VBep20Delegator (Proxy) (vLUNA) (Core Pool)                            | [0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8](https://bscscan.com/address/0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8) |
| VBep20Delegator (Proxy) (vMATIC) (Core Pool)                           | [0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8](https://bscscan.com/address/0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8) |
| VBep20Delegator (Proxy) (vSOL) (Core Pool)                             | [0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC](https://bscscan.com/address/0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC) |
| VBep20Delegator (Proxy) (vSolvBTC) (Core Pool)                         | [0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea](https://bscscan.com/address/0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea) |
| VBep20Delegator (Proxy) (vSXP) (Core Pool)                             | [0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0](https://bscscan.com/address/0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0) |
| VBep20Delegator (Proxy) (vTHE) (Core Pool)                             | [0x86e06EAfa6A1eA631Eab51DE500E3D474933739f](https://bscscan.com/address/0x86e06EAfa6A1eA631Eab51DE500E3D474933739f) |
| VBep20Delegator (Proxy) (vTRX) (Core Pool)                             | [0xC5D3466aA484B040eE977073fcF337f2c00071c1](https://bscscan.com/address/0xC5D3466aA484B040eE977073fcF337f2c00071c1) |
| VBep20Delegator (Proxy) (vTRXOLD) (Core Pool)                          | [0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93](https://bscscan.com/address/0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93) |
| VBep20Delegator (Proxy) (vTUSD) (Core Pool)                            | [0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E](https://bscscan.com/address/0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E) |
| VBep20Delegator (Proxy) (vTUSDOLD) (Core Pool)                         | [0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3](https://bscscan.com/address/0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3) |
| VBep20Delegator (Proxy) (vTWT) (Core Pool)                             | [0x4d41a36D04D97785bcEA57b057C412b278e6Edcc](https://bscscan.com/address/0x4d41a36D04D97785bcEA57b057C412b278e6Edcc) |
| VBep20Delegator (Proxy) (vUNI) (Core Pool)                             | [0x27FF564707786720C71A2e5c1490A63266683612](https://bscscan.com/address/0x27FF564707786720C71A2e5c1490A63266683612) |
| VBep20Delegator (Proxy) (vUSDC) (Core Pool)                            | [0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8](https://bscscan.com/address/0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8) |
| VBep20Delegator (Proxy) (vUSDT) (Core Pool)                            | [0xfD5840Cd36d94D7229439859C0112a4185BC0255](https://bscscan.com/address/0xfD5840Cd36d94D7229439859C0112a4185BC0255) |
| VBep20Delegator (Proxy) (vUST) (Core Pool)                             | [0x78366446547D062f45b4C0f320cDaa6d710D87bb](https://bscscan.com/address/0x78366446547D062f45b4C0f320cDaa6d710D87bb) |
| VBep20Delegator (Proxy) (vWBETH) (Core Pool)                           | [0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0](https://bscscan.com/address/0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0) |
| VBep20Delegator (Proxy) (vXRP) (Core Pool)                             | [0xB248a295732e0225acd3337607cc01068e3b9c10](https://bscscan.com/address/0xB248a295732e0225acd3337607cc01068e3b9c10) |
| VBep20Delegator (Proxy) (vXVS) (Core Pool)                             | [0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D](https://bscscan.com/address/0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D) |
| VBep20Delegate (Implementation)                                        | [0x6e5cff66c7b671fa1d5782866d80bd15955d79f6](https://bscscan.com/address/0x6e5cff66c7b671fa1d5782866d80bd15955d79f6) |
| Venus Treasury                                                         | [0xf322942f644a996a617bd29c16bd7d231d9f35e9](https://bscscan.com/address/0xf322942f644a996a617bd29c16bd7d231d9f35e9) |
| XVSVault (Proxy)                                                       | [0x051100480289e704d20e9DB4804837068f3f9204](https://bscscan.com/address/0x051100480289e704d20e9DB4804837068f3f9204) |
| XVSVault (Implementation)                                              | [0x413c1e1b77190bc84717f8cce6eeab0594e0af4e](https://bscscan.com/address/0x413c1e1b77190bc84717f8cce6eeab0594e0af4e) |
| XVS Store                                                              | [0x1e25CF968f12850003Db17E0Dba32108509C4359](https://bscscan.com/address/0x1e25CF968f12850003Db17E0Dba32108509C4359) |
| Prime (Proxy)                                                          | [0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC](https://bscscan.com/address/0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC) |
| Prime (Implementation)                                                 | [0x7a2e3481f345367045539896e5bf385910fb5c2c](https://bscscan.com/address/0x7a2e3481f345367045539896e5bf385910fb5c2c) |
| PrimeLiquidityProvider (Proxy)                                         | [0x23c4F844ffDdC6161174eB32c770D4D8C07833F2](https://bscscan.com/address/0x23c4F844ffDdC6161174eB32c770D4D8C07833F2) |
| PrimeLiquidityProvider (Implementation)                                | [0x208068ae8a619fcc851659791659b1aa40d796da](https://bscscan.com/address/0x208068ae8a619fcc851659791659b1aa40d796da) |
| Liquidator (Proxy)                                                     | [0x0870793286aaDA55D39CE7f82fb2766e8004cF43](https://bscscan.com/address/0x0870793286aaDA55D39CE7f82fb2766e8004cF43) |
| Liquidator (Implementation)                                            | [0xe26ce9b5fdd602225cccc4cef7fae596dcf2a965](https://bscscan.com/address/0xe26ce9b5fdd602225cccc4cef7fae596dcf2a965) |
| PegStability (Proxy)                                                   | [0xC138aa4E424D1A8539e8F38Af5a754a2B7c3Cc36](https://bscscan.com/address/0xC138aa4E424D1A8539e8F38Af5a754a2B7c3Cc36) |
| PegStability (Implementation)                                          | [0x9664568e5131e85f67d87fcd55b249f5d25fa43e](https://bscscan.com/address/0x9664568e5131e85f67d87fcd55b249f5d25fa43e) |
| ProtocolShareReserve (Proxy)                                           | [0xCa01D5A9A248a830E9D93231e791B1afFed7c446](https://bscscan.com/address/0xCa01D5A9A248a830E9D93231e791B1afFed7c446) |
| ProtocolShareReserve (Implementation)                                  | [0x86a2a5eb77984e923e7b5af45819a8c8f870f061](https://bscscan.com/address/0x86a2a5eb77984e923e7b5af45819a8c8f870f061) |
| RiskFund (Proxy)                                                       | [0xdF31a28D68A2AB381D42b380649Ead7ae2A76E42](https://bscscan.com/address/0xdF31a28D68A2AB381D42b380649Ead7ae2A76E42) |
| RiskFundV2 (Implementation)                                            | [0x7ef5abbcc9a701e728beb7afd4fb5747fab15a28](https://bscscan.com/address/0x7ef5abbcc9a701e728beb7afd4fb5747fab15a28) |
| Shortfall (Proxy)                                                      | [0xf37530A8a810Fcb501AA0Ecd0B0699388F0F2209](https://bscscan.com/address/0xf37530A8a810Fcb501AA0Ecd0B0699388F0F2209) |
| Shortfall (Implementation)                                             | [0x916e607af3250ecb2fd4ea82a37eb2756a20e1fc](https://bscscan.com/address/0x916e607af3250ecb2fd4ea82a37eb2756a20e1fc) |
| VAI Unitroller                                                         | [0x004065D34C6b18cE4370ced1CeBDE94865DbFAFE](https://bscscan.com/address/0x004065D34C6b18cE4370ced1CeBDE94865DbFAFE) |
| VAIVaultProxy                                                          | [0x0667Eed0a0aAb930af74a3dfeDD263A73994f216](https://bscscan.com/address/0x0667Eed0a0aAb930af74a3dfeDD263A73994f216) |
| VAIVault                                                               | [0xa52f2a56abb7cbdd378bc36c6088fafeaf9ac423](https://bscscan.com/address/0xa52f2a56abb7cbdd378bc36c6088fafeaf9ac423) |
| VBNBAdmin (Proxy)                                                      | [0x9A7890534d9d91d473F28cB97962d176e2B65f1d](https://bscscan.com/address/0x9A7890534d9d91d473F28cB97962d176e2B65f1d) |
| VBNBAdmin (Implementation)                                             | [0xaa8d9558d8d45666552a72cecbdd0a746aeacdc9](https://bscscan.com/address/0xaa8d9558d8d45666552a72cecbdd0a746aeacdc9) |
| BinanceOracle (Proxy)                                                  | [0x594810b741d136f1960141C0d8Fb4a91bE78A820](https://bscscan.com/address/0x594810b741d136f1960141C0d8Fb4a91bE78A820) |
| BinanceOracle (Implementation)                                         | [0x8bf46792022126ae7f3ac8f4914ed66e7deb7388](https://bscscan.com/address/0x8bf46792022126ae7f3ac8f4914ed66e7deb7388) |
| BoundValidator (Proxy)                                                 | [0x6E332fF0bB52475304494E4AE5063c1051c7d735](https://bscscan.com/address/0x6E332fF0bB52475304494E4AE5063c1051c7d735) |
| BoundValidator (Implementation)                                        | [0xcf0612ceafd63709d8f7efe71ecd0aabf075f6b1](https://bscscan.com/address/0xcf0612ceafd63709d8f7efe71ecd0aabf075f6b1) |
| ChainlinkOracle (Proxy)                                                | [0x1B2103441A0A108daD8848D8F5d790e4D402921F](https://bscscan.com/address/0x1B2103441A0A108daD8848D8F5d790e4D402921F) |
| ChainlinkOracle (Implementation)                                       | [0x38120f83734f719dc199109e09a822a80cd26ead](https://bscscan.com/address/0x38120f83734f719dc199109e09a822a80cd26ead) |
| RedstoneOracle (Proxy)                                                 | [0x8455EFA4D7Ff63b8BFD96AdD889483Ea7d39B70a](https://bscscan.com/address/0x8455EFA4D7Ff63b8BFD96AdD889483Ea7d39B70a) |
| RedstoneOracle (Implementation) (same implementation as for Chainlink) | [0x1338738c0ca76824a47b325d1494373dce7e13d6](https://bscscan.com/address/0x1338738c0ca76824a47b325d1494373dce7e13d6) |
| Resilient Oracle (Proxy)                                               | [0x6592b5DE802159F3E74B2486b091D11a8256ab8A](https://bscscan.com/address/0x6592b5DE802159F3E74B2486b091D11a8256ab8A) |
| Resilient Oracle (Implementation)                                      | [0xb5d7a073d77102ad56b7482b18e7204c1a71c8b9](https://bscscan.com/address/0xb5d7a073d77102ad56b7482b18e7204c1a71c8b9) |
| AnkrBNBOracle (Proxy)                                                  | [0xb0FCf0d45C15235D4ebC30d3c01d7d0D72Fd44AB](https://bscscan.com/address/0xb0FCf0d45C15235D4ebC30d3c01d7d0D72Fd44AB) |
| AnkrBNBOracle (Implementation)                                         | [0x74080f4cfa35d10a4af7b8057bada1c3b630170d](https://bscscan.com/address/0x74080f4cfa35d10a4af7b8057bada1c3b630170d) |
| BNBxOracle (Proxy)                                                     | [0x94f30dC18D12C210E5ae32752B1033afdd89D5DB](https://bscscan.com/address/0x94f30dC18D12C210E5ae32752B1033afdd89D5DB) |
| BNBxOracle (Implementation)                                            | [0x49ba22665d598634837344c832c327593817832c](https://bscscan.com/address/0x49ba22665d598634837344c832c327593817832c) |
| SlisBNBOracle (Proxy)                                                  | [0xfE54895445eD2575Bf5386B90FFB098cBC5CA29A](https://bscscan.com/address/0xfE54895445eD2575Bf5386B90FFB098cBC5CA29A) |
| SlisBNBOracle (Implementation)                                         | [0x7ac3dc7bd02c89bca06307406d78a75867f4c048](https://bscscan.com/address/0x7ac3dc7bd02c89bca06307406d78a75867f4c048) |
| AsBNBOracle (Proxy)                                                    | [0x52375ACab348Fa3979503EB9ADB11D74560dEe99](https://bscscan.com/address/0x52375ACab348Fa3979503EB9ADB11D74560dEe99) |
| AsBNBOracle (Implementation)                                           | [0xe055cabf9af41a9ff3d87ff22b589a0b3f7de4a0](https://bscscan.com/address/0xe055cabf9af41a9ff3d87ff22b589a0b3f7de4a0) |
| StkBNBOracle (Proxy)                                                   | [0xdBAFD16c5eA8C29D1e94a5c26b31bFAC94331Ac6](https://bscscan.com/address/0xdBAFD16c5eA8C29D1e94a5c26b31bFAC94331Ac6) |
| StkBNBOracle (Implementation)                                          | [0xa7c432c50d310c805c8342488921a108b585397f](https://bscscan.com/address/0xa7c432c50d310c805c8342488921a108b585397f) |
| WBETHOracle (Proxy)                                                    | [0x739db790c656E54590957Ed4d6B94665bCcb3456](https://bscscan.com/address/0x739db790c656E54590957Ed4d6B94665bCcb3456) |
| WBETHOracle (Implementation)                                           | [0x9c79160d3adf2436ce37379186da37f2d3bbf92a](https://bscscan.com/address/0x9c79160d3adf2436ce37379186da37f2d3bbf92a) |
| DefaultProxyAdmin                                                      | [0x1BB765b741A5f3C2A338369DAb539385534E3343](https://bscscan.com/address/0x1BB765b741A5f3C2A338369DAb539385534E3343) |
| OneJumpOracle (Proxy) (wstETH/ETH/USD) (Chainlink)                     | [0x3C9850633e8Cb5ac5c3Da833C947E7c91EED15C4](https://bscscan.com/address/0x3C9850633e8Cb5ac5c3Da833C947E7c91EED15C4) |
| OneJumpOracle (Implementation) (wstETH/ETH/USD) (Chainlink)            | [0x9e1693008544d815692c20961376d78d51015c96](https://bscscan.com/address/0x9e1693008544d815692c20961376d78d51015c96) |
| OneJumpOracle (Proxy) (wstETH/ETH/USD) (Redstone)                      | [0x90dd7ae1137cC072F7740Ee0b264f2351515B98A](https://bscscan.com/address/0x90dd7ae1137cC072F7740Ee0b264f2351515B98A) |
| OneJumpOracle (Implementation) (wstETH/ETH/USD) (Redstone)             | [0xcf56aeb81930bb4d1bd94a2381a4a3fb6b4bd44b](https://bscscan.com/address/0xcf56aeb81930bb4d1bd94a2381a4a3fb6b4bd44b) |
| OneJumpOracle (Proxy) (weETH/ETH/USD) (Chainlink)                      | [0x3b3241698692906310A65ACA199701843404E175](https://bscscan.com/address/0x3b3241698692906310A65ACA199701843404E175) |
| OneJumpOracle (Implementation) (weETH/ETH/USD) (Chainlink)             | [0x157fb3dfe0bd5569cc25dc79ae195e82a3eb6855](https://bscscan.com/address/0x157fb3dfe0bd5569cc25dc79ae195e82a3eb6855) |
| OneJumpOracle (Proxy) (weETH/ETH/USD) (Redstone)                       | [0xb661102c399630420A4B9fa0a5cF57161e5452F5](https://bscscan.com/address/0xb661102c399630420A4B9fa0a5cF57161e5452F5) |
| OneJumpOracle (Implementation) (weETH/ETH/USD) (Redstone)              | [0x447fb4e894e05982ff7e150db6af4a7b7f57eedf](https://bscscan.com/address/0x447fb4e894e05982ff7e150db6af4a7b7f57eedf) |
| OneJumpOracle (Proxy) SolvBTC.BBN/BTC/USD (Redstone)                   | [0x98B9bC5a1e7E439ebEB0BEdB7e9f6b24fEc1E8B4](https://bscscan.com/address/0x98B9bC5a1e7E439ebEB0BEdB7e9f6b24fEc1E8B4) |
| OneJumpOracle (Implementation) SolvBTC.BBN/BTC/USD (Redstone)          | [0x98ed7290a3d52fa5639dd76c16ade3074ba664dd](https://bscscan.com/address/0x98ed7290a3d52fa5639dd76c16ade3074ba664dd) |
| PendleOracle (Proxy) PT-SolvBTC.BBN-27MAR2025                          | [0xE11965a3513F537d91D73d9976FBe8c0969Bb252](https://bscscan.com/address/0xE11965a3513F537d91D73d9976FBe8c0969Bb252) |
| PendleOracle (Implementation) PT-SolvBTC.BBN-27MAR2025                 | [0xd2721fb0d9f071d84b3ebfd27ab35b568b350079](https://bscscan.com/address/0xd2721fb0d9f071d84b3ebfd27ab35b568b350079) |
| PendleOracle (Proxy) PT-clisBNB-25APR2025                              | [0xEa7a92D12196A325C76ED26DBd36629d7EC46459](https://bscscan.com/address/0xEa7a92D12196A325C76ED26DBd36629d7EC46459) |
| PendleOracle (Implementation) PT-clisBNB-25APR2025                     | [0x8a183a0d35290d849e8915710d3aee7e463705e7](https://bscscan.com/address/0x8a183a0d35290d849e8915710d3aee7e463705e7) |
| Governor Bravo Delegate                                                | [0x360ac19648efc29d2b7b70bac227c35e909272fd](https://bscscan.com/address/0x360ac19648efc29d2b7b70bac227c35e909272fd) |
| Governor Bravo Delegator                                               | [0x2d56dc077072b53571b8252008c60e945108c75a](https://bscscan.com/address/0x2d56dc077072b53571b8252008c60e945108c75a) |
| Access Control Manager                                                 | [0x4788629abc6cfca10f9f969efdeaa1cf70c23555](https://bscscan.com/address/0x4788629abc6cfca10f9f969efdeaa1cf70c23555) |
| Timelock (normal)                                                      | [0x939bD8d64c0A9583A7Dcea9933f7b21697ab6396](https://bscscan.com/address/0x939bD8d64c0A9583A7Dcea9933f7b21697ab6396) |
| Timelock (fast track)                                                  | [0x555ba73dB1b006F3f2C7dB7126d6e4343aDBce02](https://bscscan.com/address/0x555ba73dB1b006F3f2C7dB7126d6e4343aDBce02) |
| Timelock (critical)                                                    | [0x213c446ec11e45b15a6E29C1C1b402B8897f606d](https://bscscan.com/address/0x213c446ec11e45b15a6E29C1C1b402B8897f606d) |
| Omnichain Proposal Sender                                              | [0x36a69dE601381be7b0DcAc5D5dD058825505F8f6](https://bscscan.com/address/0x36a69dE601381be7b0DcAc5D5dD058825505F8f6) |
| XVSBridgeAdmin (Proxy)                                                 | [0x70d644877b7b73800E9073BCFCE981eAaB6Dbc21](https://bscscan.com/address/0x70d644877b7b73800E9073BCFCE981eAaB6Dbc21) |
| XVSBridgeAdmin (Implementation)                                        | [0xb085926fa310b4af85b499162b96e30e5c0e6fac](https://bscscan.com/address/0xb085926fa310b4af85b499162b96e30e5c0e6fac) |
| XVSProxyOFTSrc                                                         | [0xf8F46791E3dB29a029Ec6c9d946226f3c613e854](https://bscscan.com/address/0xf8F46791E3dB29a029Ec6c9d946226f3c613e854) |
| XVS                                                                    | [0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63](https://bscscan.com/address/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63) |
| RiskFundConverter (Proxy)                                              | [0xA5622D276CcbB8d9BBE3D1ffd1BB11a0032E53F0](https://bscscan.com/address/0xA5622D276CcbB8d9BBE3D1ffd1BB11a0032E53F0) |
| RiskFundConverter (Implementation)                                     | [0xd420bf9c31f6b4a98875b6e561b13acb19210647](https://bscscan.com/address/0xd420bf9c31f6b4a98875b6e561b13acb19210647) |
| XVSVaultTreasury (Proxy)                                               | [0x269ff7818DB317f60E386D2be0B259e1a324a40a](https://bscscan.com/address/0x269ff7818DB317f60E386D2be0B259e1a324a40a) |
| XVSVaultTreasury (Implementation)                                      | [0xa95a4f34337d8fac283c3e3d2a605b95da916cd6](https://bscscan.com/address/0xa95a4f34337d8fac283c3e3d2a605b95da916cd6) |
| SingleTokenConverterBeacon                                             | [0x4c9D57b05B245c40235D720A5f3A592f3DfF11ca](https://bscscan.com/address/0x4c9D57b05B245c40235D720A5f3A592f3DfF11ca) |
| BeaconProxy (USDTPrimeConverter)                                       | [0xD9f101AA67F3D72662609a2703387242452078C3](https://bscscan.com/address/0xD9f101AA67F3D72662609a2703387242452078C3) |
| BeaconProxy USDCPrimeConverter                                         | [0xa758c9C215B6c4198F0a0e3FA46395Fa15Db691b](https://bscscan.com/address/0xa758c9C215B6c4198F0a0e3FA46395Fa15Db691b) |
| BeaconProxy BTCBPrimeConverter                                         | [0xE8CeAa79f082768f99266dFd208d665d2Dd18f53](https://bscscan.com/address/0xE8CeAa79f082768f99266dFd208d665d2Dd18f53) |
| BeaconProxy (ETHPrimeConverter)                                        | [0xca430B8A97Ea918fF634162acb0b731445B8195E](https://bscscan.com/address/0xca430B8A97Ea918fF634162acb0b731445B8195E) |
| BeaconProxy (XVSVaultConverter)                                        | [0xd5b9AE835F4C59272032B3B954417179573331E0](https://bscscan.com/address/0xd5b9AE835F4C59272032B3B954417179573331E0) |
| SingleTokenConverter (general)                                         | [0x40ed28180df01fdeb957224e4a5415704b9d5990](https://bscscan.com/address/0x40ed28180df01fdeb957224e4a5415704b9d5990) |
| ConverterNetwork (Proxy)                                               | [0xF7Caad5CeB0209165f2dFE71c92aDe14d0F15995](https://bscscan.com/address/0xF7Caad5CeB0209165f2dFE71c92aDe14d0F15995) |
| ConverterNetwork (Implementation)                                      | [0x8d17874cda682adcbcdd8eef8dfe8eeb9d4d6f8d](https://bscscan.com/address/0x8d17874cda682adcbcdd8eef8dfe8eeb9d4d6f8d) |

## All Permission Owners

| Name | Account                                     | Type         |
| ---- | ------------------------------------------- | ------------ |
| `admin` (`Timelock Normal Track`) | [0x939bD8d64c0A9583A7Dcea9933f7b21697ab6396](https://bscscan.com/address/0x939bD8d64c0A9583A7Dcea9933f7b21697ab6396) | Governance Timelock |
| `Timelock Fast Track` | [0x555ba73db1b006f3f2c7db7126d6e4343adbce02](https://bscscan.com/address/0x555ba73db1b006f3f2c7db7126d6e4343adbce02) | Governance Timelock     |
| `pauseGuardian` | [0x1C2CAc6ec528c20800B2fe734820D87b581eAA6B](https://bscscan.com/address/0x1C2CAc6ec528c20800B2fe734820D87b581eAA6B) | Multisig     |
| `treasuryGuardian` | [0x3a3284dC0FaFfb0b5F0d074c4C704D14326C98cF](https://bscscan.com/address/0x3a3284dC0FaFfb0b5F0d074c4C704D14326C98cF) | Multisig     |
| `accessControlManager` | [0x4788629abc6cfca10f9f969efdeaa1cf70c23555](https://bscscan.com/address/0x4788629abc6cfca10f9f969efdeaa1cf70c23555) | Access Manager    |


## Permissions

In the following table, the privileged roles are listed for each function with access control. Particularly, for any function that is access controlled by `accessControlManager`, the currently assigned roles are added in paranthesis. If no roles are listed, no roles are currently assigned but can be introduced by governance. These roles have not changed since Oct-26-2022 and can only be adjusted through the Governance structure.

| Contract      | Function     | Impact                                                                                                                                                                                                                                                                                                                                     | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| Comptroller Proxy | `_setPendingImplementation()` | Set a pending implementation for Comptroller (still requires activation) | `admin` |
| Comptroller Proxy | `_setPendingAdmin()` | Set a new pending `admin` (requires confirmation by proposed `admin`) | `admin` |
| SetterFacet | `_setPriceOracle()` | Changes the `ResilientOracle` contract used | `admin` |
| SetterFacet | `_setPauseGuardian()` | Transfers emergency `PauseGuardian` to new address  | `admin` |
| SetterFacet | `_setAccessControl()` | Sets a new `AccessControlManager` address  | `admin` |
| SetterFacet | `_setLiquidatorContract()` | Sets a new liquidation contract  | `admin` |
| SetterFacet | `_setCloseFactor()` | Sets maximum percentage that can be repaid in single liquidation  | `admin` |
| SetterFacet | `_setVAIController()` | Sets a new VAI controller | `admin` |
| SetterFacet | `_setVAIMintRate()` | Sets the mint rate for VAI | `admin` |
| SetterFacet | `_setVenusVAIVaultRate()` | Sets the vault rate for the Venus VAI vault | `admin` |
| SetterFacet | `_setXVSToken()` | Sets a new XVS token | `admin` |
| SetterFacet | `_setXVSVToken()` | Sets a new XVS vToken | `admin` |
| SetterFacet | `_setTreasuryData()` | Sets a new treasury address, guardian, and percentage | `admin`, `treasuryGuardian` |
| SetterFacet | `_setComptrollerLens()` | Sets a new comptroller lens | `admin` |
| SetterFacet | `_setCollateralFactor()` | Set the collateral factor across all markets   | `accessControlManager` (`admin`, `Multisig Critical`) |
| SetterFacet | `_setLiquidationIncentive()` | Set the liquidation incentive across all markets   | `accessControlManager` (`admin`) |
| SetterFacet | `_setMarketBorrowCaps()` | Sets limit on total amount that can be borrowed from a market  | `accessControlManager` (`admin`, `Multisig Critical`) |
| SetterFacet | `_setMarketSupplyCaps()` | Sets limit on total amount that can be supplied to market   | `accessControlManager` (`admin`, `Multisig Critical`) |
| SetterFacet | `_setActionsPaused()` | Pause or unpause any specific protocol action (e.g. Supply, Borrow) for any market |  `accessControlManager` (`admin`, `Pause Guardian`) |
| SetterFacet | `_setProtocolPaused()` | Pause or unpause the entire protocol |  `accessControlManager` (`admin`, `Pause Guardian`) |
| SetterFacet | `_setForcedLiquidation()` | Enable or disable forced liquidations for a market |  `accessControlManager` |
| SetterFacet | `_setForcedLiquidationForUser()` | Enable or disable forced liquidations for a user |  `accessControlManager` |
| MarketFacet | `_supportMarket()` | Add new market to the protocol | `accessControlManager` (`admin`) |
| MarketFacet | `unlistMarket()` | Remove existing market from the protocol | `accessControlManager` |
| RewardFacet | `_grantXVS()` | Directly grants a specified amount of XVS to a recipient, bypassing the normal reward accrual process. | `admin` |
| RewardFacet | `seizeVenus()` | Seize XVS from any addresses | `accessControlManager` |
| PolicyFacet | `_setVenusSpeeds()` | Sets emission rate of XVS tokens for supplying/borrowing | `admin` |
| VToken Delegator | `_setImplementation()` | Upgrades the logic contract for a specific market, allowing arbitrary code execution. Can lead to rug pull. | `admin` |
| VToken Delegator | `_setComptroller()` | Sets a new Comptroller for the market. A malicious comptroller could disable liquidations or change parameters to steal funds. | `admin` |
| VToken | `_setReserveFactor()` | Changes the percentage of interest collected as protocol reserves. | `accessControlManager` |
| VToken | `_reduceReserves()` | Withdraws accumulated reserves from the market. Can drain reserves if called maliciously. | `accessControlManager` |
| VToken | `_setInterestRateModel()` | Changes the interest rate model for the market, allowing for manipulation of borrow/supply rates. | `accessControlManager` |
| ResilientOracle | `pause()` / `unpause()` | Pauses or resumes the entire oracle system, freezing all protocol operations that require prices. | `accessControlManager` |
| ResilientOracle | `setTokenConfig()` | Sets the full [main, pivot, fallback] oracle configuration for an asset. A malicious config could point to controlled oracles to manipulate prices. | `accessControlManager` |
| ResilientOracle | `setOracle()` | Changes a single oracle (e.g., the Chainlink feed) for an asset, enabling price manipulation. | `accessControlManager` |
| ResilientOracle | `enableOracle()` | Enables or disables a specific oracle for an asset. Disabling valid oracles can force a fallback to a malicious one. | `accessControlManager` |
| VAIController | `setPrimeToken()` | Sets the Prime token contract. Can be used to replace with a malicious contract. | `admin` |
| VAIController | `setVAIToken()` | Sets the VAI token contract. Can be used to replace with a malicious contract. | `admin` |
| VAIController | `toggleOnlyPrimeHolderMint()` | Restricts VAI minting to only Prime token holders. Can enable/disable minting for majority of users. | `accessControlManager` |
| VAIController | `setBaseRate()` | Sets the base interest rate for VAI. | `accessControlManager` (`admin`, `Fast Track Timelock`) |
| VAIController | `setFloatRate()` | Sets the floating interest rate for VAI. | `accessControlManager` (`admin`, `Fast Track Timelock`) |
| VAIController | `setMintCap()` | Sets the maximum total supply for VAI. Can be set to 0 to halt all new VAI mints. | `accessControlManager` (`admin`, `Fast Track Timelock`) |
| XVSVault | `pause()` / `resume()` | Pauses or resumes all staking and withdrawal operations in the XVS Vault. | `accessControlManager` |
| XVSVault | `add()` | Adds a new staking pool to the vault, controlling where rewards can be directed. | `accessControlManager` |
| XVSVault | `set()` | Modifies the allocation points for an existing staking pool, changing reward distribution. | `accessControlManager` |
| XVSVault | `setRewardAmountPerBlockOrSecond()`| Changes the rate of rewards distributed. Can be set to 0. | `accessControlManager` |
| Liquidator | `restrictLiquidation()` | Toggles whether liquidations are restricted to an allowlist. Can centralize liquidations. | `accessControlManager` |
| Liquidator | `addToAllowlist()` | Adds a specific address to the liquidator allowlist. | `accessControlManager` |
| Liquidator | `setTreasuryPercent()` | Sets the percentage of liquidation proceeds that go to the treasury. | `accessControlManager` |
| Liquidator | `setMinLiquidatableVAI()` | Sets the minimum amount of VAI debt that can be liquidated. Can prevent small liquidations. | `accessControlManager` |
| Prime | `addMarket()` | Adds a new market to the Prime program, changing reward eligibility. | `accessControlManager` |
| Prime | `issue()` | Triggers the issuance of Prime rewards. | `accessControlManager` |
| Prime | `togglePause()` | Pauses or unpauses the Prime rewards program. | `accessControlManager` |
| PrimeLiquidityProvider | `pauseFundsTransfer()` | Pauses the distribution of rewards from the provider contract. | `accessControlManager` |
| PrimeLiquidityProvider | `setTokensDistributionSpeed()` | Sets the speed at which reward tokens are distributed. | `accessControlManager` |