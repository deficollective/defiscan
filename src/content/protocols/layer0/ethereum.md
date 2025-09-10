---
chain: "Ethereum"
type: "Bridge"
logo: "/images/infrastructure-logos/LayerZero.png"
stage: "I1"
protocols: ["maverick-v2"]
reasons: []
risks: ["L", "H", "L", "M", "L"]
author: ["sagaciousyves"]
submission_date: "2025-05-07"
publish_date: "2025-05-15"
update_date: "2025-06-18"
---

# Summary

LayerZero is a cross-chain protocol that allows for the transfer of data and assets between chains. It is a permissionless protocol, meaning that anyone can interact with the cross-chain protocol.

LayerZero further relies on a Decentralized Validator Network (DVN), these are validators of transaction data that needs to move cross-chain.

# Protocol Analysis

An overview of the LayerZero crosschain protocol can be seen below.

![Overview of LayerZero](../diagrams/layerzero-overview.png)

The LayerZero Protocol further relies on a Decentralized Validator Network (DVN), these are validators of transaction data that needs to move cross-chain. These validators are configured by the protocol that requires cross-chain communication for their use-case. If the configured DVNs fail, permission owner inside the protocol needs to update its security settings and configure new DVNs. The DVNs themselves have a reputation and earn fees for the validating cross-chain transaction data and are thus incentivised to behave correctly and maintain an appropriate uptime. The "default" DVNs is run by Google Cloud. Their DVN is deployed at the address: 0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc (deterministically deployed across all chains).

DVNs can choose to censor cross-chain transactions, if they do not validate the cross-chain transaction data. To be censorship resistant it is thus important to rely on a diverse set of DVNs.

Any protocol that relies on LayerZero could choose to run their own DVN. A flawed or unstable DVN can result in downtimes and the temporary freezing of funds. A malicious DVN can run a malicious verifier algorithm allowing the operator to steal user funds.

Finally, the LayerZero Protocol relies on Executors which trigger queued transactions on destination chains. The set of executors can be customised by the respective protocol, in this case maverick. However, it’s also fully permissionless, even if the designated executors do not execute the transaction on the destination chain, any user can step in and execute the transaction. Users' transactions can thus not be censored through the Executor set.

LayerZero Protocol itself is immutable and fully permissionless. The protocol will exist indefinitely even if LayerZero Labs, the company that developed the LayerZero Protocol, ceases to exist. LayerZero Labs' role in the LayerZero protocol is reduced to deploying immutable Endpoints on new chains. These endpoints reference each other and thereby enable the cross-chain communication network. If LayerZero Labs ceases to exist, no new chains are added to the cross-chain network, but the existing network is not affected.

# Rating

Since the endpoints of the LayerZero protocol on each chain are deployed immutably no upgradeability through LayerZero labs exists.

However, protocols that integrate LayerZero for cross-chain bridging are responsible to configure DVNs and Executors and can therefore upgrade their own DVNs and Executors. If protocols maintain a limited and narrow DVN set and permissioned Executor set, it can result in censorship and loss of funds for users of the protocol.

As mentioned in the [protocol analysis](#protocol-analysis), the [Chronicle multisig](#security-council) has permissions to change each oracle's validator set. Changing the validator set could put the system at risk of controlled prices, which could lead to the loss of user funds in protocols that rely on ChronicleLabs' oracles. Any changes in an oracle's validator set are subject to a **7-day exit window**.

Finally, 3 _Externally Owned Accounts_ (EOAs) can add or remove validator public keys to the `ValidatorRegistry_2` without delay. Updating the registry in a malicious fashion does not weaken the assumptions on the possibility of price manipulation, as the validators perform all cryptographic actions based on the oracle contracts. Update or addition of a public key in the registry must come with a valid signature. The registry only improves the guarantees of the protocol by attesting that each validator owns their key, and this key is a single key (not a sum of keys). Moreover, it allows potential DoS mitigations on the peer-to-peer network by filtering messages based on recovered signers. Therefore, those EOAs do not impact the security of the oracle contracts.

Oracles and validators are listed on ChronicleLabs' [public dashboard](https://chroniclelabs.org/dashboard). This allows anyone to verify the data cryptographically. The dashboard is not open-source, but this does not prevent the monitoring of the onchain activity from the side of projects using ChronicleLabs' oracles.

## Conclusion

LayerZero protocol exposes no centralized permissions on the validator set. This results in a _Low_ Centralization score.

> Overall score: Low

# Reviewer Notes

This review was limited to Endpoints deployed on Ethereum mainnet. We note that the findings should generalize to all chains according to LayerZero's documentation.

# Appendix

## Security Council

No permission owners

## Contracts

| Contract Name     | Address                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| EndpointV2        | [0x1a44076050125825900e736c501f859c50fE728c](https://etherscan.io/address/0x1a44076050125825900e736c501f859c50fE728c) |
| ReceiveUln302     | [0xc02Ab410f0734EFa3F14628780e6e695156024C2](https://etherscan.io/address/0xc02Ab410f0734EFa3F14628780e6e695156024C2) |
| SendUln302        | [0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1](https://etherscan.io/address/0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1) |
| ReadLib1002       | [0x74F55Bc2a79A27A0bF1D1A35dB5d0Fc36b9FDB9D](https://etherscan.io/address/0x74F55Bc2a79A27A0bF1D1A35dB5d0Fc36b9FDB9D) |
| Executor          | [0x173272739Bd7Aa6e4e214714048a9fE699453059](https://etherscan.io/address/0x173272739Bd7Aa6e4e214714048a9fE699453059) |
| BlockedMessageLib | [0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862](https://etherscan.io/address/0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862) |
| DeadDVN           | [0x747C741496a507E4B404b50463e691A8d692f6Ac](https://etherscan.io/address/0x747C741496a507E4B404b50463e691A8d692f6Ac) |
| OneSig            | [0xBe010A7e3686FdF65E93344ab664D065A0B02478](https://etherscan.io/address/0xBe010A7e3686FdF65E93344ab664D065A0B02478) |

## All Permission Owners

No permission owners

## Permissions

| Contract   | Function | Impact           | Owner  |
| ---------- | -------- | ---------------- | ------ |
| EndpointV2 | lift     | Some description | if any |
