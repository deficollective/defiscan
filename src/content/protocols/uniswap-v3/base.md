---
protocol: "Uniswap-V3"
website: "https://uniswap.org/"
x: "https://x.com/uniswap"
github:
  [
    "https://github.com/Uniswap/v3-core",
    "https://github.com/Uniswap/v3-periphery/",
  ]
defillama_slug: ["uniswap-v3"]
chain: "Base"
stage: 1
reasons: ["Unverified Contracts"]
risks: ["M", "L", "L", "L", "L"]
author: ["mmilien", "CookingCryptos"]
submission_date: "2025-01-16"
publish_date: "2025-01-22"
update_date: "2025-01-31"
stage_requirements:
  [
    [
      {
        text: "Assets are not in custody by a centralized entity",
        status: "fixed",
      },
      { text: "Source-available codebase", status: "fixed" },
      { text: "Public documentation exists", status: "fixed" },
    ],
    [
      {
        text: "Upgrades have no potential of “loss of funds“ ",
        status: "fixed",
      },
      {
        text: "Dependency with a High centralization score is mitigated",
        status: "fixed",
      },
      {
        text: "Frontend backups or self-hosting option exists",
        status: "fixed",
      },
    ],
    [
      {
        text: "Upgrades have no potential of “loss of funds or unclaimed yield“",
        status: "fixed",
      },
      { text: "There are no external dependencies", status: "fixed" },
      { text: "Alternative third-party frontends exist", status: "fixed" },
    ],
  ]
---

# Summary

Uniswap v3 is an AMM that builds upon Uniswap v2 by introducing a concentrated liquidity model, providing liquidity providers with granular control over capital allocation. Unlike v2, where liquidity is distributed uniformly across all price ranges, v3 allows LPs to specify custom price ranges in which their liquidity is active. This approach significantly improves capital efficiency, as LPs can concentrate their assets in high-demand price ranges, earning fees only within those specified ranges.
Uniswap v3 also introduces multiple fee tiers (0.01%, 0.05%, 0.3%, and 1%) to support different asset volatility profiles, allowing LPs to adjust their fee preferences based on expected risk and return. Additionally, it incorporates "range orders," which effectively turn liquidity positions into limit orders, further enhancing LP strategy flexibility.
The protocol is deployed across multiple chains enabling a wide range of use cases across decentralized finance (DeFi) applications.

# Ratings

## Chain

Uniswap v3 is deployed on various chains. This review is based on the Base chain, an Ethereum L2 in Stage 1 according to L2BEAT.

> Chain score: Medium

## Upgradeability

Two potential upgrades can be implemented for the contracts deployed on Base that comprise the Uniswap V3 deployment:

1. Adjusting the Fee Parameter
2. Updating the `NonFungibleTokenPositionDescriptor` Implementation (via the proxy upgradeable pattern)

These updates require a governance vote on the Ethereum chain through Uniswap's on-chain governance system. The execution of this vote is trustless but involves the Base (Optimism stack) native cross-chain messaging protocol. This protocol cannot censor governance vote results and hence does not introduce new risks.

Beyond these updates, the protocol’s contracts are immutable. No entity has the ability to pause, revert trade execution, or alter the protocol's behavior in any other way. Importantly, no user funds or unclaimed yield are impacted by the remaining permissions or by the risk of manipulating Uniswap governance vote results through Base's cross-chain messaging protocol.

> Upgradeability score: Low

## Autonomy

There are no particular dependencies for the Uniswap protocol.

> Autonomy score: Low

## Exit Window

No _Medium_ or _High_ risk permissions are found in the protocol that require protection with an Exit Window, but parameters such as protocol fees can be changed by the DAO. Note that the permissions controlled by the DAO are protected with a 1-week on-chain voting window and 2 to 30 days _Exit Window_ for approved updates.

> Exit score: Low

## Accessibility

Uniswap is accessible through multiple frontends. Uniswap offers main access through their main deployment: https://app.uniswap.org/. In addition to that,
the frontend app is also hosted on IPFS see here https://github.com/Uniswap/interface/releases. Further details on the maintenance and access of the interface hosted on IPFS can be found [here](https://blog.uniswap.org/uniswap-interface-ipfs). Additionally, users are offered the possibility to self host the frontend from here: https://github.com/Uniswap/interface.

> Accessibility score: Low

## Conclusion

The Uniswap V3 deployment on Base receives _Low_ centralization risk scores for _Upgradeability_, _Autonomy_, _Exit Window_, and _Accessibility_ dimensions. Since the protocol is deployed on an L2 chain in _Stage 1_, the deployment scores _Stage 1_.

> Overall score: Stage 1

# Reviewer notes

⚠️ During our analysis, we identified two unverified contracts, [ProxyAdmin](https://basescan.org/address/0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9#code) and [TransparentUpgradeableProxy](https://basescan.org/address/0x4615C383F85D0a2BbED973d83ccecf5CB7121463#code), on Base. While these contracts remain unverified, if they match the deployed code on Ethereum mainnet, we can confirm the upgradability risk remains low. We strongly recommend that Uniswap verifies these contracts to ensure transparency and alignment with their security standards. Since those contracts are non-essential to the functioning of the protocol, this does not impact the score.

# Protocol Analysis

# Dependencies

No external dependency has been found.

# Governance

## Governance Decision Enforcement from L1 to Base

When a vote has passed on the [Governor Contract](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) on Ethereum Mainnet, the decision gets queued by calling `queue` (the payload is then stored on the [Timelock contract](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC)). After the waiting period has passed any address can permissionessly call `execute` on the Governor contract which calls `executeTransaction` on the Timelock contract.

If a vote has passed and is queued that has changes for the Base deployment the payload must specify as target the L1 contract for Cross-chain messaging by Base called [L1CrossDomainMessenger](https://etherscan.io/address/0x866E82a600A1414e583f7F13623F1aC5d58b0Afa).

When the transaction for executing the payload arrives at the L1CrossDomainMessenger and the triggered subsequent cross-chain handling succeeded as well (fulfilled with the OP Stack), the Base chain includes a transaction where [L2CrossDomainMessenger](https://basescan.org/address/0x4200000000000000000000000000000000000007) calls the function ` forward(address target, bytes memory data)` on the [CrossChainAccount](https://basescan.org/address/0x31fafd4889fa1269f7a13a66ee0fb458f27d72a9).

By calling `forward` on the CrossChainAccount, the `target` gets called with the `data`.

`(bool success, bytes memory res) = target.call(data);`

Only the Timelock contract on the L1 is allowed to trigger this on the L2. The target and data could e.g specify `UniswapV3Factory` (target) and `enableFeeAmount` with arguments `uint24 fee, int24 tickSpacing` (data) to set fees for V3 Pools on Base.

Furthermore, Base's cross-chain messaging protocol cannot be censored by intermediaries and thus this protocol does not introduce new risks for Uniswap's cross-chain governance system.

## Security Council

No security council needed because on-chain governance on Ethereum is in place, from which decisions get sent to Base.

| Name              | Account                                                                                                               | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| CrossChainAccount | [0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9](https://basescan.org/address/0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9) | Contract | N/A         | N/A             | N/A               | N/A            |

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravo` contract.
The lock period is at least two days and up to 30 days for governance actions.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.
Subsequently, governance actions initiated on Ethereum (L1) are enforced on Base (L2) with very strong guarantees ([see Governance Decision Enforcement from L1 to Base](#governance-decision-enforcement-from-l1-to-base)).

# Contracts & Permissions

## Contracts

| Contract Name                      | Address                                                                                                               |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| UniswapV3Factory                   | [0x33128a8fC17869897dcE68Ed026d694621f6FDfD](https://basescan.org/address/0x33128a8fC17869897dcE68Ed026d694621f6FDfD) |
| Multicall                          | [0x091e99cb1C49331a94dD62755D168E941AbD0693](https://basescan.org/address/0x091e99cb1C49331a94dD62755D168E941AbD0693) |
| ProxyAdmin                         | [0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9](https://basescan.org/address/0x3334d83e224aF5ef9C2E7DDA7c7C98Efd9621fA9) |
| TickLens                           | [0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d](https://basescan.org/address/0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d) |
| NFTDescriptor                      | [0xF9d1077fd35670d4ACbD27af82652a8d84577d9F](https://basescan.org/address/0xF9d1077fd35670d4ACbD27af82652a8d84577d9F) |
| NonfungibleTokenPositionDescriptor | [0x4f225937EDc33EFD6109c4ceF7b560B2D6401009](https://basescan.org/address/0x4f225937EDc33EFD6109c4ceF7b560B2D6401009) |
| TransparentUpgradeableProxy        | [0x4615C383F85D0a2BbED973d83ccecf5CB7121463](https://basescan.org/address/0x4615C383F85D0a2BbED973d83ccecf5CB7121463) |
| NonfungiblePositionManager         | [0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1](https://basescan.org/address/0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1) |
| V3Migrator                         | [0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7](https://basescan.org/address/0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7) |
| QuoterV2                           | [0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a](https://basescan.org/address/0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a) |
| SwapRouter02                       | [0x2626664c2603336E57B271c5C0b26F421741e481](https://basescan.org/address/0x2626664c2603336E57B271c5C0b26F421741e481) |
| Permit2                            | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://basescan.org/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |
| UniversalRouter                    | [0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD](https://basescan.org/address/0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD) |
| v3StakerAddress                    | [0x42bE4D6527829FeFA1493e1fb9F3676d2425C3C1](https://basescan.org/address/0x42bE4D6527829FeFA1493e1fb9F3676d2425C3C1) |
| CrossChainAccount                  | [0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9](https://basescan.org/address/0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9) |

## All Permission Owners

| Name              | Account                                                                                                               | Type     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| CrossChainAccount | [0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9](https://basescan.org/address/0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9) | Contract |

## Permissions

| Contract         | Function        | Impact                                                                                                                                                                                                             | Owner             |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| UniswapV3Factory | setOwner        | Changes the owner to a new address. The DAO can appoint a new owner which can set fees on various pools (setProtocolFee), collect fees on behalf of the protocol and allow new tick spaces for new deployed pools. | CrossChainAccount |
| UniswapV3Factory | enableFeeAmount | Enables the creation of new fee tiers for pools by enabling a specific fee amount paired with a corresponding tick spacing.                                                                                        | CrossChainAccount |
