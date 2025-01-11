---
protocol: "Rocket Pool"
website: "https://rocketpool.net/"
x: "https://x.com/Rocket_Pool"
github: "https://github.com/rocket-pool"
defillama_slug: ["rocket-pool"]
chain: "Ethereum"
stage: 0
risks: ["L", "H", "H", "H", "M"]
author: ["flbouchut", "Sparadrap1101"]
submission_date: "2024-11-28"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Rocket Pool is a **decentralized Ethereum staking protocol** that allows users to stake their ETH and receive liquid staking tokens (rETH) in return. Additionally, the protocol enables **permissionless node operators** to participate in ETH staking with reduced ETH requirements (8ETH instead of 32) by pooling funds from stakers into minipools operated by the node operators.

# Overview

## Chain

Rocket Pool protocol is deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

Rocket Pool contracts are designed and deployed with upgradability in mind, meaning none of the permissions on the contracts have been revoked.

The `RocketStorage` contract acts as the central state repository, storing both protocol data and the addresses of other contracts. When an upgrade is necessary, a new contract is deployed, and its address replaces the old reference in `RocketStorage`.

While governance mechanisms have been implemented to mitigate risks from malicious upgrades or parameter changes, certain aspects of control remain centralized. As such, we can find 4 different entities that have rights over different parts of the protocol:

1. **Oracle DAO (oDAO)**: The oracle DAO is composed of **selected Rocket Pool members**, including Ethereum community contributors and teams such as Consensys, Nimbus, Lighthouse and Gitcoin, whose incentives are closely aligned with Rocket Pool's vision. These members possess specific rights over protocol operations, including:

    - _On-chain responsibilities_: **Voting on and executing contract upgrades**. Adjusting key protocol parameters.
    - _Off-chain duties_: Automated actions related to routine Rocket Pool operations (e.g., constructing the rewards Merkle tree at the end of each rewards period and uploading it to IPFS). These actions must be pushed on-chain periodically.

    oDAO members are incentivized through a share of RPL inflation and must bond 1750 RPL to cover potential malicious actions. oDAO members are listed [here](https://rocketscan.io/dao/members).

    The process for the oDAO to execute a proposal is the following:

    - A proposal is initiated on-chain by an oDAO member after discussions on the Rocket Pool forum.
    - A 7-day wait period on mainnet allows for further deliberation.
    - Members cast on-chain votes (yes/no).
    - A quorum is achieved with 51% approval from oDAO members, concluding the vote.
    - Once approved, any member can execute the change. However, if the proposal involves an upgrade to the protocol's core contracts, it must still be executed by the pDAO guardian (controlled by the team, see more below).

    As of now, 4 of the 9 quorum votes are controlled by the Rocket Pool team, which reduces decentralization. oDAO proposals and votes and can be observed at this [address](https://etherscan.io/address/0xb0ec3F657ef43A615aB480FA8D5A53BF2c2f05d5).

2. **Protocol DAO (pDAO)**: Unlike the oDAO, the pDAO is **opened to all Rocket Pool node operators** that run a minipool and works through RPL token-based governance. Node operators can vote directly or delegate their votes to other node operators using their Smart Node.

    The pDAO uses an optimistic fraud proof system with on-chain dispute challenges, allowing members to:

    - Propose and vote on parameter adjustments.
    - Allocate treasury funds.

    Parameters controlled by the pDAO are listed in [RPIP-33](https://rpips.rocketpool.net/RPIPs/RPIP-33#parameter-table), influencing various contracts of the protocol (RPL inflation settings, ETH deposit settings, minipool settings, security settings, etc.).

    Enforcing on-chain pDAO governance has been activated in **November 2024**, with no mainnet history aside from testing on Holesky. Currently, the quorum required for a pDAO proposal to pass is 30% of initialized voting power (those are node operators who have onboarded to the on-chain governance framework using a command line in their Smart Node).

3. **pDAO guardian**: The pDAO guardian can change pDAO parameters without a vote and without delay. It is an EOA wallet controlled by the Rocket Pool team. The pDAO guardian is this [address](https://etherscan.io/address/0x0cCF14983364A7735d369879603930Afe10df21e). This role is intended to be phased out in the future once the Security Council is established (see more below).

4. **Security Council**: Introduced alongside on-chain pDAO governance, the Security Council acts as a safeguard with expedited authority to change a limited set of parameters, essentially disabling features of the protocol to protect against loss of funds. As of now, the Rocket Pool team, via the pDAO guardian, is the sole member. Future iterations aim to diversify this council.

This analysis highlights that while the RP’s governance incorporates multiple entities and decentralized mechanisms **through a complex governance scheme**, significant aspects of the protocol’s control remain **predominantly centralized under the Rocket Pool team**.

> Upgradeability score: H

## Autonomy

See http://defiscan.info/learn-more#autonomy for more guidance.

The Rocket Pool protocol doesn’t rely on external dependencies but rather on **internal ones**, particularly the oracle DAO members, who hold significant rights over key protocol parameters. While these roles are integral to the protocol’s operations, they also present potential vulnerabilities, as malicious actions or misconfigurations could have severe consequences for the protocol. The oDAO members are specified in the governance section above.

Such an incident already happened in the past where two oDAO nodes controlled by the RocketPool team were [compromised](https://dao.rocketpool.net/t/post-mortem-security-incident-26-05/701). While the incident resulted in the theft of ETH and RPL from the affected nodes, it caused no harm to the protocol itself.

Below are **key rights held by the oDAO and the potential risks they pose**:

-   **Manipulating the rETH/ETH exchange rate**. Malicious changes to this rate could enable an attacker to withdraw ETH from the deposit pool or the rETH contract at no cost. A safeguard is planned to be implemented in the Saturn 1 upgrade ([RPIP-61](https://rpips.rocketpool.net/RPIPs/RPIP-61)), though no ETA has been provided.
-   **Applying penalties to node operators**. The oDAO can penalize node operators for not setting the correct recipient address for MEV rewards, as defined by Rocket Pool. A malicious oDAO could exploit this mechanism to penalize all minipools for their entire stake. All the ETH in the protocol would be redirected to rETH, where an attacker would be able to extract it as explained above. A safeguard is planned to be implemented in the Saturn 1 upgrade ([RPIP-58](https://rpips.rocketpool.net/RPIPs/RPIP-58)), though no ETA has been provided.
-   **Publishing the Merkle tree for protocol rewards**. The oDAO is responsible for publishing the rewards Merkle tree for each period (28 days). A malicious oDAO could extract all rewards from a single period.
-   **Publishing the split of RPL inflation**. A malicious oDAO could extract all RPL token issued for a single period (28 days) in publishing a flawed distribution Merkle tree.

> Autonomy score: H

## Exit Window

Exit windows have been established for both the pDAO and oDAO.

For the pDAO, the governance process involves several phases:

-   Challenge period: Once a proposal is created, there is a 7-day challenge period during which the proposal can be contested if it does not include the correct Merkle tree for the snapshotting of voting power.
-   Voting phases: Following the challenge period, there are two voting phases, each lasting 7 days.

In total, a proposal raised by a pDAO member can only be executed on-chain **after 21 days from its initial submission**.

For the oDAO:

-   Once a proposal is submitted on-chain, there is a **7-day deliberation period** before voting begins.
-   After the deliberation period, oDAO members vote, and once the quorum is met, the proposal can be **executed on-chain instantly**.

> It is important to note that the current governance setup includes the pDAO guardian, which is controlled by the team and has the **authority to bypass all delays for pDAO proposals**. However, no such override exists for oDAO proposals (includes smart contract upgrades).

Additional considerations are the time required to unstake assets for node operators. Unstaking RPL from a minipool is subject to a 28-day waiting period since the last staking or restaking action, while unstaking ETH from a validator depends on the network’s validator exit queue. Additionally, users wishing to swap rETH for ETH natively within Rocket Pool are limited by the excess deposit pool balance in the `RocketDepositPool` contract, as well as the rETH contract balance `RocketTokenRETH` (total available can be queried by calling this [method](https://etherscan.io/address/0xae78736Cd615f374D3085123A210448E74Fc6393#readContract#F8)). This limitation arises because ETH is allocated to minipools, leaving insufficient native liquidity for direct exchanges. As a result, non node-operators are unable to exchange rETH for ETH at the protocol's native rate and must rely on liquidity pools from secondary markets (small premium).

> Exit window score: H

> Could be elevated to higher tier once the pDAO guardian is sunset and replaced by the security council.

## Accessibility

Rocket Pool provides **a unique centralized user interface**. However, some DEXes have integrated RP's native contracts, enabling minting and redeeming directly from, their interfaces without relying on liquidity pools ([1inch](https://blog.1inch.io/1inch-optimizes-reth-swaps/), CoW Swap).

> Exit window score: M

# Technical Analysis

## Contracts

| Contract Name                         | Address                                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| RocketDepositPool                     | [0xDD3f50F8A6CafbE9b31a427582963f465E745AF8](https://etherscan.io/address/0xdd3f50f8a6cafbe9b31a427582963f465e745af8) |
| RocketStorage                         | [0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46](https://etherscan.io/address/0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46) |
| RocketTokenRPL                        | [0xD33526068D116cE69F19A9ee46F0bd304F21A51f](https://etherscan.io/address/0xD33526068D116cE69F19A9ee46F0bd304F21A51f) |
| RocketTokenRETH                       | [0xae78736Cd615f374D3085123A210448E74Fc6393](https://etherscan.io/address/0xae78736Cd615f374D3085123A210448E74Fc6393) |
| RocketClaimDAO                        | [0xFe6Db0ce3F61a4aE04c0A3E62F775a6f511C9aaC](https://etherscan.io/address/0xFe6Db0ce3F61a4aE04c0A3E62F775a6f511C9aaC) |
| RocketDAONodeTrusted                  | [0xb8e783882b11Ff4f6Cef3C501EA0f4b960152cc9](https://etherscan.io/address/0xb8e783882b11Ff4f6Cef3C501EA0f4b960152cc9) |
| RocketDAONodeTrustedActions           | [0x029d946F28F93399a5b0D09c879FC8c94E596AEb](https://etherscan.io/address/0x029d946F28F93399a5b0D09c879FC8c94E596AEb) |
| RocketDAONodeTrustedProposals         | [0xb0ec3F657ef43A615aB480FA8D5A53BF2c2f05d5](https://etherscan.io/address/0xb0ec3F657ef43A615aB480FA8D5A53BF2c2f05d5) |
| RocketDAONodeTrustedSettingsMembers   | [0xdA1AB39e62E0A5297AF44C7064E501b0613f0D01](https://etherscan.io/address/0xdA1AB39e62E0A5297AF44C7064E501b0613f0D01) |
| RocketDAONodeTrustedSettingsMinipool  | [0xE535fA45e12d748393C117C6D8EEBe1a7D124d95](https://etherscan.io/address/0xE535fA45e12d748393C117C6D8EEBe1a7D124d95) |
| RocketDAONodeTrustedSettingsProposals | [0xAD038f8994a6bd51C8A72D3721CEd83401D4d2b0](https://etherscan.io/address/0xAD038f8994a6bd51C8A72D3721CEd83401D4d2b0) |
| RocketDAONodeTrustedSettingsRewards   | [0x7322c24752f79c05FFD1E2a6FCB97020C1C264F1](https://etherscan.io/address/0x7322c24752f79c05FFD1E2a6FCB97020C1C264F1) |
| RocketDAONodeTrustedUpgrade           | [0x952999Ec97248547D810Fd6464fDb78855b022aB](https://etherscan.io/address/0x952999Ec97248547D810Fd6464fDb78855b022aB) |
| RocketDAOProposal                     | [0x1e94e6131Ba5B4F193d2A1067517136C52ddF102](https://etherscan.io/address/0x1e94e6131Ba5B4F193d2A1067517136C52ddF102) |
| RocketDAOProtocol                     | [0x1b714ed0ce30A8BeDC5b4253DaAa08c84CA5BFcb](https://etherscan.io/address/0x1b714ed0ce30A8BeDC5b4253DaAa08c84CA5BFcb) |
| RocketDAOProtocolActions              | [0xB50d513de40eE70A662c39207b4382a693f9e08D](https://etherscan.io/address/0xB50d513de40eE70A662c39207b4382a693f9e08D) |
| RocketDAOProtocolProposals            | [0x6D736da1dC2562DBeA9998385A0A27d8c2B2793e](https://etherscan.io/address/0x6D736da1dC2562DBeA9998385A0A27d8c2B2793e) |
| RocketDAOProtocolProposal             | [0x2D627A50Dc1C4EDa73E42858E8460b0eCF300b25](https://etherscan.io/address/0x2D627A50Dc1C4EDa73E42858E8460b0eCF300b25) |
| RocketDAOProtocolSettingsAuction      | [0x364F989A3C9a1F66cB51b9043680974eA08C0d18](https://etherscan.io/address/0x364F989A3C9a1F66cB51b9043680974eA08C0d18) |
| RocketDAOProtocolSettingsDeposit      | [0xD846AA34caEf083DC4797d75096F60b6E08B7418](https://etherscan.io/address/0xD846AA34caEf083DC4797d75096F60b6E08B7418) |
| RocketDAOProtocolSettingsInflation    | [0x1d4AAEaE7C8b75a8e5ab589a84516853DBDdd735](https://etherscan.io/address/0x1d4AAEaE7C8b75a8e5ab589a84516853DBDdd735) |
| RocketDAOProtocolSettingsMinipool     | [0xA416A7a07925d60F794E20532bc730749611A220](https://etherscan.io/address/0xA416A7a07925d60F794E20532bc730749611A220) |
| RocketDAOProtocolSettingsNetwork      | [0x89682e5F9bf69C909FC5E21a06495ac35E3671Ab](https://etherscan.io/address/0x89682e5F9bf69C909FC5E21a06495ac35E3671Ab) |
| RocketDAOProtocolSettingsNode         | [0x448DA008c7EB2501165c9Aa62DfFEeC4405bC660](https://etherscan.io/address/0x448DA008c7EB2501165c9Aa62DfFEeC4405bC660) |
| RocketDAOProtocolSettingsRewards      | [0x8857610Ba0A7caFD4dBE1120bfF03E9c74fc4124](https://etherscan.io/address/0x8857610Ba0A7caFD4dBE1120bfF03E9c74fc4124) |
| RocketNetworkBalances                 | [0x6Cc65bF618F55ce2433f9D8d827Fc44117D81399](https://etherscan.io/address/0x6Cc65bF618F55ce2433f9D8d827Fc44117D81399) |
| RocketNetworkPenalties                | [0x9294Fc6F03c64Cc217f5BE8697EA3Ed2De77e2F8](https://etherscan.io/address/0x9294Fc6F03c64Cc217f5BE8697EA3Ed2De77e2F8) |
| RocketNetworkPrices                   | [0x25E54Bf48369b8FB25bB79d3a3Ff7F3BA448E382](https://etherscan.io/address/0x25E54Bf48369b8FB25bB79d3a3Ff7F3BA448E382) |
| RocketRewardsPool                     | [0xEE4d2A71cF479e0D3d0c3c2C923dbfEB57E73111](https://etherscan.io/address/0xEE4d2A71cF479e0D3d0c3c2C923dbfEB57E73111) |
| RocketSmoothingPool                   | [0xd4E96eF8eee8678dBFf4d535E033Ed1a4F7605b7](https://etherscan.io/address/0xd4E96eF8eee8678dBFf4d535E033Ed1a4F7605b7) |
| RocketVault                           | [0x3bDC69C4E5e13E52A65f5583c23EFB9636b469d6](https://etherscan.io/address/0x3bDC69C4E5e13E52A65f5583c23EFB9636b469d6) |
| RocketNetworkVoting                   | [0x77cF0f32BDd06242465eb3318a81196194a13daA](https://etherscan.io/address/0x77cF0f32BDd06242465eb3318a81196194a13daA) |
| RocketDAOProtocolSettingsProposals    | [0x5f24E4a1A1f134a5a6952A9965721E6344898497](https://etherscan.io/address/0x5f24E4a1A1f134a5a6952A9965721E6344898497) |
| RocketDAOProtocolVerifier             | [0xd1f7e573cdC64FC0B201ca37aB50bC7Dd880040A](https://etherscan.io/address/0xd1f7e573cdC64FC0B201ca37aB50bC7Dd880040A) |
| RocketDAOSecurity                     | [0x84aE6D61Df5c6ba7196b5C76Bcb112B8a689aD37](https://etherscan.io/address/0x84aE6D61Df5c6ba7196b5C76Bcb112B8a689aD37) |
| RocketDAOSecurityActions              | [0xeaa442dF4Bb5394c66C8024eFb4979bEc89Eb59a](https://etherscan.io/address/0xeaa442dF4Bb5394c66C8024eFb4979bEc89Eb59a) |
| RocketDAOSecurityProposals            | [0x6004Fa90a27dB9971aDD200d1A3BB34444db9Fb7](https://etherscan.io/address/0x6004Fa90a27dB9971aDD200d1A3BB34444db9Fb7) |
| RocketDAOProtocolSettingsSecurity     | [0x1ec364CDD9697F56B8CB17a745B98C2b862CBE29](https://etherscan.io/address/0x1ec364CDD9697F56B8CB17a745B98C2b862CBE29) |
| RocketAuctionManager                  | [0x1a2F00D187C9388fDa3Bf2dc46a6b4740849EcCE](https://etherscan.io/address/0x1a2F00D187C9388fDa3Bf2dc46a6b4740849EcCE) |
| AddressQueueStorage                   | [0x44E31944E1A6F3b8F805E105B130F8bdb7E2EBd8](https://etherscan.io/address/0x44E31944E1A6F3b8F805E105B130F8bdb7E2EBd8) |
| AddressSetStorage                     | [0xD4ae2511dF21F367792bA4D67c6eb032171c6a16](https://etherscan.io/address/0xD4ae2511dF21F367792bA4D67c6eb032171c6a16) |
| RocketMerkleDistributorMainnet        | [0x5cE71E603B138F7e65029Cc1918C0566ed0dBD4B](https://etherscan.io/address/0x5cE71E603B138F7e65029Cc1918C0566ed0dBD4B) |
| RocketMinipoolBase                    | [0x560656C8947564363497E9C78A8BDEff8d3EFF33](https://etherscan.io/address/0x560656C8947564363497E9C78A8BDEff8d3EFF33) |
| RocketMinipoolBondReducer             | [0xf7aB34C74c02407ed653Ac9128731947187575C0](https://etherscan.io/address/0xf7aB34C74c02407ed653Ac9128731947187575C0) |
| RocketMinipoolDelegate                | [0x03d30466d199Ef540823fe2a22CAE2E3b9343bb0](https://etherscan.io/address/0x03d30466d199Ef540823fe2a22CAE2E3b9343bb0) |
| RocketMinipoolFactory                 | [0x7B8c48256CaF462670f84c7e849cab216922B8D3](https://etherscan.io/address/0x7B8c48256CaF462670f84c7e849cab216922B8D3) |
| RocketMinipoolManager                 | [0xF82991Bd8976c243eB3b7CDDc52AB0Fc8dc1246C](https://etherscan.io/address/0xF82991Bd8976c243eB3b7CDDc52AB0Fc8dc1246C) |
| RocketMinipoolPenalty                 | [0xE64AC47b6e2FEcfCDEA35147Fe61af9894A06ba6](https://etherscan.io/address/0xE64AC47b6e2FEcfCDEA35147Fe61af9894A06ba6) |
| RocketMinipoolQueue                   | [0x9e966733e3E9BFA56aF95f762921859417cF6FaA](https://etherscan.io/address/0x9e966733e3E9BFA56aF95f762921859417cF6FaA) |

> Please note that all Rocket Pool contracts, which can be found [here](https://docs.rocketpool.net/overview/contracts-integrations), were not included in the analysis as we focused only on contracts that impact protocol parameters, security and liquidity.

## Permission owners

| Name               | Account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Type                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| pDAO guardian      | [0x0cCF14983364A7735d369879603930Afe10df21e](https://etherscan.io/address/0x0cCF14983364A7735d369879603930Afe10df21e)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | EOA controlled by the team |
| Registered nodes   | All minipool contracts (for validators ran by node operators)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Minipool contract          |
| oDAO trusted nodes | All oDAO members. ([Nimbus](https://etherscan.io/address/0xb3a533098485bede3cb7fa8711af84fe0bb1e0ad), [Etherscan](https://etherscan.io/address/0xaf820bb236fde6f084641c74a4c62fa61d10b293), [Coinbase Ventures](https://etherscan.io/address/0x55bf89c8af56414f2114d48764a608019da17d2b), [Bankless](https://etherscan.io/address/0x2c6c5809a257ea74a2df6d20aee6119196d4bea0), [Blockchain Capital](https://etherscan.io/address/0xB13fA6Eff52e6Db8e9F0f1B60B744A9a9A01425A), [beaconcha.in](https://etherscan.io/address/0xd7f94c53691afb5a616c6af96e7075c1ffa1d8ee), [Superphiz](https://etherscan.io/address/0x751683968fd078341c48b90bc657d6babc2339f7), [Consensys](https://etherscan.io/address/0xdf590a63b91e8278a9102bee9aafd444f8a4b780), [Fire Eyes](https://etherscan.io/address/0x9c69e7fce961fd837f99c808ad75ed39a2c549cb), [Lightouse](https://etherscan.io/address/0xc5d291607600044348e5014404cc18394bd1d57d), [sassal.eth](https://etherscan.io/address/0x8fb569c14b372430f9af8b235940187b449d0dec), [Rocket Scientists](https://etherscan.io/address/0x9f56f3aeed0e79f0e7612119aca0bab15477cec6), [Gitcoin](https://etherscan.io/address/0x58fa2ca71c4a37f6b280fc55e04cc8effa68a18a), [RocketPool-1](https://etherscan.io/address/0x2354628919e1d53d2a69cf700cc53c4093977b94), [RocketPool-2](https://etherscan.io/address/0xccbff44e0f0329527feb0167bc8744d7d5aed3e9), [RocketPool-3](https://etherscan.io/address/0x16222268bb682aa34ce60c73f4527f30aca1b788), [RocketPool-t](https://etherscan.io/address/0x8d074ad69b55dd57da2708306f1c200ae1803359)) | Quorum is 9/17             |

## Permissions

| Contract                              | Function                  | Impact                                                                                                                                                                                                                                                                                                                                                  | Owner                             |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| RocketStorage                         | setGuardian               | This function allows setting a new address for the pDAO guardian. As the guardian has privileged rights on the protocol, a malicious guardian could modify security and business settings or trigger contract upgrades without delay.                                                                                                                   | pDAO guardian                     |
| RocketTokenRPL                        | inflationMintTokens       | This function allows new tokens to be minted according to the inflationary emission model. It is callable by anyone, however, the number of new tokens cannot be modified.                                                                                                                                                                              | Public                            |
| RocketDAONodeTrustedProposals         | proposalSettingUint       | This function is the only callable one that can modify the oDAO parameters managed by the contracts listed below. For more details on the associated risks, refer to the analysis of each contract starting with `RocketDAONodeTrustedSettings`.                                                                                                        | oDAO trusted nodes                |
| RocketDAONodeTrustedProposals         | proposalSettingBool       | This function is the only callable one that can enable / disable oDAO features managed by the contracts listed below. For more details on the associated risks, refer to the analysis of each contract starting with `RocketDAONodeTrustedSettings`.                                                                                                    | oDAO trusted nodes                |
| RocketDAONodeTrustedSettingsMembers   | setSettingUint            | Set integer parameters related to the management of Trusted Node members. For instance, this function can modify threshold that must be met for oDAO proposals, the bond needed to join the oDAO, or the challenge window for dispute resolution. If used maliciously, it could enable a takeover of the oDAO.                                          | oDAO trusted nodes                |
| RocketDAONodeTrustedSettingsMinipool  | setSettingBool            | Set boolean to enable/disable the scrub penalty. The scrub penalty penalizes node operators who set incorrect withdrawal credentials. If used maliciously, one could disable this penalty, preventing the protocol from penalizing malicious minipools and potentially enabling the theft of staked ETH.                                                | oDAO trusted nodes                |
| RocketDAONodeTrustedSettingsMinipool  | setSettingUint            | Set integer values for node operators' bond reduction and scrub period parameters. The scrub penalty penalizes node operators who set incorrect withdrawal credentials. If used maliciously, one could disable this penalty, preventing the protocol from penalizing malicious minipools and potentially enabling the theft of staked ETH.              | oDAO trusted nodes                |
| RocketDAONodeTrustedSettingsProposals | setSettingUint            | Set integer values for various time parameters related to oDAO proposals. For instance, this function can modify the delay required before a member can make sequential proposals or the duration for which a proposal can be voted on. If used maliciously, one could manipulate these settings to pass oDAO proposals more easily.                    | oDAO trusted nodes                |
| RocketDAONodeTrustedSettingsRewards   | setSettingBool            | Set boolean to enable/disable reward networks. If used maliciously, reward distribution could be halted.                                                                                                                                                                                                                                                | oDAO trusted nodes                |
| RocketDAOProtocolProposals            | proposalSettingUint       | This function is the only callable one that can modify the pDAO parameters managed by the contracts listed below. For more details on the associated risks, refer to the analysis of each contract starting with `RocketDAOProtocolSettings`.                                                                                                           | pDAO guardian OR Registered nodes |
| RocketDAOProtocolProposals            | proposalSettingBool       | This function is the only callable one that can enable / disable pDAO features managed by the contracts listed below. For more details on the associated risks, refer to the analysis of each contract starting with `RocketDAOProtocolSettings`.                                                                                                       | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsAuction      | setSettingBool            | Set booleans to enable/disable creation and bidding of liquidation auctions (slashed from node operators' stake). If used maliciously, liquidation auctions could be halted, though this would not prevent the slashing of a malicious node operator's stake.                                                                                           | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsAuction      | setSettingUint            | Set integers values for liquidation auctions parameters. If used maliciously, parameters such as the auction duration or the starting price could be modified, though this would not prevent the slashing of a malicious node operator's stake.                                                                                                         | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsDeposit      | setSettingBool            | Set booleans for enabling/disabling deposits of ETH into RocketPool vault against rETH. If used maliciously, deposit and assignment of ETH to minipools could be halted, though no assets would be at risk.                                                                                                                                             | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsDeposit      | setSettingUint            | Set integers values for user deposit parameters into RocketPool vault. For instance, this function can modify the minimum deposit amount or the deposit fee. There is a guardrail on the deposit fee, which is required to be less than 1%.                                                                                                             | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsInflation    | setSettingUint            | Set integers values for RPL inflation parameters. Inflation rate must be greater than or equal to 1 and less than 1% higher than the previous value, ensuring that the native RPL inflation rate cannot be highly manipulated through this function.                                                                                                    | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsMinipool     | setSettingBool            | Set booleans for enabling/disabling node operators to perform bond reduction (allowing the direct migration of old 16 ETH minipool to 8 ETH minipool). If used maliciously, bond reduction could be halted, though no assets would be at risk.                                                                                                          | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsMinipool     | setSettingUint            | Set integers values for minipool parameters. For instance, this functions allows the modification of the maximum number of minipools permitted by the protocol.                                                                                                                                                                                         | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsNetwork      | setSettingBool            | Set booleans to enable/disable the submission of balances, prices and rewards by oDAO members. If used maliciously, these submissions could be halted, preventing the protocol to be fully functional, though no assets would be at risk.                                                                                                               | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsNetwork      | setSettingUint            | Set integers values for several global parameters such as consensus threshold required for oDAO members to submit price and balance updates, the node operator minimum and maximum fees, the rETH collateral target, penalty rate, etc. There is a guardail for the fee taken from Rocket Pool node operators, which must be set between 5 and 20%.     | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsNode         | setSettingBool            | Set booleans to enable/disable the registration and deposit functions for node operators. If disabled, no new node operators could register with RocketPool.                                                                                                                                                                                            | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsNode         | setSettingUint            | Set integers values for the required RPL stake amount and voting power parameters. If used maliciously, one could set the required RPL ataking amount for receiving rewards to O, allowing rewards without bonding. This wouldn't affect protocol assets.                                                                                               | pDAO guardian OR Registered nodes |
| RocketDAOProtocolSettingsRewards      | setSettingRewardsClaimers | Set the proportion of RPL rewards among recipients. Currently, 1.5% of the rewards go to the oDAO trusted nodes set, 28.5% to the protocol DAO and 70% to the node operators. If used malicously, one could redirect all RPL rewards to an entity they controls.                                                                                        | pDAO guardian OR Registered nodes |
| RocketNetworkBalances                 | submitBalances            | This function allows oDAO members to submit on-chain data gathered off-chain, such as beacon chain validator details. It also updates RP network staked ETH balance, non staked ETH balance, and rETH total supply. If used maliciously, one could manipulate the rETH exchange rate and withdraw ETH from the liquidity pool at an extremely low cost. | oDAO trusted nodes                |
| RocketNetworkPenalties                | submitPenalty             | This function allows oDAO members to submit penalty for node operator non-compliance. If used maliciously, one could exploit this mechanism to penalize all minipools for their entire stake.                                                                                                                                                           | oDAO trusted nodes                |
| RocketNetworkPrices                   | submitPrices              | This function allows oDAO members to submit the RPL price on-chain. It is used to determine the minimum RPL bond required for new minipool creation and for RPL slashing. If used maliciously, one could create new minipools without providing RPL collateral, though no protocol assets would be at risk.                                             | oDAO trusted nodes                |
| RocketRewardsPool                     | submitRewardSnapshot      | This function enables oDAO members to submit on-chain data for RPL reward distribution, which they calculate off-chain. If used maliciously, one could redirect all RPL rewards for a single period (28 days) to an entity they control.                                                                                                                | oDAO trusted nodes                |
| RocketDAOProtocolSettingsProposals    | setSettingUint            | Set integers values for pDAO vote parameters. For instance, this function can modify the quorum required for a proposal to pass or the duration for which a proposal can be voted on. If used maliciously, one could manipulate these settings to pass pDAO proposals more easily.                                                                      | Registered nodes                  |
| RocketMerkleDistributorMainnet        | relayRewards              | This function is called by the `RocketRewardsPool` contract to include a snapshot of reward distribution within the distribution contract. If used maliciously, one could redirect all rewards (ETH and RPL) to an entity they control.                                                                                                                 | oDAO trusted nodes                |
| RocketMinipoolBondReducer             | voteCancelReduction       | This function can be called by trusted nodes to cancel a bond reduction if the validator's balance is too low. If used maliciously, one could cancel a bond reduction even if its not necessary. No assets are at risk.                                                                                                                                 | oDAO trusted nodes                |

## Dependencies

No external dependency has been found 🎉

## Exit Window

Exit windows have been established for both the pDAO and oDAO. However, the team, through the pDAO guardian, retains privileged access to bypass all delays and execute pDAO proposals direcly on-chain.

# Security Council

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-team signers                           |
| ❌     | Signers are publicly announced (with name or pseudonym) |

The implementation of a Security Council is currently under discussion in RP's governance, as outlined on this [page](https://dao.rocketpool.net/t/protocol-dao-security-council/3050/1). However, as of now, the Security Council consists solely of the pDAO guardian, an EOA controlled by the Rocket Pool team.
