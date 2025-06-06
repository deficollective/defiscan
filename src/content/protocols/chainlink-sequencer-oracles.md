---
protocol: "Chainlink Sequencer Oracle"
website: "https://chain.link/"
x: "https://x.com/chainlink"
github: ["https://github.com/smartcontractkit"]
defillama_slug: [""]
chain: "Ethereum"
type: "Oracles"
logo: "/images/infrastructure-logos/chainlink-logo.png"
stage: "I0"
protocols: ["Aave v3"]
reasons: []
risks: ["L", "H", "L", "M", "L"]
author: ["sagaciousyves"]
submission_date: "2025-06-05"
publish_date: "2025-06-05"
update_date: "1970-01-01"
---

# Summary

Chainlink offers realtime sequencer downtime information with the _L2 Sequencer Uptime Feeds_ contracts on the different L2s.

DeFi protocols on L2s can consume this oracle for functions for which the protocol wants to create fairness for its user base. For example a DeFi protocol could prevent liquidations from happening by requiring that the L2 Sequencer Uptime Feed reports uptime for the respective L2. With that setup sophisticated users cannot force include liquidation transactions via posting the transaction to the L1 and extract value from non-sophisticated users.

This report is a limited assessment of Chainlink's _L2 Sequencer Uptime Feeds_ to assess the centralization of DeFi projects that rely on Chainlink for sequencer uptime. We therefore limited our investigation to the main centralization vectors that we have found and listed below.

# Protocol Analysis

Chainlink build the oracle contract that reports the sequencer uptime on the L2 by leveraging the force transaction inclusion via the L1.

The Chainlink Oracle network (OCR) reports to sequencer status with messages that are sent to the inbox of the L2 on Ethereum. The inbox of the L2 deployed on Ethereum is the queue where transactions are posted which should be forced into the L2 before native-L2 transactions are processed.

If the sequencer was _down_ and gets back _up_ again, the sequencer will then include this queued transaction reporting sequencer downtime at the beginning and as such the state of the _L2 Sequencer Uptime Feeds_ contract on the L2 will report sequencer downtime for all following forced inclusions in the queue the sequencer is processing. At the end when all queued transactions are processed, the oracle can force a transaction to state the sequencer is up again.

This also means that _L2 Sequencer Uptime Feeds_ is only as good as it manages to be the first in the queue that will be forced into the L2. All transactions that are in the queue before the oracle update, execute with the _L2 Sequencer Uptime Feeds_ reporting _uptime_.

The exact workings and contracts used for this system are dependent on the respective L2 that should be reported on.

An overview of the _L2 Sequencer Uptime Feeds_ architecture can be seen below.

[enter_image]

## Arbitrum L2 Sequencer Uptime Feed

The Chainlink OCR oracle network observes the sequencer activity and sends an update every 30s to the inbox of Arbitrum on the L1 by the following process.

1. The OCR network calls the `validate` function on the `ArbitrumValidator` via the `ValidatorProxy` to check the sequencer’s status. The `ArbitrumValidator` compares the current reported status with the previous one and, if a change is detected, sends a message to the Arbitrum Inbox contract.
2. The Inbox forwards this message to the `ArbitrumSequencerUptimeFeed` contract on Arbitrum, which updates the sequencer status (0 if up, 1 if down) and logs the block timestamp from L1.
3. L2 consumer contracts access this status and timestamp via the `ArbitrumUptimeFeedProxy`, which reads data from the `ArbitrumSequencerUptimeFeed`.

The `ArbitrumUptimeFeedProxy` (name in the docs, actual contract name is `EACAggregatorProxy`) is a proxy which currently points to the `ArbitrumSequencerUptimeFeed` contract. Both contracts, `ArbitrumUptimeFeedProxy` and `ArbitrumSequencerUptimeFeed`, are under the control of the [Chainlink multisig](#security-council) multisig. If the proxy starts pointing to a new uptime feed, it could be a malicious or a faulty implementation that reports not the correct sequencer status. This requires the DeFi protocol to implement a grace period that is potentially also configurable because important functions related to liquidations could be permanently blocked, disrupting protocol functionality.

# Rating

As mentioned in the [protocol analysis](#protocol-analysis), the [Chainlink multisig](#security-council) has permissions to change the _L2 Sequencer Uptime Feed_ arbitrarily. This could change the entire logic of the uptime feeds, disabling further updates or rendering inaccurate sequencer status.

Those changes can be made **without delay** and the [Chainlink multisig](#security-council) does not follow the requirements for a _Security Council_.

## Conclusion

Chainlink's _L2 Sequencer Uptime Feed_ exposes critical permissions that are not protected by an _Exit Window_ nor a _Security Council_. This results in a _High_ Centralization score.

> Overall score: High

# Revier Notes

This review is currently limited to Chainlink _L2 Sequencer Uptime Feed_ from Ethereum to Arbitrum. The findings should generalize for other L2s.

# Appendix

## Security Council

The multisig in control of the price feeds and aggregator contracts is a 4/9 multisig controlled by Chainlink. It does not meet our security council requirements.

&nbsp;

| Name               | Account                                                                                                                | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| Chainlink Multisig | [0x21f73D42Eb58Ba49dDB685dc29D3bF5c0f0373CA](https://etherscan.org/address/0x21f73D42Eb58Ba49dDB685dc29D3bF5c0f0373CA) | Multisig 4/9 | ✅          | ❌              | ❌                | ❌             |

## Contracts

We list here an example price feed. All Chainlink price feeds are listed [here](https://docs.chain.link/data-feeds/price-feeds/addresses?page=1&testnetPage=1&network=ethereum).

&nbsp;

| Contract Name                                | Address                                                                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ArbitrumValidator                            | [0x7399c5e6437269b9ff338251b2e88fb363703910](https://etherscan.io/address/0x7399c5e6437269b9ff338251b2e88fb363703910#code) |
| EACAggregatorProxy (ArbitrumUptimeFeedProxy) | [0xFdB631F5EE196F0ed6FAa767959853A9F217697D](https://arbiscan.io/address/0xFdB631F5EE196F0ed6FAa767959853A9F217697D)       |
| ArbitrumSequencerUptimeFeed                  | [0xC1303BBBaf172C55848D3Cb91606d8E27FF38428](https://arbiscan.io/address/0xC1303BBBaf172C55848D3Cb91606d8E27FF38428)       |

## All Permission Owners

| Name               | Account                                                                                                               | Type         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Chainlink Multisig | [0x2F3b388EB017613eb51F06843DFEF12Db1fDD3c5 ](https://arbiscan.io/address/0x2F3b388EB017613eb51F06843DFEF12Db1fDD3c5) | Multisig 4/9 |

## Permissions

| Contract                    | Function           | Impact                                                                                                                                                                                                                                                                              | Owner              |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| EACAggregatorProxy          | proposeAggregator  | Proposes a new aggregator (ArbitrumSequencerUptimeFeed is the aggregator). The aggregator needs to be confirmed in an additional transaction. If confirmed the new aggregator will be the reference for reported sequencer uptime, effectively upgrading the sequencer uptime feed. | Chainlink Multisig |
| EACAggregatorProxy          | confirmAggregator  | Confirms the new aggregator and starts using it for the uptime state. A malicious aggegator contract could manipulate report uptime even if the sequencer is down or downtime when the sequencer is up.                                                                             | Chainlink Multisig |
| EACAggregatorProxy          | transferOwnership  | Transfers ownership over the contract. The new owner would inherit access to all permissioned functions and could update the uptime feed, including in a malcious fashion. The new owner has to accept the position.                                                                | Chainlink Multisig |
| EACAggregatorProxy          | acceptOwnership    | Called by the new owner to accept the position.                                                                                                                                                                                                                                     | pendingOwner       |
| EACAggregatorProxy          | setController      | Sets an access control contract to limit the access to the oracle's uptime feed to a listed controller. There are no access control in place at the time of writing.                                                                                                                | Chainlink Multisig |
| ArbitrumSequencerUptimeFeed | addAccess          | Adds access to the uptime feed to a given address. The `EACAggregatorProxy` has access.                                                                                                                                                                                             | Chainlink Multisig |
| ArbitrumSequencerUptimeFeed | removeAccess       | Removes access to the uptime feed to a given address.                                                                                                                                                                                                                               | Chainlink Multisig |
| ArbitrumSequencerUptimeFeed | enableAccessCheck  | Enables the access control over the uptime feeds (restricting the uptime functions to the addresses in the white list)                                                                                                                                                              | Chainlink Multisig |
| ArbitrumSequencerUptimeFeed | disableAccessCheck | Disables access control over the uptime feeds, anyone could query prices from this contract directly.                                                                                                                                                                               | Chainlink Multisig |
| ArbitrumSequencerUptimeFeed | transferOwnership  | Transfers ownership over the contract to a new address. The new address need to accept ownership and would inherit all control over the price feed.                                                                                                                                 | Chainlink Multisig |
| ArbitrumSequencerUptimeFeed | acceptOwnership    | Called by the new owner to accept ownership.                                                                                                                                                                                                                                        | pendingOwner       |
| ArbitrumSequencerUptimeFeed | transferL1Sender   | Set the allowed L1 sender for this feed to a new L1 sender. If it is set to the 0-address, the uptime feed is disabled and does not report new statuses and is stuck with the latest update.                                                                                        | Chainlink Multisig |
