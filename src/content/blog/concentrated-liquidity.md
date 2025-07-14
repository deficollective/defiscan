---
title: "A deep dive in the limitations of Concentrated Liquidity"
description: "Concentrated Liquidity has been out since 2021, yet it is struggling to fully replace previous versions of the on-chain AMM. Let's try to understand why."
date: 2024-06-20T05:00:00Z
published: true
categories: ["Research"]
authors: ["spicypiz"]
tags: ["Liquidity Management", "Liquidity-driving Tokens", "Collective"]
---

Uniswap [launched its v3](https://blog.uniswap.org/uniswap-v3) in 2021. With v3, Uniswap introduced the concept of Concentrated Liquidity (CL). If you're unfamiliar with this concept, the [Uniswap Docs](https://docs.uniswap.org/concepts/protocol/concentrated-liquidity) are the best place to learn about it.

v3 was built to be more capital-efficient than v2. CL enables Liquidity Providers (LPs) to concentrate the range in which their assets can be traded. Since the range is more concentrated, the assets are expected to be used more often, which can generate more fees. LPs can expect a higher yield for the same amount of capital. However, there is no free lunch, and CL also has higher risks. Managing a position and staying profitable in any market condition is extremely challenging for LPs. Yields are much harder to anticipate since they vary greatly depending on concentration levels. Some less sophisticated actors attracted by the high APRs can get eaten up by the high Impermanent Loss (IL).

Even though v3 is more advanced and efficient than v2 for swaps, it is struggling to replace v2 fully. At the time of writing, more than three years after the official launch of v3, v2 still attracts $2.6b TVL vs. $3.6b for v3. 

Let's dive into what could explain it.

## Liquidity Management

One of the reasons why Uniswap v2 still survives is the additional complexity and risk that comes with v3 for Liquidity Providers. Providing liquidity in a v3 pool can be more profitable but generate higher IL than v2. Since IL is so high in CL pools, to stay profitable, LPs need to hedge their positions, adapt to market conditions, decide when to rebalance their position, account for volatility, etc.

Maintaining v3 positions holds more risks and requires more work. Liquidity providers must develop advanced liquidity management tools or rely on 3rd parties to manage their liquidity, such as Gamma, Ichi, or Arrakis. These 3rd parties are responsible for managing users' liquidity positions, ensuring that their liquidity stays in range by rebalancing the position, among other optimizations. This reliance on a 3rd party adds an attack vector, as they are usually highly centralized. Decentralized infrastructure is not always up to date in supporting the advanced needs of concentrated liquidity.

Liquidity providers who lack the skills to develop tools to manage their CL positions, don't want to rely on third parties, and don't want to manually babysit their positions might be thrown off by v3 and stay on v2 whenever possible.

![Untitled](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/cl_meme.png)

## Composability

One major technical difference between v2 and v3 is the nature of the token that is used to represent a position in a pool. 

In v2, a position in a pool was represented by a fungible token (ERC-20). All liquidity providers in a pool got the same token, the amount of which is proportional to their contribution to the pool.

With v3, each position in a pool is unique. It has unique attributes like the minimum and maximum price. Thus, positions are now represented by an NFT (ERC-721). Each NFT is unique and holds data about the position.

In v2, the fungibility of the positions meant that the fees and IL risks were mutualized between all the LPs in a single pool. All LPs were treated the same: every participant in a given pool got the same yield and the same IL. 

v3 introduces a PvP component inside a single pool where the smartest LPs who can stay in range will generate the bulk of the fees. It is no longer possible for DeFi users or passive investors to be competitive in this market every day. v3 introduces more complexity, hence more specialization and centralization towards sophisticated actors.

In v2, the fungibility of the positions meant that you could use your LP tokens for other use cases outside their originating DEXes. LPs could use their LP token as collateral for leverage. For example, at one point you could deposit some LP tokens in AAVE v2 (now deprecated). Extra Finance is another example of protocol enabling you to leverage your LP tokens. It is only available on Optimism & Base, focused on Velodrome & Aerodrome positions. To our point, on Extra Finance, only "Basic" pool tokens can be leveraged (Basic on Velo/Aero correspond to v2 pools on Uniswap, Velo/Aero also support CL pools, but they can't be leverage on Extra Finance).

With v3, this composability aspect of the v2 LP tokens is not as easy to match. Each NFT representing a pool position has their unique traits. And a standardized way to use these NFTs as collaterals has yet to emerge. This is a major use case that is missing, and another possible reason why Concentrated Liquidity has not fully replaced its predecessor yet. 

## Incentives

Liquidity providers find it very difficult to be profitable on the most illiquid and volatile pairs. Projects wanting to grow the liquidity on their tokens can either provide liquidity themselves and, therefore, assume the IL risk and losses. Or they can provide incentives for liquidity providers, as liquidity providers often rely on project incentives to be profitable on those pairs. 

The concentrated liquidity era also introduced more complexity regarding incentives and reward distribution. 

If you want to incentivize a v2 pool, you can easily reward all the token owners proportionally to their ownership. Distributing rewards to unique NFTs in v3 is much more complex than distributing the rewards evenly to ERC-20s. 

Projects like Merkl, used by the Uniswap Foundation, emerged to empower projects to create reward mechanisms for LPs. Projects select the pool and reward mechanism, and Merkl will ensure the correct distribution of the rewards to LPs based on the parameters. Unfortunately, this third-party incentive distribution tool adds one more attack vector, as Merkl introduces off-chain computation. Merkl mitigates this risk by putting in place a [dispute period](https://docs.merkl.xyz/overview/merkl-mechanism#dispute-periods) to allow anyone to permissionlessly verify that the system is working properly. 

On Curve, the votes are technically on the chain, but the tokenomics incentivize a high centralization of the tokens. Convex controls 49% of the veCRV. Hence, most of the votes go through Convex. In Convex, the vote from vlCVX holders is gasless and uses Snapshot. The computation is made off-chain and then reattributed to an equivalent veCRV vote. You have to trust this centralized system, and errors can be made. Balancer has a mechanism similar to Curve with Aura.

We are left with few options to harness the power of concentrated liquidity, use advanced incentive mechanisms to drive liquidity, and use only protocols that follow the DeFi Collective protocol guidelines.

With Velodrome and Aerodrome, the ve(3,3) model enables a fully on-chain incentive mechanism built into the protocol. Projects that hold tokens can reward liquidity providers by voting on the pools of their choice. Votes are fully on-chain, which is a clear improvement compared to the other options out there today. On top of other reasons (immutable contracts, fair token launch, limited governance, etc.), those DEXes are some of the most recommended by the Collective. The recent launch of Maverick v2 should add another long-term viable option for the Collective. 

## Analytics

Another side of DeFi that got more complex with Uniswap v3 is the analytics.

Since every position is different, there are multiple ways to show the pool's performance. How should DEXes communicate the APRs liquidity providers are making from a pool to be comparable with v2? There are a few different approaches.  

Calculating the profitability of your LP position is more complex as it depends on the range chosen, not only the assets provided. Again, this excludes the least sophisticated actors. 

The DEXes do show an APR on each pool, but it can be confusing as different approaches exist in the market today - for example:

- Uniswap calculates the APR by dividing the fees made by the whole pool by the TVL, averaging the performance of all LPs.
- Velodrome and Aerodrome show the APR of 3 ticks (the active tick +/- 1). You can expect to make the displayed APR if your position is three ticks wide and if you always remain in range.
- Maverick shows the APR of the single best tick (even if it's not the latest active one).

This is the APR shown before depositing your funds, but it does not account for IL or calculate APR for your specific position. To solve that problem and help inform investors, platforms like [revert.finance](http://revert.finance) were developed. Their goal is to help investors measure the performance of their liquidity position, accounting for fees, IL etc. At the time of writing Revert only works with a few DEXes (Uniswap v2 and v3 included). But other DEXes are coming soon. 

## Conclusion

Uniswap v3 has not fully replaced v2. It comes back to a trade-off between efficiency and resilience. v3 is the most efficient on paper, but when using it, you have to compromise on resilience. v3 is also less transparent, more complex, and more elitist. 

We are looking forward to Uniswap v4, which will bring its share of innovations that could solve some of the drawbacks of v3. We also expect it will bring even more complexity, that could unfortunately make even more users sidelined. But Uniswap v4 could be a topic for a full blog article in itself, and we will not develop it here. 

The DeFi Collective supports innovation and efficiency improvements, yet we also believe in resilient and egalitarian systems. Our current approach is to find an equilibrium between v2 and v3 and investigate any innovation that can combine the best of both worlds. 

*Massive thank you to TokenBrice for the idea of the article and the constant feedback, and to Abmis for the review and insights shared.*