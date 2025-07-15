---
title: "DeFiScan: Updates to the methodology (03/2025)"
description: "We discuss updates and clarifications on the DeFiScan methodology."
date: 2025-03-12T12:00:00Z
published: true
categories: ["Policy"]
authors: ["nilsbundi"]
tags: ["DeFi Maturity", "Decentralization"]
---

With the next batch of DeFi protocols reviewed, including Aave, Compound, Uniswap and more, we have identified a number of areas in the DeFiScan methodology that require clarifications and/or improvments.

In this post we discuss the following updates:
- **Autonomy risk scores to account for decentralization of protocol dependencies**
- **Security Council to mitigate insufficient Exit Windows in onchain governance**
- **Security Council requirements to shift from "non-team" to "non-insider" rule**

These updates are implemented in the DeFiScan methodology immediately and applied to current and future reviews.

## Autonomy risk scores

The Autonomy dimension captures risks from centralization in protocol dependencies. Such dependencies include oracle price feeds in lending protocols, the collateral asset in a CDP, and any other third-party infrastructure that a DeFi protocol is integrated with.

In this update we have revised the centralization risk scores associated with a protocol dependency to reflect **the risk of failure of a protocol dependency due to centralization in the dependency itself**. 
The updated Autonomy risk scoring methodology thus builds on the existing assessment of the severity of a dependency failure:

- High severity: a failure of the dependency may result in the theft or loss of user funds
- Medium severity: a failure of the dependency may result in the theft or loss of unclaimed yield or may otherwise materially change the expected protocol performance
- Low severity: No dependencies or a failure cannot materially change the expected protocol performance

The methodology then continues to assess centralization of the dependency itself:

- Highly centralized: Stage 0, or equivalent, dependency
- Moderately centralized: Stage 1, or equivalent, dependency
- Decentralized: Stage 2, or equivalent, dependency

*Note that the dependency itself may not necessarily be a DeFi protocol with an associated Stage score. In this case, centralization of the dependency is assessed based on equivalent criteria where possible.*

These two scores, the severity of a dependency failure and the centralization of the dependency itself, are then combined into an Autonomy risk score according to the table below. Thereby, the risk from dependencies associated with a high severity of a potential failure can be mitigated by decentralizing control in the dependency. Thus, a DeFi protocol may improve its Autonomy score by carefully selecting dependencies that are decentralized. 

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

As an example, consider a lending protocol that relies on an external oracle price feed. If this feed fails, e.g. by pushing an asset price of 0 due to an operational error or the oracle system being comprimised by malicious actors, user funds may be lost or frozen thus earning the lending protocol a "High" severity score. The lending protocol has two options to improve its Autonomy score:
1. Implement price validation rules and fallback mechanisms in case of an "invalid" price pushed by the oracle feed
2. Integrate with "sufficiently" decentralized oracle systems to ensure respective risks are mitigated

Similar to the Upgradeability risk dimension, here centralization of the dependency refers to the ability to individuals or groups of individuals to control critical permissions. For the oracle system in the example, this can mean that asset prices are determined by a single party or a single party, or group of parties, controlling contract upgrades. 

Hence, DeFi protocols effectively inherit centralization risks of their dependencies. This concept is very similar to how DeFiScan already translates centralization risks exhibited by the underlying chain.

## Role of Security Council in onchain governance

The Security Council is used as an acceptable measure to mitigate Upgradeability risks and enable a DeFi protocol to reach Stage 1 decentralization.

So far, the framework allowed a DeFi protocol with "High" Upgradeability risk score, earned due to the existence of permissioned functions with a potential impact of *theft or loss of user funds*, to achieve Stage 1 decentralization if control over these permissions was transferred to a Security Council. Thereby, the requirement to protect ciritical control in the DeFi protocol with an Exit Window was effectively overruled by the existence of the Security Council.

With this update, we expand the role of the Security Council to also offer mitigation to the risk of an insufficient Exit Window in an onchain governance system. Specifically, if permissions resulting in a "High" Upgradeability risk score are controlled by an onchain governance system with an Exit Window of less then 7 days, then a **Security Council must have the ability to veto proposals** for the DeFi protocol to reach Stage 1.

As a result of this update, the Stage 1 requirements change to:
- '✅ At least a "Medium" risk score for Chain, Autonomy, Accessibility'
- '✅ IF Exit Window receives "High" risk, THEN a Security Council must be in place with ownership of or veto over permissions'

This setup offers similar protections to users than if permissions were controlled by the Security Council. At the same time, it allows DeFi protocols to already initiate steps towards fully handing over control to onchain governance and Stage 2 decentralization.

## Security Council requirements

The objective of the Security Council requirements is to establish a robust, intermediate, governance structure over (critical) protocol permissions. As part of these requirements we have outlined a rule where at least 50% of the signers need to be "non-team" members. Combined with the 51% signer threshold, this results in an update of the protocol to be confirmed by at least 1 "non-team" signer. The objective of this rule is to enforce an outside perspective on each protocol update and reduce the risk of "the team" to push an unintended or malicious update.

With this update, we now expand the requirements for a Security Council to include **at least 50% non-insider signers**. The shift from "non-team" to "non-insider" is motivated by a lack of clarity around the term "team" and a push to strengthen the integrity of a Security Council as an objective and robust intermediate governance unit. The latter is also informed by various discussions with DeFi teams and (recent) observations on governance practices.

The updated Security Council requirements thus are:
- At least 7 signers
- At least 51% threshold
- At least 50% non-insider signers
- Signers are publicly announced (with name or pseudonym)

Thereby, we define an "insider" as any party of the "inner circle" of individuals or entities developing, maintaining and operating the protocol, such as the "team members" or a company, and its employees, mandated to perform certain services. On the other hand, an "outsider" thus is any individual or company free of a direct conflict of interests.

## Affected DeFiScan reviews

No existing review is affected by this update.