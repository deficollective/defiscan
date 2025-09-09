---
title: "The problem with oracles in lending"
description: "lending protocols rely primarily on oracles, which remain an external dependency despite being indispensable. But when we take a closer look at the topic, we realize that the centralization problem does not necessarily depend on oracles"
date: 2025-09-9T18:00:00Z
published: true
categories: ["Research"]
authors: ["Stengarl"]
tags: ["Research", "Decentralization"]
---

If you regularly consult DeFiScan's protocol reviews, you may notice recurring patterns in the decentralization score.

One of the most recurring patterns involves a generally high centralisation score in lending and borrowing protocols. Aave, Spark, and Compound all share a high degree of centralization in terms of autonomy, whereas other protocols such as onchain exchange platforms receive better ratings.

The main reason for this is that lending protocols rely primarily on oracles, which remain an external dependency despite being indispensable. But when we take a closer look at the topic, we realize that the centralization problem does not necessarily depend on oracles.

## Why do we need external dependencies in lending?

**The answer to this question comes down to two points:**
* Having a reliable liquidation system
* Finding the fair price of assets

The vast majority of lending protocols we know today are Lombard loans, where the value of borrowers' collateral is always greater than the value they borrow.

To ensure that all borrowers remain solvent and don't exploit the protocol at the expense of other users, a liquidation system must be implemented.

Generally, the liquidation system works as follows:
1. For each asset, a Loan-to-Value (LTV) percentage threshold is set, beyond which any position becomes liquidatable because it's too risky for the protocol
2. When a position becomes liquidatable, any user (usually liquidation bots) can repay it
3. The liquidated user pays a penalty, part of which is paid to the liquidator for protecting the protocol from bad debt

The parameters of a liquidation system like thresholds, penalties, and mechanisms can vary from one protocol to another. But when a liquidation system is robust, liquidatable borrowers are always solvent and participating in a liquidation is always a profitable action (history shows this doesn't always happen, but let’s keep it simple).

One problem remains: we're looking for a Loan-to-Value ratio. To have a Loan-to-Value ratio, we need to know asset prices, but how do we know if the price of the assets in question is fair?

### Finding the fair price of assets

For the liquidation system to be robust, it must constantly know the price of the assets involved. But on the blockchain, there are many different ways to determine asset prices and just as many different ways to manipulate prices at users' expense, not to mention the price disparities that can be found between onchain data and everything external to the blockchain.
This is where oracles come in - systems that aggregate a whole set of information to provide the fairest possible price for a given asset.

![OracleTVS](https://raw.githubusercontent.com/Stengarl/img/refs/heads/main/OracleTVS.png)

The undisputed reference for oracles currently is Chainlink, and while competitors such as Chronicle, Pyth, or RedStone have found their audience, Chainlink has become omnipresent in lending thanks to its reliability, currently securing more than $50 billions in lending protocols.

## The problem with oracles

Oracles are now part of the lending landscape, to such an extent that we forget they remain a centralization vector.

Reliability is an essential quality for an oracle network, but there are also other criteria such as decentralization and implementation by protocols that are important but often overlooked.

![DeFiScanChainlink](https://raw.githubusercontent.com/Stengarl/img/refs/heads/main/DFSLink.png)

Speaking of Chainlink, we already made some [decentralization assessements](https://www.defiscan.info/protocols/chainlink-oracles/ethereum) about this oracle network, and we have some concerns about the Chainlink multisig: 
* It has permissions to change the price feeds arbitrarily. This could change the entire logic of the price feeds, disabling further updates or rendering inaccurate data.
* Those changes can be made without delay 
* The Chainlink multisig does not follow the requirements for a Security Council according to DeFiScan’s framework.
For all those reasons, Chainlink Price Feeds have a high centralization score as an infrastructure.

That high centralization score wouldn’t be that much of a problem if lending protocols themselves set up some fallback mechanisms to mitigate the risk, but this is precisely where it gets worse.

Some lending protocols put their faith blindly into some oracles. For example, Compound V3 relies on a Chainlink oracle feed to price collateral and base assets, but does not validate asset prices returned by Chainlink or offer a fallback oracle mechanism

Aave has a sanity check to see if the price is above 0 for all assets. If the reported price by the price feed was below 0, a fallback oracle would be queried, but Aave currently has no fallback oracle price feeds instantiated.

Having a reliable oracle network for lending is good, but its implementation in the protocol also matters to have a system as resilient as possible.

## Can we eliminate oracles in lending?

### Frankencoin, an oracleless stablecoin issuer

Frankencoin is a stablecoin issuer allowing users to mint assets pegged to the Swiss Franc (CHF), backed by at least 1 CHF worth of crypto collateral for every ZCHF issued. But instead of depending on third-party oracles for real-time collateral pricing, it leverages auction mechanisms and its own governance token.

How the protocol works:
* Anyone can propose a new collateral asset and, upon community approval, use it to mint ZCHF.
* Minted ZCHF can be generated through an auction-based process, where the determination of collateral value and liquidation occurs via challenge auctions.
* When a collateralized position becomes risky, other users can liquidate it; an auction mechanism picks up the collateral, uses the proceeds to buy back ZCHF, and handles any surplus or shortfall, ensuring each ZCHF remains safely collateralized.

Holders of Frankencoin Pool Shares (FPS), the governance token, have an economic interest in maintaining the peg at 1 CHF. They can influence the system's interest rate policy to adjust the supply and demand of ZCHF, thereby encouraging arbitrage to bring the price back to parity.

FPS token holders also benefit from the earned fees and liquidation profits, but they are also the ones that carry the residual risk of liquidations, similar to the shareholders of a bank.

In the end, this auction mechanism allows the market to organically determine the value of collateral without any oracle. 

But this approach also comes with tradeoffs. The main one is that responsiveness is slower, with liquidations that can take several days. In addition, users can’t know what the “official” value of their collateral is, so they must manually monitor prices.

### Borrowing other crypto assets without oracles

There is a specific category of lending protocols that have chosen to operate without oracles. This category is called oracleless lending, and they have several key principles that differentiate them from the current lending landscape :
* Price-Specified Lending: Lenders input the exact price at which they're willing to lend, expressed as the amount of quote token they'll provide per unit of collateral. This replaces external price feeds with user-defined pricing
* Market-Driven Interest Rates: Interest rates are determined through deterministic rules based on user actions and pool utilisation, rather than governance decisions or external factors

Protocols like Timeswap or Ajna eliminated oracle dependency. However, solving this problem caused other issues that negatively impacted the user experience.

Unlike other protocols where users only need to monitor basic metrics like health factors, lenders need to manually update their acceptable collateral ratios and lending prices as asset values fluctuate. The protocols require them to understand sophisticated concepts and regular position monitoring.

This complexity makes the protocols unsuitable for passive users who prefer set-and-forget strategies, and creates the risk of user mistakes.

Furthermore, the peer-to-peer nature of many oracle-free protocols creates fragmented liquidity. While Compound or Aave have mutualistic pools (lenders and borrowers on same terms), oracleless protocols often require precise matching between lender preferences and borrower needs. In other words, we have both supply and demand, but a lack of matching.

### In the end

There have been attempts to eliminate the use of oracles in DeFi, but removing this external dependency immediately impacted the user experience.

Considering that the most successful lending protocols rely on oracles, we can’t really get rid of them. That said, some things can be done to improve the autonomy score of lending protocols as a whole.

## Some Solutions

**The oracle providers can improve their decentralization score themselves.** For example, Chronicle is the most decentralized oracle provider we reviewed so far:
* A [public dashboard](https://chroniclelabs.org/dashboard) listing oracles and validators
* Centralized permissions on the oracles' validator set are protected with a 7-day Exit Window
* Chronicle relies on third-party entities that collaborate offchain in a peer-to-peer fashion to produce a verifiable price onchain

**Another solution is to have a multiple oracle implementation, just like Liquity V1 does.** This protocol uses Chainlink’s ETH:USD price feed, falling back to the Tellor ETH:USD oracle under the following conditions:
* Chainlink price has not been updated for more than 4 hours
* Chainlink response call reverts, returns an invalid price or an invalid timestamp
* The price change between two consecutive Chainlink price updates is greater than 50%
If both Chainlink and Tellor are frozen or untrusted the last good price is used and the system keeps operating allowing users to withdraw their assets.

Spark and Maker use both Chainlink and Chronicle, with a Uniswap TWAP (Time-Weighted Average Price) as a tie-breaker if they diverge. The reason why Spark's centralization score is high is that it relies heavily on Sky's USDS and sUSDS stablecoins, a protocol rated Stage 0. Apart from this dependency, all efforts made to mitigate oracle dependency deserve to be highlighted.
