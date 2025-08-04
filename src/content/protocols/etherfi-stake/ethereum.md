---
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "H"]
author: ["mmilien_"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

This review focuses on EtherFi's eETH/WeETH protocol. eETH is a liquid restaking token designed for yield optimization on top of native staking. eETH is backed by staked and restaked ETH through EigenLayer. The protocol implements native restaking at the protocol level, allowing holders to earn both staking and restaking rewards simultaneously without requiring separate actions or asset lockups. As such, the tokens can be used in other DeFi applications.

# Ratings

## Chain

The protocol is deployed on several blockchain. This review focuses on the Ethereum mainnet deployment.

> Chain score: Low

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

## Conclusion

Some text in form of:

The xyz protocol achieves High centralization risk scores for its Upgradeability, Autonomy and Exit Window dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by ...

The project additionally could advance to Stage 2 if ...

# Reviewer's Notes

(Here, anything worth mentioning about what critical permissions you excluded from the scope or some elements that xyz protocol does in a unique way. If nothing seems relevant, just say that :)

⚠️ During our analysis, we identified ...

# Protocol Analysis

Here include the diagram. Please explain what the main contracts are doing within the diagram.

# Dependencies

Go into more detail of the oracle, bridge, or other dependency the defi protocol is using

# Governance

## Relevant Subsection

Here anything relevant to the governance, in this case it could be what you highlighted in "Upgrade Process"

## Security Council

New table with all the multisigs

| Name                           | Account                                                                                                               | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| EtherFi Undeclared Multisig #1 | [0x2aCA71020De61bb532008049e1Bd41E451aE8AdC](https://etherscan.io/address/0x2aCA71020De61bb532008049e1Bd41E451aE8AdC) | Multisig | ❌          | ✅              | ❌                | ❌             |

# Contracts & Permissions

## Contracts

Missing because of errors:

UUPSProxy LiquidityPool "0x308861A430be4cce5502d0A12724771Fc6DaF216", (impl 0xa6099d83a67a2c653feb5e4e48ec24c5aee1c515)
UUPSProxy EtherFiAdmin "0x0EF8fa4760Db8f5Cd4d993f3e3416f30f942D705", (impl 0x683583979c8be7bcfa41e788ab38857dff792f49)
UUPSProxy WithdrawRequestNFT "0x7d5706f6ef3F89B3951E23e557CDFBC3239D4E2c",

UUPSProxy RedemptionManager "0xdadef1ffbfeaab4f68a9fd181395f68b4e4e7ae0",

UUPSProxy EtherFiRestaker 0x1B7a4C3797236A1C37f8741c0Be35c2c72736fFf

UUPSProxy EtherFiRewardsRouter (ENS = "Fee Recipient"), "0x73f7b1184B5cD361cC0f7654998953E2a251dd58"

UUPSPRoxy "DepositAdapter" 0xcfC6d9Bd7411962Bfe7145451A7EF71A24b6A7A2 (impl 0xe87797a1afb329216811dfa22c87380128ca17d8)

| Contract Name                         | Address                                    |
| ------------------------------------- | ------------------------------------------ |
| EETH (Proxy)                          | 0x35fA164735182de50811E8e2E824cFb9B6118ac2 |
| EETH (Implementation)                 | 0x46c51d2e6d5fef0400d26320bc96995176c369dd |
| WeETH (Proxy)                         | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |
| WeETH (Implementation)                | 0x353e98f34b6e5a8d9d1876bf6df01284d05837cb |
| EtherFiGovernanceToken                | 0xFe0c30065B384F05761f15d0CC899D4F9F9Cc0eB |
| AddressProvider                       | 0x8487c5F8550E3C3e7734Fe7DCF77DB2B72E4A848 |
| AuctionManager (Proxy)                | 0x00C452aFFee3a17d9Cecc1Bcd2B8d5C7635C4CB9 |
| AuctionManager (Implementation)       | 0x68fe80c6e97e0c8613e2fed344358c6635ba5366 |
| StakingManager (Proxy)                | 0x25e821b7197B146F7713C3b89B6A4D83516B912d |
| StakingManager (Implementation)       | 0xb27d4e7b8ff1ef21751b50f3821d99719ad5868f |
| EtherFiNodesManager (Proxy)           | 0x8B71140AD2e5d1E7018d2a7f8a288BD3CD38916F |
| EtherFiNodesManager (Implementation)  | 0xe9ee6923d41cf5f964f11065436bd90d4577b5e4 |
| BNFT (Proxy)                          | 0x6599861e55abd28b91dd9d86A826eC0cC8D72c2c |
| BNFT (Implementation)                 | 0x6a393848f5d1b8e7dab45f3a7e01f9f0dc687242 |
| TNFT (Proxy)                          | 0x7B5ae07E2AF1C861BcC4736D23f5f66A61E0cA5e |
| TNFT (Implementation)                 | 0xafb82ce44fd8a3431a64742bcd3547eeda1afea7 |
| MembershipManager (Proxy)             | 0x3d320286E014C3e1ce99Af6d6B00f0C1D63E3000 |
| MembershipManager (Implementation)    | 0x047a7749ad683c2fd8a27c7904ca8dd128f15889 |
| MembershipNFT (Proxy)                 | 0xb49e4420eA6e35F98060Cd133842DbeA9c27e479 |
| MembershipNFT (Implementation)        | 0x290d981b41b713437265cd7846806d7500307106 |
| NodeOperatorManager (Proxy)           | 0xd5edf7730ABAd812247F6F54D7bd31a52554e35E |
| NodeOperatorManager (Implementation)  | 0xfcc674fc9a0602692d2a91905e7e978ae6ee2caf |
| Treasury                              | 0x6329004E903B7F420245E7aF3f355186f2432466 |
| Liquifier (Proxy)                     | 0x9ffdf407cde9a93c47611799da23924af3ef764f |
| Liquifier (Implementation)            | 0xa1a15fb15cbda9e6c480c5bca6e9aba9c5e2ff95 |
| EtherFiTimelock                       | 0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761 |
| EtherFiOracle (Proxy)                 | 0x57AaF0004C716388B21795431CD7D5f9D3Bb6a41 |
| EtherFiOracle (Implementation)        | 0x99be559fadf311d2cedea6265f4d36dfa4377b70 |
| CumulativeMerkleDrop (Proxy)          | 0x6Db24Ee656843E3fE03eb8762a54D86186bA6B64 |
| CumulativeMerkleDrop (Implementation) | 0x5e226b1de8b0f387d7c77f78cba2571d2a1be511 |
| RoleRegistry (Proxy)                  | 0x1d3Af47C1607A2EF33033693A9989D1d1013BB50 |
| RoleRegistry (Implementation)         | 0x1abfe5b356e8d735d3e363b5df5995a2a1012d0e |
| EarlyAdopterPool                      | 0x7623e9dc0da6ff821ddb9ebaba794054e078f8c4 |
| BoringGovernance                      | 0x86B5780b606940Eb59A062aA85a07959518c0161 |

## All Permission Owners

| Name                           | Account                                                                                                               | Type         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| EtherFi Undeclared Multisig #1 | [0x2aCA71020De61bb532008049e1Bd41E451aE8AdC](https://etherscan.io/address/0x2aCA71020De61bb532008049e1Bd41E451aE8AdC) | Multisig 3/5 |
| EtherFi Deployer               | [0xf8a86ea1Ac39EC529814c377Bd484387D395421e](https://etherscan.io/address/0xf8a86ea1Ac39EC529814c377Bd484387D395421e) | EOA          |
| EtherFiTimelock                | [0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761](https://etherscan.io/address/0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761) | Contract     |

AuctionManager LiquidityPool

0x2aCA71020De61bb532008049e1Bd41E451aE8AdC 3/5 multisig admin in the NodeOperatorsManager, owner of RoleRegistry
0xf8a86ea1Ac39EC529814c377Bd484387D395421e etherfi.deployer still admin in the NodeOperatorsManager (can whitelist node operators)

## Permissions

| Contract | Function            | Impact                                                                                                                                                                                                             | Owner           |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| EETH     | renounceOwnership   | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable.                                                                                                 | EtherFiTimelock |
| EETH     | transferOwnership   | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and reassigning ownership of tokens held in the contract. | EtherFiTimelock |
| EETH     | upgradeTo           | Upgrade the implementation contract. This effectively changes the logic of the contract and may reassign ownership of tokens held in the contract.                                                                 | EtherFiTimelock |
| EETH     | upgradeToAndCall    | Similar to _upgradeTo_, with an additional call to the newly assigned logic.                                                                                                                                       | EtherFiTimelock |
| EETH     | mintShares          | Mints new shares (`eETH` tokens) for a given user and increases the total supply. This is meant to be called by the `LiquidityPool` when a user makes a deposit.                                                   | LiquidityPool   |
| EETH     | burnShares          | Burns a users' shares and reduces the total supply. This is meant to be called by the `LiquidityPool` upon redemption of the token for `ETH`.                                                                      | LiquidityPool   |
| WeETH    | renounceOwnership   | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable.                                                                                                 | EtherFiTimelock |
| WeETH    | transferOwnership   | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and reassigning ownership of tokens held in the contract. | EtherFiTimelock |
| WeETH    | upgradeTo           | Upgrade the implementation contract. This effectively changes the logic of the contract and may reassign ownership of tokens held in the contract.                                                                 | EtherFiTimelock |
| WeETH    | upgradeToAndCall    | Similar to _upgradeTo_, with an additional call to the newly assigned logic.                                                                                                                                       | EtherFiTimelock |
| WeETH    | rescueTreasuryWeeth | This function forces the transfer of `WeETH` out of a deprecated treasury and sends them to the owner (`EtherFiTimelock`).                                                                                         | EtherFiTimelock |

| NodeOperatorManager | fetchNextKeyIndex | Fetches the IPFS index of the next unused key for the given Node Operator. This is used during bidding to commit a certain key to the associated bid. | AuctionManager |
| NodeOperatorManager | batchUpdateOperatorsApprovedTags | Approves or un approves an operator to run validators from a specific source of funds (`EETH` or `ETHER_FAN`). Only operators approved for a source of fund can run the validators created out of those specific deposits. Operators may be approved for both sources. | EtherFiTimelock, EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | addToWhitelist | Adds a node operator to the white list. Node operators can register themselves without being white listed but the `AuctionManager` will check they Node Operators are whitelisted at the time of bidding. | EtherFiTimelock, EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | removeFromWhitelist | Removes a Node Operator from the whitelist. The Node Operator will no longer be able to bid for new allocations. | EtherFiTimelock, EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | pauseContract | Pauses the registration of new node operators in the contract. | EtherFiTimelock, EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | unPauseContract | Resumes the contract and the registration of node operators. | EtherFiTimelock, EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | setAuctionContractAddress | Sets the address of the `AuctionContract`. The `AuctionContract` is the only one able to fetch keys. Each fetch consumes the key, if this address is set to a malicious contract is could exausth valid keys of Node Operators to prevent further deposits on the beacon chain. | EtherFiTimelock |
| NodeOperatorManager | updateAdmin | Grants or revokes admin privileges over the contract to a specific address. | EtherFiTimelock |
| NodeOperatorManager | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. | EtherFiTimelock |
| NodeOperatorManager | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock |
| NodeOperatorManager | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how Node Operators are added and allocated funds. | EtherFiTimelock |
| NodeOperatorManager | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock |

| StakingManager | batchDepositWithBidIds | ... | ['nonReentrant', 'whenNotPaused'] |
| StakingManager | batchRegisterValidators | Initial 1ETH deposit to register new validators. Once the validators are registered an oracle needs to confirm their withdrawal addresses before it can be approved for the remaining 31 ETH deposit. | ['nonReentrant', 'verifyDepositState', 'whenNotPaused'] |
| StakingManager | batchApproveRegistration | Completes the deposit of 31 ETH to validators previously created with `batchRegisterValidators`, this should come with a signature of the pre-submitted root. | [] |
| StakingManager | batchCancelDeposit | Cancels a user's deposits, if the validators have already been registered, the 1 ETH deposit is lost to the beacon chain as a penalty. It can no longer be cancelled after the full deposit has been made. | Staker |
| StakingManager | batchCancelDepositAsBnftHolder | Cancels a validator before the full 32 ETH deposit. If the 1 ETH deposit has already been made (the registration phase), this sum is lost to the beacon chain as a penalty. Validators can no longer be cancelled after the full deposit has been made. | BNFT holder (for those validators) |
| StakingManager | instantiateEtherFiNode | Instantiates a new `EtherFiNode` contract. | EtherFiNodesManager |
| StakingManager | setEtherFiNodesManagerAddress | Sets the address of the contract used as `EtherFiNodesManager`. This contract is critical as it is used as a reference during validator creation. | EtherFiTimelock |
| StakingManager | setLiquidityPoolAddress | Sets the address of the contract used as `LiquidityPool`. This contract is critical and changing the address could result in the loss of user funds through multiple attack vectors. | EtherFiTimelock |
| StakingManager | setMaxBatchDepositSize | Sets the max batch of deposits that can be made in one transaction. The current limit is 60. There are no bounds to this value, setting it to zero would prevent any further deposit. | ['onlyAdmin'] |
| StakingManager | upgradeEtherFiNode | Upgrades the `EtherFiNode` implementation contract. This could reassign all the funds and rewards withdrawn by validators, potentially leading to loss of funds. | EtherFiTimelock |
| StakingManager | updateFullStakingStatus | Sets full staking to false or true. When full staking is enabled, validators are no longer created in two phases (1 + 31 ETH), but by their full stake directly. | EtherFiTimelock |
| StakingManager | pauseContract | ... | ['onlyAdmin', 'whenNotPaused'] |
| StakingManager | unPauseContract | ... | ['onlyAdmin', 'whenPaused'] |
| StakingManager | updateAdmin | Grants or revokes the admin role to a given address. Admins can change contract parameters such as the max deposit batches and pausing the contract. Those actions could prevent the deposit of further validators in the system and impact its performance. | EtherFiTimelock |
| StakingManager | setNodeOperatorManager | Sets the address of the `NodeOperatorManager` contract used. The contract is used to validate node operators upon deposits, a malicious contract could prevent further deposits. | ['onlyAdmin'] |
| StakingManager | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how deposits happen. | EtherFiTimelock |
| StakingManager | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock | EtherFiTimelock |
| StakingManager | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators upgrading the `EtherFiNode` contract. | EtherFiTimelock |
| StakingManager | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock |

| AuctionManager | createBid | Create bids to run a given amount of validators. The Node Operator has to be whitelisted but the whitelist may be disabled. The Node Operator needs to pay the entire bid amount upfront, this amount will be collected if the validator is assigned to the bid ot the Node Operator can cancel an active bid to get a full refund. | NodeOperatorManager(Whitelisted Node Operator) |
| AuctionManager | updateSelectedBidInformation | Marks a bid as selected. This is called by the `StakingManager` when a bid is chosen. It can then no longer be cancelled. | StakingManager |
| AuctionManager | reEnterAuction | Lets the `StakingManager` re-enable a previously selected bid if its stake was cancelled. | StakingManager |
| AuctionManager | processAuctionFeeTransfer | Once a bid is selected and confirmed, the bid amount is transferred to the `MembershipManager` contract, if it's above a certain threshold. | StakingManager |
| AuctionManager | transferAccumulatedRevenue | Transfers the accumulated revenue (from selected bids) to the `MembershipManager` contract, no matter the amount. | ['onlyAdmin'] |
| AuctionManager | disableWhitelist | Disables the whitelist. If the whitelist is disabled any node operator can bid. | ['onlyAdmin'] |
| AuctionManager | enableWhitelist | Enables the whitelist. When the whitelist is enabled only node operators white listed in the `NodeOperatorManager` can create new bids. | ['onlyAdmin'] |
| AuctionManager | pauseContract | Pauses the creation and cancellation of bids. When paused new validators can still be attributed to existing bids, but the node operators have no mean to cancel their bids. | ['onlyAdmin', 'whenNotPaused'] |
| AuctionManager | unPauseContract | Unpauses the contract and allow the creation and cancellation of bids again. | ['onlyAdmin', 'whenPaused'] |
| AuctionManager | setStakingManagerContractAddress | Sets the address of the `StakingManager`. This is used for access control and giving this access to a malicious address could prevent the creation of further validators. | EtherFiTimelock |
| AuctionManager | setMinBidPrice | Sets the minimum bid price. Excessive amounts could prevent further bids and validator creation. | ['onlyAdmin'] |
| AuctionManager | setMaxBidPrice | Sets the maximum bid price. | ['onlyAdmin'] |
| AuctionManager | setAccumulatedRevenueThreshold | Sets the threshold above which the `ETH` associated with confirmed bid is transferred to the `MembershipManager`. | ['onlyAdmin'] |
| AuctionManager | updateWhitelistMinBidAmount | Updates the minimum bid amount for node operators in the whitelist. Excessive amounts could prevent further bids and validator creation. | EtherFiTimelock |
| AuctionManager | updateNodeOperatorManager | Updates the address used for the `NodeOperatorManager`, this contract is used as a reference for node operators and the whitelist. Assigning a malicious contract could effectively remove the whitelist. | EtherFiTimelock |
| AuctionManager | updateAdmin | Grants or revokes admin permission to a given address. Admins have the right to disable the whitelist and set bounds of bid prices. | EtherFiTimelock |
| AuctionManager | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how Node Operators bid for new validators. This could also reassign the ownership of all funds in the contract, even for unconfirmed bids. | EtherFiTimelock |
| AuctionManager | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock |
| AuctionManager | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. | EtherFiTimelock |
| AuctionManager | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant or admin privileges to other addresses. | EtherFiTimelock |

| LiquidityPool | depositToRecipient | Deposits `ETH` on behalf of another user. Can mint `eETH` tokens to arbitrary recipients. Malicious use could drain protocol by minting unlimited `eETH`. | Liquifier OR EtherFiAdmin |
| LiquidityPool | withdraw | Burns `eETH` shares and sends `ETH` to the recipient. Directly reduces pool liquidity and burns user shares. Withdrawals using a withdrawRequestNFT are taken directly out of the dedicated `ETH` amount locked for withdrawal. | withdrawRequestNFT, membershipManager, etherFiRedemptionManager |

| LiquidityPool | batchDeposit | Initiates validator creation by matching bid IDs with node operators. Allocates 32 `ETH` per validator from pool funds. Malicious spawner could drain pool by creating excessive validators or colluding with malicious operators. | Registered Validator Spawners (LIQUIDITY_POOL_ADMIN_ROLE controlled) |
| LiquidityPool | batchRegister | Registers validator keys and sends 1 `ETH` to beacon chain per validator. Critical step in validator lifecycle that commits pool `ETH`. Malicious use could register invalid keys, waste pool `ETH`, or front-run with malicious withdrawal credentials. | Registered Validator Spawners (LIQUIDITY_POOL_ADMIN_ROLE controlled) |
| LiquidityPool | batchApproveRegistration | Oracle function that sends final 31 `ETH` per validator to beacon chain after validation. Completes validator activation using significant pool funds. Malicious oracle could approve invalid validators, drain pool `ETH`, or collude with bad actors. | LIQUIDITY_POOL_ADMIN_ROLE holders |
| LiquidityPool | registerValidatorSpawner | Grants permission to spawn validators, critical gatekeeper function. Allows addresses to initiate validator creation and use pool funds. Malicious admin could register compromised spawners who could then drain the pool through validator manipulation. | LIQUIDITY_POOL_ADMIN_ROLE holders |
| LiquidityPool | unregisterValidatorSpawner | Removes validator spawning permissions from addresses. Prevents spawners from creating new validators using pool funds. Malicious use could disable legitimate spawners, disrupting protocol operations and validator onboarding. | LIQUIDITY_POOL_ADMIN_ROLE holders |
| LiquidityPool | sendExitRequests | Forces validators to exit and return staked `ETH` to pool. Critical for pool liquidity management and validator lifecycle. Malicious use could force premature exits, cause slashing penalties, or disrupt staking operations to manipulate pool composition. | LIQUIDITY_POOL_ADMIN_ROLE holders |
| LiquidityPool | rebase | Updates pool's staking rewards balance, core mechanism for distributing validator earnings. Adjusts totalValueOutOfLp affecting all user balances. Malicious use could artificially inflate/deflate all user holdings by manipulating reward calculations. | membershipManager contract |
| LiquidityPool | payProtocolFees | Distributes protocol fees by minting `eETH` to fee recipient. Directly affects protocol revenue and token supply. Malicious use could drain treasury funds or mint excessive tokens, diluting existing holders' value. | EtherFiAdmin |
| LiquidityPool | setFeeRecipient | Changes where protocol fees are sent. Determines destination of protocol revenue streams. Malicious admin could redirect all future protocol fees to their own address, permanently stealing protocol revenue. | LIQUIDITY_POOL_ADMIN_ROLE holders |
| LiquidityPool | setRestakeBnftDeposits | Controls whether new validators are restaked on EigenLayer. Affects protocol's restaking strategy and additional yield generation. Malicious use could disable restaking to reduce yields or enable it inappropriately causing unexpected slashing risks. | LIQUIDITY_POOL_ADMIN_ROLE holders |
| LiquidityPool | pauseContract | Emergency function that halts all protocol operations. Stops deposits, withdrawals, and validator operations. Malicious pauser could permanently DoS the protocol, preventing users from accessing funds or new deposits. | PROTOCOL_PAUSER role holders |
| LiquidityPool | unPauseContract | Resumes protocol operations after pause. Restores user access to funds and protocol functionality. Malicious use could unpause during ongoing attacks or before fixes are implemented, exposing users to continued risks. | PROTOCOL_UNPAUSER role holders |
| LiquidityPool | addEthAmountLockedForWithdrawal | Updates amount reserved for withdrawal requests. Critical for withdrawal liquidity management. Malicious admin contract could manipulate withdrawal availability, potentially blocking user access to funds or causing liquidity issues. | etherFiAdminContract |
| LiquidityPool | burnEEthShares | Destroys user shares during withdrawal process. Permanently reduces user token balance and total token supply. Malicious use could burn shares without corresponding `ETH` withdrawal, effectively stealing user funds through token destruction. | etherFiRedemptionManager OR withdrawRequestNFT contracts |
| LiquidityPool | upgradeTo | ... | EtherFiTimelock |
| LiquidityPool | upgradeToAndCall | ... | EtherFiTimelock |
| LiquidityPool | renounceOwnership | ... | EtherFiTimelock |
| LiquidityPool | transferOwnership | ... | EtherFiTimelock |

| EtherFiRedemptionManager | setCapacity (EtherFiRedemptionManager) | Sets maximum instant redemption capacity per time period. Controls liquidity available for instant withdrawals. Malicious admin could set to zero to DoS instant redemptions, or to maximum to allow bank-run scenarios that could destabilize the protocol. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setRefillRatePerSecond (EtherFiRedemptionManager) | Controls how fast redemption capacity refills. Affects user withdrawal experience and protocol stability. Malicious use could set to zero preventing redemptions, or extremely high allowing rapid pool drainage through instant redemptions. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setExitFeeBasisPoints (EtherFiRedemptionManager) | Sets fee charged for instant redemptions. Directly affects user costs and protocol revenue. Malicious admin could set to 100% (maximum) making redemptions prohibitively expensive, or to 0% reducing protocol sustainability and value capture. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setLowWatermarkInBpsOfTvl (EtherFiRedemptionManager) | Sets minimum liquidity threshold for instant redemptions. Controls when instant redemptions are disabled. Malicious use could set to 100% permanently disabling instant redemptions, or to 0% allowing redemptions even with no liquidity causing protocol instability. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setExitFeeSplitToTreasuryInBps (EtherFiRedemptionManager) | Controls how redemption fees are split between treasury and stakers. Affects protocol revenue distribution. Malicious admin could set to 100% redirecting all fees to treasury away from stakers, or 0% eliminating protocol fee revenue. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | pauseContract (EtherFiRedemptionManager) | Halts instant redemption functionality. Stops users from instant ETH withdrawals. Malicious pauser could block all instant redemptions forcing users into longer withdrawal queues, potentially causing liquidity crisis and user dissatisfaction. | PROTOCOL_PAUSER role holders |
| EtherFiRedemptionManager | unPauseContract (EtherFiRedemptionManager) | Resumes instant redemption functionality. Restores user access to instant withdrawals. Malicious use could resume redemptions during attacks or before fixes are implemented, allowing continued exploitation of redemption-related vulnerabilities. | PROTOCOL_UNPAUSER role holders |
| EtherFiRedemptionManager | upgradeTo | ... | EtherFiTimelock |
| EtherFiRedemptionManager | upgradeToAndCall | ... | EtherFiTimelock |

| AddressProvider | addContract | Adds a contract and an associated name to the `AddressProvider`. This serves as a registry for contract addresses in the protocol. | EtherFiTimelock |
| AddressProvider | removeContract | Removes a contract from the provider. | EtherFiTimelock |
| AddressProvider | setOwner | Changes the owner of the contract. The owner has the right to add and remove contracts. | EtherFiTimelock |

| EtherFiNodesManager | batchSendExitRequest | Sends a request from the T-NFT owner to exit the corresponding validators. The B-NFT owner must serve the request or their bond will get penalized. | Validators' `TNFT` owner |
| EtherFiNodesManager | startCheckpoint | Start a PEPE pod checkpoint balance proof. A new proof cannot be started until the previous proof is completed. [TODO] | EtherFiTimelock |
| EtherFiNodesManager | setProofSubmitter | ... | EtherFiTimelock |
| EtherFiNodesManager | processNodeExit | ... | EtherFiTimelock |
| EtherFiNodesManager | batchQueueRestakedWithdrawal | ... | EtherFiTimelock |
| EtherFiNodesManager | completeQueuedWithdrawals | ... | EtherFiTimelock |
| EtherFiNodesManager | partialWithdraw | ... | EtherFiTimelock |
| EtherFiNodesManager | batchPartialWithdraw | ... | EtherFiTimelock |
| EtherFiNodesManager | fullWithdraw | ... | ['nonReentrant', 'whenNotPaused'] |
| EtherFiNodesManager | batchFullWithdraw | ... | ['nonReentrant', 'whenNotPaused'] |
| EtherFiNodesManager | markBeingSlashed | ... | EtherFiTimelock |
| EtherFiNodesManager | allocateEtherFiNode | ... | StakingManager |
| EtherFiNodesManager | registerValidator | ... | StakingManager |
| EtherFiNodesManager | unregisterValidator | ... | StakingManager |
| EtherFiNodesManager | updateAllowedForwardedExternalCalls | ... | EtherFiTimelock |
| EtherFiNodesManager | updateAllowedForwardedEigenpodCalls | ... | EtherFiTimelock |
| EtherFiNodesManager | forwardEigenpodCall | ... | EtherFiTimelock |
| EtherFiNodesManager | forwardExternalCall | ... | EtherFiTimelock |
| EtherFiNodesManager | setStakingRewardsSplit | ... | EtherFiTimelock |
| EtherFiNodesManager | setNonExitPenalty | ... | EtherFiTimelock |
| EtherFiNodesManager | setValidatorPhase | ... | StakingManager |
| EtherFiNodesManager | setMaxEigenLayerWithdrawals | ... | EtherFiTimelock |
| EtherFiNodesManager | incrementNumberOfValidators | ... | StakingManager |
| EtherFiNodesManager | updateAdmin | ... | EtherFiTimelock |
| EtherFiNodesManager | updateEigenLayerOperatingAdmin | ... | EtherFiTimelock |
| EtherFiNodesManager | pauseContract | ... | EtherFiTimelock |
| EtherFiNodesManager | unPauseContract | ... | EtherFiTimelock |
| EtherFiNodesManager | upgradeTo | ... | EtherFiTimelock |
| EtherFiNodesManager | upgradeToAndCall | ... | EtherFiTimelock |
| EtherFiNodesManager | renounceOwnership | ... | EtherFiTimelock |
| EtherFiNodesManager | transferOwnership | ... | EtherFiTimelock |

| BNFT | mint | ... | StakingManager |
| BNFT | burnFromWithdrawal | ... | ['onlyEtherFiNodesManager'] |
| BNFT | burnFromCancelBNftFlow | ... | StakingManager |
| BNFT | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable (prevent further ugprades). | EtherFiTimelock |
| BNFT | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic. | EtherFiTimelock |
| BNFT | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and could also be used to reassign the ownership of all `BNFT`s already minted. | EtherFiTimelock |
| BNFT | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock |

| TNFT | mint | ... | StakingManager |
| TNFT | burnFromWithdrawal | ... | ['onlyEtherFiNodesManager'] |
| TNFT | burnFromCancelBNftFlow | ... | StakingManager|
| TNFT | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable (prevent further ugprades). | EtherFiTimelock |
| TNFT | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic. | EtherFiTimelock |
| TNFT | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and could also be used to reassign the ownership of all `TNFT`s already minted. | EtherFiTimelock |
| TNFT | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock |

| MembershipManager | wrapEthForEap | ... | ['whenNotPaused'] |
| MembershipManager | wrapEth | ... | ['whenNotPaused'] |
| MembershipManager | wrapEth | ... | ['whenNotPaused'] |
| MembershipManager | unwrapForEEthAndBurn | ... | ['whenNotPaused'] |
| MembershipManager | topUpDepositWithEth | ... | ['whenNotPaused'] |
| MembershipManager | requestWithdraw | ... | ['whenNotPaused'] |
| MembershipManager | requestWithdrawAndBurn | ... | ['whenNotPaused'] |
| MembershipManager | claim | ... | ['whenNotPaused'] |
| MembershipManager | rebase | ... | [] |
| MembershipManager | claimBatch | ... | ['whenNotPaused'] |
| MembershipManager | addNewTier | ... | [] |
| MembershipManager | updateTier | ... | [] |
| MembershipManager | setPoints | ... | [] |
| MembershipManager | updatePointsParams | ... | [] |
| MembershipManager | setWithdrawalLockBlocks | ... | [] |
| MembershipManager | setDepositAmountParams | ... | [] |
| MembershipManager | setTopUpCooltimePeriod | ... | [] |
| MembershipManager | setFeeAmounts | ... | [] |
| MembershipManager | setFanBoostThresholdEthAmount | ... | [] |
| MembershipManager | updateAdmin | ... | EtherFiTimelock |
| MembershipManager | pauseContract | ... | ['whenNotPaused'] |
| MembershipManager | unPauseContract | ... | ['whenPaused'] |
| MembershipManager | upgradeTo | ... | EtherFiTimelock |
| MembershipManager | upgradeToAndCall | ... | EtherFiTimelock |
| MembershipManager | renounceOwnership | ... | EtherFiTimelock |
| MembershipManager | transferOwnership | ... | EtherFiTimelock |

| MembershipNFT | mint | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | burn | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | incrementLock | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | processDepositFromEapUser | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | setMaxTokenId | ... | ['onlyAdmin'] |
| MembershipNFT | setUpForEap | ... | ['onlyAdmin'] |
| MembershipNFT | updateAdmin | ... | EtherFiTimelock |
| MembershipNFT | setMintingPaused | ... | ['onlyAdmin'] |
| MembershipNFT | setContractMetadataURI | ... | ['onlyAdmin'] |
| MembershipNFT | setMetadataURI | ... | ['onlyAdmin'] |
| MembershipNFT | alertMetadataUpdate | ... | ['onlyAdmin'] |
| MembershipNFT | alertBatchMetadataUpdate | ... | ['onlyAdmin'] |
| MembershipNFT | upgradeTo | ... | EtherFiTimelock |
| MembershipNFT | upgradeToAndCall | ... | EtherFiTimelock |
| MembershipNFT | renounceOwnership | ... | EtherFiTimelock |
| MembershipNFT | transferOwnership | ... | EtherFiTimelock |

| Treasury | renounceOwnership | Transfers the ownership of the contract to the zero address. This would lock the funds in the treasury irreversibly. There are no protection against this action built in the contract. | EtherFiTimelock |
| Treasury | transferOwnership | Transfers the ownership of the contract. The new owner has full access to the `ETH` in the treasury and could send it to any address. | EtherFiTimelock |
| Treasury | withdraw | Withdraws an amount of `ETH` to a given, arbitrary address. | EtherFiTimelock |

| Liquifier | withdrawEther | Sends all the `ETH` in this contract to the `LiquidityPool` contract. | ADMIN or EtherFiTimelock |
| Liquifier | sendToEtherFiRestaker | Sends a given amount of a specified token to the `EtherFiRestaker` contract. | ADMIN or EtherFiTimelock |
| Liquifier | updateWhitelistedToken | Update the whitelist to specify if a given token is accepted or not. Whitelisted tokens can be deposited and are sent to the `EtherFiRestaker` contract upon deposits. Whitelisted tokens are collateral used to mint new `eETH`, whitelisting arbitrary tokens could put the system at risk. | EtherFiTimelock |
| Liquifier | updateDepositCap | Updates the deposit cap of a given token. This cap is shared by all users to limit the amount of `eETH` that can be minted per whitelisted liquid staking `ETH` over time. | ADMIN or EtherFiTimelock |
| Liquifier | registerToken | Register a new liquid staking token. The caller specifies whether or not the token can already be accepted (ie. is whitelisted), its caps, Eigenlayer restaking strategy, and exchange rate reference contracts. | EtherFiTimelock |
| Liquifier | updateTimeBoundCapRefreshInterval | Updates the interval at which the deposit cap is reset. | EtherFiTimelock |
| Liquifier | pauseDeposits | Pauses deposits for a given liquid staking token by setting its cap to 0. This action to be manually cancelled by setting a new cap. | ONLYPAUSER |
| Liquifier | updateAdmin | Grants or revokes admin privileges to an address. Admins can trigger transfers to EtherFi contracts, pause and resume deposits, and change deposit caps. | EtherFiTimelock |
| Liquifier | updatePauser | Grants or revokes pauser privileges to an address. Pausers can | ADMIN or EtherFiTimelock |
| Liquifier | updateDiscountInBasisPoints | Updates the value of a staking's token "discounted rate". If nonzero users will receive less `eETH` than the value of their deposit. | ADMIN or EtherFiTimelock |
| Liquifier | updateQuoteStEthWithCurve | Enables or disables the use of a Curve pool to quote the value of Lido's `stETH`. | ADMIN or EtherFiTimelock |
| Liquifier | pauseContract | Pauses all further deposits in the contract, the remaining functionalities remain unpaused. | ADMIN or EtherFiTimelock |
| Liquifier | unPauseContract | Resumes deposits. | EtherFiTimelock |
| Liquifier | unwrapL2Eth | Sends the dummy L2ETH token to the `L1SyncPool` to be burnt in exchange for the same amount of `ETH` received by the `Liquifier`. | ['nonReentrant'] |
| Liquifier | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. Admin functions would remain accessible to the current admins. | EtherFiTimelock |
| Liquifier | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. This could be used to mint unlimited amounts of `eETH`. | EtherFiTimelock |
| Liquifier | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how it hange liquid staking tokens. This could be used to mint unlimited amounts of `eETH`, through the `LiquidityPool`. | EtherFiTimelock |
| Liquifier | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock |

| EtherFiRestaking | stEthRequestWithdrawal | Starts a request to withdraw `stETH` held by this contract into `ETH` using Lido's withdrawal queue. | [ admins ] |
| EtherFiRestaking | stEthClaimWithdrawals | Claims the specified withdrawals from Lido's withdrawal queue. This is meant to be called once the withdrawals reached the end of the queue and the `ETH` can be claimed by this contract. | [ admins ] |
| EtherFiRestaking | withdrawEther | Send this contract's entire `ETH` balance to the `LiquidityPool` contract. | [ admins ] |
| EtherFiRestaking | setRewardsClaimer | Sets the claimer of the restaking rewards throught Eigenlayer's `RewardsCoordinator`. | [] |
| EtherFiRestaking | delegateTo | Delegates this contract's Eigenlayer stake to an AVS operator. In current Eigenlayer implementation the stake can only be delegated to one operator at a time. **TODO** what are the implications | [] |
| EtherFiRestaking | undelegate | Undelegates the current Eigenlayer stake from the AVS operator it was previously delegated to. | [] |
| EtherFiRestaking | depositIntoStrategy | Deposits `stETH` (or the contract's token) into an Eigenlayer strategy defined at the time of contract deployment. The caller only specifies the token and amount to deposit. **TODO** what are the implications | [] |
| EtherFiRestaking | queueWithdrawals | Queues a withdrawal of a given amount of a token from the Eigenlayer restaking strategy. | [] |
| EtherFiRestaking | queueWithdrawalsParams | Alternative function to queue a withdrawal from the Eigenlayer restaking strategy. | [] |
| EtherFiRestaking | completeQueuedWithdrawals | Completes the given list of withdrawals such that the current contract receives the withdrawn tokens. The caller must match the enacter of the withdrawals. | [] |
| EtherFiRestaking | updateAdmin | ... | [] |
| EtherFiRestaking | updatePauser | Updates the list of users allowed to pause the contract. The pause functionality is not used and pausing the contract does not influence any of it functionalities. | [] |
| EtherFiRestaking | pauseContract | Pauses the contract by setting the pause flag to true. The pause functionality is not used and pausing the contract does not influence any of it functionalities. | [] |
| EtherFiRestaking | unPauseContract | Unpauses the contract. The pause functionality is not used and pausing the contract does not influence any of it functionalities. | [] |
| EtherFiRestaking | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. Admin functions would remain accessible to the current admins. | EtherFiTimelock |
| EtherFiRestaking | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock |
| EtherFiRestaking | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how it interacts with the Eigenlayer restaking services. This could also reassign the ownership of all funds in the contract, including its Eigenlayer stake. | EtherFiTimelock |
| EtherFiRestaking | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock |

| EtherFiTimelock | schedule | ... | ['onlyRole'] |
| EtherFiTimelock | scheduleBatch | ... | ['onlyRole'] |
| EtherFiTimelock | cancel | ... | ['onlyRole'] |
| EtherFiTimelock | execute | ... | ['onlyRoleOrOpenRole'] |
| EtherFiTimelock | executeBatch | ... | ['onlyRoleOrOpenRole'] |
| EtherFiTimelock | updateDelay | ... | [] |
| EtherFiTimelock | grantRole | ... | ['getRoleAdmin', 'onlyRole'] |
| EtherFiTimelock | revokeRole | ... | ['getRoleAdmin', 'onlyRole'] |

| EtherFiOracle | submitReport | ... | ['whenNotPaused'] |
| EtherFiOracle | addCommitteeMember | ... | EtherFiTimelock |
| EtherFiOracle | removeCommitteeMember | ... | EtherFiTimelock |
| EtherFiOracle | manageCommitteeMember | ... | EtherFiTimelock |
| EtherFiOracle | setReportStartSlot | ... | EtherFiTimelock |
| EtherFiOracle | setQuorumSize | ... | EtherFiTimelock |
| EtherFiOracle | setOracleReportPeriod | ... | EtherFiTimelock |
| EtherFiOracle | setConsensusVersion | ... | EtherFiTimelock |
| EtherFiOracle | setEtherFiAdmin | ... | EtherFiTimelock |
| EtherFiOracle | unpublishReport | ... | EtherFiTimelock |
| EtherFiOracle | updateLastPublishedBlockStamps | ... | EtherFiTimelock |
| EtherFiOracle | updateAdmin | ... | EtherFiTimelock |
| EtherFiOracle | pauseContract | ... | EtherFiTimelock |
| EtherFiOracle | unPauseContract | ... | EtherFiTimelock |
| EtherFiOracle | upgradeTo | ... | EtherFiTimelock |
| EtherFiOracle | upgradeToAndCall | ... | EtherFiTimelock |
| EtherFiOracle | renounceOwnership | ... | EtherFiTimelock |
| EtherFiOracle | transferOwnership | ... | EtherFiTimelock |

| CumulativeMerkleDrop | lzReceive | ... | [] |
| CumulativeMerkleDrop | setPeer | ... | ['onlyOwner'] |
| CumulativeMerkleDrop | setDelegate | ... | ['onlyOwner'] |
| CumulativeMerkleDrop | renounceOwnership | ... | ['onlyOwner'] |
| CumulativeMerkleDrop | transferOwnership | ... | ['onlyOwner'] |
| CumulativeMerkleDrop | grantRole | ... | ['getRoleAdmin', 'onlyRole'] |
| CumulativeMerkleDrop | revokeRole | ... | ['getRoleAdmin', 'onlyRole'] |
| CumulativeMerkleDrop | beginDefaultAdminTransfer | ... | ['onlyRole'] |
| CumulativeMerkleDrop | cancelDefaultAdminTransfer | ... | ['onlyRole'] |
| CumulativeMerkleDrop | changeDefaultAdminDelay | ... | ['onlyRole'] |
| CumulativeMerkleDrop | rollbackDefaultAdminDelay | ... | ['onlyRole'] |
| CumulativeMerkleDrop | grantRole | ... | ['getRoleAdmin', 'onlyRole'] |
| CumulativeMerkleDrop | revokeRole | ... | ['getRoleAdmin', 'onlyRole'] |
| CumulativeMerkleDrop | upgradeToAndCall | ... | ['onlyProxy', 'onlyRole'] |
| CumulativeMerkleDrop | initializeLayerZero | ... | ['onlyInitializing', 'onlyRole', 'reinitializer'] |
| CumulativeMerkleDrop | setMerkleRoot | ... | ['onlyRole'] |
| CumulativeMerkleDrop | claim | ... | ['nonReentrant', 'whenNotPaused'] |
| CumulativeMerkleDrop | pause | ... | ['onlyRole', 'whenNotPaused'] |
| CumulativeMerkleDrop | unpause | ... | ['onlyRole', 'whenPaused'] |
| CumulativeMerkleDrop | addChain | ... | ['onlyOwner', 'onlyRole'] |
| CumulativeMerkleDrop | removeChain | ... | ['onlyOwner', 'onlyRole'] |
| CumulativeMerkleDrop | quoteSetClaimEid | ... | ['onlyType3'] |
| CumulativeMerkleDrop | quoteBroadcastMerkleRoot | ... | ['onlyType3'] |
| CumulativeMerkleDrop | quoteBatchSetClaimEid | ... | ['onlyType3'] |
| CumulativeMerkleDrop | updateClaimEid | ... | ['onlyType3'] |
| CumulativeMerkleDrop | batchUpdateClaimEid | ... | ['onlyRole', 'onlyType3'] |
| CumulativeMerkleDrop | setAndBroadcastMerkleRoot | ... | ['onlyRole', 'onlyType3'] |
| CumulativeMerkleDrop | topUpPeer | ... | ['onlyRole', 'onlyType3'] |
| CumulativeMerkleDrop | setUserChainSwitchingEnabled | ... | ['onlyRole'] |
| CumulativeMerkleDrop | setBatchMessageGasLimit | ... | ['onlyRole'] |
| CumulativeMerkleDrop | getExecutorReceiveOptions | ... | ['onlyType3'] |
| CumulativeMerkleDrop | sweepETH | ... | ['onlyRole'] |
| RoleRegistry | transferOwnership | ... | 0x2aCA71020De61bb532008049e1Bd41E451aE8AdC |
| RoleRegistry | renounceOwnership | ... | 0x2aCA71020De61bb532008049e1Bd41E451aE8AdC |
| RoleRegistry | transferOwnership | ... | 0x2aCA71020De61bb532008049e1Bd41E451aE8AdC |
| RoleRegistry | upgradeTo | ... | ['onlyProxy', 'onlyRole'] |
| RoleRegistry | upgradeToAndCall | ... | ['onlyProxy', 'onlyRole'] |
| RoleRegistry | grantRole | ... | ['getRoleAdmin', 'onlyRole'] |
| RoleRegistry | revokeRole | ... | ['getRoleAdmin', 'onlyRole'] |
| RoleRegistry | setRoleAdmin | ... | ['onlyRole'] |
| EarlyAdopterPool | renounceOwnership | ... | 0xF155a2632Ef263a6A382028B3B33feb29175b8A5 |
| EarlyAdopterPool | transferOwnership | ... | 0xF155a2632Ef263a6A382028B3B33feb29175b8A5 |
| EarlyAdopterPool | deposit | ... | ['DepositingOpen', 'OnlyCorrectAmount', 'whenNotPaused'] |
| EarlyAdopterPool | depositEther | ... | ['DepositingOpen', 'OnlyCorrectAmount', 'whenNotPaused'] |
| EarlyAdopterPool | withdraw | ... | ['nonReentrant'] |
| EarlyAdopterPool | claim | ... | ['nonReentrant'] |
| EarlyAdopterPool | setClaimingOpen | ... | 0xF155a2632Ef263a6A382028B3B33feb29175b8A5 |
| EarlyAdopterPool | setClaimReceiverContract | ... | 0xF155a2632Ef263a6A382028B3B33feb29175b8A5 |
| EarlyAdopterPool | pauseContract | ... | 0xF155a2632Ef263a6A382028B3B33feb29175b8A5 |
| EarlyAdopterPool | unPauseContract | ... | 0xF155a2632Ef263a6A382028B3B33feb29175b8A5 |
| BoringGovernance | setAuthority | ... | [] |
| BoringGovernance | transferOwnership | ... | ['requiresAuth'] |
| BoringGovernance | manage | ... | ['requiresAuth'] |
| BoringGovernance | manage | ... | ['requiresAuth'] |
| BoringGovernance | enter | ... | ['requiresAuth'] |
| BoringGovernance | exit | ... | ['requiresAuth'] |
| BoringGovernance | setBeforeTransferHook | ... | ['requiresAuth'] |
| BoringGovernance | setShareLocker | ... | ['requiresAuth'] |
