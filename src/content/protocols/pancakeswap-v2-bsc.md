---
protocol: "PancakeSwap-v2"
website: "https://pancakeswap.finance/"
x: "https://x.com/PancakeSwap"
github: ["https://github.com/pancakeswap"]
defillama_slug: ["pancakeswap-amm"]
chain: "Binance"
stage: 0
reasons: []
risks: ["L", "M", "M", "H", "M"]
author: ["noemacee"]
submission_date: "2025-05-13"
publish_date: "2025-05-19"
update_date: "2025-05-19"
---

# Summary

PancakeSwap v2 is an automated market maker on BNB Smart Chain, a fork of Uniswap v2 extended with an incentive layer. Users exchange BEP-20 tokens through liquidity pools, with trading fees distributed to the liquidity providers. Holders of liquidity-provider tokens can also deposit them in “Farms” to receive additional CAKE incentives.

# Ratings Overview

## Chain

Deployed on **Binance Smart Chain**.

> Chain score: **Low**

## Upgradeability

Key economic parameters remain mutable and funnel through **two 3-of-6 multisigs** (with an optional timelock that is not always enforced):

About the AMM :
The Factory contract remains upgradeable through a internal multisig (we call it GnosisSafe #1) that can change the feeTo address. A single transaction, once signed by any three key-holders, reroutes the 0.08 % protocol fee from every liquidity pool to a destination of their choice. Because liquidity positions themselves are immutable, users do not lose principal nor 0.17% fee, but protocol fee's can be diverted without notice.

About the incentive layer :
All reward parameters in MasterChef V2—the list of farms, their allocation points, the CAKE burn split and the address that receives “burned” CAKE, can be rewritten by the same internal multisig (we call it GnosisSafe #2) after a minimum six-hour timelock. An update could throttle rewards for public pools or funnel all emissions to an insider pool, erasing the yield on honest users’ staked LP tokens while inflating CAKE supply. Note : The burn address is the currently the multi-sig itself. We are left at their honesty to burn it correctly.

In MasterChef V1 the GnosisSAfe #1 can call dev() directly, without any delay, to change the wallet that receives ten per cent of every CAKE mint. That power affects only unclaimed rewards, but it does so instantly: once executed, a share of each new mint flows to the attacker’s address until the function is invoked again.

> Upgradeability score: **Medium**

## Autonomy

PancakeSwap v2’s AMM contracts (Factory, Pairs) have no external price oracle or off-chain dependency: swaps resolve only against on-chain reserves.  
The CAKE **incentive layer (MasterChef V1 + V2)**, however, introduces an internal dependency: LP rewards rely on a single token (CAKE) that is minted at a fixed rate of 40 CAKE per block and distributed under the control of a 3-of-6 multisig. Distribution of CAKE can directly impact rewards in the system and thus result in the loss of unclaimed yield.

> Autonomy score: **Medium**

## Exit Window

Any update to farming parameters, whether adding new Farms, changing allocation points, or adjusting emission splits—must be queued through the protocol’s timelock and cannot execute until at least six hours after being scheduled. This enforced delay gives stakers a clear window to withdraw or migrate their tokens before the change takes effect.

In contrast, governance can reassign the 0.08 % protocol fee at any time by calling the Factory’s fee-routing function. Because this action bypasses the timelock, fee redirection occurs instantly and leaves no exit window for LPs to react.

Once a liquidity pair is deployed, its internal fee-distribution logic is permanent: the 0.17 % trading fee directed to liquidity providers cannot be turned off or paused by any admin or multisig. Moreover, neither the Pair nor MasterChef contracts include a freeze switch, so LPs always retain the ability to remove their liquidity on demand.

> Exit-Window score: **High**

## Accessibility

Users primarily interact with PancakeSwap v2 through its official web interface at https://pancakeswap.finance, which is developed and maintained by Pancake Labs. For those who prefer a self-hosted setup—or wish to run a custom UI—PancakeSwap’s frontend code is published under an MIT license at https://github.com/pancakeswap/pancake-frontend. The repository’s README walks through cloning the project, installing dependencies, configuring environment variables, making it straightforward for anyone to deploy their own instance of the interface.

> Accessibility score: **Medium**

## Conclusion

The PancakeSwap-v2 protocol receives **Low, Medium, Medium, High and Medium** risk scores for the Chain, Upgradeability, Autonomy, Exit-Window and Accessibility dimensions, respectively, placing it in **Stage 0**. This rating comes from the concentration of decisive authority in pairs of 3-of-6 multisigs and from Pancake Labs’ position as the sole distributor of the main web front-end, leaving users dependent on a single operator for both governance and interface.

The protocol could reach Stage 1 by; bringing all fee-switch and CAKE-mint authorities—including in MasterChef V1 under a ≥ 7-signer, ≥ 51 %-quorum Security Council, and 2 guaranteeing that the same council or timelock gates every future change to fees and ownership.

The project could advance to Stage 2 if every critical permission concerning CAKE fee incentive distribution was irrevocably assigned to on-chain governance and protected by a long Exit Window, with multiple independent front-ends ensuring continuous user access.

# Reviewer's Notes

PancakeSwap follows the standard Uniswap V2 pattern with the addition of a incentive layer (V1 + V2). The way they upgraded from PancakeSwap V1 to V2 the MigrationHelper was not in the scope of this review.

# Protocol Analysis

https://app.excalidraw.com/l/9pt8PDVB43r/k5Y6Daznbm

PancakeFactory : Acts as the on‑chain directory and deployer for every liquidity pool. When createPair(tokenA, tokenB) is called it deterministically clones the PancakePair template and initialises the new pair. Two mutable variables govern fees: feeTo (recipient of the 0.08 % protocol cut) and feeToSetter (address allowed to change feeTo). Both can be changed with a 3‑of‑6 multisig call, making Factory the choke‑point for all AMM fee flows.

PancakeRouter V2 : A stateless helper that strings together common user actions. During swaps it calculates the best path through one or more PancakePair contracts, pulls the caller’s tokens, and routes them hop‑by‑hop, enforcing the user’s amountOutMin and deadline. For liquidity it wraps addLiquidity/removeLiquidity, handles slippage limits and token approvals, and wraps or unwraps WBNB when native BNB is involved. After execution it holds no residual balances.

MasterChef V1 : The legacy farming contract that mints a fixed 40 CAKE every block. Ninety percent goes to pool rewards and ten percent to a dev address that the multisig can switch instantly via dev() (no Timelock). Because all CAKE supply originates here, V1 remains the root monetary‑policy lever even after V2 launched.

MasterChef V2 : The active farming layer where users stake LP tokens to earn CAKE. It receives freshly‑minted CAKE from V1 and allocates it to pools based on allocPoint. Governance (Timelock‑gated multisig) can add/remove pools, adjust weights, and tweak the burn/reward split.

# Dependencies

This protocol is deployed on **BNB Smart Chain**; if the chain halts, censors transactions, or suffers prolonged congestion, every swap, liquidity movement, and MasterChef call is blocked. In such an outage the protocol’s pools become illiquid and the emission schedule pauses because new CAKE cannot be minted on a stalled L1.

All mutable parameters pass through two **Gnosis Safe 3-of-6 multisigs**. If a quorum cannot be reached—because keys are lost, signers go offline, or signatures are withheld—routine updates such as adding a new farm or adjusting emission rates become impossible. Conversely, if an attacker compromises three keys, they can immediately redirect the 0.08 % protocol fee or the full CAKE emission stream; the optional timelock offers no protection against direct multisig calls in MasterChef V1.

# Governance

## Security Council

PancakeSwap v2 is governed by two Gnosis Safe wallets configured as **3-of-6 multisigs**.
While this adds redundancy, the setup **does not satisfy** DeFiScan’s Security-Council requirements.

| Name          | Account           | Type            | ≥ 7 signers | ≥ 51 % threshold  | ≥ 50 % non-insider | Signers\* |
| ------------- | ----------------- | --------------- | ----------- | ----------------- | ------------------ | --------- |
| GnosisSafe #1 | `0xcEba6028…a0e`  | 3-of-6 multisig | ✕ (6)       | ✕ (3 of 6 = 50 %) | ✕ (undisclosed)    | 6         |
| GnosisSafe #2 | `0xeCc90d54…aa9E` | 3-of-6 multisig | ✕ (6)       | ✕ (3 of 6 = 50 %) | ✕ (undisclosed)    | 6         |

Because none of the criteria are met, PancakeSwap v2 **lacks a qualifying Security Council** and cannot rely on this mechanism to mitigate central-admin risk.

# Technical Analysis

## Contracts

| Contract               | Address                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| PancakeFactory         | [`0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73`](https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73) |
| PancakeRouter V2       | [`0x10ED43C718714eb63d5aA57B78B54704E256024E`](https://bscscan.com/address/0x10ED43C718714eb63d5aA57B78B54704E256024E) |
| PancakePair (CAKE-BNB) | [`0x0eD7e52944161450477ee417DE9Cd3a859b14fD0`](https://bscscan.com/address/0x0eD7e52944161450477ee417DE9Cd3a859b14fD0) |
| MasterChefV2           | [`0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652`](https://bscscan.com/address/0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652) |
| Timelock               | [`0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4`](https://bscscan.com/address/0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4) |
| MigrationHelper        | [`0x6e85689f055B6894803d5135981F7B108C9DAfd5`](https://bscscan.com/address/0x6e85689f055B6894803d5135981F7B108C9DAfd5) |
| CakeToken              | [`0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82`](https://bscscan.com/address/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82) |
| MasterChef V1          | [`0x73feaa1eE314F8c655E354234017bE2193C9E24E`](https://bscscan.com/address/0x73feaa1eE314F8c655E354234017bE2193C9E24E) |

## All Permission owners

| Name            | Address                                                                                                                | Type              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- |
| PancakeFactory  | [`0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73`](https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73) | Contract          |
| GnosisSafe #1   | [`0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e`](https://bscscan.com/address/0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e) | Internal Multisig |
| Timelock        | [`0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4`](https://bscscan.com/address/0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4) | Contract          |
| GnosisSafe #2   | [`0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E`](https://bscscan.com/address/0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E) | Internal Multisig |
| MasterChefV2    | [`0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652`](https://bscscan.com/address/0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652) | Contract          |
| MigrationHelper | [`0x6e85689f055B6894803d5135981F7B108C9DAfd5`](https://bscscan.com/address/0x6e85689f055B6894803d5135981F7B108C9DAfd5) | Contract          |
| MasterChef V1   | [`0x73feaa1eE314F8c655E354234017bE2193C9E24E`](https://bscscan.com/address/0x73feaa1eE314F8c655E354234017bE2193C9E24E) | Contract          |

## Permissions

| Contract       | Function          | Impact                                                                                                                                                                                                                                                                                    | Owner / Signer                                        |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| PancakeFactory | setFeeTo          | Sets a new `feeTo` address that receives the 0.08 % protocol cut from **every** pool. This instantly diverts the entire fee stream.                                                                                                                                                       | Multisig `0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e` |
| PancakeFactory | setFeeToSetter    | Assigns the right to call `setFeeTo` to a new address. This hands permanent control of fee-switch power to a different signer set. A malicious transfer could move control from a multisig to a single EOA, allowing unilateral fee theft.                                                | Multisig `0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e` |
| MasterChefV2   | add               | Creates a new farm with arbitrary allocation points. This reshapes CAKE distribution and can siphon rewards from existing pools. A malicious owner could add a “ghost” pool with zero real liquidity that captures 100 % of emissions.                                                    | Timelock `0xA1f482Dc…e8fE4`                           |
| MasterChefV2   | set               | Rewrites `allocPoint` of any existing pool. This re-weights how CAKE emissions are shared. A hostile change could drop public pools to near-zero rewards and funnel emissions to insider pools.                                                                                           | Timelock `0xA1f482Dc…e8fE4`                           |
| MasterChefV2   | updateCakeRate    | Updates the percentages sent to burn, regular, and special farms. This alters CAKE’s inflation schedule. Setting burn rate to 0 % while doubling farm rewards would inflate supply rapidly and erode token value.                                                                         | Timelock `0xA1f482Dc…e8fE4`                           |
| MasterChefV2   | burnCake          | Transfers accumulated CAKE to the `burnAdmin` address. Intended to reduce supply, it actually sends tokens to whatever address is set. If that address is switched to an attacker wallet, “burns” become free payouts. Currently the `burnAdmin`is GnosisSafe #1                          | Timelock `0xA1f482Dc…e8fE4`                           |
| MasterChefV2   | transferOwnership | Writes a new `owner` for MasterChefV2. Control over emissions, pool lists, and admin settings moves with it. Transferring to a rogue EOA would let a single key redirect or freeze all farming rewards.                                                                                   | Timelock `0xA1f482Dc…e8fE4`                           |
| Timelock       | setDelay          | Changes the global execution delay for queued governance calls. This defines the minimum exit window for users. Dropping the delay to the 6-hour minimum gives LPs little time to react to hostile proposals.                                                                             | Timelock itself                                       |
| CakeToken      | mint              | Calls `_mint`, increasing total CAKE supply and sending tokens to any address. This is the root of all farming emissions. MasterChef V1 is the only contract that can call this mint function, it is a fixed 40 CAKE per block mint maximum inside MasterChef's logic.                    | MasterChef V1 `0x73feaa1e…e24E`                       |
| CakeToken      | transferOwnership | Assigns a new owner with full mint authority. Control of CAKE inflation moves entirely to the new address. If passed to a malicious contract, unlimited CAKE could be minted, destroying token economics. It is uncallable function since MasterChef V1 functions have no way to call it. | MasterChef V1 `0x73feaa1e…e24E`                       |
