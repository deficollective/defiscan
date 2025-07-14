---
title: "Make DeFi Decentralized (Again)"
description: "We discuss the challenges of defining decentralization in DeFi, explore the trade-offs when trying to achieve decentralization and propose steps to advance decentralization."
date: 2023-11-09T13:00:00Z
published: true
categories: ["Research"]
authors: ["nilsbundi"]
tags: ["Research", "Decentralization", "Policy"]
---

Decentralized Finance, or DeFi, has ushered in a profound transformation within the financial industry. It offers a way to enhance the conventional financial infrastructure with immutable programs that take the role of traditional intermediaries. The underlying objective of this movement is to **enhance inclusivity, transparency, and security of financial services** as these are delivered by open and predictable programs through a public infrastructure.

As the DeFi ecosystem experienced rapid growth in the past years, it has embraced concepts that foster scalability and agility in tailoring its services to user demands. This has effectively translated to introducing central control points within DeFi programs or the underlying settlement layer. This evolution has been accompanied by the innovation of governance structures designed to exert this control in a decentralized manner.

The total value locked (TVL) in DeFi programs stands at approximately $50 billion today, with an all-time high of about $200 billion in 2021, according to [Defillama](https://defillama.com/chart/chain/All?&include_borrowed_in_tvl=true&theme=dark). Notably, the majority of this TVL is overseen by some governance structure, sparking discussions about the actual degree of decentralization in the DeFi services industry. Indeed, multiple pseudo-decentralized DeFi services have suffered losses in the hundreds of millions of consumer funds due to exploits of vulnerabilities introduced by centralization. 

As a response, **policymakers and regulators around the globe increasingly engage with the DeFi services industry**, seeking to implement appropriate regulations to protect consumers from the risks exposed by DeFi services. Therefore, two critical questions have emerged. First, what entails decentralization in DeFi services? Secondly, how can the DeFi services industry respond to the risks inherent in the services offered and better protect consumers? 

This article delves into the first question and the challenges we encounter when trying to capture the concept of decentralization in DeFi programs and computer systems in general. While the question seems trivial at first, it turns out to be hard to answer as the concept of decentralization in (computer) systems is a complex one. We further explore the trade-offs faced when trying to achieve decentralization. Finally, we propose steps to establish DeFi services as a genuinely decentralized force, fostering a more inclusive, transparent, and secure financial ecosystem.

## Decentralization is a spectrum

Decentralization as a property can be found in many systems, including biology, economics, and, of course, computer science. Interestingly, it is hard to find a generally accepted definition of the property. Colloquially, decentralization characterizes a system that has no single point of failure. Or, in other words, a system design where no single agent or component has a monopoly over a (critical) system function. A simple model that is sometimes drawn is that a decentralized system can be split into two parts, and both parts continue to function independently. This is an effective but, of course, informal definition that fails to account for the **different layers of decentralization**. Vitalik Buterin attempts a more comprehensive characterization of decentralized (computer) systems in this [article](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274). Buterin outlines three dimensions along which computer systems exhibit characteristics of decentralization: 
- **Architectural (de)centralization** or the number of physical computers a system is made of and the fault tolerance the system has
- **Political (de)centralization** or the number of individuals (or groups of individuals) needed to exercise control over the computers that make up the system
- **Logical (de)centralization** or whether the system's interface and data structures are a single, monolithic unit or function as individual, independent units

![Dimensions of decentralization](https://miro.medium.com/v2/resize:fit:720/format:webp/1*U2UuIGNa-RQZFSBFWDN3ew.png "Dimensions of decentralization according to Vitalik Buterin" )

*Figure 1: Dimensions of decentralization in computer systems. Source: [Buterin](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274)*

Buterin's characterization points to the realization that decentralization is not a binary property, but (computer) systems have to be classified on a decentralization spectrum. On the far left, we find fully centralized systems such as traditional corporations or a centralized database. On the contrary, the far right of the spectrum is characterized by fully decentralized systems like BitTorrent or the English language. In between, there is a wide range of system characteristics that exhibit features of partial decentralization.

In a more rigorous [analysis](https://www.scitepress.org/Link.aspx?doi=10.5220/0009892405050512), Harry Halpin explains the decentralization spectrum in terms of *centralized*, *federated*, and *decentralized* architectures. While proposing this discrete scale for the spectrum, Halpin also acknowledges a degree of ambiguity around these terms when it comes to mapping them to real-world computer systems.

Given the ambiguity around the characteristics of decentralized systems in general, it does not come as a surprise that **no clear definition for decentralization in DeFi systems has emerged** so far. At the same time, the degree of centralization of DeFi systems has increasingly gained attention recently. On the one hand, this can be explained by significant losses of consumer funds following exploits of vulnerabilities in DeFi systems and the resulting uncertainty around their security. On the other hand, policymakers and regulators have increasingly taken an interest in the subject, resulting in new regulations that, once implemented, demand clarification of the concepts.

{{< notice "note" >}} We will not be able to define decentralization in DeFi systems in this article. Still, we can draw some conclusions from the discussion that may help develop a definition in the future:

- **Decentralization is a spectrum**: decentralization is not a binary property but comes in different shapes
- **Decentralization is multi-dimensional**: decentralization is characterized along different dimensions of a (computer) system
- **Decentralization is dynamic**: decentralization is not a static property, but systems rather change their characteristics, including their decentralization properties, over time 
{{< /notice >}} 

## Decentralization has a price

Decentralization is hard. As a DeFi project, as the DeFi industry, we have to be aware of the price we pay to achieve decentralization. In general, a tradeoff exists between decentralization and other desired properties of a system. For instance, the [Scalability Trilemma](https://vitalik.ca/general/2021/04/07/sharding.html) argues that a blockchain system has three desired properties, *Scalability*, *Security*, and *Decentralization*, but can only ever achieve two of these simultaneously. In other words, blockchain systems pay a price for being decentralized: Either the system is decentralized and secure, but it will not be scalable. Or the system is decentralized and scalable, but it cannot be secure at the same time.

![Scalability Trilemma](https://vitalik.ca/images/sharding-files/trilemma.png "Scalability Trilemma according to Vitalik Buterin" )

*Figure 2: Trilemma faced by Blockchain Systems. Source: [Buterin](https://vitalik.ca/general/2021/04/07/sharding.html)*

Similarly, the [Stablecoin Trilemma](https://static1.squarespace.com/static/564100e0e4b08c9445a5fc5d/t/5c71e43ef9619ae6c83c30af/1550967911994/The+State+of+Stablecoins+2019_Report+2_20_19.pdf) says that stablecoins, one of the main DeFi applications in terms of TVL, face a tradeoff as they attempt to achieve the desired properties of *Stability*, *Efficiency* and *Decentralization* (in the original paper linked above the properties were described with the terms *Collateralization*, *Capital Efficiency* and *Decentralization*). The trilemma argues that a stablecoin can only achieve two of these three properties simultaneously. Thus, stablecoin systems pay a price for achieving decentralization, which is that they either are unstable because the stablecoin chooses to be decentralized and efficient, or they are inefficient if the system optimizes for being decentralized and stable.

![Stablecoin Trilemma](https://cepr.org/sites/default/files/styles/flexible_wysiwyg/public/image/FromMay2014/ganesh13mayfig1.png?itok=i6kVoVMH "Stablecoin Trilemma according to Viswanath-Natraj and Amit Chaudhary")

*Figure 3: Trilemma faced by Stablecoin Systems. Source: [Viswanath-Natraj and Amit Chaudhary](https://cepr.org/voxeu/columns/algorithmic-stablecoins-and-devaluation-risk)*

 
We find similar trade-offs in other DeFi systems, such as staking services, oracle systems, lending markets, and exchanges. Fundamentally, **the choice for decentralization means to give up control over a system**. A (fully) decentralized system can thus never have a central point of control, no matter whether control is exercised by an individual or groups of individuals. The implication is that decentralized systems must implement autonomous mechanisms to respond to all sorts of (adverse) activity. This requires more careful design, planning, and implementation, resulting in higher engineering costs and longer go-to-market times. Decentralized systems also often suffer from certain unattractive features, such as higher transaction costs and slower finality - like DeFi services running on a decentralized and secure (but not scalable) blockchain compared to services that run on a secure and scalable (but not decentralized) blockchain.

## Advancing decentralization

The DeFi industry has a considerable journey ahead to evolve into an inclusive, transparent, and secure public infrastructure that forms the backbone of financial services, allowing FinTechs to build new financial products on top that cater to a broader consumer base. A key challenge lies in our understanding of DeFi's foundational principle, that is decentralization. 

Without a clear and widely accepted framework for this crucial foundation, the DeFi industry lacks its guiding principles and an effective communication tool for policymakers, regulators and the broader public to appreciate the distinct characteristics decentralization has to offer for an inclusive, transparent and secure financial infrastructure. On a positive note, recent regulations such as [MiCA](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica) in Europe in fact recognizes the different role of (truly) decentralized financial services and proposes a differentiated approach to regulation. Credit is also due to advocacy groups like the [European Crypto Initiative](https://eu.ci) and [Coin Center](https://www.coincenter.org), which have played a pivotal role in communicating DeFi's informal decentralization principles to policymakers.

With this recogniton, the need for clarity becomes even more prevalent as the clarity offered by these new regulations critically depends on an appropriate implementation of the decentralization principle in the first hand. Whether it is to harness the benefits or to ensure compliance with specific regulations, furthering our understanding of decentralization is of paramount importance for the prosperity of our industry.

{{< notice "info" >}} To advance the decentralization of finance, the DeFi Collective has taken the initiative to develop decentralization principles. We have identified three main objectives such principles should have

- **Development guidelines**: support DeFi architects and developers in making educated design decisions
- **Transparency framework**: provide a framework to assess and make transparent centralization vectors in DeFi services 
- **Communication tool**: enable the DeFi industry and its advocates to more effectively communicate to its stakeholders
{{< /notice >}} 

## Conclusion

Decentralized Finance has experienced a steep growth trajectory in its early years.  To continue this trajectory, the DeFi industry has to overcome several challenges. Most importantly, we need a clearer understanding of and guidelines around its core principle, decentralization. The DeFi Collective initiated work to fill this gap and lead the way for DeFi to become the inclusive, transparent, and secure public infrastructure it aspires to be.