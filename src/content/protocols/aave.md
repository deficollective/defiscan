---
protocol: "Aave v3"
website: "https://aave.com"
x: "https://x.com/aave"
github: ["https://github.com/aave-dao/aave-v3-origin"]
defillama_slug: ["aave-v3"]
chain: "Ethereum"
stage: 0
risks: ["L", "H", "H", "H", "L"]
reasons: []
author: ["sagaciousyves"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Aave V3 allows users to lend and borrow Erc20 tokens and earn yield for lending. Aave V3 also created its own stablecoin called GHO.

On Ethereum Mainnet 3 markets exist mainnet, Lido and EtherFi. Markets Prime (Lido) and EtherFi exist to allow efficient parameters for borrow and lending while containerize the risk associated with leveraged staked ETH. This report focuses on the Mainnet market (V3).

# Overview

## Chain

The report is concerned with the Aave V3 deployment on Ethereum mainnet.

> Chain score: low

## Upgradeability

Aave V3 allows for the upgrade of contracts. Those upgrades can change the logic and implementation of the markets, the reserves, the governance and the smart contract infrastructure around them. The upgrades could result in the loss of funds or the loss of unclaimed yield of users.

The permission to upgrade the protocol is controlled by an on-chain governance (DAO) with `AAVE`, `aAAVE` or `stkAAVE` token holders submitting and voting on DAO proposals. A multisig account, the `Aave V3 Governance Guardian` has the permission to cancel proposals to mitigate the risk of malicious or otherwise unintended proposals. The Governance Guardian can potentially be abused to censor proposals.

Furthermore, another multisig account, the `EmergencyAdmin`, has the permission to pause markets, temporarily disabling and withdrawing assets, if suspicious activity is detected. This role can potentially be abused to freeze funds and unclaimed yield in the protocol.

### Stewards

The Aave system makes use of a concept called steward contract. These steward contracts sit between the contract with upgradeable parameters and a multisig. The steward enforces rate limiting and maximal changes to the current parameter value in absolute or in relative terms. This allows to reduce trust assumptions to the empowered councils and increases the adaptability to changing market environments. Stewards that are part of Aave V3 are:

- `FreezingSteward`
- `CapsPlusRiskSteward`
- `ManualAGRS`
- `SvrOracleSteward`
- `GhoAaveSteward`
- `GhoGsmSteward`
- `GhoBucketSteward`
- `GhoCCIPSteward`
- `ClinicSteward`
- `GranularGuardianAccessControl`

Learn more about the stewards in the permission table.

> Upgradeability score: high

## Autonomy

### Oracle and Prices

The Aave V3 protocol relies on Chainlink oracle feeds to price collateral and borrowed assets in the system. The protocol does not validate asset prices (apart from checking that they are above 0) returned by Chainlink. Aave V3 has the option to install a fallback oracle mechanism but is currently not used. The replacement of a stale or untrusted oracle feed requires a governance vote on level 1 (see Exit Window).

The Chainlink oracle system itself is upgradeable without decentralized ownership over those permissions. This dependency thus introduces centralization risk in the Aave V3 protocol.

### Cross-Chain Vote

Votes are currently held on Polygon by using a system called a.DI for cross-chain communication developed by the Aave Community (BGD Labs).

The a.DI does not rely on a single bridge provider to move messages across different networks, but uses a 2/3 threshold, sending the messages in parallel via different bridge providers, reducing the dependency on a single provider.

If the community cannot or does not want to use the a.DI or the other voting networks, then the community still can carry out the vote on Ethereum Mainnet. This would eliminate the cross-chain dependencies for voting.

The cross-chain voting system has low centralisation risk as because of its fault tolerant design, while the oracle system is currently unmitigated.

> Autonomy score: high

## Exit Window

Permissions, including protocol upgrades, are controlled by an onchain governance system.

There are two levels of permissions that can be executed by the DAO. Level 2 for permissions on the governance and AAVE token contract, and Level 1 for the remaining system.

AAVE holders (also stkAAVE, aAAVE) are able to create new proposals (requires 80,000 / 200,0000 votes for level 1 / level 2) and vote on proposals (at least 320,000 / 1,040,000 votes are required for a valid proposal and a voting differential (yes minus no) of 80,000 / 1,040,000 votes). The vote starts 1 day after the proposal was created.

The voting period is 10 days for Level 2, and 3 days for Level 1.

The two levels have different time locks before the proposal is executed after a vote has passed. 7 days for Level 2 and 1 day for Level 1 executed permissions.

While Level 1 and Level 2 do not meet the 30-day exit window requirement, Level 2 meets the 7-day exit window requirement, but high impact upgradeability permissions of Level 1 are not protected by a 7-day exit window.

However, malicious or unintended proposals can be intercepted by the Aave Governance V3 Guardian multisig account, which satisfies the Security Council requirements.

> Exit Window score: high

## Accessibility

The frontend of Aave V3 app is open source. Each commit (ie each change to the code base) is published to IPFS (https://github.com/aave/interface/releases).

In addition to that Aave is also available through [DeFi Saver](https://app.defisaver.com/aave).

https://aave.com/help/aave-101/accessing-aave

> Accessibility score: low

## Conclusion

The Aave-v3 Ethereum mainnet protocol achieves High centralization risk scores for its Upgradeability, Autonomy and Exit Window dimensions. It thus ranks **Stage 0**.

The project mitigates the Exit Window risk by having a Governance Guardian that suffices the Security Council setup.

The protocol could reach **Stage 1** by implementing fallback mechanism around the Chainlink oracle (or Chainlink adopting a Security Council setup for its own multisig account).

The project additionally could advance to **Stage 2** if the on-chain governance (DAO) used a 30-day exit window instead of only 7 days.
