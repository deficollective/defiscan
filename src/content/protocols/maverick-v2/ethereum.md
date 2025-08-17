---
chain: "Ethereum"
stage: "O"
reasons: ["Unverified Contracts"]
risks: ["L", "H", "M", "H", "H"]
author: ["CookingCryptos", "sagaciousyves"]
submission_date: "2024-10-23"
publish_date: "2024-10-23"
update_date: "1970-01-01"
stage_requirements:
  [
    [
      {
        text: "Assets are not in custody by a centralized entity",
        status: "fixed",
      },
      { text: "All contracts are verified", status: "unfixed" },
      { text: "Source-available codebase", status: "fixed" },
      { text: "Public documentation exists", status: "fixed" },
    ],
    [
      {
        text: "Upgrades with potential of “loss of funds” not protected with Exit Window >= 7 days OR a sufficient Security Council",
        status: "unfixed",
      },
      {
        text: "Dependencies with High centralization score and no mitigations.",
        status: "unfixed",
      },
      {
        text: "No Frontend backup or self-hosting option exists",
        status: "unfixed",
      },
    ],
    [
      {
        text: "Upgrades with potential of “loss of funds or unclaimed yield” not protected with onchain governance AND Exit Window >= 30 days",
        status: "unfixed",
      },
      {
        text: "Dependencies with High or Medium centralization score and no mitigations.",
        status: "unfixed",
      },
      { text: "No alternative third-party frontends exist", status: "unfixed" },
    ],
  ]
---

# Summary

Maverick is a DEX supporting concentrated liquidity positions for LPs and the automation thereof with the goal of increasing capital efficiency and market liquidity. This results in better prices for traders and more fees for liquidity providers. This built-in feature also helps LPs to eliminate the high gas fees that come from adjusting positions around price themselves.

Liquidity providers can also now choose to follow the price of an asset in a single direction, effectively making a bet on the price trajectory of a specific token. These directional bets are similar to single-sided liquidity strategies, in that the liquidity provider will be mostly or entirely exposed to a single asset in a given pool.

Together, these technological innovations represent a paradigm shift in the way smart contracts manage liquidity. Maverick is the first Dynamic Distribution AMM, capable of automating liquidity strategies that before now have required daily maintenance or the use of metaprotocols.

# Ratings

## Chain

Maverick v2 is deployed on Ethereum mainnet.

> Chain score: Low

## Upgradeability

Permissions on most contracts in the Maverick V2 protocol (e.g. `MaverickV2IncentiveMatcher`, `MaverickV2PoolLens`) have been revoked.

On other contracts permissions still exist and are not protected with adequate restrictions. In particular, the `MaverickToken` (MAV token) integrates with the _LayerZero_ protocol for cross-chain compatibility and exposes a number of permissioned functions. For example the `setTrustedRemote` allows the permission owner to add arbitrary MAV token implementations on other chains which, if flawed or malicious, can result in the arbitrary minting of MAV tokens. Similarly, the `setConfig` function enables designating custom cross-chain transaction data validators (DVNs) which, if flawed or malicious, can result in the operator sending arbitrary transaction data that is wrongly validated and executed.

As a result, these existing permissions potentially result in the arbitrary minting of new MAV tokens that dillute the overall supply and thus lead to the theft or loss of user funds (in particular unclaimed rewards that are distributed in the MAV token).

> Upgradeability score: High

## Autonomy

Maverick's protocol token (MAV) relies on the LayerZero protocol for cross-chain compatibility. The LayerZero protocol relies on permissioned validators (DVN). These validators are responsible for the validation of cross-chain transaction data created by users who want to bridge MAV tokens. Currently, Maverick has configured the "default" validator service which is [Google Cloud](https://medium.com/layerzero-official/layerzero-x-google-cloud-7b4784873071).

A failure of these validators requires manual intervention by the Maverick Multisig and can result in the temporary censoring of users and the freezing of their funds. In the current stage of the Maverick Protocol, this mostly affects users unclaimed (or claimed) rewards which are paid in MAV tokens on the various chains.

> Autonomy score: Medium

## Exit Window

The only two contracts in Maverick protocol that expose permissions are `MaverickToken` (MAV) and `MaverickV2Factory`. The permissions found on the first are not protected with an exit window for users.

Further, since `MaverickV2Factory` is not publicly verified, it remains unclear whether an exit window protects the permissions found in this contract.

> Exit Window score: High

## Accessibility

Liquidity on the Maverick-v2 DEX is available to traders through various aggregators including Odos, paraswap, 1Inch, 0x Protocol and Cow Swap.

However, LPs are able to access Maverick-v2, and their positions therein, only through a single user interface, app.mav.xyz. A backup solution, in case the interface is shutdown or users are censored, does not exist.

> Accessibility score: High

## Conclusion

The Maverick V2 Protocol falls into the _others_ category and not Stage 0 due to the unverified contracts which are not verified on public block explorers.

Despite this classification, our analysis shows that the Maverick V2 Protocol on Ethereum Mainnet receives _High_ centralization risk scores for _Upgradeability_, _Exit Window_, and _Accessibility_ dimensions and _Medium_ score for _Autonomy_.

> Overall score: Others

# Reviewer Notes

⚠️ The `MaverickV2Factory` is NOT verified on a public block explorer. For the `MaverickV2Factory` we currently rely on the technical documentation provided by the Maverick Team. As a consequence the full scope of permissions and their definitive impact cannot be assessed.

# Protocol Analysis

# Dependencies

Maverick Protocol relies on LayerZero for cross-chain communication and transaction validation.

LayerZero Protocol itself is immutable and fully permissionless. The protocol will exist indefinitely even if Layer0 Labs, the company that developed the LayerZero Protocol, ceases to exist. Layer0 Labs' role in the LayerZero protocol is reduced to deploying immutable _Endpoints_ on new chains. These endpoints reference each other and thereby enable the cross-chain communication network. If Layer0 Labs ceases to exist, no new chains are added to the cross-chain network, but the existing network is not affected.

The LayerZero Protocol further relies on a _Decentralized Validator Network_ (DVN), these are validators of transaction data that needs to move cross-chain. These validators are configured by the protocol, the Maverick Multisig in this case, with their security settings. If the configured DVNs fail, the Maverick Multisig needs to update its security settings and configure new DVNs. The DVNs themselves have a reputation and earn fees for the validating cross-chain transaction data and are thus incentivised to behave correctly and maintain an appropriate uptime. Maverick uses the "default" DVNs which is run by Google Cloud. Their DVN is deployed at the address: [0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc](https://etherscan.io/address/0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc) (deterministically deployed across all chains).

Any protocol that relies on LayerZero could choose to run their own DVN. A flawed or unstable DVN can result in downtimes and the temporary freezing of funds. A malicious DVN can run a malicious verifier algorithm allowing the operator to steal user funds.

Finally, the LayerZero Protocol relies on _Executors_ which trigger queued transactions on destination chains. The set of executors can be customised by the respective protocol, in this case maverick. However, it’s also fully permissionless, even if the designated executors do not execute the transaction on the destination chain, any user can step in and execute the transaction. Users' transactions can thus not be censored through the _Executor_ set.

According to their [docs](https://docs.mav.xyz/technical-reference/contract-addresses/v2-contract-addresses) the MAV token is currently deployed on the following chains through the LayerZero protocol:

- Arbitrum
- Base
- Mainnet
- zkSync Era
- Scroll
- BNB Chain

# Governance

## External Permission Owners and Security Council

| Name                  | Account                                                                                                               | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| Undeclared Multisig 1 | [0xcAf836A03D8ADcDfF48F6d0354061F468ae8b2A3](https://etherscan.io/address/0xcAf836A03D8ADcDfF48F6d0354061F468ae8b2A3) | Multisig 3/6 | ❌          | ❌              | ❌                | ❌             |
| Undeclared Multisig 2 | [0xA2206fe97eE8d2E689EFB96aE03be5F50BFAD027](https://etherscan.io/address/0xA2206fe97eE8d2E689EFB96aE03be5F50BFAD027) | Multisig 3/6 | ❌          | ❌              | ❌                | ❌             |

No information on the multisigs was found in the docs.

## Exit Window

The only two contracts that have some upgrade/change potential are the MaverickV2Factory and the MaverickToken.

MaverickV2Factory:
Since the full source code of MaverickV2Factory is not publicly verified, it’s not clear if fee switches are enforced immediately or not.

MaverickToken:
Token has no timelock for changes/upgrades. The OFT token when ownership is not renounced allows owners to switch destination addresses and security settings. Users do not have the option to opt-out with a waiting period before the change is applied.

# Contracts & Permissions

## Contracts

| Contract Name                     | Address                                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| MaverickV2Factory                 | [0x0A7e848Aca42d879EF06507Fca0E7b33A0a63c1e](https://etherscan.io/address/0x0A7e848Aca42d879EF06507Fca0E7b33A0a63c1e) |
| MaverickV2PoolLens                | [0x6A9EB38DE5D349Fe751E0aDb4c0D9D391f94cc8D](https://etherscan.io/address/0x6A9EB38DE5D349Fe751E0aDb4c0D9D391f94cc8D) |
| MaverickV2Quoter                  | [0xb40AfdB85a07f37aE217E7D6462e609900dD8D7A](https://etherscan.io/address/0xb40AfdB85a07f37aE217E7D6462e609900dD8D7A) |
| MaverickV2Router                  | [0x62e31802c6145A2D5E842EeD8efe01fC224422fA](https://etherscan.io/address/0x62e31802c6145A2D5E842EeD8efe01fC224422fA) |
| MaverickV2Position                | [0x116193c58B40D50687c0433B2aa0cC4AE00bC32c](https://etherscan.io/address/0x116193c58B40D50687c0433B2aa0cC4AE00bC32c) |
| MaverickV2BoostedPositionFactory  | [0xd94C8f6D13Cf480FfAC686712C63471D1596cc29](https://etherscan.io/address/0xd94C8f6D13Cf480FfAC686712C63471D1596cc29) |
| MaverickV2BoostedPositionLens     | [0x12DD145927CECF616cbD196789c89C2573A53244](https://etherscan.io/address/0x12DD145927CECF616cbD196789c89C2573A53244) |
| MaverickV2IncentiveMatcherFactory | [0x924Dd05c2325829fa4063CAbE1456273084009d7](https://etherscan.io/address/0x924Dd05c2325829fa4063CAbE1456273084009d7) |
| MaverickV2VotingEscrowFactory     | [0x451d47fd6207781dc053551edFD98De8d5EB4Cda](https://etherscan.io/address/0x451d47fd6207781dc053551edFD98De8d5EB4Cda) |
| MaverickV2RewardFactory           | [0x63EF1a657cc53747689B201aa07A76E9ef22f8Fe](https://etherscan.io/address/0x63EF1a657cc53747689B201aa07A76E9ef22f8Fe) |
| MaverickV2RewardRouter            | [0xc0C3BC532690af8922a2f260c6e1dEb6CFaB45A0](https://etherscan.io/address/0xc0C3BC532690af8922a2f260c6e1dEb6CFaB45A0) |
| MaverickV2VotingEscrowLens        | [0x102f936B0fc2E74dC34E45B601FaBaA522f381F0](https://etherscan.io/address/0x102f936B0fc2E74dC34E45B601FaBaA522f381F0) |
| MaverickToken                     | [0x7448c7456a97769F6cD04F1E83A4a23cCdC46aBD](https://etherscan.io/address/0x7448c7456a97769F6cD04F1E83A4a23cCdC46aBD) |
| LegacyMaverickVe                  | [0x4949Ac21d5b2A0cCd303C20425eeb29DCcba66D8](https://etherscan.io/address/0x4949Ac21d5b2A0cCd303C20425eeb29DCcba66D8) |
| MaverickVeV2                      | [0xC6addB3327A7D4b3b604227f82A6259Ca7112053](https://etherscan.io/address/0xC6addB3327A7D4b3b604227f82A6259Ca7112053) |
| MaverickTokenIncentiveMatcher     | [0x9172a390Cb35a15a890293f59EA5aF250b234D55](https://etherscan.io/address/0x9172a390Cb35a15a890293f59EA5aF250b234D55) |

## All Permission Owners

| Name                  | Account                                                                                                               | Type         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Undeclared Multisig 1 | [0xcAf836A03D8ADcDfF48F6d0354061F468ae8b2A3](https://etherscan.io/address/0xcAf836A03D8ADcDfF48F6d0354061F468ae8b2A3) | Multisig 3/6 |
| Undeclared Multisig 2 | [0xA2206fe97eE8d2E689EFB96aE03be5F50BFAD027](https://etherscan.io/address/0xA2206fe97eE8d2E689EFB96aE03be5F50BFAD027) | Multisig 3/6 |

## Permissions

| Contract                   | Function                  | Impact                                                                                                                                                                                                                                                                           | Owner                                                             |
| -------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| MaverickV2Factory          | setProtocolFeeRatio       | This function allows the owner of the permission to set the protocol fee. Fees are applied to every trade in the AMM.                                                                                                                                                            | Undeclared Multisig 2                                             |
| MaverickV2Factory          | setProtocolLendingFeeRate | Set the protocol lending fee rate.                                                                                                                                                                                                                                               | Undeclared Multisig 2                                             |
| MaverickV2Factory          | setProtocolFeeReceiver    | Set the protocol fee receiver address. If protocol fee is non-zero, user will be able to permissionlessly push protocol fee from a given pool to this address.                                                                                                                   | Undeclared Multisig 2                                             |
| MaverickV2Factory          | transferOwnership         | This function allows the owner of the permissions to transfer the ownership of all of the contract’s permission to a new owner.                                                                                                                                                  | Undeclared Multisig 2                                             |
| MaverickV2Factory          | renounceOwnership         | This function allows the owner of the permission to disable the access to permissioned functions for everybody for ever. Parameters that were set with this functions are frozen to the respective values.                                                                       | Undeclared Multisig 2                                             |
| MaverickV2IncentiveMatcher | permissionedAddIncentives | permissionedAddIncentives allows users to commit additional incentives for an already boosted position on Maverick. The function can only be called through MaverickV2IncentiveMatcherCaller contract 0x1e83a61839839EAdBB5C639fbf581E2C59d645dE ( The permission is immutable ) | 0x1e83a61839839EAdBB5C639fbf581E2C59d645dE (Immutable permission) |
| Maverick Token (OFT)       | setUseCustomAdapterParams | The owner is allowed to set a flag (bool) whether or not to use a custom DVN adapter, if true, adapterParams need to be submitted when doing cross-chain transfers.                                                                                                              | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setConfig                 | This function allows the owner to set the security stack settings inside LayerZero protocol. Security stack settings include designated DVNs, how many block confirmations                                                                                                       | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setSendVersion            | This function allows the owner to set the messaging library version on origin chain.                                                                                                                                                                                             | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setReceiveVersion         | This function allows the owner to set the messaging library version any of the receiving chains.                                                                                                                                                                                 | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | forceResumeReceive        | This function allows the owner to resume the message flow in blocking mode and clear the stored payload.                                                                                                                                                                         | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setTrustedRemote          | This function allows the owner to set the trusted path for the cross-chain communication, from origin address to destination address. This could be mis-used to point to a malicious implementation on the destination chain.                                                    | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setTrustedRemoteAddress   | This function is similar to setTrustedRemote, but it allows the owner only to set the destination address.                                                                                                                                                                       | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setPrecrime               | The owner is allowed to set an address for precrime . It’s unclear for what precrime is used.                                                                                                                                                                                    | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setMinDstGas              | The owner is allowed to set a minimal gas amount for a destination chain. The destination chain is specified with the chainId.                                                                                                                                                   | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | setPayloadSizeLimit       | The owner is allowed to set a limit to the payload size, again for each destination chain individually.                                                                                                                                                                          | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | renounceOwnership         | The owner can renounce ownership, making the contract immutable regarding the aforementioned settings, otherwise the contract continues to work as-is. Note: Technically the owner is now the 0-address.                                                                         | Undeclared Multisig 1                                             |
| Maverick Token (OFT)       | transferOwnership         | The owner can transfer the ownership to another address, which then receives the permissions to call the aforementioned functions and change settings of the OFT token.                                                                                                          | Undeclared Multisig 1                                             |
