---
protocol: "Compound V2"
website: "https://compound.finance/"
x: "https://x.com/compoundfinance"
github: ["https://github.com/compound-finance"]
defillama_slug: ["compound-v2"]
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "H", "H", "M", "L"]
author: ["eliasbourgon"]
submission_date: "2025-05-13"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

**Compound v2** is a decentralized lending protocol where each market accepts one “base” asset (e.g. USDC, DAI, ETH via cETH, WBTC, BAT, REP, ZRX) as liquidity. Users can deposit that base asset to earn interest, or supply other supported assets as collateral to borrow it. Every base-asset market runs in its own isolated instance—separate cToken, interest-rate model, reserves, and Comptroller—so risks (rates, defaults) do not spill across markets.

# Overview

## Chain

Compound-v2 is deployed on various chains. This review is based on the Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability

The Compound-v2 protocol is almost fully upgradeable allowing for the update of governance and markets logic, with implementation contracts such as `CErc20Delegate`, `Oracle`, `Comptroller` and `GovernorBravoDelegate` . This can result in the loss of funds or unclaimed yield as well as lead to other changes in the expected performance of the protocol.

Few markets use CErc20 or CEther contract (no “Delegator”) which are fixed implementation: as it’s deployed, its bytecode cannot be swapped out by the Timelock (DAO).

Compound has a centralized control of the protocol (such as choosing the interest rate model per asset).

The following rights in the protocol are controlled by the admin:

-   The ability to list a new cToken market

-   The ability to update the interest rate model per market

-   The ability to update the oracle address

-   The ability to withdraw the reserve of a cToken

-   The ability to choose a new admin, such as a DAO controlled by the community; because this DAO can itself choose a new admin, the administration has the ability to evolve over time, based on the decisions of the stakeholders

> Upgradeability score: High

## Autonomy

The compound-v2 protocol relies on a Chainlink oracle feed to price collateral and base assets in the system. So the protocol does not validate asset prices returned by Chainlink or offer a valid fallback oracle mechanism.

**`PiceOracle`** fetches prices from Chainlink Price Feeds when requested for a specific cToken.

The Chainlink oracle system itself is upgradeable without decentralized ownership over those permissions. This dependency thus introduces centralization risk in the Compound-v2 protocol.

> Autonomy score: High

## Exit Window

\
Protocol upgrades and other privileged actions are gated by the follwing process.

-   **Proposal creation:** anyone with ≥ 25 000 COMP, then enter a 2 day review period.

-   **Voting period:** 3 days: if a majority, and at least 400,000 votes are cast for the proposal, it is queued in the Timelock

-   **Execution delay (Timelock):** 2 days after a proposal passes

In total, users get **7 days** between first seeing a proposal on-chain and the moment it can be executed. This match the 7-day “safe-exit” benchmark.

> Exit Window score: Medium

## Accessibility

The original Compound V2 interface ( [app.compound.finance](https://app.compound.finance/?market=usdc-mainnet) ) is fully open-source; anyone can clone the repo, swap the public Graph endpoint (or run their own sub-graph) and launch a local or IPFS-hosted copy in a few minutes. In practice, users aren’t limited to this front-end: Compound V2 positions can be opened, closed, or managed from a wide list of third-party dashboards and wallets (DeFi Saver, Instadapp, Zapper, Zerion, Debank, Etherscan’s “Write” tab, Ledger + MetaMask, etc.). Because there are multiple**,** independentways to reach the contracts even if the official website and its default sub-graph go offline, user funds remain accessible.

> Accessibility score: Low

## Conclusion

The Compound-v2 Ethereum mainnet protocol achieves High centralization risk scores for its *Upgradeability*, *Autonomy* and *Exit Window* dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by 1) adopting a *Security Council* setup for the `ProposalGuardian` and `PauseGuardian` multisig accounts, and 2) implementing validity checks and a valid fallback mechanism around the Chainlink oracle (or Chainlink adopting a *Security Council* setup for its own multisig account).

> Overall score: Stage 0

# Technical Analysis

Below is an overview of the contracts from the Compound V2 protocol.

![](images/Compound%20V2%20(shared).png)

## Contracts


| Contract Name                                           | Address                                                                                                               |
|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Comp (Token)                                            | [0xc00e94Cb662C3520282E6f5717214004A7f26888](https://etherscan.io/address/0xc00e94Cb662C3520282E6f5717214004A7f26888) |
| CErc20Delegator (Proxy) (Fei market)                    | [0x7713DD9Ca933848F6819F38B8352D9A15EA73F67](https://etherscan.io/address/0x7713DD9Ca933848F6819F38B8352D9A15EA73F67) |
| CErc20Delegate (Implementation for all CErc20Delegator) | [0x3363bae2fc44da742df13cd3ee94b6bb868ea376](https://etherscan.io/address/0x3363bae2fc44da742df13cd3ee94b6bb868ea376) |
| CErc20Delegator (Proxy) (USDP market)                   | [0x041171993284df560249b57358f931d9eb7b925d](https://etherscan.io/address/0x041171993284df560249b57358f931d9eb7b925d) |
| CErc20Delegator (Proxy) (Aave market)                   | [0xe65cdb6479bac1e22340e4e755fae7e509ecd06c](https://etherscan.io/address/0xe65cdb6479bac1e22340e4e755fae7e509ecd06c) |
| CErc20Delegator (Proxy) (Sushi market)                  | [0x4b0181102a0112a2ef11abee5563bb4a3176c9d7](https://etherscan.io/address/0x4b0181102a0112a2ef11abee5563bb4a3176c9d7) |
| CErc20Delegator (Proxy) (Yearn market)                  | [0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946](https://etherscan.io/address/0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946) |
| CErc20Delegator (Proxy) (TUSD market)                   | [0x12392f67bdf24fae0af363c24ac620a2f67dad86](https://etherscan.io/address/0x12392f67bdf24fae0af363c24ac620a2f67dad86) |
| CErc20Delegator (Proxy) (LINK market)                   | [0xface851a4921ce59e912d19329929ce6da6eb0c7](https://etherscan.io/address/0xface851a4921ce59e912d19329929ce6da6eb0c7) |
| CErc20Delegator (Proxy) (WBTC2 market)                  | [0xccF4429DB6322D5C611ee964527D42E5d685DD6a](https://etherscan.io/address/0xccF4429DB6322D5C611ee964527D42E5d685DD6a) |
| CErc20Delegator (Proxy) (COMP market)                   | [0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4](https://etherscan.io/address/0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4) |
| CErc20Delegator (Proxy) (Dai market)                    | [0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643](https://etherscan.io/address/0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643) |
| CErc20Delegator (Proxy) (USDT market)                   | [0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9](https://etherscan.io/address/0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9) |
| CErc20Delegator (Proxy) (UNI market)                    | [0x35a18000230da775cac24873d00ff85bccded550](https://etherscan.io/address/0x35a18000230da775cac24873d00ff85bccded550) |
| CErc20Delegator (Proxy) (Maker market)                  | [0x95b4eF2869eBD94BEb4eEE400a99824BF5DC325b](https://etherscan.io/address/0x95b4eF2869eBD94BEb4eEE400a99824BF5DC325b) |
| CErc20 (BAT market)                                     | [0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E](https://etherscan.io/address/0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E) |
| CErc20 (SAI market)                                     | [0xF5DCe57282A584D2746FaF1593d3121Fcac444dC](https://etherscan.io/address/0xF5DCe57282A584D2746FaF1593d3121Fcac444dC) |
| CErc20 (REP market)                                     | [0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1](https://etherscan.io/address/0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1) |
| CErc20 (ZRX market)                                     | [0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407](https://etherscan.io/address/0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407) |
| CErc20 (WBTC market)                                    | [0xC11b1268C1A384e55C48c2391d8d480264A3A7F4](https://etherscan.io/address/0xC11b1268C1A384e55C48c2391d8d480264A3A7F4) |
| CEther                                                  | [0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5](https://etherscan.io/address/0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5) |
| Maximillion                                             | [0xf859A1AD94BcF445A406B892eF0d3082f4174088](https://etherscan.io/address/0xf859A1AD94BcF445A406B892eF0d3082f4174088) |
| JumpRateModelV2 (IRM for WBTC)                          | [0xf2e5db36b0682f2cd6bc805c3a4236194e01f4d5](https://etherscan.io/address/0xf2e5db36b0682f2cd6bc805c3a4236194e01f4d5) |
| JumpRateModelV2 (IRM for USDT)                          | [0xFB564da37B41b2F6B6EDcc3e56FbF523bD9F2012](https://etherscan.io/address/0xFB564da37B41b2F6B6EDcc3e56FbF523bD9F2012) |
| JumpRateModelV2 (IRM for USDC)                          | [0xD8EC56013EA119E7181d231E5048f90fBbe753c0](https://etherscan.io/address/0xD8EC56013EA119E7181d231E5048f90fBbe753c0) |
| JumpRateModelV2 (IRM for UNI)                           | [0xd88b94128ff2b8cf2d7886cd1c1e46757418ca2a](https://etherscan.io/address/0xd88b94128ff2b8cf2d7886cd1c1e46757418ca2a) |
| JumpRateModelV2 (IRM)                                   | [0xd956188795ca6F4A74092ddca33E0Ea4cA3a1395](https://etherscan.io/address/0xd956188795ca6F4A74092ddca33E0Ea4cA3a1395) |
| Oracle (Proxy)                                          | [0xDDc46a3B076aec7ab3Fc37420A8eDd2959764Ec4](https://etherscan.io/address/0xDDc46a3B076aec7ab3Fc37420A8eDd2959764Ec4) |
| Oracle (Implementation)                                 | [0x02557a5e05defeffd4cae6d83ea3d173b272c904](https://etherscan.io/address/0x02557a5e05defeffd4cae6d83ea3d173b272c904) |
| Reservoir                                               | [0x2775b1c75658Be0F640272CCb8c72ac986009e38](https://etherscan.io/address/0x2775b1c75658Be0F640272CCb8c72ac986009e38) |
| Comptroller (Proxy)                                     | [0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B](https://etherscan.io/address/0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B) |
| Comptroller (Implementation)                            | [0xbafe01ff935c7305907c33bf824352ee5979b526](https://etherscan.io/address/0xbafe01ff935c7305907c33bf824352ee5979b526) |
| Timelock                                                | [0x6d903f6003cca6255D85CcA4D3B5E5146dC33925](https://etherscan.io/address/0x6d903f6003cca6255D85CcA4D3B5E5146dC33925) |
| GovernorBravoDelegator (Proxy)                          | [0xc0da02939e1441f497fd74f78ce7decb17b66529](https://etherscan.io/address/0xc0da02939e1441f497fd74f78ce7decb17b66529) |
| GovernorBravoDelegate (Implementation)                  | [0x6f6e4785c97885d26466945055d4ae8931be6f7a](https://etherscan.io/address/0x6f6e4785c97885d26466945055d4ae8931be6f7a) |

## Permission owners


| Name              | Account                                                                                                               | Type         |
|-------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
| Pause Guardian    | [0xbbf3f1421D886E9b2c5D716B5192aC998af2012c](https://etherscan.io/address/0xbbf3f1421D886E9b2c5D716B5192aC998af2012c) | Multisig 4/8 |
| Proposal Guardian | [0xbbf3f1421D886E9b2c5D716B5192aC998af2012c](https://etherscan.io/address/0xbbf3f1421D886E9b2c5D716B5192aC998af2012c) | Multisig 4/8 |
| Guardian          | [0x8B8592E9570E96166336603a1b4bd1E8Db20fa20](https://etherscan.io/address/0x8B8592E9570E96166336603a1b4bd1E8Db20fa20) | EOA          |
| anchorAdmin       | [0xF06e41aDD8A7E7A8aD81a07C0ACA291E4573ca50](https://etherscan.io/address/0xF06e41aDD8A7E7A8aD81a07C0ACA291E4573ca50) | EOA          |
| poster            | [0x3c6809319201b978D821190Ba03fA19A3523BD96](https://etherscan.io/address/0x3c6809319201b978D821190Ba03fA19A3523BD96) | EOA          |
| Timelock (DAO)    | [0x6d903f6003cca6255D85CcA4D3B5E5146dC33925](https://etherscan.io/address/0x6d903f6003cca6255D85CcA4D3B5E5146dC33925) | Contract     |
| Governor (DAO)    | [0xc0Da02939E1441F497fd74F78cE7Decb17B66529](https://etherscan.io/address/0xc0Da02939E1441F497fd74F78cE7Decb17B66529) | Contract     |

## Permissions

| Contract                                    | Function                        | Impact                                                                                                                                                                                                                                                                                                                                                                                             | Owner                               |
|---------------------------------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| CErc20Delegator ( Proxy ) / CErc20 / CEther | constructor                     | Sets the proxy’s admin and implementation slots. Controls who can upgrade the logic.                                                                                                                                                                                                                                                                                                               | Timelock (DAO)                      |
| CErc20Delegator ( Proxy ) / CErc20 / CEther | \_setImplementation             | Upgrades the **`CErc20Delegate`** (market logic). Malicious code could steal balances or block withdrawals.                                                                                                                                                                                                                                                                                        | Timelock (DAO)                      |
| CErc20Delegate                              | initialize                      | Sets all of the core parameters on the delegate implementation                                                                                                                                                                                                                                                                                                                                     | Timelock (DAO)                      |
| CErc20Delegate                              | sweepToken                      | Moves tokens accidentally sent to the CToken contract to its admin, i.e., the Timelock. A rogue admin could repeatedly call sweepToken to empty out significant balances of arbitrary ERC-20 tokens held by the contract.                                                                                                                                                                          | Timelock (DAO)                      |
| CErc20Delegate                              | \_delegateCompLikeTo            | Lets admin change the address that receives COMP-style reward distributions. A rogue admin could redirect all COMP rewards to an attacker‐controlled address.                                                                                                                                                                                                                                      | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_setPendingAdmin               | Writes a new pendingAdmin address. Controls who can then call `_acceptAdmin` to become the new admin.                                                                                                                                                                                                                                                                                              | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_acceptAdmin                   | Moves pendingAdmin into admin and clears pendingAdmin. Finalizes admin transfers.                                                                                                                                                                                                                                                                                                                  | PendingAdmin                        |
| CErc20Delegate / CErc20 / CEther            | \_setComptroller                | Sets a new comptroller for the market.                                                                                                                                                                                                                                                                                                                                                             | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_setReserveFactor              | Accrues interest andset a new `reserveFactorMantissa` (the fraction of interest set aside as reserves) using `_setReserveFactorFresh`. Admin can instantly raise fees or drain reserves.                                                                                                                                                                                                           | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_setReserveFactorFresh         | Set a new `reserveFactorMantissa`                                                                                                                                                                                                                                                                                                                                                                  | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_reduceReserves                | Accrues interest for the market, then subtracts the specified amount from totalReserves and transfers that amount to the admin address using `_reduceReservesFresh`                                                                                                                                                                                                                                | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_reduceReservesFresh           | Reduces reserves by transferring to admin.                                                                                                                                                                                                                                                                                                                                                         | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_setInterestRateModel          | Accrues interest for the market and then set a new interest rate model using `_setInterestRateModelFresh`, pointing the market to a different rate‐calculation contract. A malicious admin could install a model that sets exorbitant rates or breaks interest accrual.                                                                                                                            | Timelock (DAO)                      |
| CErc20Delegate / CErc20 / CEther            | \_setInterestRateModelFresh     | Updates the interest rate model                                                                                                                                                                                                                                                                                                                                                                    | Timelock (DAO)                      |
| CErc20Delegate                              | \_becomeImplementation          | Permits admin to mark this contract as the new active implementation for its proxy. A malicious upgrade here could completely replace logic with a backdoor. permissions.                                                                                                                                                                                                                          | Timelock (DAO)                      |
| CErc20Delegate                              | \_resignImplementation          | Allows admin to resign this contract as an implementation. A malicious admin could resign without setting a valid successor, freezing the market.                                                                                                                                                                                                                                                  | Timelock (DAO)                      |
| JumpRateModelV2                             | updateJumpRateModel             | Updates the the per-block interest rate parameters. A rogue admin could set extreme parameters, forcing exorbitant interest rates.                                                                                                                                                                                                                                                                 | Timelock (DAO)                      |
| PriceOracleProxy                            | setSaiPrice                     | Updates the stored SAI price used by the protocol’s on-chain oracle. This directly affects how SAI-denominated positions and liquidations are valued. A compromised guardian could set the price to near-zero (triggering mass liquidations) or to an extreme high (preventing legitimate liquidations), either slamming user positions or freezing the market.                                    | Guardian                            |
| PriceOracle                                 | \_setPendingAnchor              | Writes a new entry into the pendingAnchors mapping, staging an updated anchor price for an asset.                                                                                                                                                                                                                                                                                                  | anchorAdmin                         |
|                                             |                                 |                                                                                                                                                                                                                                                                                                                                                                                                    |                                     |
|                                             |                                 | By staging anchors, the anchorAdmin controls when the baseline for price deviations is updated, directly affecting oracle stability and liquidations. A malicious anchorAdmin could leave pending anchors in limbo or set extreme values, causing erratic price‐deviation checks and unwarranted liquidations.                                                                                     |                                     |
| PriceOracle                                 | \_setPaused                     | Flips the paused boolean, enabling or disabling all oracle price updates. Pausing the oracle halts any further price submissions, effectively freezing price feeds across the system. A malicious anchorAdmin could pause the oracle indefinitely, blocking fresh price data and stalling all dependent markets.                                                                                   | anchorAdmin                         |
| PriceOracle                                 | \_setPendingAnchorAdmin         | Writes a new pendingAnchorAdmin address. Controls who can then call `_acceptAnchorAdmin` to become the new admin. A malicious anchorAdmin could appoint a hostile address as pendingAnchorAdmin.                                                                                                                                                                                                   | anchorAdmin                         |
| PriceOracle                                 | \_acceptAnchorAdmin             | Moves `pendingAnchorAdmin` into admin and clears `pendingAnchorAdmin`, completing the admin transfer. Accepting transfers all oracle governance powers—pausing, anchoring, and price‐setting—to the new admin. If an attacker becomes pendingAnchorAdmin, they could call this and immediately wield full oracle control.                                                                          | pendingAnchorAdmin (initially zero) |
| PriceOracle                                 | setPrice                        | Updates a single asset’s price in the `_assetPrices` mapping and records a new anchors value. The poster directly controls that asset’s reported price, which downstream contracts use for collateral valuations and liquidations. A malicious poster could report artificially low or high prices to trigger unwarranted liquidations or profitable oracle‐based exploits.                        | poster                              |
| Comptroller (Proxy)                         | \_setPendingImplementation      | Assigns a new address to the pending Comptroller Implementation storage slot. This stages which implementation the Unitroller will switch to on the next upgrade, controlling the protocol’s core logic. A malicious admin could point pendingComptrollerImplementation to a backdoored contract, then finalize it to seize control of all markets.                                                | Timelock (DAO)                      |
| Comptroller (Proxy)                         | \_acceptImplementation          | Replaces the active comptroller Implementation with whatever address is in `pendingComptrollerImplementation`, then clears the pending slot. This finalizes the upgrade, swapping in new logic for all market operations. A rogue admin could accept a malicious implementation they previously staged, instantly redirecting all protocol behavior to attacker-controlled code.                   | Comptroller (Implementation)        |
| Comptroller (Proxy)                         | \_setPendingAdmin               | Writes a new pendingAdmin address. Controls who can then call `_acceptAdmin` to become the new admin, governing all Unitroller upgrades and critical settings.                                                                                                                                                                                                                                     | Timelock (DAO)                      |
| Comptroller (Proxy)                         | \_acceptAdmin                   | Moves `pendingAdmin` into admin and clears `pendingAdmin`. This transfers full admin privileges—upgrade and parameter control—to the newly accepted address. A malicious nominee could accept and instantly gain the power to change fees, reserves, or upgrade to a malicious implementation.                                                                                                     | pendingAdmin                        |
| Timelock                                    | setDelay                        | Updates the delay (currently 2 days) to wait between when a proposal is accepted and when it is executed.                                                                                                                                                                                                                                                                                          | Timelock (DAO)                      |
| Timelock                                    | SetPendingAdmin                 | Writes a new pendingAdmin address.. Controls who can then call `_acceptAdmin` to become the new admin. This can be used if the Governor contract is updated.                                                                                                                                                                                                                                       | Timelock (DAO)                      |
| Timelock                                    | acceptAdmins                    | Moves pendingAdmin into admin and clears pendingAdmin. Only the nominated pendingAdmin can call this, so they gain full admin rights                                                                                                                                                                                                                                                               | pendingAdmin (Null)                 |
| Timelock                                    | queueTransaction                | Queues a transaction that can be executed once a delay. Current dela is 2 days. This can impact the own TimeLock 's settings (change admin, set delays) or interaction with any other contract the DAO has permissions on.                                                                                                                                                                         | Governor (DAO)                      |
| Timelock                                    | cancelTransaction               | Cancels a pending transaction and removes it from the queue. This allows the DAO to cancel one of its own decision before it is executed.                                                                                                                                                                                                                                                          | Governor (DAO)                      |
| Timelock                                    | executeTransaction              | Executes a transaction that was previously queued, if the corresponding delay has passed.                                                                                                                                                                                                                                                                                                          | Governor (DAO)                      |
| GovernorBravoDelegator (proxy)              | \_setImplementation             | Upgrades the **`GovernorBravoDelegate`** (governance logic). A rogue admin could replace it with a backdoored version that grants itself unilateral proposal powers or skips the timelock, effectively seizing governance control.                                                                                                                                                                 | Timelock (DAO)                      |
| GovernorBravoDelegate                       | initialize                      | Used to initialize the contract during delegator constructor                                                                                                                                                                                                                                                                                                                                       | Timelock (DAO)                      |
| GovernorBravoDelegate                       | cancel                          | Cancels an active proposal. Anyone can cancel a proposal if the proposer's voting power fell below the proposal threshold. The proposal guardian and the proposer itself are allowed to cancel a proposal at any time.                                                                                                                                                                             | Proposal Guardian & Proposer        |
| GovernorBravoDelegate                       | \_setVotingDelay                | Updates the voting delay parameter. The voting delay is the number of Ethereum blocks to wait before voting on a proposal may begin. This delay is part of the overall time between a proposal is made and executed and contributes to the exit window.                                                                                                                                            | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_setVotingPeriod               | Updates the voting period parameter. The voting period is the time people have to vote on a proposal. A lower period increases the vulnerability of the protocol as people have less time to deny a malicious proposal in the case of an attacker with a voting power high enough to cover the quorum.                                                                                             | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_setProposalThreshold          | Updates the proposal threshold parameter. The proposal threshold is the minimum number of votes required for an account to create a proposal. If this number is too low it could allow users to flood the governance with proposals.                                                                                                                                                               | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_setWhitelistAccountExpiration | Writes an expiration timestamp for a whitelisted account’s ability to bypass the normal proposal‐threshold check. This lets trusted actors propose without holding the usual token stake, streamlining governance for known contributors. A compromised whitelistGuardian could expire all whitelisted accounts immediately, blocking any new proposals even from legitimate, pre-approved actors. | Timelock (DAO) or Proposal Guardian |
| GovernorBravoDelegate                       | \_setWhitelistGuardian          | Assigns a new address to whitelistGuardian, granting that address authority to whitelist or expire proposal accounts. The whitelistGuardian role can thus grant expedited proposal rights to selected actors. A malicious admin could appoint an attacker as whitelistGuardian, who then whitelists only colluding addresses and freezes out honest proposals.                                     | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_setProposalGuardian           | Sets a new proposalGuardian address, empowering that address to cancel any proposal unilaterally. The proposalGuardian acts as an emergency brake, able to halt malicious or erroneous proposals before they queue in the timelock. A rogue admin could install a colluding proposalGuardian who cancels every legitimate proposal, effectively vetoing all governance.                            | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_initiate                      | Initiate the GovernorBravo contract **.** Sets initial proposal id which initiates the contract, ensuring a continuous proposal id count                                                                                                                                                                                                                                                           | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_setPendingAdmin               | Writes a new pendingAdmin address.. Controls who can then call `_acceptAdmin` to become the new admin. A malicious admin could point pendingAdmin at an attacker, who then finalizes control and reconfigures the entire protocol arbitrarily.                                                                                                                                                     | Timelock (DAO)                      |
| GovernorBravoDelegate                       | \_acceptAdmin                   | Moves pendingAdmin into admin and clears pendingAdmin. This finalizes the transfer of all governance privileges (voting delays, periods, thresholds, guardianships, etc.) to the new admin. A compromised or malicious pendingAdmin could call this and immediately seize full governance control—reconfiguring parameters or blocking proposals with no recourse.                                 | pendingAdmin                        |

## Dependencies

The compound-v2 protocol relies on a Chainlink oracle feed to price collateral and base assets in the system. It doesn’t have a full secondary oracle feed or liveness checks, but its **`PriceOracle`** contract does include a minimal “fallback” feature:

-   **Fixed‐price fallback**: if an administrator has set a fixedPrice for a given asset, then getUnderlyingPrice will return this hard-coded price in case of error on the primary price source.

-   **Impact**: this allows the protocol to continue operating with a sane collateral price if the main feed is down or misbehaving, preventing total system paralysis.

So the protocol does not validate asset prices returned by Chainlink or offer a valid fallback oracle mechanism.

**`PiceOracle`** fetches prices from Chainlink Price Feeds when requested for a specific cToken.

The Chainlink oracle system itself is upgradeable without decentralized ownership over those permissions. This dependency thus introduces centralization risk in the Compound-v2 protocol.

The [Compound community multisig](https://etherscan.io/address/0xbbf3f1421d886e9b2c5d716b5192ac998af2012c) has the ability to update the configs on the Price Feed. The multisig has the flexibility to make the following changes:

-   **Add new markets**

-   **Update price feed for markets**

-   **Update fixed price for markets**

-   **Remove old markets**

## Upgrade process

The Compound protocol is governed and upgraded by COMP token-holders, using three distinct components; the [COMP](https://etherscan.io/token/0xc00e94cb662c3520282e6f5717214004a7f26888) token, governance module ([Governor Bravo](https://etherscan.io/address/0xc0da02939e1441f497fd74f78ce7decb17b66529)), and [Timelock](#0). Together, these contracts allow the community to propose, vote, and implement changes through the administrative functions of a cToken or the Comptroller. Proposals can modify system parameters, support new markets, or add entirely new functionality to the protocol.

COMP token-holders can delegate their voting rights to themselves, or an address of their choice. Addresses delegated at least 25,000 COMP can create governance proposals; any address can lock 100 COMP to create an Autonomous Proposal, which becomes a governance proposal after being delegated 25,000 COMP.

When a governance proposal is created, it enters a 2 day review period, after which voting weights are recorded and voting begins. Voting lasts for 3 days; if a majority, and at least 400,000 votes are cast for the proposal, it is queued in the Timelock, and can be implemented 2 days later. In total, any change to the protocol takes at least one week.

[Source](https://docs.compound.finance/v2/governance/)

# Security Council

A security council called `Pause Guardian` has the power to pause all deposits, withdrawals, and transfers in the protocol. The guardian is currently a 4/8 multisig made oGovernorBravoDelegate. The signers announced [on the governance forum](https://www.comp.xyz/t/community-multisig-4-of-6-deployment/134/18) match the current [signers set](https://etherscan.io/address/0xbbf3f1421D886E9b2c5D716B5192aC998af2012c#readProxyContract#F9) and are related to a pseudonym . The same multisig is also `Proposal Guardian` and has the power to cancel Governance Proposals before their executions.

| Requirement                                             | Pause Guardian       | Proposal Guardian    |
|---------------------------------------------------------|----------------------|----------------------|
| At least 7 signers                                      | ✅                   | ✅                   |
| At least 51% threshold                                  | ❌                   | ❌                   |
| At least 50% non-insider signers                        | ❌                   | ❌                   |
| Signers are publicly announced (with name or pseudonym) | ✅                   | ✅                   |
