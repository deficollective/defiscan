---
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "H", "L", "H", "H"]
author: ["mmilien_"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

This review focuses on EtherFi's `eETH`/`WeETH` protocol. `eETH` is a liquid restaking token designed for yield optimization on top of native staking. `eETH` is backed by staked and restaked `ETH` through EigenLayer. The protocol implements native restaking at the protocol level, allowing holders to earn both staking and restaking rewards simultaneously without requiring separate actions or asset lockups. As such, the tokens can be used in other DeFi applications.

# Ratings

## Chain

The protocol is deployed on several chains. This review focuses on the Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability

All contracts in the protocol can be upgraded by a [4-out-of-7 multisig](#security-council) with a delay of 3 days. This includes the `eETH` and `WeETH` tokens and the contracts handling validator withdrawals. Through an upgrade, the multisig could reattribute the ownership of all funds in the protocol, which would lead to the _loss of user funds_ and _loss of unclaimed yield_. As the signers are not announced, it does not qualify for the role of security council.

An [oracle](#stakers-and-operators) with 2-out-of-3 signers reports onchain on the state of the beacon chain and the performance of the EtherFi validators. This information is critical to the functioning of the protocol and if manipulated could be used to mint excessive `eETH` and dilute users, leading to _loss of user funds_. Once the oracle members submit a report, a [3-out-of-5 multisig](#security-council) has a limited 10 minutes window to cancel it, after which a [Depositor EOA](#security-council) can execute the corresponding actions through the `EtherFiAdmin`contract.

> Upgradeability score: High

## Autonomy

EtherFi Staking has multiple operators.

Node Operators: operate native ethereum staking validators with the ETH depositted in the liquidity pool.
Can be Trusted (fixed bid), or Trustless (highest bidder wins).

Liquid Staking Tokens: liquid staking tokens are supported and restaked also. + Curve pool or prices for those tokens
QUESTION: which eigenpod do they use? Who's the staker?
https://community.chaoslabs.xyz/etherfi/risk/avs

Stakers who are bond holder

Each withdrawal safe has a corresponding Eigenpod for restaking purposes. Is the staker the same as the node operator?¨

Eigenlayer for restaking

> Autonomy score: Low

## Exit Window

All contract upgrades are currently subject to a delay of 3 days.

**Repeat upgradeability stuff, with exit windows**

> Exit Window score: High

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

> Accessibility score: High

## Conclusion

Some text in form of:

The xyz protocol achieves High centralization risk scores for its Upgradeability, Autonomy and Exit Window dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by ...

The project additionally could advance to Stage 2 if ...

# Reviewer's Notes

(Here, anything worth mentioning about what critical permissions you excluded from the scope or some elements that xyz protocol does in a unique way. If nothing seems relevant, just say that :)

⚠️ During our analysis, we identified ...

The support for L2 ETH through the ....

# Protocol Analysis

## Liquid Staking

## Stakers and Operators

## ReStaking

# Dependencies

Go into more detail of the oracle, bridge, or other dependency the defi protocol is using

# Governance

## Relevant Subsection

Here anything relevant to the governance, in this case it could be what you highlighted in "Upgrade Process"

## Security Council

New table with all the multisigs

| Name                           | Account                                                                                                               | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| EtherFi Undeclared Multisig #1 | [0x2aCA71020De61bb532008049e1Bd41E451aE8AdC](https://etherscan.io/address/0x2aCA71020De61bb532008049e1Bd41E451aE8AdC) | Multisig 3/5 | ❌          | ✅              | ❌                | ❌             |
| EtherFi Undeclared Multisig #2 | [0xcdd57D11476c22d265722F68390b036f3DA48c21](https://etherscan.io/address/0xcdd57D11476c22d265722F68390b036f3DA48c21) | Multisig 4/7 | ✅          | ✅              | ❌                | ❌             |

# Contracts & Permissions

## Contracts

Missing because of errors:

UUPSProxy LiquidityPool "0x308861A430be4cce5502d0A12724771Fc6DaF216", (impl 0x025911766aEF6fF0C294FD831a2b5c17dC299B3f)
UUPSProxy EtherFiAdmin "0x0EF8fa4760Db8f5Cd4d993f3e3416f30f942D705", (impl 0xd50f28485A75A1FdE432BA7d012d0E2543D2f20d)
UUPSProxy WithdrawRequestNFT "0x7d5706f6ef3F89B3951E23e557CDFBC3239D4E2c",

UUPSProxy RedemptionManager "0xdadef1ffbfeaab4f68a9fd181395f68b4e4e7ae0",

UUPSProxy EtherFiRestaker 0x1B7a4C3797236A1C37f8741c0Be35c2c72736fFf

UUPSProxy EtherFiRewardsRouter (ENS = "Fee Recipient"), "0x73f7b1184B5cD361cC0f7654998953E2a251dd58"

UUPSPRoxy "DepositAdapter" 0xcfC6d9Bd7411962Bfe7145451A7EF71A24b6A7A2 (impl 0xe87797a1afb329216811dfa22c87380128ca17d8)

EtherFiTimelock (8 Hours) 0xcd425f44758a08baab3c4908f3e3de5776e45d7a
TODO: Scan its access control

NEW RoleRegistry: 0x62247D29B4B9BECf4BB73E0c722cf6445cfC7cE9

EtherFiNode implementation: 0x5Dae50e686f7CB980E4d0c5E4492c56bC73eD9a2

| Contract Name                         | Address                                    |
| ------------------------------------- | ------------------------------------------ |
| EETH (Proxy)                          | 0x35fA164735182de50811E8e2E824cFb9B6118ac2 |
| EETH (Implementation)                 | 0xCB3D917A965A70214f430a135154Cd5ADdA2ad84 |
| WeETH (Proxy)                         | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |
| WeETH (Implementation)                | 0x2d10683E941275D502173053927AD6066e6aFd6B |
| EtherFiGovernanceToken                | 0xFe0c30065B384F05761f15d0CC899D4F9F9Cc0eB |
| AddressProvider                       | 0x8487c5F8550E3C3e7734Fe7DCF77DB2B72E4A848 |
| AuctionManager (Proxy)                | 0x00C452aFFee3a17d9Cecc1Bcd2B8d5C7635C4CB9 |
| AuctionManager (Implementation)       | 0x68fe80c6e97e0c8613e2fed344358c6635ba5366 |
| StakingManager (Proxy)                | 0x25e821b7197B146F7713C3b89B6A4D83516B912d |
| StakingManager (Implementation)       | 0x433d06fFc5EfE0e93daa22fcEF7eD60e65Bf70b4 |
| EtherFiNodesManager (Proxy)           | 0x8B71140AD2e5d1E7018d2a7f8a288BD3CD38916F |
| EtherFiNodesManager (Implementation)  | 0x158B21148E86470E2075926EbD5528Af2D510cAF |
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
| EtherFiTimelock (3 Days)              | 0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761 |
| EtherFiOracle (Proxy)                 | 0x57AaF0004C716388B21795431CD7D5f9D3Bb6a41 |
| EtherFiOracle (Implementation)        | 0x5eefE6f65a280A6f1Eb1FdFf36Ab9e2af6f38462 |
| CumulativeMerkleDrop (Proxy)          | 0x6Db24Ee656843E3fE03eb8762a54D86186bA6B64 |
| CumulativeMerkleDrop (Implementation) | 0x5e226b1de8b0f387d7c77f78cba2571d2a1be511 |
| RoleRegistry (Proxy)                  | 0x1d3Af47C1607A2EF33033693A9989D1d1013BB50 |
| RoleRegistry (Implementation)         | 0x1abfe5b356e8d735d3e363b5df5995a2a1012d0e |
| EarlyAdopterPool                      | 0x7623e9dc0da6ff821ddb9ebaba794054e078f8c4 |
| BoringGovernance                      | 0x86B5780b606940Eb59A062aA85a07959518c0161 |

New deployments on 31.07:
EtherFiVIewer: 0xF99Cc758a6A42f9A9eDed4Ac86905F8eE3B0d73e
EtherFiNode: 0x5Dae50e686f7CB980E4d0c5E4492c56bC73eD9a2
StakingManager: 0x433d06fFc5EfE0e93daa22fcEF7eD60e65Bf70b4
EtherFiNodesManager: 0x158B21148E86470E2075926EbD5528Af2D510cAF
LiquidityPool: 0x025911766aEF6fF0C294FD831a2b5c17dC299B3f
WeETH: 0x2d10683E941275D502173053927AD6066e6aFd6B
eETH: 0xCB3D917A965A70214f430a135154Cd5ADdA2ad84
EtherFiOracle: 0x5eefE6f65a280A6f1Eb1FdFf36Ab9e2af6f38462
EtherFiAdmin: 0xd50f28485A75A1FdE432BA7d012d0E2543D2f20d

Multisig TIMELOCK 3 days: 0xcdd57D11476c22d265722F68390b036f3DA48c21

## All Permission Owners

| Name                           | Account                                                                                                               | Type         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| EtherFi Undeclared Multisig #1 | [0x2aCA71020De61bb532008049e1Bd41E451aE8AdC](https://etherscan.io/address/0x2aCA71020De61bb532008049e1Bd41E451aE8AdC) | Multisig 3/5 |
| EtherFi Undeclared Multisig #1 | [0xcdd57D11476c22d265722F68390b036f3DA48c21](https://etherscan.io/address/0xcdd57D11476c22d265722F68390b036f3DA48c21) | Multisig 4/7 |
| Underclared EOA                | [0x9af1298993dc1f397973c62a5d47a284cf76844d](https://etherscan.io/address/0x9af1298993dc1f397973c62a5d47a284cf76844d) | EOA          |
| EtherFi Deployer               | [0xf8a86ea1Ac39EC529814c377Bd484387D395421e](https://etherscan.io/address/0xf8a86ea1Ac39EC529814c377Bd484387D395421e) | EOA          |
| Beacon Depositor               | [0x12582a27e5e19492b4fcd194a60f8f5e1aa31b0f](https://etherscan.io/address/0x12582a27e5e19492b4fcd194a60f8f5e1aa31b0f) | EOA          |
| EtherFiTimelock (3 Days)       | [0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761](https://etherscan.io/address/0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761) | Contract     |

AuctionManager LiquidityPool

0x9af1298993dc1f397973c62a5d47a284cf76844d EOA Protocol Pauser (Liquidity Pool)
0x2aCA71020De61bb532008049e1Bd41E451aE8AdC 3/5 multisig admin in the NodeOperatorsManager, owner of RoleRegistry
0xf8a86ea1Ac39EC529814c377Bd484387D395421e etherfi.deployer still admin in the NodeOperatorsManager (can whitelist node operators)

0x12582a27e5e19492b4fcd194a60f8f5e1aa31b0f Beacon Depositor EOA

## Permissions

| Contract | Function            | Impact                                                                                                                                                                                                             | Owner                    |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| EETH     | renounceOwnership   | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable.                                                                                                 | EtherFiTimelock (3 Days) |
| EETH     | transferOwnership   | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and reassigning ownership of tokens held in the contract. | EtherFiTimelock (3 Days) |
| EETH     | upgradeTo           | Upgrade the implementation contract. This effectively changes the logic of the contract and may reassign ownership of tokens held in the contract.                                                                 | EtherFiTimelock (3 Days) |
| EETH     | upgradeToAndCall    | Similar to _upgradeTo_, with an additional call to the newly assigned logic.                                                                                                                                       | EtherFiTimelock (3 Days) |
| EETH     | mintShares          | Mints new shares (`eETH` tokens) for a given user and increases the total supply. This is meant to be called by the `LiquidityPool` when a user makes a deposit.                                                   | LiquidityPool            |
| EETH     | burnShares          | Burns a users' shares and reduces the total supply. This is meant to be called by the `LiquidityPool` upon redemption of the token for `ETH`.                                                                      | LiquidityPool            |
| WeETH    | renounceOwnership   | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable.                                                                                                 | EtherFiTimelock (3 Days) |
| WeETH    | transferOwnership   | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and reassigning ownership of tokens held in the contract. | EtherFiTimelock (3 Days) |
| WeETH    | upgradeTo           | Upgrade the implementation contract. This effectively changes the logic of the contract and may reassign ownership of tokens held in the contract.                                                                 | EtherFiTimelock (3 Days) |
| WeETH    | upgradeToAndCall    | Similar to _upgradeTo_, with an additional call to the newly assigned logic.                                                                                                                                       | EtherFiTimelock (3 Days) |
| WeETH    | rescueTreasuryWeeth | This function forces the transfer of `WeETH` out of a deprecated treasury and sends them to the owner (`EtherFiTimelock (3 Days)`).                                                                                | EtherFiTimelock (3 Days) |

| NodeOperatorManager | fetchNextKeyIndex | Fetches the IPFS index of the next unused key for the given Node Operator. This is used during bidding to commit a certain key to the associated bid. | AuctionManager |
| NodeOperatorManager | batchUpdateOperatorsApprovedTags | Approves or un approves an operator to run validators from a specific source of funds (`EETH` or `ETHER_FAN`). Only operators approved for a source of fund can run the validators created out of those specific deposits. Operators may be approved for both sources. | EtherFiTimelock (3 Days), EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | addToWhitelist | Adds a node operator to the white list. Node operators can register themselves without being white listed but the `AuctionManager` will check they Node Operators are whitelisted at the time of bidding. | EtherFiTimelock (3 Days), EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | removeFromWhitelist | Removes a Node Operator from the whitelist. The Node Operator will no longer be able to bid for new allocations. | EtherFiTimelock (3 Days), EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | pauseContract | Pauses the registration of new node operators in the contract. | EtherFiTimelock (3 Days), EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | unPauseContract | Resumes the contract and the registration of node operators. | EtherFiTimelock (3 Days), EtherFi Deployer (EOA), Undeclared Multisig #1 |
| NodeOperatorManager | setAuctionContractAddress | Sets the address of the `AuctionContract`. The `AuctionContract` is the only one able to fetch keys. Each fetch consumes the key, if this address is set to a malicious contract is could exausth valid keys of Node Operators to prevent further deposits on the beacon chain. | EtherFiTimelock (3 Days) |
| NodeOperatorManager | updateAdmin | Grants or revokes admin privileges over the contract to a specific address. | EtherFiTimelock (3 Days) |
| NodeOperatorManager | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. | EtherFiTimelock (3 Days) |
| NodeOperatorManager | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock (3 Days) |
| NodeOperatorManager | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how Node Operators are added and allocated funds. | EtherFiTimelock (3 Days) |
| NodeOperatorManager | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |

| StakingManager | batchDepositWithBidIds | ... | ['nonReentrant', 'whenNotPaused'] |
| StakingManager | batchRegisterValidators | Initial 1ETH deposit to register new validators. Once the validators are registered an oracle needs to confirm their withdrawal addresses before it can be approved for the remaining 31 ETH deposit. | ['nonReentrant', 'verifyDepositState', 'whenNotPaused'] |
| StakingManager | batchApproveRegistration | Completes the deposit of 31 ETH to validators previously created with `batchRegisterValidators`, this should come with a signature of the pre-submitted root. | [] |
| StakingManager | batchCancelDeposit | Cancels a user's deposits, if the validators have already been registered, the 1 ETH deposit is lost to the beacon chain as a penalty. It can no longer be cancelled after the full deposit has been made. | Staker |
| StakingManager | batchCancelDepositAsBnftHolder | Cancels a validator before the full 32 ETH deposit. If the 1 ETH deposit has already been made (the registration phase), this sum is lost to the beacon chain as a penalty. Validators can no longer be cancelled after the full deposit has been made. | BNFT holder (for those validators) |
| StakingManager | instantiateEtherFiNode | Instantiates a new `EtherFiNode` contract. | EtherFiNodesManager |
| StakingManager | setEtherFiNodesManagerAddress | Sets the address of the contract used as `EtherFiNodesManager`. This contract is critical as it is used as a reference during validator creation. | EtherFiTimelock (3 Days) |
| StakingManager | setLiquidityPoolAddress | Sets the address of the contract used as `LiquidityPool`. This contract is critical and changing the address could result in the loss of user funds through multiple attack vectors. | EtherFiTimelock (3 Days) |
| StakingManager | setMaxBatchDepositSize | Sets the max batch of deposits that can be made in one transaction. The current limit is 60. There are no bounds to this value, setting it to zero would prevent any further deposit. | ['onlyAdmin'] |
| StakingManager | upgradeEtherFiNode | Upgrades the `EtherFiNode` implementation contract. This could reassign all the funds and rewards withdrawn by validators, potentially leading to loss of funds. | EtherFiTimelock (3 Days) |
| StakingManager | updateFullStakingStatus | Sets full staking to false or true. When full staking is enabled, validators are no longer created in two phases (1 + 31 ETH), but by their full stake directly. | EtherFiTimelock (3 Days) |
| StakingManager | pauseContract | ... | ['onlyAdmin', 'whenNotPaused'] |
| StakingManager | unPauseContract | ... | ['onlyAdmin', 'whenPaused'] |
| StakingManager | updateAdmin | Grants or revokes the admin role to a given address. Admins can change contract parameters such as the max deposit batches and pausing the contract. Those actions could prevent the deposit of further validators in the system and impact its performance. | EtherFiTimelock (3 Days) |
| StakingManager | setNodeOperatorManager | Sets the address of the `NodeOperatorManager` contract used. The contract is used to validate node operators upon deposits, a malicious contract could prevent further deposits. | ['onlyAdmin'] |
| StakingManager | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how deposits happen. | EtherFiTimelock (3 Days) |
| StakingManager | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) | EtherFiTimelock (3 Days) |
| StakingManager | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators upgrading the `EtherFiNode` contract. | EtherFiTimelock (3 Days) |
| StakingManager | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock (3 Days) |

| AuctionManager | createBid | Create bids to run a given amount of validators. The Node Operator has to be whitelisted but the whitelist may be disabled. The Node Operator needs to pay the entire bid amount upfront, this amount will be collected if the validator is assigned to the bid ot the Node Operator can cancel an active bid to get a full refund. | NodeOperatorManager(Whitelisted Node Operator) |
| AuctionManager | updateSelectedBidInformation | Marks a bid as selected. This is called by the `StakingManager` when a bid is chosen. It can then no longer be cancelled. | StakingManager |
| AuctionManager | reEnterAuction | Lets the `StakingManager` re-enable a previously selected bid if its stake was cancelled. | StakingManager |
| AuctionManager | processAuctionFeeTransfer | Once a bid is selected and confirmed, the bid amount is transferred to the `MembershipManager` contract, if it's above a certain threshold. | StakingManager |
| AuctionManager | transferAccumulatedRevenue | Transfers the accumulated revenue (from selected bids) to the `MembershipManager` contract, no matter the amount. | ['onlyAdmin'] |
| AuctionManager | disableWhitelist | Disables the whitelist. If the whitelist is disabled any node operator can bid. | ['onlyAdmin'] |
| AuctionManager | enableWhitelist | Enables the whitelist. When the whitelist is enabled only node operators white listed in the `NodeOperatorManager` can create new bids. | ['onlyAdmin'] |
| AuctionManager | pauseContract | Pauses the creation and cancellation of bids. When paused new validators can still be attributed to existing bids, but the node operators have no mean to cancel their bids. | ['onlyAdmin', 'whenNotPaused'] |
| AuctionManager | unPauseContract | Unpauses the contract and allow the creation and cancellation of bids again. | ['onlyAdmin', 'whenPaused'] |
| AuctionManager | setStakingManagerContractAddress | Sets the address of the `StakingManager`. This is used for access control and giving this access to a malicious address could prevent the creation of further validators. | EtherFiTimelock (3 Days) |
| AuctionManager | setMinBidPrice | Sets the minimum bid price. Excessive amounts could prevent further bids and validator creation. | ['onlyAdmin'] |
| AuctionManager | setMaxBidPrice | Sets the maximum bid price. | ['onlyAdmin'] |
| AuctionManager | setAccumulatedRevenueThreshold | Sets the threshold above which the `ETH` associated with confirmed bid is transferred to the `MembershipManager`. | ['onlyAdmin'] |
| AuctionManager | updateWhitelistMinBidAmount | Updates the minimum bid amount for node operators in the whitelist. Excessive amounts could prevent further bids and validator creation. | EtherFiTimelock (3 Days) |
| AuctionManager | updateNodeOperatorManager | Updates the address used for the `NodeOperatorManager`, this contract is used as a reference for node operators and the whitelist. Assigning a malicious contract could effectively remove the whitelist. | EtherFiTimelock (3 Days) |
| AuctionManager | updateAdmin | Grants or revokes admin permission to a given address. Admins have the right to disable the whitelist and set bounds of bid prices. | EtherFiTimelock (3 Days) |
| AuctionManager | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how Node Operators bid for new validators. This could also reassign the ownership of all funds in the contract, even for unconfirmed bids. | EtherFiTimelock (3 Days) |
| AuctionManager | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |
| AuctionManager | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. | EtherFiTimelock (3 Days) |
| AuctionManager | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant or admin privileges to other addresses. | EtherFiTimelock (3 Days) |

| LiquidityPool | depositToRecipient | Deposits `ETH` on behalf of another user. Can mint `eETH` tokens to arbitrary recipients. Malicious use could drain protocol by minting unlimited `eETH`. | Liquifier, EtherFiAdmin |
| LiquidityPool | withdraw | Burns `eETH` shares and sends `ETH` to the recipient. Directly reduces pool liquidity and burns user shares. Withdrawals using a withdrawRequestNFT are taken directly out of the dedicated `ETH` amount locked for withdrawal. | withdrawRequestNFT, membershipManager, etherFiRedemptionManager |

| LiquidityPool | batchDeposit | Initiates validator creation by matching bid IDs with node operators. Allocates 32 `ETH` per validator from pool funds. | ValidatorSpawners (Controlled by [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2)) |
| LiquidityPool | batchRegister | Registers validator keys and sends 1 `ETH` to beacon chain per validator. Critical step in validator lifecycle that commits pool `ETH`. Malicious use could register invalid keys, waste pool `ETH`, or front-run with malicious withdrawal credentials. | ValidatorSpawners (Controlled by [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2)) |

| LiquidityPool | batchApproveRegistration | Approves validators and triggers the 31 ETH deposit to the beacon chain. Completes validator activation. This is meant to be called by the oracle once it has confirmed that the 1 ETH registered were deposited on validators with the right withdrawal credentials. Malicious oracle could approve invalid validators, drain pool `ETH` to wrong validators. | [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2) |
| LiquidityPool | registerValidatorSpawner | Grants permission to spawn validators, critical gatekeeper function. Allows addresses to initiate validator creation and use pool funds. Malicious admin could register compromised spawners. **TODO**: it's not currently used. | [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2) |
| LiquidityPool | unregisterValidatorSpawner | Removes validator spawning permissions from addresses. Prevents spawners from creating new validators using pool funds. | [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2) |
| LiquidityPool | sendExitRequests | Forwards an exit request to the `NodesManage`, for validators owned by the `LiquidityPool`. Critical for pool liquidity management and validator lifecycle. Malicious use could force premature exits, or disrupt staking operations. | [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2) |

| LiquidityPool | rebase | Updates pool's staking rewards balance, core mechanism for distributing validator earnings. Adjusts totalValueOutOfLp affecting all user balances. Malicious use could artificially inflate/deflate all user holdings by manipulating reward calculations. | MembershipManager |
| LiquidityPool | payProtocolFees | Distributes protocol fees by minting `eETH` to fee recipient. Directly affects protocol revenue and token supply. The fee recipient receives the entire amount and is trusted to further split it to the right beneficiaries. A malicious use could mint arbitrary amounts of `eETH` and disrupt the protocol's economic viability. | EtherFiAdmin |
| LiquidityPool | setFeeRecipient | Changes where protocol fees are sent. Determines destination of protocol revenue streams. Malicious admin could redirect all future protocol fees to arbitrary addresses. Also see _payProtocolFees_ for details. | [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2) |
| LiquidityPool | setRestakeBnftDeposits | Controls whether new validators are restaked on EigenLayer. Affects protocol's restaking strategy and additional yield generation. | [LIQUIDITY_POOL_ADMIN_ROLE](#roleregistry-2) |

| LiquidityPool | pauseContract | Emergency function that halts all protocol operations. Stops deposits, withdrawals, and validator operations. Malicious pauser could permanently DoS the protocol, preventing users from accessing funds or new deposits. | [PROTOCOL_PAUSER](#roleregistry-2) |
| LiquidityPool | unPauseContract | Resumes protocol operations after pause. Restores user access to funds and protocol functionality. Malicious use could unpause during ongoing attacks or before fixes are implemented, exposing users to continued risks. | [PROTOCOL_UNPAUSER](#roleregistry-2) |
| LiquidityPool | addEthAmountLockedForWithdrawal | Updates amount reserved for withdrawal requests. Critical for withdrawal liquidity management. Malicious admin contract could manipulate withdrawal availability, potentially blocking user access to funds or causing liquidity issues. | EtherFiAdmin |
| LiquidityPool | burnEEthShares | Destroys user shares during withdrawal process. Permanently reduces user token balance and total token supply. Malicious use could burn shares without corresponding `ETH` withdrawal, effectively stealing user funds through token destruction. | etherFiRedemptionManager OR withdrawRequestNFT contracts |

| LiquidityPool | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how users deposit and withdraw funds. This could also reassign the ownership of all `eETH` tokens. | EtherFiTimelock (3 Days) |
| LiquidityPool | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |
| LiquidityPool | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. Permissions and roles for specific functions could still be changed through the `RoleRegistry` contract, which handles the access control. | EtherFiTimelock (3 Days) |
| LiquidityPool | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and bypassing access controls that are delegated to the `RoleRegistry`. | EtherFiTimelock (3 Days) |

| EtherFiAdmin | setValidatorTaskBatchSize | Sets how many validators are processed together in a
single batch when creating validator management tasks. | [ETHERFI_ORACLE_EXECUTOR_ADMIN_ROLE](#roleregistry-2) |
| EtherFiAdmin | executeTasks | Executes management tasks related to the report generated by the oracle. The consensus must have been reached on the report. Tasks include accruying rewards, managing validator states, collecting fees, and withdrawals. Processing a report containing false data could be critical for user funds. | [ETHERFI_ORACLE_EXECUTOR_TASK_MANAGER_ROLE](#roleregistry-2) |
| EtherFiAdmin | executeValidatorManagementTask | Executes management tasks specifically for validators, based on a report by the oracle. The consensus must have been reached on the report. Tasks include approving registrations or sending exit requests by calling `LiquidityPool`, as well as processing exit requests or reporting slashes by calling the `EtherFiNodesManager`. Processing a report containing false data could be critical for user funds. | [ETHERFI_ORACLE_EXECUTOR_TASK_MANAGER_ROLE](#roleregistry-2) |
| EtherFiAdmin | invalidateValidatorManagementTask | Invalidates a pending validator management task. | [ETHERFI_ORACLE_EXECUTOR_ADMIN_ROLE](#roleregistry-2) |
| EtherFiAdmin | updateAcceptableRebaseApr | Updates the acceptable rebase APR variable. This sets a maximum by which the APR can change in one report. If the APR changes above the maximum, the execution will revert and the report cannot be processed. The current limit is 500 BPS. | [ETHERFI_ORACLE_EXECUTOR_TASK_MANAGER_ROLE](#roleregistry-2) |
| EtherFiAdmin | updatePostReportWaitTimeInSlots | Sets the mandatory delay between oracle report submission and execution (to allow for invalidation). The current delay is 50 slots (10 minutes). | [ETHERFI_ORACLE_EXECUTOR_TASK_MANAGER_ROLE](#roleregistry-2) |
| EtherFiAdmin | Pause | Can pause all or some contracts simultaneously among the `LiquidityPool`, `MembershipManager`, `EtherFiOracle`, `StakingManager`, `AuctionManager`, and `EtherFiNodesManager`. See their respective _pause_ function for details. | [PROTOCOL_PAUSER](#roleregistry-2) |
| EtherFiAdmin | Unpause | Unpause all or some contracts simultaneously among the contracts cited above. | [PROTOCOL_UNPAUSER](#roleregistry-2) |
| EtherFiAdmin | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how oracle reports are processed. This could also change the pausing logic of the entire protocol. | EtherFiTimelock (3 Days) |
| EtherFiAdmin | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |
| EtherFiAdmin | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. Permissions and roles for specific functions could still be changed through the `RoleRegistry` contract, which handles the access control. | EtherFiTimelock (3 Days) |
| EtherFiAdmin | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and bypassing access controls that are delegated to the `RoleRegistry`. | EtherFiTimelock (3 Days) |

| EtherFiRedemptionManager | setCapacity (EtherFiRedemptionManager) | Sets maximum instant redemption capacity per time period. Controls liquidity available for instant withdrawals. Malicious admin could set to zero to DoS instant redemptions, or to maximum to allow bank-run scenarios that could destabilize the protocol. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setRefillRatePerSecond (EtherFiRedemptionManager) | Controls how fast redemption capacity refills. Affects user withdrawal experience and protocol stability. Malicious use could set to zero preventing redemptions, or extremely high allowing rapid pool drainage through instant redemptions. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setExitFeeBasisPoints (EtherFiRedemptionManager) | Sets fee charged for instant redemptions. Directly affects user costs and protocol revenue. Malicious admin could set to 100% (maximum) making redemptions prohibitively expensive, or to 0% reducing protocol sustainability and value capture. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setLowWatermarkInBpsOfTvl (EtherFiRedemptionManager) | Sets minimum liquidity threshold for instant redemptions. Controls when instant redemptions are disabled. Malicious use could set to 100% permanently disabling instant redemptions, or to 0% allowing redemptions even with no liquidity causing protocol instability. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | setExitFeeSplitToTreasuryInBps (EtherFiRedemptionManager) | Controls how redemption fees are split between treasury and stakers. Affects protocol revenue distribution. Malicious admin could set to 100% redirecting all fees to treasury away from stakers, or 0% eliminating protocol fee revenue. | ETHERFI_REDEMPTION_MANAGER_ADMIN_ROLE holders |
| EtherFiRedemptionManager | pauseContract (EtherFiRedemptionManager) | Halts instant redemption functionality. Stops users from instant ETH withdrawals. Malicious pauser could block all instant redemptions forcing users into longer withdrawal queues, potentially causing liquidity crisis and user dissatisfaction. | PROTOCOL_PAUSER role holders |
| EtherFiRedemptionManager | unPauseContract (EtherFiRedemptionManager) | Resumes instant redemption functionality. Restores user access to instant withdrawals. Malicious use could resume redemptions during attacks or before fixes are implemented, allowing continued exploitation of redemption-related vulnerabilities. | PROTOCOL_UNPAUSER role holders |
| EtherFiRedemptionManager | upgradeTo | ... | EtherFiTimelock (3 Days) |
| EtherFiRedemptionManager | upgradeToAndCall | ... | EtherFiTimelock (3 Days) |

| AddressProvider | addContract | Adds a contract and an associated name to the `AddressProvider`. This serves as a registry for contract addresses in the protocol. | EtherFiTimelock (3 Days) |
| AddressProvider | removeContract | Removes a contract from the provider. | EtherFiTimelock (3 Days) |
| AddressProvider | setOwner | Changes the owner of the contract. The owner has the right to add and remove contracts. | EtherFiTimelock (3 Days) |

| EtherFiNodesManager | batchSendExitRequest | Sends a request from the T-NFT owner to exit the corresponding validators. The B-NFT owner must serve the request or their bond will get penalized. | Validators' `TNFT` owner |
| EtherFiNodesManager | startCheckpoint | Start a PEPE pod checkpoint balance proof. A new proof cannot be started until the previous proof is completed. [TODO] | Admins (TODO?) |
| EtherFiNodesManager | setProofSubmitter | ... | Admins (TODO?) |
| EtherFiNodesManager | processNodeExit | ... | Admins (TODO?) |
| EtherFiNodesManager | batchQueueRestakedWithdrawal | ... | Admins (TODO?) |
| EtherFiNodesManager | completeQueuedWithdrawals | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | partialWithdraw | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | batchPartialWithdraw | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | fullWithdraw | ... | ['nonReentrant', 'whenNotPaused'] |
| EtherFiNodesManager | batchFullWithdraw | ... | ['nonReentrant', 'whenNotPaused'] |
| EtherFiNodesManager | markBeingSlashed | ... | Admins (TODO?) |
| EtherFiNodesManager | allocateEtherFiNode | ... | StakingManager |
| EtherFiNodesManager | registerValidator | ... | StakingManager |
| EtherFiNodesManager | unregisterValidator | ... | StakingManager |
| EtherFiNodesManager | updateAllowedForwardedExternalCalls | ... | Admins (TODO?) |
| EtherFiNodesManager | updateAllowedForwardedEigenpodCalls | ... | Admins (TODO?) |
| EtherFiNodesManager | forwardEigenpodCall | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | forwardExternalCall | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | setStakingRewardsSplit | ... | Admins (TODO?) |
| EtherFiNodesManager | setNonExitPenalty | ... | Admins (TODO?) |
| EtherFiNodesManager | setValidatorPhase | ... | StakingManager |
| EtherFiNodesManager | setMaxEigenLayerWithdrawals | ... | Admins (TODO?) |
| EtherFiNodesManager | incrementNumberOfValidators | ... | StakingManager |
| EtherFiNodesManager | updateAdmin | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | updateEigenLayerOperatingAdmin | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | pauseContract | ... | Admins (TODO?) |
| EtherFiNodesManager | unPauseContract | ... | Admins (TODO?) |
| EtherFiNodesManager | upgradeTo | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | upgradeToAndCall | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | renounceOwnership | ... | EtherFiTimelock (3 Days) |
| EtherFiNodesManager | transferOwnership | ... | EtherFiTimelock (3 Days) |

| BNFT | mint | ... | StakingManager |
| BNFT | burnFromWithdrawal | ... | ['onlyEtherFiNodesManager'] |
| BNFT | burnFromCancelBNftFlow | ... | StakingManager |
| BNFT | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable (prevent further ugprades). | EtherFiTimelock (3 Days) |
| BNFT | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic. | EtherFiTimelock (3 Days) |
| BNFT | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and could also be used to reassign the ownership of all `BNFT`s already minted. | EtherFiTimelock (3 Days) |
| BNFT | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |

| TNFT | mint | ... | StakingManager |
| TNFT | burnFromWithdrawal | ... | ['onlyEtherFiNodesManager'] |
| TNFT | burnFromCancelBNftFlow | ... | StakingManager|
| TNFT | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable (prevent further ugprades). | EtherFiTimelock (3 Days) |
| TNFT | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic. | EtherFiTimelock (3 Days) |
| TNFT | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and could also be used to reassign the ownership of all `TNFT`s already minted. | EtherFiTimelock (3 Days) |
| TNFT | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |

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
| MembershipManager | updateAdmin | ... | EtherFiTimelock (3 Days) |
| MembershipManager | pauseContract | ... | ['whenNotPaused'] |
| MembershipManager | unPauseContract | ... | ['whenPaused'] |
| MembershipManager | upgradeTo | ... | EtherFiTimelock (3 Days) |
| MembershipManager | upgradeToAndCall | ... | EtherFiTimelock (3 Days) |
| MembershipManager | renounceOwnership | ... | EtherFiTimelock (3 Days) |
| MembershipManager | transferOwnership | ... | EtherFiTimelock (3 Days) |

| MembershipNFT | mint | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | burn | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | incrementLock | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | processDepositFromEapUser | ... | ['onlyMembershipManagerContract'] |
| MembershipNFT | setMaxTokenId | ... | ['onlyAdmin'] |
| MembershipNFT | setUpForEap | ... | ['onlyAdmin'] |
| MembershipNFT | updateAdmin | ... | EtherFiTimelock (3 Days) |
| MembershipNFT | setMintingPaused | ... | ['onlyAdmin'] |
| MembershipNFT | setContractMetadataURI | ... | ['onlyAdmin'] |
| MembershipNFT | setMetadataURI | ... | ['onlyAdmin'] |
| MembershipNFT | alertMetadataUpdate | ... | ['onlyAdmin'] |
| MembershipNFT | alertBatchMetadataUpdate | ... | ['onlyAdmin'] |
| MembershipNFT | upgradeTo | ... | EtherFiTimelock (3 Days) |
| MembershipNFT | upgradeToAndCall | ... | EtherFiTimelock (3 Days) |
| MembershipNFT | renounceOwnership | ... | EtherFiTimelock (3 Days) |
| MembershipNFT | transferOwnership | ... | EtherFiTimelock (3 Days) |

| Treasury | renounceOwnership | Transfers the ownership of the contract to the zero address. This would lock the funds in the treasury irreversibly. There are no protection against this action built in the contract. | EtherFiTimelock (3 Days) |
| Treasury | transferOwnership | Transfers the ownership of the contract. The new owner has full access to the `ETH` in the treasury and could send it to any address. | EtherFiTimelock (3 Days) |
| Treasury | withdraw | Withdraws an amount of `ETH` to a given, arbitrary address. | EtherFiTimelock (3 Days) |

| Liquifier | withdrawEther | Sends all the `ETH` in this contract to the `LiquidityPool` contract. | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | sendToEtherFiRestaker | Sends a given amount of a specified token to the `EtherFiRestaker` contract. | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | updateWhitelistedToken | Update the whitelist to specify if a given token is accepted or not. Whitelisted tokens can be deposited and are sent to the `EtherFiRestaker` contract upon deposits. Whitelisted tokens are collateral used to mint new `eETH`, whitelisting arbitrary tokens could put the system at risk. | EtherFiTimelock (3 Days) |
| Liquifier | updateDepositCap | Updates the deposit cap of a given token. This cap is shared by all users to limit the amount of `eETH` that can be minted per whitelisted liquid staking `ETH` over time. | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | registerToken | Register a new liquid staking token. The caller specifies whether or not the token can already be accepted (ie. is whitelisted), its caps, Eigenlayer restaking strategy, and exchange rate reference contracts. | EtherFiTimelock (3 Days) |
| Liquifier | updateTimeBoundCapRefreshInterval | Updates the interval at which the deposit cap is reset. | EtherFiTimelock (3 Days) |
| Liquifier | pauseDeposits | Pauses deposits for a given liquid staking token by setting its cap to 0. This action to be manually cancelled by setting a new cap. | ONLYPAUSER |
| Liquifier | updateAdmin | Grants or revokes admin privileges to an address. Admins can trigger transfers to EtherFi contracts, pause and resume deposits, and change deposit caps. | EtherFiTimelock (3 Days) |
| Liquifier | updatePauser | Grants or revokes pauser privileges to an address. Pausers can | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | updateDiscountInBasisPoints | Updates the value of a staking's token "discounted rate". If nonzero users will receive less `eETH` than the value of their deposit. | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | updateQuoteStEthWithCurve | Enables or disables the use of a Curve pool to quote the value of Lido's `stETH`. | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | pauseContract | Pauses all further deposits in the contract, the remaining functionalities remain unpaused. | ADMIN or EtherFiTimelock (3 Days) |
| Liquifier | unPauseContract | Resumes deposits. | EtherFiTimelock (3 Days) |
| Liquifier | unwrapL2Eth | Sends the dummy L2ETH token to the `L1SyncPool` to be burnt in exchange for the same amount of `ETH` received by the `Liquifier`. | ['nonReentrant'] |
| Liquifier | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. Admin functions would remain accessible to the current admins. | EtherFiTimelock (3 Days) |
| Liquifier | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. This could be used to mint unlimited amounts of `eETH`. | EtherFiTimelock (3 Days) |
| Liquifier | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how it hange liquid staking tokens. This could be used to mint unlimited amounts of `eETH`, through the `LiquidityPool`. | EtherFiTimelock (3 Days) |
| Liquifier | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |

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
| EtherFiRestaking | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators. Admin functions would remain accessible to the current admins. | EtherFiTimelock (3 Days) |
| EtherFiRestaking | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock (3 Days) |
| EtherFiRestaking | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how it interacts with the Eigenlayer restaking services. This could also reassign the ownership of all funds in the contract, including its Eigenlayer stake. | EtherFiTimelock (3 Days) |
| EtherFiRestaking | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |

| EtherFiTimelock (3 Days) | schedule | ... | ['onlyRole'] |
| EtherFiTimelock (3 Days) | scheduleBatch | ... | ['onlyRole'] |
| EtherFiTimelock (3 Days) | cancel | ... | ['onlyRole'] |
| EtherFiTimelock (3 Days) | execute | ... | ['onlyRoleOrOpenRole'] |
| EtherFiTimelock (3 Days) | executeBatch | ... | ['onlyRoleOrOpenRole'] |
| EtherFiTimelock (3 Days) | updateDelay | ... | [] |
| EtherFiTimelock (3 Days) | grantRole | ... | ['getRoleAdmin', 'onlyRole'] |
| EtherFiTimelock (3 Days) | revokeRole | ... | ['getRoleAdmin', 'onlyRole'] |

| EtherFiOracle | submitReport | Called by each committee member to submit their report. The members need to submit the same report a quorum amount of time. Once the quorum is reached the report is considered published. The reports contain information on accrued rewards, validator exited, slashed, liquidity, and status of exit requests. Falsified information could lead to loss of user funds by devaluing `eETH`. | CommitteeMembers |
| EtherFiOracle | addCommitteeMember | Adds a new committee member. The member can push reports and contribute to the consensus as much as any other member. | EtherFiTimelock (3 Days) |
| EtherFiOracle | removeCommitteeMember | Removes a committee member. The member can no longer push reports. There are no protections to ensure that the quorum can still be reached once the member is removed. | EtherFiTimelock (3 Days) |
| EtherFiOracle | manageCommitteeMember | This function can be used to enable or disabled registered committee members. If disabled the members can no longer push reports. | EtherFiTimelock (3 Days) |
| EtherFiOracle | setReportStartSlot | Sets the start slot to publish reports, this will be the reference starting slot for the next report published. | Admins (TODO?) |
| EtherFiOracle | setQuorumSize | Sets the quorum size. The quorum is the number of submissions by committee members necessary in order to reach consensus and have a valid report. | EtherFiTimelock (3 Days) |
| EtherFiOracle | setOracleReportPeriod | Sets the oracle report period, the period covered by each report, in slots. | Admins (TODO?) |
| EtherFiOracle | setConsensusVersion | Sets the consensus version. Committee members need to include the consensus version in their report, the report can only be valid if it is for the latest consensus version. | Admins (TODO?) |
| EtherFiOracle | setEtherFiAdmin | Sets the address of the EtherFiAdmin contract. This contract is used to check that the previous report has been processed and that the new report is based on the correct blocks. | EtherFiTimelock (3 Days) |
| EtherFiOracle | unpublishReport | Cancels a report for which consensus has already been reached. Committee members need to submit a new report and reach consensus again from start. | Admins (TODO?) |
| EtherFiOracle | updateLastPublishedBlockStamps | Updates the reference slots and blocks of the last published report. This can be used to rebase the oracle. It could cherry pick blocks or avoid certain blocks. It might be used in cases where reports cannot be processed, for example due to high changes in the reported data, which are refused by the contracts. | EtherFiTimelock (3 Days) |
| EtherFiOracle | updateAdmin | Grants or revokes admin privileges to a given address. Admins have the power to change the consensus version, unpublish reports, or pause the contract. This could deny the oracle from functioning effectively. | EtherFiTimelock (3 Days) |
| EtherFiOracle | pauseContract | Pauses further report submission. | Admins (TODO?) |
| EtherFiOracle | unPauseContract | Resumes report submission. | Admins (TODO?) |
| EtherFiOracle | upgradeTo | Upgrade the implementation contract. This effectively changes the logic of the contract and how reports are submitted. This could manipulate report data without any delay. | EtherFiTimelock (3 Days) |
| EtherFiOracle | upgradeToAndCall | Similar to _upgradeTo_, with an additional call to the newly assigned logic. | EtherFiTimelock (3 Days) |
| EtherFiOracle | renounceOwnership | Renounces ownership of the contract. This would set the owner to the zero address and make the contract immutable. This would also prevent revoking admin rights of the current administrators, and adding or removing committee members. | EtherFiTimelock (3 Days) |
| EtherFiOracle | transferOwnership | Transfers ownership of contract to a specified address. The new owner will have the right to upgrade the contract, potentially changing its entire logic and grant admin privileges to other addresses. | EtherFiTimelock (3 Days) |

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

## Access Control

### RoleRegistry 2

| Role name                                 | ID                                                                 | Role Owners                                                       | Role Admin               |
| ----------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| LIQUIDITY_POOL_ADMIN_ROLE                 | 0x0e8d94121b3383f03d9ae60b39295aa793469d7230d51a3f62cbf47cd45481d9 | EtherFiAdmin, Timelock (8 Hours)                                  | EtherFiTimelock (3 Days) |
| PROTOCOL_PAUSER                           | 0xe6ff4398839854a2087720a46165c7be195bc9de6f7a3c5a977d3b6917b76af2 |                                                                   | EtherFiTimelock (3 Days) | EtherFiAdmin, [EtherFi Undeclared Multisig #1](#security-council), [Underclared EOA](#security-council) |
| PROTOCOL_UNPAUSER                         | 0xb72d40a29b0ca5ab6e0b32830618dfdcae56fae676396ff1f7c3fede659935c8 | EtherFiAdmin, [EtherFi Undeclared Multisig #1](#security-council) | EtherFiTimelock (3 Days) |
| ETHERFI_ORACLE_EXECUTOR_ADMIN_ROLE        | 0xf63b1ce674d2cec0dbfcdcc7e504ce31a335c457c363b9fafb6ca524addf1775 | EtherFiTimelock (8 Hours)                                         | EtherFiTimelock (3 Days) |
| ETHERFI_ORACLE_EXECUTOR_TASK_MANAGER_ROLE | 0xe9d356a03911100a5418b1829f363128136c30112754cb3dbe73b1674abe2ac8 | [Beacon Depositor EOA](#security-council)                         | EtherFiTimelock (3 Days) |
