---
title: "DeFiScan: Updates to the methodology"
description: "We discuss updates and clarifications on the DeFiScan methodology."
date: 2024-12-12T12:00:00Z
published: true
categories: ["Policy"]
authors: ["nilsbundi"]
tags: ["DeFi Maturity", "Decentralization"]
---


> 🚨Update (2024-12-27): We align the terminology on protocols not meeting (all of) the Stage 0 requirements with L2Beat's "Others" category that was recently [introduced](https://medium.com/l2beat/framework-update-l2-projects-recategorization-5d43b0d1fe50). All other changes in the methodology remain unaffected by this update.

In October we have introduced DeFiScan - a new framework and database for the analysis and monitoring of the maturity and risks of DeFi infrastructure in a verifiable manner.

Within the first weeks we have assessed and published reviews on various DeFi protocols on the DeFiScan [website](https://defiscan.info). While conducting the analyses, we identified a number of aspects that require clarification or improvement to adequately understand and reflect the maturity of a DeFi infrastructure.

In this post, we present these learnings and enhancements to the DeFiScan framework. Finally, we discuss how the updates affect the results for the existing protocol reviews.

## Failure to meet Stage 0 requirements

The Stage 0 requirements set some fundamental properties common to all DeFi protocols. The objective is to define the basic technological requirements based on which the maturity of DeFi protocols can be assessed. Any protocol not fulfilling these requirements A) is not considered a blockchain-based, "financial" application, B) lacks a "decentralized" basis, or C) cannot be assessed because important information is not publicly available.

We find two challenges with this:

1) In a number of cases, we found that protocols fail to meet a subset of the requirements simply because of an oversight or not being aware of the significance of it. As an example, we found reputed projects which are clearly built and operated following the outlined principles but e.g. missed verification of a smart contract. While the analysis cannot be completed in this case, the existing results can still add value to users.

2) The classification of non-DeFi protocols is implicit rather then explicit. Because DeFiScan only analyzes protocols that fulfill the Stage 0 requirements, users have no information on "Other" protocols and the reason why they fail the Stage 0 "test". Listing "Other" protocols and the requirements they fail to meet makes this classification explicit and adds further transparency.

**Updates to the methodology**

In order to address these challenges, we introduce a new protocol category, "Others", which is assigned to protocols meeting only a subset of the Stage 0 requirements:

* ✅ Blockchain-based, financial technology
* ❌ Assets are not in custody by centralized entity
* ❌ Public documentation exists that outlines the protocol and its expected performance
* ❌ Source-available codebase
* ❌ Verified contracts

In other words, protocols characterized as a "Blockchain-based, financial technology" but NOT meeting any of the other Stage 0 requirements are now categorized as "Others". Protocols in the "Others" category thus either miss an adequate technological basis on which further decentralization is possible or their decentralization stage cannot be evaulated due to a lack of public information.


## Defining the protocol scope

Often times DeFi protocols consist of different "components" representing different abstraction layers. It is commont to separate these into two main groups, the "core" and "peripheral" contracts. The core contracts implement the main state and business logic of the DeFi protocol while the peripheral contracts add additional functionality that simplifies users interactions and overall UX. 

We have thus engaged in many constructive conversations around which parts of a DeFi protocol are to be considered "in scope" for the analysis vs which are "out of scope". While we were not able to identify a "one-size-fits-all" answer to this question, we here provide a definition of the protocol scope that we found very usefull in most cases.

**Updates to the methodology**

The scope of a DeFi protocol relevant to analyze its stage of decentralization is defined as

*A set of smart contracts that:* 
- Is tightly integrated, or interacts through various cross-contract calls
- Forms a cohesive UX where all contracts combined effectively give access to the underlying financial service
- Is developed, maintained and marketed by the same team

This definition implies that the protocol scope does not only include the core contracts but also peripheral contracts if users effectively cannot access the protocol without these and if they are developed, maintained and marketed as part of the offering by the same team.

## Impact of missing Exit Window

An important dimension of the DeFiScan framework is the *Exit Window*. It ensures that protocol upgrades and parameter updates are delayed by a certain period within which users are able to safely withdraw funds or otherwise exit their positions in case of an unwanted change.

Currently, the framework applies scores in this category in isolation from the underlying changes, that can be made to the protocol and should be delayed by the Exit Window. That means, an Exit Window score of "High" risk is assigned irrespective of the potential impact of a protocol update. This can result in an unproportional overall risk score compared to the effective impact of existing protocol permissions. 

**Updates to the methodology**

Instead of assigning the Exit Window risk score in isolation, the methodology now couples the remaining risks, due to the existence or absence of an Exit Window, to the achieved Upgradeability score of a protocol. 

Specifically, the Exit Window risk score is applied as follows:

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

This means that the Exit Window score is based on the Upgradeability score and can improve the same if appropriate governance and update delay functions are implemented. Thereby, the Exit Window score reflects remaining risks relative to the potential impact of the underlying permissions.

## New DeFiScan results

Based on the changes to the DeFiScan framework, a number of protocol reviews and results are updated:

- Aerodrome: Exit Window score is now "Medium" (previously "High")
- Velodrome-v2: Exit Window score is now "Medium" (previously "High"), Stage is 1 (previously 0)
- Maverick-v2: Stage is now "Review" due an unverified contract (MaverickV2Factory)