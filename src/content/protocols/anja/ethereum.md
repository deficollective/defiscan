---
chain: "Ethereum"
stage: 1
reasons: []
risks: ["L", "L", "L", "L", "M"]
author: ["brianmcmichael"]
submission_date: "2024-11-19"
publish_date: "2024-11-23"
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
      { text: "Upgrades have no potential of “loss of funds“ ", status: "fixed"},
      { text: "Dependency with a High centralization score is mitigated", status: "fixed" },
      { text: "Frontend backups or self-hosting option exists", status: "fixed"},

    ],
    [
      { text: "There are no external dependencies", status: "fixed" },
      { text: "No alternative third-party frontends exist", status: "unfixed" },
      { text: "Contracts are immutable", status: "fixed" }
    ],
  ]
---

# Summary

The Ajna Protocol is a decentralized, noncustodial system for permissionless lending and borrowing that functions without governance or external price feeds. It operates through isolated pools where lenders provide liquidity at market-driven price levels, and borrowers secure loans using fungible or non-fungible collateral, ensuring autonomy, fairness, and resilience.

# Ratings

## Chain

The Ajna Protocol is deployed on Ethereum mainnet.

> Chain score: Low

## Upgradeability

Ajna is fully permissionless, allowing anyone to create, lend, or borrow in pools without the need for approval.

The protocol further is fully immutable without the ability to upgrade or make changes to the protocol, its functions or parameters.

> Upgradeability score: Low

## Autonomy

The protocol has no external dependencies and operates in a fully autonomous manner.

Ajna eliminates external dependencies by using a market-driven system where lenders specify lending prices and borrowers provide collateral, removing the need e.g. for oracles.

> Autonomy score: Low

## Exit Window

Ajna Protocol's contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

> Exit Window score: Low

## Accessibility

Two user interfaces exist and are operated by independent actors. However, these user interfaces are not _interoperable_ meaning that positions created on one cannot be managed or closed through the second frontend. This means that if one of the user interfaces is inaccessible or starts censoring users, users' positions and deposited funds are inaccessible or access is only possible at a large cost.

The reason for this is that one of the interfaces, summer.fi, uses a smart account system in order to offer a better UX to end users. This smart account system effectively results in a smart contract, the smart account, "controlling" positions and users only being able to access their positions through this contract. However, this smart account system is not supported by the second user interface thus making it impossible, or possible only at a high cost, to access positions created through summer.fi on the second interface and vice-versa.

> ℹ️The Ajna community has expressed plans to make available an emergency UI or instructions for emergency withdrawals. This situation will be monitored and the score reassessed if needed.

A list of the third-party user interfaces to access the Ajna protocol can be found [here](https://www.ajna.finance/).

> Accessibility score: Medium

## Conclusion

The Ajna protocl on Ethereum Mainnet achieves _Medium_ centralization score for _Accessibility_ and _Low_ centralization risk score for its _Upgradeability_, _Autonomy_, and _Exit Window_ dimensions. It thus ranks Stage 1.

To progress to _Stage 2_ the Ajna protocol should make an additional emergency UI available for emergency withdrawals.

> Overall score: Stage 1

# Reviewer Notes

There were no particular discoveries made during the analysis of this protocol.

# Protocol Analysis

# Dependencies

No external dependency has been found.

Ajna Finance enables borrowing and lending without external oracles by relying on a market-driven mechanism where lenders specify the price (in terms of quote tokens per unit of collateral) they are willing to lend at. This design eliminates the need for external price feeds by aggregating lender inputs into "price buckets," which act as discrete pricing tiers for collateral. Borrowers can access liquidity by pledging collateral against these buckets, while the protocol automatically adjusts interest rates based on pool utilization and collateralization levels. This ensures stability and fairness through self-regulating market dynamics, independent of external dependencies​.

Ajna's liquidation works without oracles by triggering auctions when a loan's collateralization falls below the pool's Lowest Utilized Price (LUP). Liquidation is initiated by users posting a bond and proceeds through a Dutch auction, where collateral is sold at decaying prices until the debt is repaid. This market-driven process ensures fair price discovery, with penalties discouraging unnecessary liquidations and rewards incentivizing valid ones.

# Governance

## Security Council

The protocol is completely immutable, thus no Security Council is required 🎉

## Exit Window

The protocol is completely immutable, thus no exit window is required. 🎉

# Contracts & Permissions

See [Whitepaper: AJNA PROTOCOL: Automated Lending Markets](https://www.ajna.finance/pdf/Ajna_Protocol_Whitepaper_01-11-2024.pdf)

## Contracts

| Contract Name          | Address                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AJNA token             | [0x9a96ec9B57Fb64FbC60B423d1f4da7691Bd35079](https://etherscan.io/address/0x9a96ec9B57Fb64FbC60B423d1f4da7691Bd35079) |
| ERC20 factory          | [0x6146DD43C5622bB6D12A5240ab9CF4de14eDC625](https://etherscan.io/address/0x6146DD43C5622bB6D12A5240ab9CF4de14eDC625) |
| ERC721 factory         | [0x27461199d3b7381De66a85D685828E967E35AF4c](https://etherscan.io/address/0x27461199d3b7381De66a85D685828E967E35AF4c) |
| PoolInfoUtils          | [0x30c5eF2997d6a882DE52c4ec01B6D0a5e5B4fAAE](https://etherscan.io/address/0x30c5eF2997d6a882DE52c4ec01B6D0a5e5B4fAAE) |
| PoolInfoUtilsMulticall | [0xe4e553243264f2bF7C135F1eC3a8c09078731227](https://etherscan.io/address/0xe4e553243264f2bF7C135F1eC3a8c09078731227) |
| PositionManager        | [0x87B0F458d8F1ACD28A83A748bFFbE24bD6B701B1](https://etherscan.io/address/0x87B0F458d8F1ACD28A83A748bFFbE24bD6B701B1) |
| BurnWrapper            | [0x936Ab482d6bd111910a42849D3A51Ff80BB0A711](https://etherscan.io/address/0x936Ab482d6bd111910a42849D3A51Ff80BB0A711) |
| GrantFund              | [0x74d5b005ca64a5C9EE3611Bdc6F6C02D93C84b2f](https://etherscan.io/address/0x74d5b005ca64a5C9EE3611Bdc6F6C02D93C84b2f) |

## All Permission Owners

None. Ajna does not have any permissioned owners because it operates as a fully decentralized, governance-free protocol, with all functions controlled by deterministic smart contract rules. Anyone can deploy the protocol on compatible EVMs, ensuring its accessibility and independence from centralized authority or ownership.

## Permissions

None. 🎉
