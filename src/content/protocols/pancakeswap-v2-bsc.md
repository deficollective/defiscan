---
protocol: "PancakeSwap-v2"
website: "https://pancakeswap.finance/"
x: "https://x.com/PancakeSwap"
github: ["https://github.com/pancakeswap"]
defillama_slug: ["pancakeswap-amm"]
chain: "Binance Smart Chain"
stage: 0
reasons: ["remove", "if none"]
risks: ["L", "M", "M", "H", "M"]
author: ["noemacee"]
submission_date: "2025-05-13"
publish_date: "2025-05-13"
update_date: "2025-05-13"
---

# Summary

PancakeSwap v2 is a decentralized automated‑market‑maker on Binance Smart Chain that modernizes its predecessor much as Uniswap v2 upgraded Uniswap v1. Swaps route directly between any two BEP‑20 tokens—no BNB intermediary—under a 0.25 % trading fee, of which 0.17 % goes to liquidity providers while about 0.0575 % is automatically used to buy back and burn the native CAKE token, creating a feedback loop that links LP income to CAKE scarcity.

Where PancakeSwap departs most sharply from Uniswap is yield: LP tokens can be staked in MasterChef “Farms” to earn freshly minted CAKE on top of swap fees. This emissions layer turns PancakeSwap v2 into both a low‑slippage DEX and a yield engine at the center of the BNB‑Chain ecosystem.

# Overview

## Chain

Deployed on **Binance Smart Chain**.

> Chain score: **Low**

## Upgradeability

Key economic parameters remain mutable and funnel through **three 3-of-6 multisigs** (with an optional timelock that is not always enforced):

- **Fee extraction** – The multisig can redirect the 0.08% protocol fee of any pool to any address.

- **Emissions steering** – By adding pools or changing allocation points in MasterChefV2, the multisig can starve existing LPs of CAKE or allocate outsized rewards to insider pools. This is equivalent to 40 CAKE a block limit.

The 3-of-6 scheme offers redundancy in the event of a single key loss, but it centralizes control within a small group, whose interests may not align with those of the broader community. While the optional timelock feature helps reduce the risk of sudden parameter changes, it only addresses part of the MasterChef and CAKE yield mechanism, not the AMM protocol fee distribution. If either **MasterChefV2** or **MasterChefV1** were compromised, a malicious actor could redirect all rewards to their own pool, preventing CAKE from being burned as intended, and potentially depleting user pools of CAKE.

> Upgradeability score: **Medium**

## Autonomy

PancakeSwap v2’s core AMM (Factory + Pair contracts) has **no external price oracle, keeper, or off-chain dependency**: swaps resolve only against on-chain reserves.  
The CAKE **emission layer (MasterChef V1 + V2)**, however, introduces an internal dependency: LP rewards rely on a single token (CAKE) that is minted under the control of a 3-of-6 multisig.

> Autonomy score: **Medium**

## Exit Window

- Most farm changes pass a Timelock (≥ 6 h delay) → users can exit before execution.
- Protocol-fee switch in each Pair is immutable.
- Admins cannot freeze LP withdrawals.

> Exit-Window score: **High**

## Accessibility

| Access route  | Details                                                                                      | Maintainer   |
| ------------- | -------------------------------------------------------------------------------------------- | ------------ |
| **Web UI**    | <https://pancakeswap.finance>                                                                | Pancake Labs |
| **Self-host** | MIT-licensed repo <https://github.com/pancakeswap/pancake-frontend> – build & serve anywhere | Community    |

> Accessibility score: **Medium**

# Technical Analysis

## Contracts

| Contract               | Address                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| PancakeFactory         | [`0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73`](https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73) |
| PancakeRouter V2       | [`0x10ED43C718714eb63d5aA57B78B54704E256024E`](https://bscscan.com/address/0x10ED43C718714eb63d5aA57B78B54704E256024E) |
| GnosisSafe #1          | [`0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e`](https://bscscan.com/address/0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e) |
| PancakePair (CAKE-BNB) | [`0x0eD7e52944161450477ee417DE9Cd3a859b14fD0`](https://bscscan.com/address/0x0eD7e52944161450477ee417DE9Cd3a859b14fD0) |
| MasterChefV2           | [`0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652`](https://bscscan.com/address/0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652) |
| Timelock               | [`0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4`](https://bscscan.com/address/0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4) |
| GnosisSafe #2          | [`0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E`](https://bscscan.com/address/0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E) |
| MigrationHelper        | [`0x6e85689f055B6894803d5135981F7B108C9DAfd5`](https://bscscan.com/address/0x6e85689f055B6894803d5135981F7B108C9DAfd5) |
| CakeToken              | [`0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82`](https://bscscan.com/address/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82) |
| MasterChef V1          | [`0x73feaa1eE314F8c655E354234017bE2193C9E24E`](https://bscscan.com/address/0x73feaa1eE314F8c655E354234017bE2193C9E24E) |

## Permission owners

| Name            | Address                                                                                                                | Type         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ |
| PancakeFactory  | [`0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73`](https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73) | Contract     |
| GnosisSafe #1   | [`0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e`](https://bscscan.com/address/0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e) | Multisig 3/6 |
| Timelock        | [`0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4`](https://bscscan.com/address/0xA1f482Dc58145Ba2210bC21878Ca34000E2e8fE4) | Contract     |
| GnosisSafe #2   | [`0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E`](https://bscscan.com/address/0xeCc90d54B10ADd1ab746ABE7E83abe178B72aa9E) | Multisig 3/6 |
| MasterChefV2    | [`0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652`](https://bscscan.com/address/0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652) | Contract     |
| MigrationHelper | [`0x6e85689f055B6894803d5135981F7B108C9DAfd5`](https://bscscan.com/address/0x6e85689f055B6894803d5135981F7B108C9DAfd5) | Contract     |
| MasterChef V1   | [`0x73feaa1eE314F8c655E354234017bE2193C9E24E`](https://bscscan.com/address/0x73feaa1eE314F8c655E354234017bE2193C9E24E) | Contract     |

## Permission

| Contract       | Function          | Impact                                                                                                                                                                                                                                                                                    | Owner / Signer                  |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| PancakeFactory | setFeeTo          | Sets a new `feeTo` address that receives the 0.08 % protocol cut from **every** pool. This instantly diverts the entire fee stream.                                                                                                                                                       | Multisig `0xcEba6028…a0e`       |
| PancakeFactory | setFeeToSetter    | Assigns the right to call `setFeeTo` to a new address. This hands permanent control of fee-switch power to a different signer set. A malicious transfer could move control from a multisig to a single EOA, allowing unilateral fee theft.                                                | Multisig `0xcEba6028…a0e`       |
| MasterChefV2   | add               | Creates a new farm with arbitrary allocation points. This reshapes CAKE distribution and can siphon rewards from existing pools. A malicious owner could add a “ghost” pool with zero real liquidity that captures 100 % of emissions.                                                    | Timelock `0xA1f482Dc…e8fE4`     |
| MasterChefV2   | set               | Rewrites `allocPoint` of any existing pool. This re-weights how CAKE emissions are shared. A hostile change could drop public pools to near-zero rewards and funnel emissions to insider pools.                                                                                           | Timelock `0xA1f482Dc…e8fE4`     |
| MasterChefV2   | updateCakeRate    | Updates the percentages sent to burn, regular, and special farms. This alters CAKE’s inflation schedule. Setting burn rate to 0 % while doubling farm rewards would inflate supply rapidly and erode token value.                                                                         | Timelock `0xA1f482Dc…e8fE4`     |
| MasterChefV2   | burnCake          | Transfers accumulated CAKE to the `burnAdmin` address. Intended to reduce supply, it actually sends tokens to whatever address is set. If that address is switched to an attacker wallet, “burns” become free payouts.                                                                    | Timelock `0xA1f482Dc…e8fE4`     |
| MasterChefV2   | transferOwnership | Writes a new `owner` for MasterChefV2. Control over emissions, pool lists, and admin settings moves with it. Transferring to a rogue EOA would let a single key redirect or freeze all farming rewards.                                                                                   | Timelock `0xA1f482Dc…e8fE4`     |
| Timelock       | setDelay          | Changes the global execution delay for queued governance calls. This defines the minimum exit window for users. Dropping the delay to the 6-hour minimum gives LPs little time to react to hostile proposals.                                                                             | Timelock itself                 |
| CakeToken      | mint              | Calls `_mint`, increasing total CAKE supply and sending tokens to any address. This is the root of all farming emissions. MasterChef V1 is the only contract that can call this mint function, it is a fixed 40 CAKE per block mint maximum int MasterChef's logic.                       | MasterChef V1 `0x73feaa1e…e24E` |
| CakeToken      | transferOwnership | Assigns a new owner with full mint authority. Control of CAKE inflation moves entirely to the new address. If passed to a malicious contract, unlimited CAKE could be minted, destroying token economics. It is uncallable function since MasterChef V1 functions have no way to call it. | MasterChef V1 `0x73feaa1e…e24E` |

## Dependencies

| Dependency          | Type     | Risk if it fails                                                       |
| ------------------- | -------- | ---------------------------------------------------------------------- |
| Binance Smart Chain | L1 chain | All swaps & CAKE emission halt                                         |
| CAKE token          | ERC-20   | Reward flow stops                                                      |
| GnosisSafe multisig | Admin    | Parameter changes blocked, protocol fee's and CAKE emissions hijacked, |

## Exit Window

> Exit Window score: **Medium**

PancakeSwap v2 exposes **three distinct paths** through which governance can change parameters that materially affect LPs or yield farmers and CAKE holders.
Only two of those paths are enforced by the Timelock; the third is a direct call gated by the 3-of-6 multisig.

| Path                                                                        | What can change                                                            | Who signs                      | Delay before execution        | Grace period            | User actions possible during delay                                             |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------ | ----------------------------- | ----------------------- | ------------------------------------------------------------------------------ |
| **Timelock → Factory**<br>`setFeeTo(...)`                                   | Redirects the 0.08 % protocol-fee stream of every pool to a new address    | 3-of-6 multisig via Timelock   | ≥ 6 h – ≤ 30 d (configurable) | 14 d, currently 8 hours | Remove liquidity, unwind positions                                             |
| **Timelock → MasterChefV2**<br>`add / set / updateCakeRate / burnCake(...)` | Creates or reprioritises farms, changes CAKE emission splits and burn rate | 3-of-6 multisig via Timeloc√√k | ≥ 6 h – ≤ 30 d                | 14 d, currently 8 hours | Withdraw or migrate staked LPs                                                 |
| **Multisig → MasterChefV1**<br>`dev(...)` (10 % mint share)                 | Changes the developer address that receives 10 % of every CAKE mint        | 3-of-6 multisig (direct)       | 0 s                           | —                       | LPs can still harvest/withdraw but inflation share can be redirected instantly |

**Practical implications**

- **User funds in pools** – `PancakePair` contracts are immutable; LPs can redeem liquidity at any time. Changing the protocol-fee address only affects fee distribution, not principal.
- **Staked funds in MasterChef V1/V2** – Deposits and withdrawals remain permission-less, so users can exit as soon as they notice an unfavourable governance queue. The _effective_ exit window is therefore the Timelock delay (**≥ 6 h**).
- **No freeze switch** – There is no guardian pause; the risk is dilution of CAKE rewards rather than loss or lock-up of tokens.

# Security Council

PancakeSwap v2 is governed by two Gnosis Safe wallets configured as **3-of-6 multisigs**.
While this adds redundancy, the setup **does not satisfy** DeFiScan’s Security-Council requirements.

| ✅ /❌ | Requirement                                        | Observation                                        |
| ------ | -------------------------------------------------- | -------------------------------------------------- |
| ❌     | **At least 7 signers**                             | Each Safe has 6 signers                            |
| ❌     | **≥ 51 % threshold**                               | 3-of-6 = 50 %                                      |
| ❌     | **≥ 50 % non-insider signers**                     | Signer identities not disclosed; presumed insiders |
| ❌     | **Signers publicly announced (name or pseudonym)** | No public list available                           |

Because none of the criteria are met, PancakeSwap v2 **lacks a qualifying Security Council** and cannot rely on this mechanism to mitigate central-admin risk.
