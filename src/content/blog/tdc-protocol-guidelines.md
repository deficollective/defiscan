---
title: "Release of the DeFi Protocol Guidelines"
description: "The DeFi Protocol Guidelines provide a comprehensive framework for the characterization of Genuine DeFi systems and the identification of On-chain CeFi services."
date: 2024-04-17T00:00:00Z
published: true
categories: ["Policy"]
authors: ["nilsbundi"]
tags: ["Policy", "Decentralization", "Research"]
---

The DeFi Collective is committed to fostering the decentralization of financial infrastructure.

Understanding and identifying _Genuine DeFi_ systems has remained a challenge as discussed [here](/blog/make-defi-decentralized-again). I am happy to announce the release of our __DeFi Protocol Guidelines__, a comprehensive framework distinguishing between _Genuine DeFi_ systems and _On-chain CeFi_ services.

These guidelines are critical in shaping and implementing our internal policies, guiding protocols in ensuring adherence to the core principles of DeFi, and making DeFi more open, transparent and secure.

### What is Genuine DeFi

DeFi is a financial infrastructure that employs public blockchain and smart contract technology without centralized control. This is in contrast to traditional financial services, which rely on intermediaries to perform functions like asset custody, trade settlement, or debt origination, amongst others. In a Genuine DeFi system, financial transactions are facilitated through public platforms that anyone can access and use without restrictions or privileges. Protocols and software code, therefore, replace centralized counterparties to create a more open, robust, and transparent financial infrastructure. For users, this should result in a more accessible, reliable, and secure financial system.

But what criteria qualifies Genuine DeFi systems and how can they be distinguished from On-chain CeFi services? The DeFi Protocol Guidelines help answering this key question based on a methodological assessment of the characteristics of decentralized financial infrastructure.


### Methodology

Our methodology is based on two main concepts. First, DeFi systems comprise different technological layers on which centralization can occur. Second, centralization manifests in the ability of certain counterparties to exercise control in a financial technology. A few distinct centralization vectors can characterize this control. Understanding these two concepts is key to assessing Genuine DeFi systems (and On-chain CeFi services).


### Understanding DeFi Layers

DeFi technology includes several layers according to [Schär](https://doi.org/10.20955/r.103.153-74) and [Schuler et al](https://doi.org/10.1093/jfr/fjad014): 

- __Settlement__, or the blockchain
- __Asset__, or tokens
- __Protocol__, or smart contracts
- __Application__, or the frontend

These layers form a hierarchical structure of a DeFi system where each layer builds on the underlying one. Because of this hierarchical structure, centralization vectors found on one layer are inherited by all layers above it. For instance, a DeFi system using fully decentralized or immutable smart contracts is still susceptible to centralized control found on the Settlement layer.


### Understanding Centralization Vectors

Centralized control in DeFi systems is characterized in three distinct centralization vectors: 

- __Technology__, centralized control is generally embedded in the form of restricted or privileged access to certain functions in a DeFi system
- __Governance__, technical or factual control over discrete DeFi system updates by single or groups of counterparties, can be found in the governance process
- __Transparency__, information asymmetry enables counterparties with privileged access or advanced capabilities to factually exercise control in a DeFi system

Assessing these centralization vectors across the various technological layers is key in identifying centralized control and distinguishing Genuine DeFi from On-chain CeFi systems. 


### Systemic Dependencies

As mentioned, DeFi systems inherit the centralization vectors found in dependencies on the various, particularly lower, technological layers. Depending on the role of affected dependencies, the impact on a DeFi system varies. Systemic dependencies imply a "high-severity" impact, affecting the core functions of a DeFi system. On the other hand, non-systemic dependencies impact only "peripheral" or "isolated" functions. The underlying blockchain is an example of a systemic dependency, while the tokens in a specific Uniswap pool or another permissionless DEX represent a non-systemic dependency for the DEX protocol overall.


### Conclusion

The DeFi Collective's Protocol Guidelines mark a significant step toward clarifying and systematizing what constitutes a Genuine DeFi system. By setting clear standards and definitions, the DeFi Collective aims to guide the evolution of blockchain-based financial technology toward greater transparency, inclusivity, and decentralization. These guidelines serve as a benchmark for existing systems and as a blueprint for the future development of DeFi projects, ensuring that they align with the ultimate goal of full decentralization.

In the coming weeks, we will start to build up a public database reporting on the _decentralization status_ of DeFi systems. If you are interested in joining us on our mission to advance the decentralization of financial infrastructure or have feedback, please reach out on our [Discord](https://discord.gg/Z467Ehv6VU) or connect on [X](https://twitter.com/DeFiCollective_).