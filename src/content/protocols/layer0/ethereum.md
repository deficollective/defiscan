---
chain: "Ethereum"
type: "Bridge"
logo: "/images/infrastructure-logos/LayerZero.png"
stage: "I0"
protocols: ["maverick-v2"]
reasons: []
risks: ["L", "H", "L", "M", "L"]
author: ["sagaciousyves"]
submission_date: "2025-05-07"
publish_date: "2025-05-15"
update_date: "2025-06-18"
---

# Summary

LayerZero is a crosschain protocol that allows for the transfer of data and assets between chains. It is a permissionless protocol, meaning that any app can use the protocol for moving messages and tokens between chains. LayerZero relies on a Decentralized Validator Network (DVN) which validate transaction data that needs to move crosschain. LayerZero allows each protocol that integrates the crosschain protocol to configure their own security stack (DVNs) and executors.

# Protocol Analysis

todo: cover timeout

<!-- ![Overview of LayerZero](../diagrams/layerzero-overview.png) -->

For moving messages and tokens across chains, protocol contracts post the data that has to be moved crosschain to the `EndpointV2` contract on the source chain. This `EndpointV2` contract subsequently sends the data to a configured sending library that encodes the data and takes care of paying the verifiers (DVNs) and the Executor for verifying and executing the crosschain messages. After that, the `EndpointV2` contract emits an event (`PacketSent`) that has to be picked up by the configured and responsible DVNs.

Once picked up and verified, the DVNs attest the verification of the crosschain messages to the configured Receive Library contract (`ReceiveUln302.verify(...)`) on the destination chain. When the threshold is met, any account can call `commitVerification` on the destination chain to stage the message for execution.

In an additional step the executor executes the targeted message on the destination chain by calling `lzReceive`. If the designated executor does not execute the transaction on the destination chain, any user can step in and execute the transaction. Executing validated messages is permissionless. Users' transactions can thus not be censored once verified by the DVNs on the destination chain. `lzReceive` calls the target contract which is the OApp, OFT or custom contract.

# Rating

The risk of crosschain messaging lies in the execution of fraudulent messages on the destination chain and in censoring the transaction from moving crosschain. For example, if the bridged message is permissioned to mint tokens, a malicious DVN could mint tokens for themselves instead of the user's intended address on the destination chain. In the case of LayerZero, registering as a DVN is permissionless, thus also malicious DVNs can be registered to the LayerZero protocol. .

The following sections examine the roles of LayerZero Labs, DVNs and integrating protocols and risks associated with each role.

## LayerZero Labs

LayerZero endpoints are not upgradeable. LayerZero Labs' role in the LayerZero protocol is to; 1) deploy Endpoints on new chains, 2) add libraries to the LayerZero protocol, 3) set default libraries and 4) change default DVNs. The existing endpoints and default configurations are not affected if LayerZero Labs ceases to exist.

The [OneSig](#security-council) multisig can change the default DVNs that verify crosschain messages with the function `setDefaultUlnConfigs`. If integrating protocols have no security stack / DVNs configured, their OApps/OFTs will fallback to the default DVN setup. In case LayerZero would setup a malicious DVN, this could lead to _loss of funds_.

Furthermore, the [OneSig](#security-council) multisig can change default libraries and the ownership over the `EndpointV2` contract. The send library (latest version is `SendUln302`) is used to encode the data that is sent to the destination chain. Additionally, the send library handles the payment of the verifiers (DVNs) and the executor for verifying and executing the crosschain messages. If integrating protocols have no libraries configured, they will use the default libraries. If the default send library is updated, integrating protocols that have not configured a library will be forced to use the new default library. If the default library is updated to a library that does not handle the payment of verifiers (DVNs) and the executor, it could lead to censorship as DVNs are not incentivized to validate crosschain transactions.

Currently, the default DVNs for each path can be looked up at this page: https://layerzeroscan.com/tools/defaults

## DVNs

DVNs are trusted to verify the crosschain transaction data, if they choose to not verify, it would block and censor crosschain transactions.

Moreover, if the required DVNs collude they could collectively verify a fraudulent transaction on the target chain, as a fraudulent transfer of tokens, which would result in _loss of funds_. If just a single DVN is configured, it could also verify a fraudulent transaction on the target chain, as a fraudulent transfer of tokens, which would result in _loss of funds_.

Risks from specific DVNs are not included into the score of this infrastructure, but are reviewed on a case-by-case basis for integrating protocols.

## Integrating Protocols (OApps, OFTs and custom integrations)

Protocols that integrate LayerZero for crosschain bridging are responsible to configure DVNs and Executors. The configuration remains upgradeable at all times. If protocols choose not to configure the DVNs or libraries, the LayerZero protocol falls back to defaults that were set by [OneSig](#security-council). If protocols rely on a limited and narrow DVN set and permissioned Executor set, it could result in censorship and _loss of funds_ for users of the protocol. To be censorship resistant it is thus important to rely on a diverse set of DVNs. In case of censorship the protocol needs to update configuration and require new DVNs to relay the messages and token transfers or reimburse its users if tokens have been burnt/locked.

Moreover, if the protocol owner (DAO, multisig, EOA) or is compromised and it configures a malicious security stack (DVN), it could result in _loss of funds_ if the malicious DVN(s) approves and relays a fraudulent transfer.

Lastly, the protocol owner can change the peer contract on the destination chain (`setPeer`) to a malicious contract if the contract is not upgradeable, or upgrade the peer contract if it is upgradeable. This could result in _loss of funds_ for users of the protocol.

It is essential that the integrating protocol guards permission over DVN configuration as malicious configuration can result in _loss of funds_ for users of the protocol at any time

Risks from integrating protocols are not included into the score of this infrastructure, but are reviewed on a case-by-case basis.

## Conclusion

LayerZero protocol exposes centralized permissions on the default validator set that is used if the protocol owner does not configure a security stack. This results in a _High_ Centralization score.

Furthermore, integrating protocols need to be evaluated additionally on their current configured security stack, the control on configuring the security stack and upgradeability on _OApps_ and _OFTs_.

> Overall score: High

# Reviewer Notes

- This review was limited to Endpoints and associated libraries deployed on Ethereum mainnet. We note that the findings should generalize to all chains according to LayerZero's documentation.
- LayerZero simplifies integration for protocols with the OApp and OFT contracts
- Each integrating protocol (OApp, OFT, or custom integration) sets up configuration for a specific path from chain A to chain B. The configuration from chain B to chain A is an separate configuration and as a consequence can be different.
- Security stack, verifiers and DVNs are synonymous.

# Appendix

### Protocols

OApps and OFTs can configure their DVNs by calling `EndpointV2.setConfig`. They need to specify through which library the crosschain transaction is initiated. DVNs configured are specified per library. Libraries are configured with `EndpointV2.setSendLibrary` and `EndpointV2.setReceiveLibrary`.

OApps and OFTs are further configurable with

- `OApp.transferOwnership(newOwner)`
- `OApp.setPeer(dstEid, peer)`
- `OApp.setEnforcedOptions()`

scope this article
EndpointV2.setSendLibrary(OApp, dstEid, newLib)
EndpointV2.setReceiveLibrary(OApp, dstEid, newLib, gracePeriod)
EndpointV2.setReceiveLibraryTimeout(OApp, dstEid, lib, gracePeriod)
EndpointV2.setConfig(OApp, sendLibrary, sendConfig)
EndpointV2.setConfig(OApp, receiveLibrary, receiveConfig)
EndpointV2.setDelegate(delegate)

## Security Council

| Multisig / Role | Address                                                                                                               | Type         | At least 7 signers | At least 51% threshold | ≥50% non-insider signers | Signers publicly announced |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ---------------------- | ------------------------ | -------------------------- |
| OneSig          | [0xBe010A7e3686FdF65E93344ab664D065A0B02478](https://etherscan.io/address/0xBe010A7e3686FdF65E93344ab664D065A0B02478) | Multisig 3/5 | ❌                 | ✅                     | ❌                       | ❌                         |

## Contracts

| Contract Name                                         | Address                                                                                                               |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| EndpointV2                                            | [0x1a44076050125825900e736c501f859c50fE728c](https://etherscan.io/address/0x1a44076050125825900e736c501f859c50fE728c) |
| ReceiveUln302                                         | [0xc02Ab410f0734EFa3F14628780e6e695156024C2](https://etherscan.io/address/0xc02Ab410f0734EFa3F14628780e6e695156024C2) |
| SendUln302                                            | [0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1](https://etherscan.io/address/0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1) |
| ReadLib1002                                           | [0x74F55Bc2a79A27A0bF1D1A35dB5d0Fc36b9FDB9D](https://etherscan.io/address/0x74F55Bc2a79A27A0bF1D1A35dB5d0Fc36b9FDB9D) |
| OptimizedTransparentUpgradeableProxy (Executor Proxy) | [0x173272739Bd7Aa6e4e214714048a9fE699453059](https://etherscan.io/address/0x173272739Bd7Aa6e4e214714048a9fE699453059) |
| Unverified Executor (Implementation)                  | [0xfe9ab78ed4f9f3dbb168d9f5e5213d78605c9805](https://etherscan.io/address/0xfe9ab78ed4f9f3dbb168d9f5e5213d78605c9805) |
| ProxyAdmin                                            | [0xa36797bA947b378AefE5f726Cd87766CD3c25Ee3](https://etherscan.io/address/0xa36797bA947b378AefE5f726Cd87766CD3c25Ee3) |
| BlockedMessageLib                                     | [0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862](https://etherscan.io/address/0x1ccbf0db9c192d969de57e25b3ff09a25bb1d862) |
| DeadDVN                                               | [0x747C741496a507E4B404b50463e691A8d692f6Ac](https://etherscan.io/address/0x747C741496a507E4B404b50463e691A8d692f6Ac) |
| OneSig                                                | [0xBe010A7e3686FdF65E93344ab664D065A0B02478](https://etherscan.io/address/0xBe010A7e3686FdF65E93344ab664D065A0B02478) |
| Treasury                                              | [0x5ebB3f2feaA15271101a927869B3A56837e73056](https://etherscan.io/address/0x5ebB3f2feaA15271101a927869B3A56837e73056) |

## All Permission Owners

| Name         | Account                                                                                                               | Type |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | ---- |
| Executor EOA | [0xe93685f3bba03016f02bd1828badd6195988d950](https://etherscan.io/address/0xe93685f3bba03016f02bd1828badd6195988d950) | EOA  |

## Permissions

| Contract      | Function                        | Impact                                                                                                                                                                                                                                                                                                                      | Owner                                                                          |
| ------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| EndpointV2    | sendCompose                     | ...                                                                                                                                                                                                                                                                                                                         | []                                                                             |
| EndpointV2    | registerLibrary                 | This function allows new libraries to be used. New libraries are not automatically active for existing apps, apps need to actively add new libraries to their configurations. Unless the app does not have any library configured, and the default is newly set with `setDefaultSendLibrary` or `setDefaultReceiveLibrary`. | OneSig                                                                         |
| EndpointV2    | setDefaultSendLibrary           | This function allows to set the default send library. Send libraries currently handle the payment of verifiers (DVNs) and of the executor and encoding of the message. Setting a new library that does not handle the payment could lead to currently disabling the payment of verifiers (DVNs) and of the executor.        | OneSig                                                                         |
| EndpointV2    | setDefaultReceiveLibrary        | This function allows to set the default receive library. Setting a new library that does not handle the payment could lead to currently disabling the payment of verifiers (DVNs) and of the executor.                                                                                                                      | OneSig                                                                         |
| EndpointV2    | setDefaultReceiveLibraryTimeout | This function allows to set the default library that is used when there is a timeout on the receiving destination. The confirmation of the message would go through the defaultReceiveLibraryTimeout instead of the defaultReceiveLibrary.                                                                                  | OneSig                                                                         |
| EndpointV2    | setSendLibrary                  | Allows the OApp or OFT owner to configure an already registered library for sending messages.                                                                                                                                                                                                                               | OApp or delegates of OApp                                                      |
| EndpointV2    | setReceiveLibrary               | Allows the OApp or OFT owner to configure an already registered library for receiving messages.                                                                                                                                                                                                                             | OApp or delegates of OApp                                                      |
| EndpointV2    | setReceiveLibraryTimeout        | Allows the OApp or OFT owner to configure an already registered library as fallback, if the there is a timeout.                                                                                                                                                                                                             | OApp or delegates of OApp                                                      |
| EndpointV2    | setConfig                       | The permission owner can configure DVNs and verification thresholds. IF a malicious DVN is configured, it can lead to loss of funds for users.                                                                                                                                                                              | OApp or delegates of OApp                                                      |
| EndpointV2    | renounceOwnership               | If ownership over this contract is renounced, the owner will no longer be able to register libraries and set default libraries.                                                                                                                                                                                             | OneSig                                                                         |
| EndpointV2    | transferOwnership               | Transfers ownership of the contract to a new account.                                                                                                                                                                                                                                                                       | OneSig                                                                         |
| EndpointV2    | skip                            | Skipping the next nonce to prevent message verification                                                                                                                                                                                                                                                                     | OApp or delegates of OApp                                                      |
| EndpointV2    | nilify                          | Marks a packet as verified, but disallows execution until it is re-verified.                                                                                                                                                                                                                                                | OApp or delegates of OApp                                                      |
| EndpointV2    | burn                            | Marks a nonce as unexecutable and un-verifiable. The nonce can never be re-verified or executed.                                                                                                                                                                                                                            | OApp or delegates of OApp                                                      |
| EndpointV2    | send                            | This function is called by the OApp to initiate a crosschain message which emits the event `MessageSent` that has to be picked up by configured DVNs.                                                                                                                                                                       | OApp                                                                           |
| EndpointV2    | clear                           | This function allows to clear a message, which means the cleared message can be ignored by the app and can never be executed.                                                                                                                                                                                               | OApp or delegates of OApp                                                      |
| EndpointV2    | setLzToken                      | Allows the owner of the contract to set the LayerZero token which can be used for payment.                                                                                                                                                                                                                                  | OneSig                                                                         |
| EndpointV2    | recoverToken                    | Allows the owner of the contract to recover ERC20 tokens that were sent to the address by mistake.                                                                                                                                                                                                                          | OneSig                                                                         |
| ReceiveUln302 | setDefaultUlnConfigs            | This function allows the permission owner to set the default DVNs. If protocols have no security stack / DVNs configured, they will fallback to the default configs setup. In case LayerZero would setup a malicious security stack, this could lead to loss of funds upon crosschain transactions.                         | OneSig                                                                         |
| ReceiveUln302 | renounceOwnership               | If the owner calls this function the default configuration, ie. default DVN and thresholds will become immutable for this library. The owner of the EndpointV2 contract still can register a new library and specify a different default configuration.                                                                     | OneSig                                                                         |
| ReceiveUln302 | transferOwnership               | This function allows the owner to transfer ownership to a new account. This account can set the default DVN and thresholds.                                                                                                                                                                                                 | OneSig                                                                         |
| ReceiveUln302 | setConfig                       | This function is called by the EndpointV2 contract and stores the new configuration for the OApp that called the EndpointV2 contract.                                                                                                                                                                                       | EndpointV2                                                                     |
| SendUln302    | send                            | This function is called by the EndpointV2 contract to create the encoded data packet that will be picked up by DVNs. With this function DVNs and executors are paid.                                                                                                                                                        | EndpointV2                                                                     |
| SendUln302    | setTreasury                     | Fees paid to LayerZero protocol are send to the address that is labelled as treasury. This function updates the address that is labelled as treasury.                                                                                                                                                                       | OneSig                                                                         |
| SendUln302    | withdrawLzTokenFee              | This allows the address labelled as treasury to withdraw the fees that accumulated.                                                                                                                                                                                                                                         | Treasury                                                                       |
| SendUln302    | setDefaultExecutorConfigs       | This function sets the default executor that triggers lzReceive when a message is verified.                                                                                                                                                                                                                                 | OneSig                                                                         |
| SendUln302    | setTreasuryNativeFeeCap         | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| SendUln302    | renounceOwnership               | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| SendUln302    | transferOwnership               | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| SendUln302    | setDefaultUlnConfigs            | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| SendUln302    | setConfig                       | ...                                                                                                                                                                                                                                                                                                                         | ['onlyEndpoint']                                                               |
| ReadLib1002   | setDefaultReadLibConfigs        | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| ReadLib1002   | renounceOwnership               | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| ReadLib1002   | transferOwnership               | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| ReadLib1002   | setTreasury                     | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| ReadLib1002   | setTreasuryNativeFeeCap         | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| ReadLib1002   | send                            | ...                                                                                                                                                                                                                                                                                                                         | ['onlyEndpoint']                                                               |
| ReadLib1002   | setConfig                       | ...                                                                                                                                                                                                                                                                                                                         | ['onlyEndpoint']                                                               |
| ReadLib1002   | withdrawLzTokenFee              | ...                                                                                                                                                                                                                                                                                                                         | []                                                                             |
| OneSig        | setExecutorRequired             | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| OneSig        | setExecutor                     | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| OneSig        | setThreshold                    | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| OneSig        | setSigner                       | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| OneSig        | setSeed                         | ...                                                                                                                                                                                                                                                                                                                         | OneSig                                                                         |
| OneSig        | executeTransaction              | This function allows arbitrary calls to arbitrary destinations (batch). The function requires that 3 out of 5 signers sign the transactions. The execution can also be done by the Executor of the OneSig contract.                                                                                                         | any Signer or Executor of the OneSig, need to supply signatures with 3/5 votes |

## Signers of OneSig

| Name            | Account                                                                                                               | Type |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | ---- |
| OneSig Signer 1 | [0x0cb72C1F6a36c225A7E2B21712E8853A4A1acc47](https://etherscan.io/address/0x0cb72C1F6a36c225A7E2B21712E8853A4A1acc47) | EOA  |
| OneSig Signer 2 | [0x5bC6AA6ad117A8B50ABf9E1658971f5DA1968c5c](https://etherscan.io/address/0x5bC6AA6ad117A8B50ABf9E1658971f5DA1968c5c) | EOA  |
| OneSig Signer 3 | [0x73E9c017Ad37e2113e709D8070Cc9E1b28180e1e](https://etherscan.io/address/0x73E9c017Ad37e2113e709D8070Cc9E1b28180e1e) | EOA  |
| OneSig Signer 4 | [0x771dcAcB96024d1e55Fd21Fe8a8187AA7EC9e77e](https://etherscan.io/address/0x771dcAcB96024d1e55Fd21Fe8a8187AA7EC9e77e) | EOA  |
| OneSig Signer 5 | [0xe67DB04d7eFF4e9ec282eD929632D4FF058112d7](https://etherscan.io/address/0xe67DB04d7eFF4e9ec282eD929632D4FF058112d7) | EOA  |
