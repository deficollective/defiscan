---
title: "DeFiScan: Verifiable insights into the maturity and risks of DeFi infrastructure"
description: "DeFiScan is a framework for the assessment and monitoring of the maturity and risks of DeFi infrastructure in a verifiable manner"
date: 2024-10-23T14:00:00Z
published: true
categories: ["Policy"]
authors: ["nilsbundi"]
tags: ["DeFi Maturity", "Decentralization"]
---

> 🚨The DeFiScan framework presented here has been updated on 2024-12-13 (read more [here](https://deficollective.org/blog/defiscan-update-methodology/)) and on 2025-03-12 (read more [here](https://deficollective.org/blog/defiscan-update-methodology-batch-2/)).

DeFiScan is a new framework formalizing the decentralization stages of DeFi protocols. It allows, for the first time, to assess and monitor the maturity and risks of DeFi technology in a verifiable manner. DeFiScan will foster transparency and make DeFi more secure for everyone.

These stages can be summarized as follows:

- **Stage 0 - Full Training Wheels**: This is the first stage where a DeFi protocol is effectively controlled by an operator. External dependencies are not secured with fallbacks and access can be restricted (censored) both on the chain and user interface level. Yet, its logic and performance can be inspected, monitored and validated by anyone giving it a foundation for the gradual decentralization.

- **Stage 1 - Limited Training Wheels**: In the second stage, critical permissions and dependencies are either revoked or replaced with more secure mechanisms such as a Security Council, an exit window of at least 7 days for users or appropriate fallbacks. Furthermore, the underlying chain cannot censor users' transactions and a backup user interface exists guaranteeing access to user funds.

- **Stage 2 - No Training Wheels**: The final stage is reached when permissions have been fully revoked or delegated to a transparent, on-chain governance system with ample time for users to exit in case of an unwanted protocol update. Remaining risks from external dependencies, the underlying chain and user interfaces have been eliminated. The protocol now operates fully autonomous.

- **Review - Stage Unclear**: The review of a protocol cannot be completed due to missing information or a change in conditions. As a result, the analysis is incomplete or inaccurate and the Stage unclear.

## Background

DeFi technology goes through a number of stages characterized by different degrees of decentralization. Upon deployment, DeFi protocols often expose critical risks from centralized permissions and dependencies. As the protocol matures, these risks are eliminated through the introduction of fallbacks, exit windows and other mechanisms. To date, however, these stages of progressing maturity have not been formalized resulting in a lack of transparency both for users and developers.

The framework presented here, DeFiScan, is inspired by three main streams of previous work:

First, our analysis is based on the characterization of DeFi systems in terms of different technological layers and the centralization risks found on those layers as discussed e.g. in [Buterin](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274), [Halpin](https://www.scitepress.org/Link.aspx?doi=10.5220/0009892405050512), and [Schuler et al](https://academic.oup.com/jfr/article/10/2/213/7606986).

Second, the formalization of centralization risk events is inspired by the risk classification systems found across the auditing industry. In particular, our Centralization Risk Scoring is informed by Immunefi's [Vulnerability Severity Classification System](https://immunefi.com/immunefi-vulnerability-severity-classification-system-v2-3).

Finally, L2Beat's work on L2 Rollup maturity and the [Stages Framework](https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe) which emphasizes the evolving nature of decentralization in maturing L2 technologies. Today, L2Beat is the accepted standard for measuring the maturity of L2s and monitoring the related risks. The framework presented here is heavily inspired by L2Beat's Stages Framework. In particular, we adopt the three decentralization stages and propose five dimensions of centralization risks which reflect the nuances of all types of DeFi protocols.

## DeFi Centralization Risks

A broad range of DeFi technologies exists covering all major financial verticals including exchanges, lending & borrowing and derivatives. All these technologies can be characterized by the same layers and the respective centralization risks. We classify these centralization risks in five fundamental dimensions and assign each a risk score on the scale of "High", "Medium" and "Low" risk. These risk scores then ultimately imply the stage of decentralization and the maturity of a DeFi protocol.

### Chain

This concerns the chain (L1, L2) on which a DeFi protocol is deployed. The rationale for starting the analysis with the chain is that the related centralization risks directly propagate to the DeFi protocol and its users. For instance, the ability to censor users' transactions on a given chain translates to all DeFi protocols deployed on the chain and their users. DeFi protocols have no means to mitigate this risk apart from carefully identifying a chain with the desired maturity before deployment.

The risk score for the Chain dimension is assigned as follows:

<table>
  <tr>
   <td>High
   </td>
   <td>Medium
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>L2Beat Stage 0
   </td>
   <td>L2Beat Stage 1
   </td>
   <td>Ethereum mainnet or a comparable L1, or 
<p>
L2Beat Stage 2
   </td>
  </tr>
</table>

### Upgradability

Upgradability refers to the ability of a permission owner to make changes to a DeFi protocol. Thereby, the permissioned updates are not limited to the strict notion of smart contract upgrades but cover all sorts of changes to the contracts and their parameters. Hence, more generally we speak of permissioned (update) functions that exist in a DeFi protocol and the respective permission owners who are in control of these functions.

As seen from various incidents in the past, the ability to update a DeFi protocol introduces critical risks including that of exploits, unintended side-effects or censorship. As is general practice in auditing firms, these risks can be classified based on their severity: "Critical", if it can result in the direct theft or loss (aka permanent freezing) of user funds. "High", if it can result in the theft or loss of unclaimed yield. "Medium" and "Low" if it can cause interruptions but does not materially change the expected performance of the DeFi protocol. The risks associated with permissioned functions across all sorts of DeFi protocols can be classified in this same way.

Over the lifecycle of DeFi protocols, the control over such permissioned functions is revoked in stages in order to mitigate the associated risks. In the final stage, control over critical permissions is either fully revoked or transferred to an on-chain governance system and coupled with an exit window. As a result, the expected performance of the DeFi system cannot be altered anymore eliminating the associated risks and giving users maximal predictability.

The risk score for the Upgradability dimension is assigned as follows:

<table>
  <tr>
   <td>High
   </td>
   <td>Medium
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>Possible updates may result in the theft or loss of user funds
   </td>
   <td>Possible updates may result in the theft or loss of unclaimed yield or may otherwise materially change the system (but user funds remain unaffected)
   </td>
   <td>Possible updates do not materially change the system (or result in the theft or loss of user funds and unclaimed yield)
   </td>
  </tr>
</table>

### Autonomy

This addresses possible risks from external dependencies in a DeFi protocol and failures thereof. Prominent examples include stablecoins backed by fiat assets, which are held in custody by third parties, lending protocols making use of external price feeds, aka oracles, and aggregators integrating with external yield sources. The risk of failures of a DeFi protocol typically arise from missing sanity checks and fallback mechanisms.

The risk assessment thus focuses on the identification of external dependencies and the existence of mechanisms to prevent a DeFi protocols to fail in case of a dependency failure. Similar to the Upgradeability dimension, the classification of risks arising from dependencies can be based on the same severity assessment. While the nuances of different DeFi technologies play into the severity assessment, this risk classification system can again be applied across all sorts of technologies.

The risk score for the Autonomy dimension is assigned as follows:

<table>
  <tr>
   <td>High
   </td>
   <td>Medium
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>Dependencies may cause theft or loss of user funds AND exhibit Stage 0, or equivalent, centralization
   </td>
   <td>Dependencies may cause theft or loss of unclaimed yield, or may otherwise materially change the expected protocol performance, OR dependencies exhibit Stage 1, or equivalent, decentralization
   </td>
   <td>Dependencies (if any) cannot materially change the expected protocol performance, OR dependencies exhibit Stage 2, or equivalent, decentralization
   </td>
  </tr>
</table>

### Exit Window

An exit window allows users to withdraw assets before an unwanted update is implemented in a DeFi protocol. Exit windows are often implemented through _timelock_ contracts which enforce a certain time period between the queuing and execution of an update. During this period, users are able to withdraw their funds or otherwise adjust their position in a DeFi protocol prior to the execution of the update.

Exit windows thus are an important element of a robust governance process in a DeFi protocol. In particular, exit windows are an effective mechanism to mitigate the risks associated with permissioned functions often found in the early stages of a DeFi technology. Moreover, in the early stages these update functions are often coupled with less robust permission ownership setups, such as low threshold multisigs. In this setup, exit windows can significantly reduce the risks for users while allowing a DeFi team to implement a more robust governance process.

Thereby, the additional guarantees an Exit Window can give of course depends on the potential impact of the underlying permissions it protects. The analysis of the Exit Window and its risk scores is thus coupled with the scores achieved in the Upgradeability dimension by a protocol.

The risk score for the Exit Window dimension is assigned as follows:

<table>
  <tr>
   <td>High
   </td>
   <td>Medium
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>Upgradeability score is "High" AND permissions are NOT protected with an exit window or the exit window is less than 7 days
   </td>
   <td>Upgradeability score is "Medium" OR permissions are protected with an exit window of at least 7 days
   </td>
   <td>Upgradeability score is "Low" OR permissions are transferred to an on-chain governance process AND protected with an exit window of at least 30 days
   </td>
  </tr>
</table>

### Accessibility

User interfaces facilitate users' interactions with a DeFi protocol and are thus an important element of the DeFi stack. The inability to access the DeFi protocol or targeted access restrictions can result in the loss of user funds, e.g. through liquidations in a volatile market environment, or add cost to recover inaccessible funds. Hence, availability and diversity in user interfaces significantly reduces these risks. Similar to the other dimensions these risks are often accepted in the early stages of a DeFi technology and only mitigated as it matures. It is thus equally important to capture this element when assessing and monitoring the maturity of a DeFi protocol.

The risk score for the Accessibility dimension is assigned as follows:

<table>
  <tr>
   <td>High
   </td>
   <td>Medium
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>A single user interface exists without a backup solution
   </td>
   <td>A single user interface exists with public access to a backup solution such as a self-hosting app
   </td>
   <td>Multiple independent user interfaces exist, e.g. websites, in-wallet access, etc., guaranteeing access to user funds even if one interface is shutdown
   </td>
  </tr>
</table>

## DeFi Stages

The maturity of DeFi systems typically progresses in stages. Along these stages, control over permissioned functions is gradually revoked with the goal to eliminate the associated risks. Our DeFi Stages framework thus directly relates to the risk scores discussed above.

### Stage 0 - Full training wheels

This is the first stage of a DeFi protocol where basic requirements give the technology a decentralized foundation. Critical permissions are still controlled by centralized operators and external dependencies may expose critical risks to users. Yet, its logic and performance can be inspected, monitored and validated by anyone giving it a foundation for the gradual decentralization.

The following requirements qualify a DeFi protocol to enter Stage 0:

- ✅ Blockchain-based, financial technology
- ✅ Assets are not in custody by centralized entity
- ✅ Public documentation exists that outlines the protocol and its expected performance
- ✅ Source-available codebase
- ✅ Verified contracts

### Stage 1 - Limited training wheels

In the second stage, risks from critical permissions and dependencies are significantly reduced by: either revoking critical permissions, or establishing a _Security Council_ (see qualifying criteria below) to control such permissions, or enforcing an exit window of at least 7 days so users can withdraw funds in case of an unwanted protocol update. Critical risks from external dependencies are mitigated by the implementation of appropriate fallback mechanisms. Furthermore, the underlying chain cannot censor users' transactions and a backup user interface exists guaranteeing access to user funds.

The requirements to enter Stage 1 can be summarized as follows:

- '✅ At least a "Medium" risk score for Chain, Autonomy, Accessibility'
- '✅ IF Exit Window receives "High" risk, THEN a Security Council must be in place with ownership of or veto over permissions'

### Stage 2 - No training wheels

The final stage is reached when critical permissions have either been revoked or delegated to an on-chain governance system with ample time for users to exit in case of an unwanted protocol update. Risks from external dependencies have been further reduced such that users' funds and unclaimed yield remain unaffected by a failure. In addition, different independent user interfaces and a fully decentralized underlying chain guarantee access to users' funds at any time.

To enter Stage 2, a DeFi protocol has to satisfy the following requirements:

- ✅ At least "Low" risk score for Chain, Autonomy, Exit Window, Accessibility

### Others category

The stages framework considers a set of basic requirements to enter Stage 0 and qualify as a DeFi protocol. 

The *Others* protocol category captures "financial" protocols which are built using blockchain technology but which do not meet the Stage 0 requirements:

✅ Blockchain-based, financial technology
❌ Assets are not in custody by centralized entity
❌ Public documentation exists that outlines the protocol and its expected performance
❌ Source-available codebase
❌ Verified contracts

Protocols in the "Others" category thus either miss an adequate technological basis on which further decentralization is possible or their decentralization stage cannot be evaulated due to a lack of public information.

## Security Council

Delegating control over permissioned functions from the initial Operators to a Security Council, or on-chain governance system, is a critical step for a maturing DeFi system. The objective of this step is to eliminate the possibility of a group of insiders to abuse, willingly or forcibly, their control and introduce a more robust governance process around the use of permissioned functions. It is thus important to define the requirements for a setup to qualify as a Security Council.

Specifically, we propose an acceptable Security Council setup to consist of a multisig account with the following requirements on its signers:

- At least 7 signers
- At least 50% threshold
- At least 51% non-insider signers
- Signers are publicly announced (with name or pseudonym)

While the requirements defined here are opinionated, they have proven meaningful and practical. Similar setups are found across a number of matured DeFi systems and are, in fact, used by L2beat's requirement for Stage 1 rollups.

## What's Next

We have presented a framework, DeFiScan, for the formalization of the decentralization stages generally observed in DeFi technology. For the first time, we are able to assess and monitor the maturity and related risks in DeFi protocols in a verifiable manner. In the coming days, we will launch [https://defiscan.info](https://defiscan.info), a website providing information on the decentralization stage and risks for DeFi protocols. In the weeks to follow, we will launch different programs to boost coverage to 99% of the DeFi market and thereby foster more transparent and secure DeFi infrastructure.