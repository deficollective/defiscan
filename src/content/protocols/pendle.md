---
protocol: "Pendle"
website: "https://www.pendle.finance/"
x: "https://x.com/pendle_fi"
github: ["https://github.com/pendle-finance"]
defillama_slug: ["pendle"]
chain: "Ethereum"
stage: 0
reasons: [Unverified Contract]
risks: ["L", "L", "L", "L", "H"]
author: ["CookingCryptos, PaulDeFi"]
submission_date: "2025-02-19"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

⚠️ [sySwapper](https://etherscan.io/address/0x248087c69e72e211b7264720bf6cc5a954f98cde#code) is NOT verified on a public block explorer. For the `sySwapper` we currently rely on the technical documentation provided by the Pendle Team. As a consequence the full scope of permissions and their definitive impact cannot be assessed.

# Summary

Pendle is a decentralized, permissionless yield-trading protocol that enables users to manage and optimize their yield exposure. By tokenizing yield-bearing assets into standardized yield tokens (SY), Pendle allows these assets to be split into principal tokens (PT) and yield tokens (YT). This separation facilitates various strategies, including earning fixed yields, speculating on future yield changes, and providing liquidity to earn additional rewards. Pendle's Automated Market Maker (AMM) is specifically designed to handle the trading of these time-decaying assets, ensuring efficient and flexible yield management within the decentralized finance ecosystem. 

# Overview

## Chain

Pendle is deployed on various chains. This review is based on the Ethereum mainnet deployment of the protocol.

> Chain score: L

## Upgradeability

Pendle V2 protocol uses an upgradeable system through ERC1967 proxies.
 

 
The main component is a multisig (0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1) that acts as:
 
- The DEFAULT_ADMIN_ROLE of the governance proxy, controlling its upgrades and role management
 
- The owner of most protocol contracts, with permissions to:
 
  - Modify economic parameters (fees, rewards, treasury address...)
 
  - Control market factories and yield contracts
 
  - Manage cross-chain messaging
 
  - Withdraw PENDLE tokens to reward voter from Voting Controller...
 

 
It's a 2/4 multisig, with the following signers:
 
- [0x7BD456937104Ca5eFfFBD895ccbba52421021C29]
 
- [0x9Ce6De7ec862e25a515AA0D8EcFbBBb2DaA8E0fb]
 
- [0x38ab4A7Dea2753757F29fe6d10280Df2C42abe27]
 
- [0xF517364727Fcc764D58DdF4e53280874A4d0c476]
 

 
There is the governance proxy contract (0x2aD631F72fB16d91c4953A7f4260A97C2fE2f31e) that implements role-based access control with the following features:
 
- Upgradeable implementation via upgradeTo function
- Role management (grant/revoke roles)
- Aggregated calls for specific roles
 
He is owner of the PendleMarketFactoryV3 contract.

We also have an unknown address (0xD9c9935f4BFaC33F38fd3A35265a237836b30Bd1) that is the owner of the PendleFeeDistributor V1 contract (but not mainly used). 
 

A V2 of the PendleFeeDistributor is used instead but owner is the devMultisig instead of governance.

While these permissions are significant, several safeguards are in place:
 
- Parameter modifications are often bounded by maximum limits

A lot of versions of the contracts are deployed which is a bit confusing.

> Upgradeability score: H

## Autonomy

The Pendle's protocol token (PENDLE) relies on Ethereum to access key features such as locking, voting, and claiming fees. Other chains, like Arbitrum, only mirror data from Ethereum. To receive boosting benefits, users who provide liquidity on Arbitrum must lock PENDLE on Ethereum and synchronize the information to Arbitrum using cross-chain messages. This synchronization is facilitated by the LayerZero protocol, which uses permissioned validators (DVNs) to validate cross-chain transaction data. Currently, Pendle has configured the "default" validator service which is Google Cloud.

A failure of these validators could require manual intervention and potentially result in the temporary censoring of users or the freezing of their funds. This primarily affects users unclaimed (or claimed) rewards and liquidity boosting benefits across chains.

> Autonomy score: M

## Exit Window

No exit windows or timelocks are actually set up in the [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967) which is utilized by all proxy contracts across the core Pendle Protocol contracts, primarily owned by the governance multisig. Essentially, if the governance decides on a change, it can be implemented immediately.

> Exit window score: H

## Accessibility

Users can only access Pendle through a single user interface: [app.pendle.finance](app.pendle.finance). Currently, there is no backup solution in case the interface is shut down or users are censored.

> Accessibility score: H

# Technical Analysis

## Contracts

| Contract Name                     | Address                                    |
|-----------------------------------|--------------------------------------------|
| PENDLE | [0x808507121b80c02388fad14726482e061b8da827](https://etherscan.io/address/0x808507121b80c02388fad14726482e061b8da827) |
| WETH9 | [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) |
| sySwapper                         | [0x248087C69e72E211b7264720Bf6cC5A954F98CDE](https://etherscan.io/address/0x248087C69e72E211b7264720Bf6cC5A954F98CDE) | Unverified contract
| BaseSplitCodeFactoryContract | [0x35878C2Cff38cC4032E85283183428170BA618A2](https://etherscan.io/address/0x35878C2Cff38cC4032E85283183428170BA618A2) |
| PendleGovernanceProxy | [0x2aD631F72fB16d91c4953A7f4260A97C2fE2f31e](https://etherscan.io/address/0x2aD631F72fB16d91c4953A7f4260A97C2fE2f31e) |
| pendleSwap                        | [0x313e7Ef7d52f5C10aC04ebaa4d33CDc68634c212](https://etherscan.io/address/0x313e7Ef7d52f5C10aC04ebaa4d33CDc68634c212) |
| PendlePYLpOracle | [0x9a9fa8338dd5e5b2188006f1cd2ef26d921650c2](https://etherscan.io/address/0x9a9fa8338dd5e5b2188006f1cd2ef26d921650c2) |
| PendleYieldContractFactory | [0x35A338522a435D46f77Be32C70E215B813D0e3aC](https://etherscan.io/address/0x35A338522a435D46f77Be32C70E215B813D0e3aC) |
| PendleMarketFactoryV3 | [0x6fcf753f2C67b83f7B09746Bbc4FA0047b35D050](https://etherscan.io/address/0x6fcf753f2C67b83f7B09746Bbc4FA0047b35D050) |
| PoolDeployHelper | [0x4Df98410c95737FD646D2413AC6CAFc1c04834b9](https://etherscan.io/address/0x4Df98410c95737FD646D2413AC6CAFc1c04834b9) |
| PendleLimitRouter | [0x000000000000c9B3E2C3Ec88B1B4c0cD853f4321](https://etherscan.io/address/0x000000000000c9B3E2C3Ec88B1B4c0cD853f4321) |
| ProxyAdmin| [0xA28c08f165116587D4F3E708743B4dEe155c5E64](https://etherscan.io/address/0xA28c08f165116587D4F3E708743B4dEe155c5E64) |
| Reflector | [0x5039Da22E5126e7c4e9284376116716A91782faF](https://etherscan.io/address/0x5039Da22E5126e7c4e9284376116716A91782faF) |
| VotingEscrowPendleMainchain | [0x4f30A9D41B80ecC5B94306AB4364951AE3170210](https://etherscan.io/address/0x4f30A9D41B80ecC5B94306AB4364951AE3170210) |
| PendleMsgSendEndpointUpg  | [0x07b1014c88f14C9E910092526db57A20052E989F](https://etherscan.io/address/0x07b1014c88f14C9E910092526db57A20052E989F) |
| PendleVotingControllerUpg  | [0x44087E105137a5095c008AaB6a6530182821F2F0](https://etherscan.io/address/0x44087E105137a5095c008AaB6a6530182821F2F0) |
| PendleGaugeControllerMainchainUpg  | [0x47D74516B33eD5D70ddE7119A40839f6Fcc24e57](https://etherscan.io/address/0x47D74516B33eD5D70ddE7119A40839f6Fcc24e57) |
| PendleFeeDistributor | [0xd7b34a6fDCb2A7ceD2115FF7f5fdD72aa6aA4dE2](https://etherscan.io/address/0xd7b34a6fDCb2A7ceD2115FF7f5fdD72aa6aA4dE2) |
| PendleFeeDistributorV2 | [0x8C237520a8E14D658170A633D96F8e80764433b9](https://etherscan.io/address/0x8C237520a8E14D658170A633D96F8e80764433b9) |
| PendleMultiTokenMerkleDistributor | [0x3942F7B55094250644cFfDa7160226Caa349A38E](https://etherscan.io/address/0x3942F7B55094250644cFfDa7160226Caa349A38E) |
| PendleSparkLinearDiscountOracleFactory | [0xA9A924A4BB95509F77868E086154C25e934F6171](https://etherscan.io/address/0xA9A924A4BB95509F77868E086154C25e934F6171) |
| PendleChainlinkOracleFactory | [0x2A73e899389cABa2a2f648BaBA35e67f5C00EFee](https://etherscan.io/address/0x2A73e899389cABa2a2f648BaBA35e67f5C00EFee) |
| PendleRouterStatic | [0x263833d47eA3fA4a30f269323aba6a107f9eB14C](https://etherscan.io/address/0x263833d47eA3fA4a30f269323aba6a107f9eB14C) |

## Permission owners

| Name        | Account                                                                                                               | Type         |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Treasury (pools fees BEFORE 8th October 2024)   | [0x8270400d528c34e1596EF367eeDEc99080A1b592](https://etherscan.io/address/0x8270400d528c34e1596EF367eeDEc99080A1b592) | Multisig 2/6 |
| Treasury (pools fees AFTER 8th October 2024) | [0xC328dFcD2C8450e2487a91daa9B75629075b7A43](https://etherscan.io/address/0xC328dFcD2C8450e2487a91daa9B75629075b7A43) | Multisig 2/5 |
| Governance  | [0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1](https://etherscan.io/address/0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1) | Multisig 2/4 |
| DevMultisig | [0xE6F0489ED91dc27f40f9dbe8f81fccbFC16b9cb1](https://etherscan.io/address/0xE6F0489ED91dc27f40f9dbe8f81fccbFC16b9cb1) | Multisig 2/3 |
| DevMultisig LayerZero | [0xCDa8e3ADD00c95E5035617F970096118Ca2F4C92](https://etherscan.io/address/0xCDa8e3ADD00c95E5035617F970096118Ca2F4C92) | Multisig 2/3 |
| Pendle: Deployer 1 | [0x1FcCC097db89A86Bfc474A1028F93958295b1Fb7](https://etherscan.io/address/0x1FcCC097db89A86Bfc474A1028F93958295b1Fb7) | EOA |
| Governance Guardian EOA / hardwareDeployer | 0xeea6F790F18563E91b18DF00B89d9f79b2E6761F | [0xeea6F790F18563E91b18DF00B89d9f79b2E6761F](https://etherscan.io/address/0xeea6F790F18563E91b18DF00B89d9f79b2E6761F) | EOA |
| Governance Guardian EOA / hardwareDeployer | 0x8b5b16d04624687fcf0d0228f19993c9157c1ed07b41d8d430fd9100eb099fe8 | [0x8b5b16d04624687fcf0d0228f19993c9157c1ed07b41d8d430fd9100eb099fe8](https://etherscan.io/address/0xeea6F790F18563E91b18DF00B89d9f79b2E6761F) | EOA |
| Unkown Address (PendleFeeDistributor(not in use) Owner | [0xD9c9935f4BFaC33F38fd3A35265a237836b30Bd1](https://etherscan.io/address/0xD9c9935f4BFaC33F38fd3A35265a237836b30Bd1) | EOA |
| PendleLiquidityIncentivesMultisig | [0xe8D28E2CA24BB16Fc7e6549eF937e05981d02606](https://etherscan.io/address/0xe8D28E2CA24BB16Fc7e6549eF937e05981d02606) | Multisig 2/4 |
0x8b5b16d04624687fcf0d0228f19993c9157c1ed07b41d8d430fd9100eb099fe8


## Permissions

| Contract      | Function     | Impact      | Owner                   |
| ------------- | ------------ | ----------- | ----------------------- |
| PENDLE                       | withdrawEther            | This function transfers Ether held in the contract to an address specified by governance. This function exists as a safety mechanism to recover any Ether accidentally sent to the contract address, as the contract itself has no functionality that intentionally accepts Ether deposits. A malicious governance could potentially use this function to extract any Ether that somehow reached the contract address.                                                                                                                  | Governance                                                                                                                                                                                                                                    |
| PENDLE                       | withdrawToken            | This function allows governance to withdraw any ERC-20 token from the contract to a specified address. Similar to withdrawEther, it serves as a recovery mechanism for tokens that might be sent to the contract unintentionally, as the contract explicitly prevents direct PENDLE token transfers to itself. A malicious governance could use this to extract any ERC-20 tokens that might be held by the contract.                                                                                                  | Governance                                                                                                                                                                                                                                    |
| PENDLE                       | claimGovernance          | This function allows the pending governance address to claim control over the contract by updating the governance state variable. This completes the two-step governance transfer process, ensuring secure transition of administrative control. If the pending governance address is compromised, the attacker would gain control over all governance-restricted functions, including config changes and fund withdrawals.                                                 | 0x0000000000000000000000000000000000000000                                                                                                                                                                                                                                    |
| PENDLE                       | transferGovernance       | This function initiates the process of transferring governance control by setting a new pending governance address. This is the first step in the two-phase ownership transfer mechanism designed to prevent accidental transfers. A compromised governance could designate a malicious entity as pending governance, starting the process of transferring all administrative control.                                                                                    | Governance                                                                                                                                                                                                                                    |
| PENDLE                       | initiateConfigChanges    | This function applies previously initiated configuration changes, but only after the mandatory 7-day timelock period has elapsed. This timelock mechanism provides a security buffer against malicious or erroneous configuration changes. If configuration changes were maliciously initiated, this function would make them effective after the timelock, potentially allowing manipulation of the token economics.                                           | Governance                                                                                                                                                                                                                                    |
| PENDLE                       | claimLiquidityEmissions  | This function mints new PENDLE tokens according to the emission schedule and sends them to the liquidityIncentivesRecipient. This is the primary mechanism for distributing token rewards in the protocol's liquidity incentive program. If the incentives recipient is compromised, the attacker could claim all newly minted tokens meant for liquidity providers.                                                                                             | PendleLiquidityIncentivesMultisig                                                                                                                                                                                                                                    |
| BaseSplitCodeFactoryContract | transferOwnership        | This function transfers ownership rights to a new address, either directly or by setting a pending owner depending on the parameters provided. The owner has exclusive privileges to deploy arbitrarily large contracts that can bypass standard EVM size limitations through the code-splitting technique. A malicious owner could transfer ownership to an untrusted entity who could then deploy malicious contracts.             | Pendle: Deployer 1                                                                                                                                                                                                                                    |
| BaseSplitCodeFactoryContract | claimOwnership           |  This function allows the pending owner to claim ownership as the second step in the two-phase ownership transfer process with no waiting period or timelock. This function completes the ownership transfer giving the new owner complete control over the factory's deployment capabilities. If the pending owner address is compromised before the claim is executed, an attacker could immediately take control of the contract factory and deploy malicious large-scale contracts throughout the ecosystem.                            | Pendle: Deployer 1                                                                                                                                                                                                                                    |
| BaseSplitCodeFactoryContract | deploy                   | This function allows the owner to deploy contracts with creation code exceeding standard EVM size limits by splitting the code across two storage contracts. This capability enables the factory to deploy extremely large and complex contracts that would otherwise be impossible under Ethereum's size constraints. A malicious owner could deploy contracts with complex vulnerabilities or backdoors hidden within large bytecode, making them particularly difficult to audit and potentially enabling sophisticated attacks on the protocol.       | Pendle: Deployer 1                                                                                                                                                                                                                                    |
| PendleGovernanceProxy        | upgradeTo                | This function allows addresses with the DEFAULT_ADMIN_ROLE to upgrade the implementation of the UUPS proxy to a new contract address. This function is critical as it controls the entire logic of the contract and can fundamentally change how the system operates. A malicious admin could upgrade to a malicious implementation that could drain all funds, change permissions, or completely break the system's functionality with no timelock protection.                                                                                                                                   | Governance                                                                                                                                                                                                            |
| PendleGovernanceProxy        | upgradeToAndCall         | This function allows addresses with the DEFAULT_ADMIN_ROLE to upgrade the implementation contract and immediately execute an initialization function on the new implementation. This powerful combination allows for atomic upgrades with initialization, which is necessary for complex system changes. A malicious admin could deploy and initialize a backdoored implementation that executes harmful logic immediately upon upgrade with no timelock or verification period.                                                                                                                                                                                | Governance                                                                                                                                                                                                            |
| PendleGovernanceProxy        | grantRole                | This function enables addresses with the DEFAULT_ADMIN_ROLE to assign specific roles to any address in the system. Role-based access control is the foundation of the contract's security model, determining which addresses can perform sensitive actions. A malicious admin could grant critical roles like GUARDIAN or DEFAULT_ADMIN_ROLE to compromised addresses, creating multiple attack vectors and potentially causing a complete security breakdown.                                                                                                                                                                  | Governance                                                                                                                                                                                                            |
| PendleGovernanceProxy        | revokeRole               | This function allows addresses with the DEFAULT_ADMIN_ROLE to remove roles from any address in the system. This capability is essential for maintaining the security of the contract by removing privileges from compromised addresses. A malicious admin could revoke roles from legitimate operators, creating a denial of service by preventing authorized actions from being performed, disrupting the protocol's operations.                                                                                                                                                                                        | Governance                                                                                                                                                                                                            |
| PendleGovernanceProxy        | aggregate                | This function allows addresses with ALICE, BOB, CHARLIE or DEFAULT_ADMIN_ROLE to execute multiple contract calls in a single transaction, with non-admins restricted to pre-approved function selectors. This multicall capability enables efficient batch operations and complex contract interactions in a single transaction. A malicious actor with access to one of these roles could execute harmful combinations of allowed functions, potentially exploiting interactions between contract calls that might not be apparent when evaluating individual function permissions.                                                                                                                                                                                                    | Governance, 0xab1c679b95f02899dcb97b3404e8ac388504a2e78a30d99d5502d12353e2f8f7, 0x29d93e4f9fb5004362e31d9828e4c67c1125ce4f9a86862014fd68039a2e4c38,0x34a2021b26845c35ade1e3a00bba3ecba59faef855e49dd71e9f06c0b56c689d |
| PendleGovernanceProxy        | pause                    | This function enables addresses with the GUARDIAN or DEFAULT_ADMIN_ROLE to pause multiple contracts implementing the IPPausingInterface in a single transaction. This emergency mechanism protects the system during attacks or when critical bugs are discovered by temporarily halting operations. A malicious guardian could inappropriately trigger a system-wide pause causing a denial of service, disrupting market operations and potentially trapping user funds until the system is unpaused.                                                                                                                                                                                 | Governance, 0x8b5b16d04624687fcf0d0228f19993c9157c1ed07b41d8d430fd9100eb099fe8 (GUARDIAN)                                                                                                                                        |
| PendleGovernanceProxy        | setAllowedSelectors      | This function allows addresses with the DEFAULT_ADMIN_ROLE to configure which function selectors are permitted for use with the aggregate function by specific roles. This control mechanism restricts which contract functions can be called by which roles when using the batch execution capability. A malicious admin could assign dangerous function selectors to roles, allowing unauthorized operations that could compromise funds or critical protocol parameters.                                                                                                                                                                                                   | Governance                                                                                                                                                                                                            |
| PendleGovernanceProxy        | _authorizeUpgrade        | This internal function enforces that only addresses with the DEFAULT_ADMIN_ROLE can authorize upgrades of the contract implementation. This is the core security check of the UUPS proxy pattern that protects against unauthorized upgrades. A compromised admin could authorize harmful upgrades, but the function itself has proper access control and functions as intended within the design of the system.                                                                                                                                                                                                 | Governance                                                                                                                                                                                                            |
| PendleYieldContractFactory   | transferOwnership        | This function allows the current owner of the contract to transfer ownership to a new address. If misused, control of all owner-restricted functions could be transferred to a malicious entity, resulting in potential unauthorized upgrades, fee changes, or redirection of funds.                                                                                      | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleYieldContractFactory   | setExpiryDivisor         | This function allows the contract owner to set the expiry divisor, which influences the validity of yield contract expiries. Improper changes could impact the creation of yield contracts, potentially disrupting market functionality or enabling unintended arbitrage opportunities.                                                                                   | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleYieldContractFactory   | setInterestFeeRate       | This function allows the owner to set the interest fee rate, which directly affects the yield earned by liquidity providers. If manipulated, it could result in reduced earnings for users or increased fees being redirected to the treasury, impacting user trust and protocol adoption.                                                                                | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleYieldContractFactory   | setRewardFeeRate         | This function allows the owner to adjust the reward fee rate, influencing the distribution of rewards to liquidity providers. A malicious owner could set excessive fees, diverting rewards away from users and into the treasury or an unauthorized address.                                                                                                             | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleYieldContractFactory   | setTreasury              | This function allows the owner to change the address that receives treasury funds. If compromised, the treasury could be redirected to a malicious wallet, leading to a complete loss of protocol funds meant for governance, development, or user rewards.                                                                                                               | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleMarketFactory          | transferOwnership        | This function allows the current owner to transfer ownership to a new address. If misused, it can grant full control over all owner-only functions, including setting fees and upgrading contracts.                                                                                                                                                                       | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleMarketFactory          | setTreasury              | This function sets the treasury address where protocol fees are accumulated. If compromised, funds can be redirected to an unauthorized address, leading to loss of user funds.                                                                                                                                                                                           | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleMarketFactory          | setDefaultFee            | This function allows the owner to set the default fee rate for all markets. It can be used to increase fees arbitrarily, impacting user trades and affecting protocol economics.                                                                                                                                                                                          | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleMarketFactory          | setOverriddenFee         | This function overrides the default fee rate for specific routers. It can be used to set unfair fees for selected markets, leading to potential financial manipulation or user exploitation.                                                                                                                                                                              | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendleMarketFactory          | unsetOverriddenFee       | This function removes previously overridden fees, reverting to the default rate. If misused, it can remove favorable rates, impacting user profitability without notice.                                                                                                                                                                                                  | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| PendlePYLpOracle             | transferOwnership        | The transferOwnership function allows the owner to transfer ownership of the PendlePYLpOracle contract to another address. If the new owner is compromised or malicious, they could manipulate oracle data or change contract parameters, potentially leading to inaccurate pricing or loss of funds.                                                                     | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |
| TransparentUpgradeableProxy  | setBlockCycleNumerator   | The setBlockCycleNumerator function allows the owner to change the value of the blockCycleNumerator, which influences block cycle calculations. This could be exploited to manipulate timing-dependent functions or calculations, potentially leading to unfair advantages or financial loss for other participants.                                                      | 0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1                                                                                                                                                                                                                                    |

## Dependencies

Pendle Protocol relies on LayerZero for cross-chain communication and transaction validation.

LayerZero Protocol itself is immutable and fully permissionless. The protocol will exist indefinitely even if Layer0 Labs, the company that developed the LayerZero Protocol, ceases to exist. Layer0 Labs' role in the LayerZero protocol is reduced to deploying immutable Endpoints on new chains. These endpoints reference each other and thereby enable the cross-chain communication network. If Layer0 Labs ceases to exist, no new chains are added to the cross-chain network, but the existing network is not affected.

Pendle relies on LayerZero's default configuration for cross-chain message validation. In the [`PendleMsgSendEndpointUpg`](https://etherscan.io/address/0xdcf7313cc90cfd7589fba65d1985e02b5de31e9a#code) contract 
"@dev Initially, currently we will use layer zero's default send and receive version (which is most updated) So we can leave the configuration unset." This means Pendle inherits the security and reliability of LayerZero's default infrastructure, but also depends on it.

The [`PendleMsgSendEndpointUpg`](https://etherscan.io/address/0xdcf7313cc90cfd7589fba65d1985e02b5de31e9a#code) contract manages message sending across chains through a whitelisted system. While this provides a layer of security, it also means that the protocol's cross-chain functionality is dependent on these whitelisted addresses functioning correctly. A failure in this system could potentially affect cross-chain operations.

Finally, the LayerZero Protocol relies on Executors which trigger queued transactions on destination chains. In Pendle's implementation, this is handled through the `MsgReceiveEndpoint` contracts on each chain. The system is designed to be permissionless at the LayerZero level, meaning that even if Pendle's designated endpoints fail, users transactions cannot be permanently censored.

According to their docs the PENDLE token is currently deployed on the following chains through the LayerZero protocol:

    Mainnet
    Arbitrum
    Mantle
    Base
    Optimism
    BNB Chain


## Exit Window

The whole protocol is upgradable and based on proxy contracts which is opening the door to a lot of risks.

# Security Council

| Requirement                                             | treasury | governance | devMultisig |
|---------------------------------------------------------|----------|------------|-------------|
| At least 7 signers                                      | ❌        | ❌          | ❌         |
| At least 51% threshold                                  | ❌        | ❌          | ✅         |
| At least 50% non-team signers                           | ❌        | ❌          | ❌         |
| Signers are publicly announced (with name or pseudonym) | ❌        | ❌          | ❌         |
