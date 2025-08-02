---
protocol: "Euler V2"
website: "https://www.eulerlabs.com/"
x: "https://x.com/eulerfinance"
github: ["https://github.com/euler-xyz/euler-interfaces"]
defillama_slug: ["euler-v2"]
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "L"]
author: ["author-1", "author-2"]
submission_date: "2025-07-01"
publish_date: "2025-07-01"
update_date: "2025-07-01"
---

# Summary

Euler V2 is a permissioned, decentralized lending and borrowing protocol deployed on Ethereum. It allows users to deposit assets as collateral, borrow against them, and earn interest via an on-chain interest rate model. The protocol employs smart contracts such as EVaults, a generic factory, and a router to handle asset flows, and integrates with oracles and governance modules to manage risk and updates.

# Ratings

## Chain
Compound-v2 is deployed on various chains. This review is based on the Ethereum mainnet deployment.

> Chain score: Low

See http://defiscan.info/learn-more#chain for more guidance.

> Chain score: Low/Medium/High

## Upgradeability

Euler V2 uses a TimelockController and Governor modules to manage upgrades and parameter changes. Critical functions such as **transferGovernance**, **govSet***, and **setGovernorAdmin** are permissioned to a multisig and EVC owner via onlyOwner or onlyRole checks. A malicious or compromised owner could reconfigure fees, redirect assets, or upgrade to malicious logic, presenting a High upgradeability risk.

> Upgradeability score: High

## Autonomy

Most core parameters are controlled by privileged roles and multisigs rather than a fully on-chain DAO. While some processes are executed through timelock delays, operators retain the ability to pause, set limits, and change oracles without broad community consensus, leading to a High centralization risk in autonomy.

> Autonomy score: High

## Exit Window

Users can always deposit and withdraw through the router, but sudden parameter changes or oracle updates could trigger liquidations or block new orders. The timelock provides a brief notice, but there is no guaranteed grace period for borrowers to adjust, resulting in a High exit risk.

> Exit Window score: High

## Accessibility

Euler V2 supports common wallets and Web3 interfaces, but the complexity of collateral and EVC checks may limit non-technical user adoption. Documentation is thorough but advanced concepts pose a moderate barrier, giving an Medium score.

> Accessibility score: Medium

## Conclusion

Euler V2 exhibits high risk in Upgradeability, Autonomy, and Exit Window, reflecting significant centralization control by privileged roles. It therefore remains at Stage 0.

To progress to Stage 1, Euler could decentralize key governance functions to token holders and introduce an on-chain DAO majority for parameter changes. Stage 2 could be reached by fully open-sourcing upgrade proposals, implementing time-delayed community voting, and further lowering multisig thresholds.

> Overall score: Stage 0

# Reviewer's Notes

No critical permissions were omitted; all onlyOwner and onlyRole functions have been assessed. During analysis, we noted that the *timelock* delay may be as short as 48 hours, which could be insufficient for large positions to exit safely.

# Protocol Analysis

Here include the diagram(s). Please explain what the main contracts are doing within the diagram.

# Dependencies

Euler V2 relies on Chainlink and custom fallback oracles, a cross-chain messaging layer for collateral management, and EVC (Ethereum Vault Connector) for stepping through risk checks.

# Governance

## Relevant Subsection

Governance uses a two-tier timelock and GovernorAccessControlEmergency module; parameter updates require EVC authentication and timelock scheduling.

## Security Council

New table with all the multisigs

| Name               | Account                                                                                                               | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| -------------------| --------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| Euler DAO Timelock | [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) | Multisig 4/8 | ✅          | ✅             | ✅                | ✅             |

# Contracts & Permissions

## Contracts

| Contract Name                              | Address                                                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| OFTAdapterUpgradeable (Proxy)              | [0x4d7e09f73843Bd4735AaF7A74b6d877bac75a531](https://etherscan.io/address/0x4d7e09f73843Bd4735AaF7A74b6d877bac75a531) |
| OFTAdapterUpgradeable (Implementation)     | [0x3bf1bd5db4457d22a85d45791b6291b98d0fc5b5](https://etherscan.io/address/0x3bf1bd5db4457d22a85d45791b6291b98d0fc5b5) |
| TrackingRewardStreams                      | [0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3](https://etherscan.io/address/0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3) |
| GenericFactory (eVaultFactory)             | [0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e](https://etherscan.io/address/0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e) |
| EVault (Implementation)                    | [0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D](https://etherscan.io/address/0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D) |
| EulerEarnFactory                           | [0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427](https://etherscan.io/address/0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427) |
| EulerEarn (Implementation)                 | [0xBa42141648dFD74388f3541C1d80fa9387043Da9](https://etherscan.io/address/0xBa42141648dFD74388f3541C1d80fa9387043Da9) |
| EthereumVaultConnector (EVC)               | [0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383) |
| ProtocolConfig                             | [0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b](https://etherscan.io/address/0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b) |
| SequenceRegistry                           | [0xEADDD21618ad5Deb412D3fD23580FD461c106B54](https://etherscan.io/address/0xEADDD21618ad5Deb412D3fD23580FD461c106B54) |
| GovernorAccessControlEmergency             | [0x35400831044167E9E2DE613d26515eeE37e30a1b](https://etherscan.io/address/0x35400831044167E9E2DE613d26515eeE37e30a1b) |
| TimelockController                         | [0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59](https://etherscan.io/address/0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59) |
| TimelockController                         | [0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a](https://etherscan.io/address/0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a) |
| FactoryGovernor                            | [0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d](https://etherscan.io/address/0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d) |
| TimelockController                         | [0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968) |
| AccountLens                                | [0x94B9D29721f0477402162C93d95B3b4e52425844](https://etherscan.io/address/0x94B9D29721f0477402162C93d95B3b4e52425844) |
| EulerEarnVaultLens                         | [0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f](https://etherscan.io/address/0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f) |
| IRMLens                                    | [0x35B2Fa6206fCC6f653B75832C281bf9d4eBfeaC2](https://etherscan.io/address/0x35B2Fa6206fCC6f653B75832C281bf9d4eBfeaC2) |
| OracleLens                                 | [0x53DcfC583F835A23A69185E7EDB0560E8cB1858A](https://etherscan.io/address/0x53DcfC583F835A23A69185E7EDB0560E8cB1858A) |
| UtilsLens                                  | [0x3Ebfd228dD4F497B90fB8f7AC68E5Fb5E027Fb36](https://etherscan.io/address/0x3Ebfd228dD4F497B90fB8f7AC68E5Fb5E027Fb36) |
| VaultLens                                  | [0xA8695d44EC128136F8Afcd796D6ba3Db3cdA8914](https://etherscan.io/address/0xA8695d44EC128136F8Afcd796D6ba3Db3cdA8914) |
| EulerIRMAdaptiveCurveFactory               | [0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42](https://etherscan.io/address/0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42) |
| EdgeFactory                                | [0xA969B8a46166B135fD5AC533AdC28c816E1659Bd](https://etherscan.io/address/0xA969B8a46166B135fD5AC533AdC28c816E1659Bd) |
| EdgeFactoryPerspective                     | [0x8c7543f83D3d295F68447792581F73d7d5D4d788](https://etherscan.io/address/0x8c7543f83D3d295F68447792581F73d7d5D4d788) |
| EscrowedCollateralPerspective              | [0x4e58BBEa423c4B9A2Fc7b8E58F5499f9927fADdE](https://etherscan.io/address/0x4e58BBEa423c4B9A2Fc7b8E58F5499f9927fADdE) |
| EulerEarnFactoryPerspective                | [0xC09be111D95171d1D5db43f1324005D21C098B52](https://etherscan.io/address/0xC09be111D95171d1D5db43f1324005D21C098B52) |
| GovernedPerspective                        | [0x747a726736DDBE6210B9d7187b3479DC5705165E](https://etherscan.io/address/0x747a726736DDBE6210B9d7187b3479DC5705165E) |
| EulerUngovernedPerspective                 | [0xb50a07C2B0F128Faa065bD18Ea2091F5da5e7FbF](https://etherscan.io/address/0xb50a07C2B0F128Faa065bD18Ea2091F5da5e7FbF) |
| EulerUngovernedPerspective                 | [0x600bBe1D0759F380Fea72B2e9B2B6DCb4A21B507](https://etherscan.io/address/0x600bBe1D0759F380Fea72B2e9B2B6DCb4A21B507) |
| EVKFactoryPerspective                      | [0xB30f23bc5F93F097B3A699f71B0b1718Fc82e182](https://etherscan.io/address/0xB30f23bc5F93F097B3A699f71B0b1718Fc82e182) |
| SnapshotRegistry (external Vault Registry) | [0xB3b30ffb54082CB861B17DfBE459370d1Cc219AC](https://etherscan.io/address/0xB3b30ffb54082CB861B17DfBE459370d1Cc219AC) |
| FeeFlowController                          | [0xFcd3Db06EA814eB21C84304fC7F90798C00D1e32](https://etherscan.io/address/0xFcd3Db06EA814eB21C84304fC7F90798C00D1e32) |
| GovernedPerspective                        | [0xC0121817FF224a018840e4D15a864747d36e6Eb2](https://etherscan.io/address/0xC0121817FF224a018840e4D15a864747d36e6Eb2) |
| GovernorAccessControlEmergencyFactory      | [0x025C8831c6E45420DF8E71F7B6b99F733D120Faf](https://etherscan.io/address/0x025C8831c6E45420DF8E71F7B6b99F733D120Faf) |
| SnapshotRegistry (irm registry)            | [0x0a64670763777E59898AE28d6ACb7f2062BF459C](https://etherscan.io/address/0x0a64670763777E59898AE28d6ACb7f2062BF459C) |
| EulerKinkIRMFactory                        | [0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9](https://etherscan.io/address/0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9) |
| SnapshotRegistry (Oracle adapter registry) | [0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6](https://etherscan.io/address/0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6) |
| EulerRouterFactory (Oracle router)         | [0x70B3f6F61b7Bf237DF04589DdAA842121072326A](https://etherscan.io/address/0x70B3f6F61b7Bf237DF04589DdAA842121072326A) |
| EulerRouter (example Oracle router)        | [0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57](https://etherscan.io/address/0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57) |
| Eul (Token)                                | [0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b](https://etherscan.io/address/0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b) |
| rEul (Reward Token)                        | [0xf3e621395fc714B90dA337AA9108771597b4E696](https://etherscan.io/address/0xf3e621395fc714B90dA337AA9108771597b4E696) |

## Permission owners

| Name               | Account                                                                                                               | Type         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| DAO                | [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) | Multisig 4/8 |
| Euler Labs         | [0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) | Multisig     |
| Security Council   | [0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53](https://etherscan.io/address/0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53) | Multisig     |
| Security Partner A | [0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471](https://etherscan.io/address/0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471) | Multisig 2/3 |
| Security Partner B | [0x62962b4d506b0065a133f37e19D163E5b002b655](https://etherscan.io/address/0x62962b4d506b0065a133f37e19D163E5b002b655) | Multisig     |

## Permissions

| Contract                      | Function         | Impact                                                                                                                               | Owner                   |
| ----------------------------- | ------------     | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| OFTAdapterUpgradeable         | setMsgInspector  | Updates the address of the contract used to inspect incoming cross‐chain messages.It determines which messages pass security checks before execution. A malicious inspector could bypass validation and allow unauthorized messages.   | onlyOwner               |
| OFTAdapterUpgradeable         | setEnforcedOptions | configures the bitmask of enforced runtime options for message handling. It dictates gas limits, fee flags, and other critical execution parameters. A malicious update could disable safety options or enforce unsafe flags, leading to stuck transfers or fund loss.                                      |  onlyOwner |
| OFTAdapterUpgradeable         | setPreCrime | Toggles the "pre-crime" simulation mode for incoming cross‐chain messages. It enables off‐chain safety checks before execution. Disabling it could allow unvetted messages to run, risking fund theft or state corruption.                                | onlyOwner |
| OFTAdapterUpgradeable         | setPeer | Sets the trusted peer contract address on the remote chain. It determines which counterparty contract this adapter will communicate with. Pointing to a malicious peer could redirect all messages through an attacker’s contract. | onlyOwner |
| OFTAdapterUpgradeable         | setDelegate | Assigns the delegate implementation that processes core adapter logic. It controls which code path handles message execution. A rogue delegate could hijack transfers, mint or burn tokens arbitrarily or steal funds. | onlyOwner |
| OFTAdapterUpgradeable         | renounceOwnership | Removes the owner role by setting it to the zero address. It permanently locks out all onlyOwner calls, preventing future configuration changes or emergency fixes. Executed prematurely, it could block critical updates during an exploit. | onlyOwner |
| OFTAdapterUpgradeable         | transferOwnership | Transfers the onlyOwner role to a new address. It changes who can call all owner‐only functions above. A malicious transfer could hand control to an attacker, enabling them to reconfigure the adapter or steal funds. | onlyOwner |
| EVault                        | setGovernorAdmin | Updates which address holds the governor role for this vault. It determines who can later call any governorOnly functions. A malicious change could hand vault control to an attacker, allowing them to reconfigure fees or collateral parameters. | governorOnly |
| EVault                        | setFeeReceive    | Changes the address that collects protocol fees from this vault. It directly affects where user-paid fees flow. A rogue update could divert all fees to an attacker’s account, draining protocol revenue. | governorOnly |
| EVault                        | setLTV           | Sets the loan-to-value ratio used when users borrow against collateral. It controls how much borrowing power users have. An attacker could set an arbitrarily high LTV, enabling under-collateralized borrows that risk insolvency. | governorOnly |
| EVault                        | setMaxLiquidationDiscount | Configures the maximum discount liquidators receive when seizing collateral. It governs the economic incentive for liquidators. A maliciously high discount could drain vault assets during liquidation events. | governorOnly |
| EVault                        | setLiquidationCoolOffTime | Defines the minimum time between successive liquidations on a single account. It impacts how often users can be liquidated under stress. Setting it to zero could allow continuous liquidations, potentially wiping out user positions. | governorOnly |
| EVault                        | setInterestRateModel | Swaps in the contract that calculates per-block interest rates. It controls how users accrue interest on deposits and loans. A malicious model could impose exorbitant rates or break interest accrual logic, harming user funds. | governorOnly |
| EVault                        | setHookConfig        | Sets parameters for on-chain hooks (e.g. custom logic on deposits/withdrawals). It influences extensibility and integrations. A rogue config could execute arbitrary code on every user interaction, siphoning funds stealthily. | governorOnly |
| EVault                        | setConfigFlags       | Toggles internal feature flags (e.g. enabling/disabling specific checks or behaviors). It affects core vault behavior without redeploying. Turning off critical flags could bypass safety checks and allow exploits. | governorOnly |
| EVault                        | setCaps      | Updates maximum deposit or borrow caps for this vault. It influences vault size and exposure limits. A malicious cap change could lock out new deposits or abruptly halt borrowing, disrupting user access. | governorOnly |
| EVault                        | setInterestFee       | Adjusts the protocol’s share of interest earned in the vault. It affects the split between user yield and protocol revenue. An attacker setting this to 100% could redirect all accrued interest to themselves, starving users of earnings. | governorOnly |
| EthereumVaultConnector        | setLockdownMode      | Toggles the vault connector’s "lockdown" emergency mode, disabling all user interactions. It directly controls whether deposits, withdrawals, and borrows can proceed. Enabling it maliciously could freeze all user funds without recourse. | onlyOwner |
| EthereumVaultConnector        | setPermitDisabledMode | Switches off the ERC-2612 permit functionality for this connector. It prevents users from approving token transfers via off-chain signatures. Disabling it maliciously could block all gas-efficient deposits, forcing users into expensive on-chain approvals. | onlyOwner |
| EthereumVaultConnector        | setNonce | Advances the signature nonce used for permit2 approvals on this connector. It ensures old permits can’t be replayed after critical parameter changes. Resetting or mis-setting it maliciously could invalidate all user-signed approvals, locking functionality. | onlyOwner |
| EthereumVaultConnector        | enableCollateral | Whitelists a new asset as acceptable collateral in this connector. It controls which tokens users can deposit and borrow against. Adding a malicious or worthless token could let attackers drain funds via under-priced collateral. | onlyOwnerOrOperator |
| EthereumVaultConnector        | disableCollateral | Removes an asset from the collateral whitelist. It prevents future deposits of that token and can block redemptions if not handled carefully. Malicious removal could orphan user assets or force emergency exits at a loss. | onlyOwnerOrOperator |
| EthereumVaultConnector        | reorderCollaterals | Changes the priority order in which multiple collaterals are checked and liquidated. It shapes liquidation paths and user risk exposure. A rogue reorder could steer liquidations to benefit attacker-controlled assets first. | onlyOwnerOrOperator |
| EthereumVaultConnector        | enableController | Grants a specified address permission to execute "controller" actions (e.g. collateral checks) on the connector. It defines who can call internal risk-management functions. Assigning this to an attacker could let them bypass safety checks. | onlyOwnerOrOperator |
| EthereumVaultConnector        | controlCollateral | Core entrypoint where the assigned controller can perform collateralization checks and enforce liquidations. It governs whether and how user positions get modified under stress. A malicious controller could arbitrarily liquidate or seize collateral. | onlyController |
| ProtocolConfig	            | setAdmin	 | Updates the contract’s admin address, granting that account full rights to change all protocol parameters. It thus controls who can reconfigure fees, limits and other critical settings in one central place. A malicious admin update could hand over control to an attacker, enabling arbitrary reparameterization or draining of protocol funds. | onlyAdmin |
| ProtocolConfig	            | setFeeReceiver | Sets the address that will receive all protocol-level fee distributions. This determines where treasury or protocol revenues land on each transaction. If pointed at an attacker-controlled address, all accrued fees would flow into malicious hands. | onlyAdmin |
| ProtocolConfig	            | setProtocolFeeShare | Configures the percentage of fees allocated to the protocol treasury (versus other recipients). This directly impacts how much revenue the protocol captures on each operation. A rogue change could redirect the entire fee stream, starving users of rebates or redirecting value to an attacker. | onlyAdmin |
| ProtocolConfig	            | setInterestFeeRange | Defines the allowed minimum and maximum interest-fee percentages across all vaults. This enforces global bounds on how high or low interest fees can be set. Manipulating the range to extreme values could lock in exorbitant fees or nullify fee generation entirely. | onlyAdmin |
| ProtocolConfig	            | setVaultInterestFeeRange | Customizes the interest-fee bounds for an individual vault instance, overriding the global range. This local control shapes user costs on that specific vault. A malicious adjustment could force that vault to charge punishing fees or prevent any fee accrual, destabilizing its economics. | onlyAdmin |
| ProtocolConfig	            | setVaultFeeConfig | Applies a bundle of fee-related settings (e.g. protocol share, hook fees, discount flags) to a particular vault. This single call can reconfigure multiple fee parameters at once. Abusing it could instantly rewire fee structures to extreme or malicious values, draining user rewards or redirecting value. | onlyAdmin |
| GovernorAccessControlEmergency | fallback | Catches any calls that don’t match a function signature and forwards them through the EVC mechanism. This allows the contract to proxy arbitrary calls, making it the entry point for emergency actions. If misused or reconfigured, attackers could route forbidden operations via this fallback. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | _authenticateCaller | Enforces that only the designated EVC account owner can invoke protected entry points by checking the caller’s address. This ensures that emergency role changes and sensitive ops can’t be triggered by outsiders. If bypassed or broken, unauthorized callers could seize emergency controls. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | initialize | Sets up the initial EVC account owner and default roles during deployment, establishing who can manage the contract. Without correct initialization, no one might be able to exercise emergency permissions or worse, an attacker could be set as the initial owner. | initializer |
| GovernorAccessControlEmergency | grantRole | Assigns a specific access-control role (e.g. EVC_ADMIN) to an address, expanding who can perform privileged operations. This directly controls which accounts can, for instance, manage LTV or caps in emergencies. An attacker granted the wrong role could manipulate core parameters. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | revokeRole | Removes a previously assigned role from an address, stripping away its privileges. This is critical for emergency lock-downs or removing compromised keys. Malicious revocation could lock out legitimate operators, halting protocol governance or recovery. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | renounceRole | Caller relinquish one of their own roles, useful for rotating out compromised keys without requiring another admin. This reduces the set of active operators and can hard-disable certain permissions. Reckless renouncement could orphan roles, preventing any future updates. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | setLTV | Updates the Loan-to-Value ratio limits for emergency adjustments to collateral rules. This can tighten or loosen borrowing constraints in crisis scenarios. A malicious change could either freeze borrowing by setting LTV to zero or enable dangerously high leverage. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | setHookConfig | Reconfigures protocol hooks (e.g. fee hooks or emergency checks) that run on critical functions. This can enable, disable, or swap out safety logic in real time. Misconfiguration here could remove vital security checks or insert malicious hooks. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | setCaps | Adjusts asset- or vault-level caps (maximum deposit/borrow limits) to prevent runaway exposure during emergencies. This throttles user operations to protect protocol solvency. Erroneously high caps might enable flash-mint attacks; zero caps could entirely freeze the system. | onlyEVCAccountOwner |
| GovernorAccessControlEmergency | setCaps | Adjusts asset- or vault-level caps (maximum deposit/borrow limits) to prevent runaway exposure during emergencies. This throttles user operations to protect protocol solvency. Erroneously high caps might enable flash-mint attacks; zero caps could entirely freeze the system. | onlyEVCAccountOwner |
| TimelockController | schedule	| Queues a transaction for execution once the configured delay elapses. Queued actions can change protocol parameters, upgrade contracts, or move funds. If an attacker gains the scheduling role, they could pre-queue a malicious upgrade hidden behind innocuous calls. | Timelock (DAO multisig) |
| TimelockController | execute	| Executes a previously queued transaction after the delay, giving it full effect on chain. Executions can perform arbitrary calls to any contract the DAO controls. A rogue executor could front-run a legitimate action with a malicious one if they control that role. | Timelock (DAO multisig) |
| FactoryGovernor | adminCall	| Allows the governor to invoke arbitrary calls on newly deployed module contracts. This is how new euler factories or lenses get admin-configured. Malicious use could deploy a back­door module or alter core logic without on-chain voting. | FactoryGovernor (multisig) |
| FactoryGovernor | pause	|  Immediately pauses all action on a target factory’s markets (deposits, borrows, etc.) in an emergency. This halts functional modules to contain exploits. If misused, a compromised pauser could freeze legitimate user funds indefinitely. | FactoryGovernor (multisig) |
| FactoryGovernor | unpause	| Lifts a previously imposed pause, restoring normal protocol operations. This re-enables markets after an emergency fix. If an attacker unpauses prematurely, they could re-open a vulnerability before it’s properly patched. | FactoryGovernor (multisig) |
| GovernedPerspective | transferOwnership | Transfers the contract’s owner to a new address, handing over all future upgrade and config rights. This is how key module permissions migrate (e.g. when rotating multisig). A malicious transfer could hand control to an attacker multisig, enabling arbitrary contract upgrades. | Euler Labs multisig |
| GovernedPerspective | renounceOwnership | Current owner relinquish ownership, effectively locking the contract forever if no successor is set. This can irrevocably disable future upgrades or fixes on that module. Malicious renouncement could freeze the module, preventing any emergency patch. | Euler Labs multisig |
| GovernedPerspective | perspectiveVerify | Marks a new vault or adapter as "verified" enabling it to be used within the protocol. This whitelisting step ensures only audited modules can interact. A rogue verifier could approve a malicious adapter, allowing exploits or fund drains. | Euler Labs multisig |
| GovernedPerspective | perspectiveUnverify | Revokes the "verified" status, blocking a module from further protocol interactions. This is used to deprecate or emergency-ban faulty adapters. Malicious unverification could decommission critical modules, freezing user positions. | Euler Labs multisig |
| SnapshotRegistry | renounceOwnership | Clears the owner address, permanently removing any administrative control from the contract. Without an owner, no further privileged actions (like adding or revoking entries) can ever be executed. A malicious call could lock the registry indefinitely, preventing emergency fixes. | Euler Labs multisig |
| SnapshotRegistry | transferOwnership | Assigns a new owner, granting them full authority over all admin functions. The new owner can then add or revoke registry entries at will. If transferred to an attacker, they could seize registry control and manipulate who is permitted in critical protocol flows. | Euler Labs multisig |
| SnapshotRegistry | add | Registers a new address in the snapshot registry, enabling that address to participate in downstream governance or protocol processes. Proper registry entries are required for protocol modules to recognize and interact with approved actors. A rogue admin could whitelist malicious contracts here. | Euler Labs multisig |
| SnapshotRegistry | revoke | Removes an address from the registry, revoking its permissions in all dependent systems. This can be used to de-authorize compromised or misbehaving participants. A malicious revocation could cut off legitimate contracts or users, disrupting protocol operations. | Euler Labs multisig |
| EulerRouter | transferGovernance |  updates the router’s governor, transferring ultimate control over parameter-setting functions. The new governor can then call all govSet* methods to reconfigure routing, vaults, and oracles. If an attacker becomes governor, they could redirect assets or disable critical routes. | onlyEVCAccountOwner & onlyGovernor |
| EulerRouter | govSetConfig | Changes core routing parameters (e.g. fees, limits) used by the router. These parameters affect how user deposits are processed and which vaults are allowed. A malicious update could impose exorbitant fees or block legitimate vaults entirely. | onlyEVCAccountOwner & onlyGovernor |
| EulerRouter | govSetResolvedVault | Binds a token to a specific vault address for routing deposits. This determines exactly where user funds go when they interact with the protocol. An attacker could set a malicious vault, siphoning deposits out of the system. | onlyEVCAccountOwner & onlyGovernor |
| EulerRouter | govSetFallbackOracle | Replaces the fallback price oracle used when the primary oracle is unavailable. Price feeds directly influence collateral valuations and liquidations. A rogue oracle could report bogus prices, triggering unwarranted liquidations or blocking valid ones. | onlyEVCAccountOwner & onlyGovernor |
| RewardToken | transferOwnership | Reassigns the contract’s owner, granting them full admin rights over whitelist and remainder settings. The new owner can then call any permissioned method. If transferred to an attacker, they could seize control of all reward flows. | Euler Labs multisig |
| RewardToken | setRemainderReceiver | Designates where leftover reward tokens (after distributions) are sent. This address collects all residual yield. A malicious receiver could siphon residual rewards indefinitely. | Euler Labs multisig |
| RewardToken | setWhitelistStatus | Toggles whether an address is eligible to receive or manage rewards. Whitelisted admins can perform deposit/withdraw operations. Mis-whitelisting could allow malicious actors to claim or redirect rewards. | Euler Labs multisig |
| RewardToken | depositFor | Whitelisted admins deposit reward tokens on behalf of others. This mints or allocates tokens to the target account. A rogue admin could credit themselves massive balances off-chain. | onlyWhitelistedAdmin |
| RewardToken | withdrawTo | Whitelisted admins withdraw tokens to any address. This removes tokens from the contract and sends them externally. A malicious admin could drain the entire token supply to their own wallet. | onlyWhitelistedAdmin |
| RewardToken | renounceOwnership | Clears the owner, permanently disabling any future owner-only actions. Without an owner, no further whitelist or remainder changes are possible. If renounced prematurely, legitimate emergency fixes become impossible. | Euler Labs multisig |
