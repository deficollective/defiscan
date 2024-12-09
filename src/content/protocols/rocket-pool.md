---
protocol: "Rocket Pool"
website: "https://rocketpool.net/"
x: "https://x.com/Rocket_Pool"
github: "https://github.com/rocket-pool"
defillama_slug: ["rocket-pool"]
chain: "Ethereum"
stage: 0
risks: ["H", "H", "H", "H", "H"]
author: ["flbouchut", "Sparadrap1101"]
submission_date: "2024-11-28"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Add a summary of the protocols. What is it? What does it do? etc.

# Overview

## Chain

See http://defiscan.info/learn-more#chain for more guidance.

Ethereum.

> Chain score: L

## Upgradeability

See http://defiscan.info/learn-more#upgradability for more guidance.

Rocket Pool contracts are designed and deployed with upgradability in mind, meaning none of the permissions on the contracts have been revoked.

The `RocketStorage` contract acts as the central state repository, storing both protocol data and the addresses of other contracts. When an upgrade is necessary, a new contract is deployed, and its address replaces the old reference in `RocketStorage`.

While governance mechanisms have been implemented to mitigate risks from malicious upgrades or parameter changes, certain aspects of control remain centralized. As such, we can find 4 different entities that have rights over different parts of the protocol:

1. **Oracle DAO (oDAO)**: The oracle DAO consists of selected Rocket Pool members whose incentives are closely aligned with Rocket Pool’s vision and who possess specific rights over protocol operations. These include:

    - On-chain responsibilities: Voting on and executing contract upgrades. Adjusting key protocol parameters.
    - Off-chain duties: Automated actions related to routine Rocket Pool operations (constructing the rewards Merkle tree at the end of each rewards period and uploading it to IPFS, shuttling information from the Beacon Chain to the Execution Layer). These actions must be pushed on-chain periodically.

    oDAO members are incentivized through a share of RPL inflation and must bond 1750 RPL to cover potential malicious actions. oDAO members are the following ones:

    | Member          | Description           | Address |
    | --------------- | --------------------- | ------- |
    | Nimbus          | Consensus client team | xxx     |
    | TO BE COMPLETED | ---                   | ---     |

    The process for the oDAO to execute a proposal is the following:

    - A proposal is initiated on-chain by an oDAO member after discussions on the Rocket Pool forum.
    - A 7-day wait period on mainnet allows for further deliberation.
    - Members cast on-chain votes (yes/no).
    - A quorum is achieved with 51% approval from oDAO members, concluding the vote.
    - Once approved, any member can execute the change, updating the protocol’s core contracts.
    - As of now, 4 of the 9 quorum votes are controlled by the Rocket Pool team, which reduces decentralization.

    oDAO proposals and votes and can be observed at this [address](https://etherscan.io/address/0xb0ec3F657ef43A615aB480FA8D5A53BF2c2f05d5).

2. **Protocol DAO (pDAO)**: Unlike the oDAO, the pDAO is opened to all Rocket Pool node operators that run a minipool and works through RPL token-based governance. Node operators can vote directly or delegate their votes to other node operators using Smart Node software.

    The pDAO uses an optimistic fraud proof system with on-chain dispute challenges, allowing members to:

    - Propose and vote on parameter adjustements.
    - Allocate treasury funds.

    Parameters controlled by the pDAO are listed in [RPIP-33](https://rpips.rocketpool.net/RPIPs/RPIP-33#parameter-table), influencing various contracts of the protocol (RPL inflation settings, ETH deposit settings, minipool settings, security settings, etc.).

    Enforcing on-chain pDAO governance has been activated in November 2024, with no mainnet history aside from testing on Holesky.

    // TO DO - Add some notes about quorum

    // TO DO - Add some notes about the veto actions

3. **pDAO guardian**: The pDAO guardian can change pDAO parameters without a vote and without delay. It is an EOA wallet controlled by the Rocket Pool team. This role is intended to transition to a security council for enhanced decentralization. The pDAO guardian is this [address](https://etherscan.io/address/0x0cCF14983364A7735d369879603930Afe10df21e).

4. **Security council**: Introduced alongside on-chain pDAO governance, the security council acts as a safeguard with expedited authority to change a limited set of critical parameters. As of now, the Rocket Pool team, via the pDAO guardian, is the sole member. Future iterations aim to diversify this council.

This analysis highlights that while the RP’s governance incorporates multiple entities and decentralized mechanisms **through a complex governance scheme**, significant aspects of the protocol’s control remain **predominantly centralized under the Rocket Pool team**.

> Upgradeability score: H

## Autonomy

See http://defiscan.info/learn-more#autonomy for more guidance.

The Rocket Pool protocol doesn’t rely on external dependencies but rather on **internal ones**, particularly the oracle DAO members, who hold significant rights over key protocol parameters. While these roles are integral to the protocol’s operations, they also present potential vulnerabilities, as malicious actions or misconfigurations could have severe consequences for the protocol. The oDAO members are specified in the governance section above.

Such an incident already happened in the past where two oDAO nodes controlled by the RocketPool team were [compromised](https://dao.rocketpool.net/t/post-mortem-security-incident-26-05/701). While the incident resulted in the theft of ETH and RPL from the affected nodes, it caused no harm to the protocol itself.

Below are key rights held by the oDAO and the potential risks they pose:

-   Manipulating the rETH/ETH exchange rate. Malicious changes to this rate could enable an attacker to withdraw ETH from the deposit pool or the rETH contract at no cost. A safeguard is planned to be implemented in the Saturn 1 upgrade ([RPIP-61](https://rpips.rocketpool.net/RPIPs/RPIP-61)), though no ETA has been provided.
-   Applying penalties to node operators. The oDAO can penalize node operators for not setting the correct recipient address for MEV rewards, as defined by Rocket Pool. A malicious oDAO could exploit this mechanism to penalize all minipools for their entire stake. All the ETH in the protocol would be redirected to rETH, where an attacker would be able to extract it as explained above. A safeguard is planned to be implemented in the Saturn 1 upgrade ([RPIP-58](https://rpips.rocketpool.net/RPIPs/RPIP-58)), though no ETA has been provided.
-   Publishing the Merkle tree for protocol rewards. The oDAO is responsible for publishing the rewards Merkle tree for each period (28 days). A malicious oDAO could extract all rewards from a single period.
-   Publishing the split of RPL inflation. A malicious oDAO could extract all RPL token issued for a single period (28 days) in publishing a flawed distribution Merkle tree.

> Autonomy score: M

## Exit Window

See http://defiscan.info/learn-more#exit-window for more guidance.

Exit windows have been established for both the pDAO and oDAO.

For the pDAO, the governance process involves several phases:

-   Challenge period: Once a proposal is created, there is a 7-day challenge period during which the proposal can be contested if it does not include the correct Merkle tree for the snapshotting of voting power.
-   Voting phases: Following the challenge period, there are two voting phases, each lasting 7 days.

In total, a proposal raised by a pDAO member can only be executed on-chain after 21 days from its initial submission.

For the oDAO:

-   Once a proposal is submitted on-chain, there is a 7-day deliberation period before voting begins.
-   After the deliberation period, oDAO members vote, and once the quorum is met, the proposal can be executed on-chain instantly.

It is important to note that the current governance setup includes the pDAO guardian, which is controlled by the team and has the authority to bypass all delays for pDAO proposals. However, no such override exists for oDAO proposals (includes smart contract upgrades).

Additional considerations are the time required to unstake assets for node operators. Unstaking RPL from a minipool currently takes 28 days, while unstaking ETH from a validator depends on the network’s validator exit queue. Additionally, users wishing to swap rETH for ETH natively within Rocket Pool are constrained by the available balance in the `RocketDepositPool` contract (available by calling this [method](https://etherscan.io/address/0xdd3f50f8a6cafbe9b31a427582963f465e745af8#readContract#F1)). As ETH is allocated to minipools, users that are not node operators cannot directly exchange rETH for ETH at the protocol’s native rate and must instead rely on liquidity pools from secondary markets.

> Exit window score: H

> Could be elevated to higher tier once the pDAO guardian is sunset and replaced by the security council.

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

# Technical Analysis

## Contracts

| Contract Name | Address |
| ------------- | ------- |
| contract 1    | 0x123   |
| contract 2    | 0x456   |

## Permission owners

| Name | Account                                       | Type         |
| ---- | --------------------------------------------- | ------------ |
| name | [address](https://etherscan.io/address/0x...) | Multisig x/y |

## Permissions

| Contract      | Function     | Impact      | Owner                   |
| ------------- | ------------ | ----------- | ----------------------- |
| contract name | functionname | description | owner of the permission |

## Dependencies

No external dependency has been found 🎉

## Exit Window

insert text

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-team signers                           |
| ❌     | Signers are publicly announced (with name or pseudonym) |
