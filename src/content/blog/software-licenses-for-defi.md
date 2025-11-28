---
title: "Software licenses for DeFi"
description: "This article dives into software licenses for DeFi projects, outlining the basics before looking at various software licenses - in particular the Business Source License (BSL) - and their use in DeFi"
date: 2024-08-15T11:00:00Z
published: true
categories: ["Research"]
authors: ["florianprantl"]
tags: ["Research", "Open-source", "Legal"]
---

In DeFi, we regularly observe clashes between ideals and realities; the topic of software licensing models for DeFi protocols being one of the latest and most prominent examples. In DeFi's early days, the consensus was to use fully open source licenses to align with DeFi's ideals of openness and transparency. However, DeFi staple protocols such as Uniswap or Aave have recently opted for more restrictive licenses. Others such as EigenLayer or Liquity are following suit.

This article dives into software licenses for DeFi projects, outlining the basics before looking at various software licenses - in particular the Business Source License (BSL) - and their use in DeFi.


## Copyright and software licensing


### What is copyright?

Copyright is a type of intellectual property right that protects creations of the human mind, unlike tangible assets like real estate or goods. In today's world, IP is omnipresent and often a company's IP value is much higher than the value of its tangible assets. Copyright is crucial for software companies as it grants protections and various rights to their software. It is created automatically without needing registration or formal procedures such as a trademark registration or patent filing. See [here ](https://www.lexr.com/en-ch/blog/intellectual-property-basics-entrepreneurs/)for more information about IP basics for entrepreneurs.

_Important: Copyright only protects the source code of the software. Copyright does not protect the underlying ideas and concepts of the work. Most traditional software companies therefore do not rely on copyrights, but keep the source code secret (closed source). _


### How do software licenses work?

Imagine the copyright as an imaginary bouquet of flowers, with each flower representing a different right associated with your protected work. For instance, there might be a rose for reproduction rights, a lily for distribution rights, a daisy for modification rights, and a tulip for commercialization rights, and so on. Collectively, these flowers form your complete copyright bouquet.

![alt_text](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/software-licenses-for-defi/flower-pepe.webp)


You have the flexibility to manage your bouquet in various ways. You can give away your bouquet (entirely or partially) and give up your right to use it (transferring your copyright) or simply give away duplicates of your flowers (licensing your copyright). You can also specify whether you want to give the same duplicate to multiple persons or just to one (_exclusivity of the license)_, how long they can keep the flower (_term of the license)_, where they can use it (_geographical scope of the license)_, and so on. This is essentially what software license agreements do.

 \
There are two common types of software licenses that you should know for now:



1. Proprietary software licenses: Under proprietary licenses, the software is typically not available in source code form. Licensees are granted limited rights to use the software, often with restrictions on copying, modifying, and redistributing it. Examples include Microsoft Windows and Adobe Photoshop. 
2. Free and open source software (FOSS) licenses: FOSS licenses go distinctively further; they allow you to copy, modify, and/or distribute the software, even for commercial use (hence provide more freedom). They are typically divided into permissive (MIT) and copyleft licenses (GPL). Copyleft mandates that you distribute derived works under the same license, ensuring the same freedoms down the road. Permissive licenses carry minimal restrictions, usually requiring only prominent attribution and retention of the copyright notice.


## Business source license (BSL)

The business source license (BSL) is a standard software license which sits in the middle between FOSS and traditional proprietary licenses. The concept originates from the MariaDB Corporation, which provides the template license text, holds respective trademarks and maintains an FAQ about BSL [here](https://mariadb.com/bsl-faq-mariadb/).


### Non-production use | additional use grant | additional commercial license

Under BSL, users are granted a license to use the software in a 'non-productive manner'. This means any environment not delivering significant value to a business (e.g., forking a protocol even without direct monetization such as adding a token would likely be productive use already). 

BSL also allows licensors to specify additional use grants for productive or commercial purposes under certain limitations, usually without payment.  Uniswap has done this for v3 [here](https://app.ens.domains/v3-core-license-grants.uniswap.eth?tab=records), whereby they had UNI holders vote on the distribution of such additional use grants.

Licensors can also grant an additional commercial license against payment (and any other terms the parties agree to) on top of BSL. This provides a pathway for developers to monetize their software until the transition of BSL to the designated FOSS license (see below).


### Source available

To avoid confusion in terminology, BSL is not a FOSS license or open source. However, it is a 'source available' license, meaning the source code is publicly accessible and verifiable, typically through a public GitHub repository.


### Time-delayed transition to open source license

A key feature of BSL is its built-in transition to a FOSS license. After a predetermined period (max. 4 years), the software automatically transitions to a recognized open source license ('change license'), such as the GNU General Public License (GPL), the MIT or the Apache License. The mechanism ensures that the software will eventually be freely available for any use (still subject to the respective FOSS license).

The transition can be accelerated. Staying with the example of Uniswap, UNI holders are able to vote on the accelerated transition from BSL to GPL.


## BSL in decentralized finance (DeFi)

In March 2021, Uniswap announced the third iteration of its AMM protocol, with the core protocol published under BSL 1.1. Uniswap referred to the BSL as a 'time-delayed GPL-2.0-or-later license', stating that the BSL would transition to GPL 2.0 (or a later version) upon April 1, 2024. For that initial duration of 2 years, however, any productive | commercial use of the v.3 source code would be prohibited. Uniswap did, however, involve the UNI holders by allowing them to vote on granting additional use grants to different projects (giving those projects the right to use the codebase productively despite the BSL) and voting on expediting the transition to GPL 2.0. 

After Uniswap v3, many other DeFi protocols have started to experiment with BSL:


<table>
  <tr>
   <td>
   </td>
   <td>copyright holder
   </td>
   <td>license
   </td>
   <td>productive | commercial use
   </td>
   <td>additional use grant 
   </td>
   <td>change license
   </td>
   <td>change date
   </td>
  </tr>
  <tr>
   <td>Uniswap v3
   </td>
   <td>Uniswap Labs
   </td>
   <td>GPL 2.0
<p>
(formerly  <a href="https://github.com/Uniswap/v3-core/blob/main/LICENSE">BSL 1.1</a>)
   </td>
   <td>yes
   </td>
   <td>n/a
   </td>
   <td>n/a
   </td>
   <td>n/a
   </td>
  </tr>
  <tr>
   <td>Uniswap v4
   </td>
   <td>Uniswap Labs
   </td>
   <td><a href="https://github.com/Uniswap/v4-core/blob/main/LICENSE">BSL 1.1</a>
   </td>
   <td>no
   </td>
   <td>Any uses listed and defined <a href="v4-core-license-grants.uniswap.eth">here </a>
   </td>
   <td>GPL 2.0 (or later version)
   </td>
   <td>The earlier of
<br>
(i) 15 June 2027;
<br>
(ii) a date specified <a href="v4-core-license-date.uniswap.eth">here</a>
   </td>
  </tr>
  <tr>
   <td>Aave v3
   </td>
   <td>Aave
   </td>
   <td>MIT
<p>
(formerly <a href="https://github.com/aave/aave-v3-core/blob/master/LICENSE.md">BSL 1.1</a>)
   </td>
   <td>yes
   </td>
   <td>n/a
   </td>
   <td>n/a
   </td>
   <td>n/a
   </td>
  </tr>
  <tr>
   <td>Compound v3
   </td>
   <td>Compound Labs
   </td>
   <td><a href="https://github.com/compound-finance/comet/blob/main/LICENSE">BSL 1.1</a>
   </td>
   <td>no
   </td>
   <td>Any uses listed and defined <a href="v3-additional-grants.compound-community-licenses.eth">here</a>
   </td>
   <td>GPL 2.0 (or later version)
   </td>
   <td>The earlier of:
<br>
(i) 31 December 2025; 
<br>
(ii) a date specified <a href="v3-change-date.compound-community-licenses.eth">here</a>
   </td>
  </tr>
  <tr>
   <td>Morpho Blue
   </td>
   <td>Morpho Association
   </td>
   <td><a href="https://github.com/morpho-org/morpho-blue/blob/main/LICENSE">BSL 1.1</a>
   </td>
   <td>no
   </td>
   <td>Any uses listed and defined <a href="morpho-blue-core-license-grants.morpho.eth">here</a>
   </td>
   <td>GPL 2.0 (or later version)
   </td>
   <td>The earlier of:
(i) 1 January 2026;
<br>
(ii) a date specified here;
<br>
(ii) upon the activation of the setFee function Morpho Blue Core's applicable protocol smart contracts deployed for productive use.
   </td>
  </tr>
  <tr>
   <td>Eigenlayer
   </td>
   <td>Layr Labs, Inc.
   </td>
   <td><a href="https://github.com/Layr-Labs/eigenlayer-contracts/blob/dev/LICENSE">BSL 1.1</a>
   </td>
   <td>no
   </td>
   <td>n/a
   </td>
   <td>MIT
   </td>
   <td>1 May 2025 / 
<br>
6 February 2027
   </td>
  </tr>
  <tr>
   <td>Liquity v2
   </td>
   <td colspan="6" >not published yet
   </td>
  </tr>
  <tr>
   <td>Curve
   </td>
   <td colspan="6" >No license (see <a href="https://github.com/curvefi/curve-contract/blob/master/LICENSE">here</a>)
   </td>
  </tr>
</table>


 


### Compromise on decentralization?

Probably the most discussed point in relation to BSL in DeFi is the question whether BSL is 'anti-DeFi' and against the core values of the space. Many DeFi projects that implement BSL are themselves built on resources provided by the open source community in the first place. Abandoning this is seen by some as an attack on the underpinning values of DeFi. 

With respect to the values discussion, this certainly holds weight. BSL is not open source, and should also not be portrayed as such. Additionally, BSL can potentially pose a barrier to further innovation in the space (see below). However, a few points to consider: BSL is arguably still 'better' from a values-perspective than proprietary licensing or publishing under no license at all (as e.g., Curve has done). BSL provides a clear and deterministic path to FOSS with the automatic transition to the FOSS change license. With respect to decentralization, a core value lies in transparency, which BSL does not compromise on. Due to source-availability in BSL, users are still fully able to review and independently verify source code.


### Alternative monetization for your product

Monetization in DeFi primarily happens in two ways: You issue and sell a token (and subsequently profit from higher valuation, additional sales, etc.). Further, you implement some form of transaction, protocol, frontend, etc. fee. The fee distribution typically happens through a dedicated rev-share token ('lock token XYZ on the protocol ABC to receive fees'), through governance (voting on fee distribution), or by routing fees to a reward address directly controlled by the project. 

BSL offers an alternative monetization possibility: During the initial period before transition to FOSS, people are prohibited from forking your protocol. However, you are free to give out _separate _licenses to projects to use or alternate your protocol code in return for payment to you.

In practice, this means signing an additional license agreement with potential licensees that defines whether they can exclusively use the protocol code (e.g., exclusivity for a certain chain), how long the license lasts, what the payment is, etc. These additional license agreements don't have to be the same for each partner, but can be tailor-made. To stay with the above analogy, you can pick and choose the flowers you want to give out.

To be fair, this monetization approach is evolving and largely untested in DeFi. It resembles a traditional whitelabel licensing approach found in web2. One well–known issue with that lies in the enforcement of potential license infringements, which is notoriously difficult. Assuming you will grant some sort of exclusivity to your license partners, that exclusivity will be a large part of the value of the license, and your partners will rely on you enforcing this. The legal system, which is still very much bound by jurisdictions and country borders, can quickly reach limits when faced with enforcing your rights in a court (which court?) against (anon) persons sitting anywhere in the world. Also, BSL licenses are less battle-tested in courts and do not have the support with license infringements that many foundations and non-profits provide with respect to FOSS licenses.


### Scaling your product

As the DeFi landscape rapidly expands with alternative L1s, L2s, L3s, LXs, DeFi on Bitcoin, etc., competition between projects to attract builders, consumers, and liquidity is intensifying. One could argue that the market will naturally resolve this by ultimately favoring protocols that provide the most value to users. FOSS supports this notion by ensuring free competition, allowing anyone to freely fork a protocol and enhance it to offer more value. However, we need to recognize the downsides of this approach as well:

From a user perspective, while the end goal is to have the best product, navigating through new forks (with sometimes confusing or misleading attestation to the original project up to outright scams), can be challenging and risky. BSL offers a more controlled environment for initial testing and subsequent scaling of the protocol, which should be in the interest of the end user's safety.

From a project perspective, substantial efforts can be put in a protocol just to see it fragmented instantly through numerous low-effort forks. Uniswap has experienced this in the immediate forking of v2 by Sushiswap, who simply slapped a token onto their protocol. Here, BSL provides a (time-limited) moat to improve and materialize the project's innovation and investments. People can't simply copy paste your protocol on day 1 and siphon your liquidity, user base, etc. While, going forward, this is probably less of a concern for the well-established DeFi brands such as Uniswap or Aave, it is a real risk for smaller and lesser known projects. 

Another example is Liquity, who opted to pursue a BSL rather than go FOSS at the launch of its v2 protocol. The team has cited the lack of collaboration between the 35+ forks of its v1 protocol; the damage to users some of those getting exploited caused; and the cost to its own development team of needing to address unwarranted fears stemming from them. Altogether, these factors combined to leave value on the table that could have gone to users in the form of tangible incentives or heightened mindshare.


### Navigating pitfalls in DeFi regulation

A notoriously overlooked point in the context of licensing models is their potential implications from a regulatory perspective. DeFi builders face an array of legal and regulatory uncertainties in their work. Simultaneously, regulators globally are getting more engaged in the topic of how DeFi should be defined (what is decentralized?) and how it should (or should not) be regulated. The regulatory topic is extensive and ongoing, so I won't discuss it in detail here. Nonetheless, it's important to be aware that a protocols licensing strategy (or more clearly: it's general monetization strategy) can be linked to regulatory risks:

As outlined above, a typical monetization strategy lies in the combination of token sales and protocol revenue sharing mechanisms. (Public) Token sales are increasingly subject to regulatory scrutiny, which is part of the reason we have been seeing so many VC-funded projects launch without public sales through high FDV airdrops and CEX listings. The issue with revenue sharing mechanisms is more subtle: Dedicated revenue sharing tokens are very prone to security classification (those tokens are quite easily compared to securities with dividend- or interest-like payments). Additionally, ongoing management of these tokens (like managing liquidity for the token on different venues) can carry regulatory risk. Revenue sharing mechanisms outside a token may particularly raise regulatory questions about the decentralization of the protocol (the Swiss regulator, FINMA, has e.g., suggested that accrual of income from a DeFi application suggests lack of decentralization). 

BSL may offer the possibility to mitigate these pitfalls by shifting your business model closer to that of a web2 white labeling solution. However, this is untested and the regulatory landscape for DeFi is evolving quickly. The (very far reaching) VASP Guidance by FATF has, for example, previously suggested that whoever 'owns' a dApp could be considered a regulated VASP, whereby BSL could be an indication of such 'ownership' as opposed to an open source license.


### Impact on innovation in DeFi

Your copyright protects the specific source code of your software, not the underlying idea or concept. This means that, in theory, any developer can create their own product based on the same concept without infringing on your copyright. They just need to write original code.

However, in practice, it's challenging to differentiate between genuinely original work and work derived from copyrighted software. If sued, developers face a high legal risk if they cannot prove the originality of their work in court. To mitigate this risk, they would have to ensure their work is original, through rigorous and costly procedures like clean room design. Especially in the DeFi space, where developers are scarce and usually familiarize themselves with new DeFi building blocks, this can slow down the pace of innovation.

On the other hand, one might argue that this practice could lead to more sustainable and long-term oriented innovation: At first, DeFi innovation thrived off a free and open forking practice. However, with money flowing in, we were seeing more and more lazy fork strategies along the lines of (1) forking a well known and battle tested protocol, skipping developing and auditing work, (2) spending all VC cash on KOLs, marketing and BD, (3) cashing out and abandoning the protocol, (4) rinse and repeat. This cycle drains money from the ecosystem and stagnates innovation. BSL is trying to introduce alternative ways to incentivize teams to build genuinely new DeFi solutions, which could ultimately lead to a more sustainable pace of innovation.


## Key Takeaways

* DeFi is often faced with balancing ideals and practicality. The phenomenon is observed in software licensing models chosen by DeFi protocols, with a recent shift from Uniswap, Aave and others from FOSS (GPL, MIT, etc.) to BSL licenses.
* BSL is not an open source license. Rather, BSL is a middle ground between FOSS and proprietary licenses. BSL is restrictive for an initial period, and then mandates an automatic change to a FOSS license after max. 4 years.
* For effective decentralization, source availability is critically important to ensure transparency and allow users to verify code. FOSS and BSL licenses are both source available license types.
* BSL allows DeFi projects to experiment with alternative monetization models, beyond the typical token sale / revenue share token model to a more traditional whitelabel licensing model.
* BSL can provide a time-limited moat for projects to materialize upon their work and innovation in DeFi. This helps in fending off low-effort forks looking to make a quick buck by adding a token, and can help align the larger community around the project in a symbiotic way.
* BSL can be seen as a barrier to further innovation. However, judging from the reality of forking practices in DeFi, it is yet to be seen whether BSL cannot ultimately lead to a more long-term and sustainable (albeit slower) pace of innovation in DeFi.