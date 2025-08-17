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
chain: "Arbitrum"
stage: 1
reasons: ["Unverified Contracts"]
risks: ["M", "L", "L", "L", "L"]
author: ["mmilien", "CookingCryptos"]
submission_date: "2024-11-12"
publish_date: "2024-12-16"
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

Uniswap v3 is deployed on various chains. This review is based on the Arbitrum chain, an Ethereum L2 in Stage 1 according to L2BEAT.

> Chain score: Medium

## Upgradeability

Two potential upgrades can be implemented for the contracts deployed on Arbitrum that comprise the Uniswap V3 deployment:

1. Adjusting the Fee Parameter
2. Updating the `NonFungibleTokenPositionDescriptor` Implementation (via the proxy upgradeable pattern)

These updates require a governance vote on the Ethereum chain through Uniswap's on-chain governance system. The execution of this vote is trustless but involves the Arbitrum native cross-chain messaging protocol. This protocol cannot censor governance vote results and hence does not introduce new risks.

Beyond these updates, the protocol’s contracts are immutable. No entity has the ability to pause, revert trade execution, or alter the protocol's behavior in any other way. Importantly, no _user funds_ or _unclaimed yield_ are impacted by the remaining permissions or by the risk of manipulating Uniswap governance vote results through Arbitrum's cross-chain messaging protocol.

> Upgradeability score: Low

## Autonomy

There are no particular dependencies for the Uniswap protocol.

> Autonomy score: Low

## Exit Window

No _Medium_ or _High_ risk permissions are found in the protocol that require protection with an _Exit Window_, but parameters such as protocol fees can be changed by the DAO. Note that the permissions controlled by the DAO are protected with a 1-week on-chain voting window and 2 to 30 days _Exit Window_ for approved updates.

> Exit score: Low

## Accessibility

Uniswap is accessible through multiple frontends. Uniswap offers main access through their main deployment: https://app.uniswap.org/. In addition to that,
the frontend app is also hosted on IPFS see here https://github.com/Uniswap/interface/releases. Further details on the maintenance and access of the interface hosted on IPFS can be found [here](https://blog.uniswap.org/uniswap-interface-ipfs). Additionally, users are offered the possibility to self host the frontend from here: https://github.com/Uniswap/interface.

> Accessibility score: Low

## Conclusion

The Uniswap V3 deployment on Arbitrum receives _Low_ centralization risk scores for _Upgradeability_, _Autonomy_, _Exit Window_, and _Accessibility_ dimensions. Since the protocol is deployed on an L2 chain in _Stage 1_, the deployment scores _Stage 1_.

> Overall score: Stage 1

# Reviewer Notes

⚠️ During our analysis, we identified three unverified contracts, [NFTDescriptor](https://arbiscan.io/address/0x42B24A95702b9986e82d421cC3568932790A48Ec#code), [NonfungibleTokenPositionDescriptor](https://arbiscan.io/address/0x91ae842A5Ffd8d12023116943e72A606179294f3#code) and [Multicall](https://arbiscan.io/address/0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB#code), on Arbitrum. While these contracts remain unverified, if they match the deployed code on Ethereum mainnet, we can confirm the upgradability risk remains low. We strongly recommend that Uniswap verifies these contracts to ensure transparency and alignment with their security standards. Since those contracts are non-essential to the functioning of the protocol, this does not impact the score.

# Protocol Analysis

# Dependencies

No external dependency has been found.

# Governance

## Governance Decision Enforcement from L1 to Arbitrum

When a vote has passed on the [Governor Contract](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3) on Ethereum Mainnet, the decision gets queued by calling `queue` (the payload is then stored on the [Timelock contract](https://etherscan.io/address/0x1a9C8182C09F50C8318d769245beA52c32BE35BC)). After the waiting period has passed any address can permissionessly call `execute` on the Governor contract to call `executeTransaction` on the Timelock contract.

If a vote has passed and is queued that has changes for the Arbitrum deployment the payload must specify as target the L1 contract for Cross-chain messaging by Arbitrum called [Inbox](https://etherscan.io/address/0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f). This contract by Arbitrum belongs to the [Delayed Inbox system](https://docs.arbitrum.io/how-arbitrum-works/l1-to-l2-messaging#retryable-tickets). The target function on this contract is `createRetryableTicket`.

When the transaction arrives in the inbox (retryable function call by the timelock contract succeeded) and the subsequent cross-chain handling succeeded as well \*, the arbitrum chain includes the transaction with the original sender (Timelock) address being aliased (`L2_Alias = L1_Contract_Address + 0x1111000000000000000000000000000000001111`). This is how this address `0x2BAD8182C09F50c8318d769245beA52C32Be46CD` is the L2 equivalent of the Timelock on the L1.

This `L2Alias` calls the specified L2 target (`to`) with the data to execute a function on the behalf of the Timelock on L1 (`bytes calldata data`).

The target and data could e.g specify `UniswapV3Factory` (target) and `enableFeeAmount` with arguments `uint24 fee, int24 tickSpacing` (data) to set fees for V3 Pools on Arbitrum.

\*if the L1 transaction to request submission succeeds (i.e. does not revert) then the execution of the Retryable on L2 has a strong guarantee to ultimately succeed as well. [[1]](#sources)

[1] https://docs.arbitrum.io/how-arbitrum-works/l1-to-l2-messaging

## Security Council

No security council needed because on-chain governance on Ethereum is in place, from which decisions get sent to Arbitrum.

| Name              | Account                                                                                                              | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| L2 Alias Timelock | [0x2BAD8182C09F50c8318d769245beA52C32Be46CD](https://arbiscan.io/address/0x2BAD8182C09F50c8318d769245beA52C32Be46CD) | Contract | N/A         | N/A             | N/A               | N/A            |

## Exit Window

As the contracts are immutable the users can always withdraw their funds, but parameters such as protocol
fees can be changed by the DAO. A `Timelock` protects the contracts and updates are governed by the `GovernorBravo` contract.
The lock period is at least two days and up to 30 days for governance actions.
When a proposal is created (at least 2.5M Uni), the community can cast their votes during a 3 day voting period. If a majority, and at least 4M votes are cast for the proposal, it is queued in the Timelock, and may be executed in a minimum of 2 days.
Subsequently, governance actions initiated on Ethereum (L1) are enforced on Arbitrum (L2) with very strong guarantees (see [Governance Decision Enforcement from L1 to Arbitrum](#governance-decision-enforcement-from-l1-to-arbitrum)).

# Contracts & Permissions

## Contracts

| Contract Name                      | Address                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| UniswapV3Factory                   | [0x1F98431c8aD98523631AE4a59f267346ea31F984](https://arbiscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984) |
| Multicall                          | [0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB](https://arbiscan.io/address/0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB) |
| ProxyAdmin                         | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://arbiscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) |
| TickLens                           | [0xbfd8137f7d1516D3ea5cA83523914859ec47F573](https://arbiscan.io/address/0xbfd8137f7d1516D3ea5cA83523914859ec47F573) |
| Quoter                             | [0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6](https://arbiscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6) |
| SwapRouter                         | [0xE592427A0AEce92De3Edee1F18E0157C05861564](https://arbiscan.io/address/0xE592427A0AEce92De3Edee1F18E0157C05861564) |
| NFTDescriptor                      | [0x42B24A95702b9986e82d421cC3568932790A48Ec](https://arbiscan.io/address/0x42B24A95702b9986e82d421cC3568932790A48Ec) |
| NonfungibleTokenPositionDescriptor | [0x91ae842A5Ffd8d12023116943e72A606179294f3](https://arbiscan.io/address/0x91ae842A5Ffd8d12023116943e72A606179294f3) |
| TransparentUpgradeableProxy        | [0xEe6A57eC80ea46401049E92587E52f5Ec1c24785](https://arbiscan.io/address/0xEe6A57eC80ea46401049E92587E52f5Ec1c24785) |
| NonfungiblePositionManager         | [0xC36442b4a4522E871399CD717aBDD847Ab11FE88](https://arbiscan.io/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88) |
| V3Migrator                         | [0xA5644E29708357803b5A882D272c41cC0dF92B34](https://arbiscan.io/address/0xA5644E29708357803b5A882D272c41cC0dF92B34) |
| QuoterV2                           | [0x61fFE014bA17989E743c5F6cB21bF9697530B21e](https://arbiscan.io/address/0x61fFE014bA17989E743c5F6cB21bF9697530B21e) |
| SwapRouter02                       | [0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45](https://arbiscan.io/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45) |
| Permit2                            | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://arbiscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |
| UniversalRouter                    | [0x5E325eDA8064b456f4781070C0738d849c824258](https://arbiscan.io/address/0x5E325eDA8064b456f4781070C0738d849c824258) |
| v3StakerAddress                    | [0xe34139463bA50bD61336E0c446Bd8C0867c6fE65](https://arbiscan.io/address/0xe34139463bA50bD61336E0c446Bd8C0867c6fE65) |
| L2 Alias                           | [0x2BAD8182C09F50c8318d769245beA52C32Be46CD](https://arbiscan.io/address/0x2BAD8182C09F50c8318d769245beA52C32Be46CD) |

## All Permission Owners

| Name              | Account                                                                                                              | Type           |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | -------------- |
| L2 Alias Timelock | [0x2BAD8182C09F50c8318d769245beA52C32Be46CD](https://arbiscan.io/address/0x2BAD8182C09F50c8318d769245beA52C32Be46CD) | Alias Contract |
| ProxyAdmin        | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://arbiscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) | Contract       |

## Permissions

| Contract                    | Function          | Impact                                                                                                                                                                                                                                              | Owner             |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| UniswapV3Factory            | setOwner          | Changes the owner to a new address. The DAO can appoint a new owner which can set fees on various pools (setProtocolFee), collect fees on behalf of the protocol and allow new tick spaces for new deployed pools.                                  | L2 Alias Timelock |
| UniswapV3Factory            | enableFeeAmount   | Enables the creation of new fee tiers for pools by enabling a specific fee amount paired with a corresponding tick spacing.                                                                                                                         | L2 Alias Timelock |
| UniswapV3Pool               | setFeeProtocol    | Allows the owner to set a fee percentage that is deducted from the LPs fees. It only affects the pool where the function is called. The fee is required to be less than 10% of the total accumulated fees. It only affects future accumulated fees. | L2 Alias Timelock |
| UniswapV3Pool               | collectProtocol   | Withdraws the accumulated protocol fees to a custom address. The DAO triggers the withdraw and specifies the address.                                                                                                                               | L2 Alias Timelock |
| ProxyAdmin                  | renounceOwnership | Abandons ownership of the contract. The DAO would renounce the access to the administrative functions of the contracts, which includes upgrading the `NonFungibleTokenPositionDescriptor` contract.                                                 | L2 Alias Timelock |
| ProxyAdmin                  | transferOwnership | Updates the owner of the `ProxyAdmin` contract: the account with the rights to change the admin of the proxy and upgrade the `NonFungibleTokenPositionDescriptor` contract.                                                                         | L2 Alias Timelock |
| ProxyAdmin                  | changeProxyAdmin  | Updates the admin of the `TransparentUpgradeableProxy`: the account with the rights to upgrade the proxy's implementation. This would replace the role of the `ProxyAdmin` contract and could be used to upgrade (replace) `ProxyAdmin`.            | L2 Alias Timelock |
| ProxyAdmin                  | upgrade           | Triggers the upgrade of the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions.                                                                                                                            | L2 Alias Timelock |
| ProxyAdmin                  | upgradeAndCall    | Triggers the upgrade of the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions and then call a function in the new contract.                                                                               | L2 Alias Timelock |
| TransparentUpgradeableProxy | changeAdmin       | Updates the proxy's admin: the account with the rights to upgrade the proxy's implementation. This would replace the role of the `ProxyAdmin` contract and could be used to upgrade (replace) `ProxyAdmin`.                                         | ProxyAdmin        |
| TransparentUpgradeableProxy | upgradeTo         | Upgrades the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions.                                                                                                                                           | ProxyAdmin        |
| TransparentUpgradeableProxy | upgradeToAndCall  | Upgrades the `NonFungibleTokenPositionDescriptor` contract which allows to change the token descriptions and then call a function in the new contract.                                                                                              | ProxyAdmin        |
