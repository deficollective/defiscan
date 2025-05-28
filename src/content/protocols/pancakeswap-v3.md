---
protocol: "Pancakeswap-V3"
website: "https://pancakeswap.finance/"
x: "https://x.com/pancakeswap"
github: ["https://github.com/pancakeswap/"]
defillama_slug: ["pancakeswap-amm-v3"]
chain: "BSC"
stage: 0
reasons: []
risks: ["H", "H", "H", "H", "H"]
author: ["CookingCryptos"]
submission_date: "2025-05-28"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

PancakeSwap V3 is an automated market maker (AMM) on BNB Smart Chain with concentrated liquidity functionality. Unlike PancakeSwap V2's uniform liquidity distribution, V3 allows liquidity providers to deploy capital within specific price ranges. The protocol implements multiple fee tiers (0.01%, 0.05%, 0.3%, 1%), represents LP positions as NFTs instead of fungible tokens, and distributes CAKE token incentives only to liquidity positions that are in-range.

# Overview

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

# Technical Analysis

## Contracts

| Contract Name                                         | Address                                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| PancakeV3Factory                                      | [0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865](https://bscscan.com/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865) |
| PancakeV3PoolDeployer                                 | [0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9](https://bscscan.com/address/0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9) |
| PancakeV3Pool (example pool)                          | [0x98b141fc697cff2bc26da84fcdb48ced18450df9](https://bscscan.com/address/0x98b141fc697cff2bc26da84fcdb48ced18450df9) |
| SwapRouter                                            | [0x1b81D678ffb9C0263b24A97847620C99d213eB14](https://bscscan.com/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14) |
| V3Migrator                                            | [0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2](https://bscscan.com/address/0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2) |
| NonfungiblePositionManager                            | [0x46A15B0b27311cedF172AB29E4f4766fbE7F4364](https://bscscan.com/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364) |
| QuoterV2                                              | [0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997](https://bscscan.com/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997) |
| TickLens                                              | [0x9a489505a00cE272eAa5e07Dba6491314CaE3796](https://bscscan.com/address/0x9a489505a00cE272eAa5e07Dba6491314CaE3796) |
| UniswapInterfaceMulticall (PancakeInterfaceMulticall) | [0xac1cE734566f390A94b00eb9bf561c2625BF44ea](https://bscscan.com/address/0xac1cE734566f390A94b00eb9bf561c2625BF44ea) |
| MixedRouteQuoterV1                                    | [0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86](https://bscscan.com/address/0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86) |
| TokenValidator                                        | [0x864ED564875BdDD6F421e226494a0E7c071C06f8](https://bscscan.com/address/0x864ED564875BdDD6F421e226494a0E7c071C06f8) |
| SmartRouter                                           | [0x13f4EA83D0bd40E75C8222255bc855a974568Dd4](https://bscscan.com/address/0x13f4EA83D0bd40E75C8222255bc855a974568Dd4) |
| MasterChefV3                                          | [0x556B9306565093C855AEA9AE92A594704c2Cd59e](https://bscscan.com/address/0x556B9306565093C855AEA9AE92A594704c2Cd59e) |
| PCSV3FeeHandler (Proxy)                               | [0x518D9643160cFd6FE469BFBd3BA66fC8035a68a3](https://bscscan.com/address/0x518D9643160cFd6FE469BFBd3BA66fC8035a68a3) |
| PCSV3FeeHandler (Implementation)                      | [0xcb33967378a52b4e08a20953042b7a97fbef1b79](https://bscscan.com/address/0xcb33967378a52b4e08a20953042b7a97fbef1b79) |
| PancakeV3LmPoolDeployer                               | [0xd93F5c7A894bb44BDc9231087c8E559502f737eD](https://bscscan.com/address/0xd93F5c7A894bb44BDc9231087c8E559502f737eD) |
| FarmBooster                                           | [0xAADd7a07BFb5114f313612865553D0f897A6389A](https://bscscan.com/address/0xAADd7a07BFb5114f313612865553D0f897A6389A) |
| MasterChefV3Receiver                                  | [0x07a57c7BdDfAda9a02DB89c58D0580344d95463C](https://bscscan.com/address/0x07a57c7BdDfAda9a02DB89c58D0580344d95463C) |

## Permission owners

| Name                    | Account                                                                                                               | Type         |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
| unknown multisig 1      | [0x21835332cBDf1b3530fAE9f6Cd66FEB9477dFC02](https://etherscan.io/address/0x21835332cBDf1b3530fAE9f6Cd66FEB9477dFC02) | Multisig 3/6 |
| unknown multisig 2      | [0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E](https://etherscan.io/address/0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E) | Multisig 3/6 |
| PCSV3FeeHandler (Proxy) | [0x518D9643160cFd6FE469BFBd3BA66fC8035a68a3](https://etherscan.io/address/0x518D9643160cFd6FE469BFBd3BA66fC8035a68a3) | Contract     |
| PancakeV3LmPoolDeployer | [0xd93F5c7A894bb44BDc9231087c8E559502f737eD](https://etherscan.io/address/0xd93F5c7A894bb44BDc9231087c8E559502f737eD) | Contract     |
| unknown address         | [0x3af75af6F056d4D72c1675dA919aebF908A109D6](https://etherscan.io/address/0x3af75af6F056d4D72c1675dA919aebF908A109D6) | EOA          |
| FarmBooster             | [0xAADd7a07BFb5114f313612865553D0f897A6389A](https://etherscan.io/address/0xAADd7a07BFb5114f313612865553D0f897A6389A) | Contract     |
| MasterChefV3Receiver    | [0x07a57c7BdDfAda9a02DB89c58D0580344d95463C](https://etherscan.io/address/0x07a57c7BdDfAda9a02DB89c58D0580344d95463C) | Contract     |

## Permissions

| Contract                     | Function                | Impact                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Owner                                              |
|------------------------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| PancakeV3Factory             | setOwner                | This function transfers complete control of the factory to a new address, replacing the current owner. The owner controls all administrative functions including fee management, revenue collection, and pool deployment. A transfer to a malicious address would give total control over all critical protocol functions.                                                                                                                                                                            | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | enableFeeAmount         | This function permanently adds a new fee tier with an associated tick spacing to the protocol. Once added, a fee tier's existence cannot be removed from the system, but its activation state can be modified. The fee is limited by code to a maximum of 99.9999% (require(fee < 1000000)).                                                                                                                                                                                                          | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | setWhiteListAddress     | This function modifies an address's status in the whitelist authorized to create pools. The owner can restrict pool creation for fee tiers with whitelistRequested=true to only approved addresses. This restriction limits access to new pool creation for non-whitelisted users without affecting existing pools.                                                                                                                                                                                   | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | setFeeAmountExtraInfo   | This function modifies the activation state and whitelist requirement of an existing fee tier. Setting a fee tier to disabled (enabled=false) prevents it from being used for new pool creation, while still preserving its entry in the system. If all existing fee tiers were disabled, creation of any new pools would be temporarily impossible until at least one tier is re-enabled.                                                                                                            | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | setLmPoolDeployer       | This function sets the address that, in addition to the owner, is authorized to call setLmPool. A change to this address modifies who can establish associations between exchange pools and reward pools. An incorrect address would prevent configuration of new farming pools, affecting only the incentive distribution system.                                                                                                                                                                    | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | setFeeProtocol          | This function configures the percentage of exchange fees redirected to the protocol for a specific pool. Accepted values are between 0% (disabled) and 40% (value 4000), with a granularity of 0.01%. At maximum (40%), this function reduces liquidity providers' revenue by 40% in the targeted pool.                                                                                                                                                                                               | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | collectProtocol         | This function withdraws accumulated protocol fees from a specific pool to a recipient address. It transfers the exact token amounts collected during exchange activities. These funds can be sent to any address specified by the caller, with no restriction on the destination.                                                                                                                                                                                                                     | PCSV3FeeHandler (Proxy)                            |
| PancakeV3Factory             | setLmPool               | This function associates a farming pool with an existing exchange pool by calling setLmPool on the pool contract. It registers the address where liquidity providers can stake their position NFTs to earn CAKE rewards. An incorrect address would prevent access to farming rewards for that specific pool only.                                                                                                                                                                                    | PCSV3FeeHandler (Proxy) or PancakeV3LmPoolDeployer |
| PancakeV3PoolDeployer        | deploy                  | This function creates a new PancakeV3Pool contract with the specified parameters (tokens, fee, tickSpacing). It can only be called by the factory address that was set during initialization. The deployment uses create2 with a deterministic salt based on the tokens and fee, ensuring predictable pool addresses.                                                                                                                                                                                 | PancakeV3Factory                                   |
| PancakeV3Pool (example pool) | setFeeProtocol          | This function configures the protocol fee percentage for both tokens in a pool. The values must be either 0 (no protocol fee) or between 1000 (10%) and 4000 (40%). When set to a non-zero value, the specified percentage of all swap fees will be directed to the protocol instead of liquidity providers. This affects the economics of the pool by redistributing a portion of fees from LPs to the protocol treasury.                                                                            | PancakeV3Factory or PCSV3FeeHandler (Proxy)        |
| PancakeV3Pool (example pool) | collectProtocol         | This function allows withdrawal of accumulated protocol fees from the pool to a specified recipient address. It can collect any amount up to the total accumulated fees for each token. This represents the actual extraction of value that was redirected from LPs to the protocol via the protocol fee setting.                                                                                                                                                                                     | PancakeV3Factory or PCSV3FeeHandler (Proxy)        |
| PancakeV3Pool (example pool) | setLmPool               | This function sets the address of the liquidity mining pool contract that will be called during swap operations to manage liquidity mining rewards. Once set, the pool will interact with this contract to distribute rewards to liquidity providers based on their participation. This integration enables the incentivization mechanism for liquidity providers.                                                                                                                                    | PancakeV3Factory or PCSV3FeeHandler (Proxy)        |
| SmartRouter                  | setStableSwap           | This function modifies the stableSwapFactory and stableSwapInfo addresses within the SmartRouter contract. The stableSwapFactory address determines which pools are considered valid stable pools, while the stableSwapInfo address performs exchange rate calculations for trades. Malicious implementations of these contracts redirect user transactions to fraudulent pools and manipulate exchange rates, resulting in direct loss of user funds through unfavorable trades.                     | unknown address                                    |
| SmartRouter                  | transferOwnership       | This function allows the current owner to transfer complete control of the contract to a new address. Such action would give full control over the contract and its restricted functions to the new address.                                                                                                                                                                                                                                                                                          | unknown address                                    |
| SmartRouter                  | renounceOwnership       | This function allows the owner to renounce ownership of the contract, making restricted functions permanently inaccessible. Once ownership is renounced, administrative features cannot be recovered.                                                                                                                                                                                                                                                                                                 | unknown address                                    |
| MasterChefV3                 | setEmergency            | This function sets the boolean variable emergency to true or false. When emergency is true, the harvestOperation function will not accumulate new CAKE rewards and the withdraw function will not update positions in LM pools. Users retain the ability to withdraw their tokens and claim rewards accumulated before the emergency state was activated.                                                                                                                                             | unknown multisig 2                                 |
| MasterChefV3                 | setReceiver             | This function updates the receiver address variable which is the only address authorized to call the upkeep function. The upkeep function is responsible for transferring CAKE tokens from the receiver to the contract and setting the reward distribution parameters. A change to this address modifies the source of CAKE tokens for the reward system.                                                                                                                                            | unknown multisig 2                                 |
| MasterChefV3                 | setLMPoolDeployer       | This function changes the address that deploys new LM pool contracts when adding V3 pools to the farming system. It only affects future pools, not existing ones. A malicious deployer could create compromised LM pools that manipulate reward calculations, divert funds during position updates, or contain backdoors to manipulate position states.                                                                                                                                               | unknown multisig 2                                 |
| MasterChefV3                 | add                     | This function registers a new V3 pool for farming rewards, deploys its associated LMPool contract, and assigns allocation points that directly determine its share of CAKE rewards. Through this function, the owner selects which token pairs receive rewards and determines their exact reward allocation, creating direct economic incentives for liquidity provision in selected pools.                                                                                                           | unknown multisig 2                                 |
| MasterChefV3                 | set                     | This function modifies the allocation points of an existing pool, which mathematically alters the percentage of total CAKE rewards it receives (allocation/totalAllocation). The owner can drastically change reward distribution by increasing points for favored pools or reducing/zeroing points for others, directly affecting yield farming profitability across different pools.                                                                                                                | unknown multisig 2                                 |
| MasterChefV3                 | updateBoostMultiplier   | This function sets the boost multiplier value for a specific NFT position within the range of 100% to 200% of base rewards. This multiplier directly modifies the effective liquidity calculation used for reward distribution, increasing rewards for boosted positions while proportionally decreasing rewards for others. Setting the maximum 200% boost for selected positions doubles their CAKE rewards while reducing the proportional rewards for all other positions in the same pool.       | FarmBooster                                        |
| MasterChefV3                 | upkeep                  | This function transfers CAKE tokens from the receiver address to the contract and sets the parameters for the next reward distribution period (duration and tokens per second). This operation determines the total rewards available for distribution and establishes the timeframe during which these rewards will be allocated. Failure to call this function at the end of a distribution period immediately stops all CAKE rewards across all farming pools.                                     | MasterChefV3Receiver                               |
| MasterChefV3                 | updatePools             | This function forces immediate calculation and recording of accumulated rewards for specified pools by calling accumulateReward on their respective LM pools. This ensures rewards are properly tracked up to the current block, particularly important before allocation point changes or at period boundaries. Missing updates to specific pools creates accounting discrepancies in reward distribution, leading to incorrect reward amounts for users who deposit or withdraw during this period. | unknown multisig 2 or operator (0x0 not assigned)  |
| MasterChefV3                 | setOperator             | This function changes the operatorAddress variable that has permission to call the updatePools function. This address has administrative capabilities over reward calculation timing but not over allocation points or other critical parameters. An operator can manipulate reward calculations by selectively updating certain pools while ignoring others, creating temporary reward distribution imbalances.                                                                                      | unknown multisig 2                                 |
| MasterChefV3                 | setPeriodDuration       | This function modifies the PERIOD_DURATION variable which sets the default timeframe for reward distribution periods (between 1 and 30 days). This duration parameter affects how frequently rewards are calculated and how long each batch of CAKE rewards is distributed. Shorter periods increase the frequency of required upkeep calls while longer periods create extended commitments to existing allocation structures.                                                                       | unknown multisig 2                                 |
| MasterChefV3                 | updateFarmBoostContract | This function replaces the FarmBooster contract address which determines which NFT positions receive boosted rewards and by what multiplier. This contract has exclusive permission to call updateBoostMultiplier, directly controlling the reward multipliers for all staked positions. A malicious boost contract can implement arbitrary multiplier logic, redirecting rewards to specific positions by maximizing their multipliers while minimizing others.                                      | unknown multisig 2                                 |

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
