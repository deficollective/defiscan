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

| Name          | Account                                     | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------- | ------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| Team Multisig | [0x123](https://etherscan.io/address/0x123) | Multisig | ✅          | ❌              | ❌                | ✅             |

# Contracts & Permissions

## Contracts

Missing because of errors:

UUPSProxy LiquidityPool "0x308861A430be4cce5502d0A12724771Fc6DaF216", (impl 0xa6099d83a67a2c653feb5e4e48ec24c5aee1c515)

"0x7d5706f6ef3F89B3951E23e557CDFBC3239D4E2c", "0xdadef1ffbfeaab4f68a9fd181395f68b4e4e7ae0", "0x0EF8fa4760Db8f5Cd4d993f3e3416f30f942D705", "0x73f7b1184B5cD361cC0f7654998953E2a251dd58"

UUPSPRoxy "DepositAdapter" 0xcfC6d9Bd7411962Bfe7145451A7EF71A24b6A7A2 (impl 0xe87797a1afb329216811dfa22c87380128ca17d8)

| Contract Name          | Address                                    |
| ---------------------- | ------------------------------------------ |
| UUPSProxy              | 0x35fA164735182de50811E8e2E824cFb9B6118ac2 |
| EETH                   | 0x46c51d2e6d5fef0400d26320bc96995176c369dd |
| UUPSProxy              | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |
| WeETH                  | 0x353e98f34b6e5a8d9d1876bf6df01284d05837cb |
| EtherFiGovernanceToken | 0xFe0c30065B384F05761f15d0CC899D4F9F9Cc0eB |
| AddressProvider        | 0x8487c5F8550E3C3e7734Fe7DCF77DB2B72E4A848 |
| UUPSProxy              | 0x00C452aFFee3a17d9Cecc1Bcd2B8d5C7635C4CB9 |
| AuctionManager         | 0x68fe80c6e97e0c8613e2fed344358c6635ba5366 |
| UUPSProxy              | 0x25e821b7197B146F7713C3b89B6A4D83516B912d |
| StakingManager         | 0xb27d4e7b8ff1ef21751b50f3821d99719ad5868f |
| UUPSProxy              | 0x8B71140AD2e5d1E7018d2a7f8a288BD3CD38916F |
| EtherFiNodesManager    | 0xe9ee6923d41cf5f964f11065436bd90d4577b5e4 |
| UUPSProxy              | 0x6599861e55abd28b91dd9d86A826eC0cC8D72c2c |
| BNFT                   | 0x6a393848f5d1b8e7dab45f3a7e01f9f0dc687242 |
| UUPSProxy              | 0x7B5ae07E2AF1C861BcC4736D23f5f66A61E0cA5e |
| TNFT                   | 0xafb82ce44fd8a3431a64742bcd3547eeda1afea7 |
| UUPSProxy              | 0x3d320286E014C3e1ce99Af6d6B00f0C1D63E3000 |
| MembershipManager      | 0x047a7749ad683c2fd8a27c7904ca8dd128f15889 |
| UUPSProxy              | 0xb49e4420eA6e35F98060Cd133842DbeA9c27e479 |
| MembershipNFT          | 0x290d981b41b713437265cd7846806d7500307106 |
| UUPSProxy              | 0xd5edf7730ABAd812247F6F54D7bd31a52554e35E |
| NodeOperatorManager    | 0xfcc674fc9a0602692d2a91905e7e978ae6ee2caf |
| Treasury               | 0x6329004E903B7F420245E7aF3f355186f2432466 |
| UUPSProxy              | 0x9ffdf407cde9a93c47611799da23924af3ef764f |
| Liquifier              | 0xa1a15fb15cbda9e6c480c5bca6e9aba9c5e2ff95 |
| EtherFiTimelock        | 0x9f26d4C958fD811A1F59B01B86Be7dFFc9d20761 |
| UUPSProxy              | 0x57AaF0004C716388B21795431CD7D5f9D3Bb6a41 |
| EtherFiOracle          | 0x99be559fadf311d2cedea6265f4d36dfa4377b70 |
| UUPSProxy              | 0x6Db24Ee656843E3fE03eb8762a54D86186bA6B64 |
| CumulativeMerkleDrop   | 0x5e226b1de8b0f387d7c77f78cba2571d2a1be511 |
| UUPSProxy              | 0x1d3Af47C1607A2EF33033693A9989D1d1013BB50 |
| RoleRegistry           | 0x1abfe5b356e8d735d3e363b5df5995a2a1012d0e |
| EarlyAdopterPool       | 0x7623e9dc0da6ff821ddb9ebaba794054e078f8c4 |
| BoringGovernance       | 0x86B5780b606940Eb59A062aA85a07959518c0161 |

## All Permission Owners

| Name | Account                                     | Type         |
| ---- | ------------------------------------------- | ------------ |
| name | [0x...](https://etherscan.io/address/0x...) | Multisig x/y |
| name | [0x...](https://etherscan.io/address/0x...) | Contract     |
| name | [0x...](https://etherscan.io/address/0x...) | EOA          |

## Permissions

| Contract      | Function     | Impact                                                                                                                                                                                                                                                                                                                                     | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| contract name | functionname | First sentence: what it does technically, e.g "It assigns a new address to the owner variable". Second sentence: what is the impact within the system, e.g "The owner is permissioned to raise fees". Third sentence: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield. | owner of the permission |
