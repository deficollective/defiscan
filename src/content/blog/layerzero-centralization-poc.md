---
title: "Layer Zero Centralization Risk"
description: "We discuss the centralization risk of Protocols integrating Layer Zero."
date: 2025-09-26T13:00:00Z
published: true
categories: ["Research"]
authors: ["yvesboutellier"]
tags: ["Research", "Decentralization", "Infrastructure"]
---

Few months ago we started releasing reports on the decentralization of infrastructure protocols which DeFi protocols rely upon. Today we are releasing a report on the centralization risk of protocols integrating Layer Zero. In this blog article we demonstrate a proof of concept with a link to a repository on how a project that is built on top of Layer Zero can be compromised by centralizing the verifier set within Layer Zero configurations of a protocol. We also referenced Layer Zero in one of our existing reports and assess [Maverick V2](link) with our analysis derived from the PoC and the [infrastructure risk report](link).

At DeFiScan we push for transparency and inform the ecosystem on centralization risks by exposing upgradeability and autonomy in the smart contract architecture of DeFi protocols.

## Layer Zero

Layer Zero is a cross chain messaging protocol that allows for the transfer of value and data between different blockchains. It composed of a few building blocks. To be specific, let's say we have Ethereum Mainnet and Arbitrum as our two chains. On each chain we have an endpoint contract that acts as entry gate for crosschain communication. Imagine we analyse a protocol that is built on top of Layer Zero and we have a contract on each chain that is connected to the endpoint contract. If users want to transfer value from Ethereum Mainnet to Arbitrum, our smart contract on Ethereum Mainnet will call the endpoint contract on Ethereum Mainnet and if our contract is a token for example it either burns the tokens or locks it on Ethereum Mainnet. The call from our token contract to the endpoint contract will emit an event that is picked up by our configured verifier network or if we have not configured a verifier network we will use the default verifier network configured by Layer Zero. These configured verifier networks run offchain algorithms that listen to these blockchain emitted events and verify the events. Each configured verifier network if they deem the transaction as valid will call on the destination network (in our example case Arbitrum) the receiver library and verify the transaction to be executed. This verification marked onchain includes the details of the source and destination of the message and the payload that has to be executed on the destination network. In a next step if all required verifiers have verified the message, the verification can be committed, which means the message is executable on the destination network. Any actor can call the receive function on the Arbitrum endpoint contract to execute the message, which calls our contract on Arbitrum with the verified payload.

## Upgradeability within Layer Zero

The configuration of the verifier set within Layer Zero is upgradeable. This means that the verifier set can be changed by the protocol that is built on top of Layer Zero.

## Proof of Concept

In this section we will show a proof of concept of how a project that is built on top of Layer Zero can be compromised by centralizing the verifier set within Layer Zero configurations of a protocol.

In Layer Zero each project either relies on the default configuration or configures their own verifier set.

The default configuration is a set of verifiers that are chosen by the Layer Zero team.

## Preliminary Step (Step 0 and Step 1)

In a first step the attacker takes control over the account which is the owner of the smart contract that is built on top of Layer Zero. To make the PoC easier to follow the attacker transfers the ownership of the smart contract to an EOA spun up by the attacker.

## Step 2

Next, the attacker sets the configuration within an endpoint on a chain he wants to exploit. For example this could be Ethereum Mainnet.

The verifier set can be changed to a set of verifiers that are controlled by the attacker (the array `requiredDVNs` just holds one address, requiredDVNCount is one). This could be simply an EOA which crafts a payload that the attacker wants to be executed, verifies this message and commits it to the destination chain. With a single required verifier and minimal confirmations required the attack can happen almost instantly. If the integrating contract is a token for example, the attacker could simply mint or unlock tokens on any of the configured blockchains.

```solidity
    UlnConfig memory uln = UlnConfig({
        confirmations: 1, // minimum block confirmations required on A before sending to B
        requiredDVNCount: 1, // number of DVNs required
        optionalDVNCount: type(uint8).max, // optional DVNs count, uint8
        optionalDVNThreshold: 0, // optional DVN threshold
        requiredDVNs: requiredDVNs, // sorted list of required DVN addresses
        optionalDVNs: optionalDVN // sorted list of optional DVNs
    });
```

## Step 3

The attacker calls `verify()` on the receiving library with the payload he wants to execute. This will verify the payload. If the integrating contract is an OFT, the payload is just the receiving address and the amount scaled by the shared decimals. To complete the payload, a global unique identifier (guid) is appended at the beginning, this number can be random. The payload is hashed and submitted.

Additionally, the a packetheader is supplied which specifies the source and destination contract and chain id of the message path, the nonce of the message and the packet version.

```
// payload hash
bytes memory _message = abi.encodePacked(
    bytes32(uint256(uint160(attacker))), // address padded to 32 bytes
    uint64(AMOUNT_TO_STEAL) // amount in shared decimals
);

bytes32 _guid = bytes32(uint256(69)); // guid is a global unique identifier
bytes memory payload = abi.encodePacked(_guid, _message);
bytes32 _payloadHash = keccak256(payload);
uint64 nonce = 3; // we did one incoming tx on mainnet from arbitrum until now, (0 not init, 1 one tx)

IReceiveUln302 uln = IReceiveUln302(ulnAddress);

// packetversion: 1 byte
// nonce: 8 bytes
// srcEid: 4 bytes
// sender: 32 bytes
// dstEid: 4 bytes
// receiver: 32 bytes
// total: 81 bytes
bytes memory _packetHeader = abi.encodePacked(packetVersion, nonce, srcEid, sender, dstEid, receiver);
```

The EndpointV2 contract will later check if this payload has been verified by the required verifiers (what we just did).

## Step 4

The attacker calls `commitVerification` on the receiving library with the same payload hash and packet header as the verify call. This will commit the verification to the destination chain. That menas the payload hash is stored inside the EndpointV2 contract.

This call will revert if the payload hash or packet header do not match the verify call and if the required verifiers have not verified the payload, but we just did in Step 3.

## Step 5

We can call `lzReceive` on the `EndpointV2` contract with a message if hashed is equal to the payload hash we submitted in Step 3 and 4. This will execute the payload on the destination chain.

```
bytes memory _message = abi.encodePacked(
    bytes32(uint256(uint160(attacker))), // address padded to 32 bytes
    uint64(AMOUNT_TO_STEAL) // amount in shared decimals
);

// MALICIOUS: We dont use packet's data from event but our attack params, that we have verified and comitted
ILayerZeroEndpointV2(endpoint).lzReceive(_origin, OFT_ADDRESS_MAINNET, _guid, _message, _extraData);
```

## Severity

The severity of the attack vector depends on the contract that is built on top of Layer Zero. If the contract is an OFT, the severity is high as the attacker can steal any amount of tokens.

The severity is comparable with an upgradeable token contract, as the upgrade can include seizing funds. However, compared to a non-upgradeable token with fixed supply, introducing Layer Zero integration increases the risk of centralization.

## Mitigation

Only a designated delegate of a OApp/OFT or integrating contract can configure the verifier set as in Step 2).
In order to prevent this attack vector or it's likelihood, the following options exist

1. the verifier set is immutable, no delegate is configured for the OApp/OFT and no delegate can be configured, this is achieved by overriding `setDelegate` function inside the integrating contract and disable the function. This comes with the tradeoff that the verifier set cannot be changed in the future and if the verifier stops working or is discontinued, new contracts need to be deployed to for example recover funds
2. the verifier set is mutable, but the ownership and the registered delegate of the OApp/OFT belongs to a multisig account that satisfies the security council requirements or an onchain governance process that has distributed voting power. This makes compromise and exploit attempts more difficult.

## Shared vs isolated security

Layer Zero brought the concept of shared security to crosschain communication, where each DApp can configure their own verifier set and their requirements. This allows for scaling up the security budget when the App grows and change partners who are trusted in a modular way, but also introduces a new risk of centralization and requires a lot more effort in monitoring from the side of the community. As in contrast with bridges that are shared between many DApps.

## Risk through Layer Zero Labs

Layer Zero Labs manages the default verifier set, which is used by default when an app has no verifier configured. If Layer Zero Labs were to be compromised, the default verifier set could be compromised as well, leading to attacks on all DApps that use the default verifier set.

## Closing remarks

Layer Zero is a powerful tool for crosschain communication, but it also introduces new risks of centralization. It is important to be aware of these risks and to take appropriate measures to mitigate them. We hope this article has helped you understand the risks of centralization in Layer Zero and the importance of taking appropriate measures to mitigate them.

## Disclaimer

This article is for educational purposes only. The authors are not liable for any loss or damage arising from the use of this article.
