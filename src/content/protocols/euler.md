---
protocol: "Euler V2"
website: "https://www.eulerlabs.com/"
x: "https://x.com/eulerfinance"
github: ["https://github.com/euler-xyz/euler-interfaces"]
defillama_slug: ["euler-v2"]
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "H"]
author: ["CookingCryptos"]
submission_date: "2025-07-01"
publish_date: "2025-07-01"
update_date: "2025-07-01"
---

# Summary

Euler V2 is a permissioned, decentralized lending and borrowing protocol deployed on Ethereum. It allows users to deposit assets as collateral, borrow against them, and earn interest via an on-chain interest rate model. The protocol employs smart contracts such as EVaults, a generic factory, and a router to handle asset flows, and integrates with oracles and governance modules to manage risk and updates.

# Ratings

## Chain

Euler V2 is deployed on various chains. This review is based on the Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability



> Upgradeability score: High

## Autonomy

Euler V2 relies on external oracle providers selected by vault creators and risk curators for all price data required for collateral valuations and liquidation decisions. Vault creators are free to choose appropriate price oracle implementations from various providers including Chainlink, Pyth, RedStone, Chronicle, and others, thus delegating responsibility to individual actors instead of central governance.

Analysis of Euler's Oracle Dashboard reveals active usage across multiple providers, with Chainlink, Pyth, RedStone, Chronicle, Lido, Pendle, Midas, MEV Capital, Idle, and Resolv representing the primary external dependencies chosen by individual vault creators.

The protocol employs CrossAdapters that derive prices through sequential multiplication of two external oracles sharing a common asset. These create dependency chains where the failure of either component oracle causes complete price feed failure. For ERC4626 vault collaterals, the system depends on external vaults' `convertToAssets()` functions, which may be vulnerable to manipulation if those vaults lack adequate protections.

Pull-based oracles like Pyth introduce operational dependencies where transactions can fail if price updates are not fetched within the 2-3 minute validity window. Observable errors in the Oracle Dashboard demonstrate that some price feeds already experience intermittent failures, highlighting the practical risks of external oracle dependencies.

> Autonomy score: High

## Exit Window

Euler V2 implements timelock mechanisms for some governance functions but lacks comprehensive exit window protection for critical operations. While the protocol uses TimelockController contracts with 48-hour and 4-day delays for certain administrative functions, many critical permissions can be executed immediately without any delay.

The most critical function that bypasses exit windows entirely is the `setImplementation` function of the `GenericFactory` contract which can immediately upgrade the implementation for all upgradeable vaults (those deployed as beacon proxies) across the protocol. However, this only affects vaults that were created with the upgradeable flag set to true, not immutable vaults (minimal proxies).

Additionally, numerous other functions can be executed immediately without delay, including the `pause` function of the `FactoryGovernor` contract which can freeze all vault operations instantly, vault parameter functions like the `setLTV`, `setInterestRateModel` functions of the `EVault` contract that can be modified without delay by vault governors, and protocol-wide configuration functions like the `setProtocolFeeShare` function of the `ProtocolConfig` contract which can redirect all yield to attackers and oracle configuration functions like the `govSetConfig` function of the `EulerRouter` contract which can switch to compromised oracles from the approved registry.

The limited timelock protections (48-hour and 4-day delays) apply only to a subset of administrative functions and fall well below the 7-day minimum threshold required for medium risk classification.

> Exit Window score: High

## Accessibility

Users can only access Euler V2 through a single user interface: app.euler.finance. Currently, there is no backup solution in case the interface is shut down or users are censored.

> Accessibility score: High

## Conclusion



> Overall score: Stage 0

# Reviewer's Notes








# Protocol Analysis

## Core Architecture and EVC Mediation

Euler V2 implements a modular vault-based lending architecture centered around two foundational contracts: the [EthereumVaultConnector (EVC)](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383) and the [GenericFactory](https://etherscan.io/address/0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e). The `EVC` serves as an immutable authentication layer mediating all interactions between users and vaults, while the `GenericFactory` enables permissionless creation of isolated lending markets. Each vault functions as an ERC-4626 compliant tokenized debt market for a specific underlying asset, maintaining full compatibility with the broader DeFi ecosystem.

### Vault Creation and Deployment 

Vault creation begins when any user calls `createProxy` on the `GenericFactory`, which deploys a new vault instance as either a BeaconProxy or MinimalProxy that delegates all function execution to the standardized [EVault (Implementation)](https://etherscan.io/address/0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D) via delegatecall. This proxy architecture separates code logic from data storage: EVault contains the reusable function code shared across all vaults, while each proxy stores its own independent state including the governorAdmin address, user balances, collateral configurations, and vault parameters. The factory supports two deployment patterns: when `upgradeable=true`, it deploys a `BeaconProxy` allowing authorized governance to upgrade all vault implementations simultaneously; when `upgradeable=false`, it deploys an immutable `MinimalProxy` whose logic cannot be changed. Analysis of on-chain events reveals predominantly upgradeable `BeaconProxy` deployments, with no immutable `MinimalProxy` instances observed in the examined sample.

During initialization, the newly created vault automatically registers itself with the `EthereumVaultConnector`, establishing itself as a recognized entity within the `EVC`'s authentication framework. The vault simultaneously creates an associated `DToken` contract, an ERC-20 compliant debt token that represents borrowed positions and makes debt modifications visible in block explorers and tax accounting software. The vault creator specifies critical parameters including the underlying asset, oracle router, interest rate model, and governance settings. Once deployed, the vault operates as an independent lending market with its own collateral configuration and risk parameters.

### Factory-Level Governance

Control over the `GenericFactory` operates through the [FactoryGovernor](https://etherscan.io/address/0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d), which holds exclusive authority to call `setImplementation` and upgrade the beacon implementation address for all `BeaconProxy` vaults simultaneously. The `FactoryGovernor` can also execute `setUpgradeAdmin` to transfer factory control to a different address.

All critical factory operations are protected by a mandatory 4-day timelock through the [eVaultFactoryTimelockController](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968), providing users with advance notice before any upgrade takes effect. The factory also implements emergency pause functionality through the `FactoryGovernor`, which can immediately freeze all vault operations by replacing the factory implementation with a read-only proxy. The complete governance structure, including proposal mechanisms, role assignments, and emergency controls, is detailed in the [Governance](#governance) section.

### Ethereum Vault Connector (EVC)

The `EthereumVaultConnector` functions as the mandatory entry point for all vault interactions in Euler V2, serving as an immutable authentication and coordination layer with no governance or upgrade mechanisms. The `EVC` mediates every deposit, withdrawal, borrow, and liquidation operation, enabling vaults to trust that calls originating from the `EVC` are properly authenticated and authorized. This architecture ensures vault logic remains simple and modular while complex authentication, batching, and cross-vault coordination are handled by the centralized but trustless `EVC` contract.

The `EVC` provides each user address with 256 virtual sub-accounts for position isolation. These sub-accounts enable users to manage multiple isolated trading strategies, separate high-risk positions from conservative holdings, and implement sophisticated risk management frameworks without deploying separate wallet contracts. Each sub-account can independently enable or disable collateral and controller vaults, allowing users to compartmentalize their exposure across different lending markets.

The `EVC` enables atomic batching of operations through its `batch` function, which executes multiple calls in a single transaction while deferring solvency and cap checks until completion. This functionality allows users to open leveraged positions, rebalance collateral across vaults, execute flash loans with automatic repayment, and combine lending, borrowing, and swapping operations without intermediate states that would violate solvency requirements. The `EVC` also provides two emergency modes for user protection: `Lockdown Mode` restricts all operations except operator management and nonce updates, while `Permit Disabled Mode` prevents execution of any permits signed by the owner. The `EVC`'s operator delegation system allows users to authorize trusted contracts to act on behalf of their sub-accounts, enabling automated strategies, limit orders, and third-party integrations while maintaining user custody.

![Core Architecture and EVC Mediation](./diagrams/euler-v2-core-architecture.png)

## Lending, Borrowing and Liquidation

### Deposit and Withdrawal Process

Users deposit assets into `EVaults` through the `EthereumVaultConnector`, which serves as the mandatory entry point for all vault operations. When a user calls `batch` on the `EVC` with encoded deposit instructions, the `EVC` authenticates the caller, forwards the request to the target `EVault`, and executes the deposit operation atomically.

The `EVault` receives the underlying asset and mints vault shares. As interest accrues from borrowers, the value of each share increases proportionally, distributing yield to all depositors automatically. Each `EVault` maintains internal balance tracking to prevent manipulation through external transfers or balance inflation attacks.

Withdrawals mirror deposits in reverse. Users call `batch` on the `EVC` with withdrawal instructions specifying the amount and receiver address. The `EVault` burns the corresponding vault shares and transfers the underlying assets. The `EVC` defers all solvency checks until the end of the batch.

### Cross-Vault Borrowing and Collateralization

Euler V2 enables borrowing from one vault using collateral from another through the EVC's cross-vault system. Users must call `enableCollateral` on the EVC to designate collateral sources, then `enableController` to authorize the borrow vault to enforce solvency and control collateral during liquidations.

The controller designation grants privileged access via `controlCollateral`. Only vaults explicitly enabled as controllers can invoke this function through the EVC, preventing unauthorized access. Users can isolate strategies across their 256 sub-accounts, each with independent collateral and controller configurations.

When borrowing, the EVC authenticates and forwards the request to the borrow vault. The vault queries the EVC for total collateral value and compares it against the requested amount multiplied by the Loan-to-Value (LTV) ratio. Euler V2 implements three LTV thresholds: Borrow LTV sets maximum leverage, Liquidation LTV defines the liquidation threshold, and Spread LTV creates a buffer zone preventing immediate liquidation. The vault governor configures these thresholds through `setLTV`.

The borrow vault mints `DToken`, an ERC-20 debt tracking token that emits Transfer events via `emitTransfer` for visibility in block explorers. DTokens function as read-only interfaces without permitting direct transfers. Debt compounds automatically every second via the vault's Interest Rate Model. The EVC calls `checkAccountStatus` on all controller vaults at batch end, reverting if any check fails.

### Interest Rate Models

Each EVault configures an Interest Rate Model (IRM) at deployment that dynamically adjusts borrowing costs based on utilization. The `EulerKinkIRMFactory` creates linear kink models with piecewise-linear curves, the `EulerIRMAdaptiveCurveFactory` deploys adaptive models based on historical trends, and the `EulerFixedCyclicalBinaryIRMFactory` produces fixed-rate cyclical models. The vault governor selects and modifies the IRM via `setInterestRateModel`.

Interest accrues deterministically every second using exponential compounding with rates expressed as "second percent yield" (SPY) values scaled by 1e27. Higher utilization triggers higher rates, incentivizing deposits or debt repayment. A configurable portion flows to fees through the `interestFee` parameter, with ProtocolConfig determining the split between vault governor and Euler DAO treasury. The vault governor configures this fee distribution through `setInterestFee`.

### Liquidation Mechanism

Positions become eligible for liquidation when collateral value falls below the Liquidation LTV threshold multiplied by outstanding debt. Euler V2 implements a reverse Dutch auction where the discount scales proportionally with violation depth. Slightly underwater positions offer minimal discounts, while deeper violations increase the discount progressively until liquidation becomes economically attractive.

Liquidators call `batch` on the EVC with a liquidate instruction. The borrow vault calculates the liquidatable amount and collateral seizure based on the current discount, capped by `maxLiquidationDiscount`. The borrow vault invokes `controlCollateral` on the EVC with the collateral vault address, violator's account, and transfer calldata. The EVC authenticates the controller authority and executes the transfer.

The liquidator receives vault shares at a discounted valuation. The borrow vault calls `emitTransfer` on the DToken to record the debt reduction. The `liquidationCoolOffTime` parameter prevents immediate liquidation after position creation. When bad debt socialization is enabled, insufficient collateral positions have their remaining liabilities distributed across all depositors by reducing the share exchange rate. The vault governor configures these liquidation parameters through `setMaxLiquidationDiscount` and `setLiquidationCoolOffTime`.

![Flowchart 2](./diagrams/euler-v2-flowchart-2.png)

## Oracle System and Price Feeds

### Modular Oracle Architecture

Euler V2 implements a vendor-agnostic oracle system through the [EulerRouterFactory](https://etherscan.io/address/0x70B3f6F61b7Bf237DF04589DdAA842121072326A), enabling permissionless creation of independent oracle routers. Each router instance, such as [EulerRouter](https://etherscan.io/address/0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57), has its own governor and configuration. The architecture combines immutable Adapters implementing ERC-7726 IPriceOracle interface with configurable Routers dispatching vault price queries. Vault creators specify an oracle router address during deployment, which becomes immutable. Vaults call `getQuote(inAmount, base, quote)` on their router, which dispatches to registered adapters and returns price data.

### Oracle Adapters and Providers

Oracle Adapters are immutable contracts translating external data into ERC-7726 format. Active integrations include Chainlink, Pyth, RedStone, Chronicle, Lido, Pendle, Uniswap V3, Midas, MEV Capital, Idle, and Resolv. The system supports push-based oracles like Chainlink with automatic updates, and pull-based oracles like Pyth requiring users to submit fresh data. CrossAdapters derive prices through sequential multiplication of two sources, while ERC-4626 adapters query `convertToAssets()` for share valuations.

### Oracle Registry and Validation

The [SnapshotRegistry (oracleAdapterRegistry)](https://etherscan.io/address/0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6) maintains approved adapters. Routers verify adapter approval before dispatching queries. [Euler Labs](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) controls the registry via `add` and `revoke`. Each router has independent governance controlling `govSetConfig`, `govSetResolvedVault`, and `govSetFallbackOracle`, separate from vault governance.

![Flowchart 3](./diagrams/euler-v2-flowchart-3.png)

## Governance, Timelocks and Permissions

Euler V2 implements a multi-layered governance architecture with per-vault governance, factory-level upgrades, and global configuration via [ProtocolConfig](https://etherscan.io/address/0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b). The [DAO multisig](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) (4/8 threshold) operates through three TimelockController contracts: 48-hour [AdminTimelock](https://etherscan.io/address/0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59) for role management, 48-hour [WildcardTimelock](https://etherscan.io/address/0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a) for parameter adjustments, and 4-day [FactoryTimelock](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968) for protocol upgrades.

### Per-Vault Governance Structure

Each vault stores a `governorAdmin` address controlling vault-specific parameters (LTV ratios, interest rate models, caps, hooks, fees) via `governorOnly` protected functions. DAO-managed vaults use [GovernorAccessControlEmergency](https://etherscan.io/address/0x35400831044167E9E2DE613d26515eeE37e30a1b) as `governorAdmin`, enforcing 48-hour timelock delays. Private vaults can use an EOA or multisig for direct control without delays.

### Risk Management and Stewards

[CapRiskSteward](https://etherscan.io/address/0xFE56cAa36DA676364e1a0a97e4f7C07651e89B95) enables optimistic risk management within safety constraints. The [riskSteward multisig](https://etherscan.io/address/0xBdAa3FCc9983bD72feE0F7D017e02673896a976d) (3/5 threshold) modifies caps with 24-hour cooldown, allowing 2x increases or 0.5x decreases per period, and updates interest rate models deployed by `EulerKinkIRMFactory`. `CapRiskSteward` holds selector-specific roles on `GovernorAccessControlEmergency`, bypassing the 48-hour timelock while bound by contract-enforced limits.

### Emergency Controls

`GovernorAccessControlEmergency` implements three emergency roles for immediate risk reduction: `LTV_EMERGENCY_ROLE` (held by `CapRiskSteward`) lowers borrow LTV while maintaining liquidation LTV, `CAPS_EMERGENCY_ROLE` (held by `CapRiskSteward`) reduces caps immediately, and `HOOK_EMERGENCY_ROLE` (unassigned) would pause vault operations. Emergency powers are strictly risk-reducing. Recovery requires normal governance through WildcardTimelock. The DAO and [Euler Labs](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) hold `CANCELLER_ROLE` on both timelocks, enabling proposal cancellation during delays.

![Flowchart 4](./diagrams/euler-v2-flowchart-4.png)

## Advanced Modules
### Tokens & Rewards System

The [`EUL`](https://etherscan.io/address/0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b) contract minted 27,182,818 tokens at deployment to the [Treasury](https://etherscan.io/address/0x25Aa4a183800EcaB962d84ccC7ada58d4e126992). The Treasury holds `ADMIN_ROLE` and can call `mint()` once every 365 days to create 2.718% of total supply. The `mintingRestrictedBefore` variable enforces this interval. The Treasury transfers `EUL` to the [DAO](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe), which allocates tokens to [Euler Labs](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) for rEUL rewards.

### rEUL Rewards System

The [`rEUL`](https://etherscan.io/address/0xf3e621395fc714B90dA337AA9108771597b4E696) token is a locked form of `EUL` incentivizing protocol adoption. Merkl calculates rewards every 8-12 hours off-chain. When users claim, Euler Labs calls `depositFor(account, amount)` on the rEUL contract, which transfers `EUL` from Euler Labs to the rEUL contract and mints corresponding rEUL for the user.

### Vesting Mechanism

rEUL converts to `EUL` at 1:1 ratio over six months: 20% unlocks immediately, 80% linearly over 180 days. Early redemption forfeits the locked portion to [`0x000000000000000000000000000000000000dEaD`](https://etherscan.io/address/0x000000000000000000000000000000000000dEaD) (configured as `remainderReceiver`). Each rEUL transfer starts a distinct unlock schedule, making each batch non-fungible despite its ERC-20 interface.

### Multiply Strategies (Leverage Looping)

Multiply strategies automate leveraged position creation through the [`EthereumVaultConnector`](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383). Users initiate a `batch()` transaction that deposits collateral into an `EVault`, borrows against it from a debt `EVault`, swaps the borrowed asset via [`Swapper`](https://etherscan.io/address/0x2Bba09866b6F1025258542478C39720A09B728bF) (verified by [`SwapVerifier`](https://etherscan.io/address/0xae26485ACDDeFd486Fe9ad7C2b34169d360737c7)), and redeposits the result as collateral. This loop repeats until reaching the target multiplier. The EVC defers liquidity checks until batch completion, then validates position health via `checkAccountStatus()`.

When a position's health score drops to ≤1, liquidators can call `liquidate()` through the EVC. The debt `EVault` verifies eligibility and invokes `controlCollateral()` on the EVC to seize collateral at a discount proportional to the position's unhealthiness (reverse Dutch auction). The seized collateral transfers to the liquidator, who repays the corresponding debt. All positions and debt are stored in the respective EVaults.

![Flowchart 5](./diagrams/euler-v2-flowchart-5.png)

## Integration and Composability
### ERC-4626 Compatibility
### Lens Contracts
### Developer Tools






## Core Architecture

Euler V2 utilizes a modular vault-based lending system built around the [EthereumVaultConnector (EVC)](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383) and the [GenericFactory (EVault Proxy)](https://etherscan.io/address/0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e). The protocol enables permissionless creation of isolated lending markets where each vault functions as an ERC-4626 compliant tokenized debt market for a specific underlying asset.

The EVC serves as the foundational multicall contract that mediates all cross-vault operations, enabling atomic batching, sub-account management, and sophisticated position isolation. Individual EVaults are deployed through the factory system using the [EVault (Implementation)](https://etherscan.io/address/0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D) as the implementation contract, maintaining full ERC-4626 compatibility for seamless integration with the broader DeFi ecosystem.

## Vault Creation and Management

### Vault Deployment Process

Vaults are created through the [GenericFactory (EVault Proxy)](https://etherscan.io/address/0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e) contract, which deploys proxy instances pointing to the standardized [EVault (Implementation)](https://etherscan.io/address/0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D). The factory supports two deployment modes:

Upgradeable Vaults: Deployed as beacon proxies, allowing the [FactoryGovernor](https://etherscan.io/address/0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d) to upgrade implementations in case of critical bugs
Immutable Vaults: Deployed as minimal proxies, providing complete immutability once deployed

Each vault is configured with specific parameters including underlying asset, oracle router, interest rate model, and governance settings. The factory ensures all vaults are initialized securely and can be verified as originating from a trusted source.

### Governance and Control

Vault governance operates through a modular system where each vault can be assigned a governor address. The protocol supports multiple governance patterns:

- [GovernorAccessControlEmergency](https://etherscan.io/address/0x35400831044167E9E2DE613d26515eeE37e30a1b): Selector-based access control with emergency roles for rapid response
- [CapRiskSteward](https://etherscan.io/address/0xFE56cAa36DA676364e1a0a97e4f7C07651e89B95): Specialized risk management for delegated parameter adjustments
- Timelock Integration: Three TimelockController contracts provide time-delayed execution:
  - [accessControlEmergencyGovernorAdminTimelockController](https://etherscan.io/address/0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59) - 48-hour delays
  - [accessControlEmergencyGovernorWildcardTimelockController](https://etherscan.io/address/0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a) - 48-hour delays  
  - [eVaultFactoryTimelockController](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968) - 4-day delays




## Lending and Borrowing Mechanics

### Deposit and Withdrawal Process

Users deposit underlying assets into vaults through the standard ERC-4626 interface, receiving vault shares representing proportional ownership. The vault tracks internal balances rather than reading from the underlying asset contract, preventing manipulation through direct transfers and supporting rebasing tokens.

The exchange rate grows deterministically as interest accrues:
exchangeRate = (cash + totalBorrows + VIRTUAL_DEPOSIT) / (totalShares + VIRTUAL_DEPOSIT)

The VIRTUAL_DEPOSIT mechanism prevents manipulation through rounding-based "stealth deposits" and ensures the exchange rate is well-defined even with zero shares.

### Borrowing and Collateralization

Borrowing requires users to enable specific vaults as collateral and controller through the EVC. The system supports cross-vault collateralization, where assets deposited in one vault can serve as collateral for borrowing from another vault.

Each collateral vault is configured with separate Loan-to-Value (LTV) ratios through the `setLTV` function:
- `Borrow LTV`: Maximum ratio for new borrowing
- `Liquidation LTV`: Threshold for liquidation eligibility
- `Spread LTV`: Buffer between borrow and liquidation thresholds

The EVC defers solvency and cap checks until the end of a batch, enabling complex multi-step workflows while maintaining system integrity.

### Interest Rate Models

Euler V2 supports multiple interest rate model types through specialized factories:

`Kink IRM Factory` at [0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9](https://etherscan.io/address/0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9): Deploys linear kink interest rate models with piecewise-linear curves and "kink" points.

`Adaptive Curve IRM Factory` at [0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42](https://etherscan.io/address/0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42): Deploys adaptive curve models that dynamically adjust rates based on market conditions.

`Fixed Cyclical Binary IRM Factory` at [0xa8F8E82C9Da15A991D7BF2486aE26e22743aC8d0](https://etherscan.io/address/0xa8F8E82C9Da15A991D7BF2486aE26e22743aC8d0): Deploys fixed-rate cyclical binary models.

Interest is compounded deterministically every second using exponentiation, with rates expressed in "second percent yield" (SPY) values scaled by 1e27.

## Sub-Account System

### Account Structure

The EVC provides each user address with 256 virtual sub-accounts, enabling sophisticated position isolation and risk management. Sub-account addresses are derived by XOR-ing the main address with a number from 0 to 255:

```solidity
function getAccount(address owner, uint8 accountId) public pure returns (address) {
    return address(uint160(owner) ^ uint160(accountId));
}
```

All 256 sub-accounts share the first 19 bytes of their address, making them easily identifiable as belonging to the same owner.

### Position Isolation

Sub-accounts enable users to:
- Manage multiple isolated positions with different risk parameters
- Separate strategies and collateral types
- Implement sophisticated risk management across positions
- Maintain convenience of using a single wallet

Each sub-account can independently enable/disable collateral and controller vaults, borrow from different vaults, and maintain separate debt positions.

## Liquidation System

### Reverse Dutch Auction Mechanism

Euler V2 implements a reverse dutch auction system for liquidations, where the discount scales proportionally with how deeply in violation a position becomes. The `setMaxLiquidationDiscount` function controls the maximum discount parameter, preventing harmful liquidation spirals.

### Collateral Control

When a position becomes undercollateralized, the controller vault can invoke `controlCollateral` through the EVC to seize collateral from the borrower's enabled collateral vaults. This function allows the controller to withdraw assets on behalf of the violating account, typically to repay outstanding debt.

The liquidation process is atomic and secure, with only the controller vault able to initiate it for accounts that have enabled it as a controller.





## EulerSwap Integration

### Capital-Efficient AMM Design

EulerSwap is implemented through three core contracts:
- `EulerSwapFactory` at [EulerSwapFactory](https://etherscan.io/address/0xb013be1D0D380C13B58e889f412895970A2Cf228)
- `EulerSwap Implementation` at [0xc35a0FDA69e9D71e68C0d9CBb541Adfd21D6B117](https://etherscan.io/address/0xc35a0FDA69e9D71e68C0d9CBb541Adfd21D6B117)
- `EulerSwapPeriphery` at [0x208fF5Eb543814789321DaA1B5Eb551881D16b06](https://etherscan.io/address/0x208fF5Eb543814789321DaA1B5Eb551881D16b06)

Unlike traditional AMMs, liquidity remains in the user's Euler account, continuing to earn lending interest and protocol rewards.

### Swap Execution

The swap system operates through two periphery contracts:
- `Swapper` at [0x2Bba09866b6F1025258542478C39720A09B728bF](https://etherscan.io/address/0x2Bba09866b6F1025258542478C39720A09B728bF): Executes swaps using external DEXs
- `SwapVerifier` at [0xae26485ACDDeFd486Fe9ad7C2b34169d360737c7](https://etherscan.io/address/0xae26485ACDDeFd486Fe9ad7C2b34169d360737c7): Verifies swap outcomes and enforces slippage limits

## Oracle System

### Modular Oracle Architecture

Euler V2 supports a wide range of oracle providers through the `EulerRouterFactory` at [0x70B3f6F61b7Bf237DF04589DdAA842121072326A](https://etherscan.io/address/0x70B3f6F61b7Bf237DF04589DdAA842121072326A) and `EulerRouter` at [0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57](https://etherscan.io/address/0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57). The system operates through a modular architecture combining immutable Adapters and configurable Routers.

Analysis of Euler's Oracle Adapters Addresses reveals active usage across 12 distinct provider types including Chainlink, Pyth, RedStone, Chronicle, Lido, Pendle, Midas, MEV Capital, Idle, and Resolv.

### Oracle Registry

The `SnapshotRegistry (oracleAdapterRegistry)` at [0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6](https://etherscan.io/address/0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6) maintains a registry of approved oracle adapters, ensuring only verified price feeds are used by vaults.

## Reward and Incentive System

### Protocol Rewards

Euler V2 implements a comprehensive reward system through:
- `EUL Token` at [0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b](https://etherscan.io/address/0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b): Protocol governance token
- `RewardToken (rEUL)` at [0xf3e621395fc714B90dA337AA9108771597b4E696](https://etherscan.io/address/0xf3e621395fc714B90dA337AA9108771597b4E696): Reward token representing earned EUL
- `TrackingRewardStreams` at [0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3](https://etherscan.io/address/0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3): Manages reward distribution

### Balance Forwarding

The balance forwarding system enables instant and trustless distribution of rewards while keeping gas costs low. When an account opts in, every balance change triggers a notification to the TrackingRewardStreams contract.

## EulerEarn System

### Yield Aggregation

EulerEarn provides yield aggregation through:
- `EulerEarnFactory` at [0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427](https://etherscan.io/address/0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427)
- `EulerEarnFactory2` at [0x59709B029B140C853FE28d277f83C3a65e308aF4](https://etherscan.io/address/0x59709B029B140C853FE28d277f83C3a65e308aF4)
- `EulerEarn Implementation` at [0xBa42141648dFD74388f3541C1d80fa9387043Da9](https://etherscan.io/address/0xBa42141648dFD74388f3541C1d80fa9387043Da9)

The system aggregates user deposits into curated sets of underlying lending vaults, optimizing yield while preserving risk isolation per strategy.

## Security Features

### Emergency Response

The EVC provides two emergency modes for user protection:
- `Lockdown Mode`: Restricts all operations except operator management and nonce updates
- `Permit Disabled Mode`: Prevents execution of any permits signed by the owner

### Access Control

The protocol implements sophisticated access control through:
- `Operator Delegation`: Users can delegate control of sub-accounts to trusted contracts
- `Role-Based Governance`: Granular permissions for different governance functions
- `Timelock Protection`: Time-delayed execution for sensitive operations

### Upgradeability and Immutability

Vault creators can choose between:
- `Upgradeable Vaults`: Can be upgraded by `FactoryGovernor` for critical bug fixes
- `Immutable Vaults`: Completely immutable once deployed

The `FactoryGovernor` is controlled by the `eVaultFactoryTimelockController` and can only upgrade vault implementations, not individual vault configurations.

## Integration and Composability

### EVC Batching

The EVC enables atomic batching of operations across multiple vaults and external contracts. This allows complex strategies like:
- Opening leveraged positions in a single transaction
- Rebalancing collateral across multiple vaults
- Executing flash loans with automatic repayment
- Combining lending, borrowing, and swapping operations

### ERC-4626 Compatibility

All vaults implement the ERC-4626 standard, ensuring seamless integration with:
- DeFi aggregators and yield farming protocols
- Portfolio management tools
- Tax accounting software
- Standard DeFi interfaces

### Lens Contracts

The protocol provides comprehensive data access through specialized lens contracts:
- `AccountLens` at [0x94B9D29721f0477402162C93d95B3b4e52425844](https://etherscan.io/address/0x94B9D29721f0477402162C93d95B3b4e52425844)
- `VaultLens` at [0xB65C7ac387A45d7b4709166784BB431A58Bc59eB](https://etherscan.io/address/0xB65C7ac387A45d7b4709166784BB431A58Bc59eB)
- `OracleLens` at [0x0C47736aaBEE757AB8C8F60776741e39DBf3F183](https://etherscan.io/address/0x0C47736aaBEE757AB8C8F60776741e39DBf3F183)
- `UtilsLens` at [0xB8cac3e5CaaC2042B79938aFe7FEA3f44e5afcC1](https://etherscan.io/address/0xB8cac3e5CaaC2042B79938aFe7FEA3f44e5afcC1)

This modular, composable architecture makes Euler V2 a foundational layer for sophisticated DeFi strategies while maintaining security and user control over their positions.








# Dependencies

## Oracles

Euler V2 employs a vendor-agnostic oracle system supporting multiple price feed providers selected by vault creators and risk curators. The system operates through a modular architecture combining immutable Adapters that interface with external oracles and convert data to standardized ERC-7726 format, and configurable Routers that dispatch price queries.

The protocol distinguishes between push-based oracles like Chainlink that automatically update prices at regular intervals, and pull-based oracles like Pyth that require manual price updates with 2-3 minute validity periods. Analysis of Euler's Oracle Dashboard reveals active usage across multiple providers, with Chainlink, Pyth, RedStone, Chronicle, Lido, Pendle, Midas, MEV Capital, Idle, and Resolv representing the primary external dependencies chosen by individual vault creators.

The system also employs CrossAdapters that derive prices through sequential multiplication of two oracles sharing a common asset. For example, wstETH/USD pricing is derived by chaining wstETH/stETH and stETH/USD oracles. CrossAdapters perform simple sequential queries without validation mechanisms between component oracles, creating dependency chains where the failure of either oracle causes complete price feed failure.

Each vault's solvency calculations rely entirely on the accuracy and availability of its configured external price feeds. For ERC4626 vault collaterals, the system depends on the `convertToAssets()` function of external vaults, which may be vulnerable to manipulation attacks if those vaults lack adequate protections. Pull-based oracles like Pyth introduce operational dependencies where transactions can fail if price updates are not fetched within the 2-3 minute validity window.

A permanent failure or compromise of external price feeds could result in incorrect liquidations, blocked withdrawals, or user funds being frozen in affected vaults. Observable errors in the [Oracle Dashboard](https://oracles.euler.finance/1/?page=1demonstrate) that some price feeds already experience intermittent failures, highlighting the practical risks of external oracle dependencies. The protocol's reliance on multiple external oracle providers means that vault safety depends on the continued operation and integrity of these third-party services selected by individual vault creators and risk curators.

## OFT

!!!!!!!!!!TO COMPLETE!!!!!!!!! 


# Governance

Euler V2 uses a multi-layered governance system with different timelock contracts and role-based access control. The system combines community discussion, off-chain voting via Snapshot, and on-chain execution through timelock contracts.

## Governance Process

### 1. Proposal Creation
Anyone can propose changes on the Euler Governance Forum. The community discusses proposals and EUL token holders vote off-chain via Snapshot for formal proposals.

### 2. Proposal Submission
The DAO multisig (4/8) at [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) holds the `PROPOSER_ROLE` and can submit proposals for parameter changes and role modifications.

### 3. Execution
The `EXECUTOR_ROLE` is set to address(0), meaning anyone can execute valid proposals after the timelock period expires.

## Timelock Contracts

The system is built around three TimelockController contracts:

- `TimelockController (accessControlEmergencyGovernorAdminTimelockController)`: [0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59](https://etherscan.io/address/0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59) - Controls administrative functions with 48-hour delays
- `TimelockController (accessControlEmergencyGovernorWildcardTimelockController)`: [0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a](https://etherscan.io/address/0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a) - Handles routine parameter changes with 48-hour delays
- `TimelockController (eVaultFactoryTimelockController)`: [0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968) - Controls factory operations with 4-day delays

## Key Roles and Responsibilities

DAO: [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) - Holds `PROPOSER_ROLE` and `CANCELLER_ROLE` on all three TimelockControllers, making it the primary governance authority for proposal submission and cancellation.

Security Council: [0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53](https://etherscan.io/address/0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53) - Can cancel factory upgrade proposals via the `CANCELLER_ROLE` on the eVaultFactoryTimelockController only.

Euler Labs: [0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) - Can cancel proposals on accessControlEmergencyGovernorAdminTimelockController and accessControlEmergencyGovernorWildcardTimelockController.

Risk Steward: `CapRiskSteward` contract at [0xFE56cAa36DA676364e1a0a97e4f7C07651e89B95](https://etherscan.io/address/0xFE56cAa36DA676364e1a0a97e4f7C07651e89B95) allows non-critical parameter changes (caps, IRMs) without timelock. Controlled by a multisig of risk management partners.


## Security Council

| Name               | Account                                                                                                               | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
|--------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|-------------|-----------------|-------------------|----------------|
| DAO                | [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) | Multisig 4/8 | ✅           | ❌               | ❌                 | ❌              |
| Treasury           | [0x25Aa4a183800EcaB962d84ccC7ada58d4e126992](https://etherscan.io/address/0x25Aa4a183800EcaB962d84ccC7ada58d4e126992) | Multisig 2/8 | ✅           | ❌               | ❌                 | ❌              |
| Euler Labs         | [0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) | Multisig 2/6 | ❌           | ❌               | ❌                 | ❌              |
| Security Council   | [0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53](https://etherscan.io/address/0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53) | Multisig 2/3 | ❌           | ✅               | ❌                 | ❌              |
| Security Partner A | [0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471](https://etherscan.io/address/0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471) | Multisig 2/3 | ❌           | ✅               | ❌                 | ❌              |
| Security Partner B | [0x62962b4d506b0065a133f37e19D163E5b002b655](https://etherscan.io/address/0x62962b4d506b0065a133f37e19D163E5b002b655) | Multisig 2/3 | ❌           | ✅               | ❌                 | ❌              |
| Gauntlet           | [0xF8ef49c44Cab10244De90EF79fc10131F5069B0F](https://etherscan.io/address/0xF8ef49c44Cab10244De90EF79fc10131F5069B0F) | Multisig 3/6 | ✅           | ❌               | ❌                 | ❌              |
| riskSteward        | [0xBdAa3FCc9983bD72feE0F7D017e02673896a976d](https://etherscan.io/address/0xBdAa3FCc9983bD72feE0F7D017e02673896a976d) | Multisig 3/5 | ❌           | ✅               | ❌                 | ❌              |

# Contracts & Permissions

## Contracts

| Contract Name                                                                 | Address                                                                                                               |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| TrackingRewardStreams                                                         | [0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3](https://etherscan.io/address/0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3) |
| GenericFactory                                                 | [0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e](https://etherscan.io/address/0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e) |
| EVault (Implementation)                                                       | [0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D](https://etherscan.io/address/0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D) |
| EulerEarnFactory                                                              | [0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427](https://etherscan.io/address/0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427) |
| EulerEarnFactory2                                                             | [0x59709B029B140C853FE28d277f83C3a65e308aF4](https://etherscan.io/address/0x59709B029B140C853FE28d277f83C3a65e308aF4) |
| EulerEarn (Implementation)                                                    | [0xBa42141648dFD74388f3541C1d80fa9387043Da9](https://etherscan.io/address/0xBa42141648dFD74388f3541C1d80fa9387043Da9) |
| EthereumVaultConnector (EVC)                                                  | [0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383) |
| Permit2                                                                       | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |
| ProtocolConfig                                                                | [0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b](https://etherscan.io/address/0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b) |
| SequenceRegistry                                                              | [0xEADDD21618ad5Deb412D3fD23580FD461c106B54](https://etherscan.io/address/0xEADDD21618ad5Deb412D3fD23580FD461c106B54) |
| EulerIRMAdaptiveCurveFactory                                                  | [0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42](https://etherscan.io/address/0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42) |
| CapRiskStewardFactory                                                         | [0x93c233008971e878d60a7737657869ab746f3208](https://etherscan.io/address/0x93c233008971e878d60a7737657869ab746f3208) |
| EdgeFactory                                                                   | [0xA969B8a46166B135fD5AC533AdC28c816E1659Bd](https://etherscan.io/address/0xA969B8a46166B135fD5AC533AdC28c816E1659Bd) |
| EdgeFactoryPerspective                                                        | [0x8c7543f83D3d295F68447792581F73d7d5D4d788](https://etherscan.io/address/0x8c7543f83D3d295F68447792581F73d7d5D4d788) |
| EscrowedCollateralPerspective                                                 | [0x4e58BBEa423c4B9A2Fc7b8E58F5499f9927fADdE](https://etherscan.io/address/0x4e58BBEa423c4B9A2Fc7b8E58F5499f9927fADdE) |
| EulerEarnFactoryPerspective                                                   | [0xA45895144F2b6E7E6D2fCAFfe6eA19E86aa1667E](https://etherscan.io/address/0xA45895144F2b6E7E6D2fCAFfe6eA19E86aa1667E) |
| EulerEarnFactoryPerspective2                                                  | [0xC09be111D95171d1D5db43f1324005D21C098B52](https://etherscan.io/address/0xC09be111D95171d1D5db43f1324005D21C098B52) |
| GovernedPerspective (eulerEarnGovernedPerspective)                            | [0x492e9FE1289d43F8bB6275237BF16c9248C74D44](https://etherscan.io/address/0x492e9FE1289d43F8bB6275237BF16c9248C74D44) |
| GovernedPerspective2 (eulerEarnGovernedPerspective)                           | [0x747a726736DDBE6210B9d7187b3479DC5705165E](https://etherscan.io/address/0x747a726736DDBE6210B9d7187b3479DC5705165E) |
| EulerUngovernedPerspective (eulerUngoverned0xPerspective)                     | [0xb50a07C2B0F128Faa065bD18Ea2091F5da5e7FbF](https://etherscan.io/address/0xb50a07C2B0F128Faa065bD18Ea2091F5da5e7FbF) |
| EulerUngovernedPerspective (eulerUngovernedNzxPerspective)                    | [0x600bBe1D0759F380Fea72B2e9B2B6DCb4A21B507](https://etherscan.io/address/0x600bBe1D0759F380Fea72B2e9B2B6DCb4A21B507) |
| EVKFactoryPerspective                                                         | [0xB30f23bc5F93F097B3A699f71B0b1718Fc82e182](https://etherscan.io/address/0xB30f23bc5F93F097B3A699f71B0b1718Fc82e182) |
| SnapshotRegistry (external Vault Registry)                                    | [0xB3b30ffb54082CB861B17DfBE459370d1Cc219AC](https://etherscan.io/address/0xB3b30ffb54082CB861B17DfBE459370d1Cc219AC) |
| FeeFlowController                                                             | [0xFcd3Db06EA814eB21C84304fC7F90798C00D1e32](https://etherscan.io/address/0xFcd3Db06EA814eB21C84304fC7F90798C00D1e32) |
| EulerFixedCyclicalBinaryIRMFactory                                            | [0xa8F8E82C9Da15A991D7BF2486aE26e22743aC8d0](https://etherscan.io/address/0xa8F8E82C9Da15A991D7BF2486aE26e22743aC8d0) |
| GovernedPerspective                                                           | [0xC0121817FF224a018840e4D15a864747d36e6Eb2](https://etherscan.io/address/0xC0121817FF224a018840e4D15a864747d36e6Eb2) |
| GovernorAccessControlEmergencyFactory                                         | [0x025C8831c6E45420DF8E71F7B6b99F733D120Faf](https://etherscan.io/address/0x025C8831c6E45420DF8E71F7B6b99F733D120Faf) |
| SnapshotRegistry (irm registry)                                               | [0x0a64670763777E59898AE28d6ACb7f2062BF459C](https://etherscan.io/address/0x0a64670763777E59898AE28d6ACb7f2062BF459C) |
| EulerKinkIRMFactory (kinkIRMFactory)                                          | [0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9](https://etherscan.io/address/0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9) |
| EulerKinkyIRMFactory (kinkyIRMFactory)                                        | [0x010102daAB6133d4f8cEB4C8842a70B9899Fc102](https://etherscan.io/address/0x010102daAB6133d4f8cEB4C8842a70B9899Fc102) |
| SnapshotRegistry (oracleAdapterRegistry)                                      | [0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6](https://etherscan.io/address/0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6) |
| EulerRouterFactory (oracleRouterFactory)                                      | [0x70B3f6F61b7Bf237DF04589DdAA842121072326A](https://etherscan.io/address/0x70B3f6F61b7Bf237DF04589DdAA842121072326A) |
| EulerRouter (example Oracle router)                                           | [0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57](https://etherscan.io/address/0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57) |
| SwapVerifier                                                                  | [0xae26485ACDDeFd486Fe9ad7C2b34169d360737c7](https://etherscan.io/address/0xae26485ACDDeFd486Fe9ad7C2b34169d360737c7) |
| Swapper                                                                       | [0x2Bba09866b6F1025258542478C39720A09B728bF](https://etherscan.io/address/0x2Bba09866b6F1025258542478C39720A09B728bF) |
| TermsOfUseSigner                                                              | [0x9ba11Acd88B79b657BDbD00B6dE759718AaAdCbA](https://etherscan.io/address/0x9ba11Acd88B79b657BDbD00B6dE759718AaAdCbA) |
| PublicAllocator (eulerEarnPublicAllocator)                                    | [0x8fdCb80a2894F0dC052c8d52D22544DC90274800](https://etherscan.io/address/0x8fdCb80a2894F0dC052c8d52D22544DC90274800) |
| AccountLens                                                                   | [0x94B9D29721f0477402162C93d95B3b4e52425844](https://etherscan.io/address/0x94B9D29721f0477402162C93d95B3b4e52425844) |
| EulerEarnVaultLens                                                            | [0xF997706566Ea9B0Df3577C41a468A8337064084A](https://etherscan.io/address/0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f) |
| EulerEarnVaultLens2                                                           | [0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f](https://etherscan.io/address/0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f) |
| IRMLens                                                                       | [0x57B1BB683b109eB0F1e6d9043067C86F0C6c52C1](https://etherscan.io/address/0x57B1BB683b109eB0F1e6d9043067C86F0C6c52C1) |
| IRMLens2                                                                      | [0x35B2Fa6206fCC6f653B75832C281bf9d4eBfeaC2](https://etherscan.io/address/0x35B2Fa6206fCC6f653B75832C281bf9d4eBfeaC2) |
| OracleLens                                                                    | [0x0C47736aaBEE757AB8C8F60776741e39DBf3F183](https://etherscan.io/address/0x0C47736aaBEE757AB8C8F60776741e39DBf3F183) |
| OracleLens2                                                                   | [0x53DcfC583F835A23A69185E7EDB0560E8cB1858A](https://etherscan.io/address/0x53DcfC583F835A23A69185E7EDB0560E8cB1858A) |
| UtilsLens                                                                     | [0xB8cac3e5CaaC2042B79938aFe7FEA3f44e5afcC1](https://etherscan.io/address/0xB8cac3e5CaaC2042B79938aFe7FEA3f44e5afcC1) |
| UtilsLens2                                                                    | [0x3Ebfd228dD4F497B90fB8f7AC68E5Fb5E027Fb36](https://etherscan.io/address/0x3Ebfd228dD4F497B90fB8f7AC68E5Fb5E027Fb36) |
| VaultLens                                                                     | [0xB65C7ac387A45d7b4709166784BB431A58Bc59eB](https://etherscan.io/address/0xB65C7ac387A45d7b4709166784BB431A58Bc59eB) |
| VaultLens2                                                                    | [0xA8695d44EC128136F8Afcd796D6ba3Db3cdA8914](https://etherscan.io/address/0xA8695d44EC128136F8Afcd796D6ba3Db3cdA8914) |
| Eul                                                                           | [0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b](https://etherscan.io/address/0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b) |
| Reward Token (rEul)                                                           | [0xf3e621395fc714B90dA337AA9108771597b4E696](https://etherscan.io/address/0xf3e621395fc714B90dA337AA9108771597b4E696) |
| OFTAdapterUpgradeable (Proxy)                                                 | [0x4d7e09f73843Bd4735AaF7A74b6d877bac75a531](https://etherscan.io/address/0x4d7e09f73843Bd4735AaF7A74b6d877bac75a531) |
| OFTAdapterUpgradeable (Implementation)                                        | [0x3bf1bd5db4457d22a85d45791b6291b98d0fc5b5](https://etherscan.io/address/0x3bf1bd5db4457d22a85d45791b6291b98d0fc5b5) |
| GovernorAccessControlEmergency (accessControlEmergencyGovernor)               | [0x35400831044167E9E2DE613d26515eeE37e30a1b](https://etherscan.io/address/0x35400831044167E9E2DE613d26515eeE37e30a1b) |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | [0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59](https://etherscan.io/address/0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59) |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | [0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a](https://etherscan.io/address/0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a) |
| CapRiskSteward                                                                | [0xFE56cAa36DA676364e1a0a97e4f7C07651e89B95](https://etherscan.io/address/0xFE56cAa36DA676364e1a0a97e4f7C07651e89B95) |
| FactoryGovernor  (eVaultFactoryGovernor)                                      | [0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d](https://etherscan.io/address/0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d) |
| TimelockController (eVaultFactoryTimelockController)                          | [0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968) |
| EulerSwapFactory (eulerSwapV1Factory)                                         | [0xb013be1D0D380C13B58e889f412895970A2Cf228](https://etherscan.io/address/0xb013be1D0D380C13B58e889f412895970A2Cf228) |
| EulerSwap (eulerSwapV1Implementation)                                         | [0xc35a0FDA69e9D71e68C0d9CBb541Adfd21D6B117](https://etherscan.io/address/0xc35a0FDA69e9D71e68C0d9CBb541Adfd21D6B117) |
| EulerSwapPeriphery (eulerSwapV1Periphery)                                     | [0x208fF5Eb543814789321DaA1B5Eb551881D16b06](https://etherscan.io/address/0x208fF5Eb543814789321DaA1B5Eb551881D16b06) |

*********A FAIRE************
MinimalProxy
BeaconProxy example 0xdc3f589dc09cc120a1ccf359a3fed22b053eceb7
DToken example 0xc8ae97896685bfda6a14193eb7f42fe5516a9f23
Qui est ce multisig 2/4 0xe130ba997b941f159adc597f0d89a328554d4b3e
et 0x8Da6a996D8f0cf718d1258F30DB731BbceCb01D2
Qui est ce multisig 4/6 0xc7c5afdb61e08be3e2fb09098412b5706eb5c550
et 3/5 0x0e33089449606cde00ad767d66c28cf4cfcf0bf5

## Permission owners

| Name                   | Account                                                                                                               | Type         |
|------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
| DAO                    | [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) | Multisig 4/8 |
| Euler Labs             | [0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) | Multisig 2/6 |
| Security Council       | [0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53](https://etherscan.io/address/0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53) | Multisig 2/3 |
| Security Partner A     | [0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471](https://etherscan.io/address/0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471) | Multisig 2/3 |
| Security Partner B     | [0x62962b4d506b0065a133f37e19D163E5b002b655](https://etherscan.io/address/0x62962b4d506b0065a133f37e19D163E5b002b655) | Multisig 2/3 |
| Gauntlet               | [0xF8ef49c44Cab10244De90EF79fc10131F5069B0F](https://etherscan.io/address/0xF8ef49c44Cab10244De90EF79fc10131F5069B0F) | Multisig 3/6 |
| riskSteward            | [0xBdAa3FCc9983bD72feE0F7D017e02673896a976d](https://etherscan.io/address/0xBdAa3FCc9983bD72feE0F7D017e02673896a976d) | Multisig 3/5 |
| EthereumVaultConnector | [0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383) | Contract     |
| FactoryGovernor        | [0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d](https://etherscan.io/address/0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d) | Contract     |
| Governor               | [0x1216FB4fcde507DF25e17a6f1525fd41c19dc638](https://etherscan.io/address/0x1216FB4fcde507DF25e17a6f1525fd41c19dc638) | EOA          |
| Treasury               | [0x25Aa4a183800EcaB962d84ccC7ada58d4e126992](https://etherscan.io/address/0x25Aa4a183800EcaB962d84ccC7ada58d4e126992) | Multisig 2/8 |
| Euler Deployer         | [0xEe009FAF00CF54C1B4387829aF7A8Dc5f0c8C8C5](https://etherscan.io/address/0xEe009FAF00CF54C1B4387829aF7A8Dc5f0c8C8C5) | EOA          |
| Address 1              | [0x95058F3d4C69F14f6125ad4602E925845BD5d6A4](https://etherscan.io/address/0x95058F3d4C69F14f6125ad4602E925845BD5d6A4) | EOA          |
| EOA 1                  | [0xff217004BdD3A6A592162380dc0E6BbF143291eB](https://etherscan.io/address/0xff217004BdD3A6A592162380dc0E6BbF143291eB) | EOA          |
| EOA 2                  | [0xcC6451385685721778E7Bd80B54F8c92b484F601](https://etherscan.io/address/0xcC6451385685721778E7Bd80B54F8c92b484F601) | EOA          |

## Permissions

| Contract                                                                      | Function                   | Impact                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Owner                                                                                                      |
|-------------------------------------------------------------------------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| GenericFactory                                                                | setImplementation          | Updates the implementation address that all BeaconProxies delegate calls to. It immediately upgrades the logic of all existing EVaults in the protocol without any delay. A malicious admin could deploy a malicious implementation that steals all user funds or blocks withdrawals permanently.                                                                                                                                                                                                 | FactoryGovernor                                                                                            |
| GenericFactory                                                                | setUpgradeAdmin            | Transfers the factory's administrative rights to a new address. It grants complete control over the creation and upgrading of all EVaults in the protocol. A malicious transfer could give control to an attacker who could then compromise the entire Euler ecosystem.                                                                                                                                                                                                                           | FactoryGovernor                                                                                            |
| EVault                                                                        | setGovernorAdmin           | Updates which address holds the governor role for this vault. It determines who can later call any governorOnly functions. A malicious change could hand vault control to an attacker, allowing them to reconfigure fees or collateral parameters.                                                                                                                                                                                                                                                | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                    |
| EVault                                                                        | setFeeReceive              | Changes the address that collects protocol fees from this vault. It directly affects where user-paid fees flow. A rogue update could divert all fees to an attacker’s account, draining protocol revenue.                                                                                                                                                                                                                                                                                         | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EVault                                                                        | setLTV                     | Sets the loan-to-value ratio used when users borrow against collateral. It controls how much borrowing power users have. An attacker could set an arbitrarily high LTV, enabling under-collateralized borrows that risk insolvency.                                                                                                                                                                                                                                                               | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EVault                                                                        | setMaxLiquidationDiscount  | Configures the maximum discount liquidators receive when seizing collateral. It governs the economic incentive for liquidators. A maliciously high discount could drain vault assets during liquidation events.                                                                                                                                                                                                                                                                                   | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EVault                                                                        | setLiquidationCoolOffTime  | Defines the minimum time between successive liquidations on a single account. It impacts how often users can be liquidated under stress. Setting it to zero could allow continuous liquidations, potentially wiping out user positions.                                                                                                                                                                                                                                                           | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EVault                                                                        | setInterestRateModel       | Swaps in the contract that calculates per-block interest rates. It controls how users accrue interest on deposits and loans. A malicious model could impose exorbitant rates or break interest accrual logic, harming user funds.                                                                                                                                                                                                                                                                 | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EVault                                                                        | setHookConfig              | Sets parameters for on-chain hooks (e.g. custom logic on deposits/withdrawals). It influences extensibility and integrations. A rogue config could execute arbitrary code on every user interaction, siphoning funds stealthily.                                                                                                                                                                                                                                                                  | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                    |
| EVault                                                                        | setConfigFlags             | Toggles internal feature flags (e.g. enabling/disabling specific checks or behaviors). It affects core vault behavior without redeploying. Turning off critical flags could bypass safety checks and allow exploits.                                                                                                                                                                                                                                                                              | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EVault                                                                        | setCaps                    | Updates maximum deposit or borrow caps for this vault. It influences vault size and exposure limits. A malicious cap change could lock out new deposits or abruptly halt borrowing, disrupting user access.                                                                                                                                                                                                                                                                                       | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                    |
| EVault                                                                        | setInterestFee             | Adjusts the protocol’s share of interest earned in the vault. It affects the split between user yield and protocol revenue. An attacker setting this to 100% could redirect all accrued interest to themselves, starving users of earnings.                                                                                                                                                                                                                                                       | Vault Governor (governorAdmin - e.g. GovernorAccessControlEmergency for DAO vaults)                                                                                     |
| EulerEarnFactory2                                                             | renounceOwnership          | Sets _owner to zero address, permanently removing ownership. It prevents all future setPerspective calls, making the perspective immutable. If executed, the perspective contract could never be updated even during emergencies.                                                                                                                                                                                                                                                                 | DAO                                                                                                        |
| EulerEarnFactory2                                                             | transferOwnership          | Updates _owner to a new address, transferring factory control. It grants the new owner exclusive access to setPerspective calls. A malicious owner could immediately set a compromised perspective that validates dangerous strategies.                                                                                                                                                                                                                                                           | DAO                                                                                                        |
| EulerEarnFactory2                                                             | setPerspective             | Updates strategy validation rules for all EulerEarn vaults. Malicious change could enable dangerous strategies, but requires BOTH compromised Perspective AND malicious curator to steal user funds. Honest curators provide protection even with bad Perspective.                                                                                                                                                                                                                                | DAO and EthereumVaultConnector                                                                             |
| EthereumVaultConnector                                                        | setLockdownMode            | Freezes or unfreezes all 256 accounts under an address prefix. When enabled, it blocks all operations (deposits, withdrawals, borrows) for the entire account group. Only the owner of the address prefix can call this function.                                                                                                                                                                                                                                                                 | onlyOwner (account prefix owner)                                                                           |
| EthereumVaultConnector                                                        | setPermitDisabledMode      | Enables or disables ERC-2612 permit functionality for an address prefix. When disabled, users must use on-chain approvals instead of gas-efficient off-chain signatures. Only the owner of the address prefix can call this function.                                                                                                                                                                                                                                                             | onlyOwner (account prefix owner)                                                                           |
| EthereumVaultConnector                                                        | setNonce                   | Updates the nonce value for permit signature replay protection within a specific namespace. Setting it to a high value invalidates all existing signed permits. Only the owner of the address prefix can call this function.                                                                                                                                                                                                                                                                      | onlyOwner (account prefix owner)                                                                           |
| EthereumVaultConnector                                                        | enableCollateral           | Adds a vault address to the list of assets that can be used as collateral for a specific account. It determines which tokens the account owner can deposit as collateral for borrowing. Only the account owner or their authorized operator can call this function.                                                                                                                                                                                                                               | onlyOwnerOrOperator (account owner/operator)                                                               |
| EthereumVaultConnector                                                        | disableCollateral          | Removes a vault address from the collateral list for a specific account. It prevents that asset from being used as collateral and may trigger liquidations if the account becomes undercollateralized. Only the account owner or their authorized operator can call this function.                                                                                                                                                                                                                | onlyOwnerOrOperator (account owner/operator)                                                               |
| EthereumVaultConnector                                                        | reorderCollaterals         | Changes the order of collateral assets in the account's collateral list. It affects the liquidation priority when multiple collaterals are present. Only the account owner or their authorized operator can call this function.                                                                                                                                                                                                                                                                   | onlyOwnerOrOperator (account owner/operator)                                                               |
| EthereumVaultConnector                                                        | enableController           | Adds a controller address to the list of authorized controllers for a specific account. It grants that controller permission to perform risk checks and liquidations on the account. Only the account owner or their authorized operator can call this function.                                                                                                                                                                                                                                  | onlyOwnerOrOperator (account owner/operator)                                                               |
| EthereumVaultConnector                                                        | controlCollateral          | Allows an enabled controller to perform collateral management operations (like liquidations) on an account. It is the core mechanism for risk management in the protocol. Only controllers that have been enabled for the specific account can call this function.                                                                                                                                                                                                                                | onlyController (enabled controller for the account)                                                        |
| ProtocolConfig                                                                | setAdmin                   | Transfers admin rights to a new address, changing who can control all protocol configuration parameters. It affects all fee settings, interest rate ranges, and vault-specific configurations. If a malicious admin is set, they could manipulate all protocol parameters to extract value or disrupt operations.                                                                                                                                                                                 | DAO                                                                                                        |
| ProtocolConfig                                                                | setFeeReceiver             | Updates the global protocol fee receiver address that receives fees from all vaults unless overridden. It controls where protocol revenue is sent and affects the protocol's economic model. A malicious fee receiver could redirect all protocol fees to an attacker's address.                                                                                                                                                                                                                  | DAO                                                                                                        |
| ProtocolConfig                                                                | setProtocolFeeShare        | Sets the global protocol fee share percentage. This change affects EVault positions immediately. Users' existing positions will see their fee structure change instantly. Setting it too high could make vaults unprofitable, while setting it too low reduces protocol revenue.                                                                                                                                                                                                                  | DAO                                                                                                        |
| ProtocolConfig                                                                | setInterestFeeRange        | Sets the global minimum and maximum interest fee limits that all vaults must respect. This change affects EVault positions immediately - users' existing positions will see their interest rate bounds change instantly. Setting inappropriate ranges could either make vaults unprofitable or reduce user yields by forcing suboptimal interest rates.                                                                                                                                           | DAO                                                                                                        |
| ProtocolConfig                                                                | setVaultInterestFeeRange   | Sets vault-specific interest fee ranges that override the global defaults. This change affects the targeted vault's positions immediately - users' existing positions in that vault will see their interest rate bounds change instantly. Malicious configuration could reduce user yields by forcing suboptimal interest rates or create market fragmentation that reduces overall efficiency.                                                                                                   | DAO                                                                                                        |
| ProtocolConfig                                                                | setVaultFeeConfig          | Sets vault-specific protocol fee configuration that overrides global defaults. This change affects the targeted vault's positions immediately - users' existing positions in that vault will see their fee structure change instantly. Malicious configuration could redirect vault-specific fees to attacker addresses or create unfair fee structures that reduce user yields.                                                                                                                  | DAO                                                                                                        |
| GovernedPerspective                                                           | transferOwnership          | Transfers ownership to a new address, changing who can verify/unverify vaults. This change affects protocol functionality immediately. The new owner gains immediate control over vault whitelist management. Malicious transfer could give control to an attacker who could then manipulate the vault whitelist.                                                                                                                                                                                 | Euler Labs                                                                                                 |
| GovernedPerspective                                                           | renounceOwnership          | Renounces ownership of the contract, permanently disabling all owner functions. This change affects protocol functionality immediately. No further vault verifications or unverifications will be possible. This is irreversible and could permanently lock the protocol's ability to manage vault whitelist. Existing verified vaults remain functional, but new vaults cannot be added and dangerous vaults cannot be removed.                                                                  | Euler Labs                                                                                                 |
| GovernedPerspective                                                           | perspectiveVerify          | Adds a vault to the whitelist, allowing it to be used in the protocol. This change affects protocol functionality immediately. New vaults become available for use instantly. Malicious verification could enable dangerous or untested vaults that could drain user funds.                                                                                                                                                                                                                       | Euler Labs                                                                                                 |
| GovernedPerspective                                                           | perspectiveUnverify        | Removes a vault from the whitelist, blocking it from further protocol interactions. This change affects protocol functionality immediately. Existing vaults become unavailable for use instantly. Malicious unverification could decommission critical modules, freezing user positions.                                                                                                                                                                                                          | Euler Labs                                                                                                 |
| SnapshotRegistry                                                              | renounceOwnership          | Renounces ownership of the contract, permanently disabling all owner functions. This change affects protocol functionality immediately. No further address additions or revocations will be possible. This is irreversible and could permanently lock the protocol's ability to manage the registry. Existing valid addresses remain functional, but new addresses cannot be added and dangerous addresses cannot be revoked.                                                                     | Euler Labs                                                                                                 |
| SnapshotRegistry                                                              | transferOwnership          | Transfers ownership to a new address, changing who can add/revoke addresses. This change affects protocol functionality immediately. The new owner gains immediate control over registry management. Malicious transfer could give control to an attacker who could then manipulate the registry.                                                                                                                                                                                                 | Euler Labs                                                                                                 |
| SnapshotRegistry                                                              | add                        | Adds an address to the registry with base and quote assets. This change affects protocol functionality immediately. New addresses become available for use instantly. Malicious addition could enable dangerous or untested addresses that could drain user funds.                                                                                                                                                                                                                                | Euler Labs                                                                                                 |
| SnapshotRegistry                                                              | revoke                     | Revokes an address from the registry, marking it as invalid. This change affects protocol functionality immediately. Existing addresses become unavailable for use instantly. Malicious revocation could decommission critical addresses, freezing user positions.                                                                                                                                                                                                                                | Euler Labs                                                                                                 |
| EulerRouter                                                                   | transferGovernance         | Transfers governance control to a new address, changing who can execute administrative functions. It directly controls access to all governor-only functions in the router. A malicious transfer could hand complete control to an attacker, enabling them to reconfigure oracles and vault settings.                                                                                                                                                                                             | Governor via EVC                                                                                           |
| EulerRouter                                                                   | govSetConfig               | Configures price oracles for specific asset pairs, determining how prices are resolved for trading pairs. It directly affects price discovery and trading accuracy. A malicious configuration could set compromised oracles, enabling price manipulation and fund theft through incorrect valuations.                                                                                                                                                                                             | Governor via EVC                                                                                           |
| EulerRouter                                                                   | govSetResolvedVault        | Configures ERC4626 vaults to use internal pricing via convertToAssets methods, determining how vault assets are valued. It affects price resolution for vault-based assets. A malicious configuration could enable price manipulation by setting compromised vaults or removing legitimate ones, affecting trading accuracy.                                                                                                                                                                      | Governor via EVC                                                                                           |
| EulerRouter                                                                   | govSetFallbackOracle       | Replaces the fallback price oracle used when the primary oracle is unavailable. Price feeds directly influence collateral valuations and liquidations. A rogue oracle could report bogus prices, triggering unwarranted liquidations or blocking valid ones.                                                                                                                                                                                                                                      | Governor via EVC                                                                                           |
| PublicAllocator                                                               | setAdmin                   | Changes the admin address for a specific vault, controlling who can execute administrative functions for that vault. It directly affects access to fee management and flow cap settings for the vault. A malicious admin change could hand control to an attacker, enabling them to modify fees and caps without authorization.                                                                                                                                                                   | Admin or Vault Owner via EVC                                                                               |
| PublicAllocator                                                               | setFee                     | Adjusts the fee percentage charged for reallocation operations on a specific vault. It directly affects the cost of using the allocator for that vault. A malicious fee increase could make the allocator prohibitively expensive or redirect all fees to an attacker's account.                                                                                                                                                                                                                  | Admin or Vault Owner via EVC                                                                               |
| PublicAllocator                                                               | setFlowCaps                | Sets the maximum flow limits for specific markets within a vault, controlling how much can be withdrawn or deposited. It affects the capacity and throughput of the allocator for that vault. A malicious cap reduction could severely limit allocator functionality or block legitimate operations.                                                                                                                                                                                              | Admin or Vault Owner via EVC                                                                               |
| PublicAllocator                                                               | transferFee                | Transfers accumulated fees from a specific vault to a specified recipient. It controls where collected fees are sent for that vault. A malicious transfer could redirect all accumulated fees to an attacker's address, draining the vault's revenue.                                                                                                                                                                                                                                             | Admin or Vault Owner via EVC                                                                               |
| Eul                                                                           | grantRole                  | Grants administrative roles to addresses, controlling who can execute admin functions like minting and treasury updates. It directly affects access to critical token management functions. A malicious role grant could hand control to an attacker, enabling them to mint unlimited tokens or change the treasury address.                                                                                                                                                                      | Treasury                                                                                                   |
| Eul                                                                           | revokeRole                 | Revokes administrative roles from addresses, removing their ability to execute admin functions. It affects who can manage the token's critical operations. A malicious revocation could lock out legitimate administrators, preventing proper token management.                                                                                                                                                                                                                                   | Treasury                                                                                                   |
| Eul                                                                           | mint                       | Mints new EUL tokens to the treasury address, increasing the total supply by up to 2.718% annually. It directly affects token inflation and treasury funding. A malicious mint could inflate the token supply beyond intended limits, diluting existing holders' value.                                                                                                                                                                                                                           | Treasury                                                                                                   |
| Eul                                                                           | updateTreasury             | Changes the treasury address that receives newly minted tokens. It controls where new token supply is distributed. A malicious update could redirect all future token minting to an attacker's address, draining the protocol's treasury.                                                                                                                                                                                                                                                         | Treasury                                                                                                   |
| RewardToken                                                                   | transferOwnership          | The _owner variable is modified to assign a new contract owner. Complete administrative control over whitelist management and remainder receiver configuration gets transferred. A malicious transfer would give an attacker full control over reward token wrapping and administrative functions.                                                                                                                                                                                                | Euler Labs via EVC                                                                                         |
| RewardToken                                                                   | setRemainderReceiver       | The remainderReceiver variable gets modified to designate where residual tokens are sent after all distributions. Only unclaimed or excess wrapped tokens that remain in the contract after unlock periods are affected. A malicious change would redirect only these residual amounts to an attacker's address.                                                                                                                                                                                  | Euler Labs via EVC                                                                                         |
| RewardToken                                                                   | setWhitelistStatus (owner) | The whitelistStatus mapping is modified to set an address's privilege level (NONE=0, ADMIN=1, DISTRIBUTOR=2). Administrative wrapping and unwrapping operations on behalf of users become controllable by designated addresses. Maliciously granting ADMIN status would allow an attacker to wrap/unwrap tokens and control the locked reward distribution process.                                                                                                                               | Euler Labs via EVC                                                                                         |
| RewardToken                                                                   | setWhitelistStatus (admin) | The whitelistStatus mapping gets modified and requires ADMIN-level privileges to execute. Existing admins can promote other addresses to administrative roles within the reward token system. A compromised admin could create multiple attack vectors by promoting accomplices to ADMIN status.                                                                                                                                                                                                  | Euler Labs via EVC                                                                                         |
| RewardToken                                                                   | depositFor                 | Both _totalSupply and _balances increase by wrapping underlying ERC20 tokens into locked RewardTokens for any specified address. Admins must provide actual underlying tokens which get locked according to the 180-day unlock schedule. A malicious admin could wrap their own underlying tokens and credit the locked RewardTokens to themselves or accomplices.                                                                                                                                | Euler Deployer or DAO or Address 1                                                                         |
| RewardToken                                                                   | withdrawTo                 | Both _totalSupply and _balances decrease while transferring unlocked underlying assets to any specified address. Admins can unwrap RewardTokens that have passed their unlock schedule and send the underlying assets anywhere. A malicious admin could withdraw all unlocked underlying assets from the contract to their own address.                                                                                                                                                           | Euler Deployer or DAO or Address 1                                                                         |
| RewardToken                                                                   | renounceOwnership          | The _owner variable gets set to the zero address, permanently removing all owner privileges. All ability to modify whitelist settings or remainder receiver configuration disappears forever. Premature execution would permanently lock the contract's administrative functions, preventing any future emergency interventions or parameter updates.                                                                                                                                             | Euler Labs via EVC                                                                                         |
| OFTAdapterUpgradeable                                                         | setMsgInspector            | Updates the address of the contract used to inspect incoming cross‐chain messages. It determines which messages pass security checks before execution. A malicious inspector could bypass validation and allow unauthorized messages.                                                                                                                                                                                                                                                             | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable                                                         | setEnforcedOptions         | configures the bitmask of enforced runtime options for message handling. It dictates gas limits, fee flags, and other critical execution parameters. A malicious update could disable safety options or enforce unsafe flags, leading to stuck transfers or fund loss.                                                                                                                                                                                                                            | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable                                                         | setPreCrime                | Toggles the "pre-crime" simulation mode for incoming cross‐chain messages. It enables off‐chain safety checks before execution. Disabling it could allow unvetted messages to run, risking fund theft or state corruption.                                                                                                                                                                                                                                                                        | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable                                                         | setPeer                    | Sets the trusted peer contract address on the remote chain. It determines which counterparty contract this adapter will communicate with. Pointing to a malicious peer could redirect all messages through an attacker’s contract.                                                                                                                                                                                                                                                                | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable                                                         | setDelegate                | Assigns the delegate implementation that processes core adapter logic. It controls which code path handles message execution. A rogue delegate could hijack transfers, mint or burn tokens arbitrarily or steal funds.                                                                                                                                                                                                                                                                            | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable                                                         | renounceOwnership          | Removes the owner role by setting it to the zero address. It permanently locks out all onlyOwner calls, preventing future configuration changes or emergency fixes. Executed prematurely, it could block critical updates during an exploit.                                                                                                                                                                                                                                                      | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable                                                         | transferOwnership          | Transfers the onlyOwner role to a new address. It changes who can call all owner‐only functions above. A malicious transfer could hand control to an attacker, enabling them to reconfigure the adapter or steal funds.                                                                                                                                                                                                                                                                           | NONE (initialize() disabled)                                                                               |
| OFTAdapterUpgradeable2                                                        | setMsgInspector            | Sets the message inspector for LayerZero cross-chain transfers. A malicious inspector could intercept, modify, or block cross-chain messages, potentially stealing funds or disrupting the bridge functionality.                                                                                                                                                                                                                                                                                  | 0x0                                                                                                        |
| OFTAdapterUpgradeable2                                                        | setEnforcedOptions         | Configures mandatory options for LayerZero transfers (gas limits, execution parameters). Malicious changes could make transfers fail, cause fund loss, or enable manipulation of cross-chain operations.                                                                                                                                                                                                                                                                                          | 0x0                                                                                                        |
| OFTAdapterUpgradeable2                                                        | renounceOwnership          | Permanently removes the owner, making all onlyOwner functions inaccessible forever. This would freeze the cross-chain bridge configuration, preventing any future updates or emergency interventions.                                                                                                                                                                                                                                                                                             | 0x0                                                                                                        |
| OFTAdapterUpgradeable2                                                        | transferOwnership          | Changes the contract owner who controls all LayerZero bridge parameters. A malicious new owner could reconfigure the bridge to steal funds, redirect transfers, or compromise cross-chain security.                                                                                                                                                                                                                                                                                               | 0x0                                                                                                        |
| OFTAdapterUpgradeable2                                                        | setPreCrime                | Configures the PreCrime security module for LayerZero. Malicious changes could disable security checks, enabling cross-chain attacks, or set malicious PreCrime contracts that manipulate transaction validation.                                                                                                                                                                                                                                                                                 | 0x0                                                                                                        |
| OFTAdapterUpgradeable2                                                        | setPeer                    | Sets trusted peer contracts on other blockchains. Malicious changes could redirect cross-chain transfers to attacker-controlled contracts, enabling fund theft or manipulation of the bridge.                                                                                                                                                                                                                                                                                                     | 0x0                                                                                                        |
| OFTAdapterUpgradeable2                                                        | setDelegate                | Sets the LayerZero delegate address for the contract. A malicious delegate could control cross-chain message routing, potentially intercepting or redirecting funds during bridge operations.                                                                                                                                                                                                                                                                                                     | 0x0                                                                                                        |
| GovernorAccessControlEmergency                                                | fallback                   | The fallback function catches any calls that don't match existing function signatures and forwards them to the appropriate role-based handler. It enables dynamic execution of emergency governance actions through role-based access control. A compromised emergency guardian could execute unauthorized protocol changes bypassing normal governance delays.                                                                                                                                   | EVC                                                                                                        |
| GovernorAccessControlEmergency                                                | grantRole                  | Modifies the _roles mapping to assign specific roles within the GovernorAccessControlEmergency system. This function manages three types of roles: (1) Emergency roles (LTV_EMERGENCY_ROLE, CAPS_EMERGENCY_ROLE, HOOK_EMERGENCY_ROLE) that enable immediate risk parameter reductions without delay, (2) Selector-specific roles (e.g. setCaps selector, setInterestRateModel selector) that grant permission to call specific governance functions, (3) WILD_CARD role that permits calling any function. All role assignments are subject to mandatory 48-hour timelock delay via accessControlEmergencyGovernorAdminTimelockController. A malicious DAO could grant dangerous roles to compromised addresses after 48h, enabling unauthorized parameter modifications, though the delay provides users an exit window.                                                                                                                                         | DAO                                               |
| GovernorAccessControlEmergency                                                | revokeRole                 | | Modifies the _roles mapping to remove specific roles from designated addresses within the GovernorAccessControlEmergency system. Controls the removal of emergency privileges (LTV_EMERGENCY_ROLE, CAPS_EMERGENCY_ROLE, HOOK_EMERGENCY_ROLE), selector-specific permissions, or WILD_CARD access. All role revocations are subject to mandatory 48-hour timelock delay via accessControlEmergencyGovernorAdminTimelockController. A malicious DAO could revoke legitimate roles after 48h, disabling critical risk management capabilities during market stress, though users have an exit window during the delay period.                                                                                                                                 | DAO                                                           |
| GovernorAccessControlEmergency                                                | renounceRole               | The role assignments mapping gets updated when an address voluntarily gives up its emergency powers. It allows emergency guardians to permanently remove their own privileges. Premature role renunciation could leave the protocol without adequate emergency response capabilities during crises.                                                                                                                                                                                               | Individual role holders (self-renunciation only)                                                           |
| GovernorAccessControlEmergency                                                | setLTV                     | The LTV parameters for collateral assets get modified to control maximum borrowing ratios. This function has TWO execution paths: (1) Emergency path via LTV_EMERGENCY_ROLE (CapRiskSteward) allows immediate lowering of borrow LTV with 0 delay, (2) Normal governance path via WILD_CARD role (DAO via wildcardTimelock) allows any LTV adjustments with 48h delay providing exit window. | CapRiskSteward (LTV_EMERGENCY_ROLE) or DAO (WILD_CARD) |                                                                                                |
| GovernorAccessControlEmergency | setHookConfig | The hook configuration for vault interactions gets updated to control automated behaviors and integrations. This function is controlled ONLY via the WILD_CARD role (DAO via wildcardTimelock) with 48h delay providing exit window. No emergency role is currently assigned for immediate hook modifications.| DAO(WILD_CARD) |
| GovernorAccessControlEmergency | setCaps | The supply and borrow caps for specific assets get adjusted. This function has TWO execution paths: (1) Emergency path via CAPS_EMERGENCY_ROLE (CapRiskSteward) allows immediate lowering of caps during market stress with 0 delay, (2) Normal governance path via WILD_CARD role (DAO via wildcardTimelock) allows any cap adjustments with 48h delay providing exit window.| CapRiskSteward (CAPS_EMERGENCY_ROLE) or DAO(WILD_CARD)
 |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | grantRole                  | Modifies the _roles mapping to assign a specific role to a given address. Controls who can access critical timelock functions like proposing, cancelling, and executing operations. A malicious TimelockController could grant itself all roles or assign them to compromised addresses, completely undermining the governance system.                                                                                                                                                            | TimelockController (accessControlEmergencyGovernorAdminTimelockController) (DEFAULT_ADMIN_ROLE)            |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | revokeRole                 | Modifies the _roles mapping to remove a specific role from a given address. Controls the revocation of access permissions to critical timelock functions. A malicious TimelockController could revoke roles from legitimate addresses, permanently blocking governance processes.                                                                                                                                                                                                                 | TimelockController (accessControlEmergencyGovernorAdminTimelockController) (DEFAULT_ADMIN_ROLE)            |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | schedule                   | Modifies the _timestamps mapping to register an operation with a minimum 48-hour execution delay. Determines which operations can be queued for future execution on all contracts controlled by this timelock. A malicious proposer could schedule dangerous operations like malicious upgrades or unauthorized fund transfers.                                                                                                                                                                   | DAO (PROPOSER_ROLE)                                                                                        |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | scheduleBatch              | Modifies the _timestamps mapping to register multiple simultaneous operations with a minimum 48-hour execution delay. Enables coordination of complex changes requiring multiple atomic transactions across the Euler ecosystem. A malicious proposer could schedule coordinated operation batches to extract funds or compromise multiple contracts simultaneously.                                                                                                                              | DAO (PROPOSER_ROLE)                                                                                        |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | cancel                     | Modifies the _timestamps mapping by deleting the entry corresponding to the targeted operation ID. Allows cancellation of scheduled operations before execution to prevent dangerous changes. A malicious canceller could cancel legitimate critical operations like security fixes or urgent updates.                                                                                                                                                                                            | DAO + Euler Labs (CANCELLER_ROLE) (CANCELLER_ROLE)                                                         |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | execute                    | Modifies the _timestamps mapping by marking the operation as executed and performs the call to the target contract. Executes scheduled operations after the delay has elapsed, concretely applying governance changes. Anyone can execute valid operations since EXECUTOR_ROLE is assigned to address(0), potentially allowing premature execution of sensitive operations by unauthorized actors.                                                                                                | Open to all (address(0))                                                                                   |
| TimelockController (accessControlEmergencyGovernorAdminTimelockController)    | executeBatch               | Modifies the _timestamps mapping by marking the batch operation as executed and performs all calls to target contracts. Simultaneously executes multiple scheduled operations after the delay has elapsed, applying coordinated changes across the ecosystem. Anyone can execute valid operation batches, potentially allowing execution of complex changes by actors who did not participate in their planning.                                                                                  | Open to all (address(0))                                                                                   |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | grantRole                  | Modifies the _roles mapping to assign a specific role to a given address. Controls who can access critical timelock functions like proposing, cancelling, and executing operations. A malicious TimelockController2 could grant itself all roles or assign them to compromised addresses, completely undermining the governance system.                                                                                                                                                           | TimelockController (accessControlEmergencyGovernorWildcardTimelockController) (DEFAULT_ADMIN_ROLE)         |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | revokeRole                 | Modifies the _roles mapping to remove a specific role from a given address. Controls the revocation of access permissions to critical timelock functions. A malicious TimelockController2 could revoke roles from legitimate addresses, permanently blocking governance processes.                                                                                                                                                                                                                | TimelockController (accessControlEmergencyGovernorWildcardTimelockController) (DEFAULT_ADMIN_ROLE)         |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | schedule                   | Modifies the _timestamps mapping to register an operation with a minimum 48-hour execution delay. Determines which operations can be queued for future execution on all contracts controlled by this wildcard timelock. A malicious proposer could schedule dangerous operations like malicious upgrades or unauthorized fund transfers.                                                                                                                                                          | DAO (PROPOSER_ROLE)                                                                                        |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | scheduleBatch              | Modifies the _timestamps mapping to register multiple simultaneous operations with a minimum 48-hour execution delay. Enables coordination of complex changes requiring multiple atomic transactions across the Euler ecosystem. A malicious proposer could schedule coordinated operation batches to extract funds or compromise multiple contracts simultaneously.                                                                                                                              | DAO (PROPOSER_ROLE)                                                                                        |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | cancel                     | Modifies the _timestamps mapping by deleting the entry corresponding to the targeted operation ID. Allows cancellation of scheduled operations before execution to prevent dangerous changes. A malicious canceller could cancel legitimate critical operations like security fixes or urgent updates.                                                                                                                                                                                            | DAO or Euler Labs (CANCELLER_ROLE)                                                                          |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | execute                    | Modifies the _timestamps mapping by marking the operation as executed and performs the call to the target contract. Executes scheduled operations after the delay has elapsed, concretely applying governance changes. Anyone can execute valid operations since EXECUTOR_ROLE is assigned to address(0), potentially allowing premature execution of sensitive operations by unauthorized actors.                                                                                                | Open to all (address(0))                                                                                   |
| TimelockController (accessControlEmergencyGovernorWildcardTimelockController) | executeBatch               | Modifies the _timestamps mapping by marking the batch operation as executed and performs all calls to target contracts. Simultaneously executes multiple scheduled operations after the delay has elapsed, applying coordinated changes across the ecosystem. Anyone can execute valid operation batches, potentially allowing execution of complex changes by actors who did not participate in their planning.                                                                                  | Open to all (address(0))                                                                                   |
| CapRiskSteward                                                                | setCaps                    | Modifies the lastCapUpdate mapping and calls the GovernorAccessControlEmergency to adjust supply and borrow caps with a 24-hour cooldown and maximum 200% increase or 50% decrease per adjustment period. Controls vault exposure limits through time-delayed and magnitude-limited adjustments. A malicious riskSteward multisig could increase caps by 100% every 24 hours, potentially reaching 4x original limits within 48 hours, or reduce caps by 50% every 24 hours until reaching minimal levels. | riskSteward                                                                                       |
| CapRiskSteward                                                                | setInterestRateModel       | Validates the new IRM against EulerKinkIRMFactory and calls the GovernorAccessControlEmergency to update the vault's interest rate model with no time restrictions. Factory has deployed IRMs with rates up to 425% APY after utilization kink, allowing immediate switching between extreme rate models. A malicious riskSteward multisig could instantly switch to high-rate IRMs (up to 425% APY), immediately increasing borrowing costs and potentially forcing liquidations.                         | riskSteward                                                                                       |
| CapRiskSteward                                                                | grantRole                  | Modifies the access control mapping to assign specific roles within the CapRiskSteward system. Controls who can execute risk management functions beyond individual vault owners. A malicious DAO could grant steward permissions to compromised addresses, enabling parameter manipulation across multiple vaults.                                                                                                                                                                               | DAO                                                                                                        |
| CapRiskSteward                                                                | revokeRole                 | Modifies the access control mapping to remove specific roles from addresses within the CapRiskSteward system. Controls the removal of risk management privileges. A malicious DAO could revoke legitimate steward access, blocking critical parameter adjustments during market stress.                                                                                                                                                                                                           | DAO                                                                                                        |
| CapRiskSteward                                                                | renounceRole               | Modifies the access control mapping when an address voluntarily gives up its steward role. Allows role holders to permanently remove their own privileges. Premature role renunciation could leave the system without adequate risk management capabilities during critical situations.                                                                                                                                                                                                           | Individual role holders via EVC                                                                            |
| FactoryGovernor                                                               | grantRole                  | Modifies the access control mapping to assign specific roles within the FactoryGovernor system. Subject to mandatory 4-day timelock delay via eVaultFactoryTimelockController. Controls who can execute critical factory operations like pausing all vaults and making admin calls. A malicious eVaultFactoryTimelockController could grant guardian privileges to compromised addresses, enabling unauthorized factory shutdowns.                                                                | TimelockController (eVaultFactoryTimelockController)                                                       |
| FactoryGovernor                                                               | revokeRole                 | Modifies the access control mapping to remove specific roles from addresses within the FactoryGovernor system. Subject to mandatory 4-day timelock delay via eVaultFactoryTimelockController. Controls the removal of critical factory operation privileges. A malicious eVaultFactoryTimelockController could revoke legitimate guardian access, blocking emergency factory pauses during critical exploits.                                                                                     | TimelockController (eVaultFactoryTimelockController)                                                       |
| FactoryGovernor                                                               | adminCall                  | Executes arbitrary calls on the GenericFactory, including setImplementation for upgrading all BeaconProxy vaults and setUpgradeAdmin for transferring factory control. Subject to mandatory 4-day timelock delay via eVaultFactoryTimelockController. Provides complete administrative control over the factory that manages all upgradeable vaults. A malicious admin could upgrade the factory to a compromised implementation, affecting all vaults simultaneously and potentially draining all user funds. | TimelockController (eVaultFactoryTimelockController)                                                       |
| FactoryGovernor                                                               | pause                      | Replaces the factory implementation with a ReadOnlyProxy, immediately blocking all write operations across all upgradeable vaults. Prevents further deposits, withdrawals, and borrows until unpaused. A malicious guardian could permanently freeze all vault operations, trapping user funds indefinitely.                                                                                                                                                                                      | Euler Labs or EOA 1 or EOA 2                                                                               |
| FactoryGovernor                                                               | unpause                    | Restores the original factory implementation from the ReadOnlyProxy, re-enabling all write operations across all vaults. Resumes normal vault functionality after an emergency pause. A malicious unpause admin could prematurely restore operations before fixing critical vulnerabilities, re-exposing users to exploits.                                                                                                                                                                       | Euler Labs                                                                                                 |
| TimelockController (eVaultFactoryTimelockController)                          | grantRole                  | Modifies the _roles mapping to assign a specific role to a given address. Controls who can access critical timelock functions for the eVault factory with a 4-day execution delay. A malicious TimelockController3 could grant itself all roles or assign them to compromised addresses, completely undermining the factory governance system.                                                                                                                                                    | TimelockController (eVaultFactoryTimelockController) (DEFAULT_ADMIN_ROLE)(eVaultFactoryTimelockController) |
| TimelockController (eVaultFactoryTimelockController)                          | revokeRole                 | Modifies the _roles mapping to remove a specific role from a given address. Controls the revocation of access permissions to critical factory timelock functions. A malicious TimelockController3 could revoke roles from legitimate addresses, permanently blocking factory governance processes.                                                                                                                                                                                                | TimelockController (eVaultFactoryTimelockController) (DEFAULT_ADMIN_ROLE)(eVaultFactoryTimelockController) |
| TimelockController (eVaultFactoryTimelockController)                          | schedule                   | Modifies the _timestamps mapping to register an operation with a minimum 4-day execution delay. Determines which factory operations can be queued for future execution with extended timelock protection. A malicious proposer could schedule dangerous factory operations like implementation upgrades or parameter changes affecting all vaults.                                                                                                                                                | DAO (PROPOSER_ROLE)                                                                                        |
| TimelockController (eVaultFactoryTimelockController)                          | scheduleBatch              | Modifies the _timestamps mapping to register multiple simultaneous operations with a minimum 4-day execution delay. Enables coordination of complex factory changes requiring multiple atomic transactions with extended protection. A malicious proposer could schedule coordinated factory operation batches to compromise the entire vault ecosystem simultaneously.                                                                                                                           | DAO (PROPOSER_ROLE)                                                                                        |
| TimelockController (eVaultFactoryTimelockController)                          | cancel                     | Modifies the _timestamps mapping by deleting the entry corresponding to the targeted operation ID. Allows cancellation of scheduled factory operations before execution to prevent dangerous changes. A malicious canceller could cancel legitimate critical factory operations like security fixes or urgent implementation updates.                                                                                                                                                             | DAO or Security Council (CANCELLER_ROLE)                                                                   |
| TimelockController (eVaultFactoryTimelockController)                          | execute                    | Modifies the _timestamps mapping by marking the operation as executed and performs the call to the target contract. Executes only operations previously scheduled by authorized proposers after the mandatory 4-day delay has elapsed. Anyone can trigger execution of valid operations, but only operations pre-approved by the DAO can be executed, providing transparent and predictable governance execution.                                                                                 | Open to all (address(0))                                                                                   |
| TimelockController (eVaultFactoryTimelockController)                          | executeBatch               | Modifies the _timestamps mapping by marking the batch operation as executed and performs all calls to target contracts. Executes only operation batches previously scheduled by authorized proposers after the mandatory 4-day delay. Anyone can trigger batch execution, but only batches pre-approved by the DAO can be executed, ensuring coordinated governance changes remain under DAO control.                                                                                             | Open to all (address(0))                                                                                   |
