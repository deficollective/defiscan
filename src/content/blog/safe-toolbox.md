---
title: "Making the most of Gnosis Safe: toolbox & tips"
description: "Safe is the premier solution for multisig wallets, and home to a thriving ecosystem built on top of it. This article details the various utilities helping Safe users to streamline their experience."
date: 2024-08-06T05:00:00Z
published: true
categories: ["Research"]
authors: ["tokenbrice"]
tags: ["Wallet", "Gnosis Safe", "Collective"]
---

Now is the best time to start using Safe! It has several benefits, whether for personal use or, more obviously, for companies and institutions. For individual users, the main advantage of Safe is the flexibility it brings to the security model: instead of having to migrate all assets to a new wallet to update one's security model, doing the same thing on a Safe merely means signing a few transactions to add and/or remove signers.

This article is intended as a toolbox & resource center. For each section, I'll give you an overview of the basics that should interest any user and then cover the more advanced tools addressing specific needs. I've been using Safe for years for personal and professional use, and I've seen the experience drastically improve as the tooling is enhanced. 

For many years, Safe has emerged as the most secure way for individuals or professionals to use DeFi. Almost every protocol or group involved in DeFi uses a Safe, so much so that the total value of assets secured by Safe exceeds $100 billion.

Safe is considered an essential means of securing assets, but it is also possible to considerably enhance the user experience thanks to various tools that can be used with Safe. This article provides an overview of the various tools that can be used, from generalist to more specific needs, to create a Safe tool user manual for both individual and team use.

With low gas fees on mainnet, [SAFE points farming(SafePass)](https://safe.global/pass), and a streamlined multi-chain experience with Safe thanks to all the tools released in the last couple of years we will cover here, switching to a Safe adds minimal friction vs a regular EOA (External Owned Address) / ledger setup. So, it's time to seize a &lt;5 gwei day and deploy yours!

![1-safe-pass](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/1-safe-pass.png)

Deploying a Safe takes just a few minutes. However, if you intend to use your Safe across several chains, you might be better off with some of the tools mentioned below, such as MutltiSafe or Brahma.


## Day-to-Day Tools – Basics


### Safe.global (official Safe UI)

While less feature-rich than the various tools we mention below, [the official Safe UI](https://safe.global/) will still prove handy, at least to deploy your Safe (if not intended for multichain usage) and to interact with the Safe Apps, both the default ones and custom, that are usually quite Safe-friendly, as the most well-made ones will batch interactions into one transaction (Allow+Swap on a DEX, Allow+Deposit on a farm, etc.).

This is also where you can manage and update your signer setup and set up the Safe Recovery Hub, which we will discuss later.


### Rabby for easy & safe signing

To operate a Gnosis Safe, you'll need a wallet. Rabby is the obvious choice here, as it is now an amazing tool for EOA management and provides native Safe integrations that will prove handy to interact with dApps that do not provide a Safe App nor support Wallet Connect.

To add a Gnosis Safe wallet to your Rabby extension, you first need to add the signer wallet (it's not required, but it will streamline your signing process). Then, Safes can be added with the "Connect Institutional Wallet" feature.

Once that's done, you can create transactions for your Safe just like for any EOA:

If any of the signing wallets are added to Rabby, they will be listed on the next step, streamlining the signing flow immensely:

![2-rabby-safe](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/2-rabby-safe.png)

In addition to these Safe-friendly features, Rabby provides many other useful ones, such as transaction simulations, warnings when interacting with contracts for the first time, approval management, and other safety-related alerts.

[You can download Rabby directly from the official website.](https://rabby.io/)


### DeBank for position tracking

For a Safe, just like for an EOA, if you use various DeFi protocols, you'll quickly need a tool to provide you with a comprehensive overview of all your positions. To this end, [DeBank](https://debank.com/) remains king, especially if you use MultiSafe, as you can easily view your positions on all chains, just like with an EOA.


## Day-to-Day Tools – Advanced/Specific Needs


### Den for coordinating the signers

**One of the most recurring problems with multisigs is coordinating the signers. Some teams spend a lot of time getting the required signatures to execute multisig transactions.**

Multisigs with a high required/total signers ratio are particularly concerned. As this ratio increases, the time taken to execute transactions becomes exponential. Even 6/10 multisigs take several days to coordinate, which is far too much in an emergency.

When a team (of any size) needs to manage a multisig, [Den (an alternative website to interact with your Safes)](https://www.onchainden.com/) offers a whole range of features to address coordination problems and save precious time:

* **Sending notifications.** Den offers Discord, Telegram, and SMS bots that send notifications to signers regularly until your transactions are executed. The bots can also tag signers who have not yet signed a transaction so we can identify apathetic signers.
* **Signers can simulate transactions** to see their outcomes and annotate transactions to make understanding transactions easy.
* **Batching transactions.** Transactions can be created in batches, so there are fewer transactions to sign.

![3-den](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/3-den.png)

Den also packs tons of other neat features for frequent Safe users, making it worth the try, including:

* **Contracts & Signers naming** to make your data more readable
* **Comments on transactions** to secure their context and help navigate your previous transactions.
* **On/offramp and DEX integration**: Den integrate a DEX aggregator and on/offramping tool to ease your streamline operations.
* **Transaction Recycling**: re-use previous transactions
* **Automated Recycling**: re-submit automatically recurring transactions (for instance, for a weekly bribe posting)

A set of features designed to streamline accounting was also recently added (Den Bookkeeping); we discuss it more later in the article.


### Smold.app for multichain usage

[Smold.app](https://smold.app/) is a set of amazing tools made to streamline various onchain operations. In our case, the one of interest is [MultiSafe](https://smold.app/apps/multisafe/), which allows the **deployment of Safes with the same contract address on many chains**.

It currently supports Ethereum, Optimism, BNB, Gnosis, Polygon PoS & zkEVM, Fantom, Fraxtal, Mantle, Base, Mode, Arbitrum, Celo, Avalanche, Linea, Blast, Scroll, Zora and Aurora and more are appearing frequently.

SmolDapp uses a special method for Safe deployment, meaning that you cannot clone an already existing safe deployed with the basic interface. However, once you've deployed your Safe with MultiSafe, even on just one chain, you can easily clone it on all the available chains in a click.. Remember that cloned Safes start with the same signer setups as the Safe was created, even if modified after deployment.

![4-multisafe](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/4-multisafe.png)

A $4.20 fee is charged for each deployment, but it is well worth it to streamline your bridging operations and accounting if you intend to use your Safe across several chains.

If you want a multichain-friendly Safe, MultiSafe is not the only option, although it is the most minimal and composable. Another tool we'll discuss below is Brahma, which also delivers the same feature and caters particularly to Safe users with high transaction volume.


### Brahma for multichain + high-volume usage

The [Brahma Console](https://www.brahma.fi/) is close to magic for demanding Safe users. In addition to delivering the same address on several chains like MultiSafe, it also provides an array of tools and services designed to streamline your experience with Safe and reduce the overall number of transactions your signers must verify.

Before the goodies, let's start with the main limitations: **most of the features require your Safe to be deployed by Brahma**, so it won't work well with an existing Safe. Now that it's cleared, the good stuff is that, essentially, Brahma gives you all you need in one interface and more.

* Various login methods
* Sub account management
* Brahma Relayer to Optimize Gas Consumption
* Position Overview
* Transaction decoding, similar to Den
* Token swaps & TWAP directly from the UI
* Bridge directly from the UI
* Transaction Automation
* And my favorite and most mind-blowing: Brahma Connect

Brahma Connect works similarly to Wallet Connect, allowing you to connect to dApps, but it does more. When Brahma Connect supports a protocol, you can sequence transactions on it easily within the Brahma interface.

Imagine the following flow: you have LINK and want to sell them for USDC and deposit them into Aave. With a regular Safe, you'd need the following transaction sequence that cannot be batched:

1. Approve LINK on a DEX
2. Swap LINK for USDC
3. Approve USDC for deposit on Aave
4. Deposit USDC on Aave

{{< youtube sAl4Qxlo7ag >}}

With Brahma, this is **compressed to a single transaction to sign**, doing all of the above. Indeed, Brahma incorporates a local fork of the blockchain's state, allowing it to anticipate the results of your transactions and sequence–batch them.


## Accounting Tools

Now that we've covered all the Safe tools and are optimizing their use according to your needs, let's address the tools and tips about accounting. We know this topic very well at the Collective since we publish detailed [monthly reports of our treasury activities](https://deficollective.org/categories/monthly-report/), and it will also interest other "institutional" Safe users.

One of the main issues with DeFi is how difficult it can be to understand what's in a project's treasury, what is happening with that money, and who has control. This gets even worse with power users.


### Gas Expenses Accounting

For Safe users looking to measure and report gas expenses precisely, one tip trumps them all: consolidate, as much as possible, execution on a single signer, a wallet that is solely dedicated to this purpose. It will greatly facilitate gas accounting since now the situation is about measuring the gas expenses of this wallet, which will accurately reflect the total gas expense of Safe.

If that is your case, then measuring gas spent, even across several chains, is very straightforward, thanks to tools made for this very end. At the Collective, we use and recommend [0xkhmer's Gas expenses dashboard](https://dune.com/0xkhmer/gas-spent-checker), which provides an overview of gas spent on EVM chains (in USD and ETH) on a chain-per-chain basis and with a customizable time window that can match your accounting needs.

![6-0xkhmer-gas](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/6-0xkhmer-gas.png)


### Position and Yield Accounting

There is no all-in-one tool for accounting for position value and the yield they generate, and you'll likely need to develop your process harnessing several solutions. At the Collective, we harness and account for the yield and value of L2 positions weekly and L1 monthly. Our process is detailed in our [Reporting Policy](https://deficollective.org/reporting-policy/).

DeBank is obviously a key tool for that purpose, and the Pro feature package might be worth considering, too, for the "Time Machine" (portfolio overview at any date in the past) and the transaction history analysis mode, which can both help tremendously while interpreting old transaction data.

Another promising tool is Den's Bookkeeping feature, which enables users to tag, potentially according to rules, all the tokens inbound. While it requires much tagging effort on the user end, it can result in an almost fully automated accounting if your Safe's transactions are similar. After trying it out with the Collective, we decided to opt-out of it as it did not fit our needs and the pricing based on inbound transactions would have resulted in a significant expense for the organization.


## Tips & Tools for Operational Security

As said before, using a safe is one of the best ways to secure assets. However, using a safe is only half the job. The other half is operational security (OpSec).

![7-phishing](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/7-phishing.png)

Every year, several multisigs with 9-digit values are compromised, not to mention countless addresses (including whales) that are phished or have all their funds stolen. Our contributor, Luude, recently published a [thread covering wallet OpSec best practices](https://x.com/0xluude/status/1699761964166304165).

As an individual, the best thing you can do is deploy a safe and have a minimum of **2/3 signers. This means that even if one of the keys is** compromised, your funds are still safe.

You can have 2 hardware wallets and 1 hot wallet for easy use. For faster execution, we can use 1 hot wallet plus 1 hardware wallet and have the second hardware wallet as a last resort/recovery signer.

The challenge of OpSec is balancing security with ease of use: the most secure flows tend to be more tedious to operate. A good way to solve this challenge is to segregate your wallets based on their frequency of usage, as we do at the Collective. For instance, having "High Frequency" to use for your day-to-day, along with a "Low Frequency" wallet with a higher security threshold to operate more as a vault, storing assets and positions long term and operating more rarely.

Whatever your wallet solution is, securing your wallet seed phrases is one of the most important dimensions of your OpSec procedures. We won't cover the best practices here, considering the length of this article; feel free to refer to the following guides:

* [Lopp – How to Back Up a Seed Phrase](https://blog.lopp.net/how-to-back-up-a-seed-phrase/)
* [The Ultimate Guide to Safe Seed Phrase Storage](https://unchained.com/blog/how-to-store-bitcoin-seed-phrase-backups/)

By using Rabby and implementing all of the above security measures, you can greatly reduce the risks of an onchain exploit and ensure the wallet's longevity. Now let's discuss some tools specific to Gnosis Safes:


### Safe{RecoveryHub}, set up recovery without seed phrase

The method presented for securing your seed phrase provides a certain degree of security, but the seed phrase concept is terrifying for many users, and there are situations where it is a sub-optimal recovery system.

Great news: at the end of 2023, Safe announced RecoveryHub, harnessing Account Abstraction to offer recovery possibilities far beyond the seed phase.

![8-safe-recovery-hub](https://raw.githubusercontent.com/deficollective/deficollective.github.io/main/assets/images/safe-toolbox/8-safe-recovery-hub.png)

With Recovery Hub, we can set up a configurable recovery profile depending on our needs:

* Hardware wallet
* Social recovery
* DAO recovery
* Third-Party recovery

We can also set up multiple recovery methods for one Safe.

With this tool, the recovery possibilities are already numerous, but we can also find modules to solve some more specific problems.


### Dead Man's Switch using Sarcophagus

Recovery is a topic worth considering from the perspective of you—still living—looking to recover access to a wallet you lost the keys to. But there's another dimension of the topic worth considering earlier rather than later: **what happens if you're not there anymore**? The Safe Recovery Hub can also provide options for this scenario, but others are worth considering.

The main challenge here is to find an option that satisfies the problem of providing access to your funds to a person of your choosing after your disappearance without creating a security issue/attack vector while you are still around. One of the most consensual models here is the Dead Man's Switch – explored by MolochDAO, amongst others.

The core idea is to look at your wallet activity and enable its signer setup to be modified (within pre-defined limits) if no transaction has been signed for X amount of time. As long as you're living and signing transactions, the risk of misappropriation is minimized. If/when you're gone, your pre-defined crypto-heirs can access your funds, avoiding unnecessary token burns. The main downside is the cooldown period – potentially annoying but unavoidable – for your crypto-heirs to access the payout.  

Several tools, such as [Sarcophagus](https://sarcophagus.io/), help you set up Dead Man's Switch. Institutions and high-net-crypto-worth individuals might want to explore other, potentially more customizable options: the [Remilia Vault](https://blog.remilia.org/remilia-vault/) can be a good starting point.


## Parting Words

We hope this article will help existing Safe users, and Safe users in becoming. All the Collective wallets are Safes, and we harness the tools mentioned above to streamline our signing experience, easily compute our gas expenses & positions for monthly reporting, and maximize security. If you know of any other tools that could prove useful to that purpose we missed, feel free to suggest them; we'll be happy to test them out.