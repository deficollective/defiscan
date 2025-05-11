---
protocol: "Kodiak Finance V3"
website: "https://www.kodiak.finance/"
x: "https://x.com/KodiakFi"
github: ["https://github.com/Kodiak-Finance"]
defillama_slug: ["kodiak-v3"](https://defillama.com/protocol/kodiak-v3)
chain: "Berachain"
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "H"]
author: ["gnart33"]
submission_date: "2025-05-07"
publish_date: "2025-05-07"
update_date: "2025-05-07"
---

# Summary
Kodiak Finance V3 is a comprehensive liquidity hub on Berachain that combines multiple DeFi components into a unified platform. At its core, it offers both Uniswap V2-style (constant product) and V3-style (concentrated liquidity) AMMs, with a protocol fee of 35% from launch. The platform's unique "Kodiak Islands" system provides ERC20-wrapped V3 positions in two variants: Managed Islands, which are protocol-run with automatic rebalancing and a 10% fee, and Unmanaged Islands that allow users to deploy their own positions without rebalancing.
A distinctive feature of Kodiak is its integrated incentive layer and no-code token deployer factory called "Panda Factory." This system enables token launches on Berachain using bonding curves with several innovative features: a 1B total supply model, zero initial liquidity requirement, configurable price ranges, and support for base tokens like BERA and HONEY. The Panda Factory includes an optional same-block buy feature for deployers (up to 10% of supply) and implements a graduation mechanism where tokens transition from the bonding curve to the Kodiak DEX once 80-90% of the supply is purchased.
The protocol's architecture is built on immutable contracts rather than using proxy upgradeable contracts, with protocol parameters managed through multi-sig wallets.
# Overview

## Chain

Berachain Mainnet, an EVM-Identical Layer 1 blockchain utilizing Proof-of-Liquidity 

> Chain score: Low

## Upgradeability

The protocol's upgradeability risk is primarily concentrated in three key areas:

1. **Fee Management & Protocol Parameters**
- All core protocol fees (35% protocol fee, island fees, pool fees) can be modified by Safe Wallet 1
- Fee tiers can be enabled/disabled, potentially breaking pool functionality
- Treasury addresses can be changed, allowing redirection of all protocol fees

2. **Implementation Control**
- Island implementations can be updated, potentially introducing malicious code
- Farm implementations can be whitelisted, allowing deployment of malicious farm contracts
- PandaPool implementations can be controlled, affecting token launch security
- DEX factory addresses can be changed, impacting graduated token liquidity

3. **Emergency Controls & User Protection**
- Staking operations can be paused, blocking new deposits
- Reward collection can be paused, preventing users from claiming rewards
- Emergency withdrawals can be enabled, potentially disrupting farm economics
- Addresses can be greylisted, blocking legitimate users from staking

The protocol uses three multi-sig wallets (2/4, 3/6, and 2/3) to manage these permissions. While ownership can be renounced for each contract, this would permanently lock the protocol in its current state. The high concentration of critical permissions in these wallets represents a significant upgradeability risk, as compromised keys could lead to:
- Loss of user funds through malicious implementations
- Blocking of user access to their funds
- Redirection of protocol fees
- Disruption of core protocol functionality

> Upgradeability score: High
> 
> Justification: The protocol has multiple functions that could directly result in the theft or loss of user funds if compromised, including the ability to deploy malicious implementations and redirect funds during token graduation. These risks, combined with the concentration of critical permissions in multi-sig wallets, warrant a High risk rating.

## Autonomy

The protocol's autonomy is controlled by three multi-sig wallets with low thresholds:

1. Safe Wallet 1 (2/4): Controls UniswapV3Factory and FarmFactory
2. Safe Wallet 2 (2/3): Controls KodiakIslandFactory
3. Safe Wallet 3 (2/3): Controls PandaFactory

These wallets can immediately execute all critical functions without any timelock or governance process.

> Autonomy score: High
>
> Justification: The protocol exhibits Stage 0 centralization with three low-threshold multi-sig wallets controlling all critical functions. These permissions can directly result in the theft or loss of user funds through malicious implementations and parameter changes, with no timelock or community governance safeguards.

## Exit Window

The protocol has no exit window mechanisms, allowing immediate execution of all critical functions by multi-sig wallets.

> Exit Window score: High
>
> Justification: The protocol has no exit window mechanisms, and all critical functions can be executed immediately by multi-sig wallets. Combined with the High upgradeability risk, this represents a significant risk to user funds as there is no protection period for users to exit before potentially malicious changes take effect.


## Accessibility
Kodiak is accessible through only a frontend [kodiak.finance](https://app.kodiak.finance/), no code is available on Github.

> Accessibility score: High

# Technical Analysis

## Contracts

| Contract Name       | Address                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| UniswapV3Factory    | [0xD84CBf0B02636E7f53dB9E5e45A616E05d710990](https://berascan.com/address/0xD84CBf0B02636E7f53dB9E5e45A616E05d710990) |
| SwapRouter          | [0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690](https://berascan.com/address/0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690) |
| SwapRouter02        | [0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4](https://berascan.com/address/0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4) |
| QuoterV2            | [0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B](https://berascan.com/address/0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B) |
| MixedRouteQuoterV1  | [0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB](https://berascan.com/address/0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB) |
| TickLens            | [0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48](https://berascan.com/address/0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48) |
| KodiakIslandFactory | [0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6](https://berascan.com/address/0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6) |
| IslandRouter        | [0x679a7C63FC83b6A4D9C1F931891d705483d4791F](https://berascan.com/address/0x679a7C63FC83b6A4D9C1F931891d705483d4791F) |
| KodiakIsland        | [0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590](https://berascan.com/address/0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590) |
| FarmFactory         | [0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF](https://berascan.com/address/0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF) |
| KodiakFarm          | [0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa](https://berascan.com/address/0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa) |
| PandaFactory        | [0xac335fe675699b0ce4c927bdaa572eb647ed9f02](https://berascan.com/address/0xac335fe675699b0ce4c927bdaa572eb647ed9f02) |

## Permission owners

| Name          | Account                                                                                                               | Type         |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Safe Wallet 1 | [0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED](https://berascan.com/address/0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED) | Multisig 2/4 |
| Safe Wallet 2 | [0x7D8A57bf453ecf440093fe6484c78B91b377e638](https://berascan.com/address/0x7D8A57bf453ecf440093fe6484c78B91b377e638) | Multisig 3/6 |
| Safe Wallet 3 | [0x8A98f7A3dF97029bd8992966044a06DEe4CC5299](https://berascan.com/address/0x8A98f7A3dF97029bd8992966044a06DEe4CC5299) | Multisig 2/3 |

## Permissions
| Contract            | Function                   | Impact                                                                                                                               | Owner         |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| UniswapV3Factory    | setOwner                   | Changes the owner address. Owner can modify fee protocol and amounts. Malicious owner could set extreme fees or disable fee amounts. | Safe Wallet 1 |
| UniswapV3Factory    | setDefaultFeeProtocol      | Sets protocol fee percentage. Currently 35%. Malicious owner could set extreme fees, affecting all pool economics.                   | Safe Wallet 1 |
| UniswapV3Factory    | enableFeeAmount            | Enables/disables fee tiers. Malicious owner could disable all fee tiers, breaking pool functionality.                                | Safe Wallet 1 |
| KodiakIslandFactory | renounceOwnership          | Removes admin control. Prevents future upgrades and parameter changes. Could permanently lock protocol in current state.             | Safe Wallet 2 |
| KodiakIslandFactory | transferOwnership          | Transfers admin control. New owner gains full control over island parameters and upgrades.                                           | Safe Wallet 2 |
| KodiakIslandFactory | setIslandImplementation    | Updates island contract implementation. Malicious owner could deploy malicious implementation stealing user funds.                   | Safe Wallet 2 |
| KodiakIslandFactory | setTreasury                | Changes fee recipient. Malicious owner could redirect all fees to their address.                                                     | Safe Wallet 2 |
| KodiakIslandFactory | setIslandFee               | Sets island fee percentage. Malicious owner could set extreme fees, making islands unviable.                                         | Safe Wallet 2 |
| FarmFactory         | renounceOwnership          | Removes admin control. Prevents future farm parameter changes. Could permanently lock farming functionality.                         | Safe Wallet 1 |
| FarmFactory         | transferOwnership          | Transfers admin control. New owner gains control over farm parameters and implementations.                                           | Safe Wallet 1 |
| FarmFactory         | setXKdk                    | Sets XKodiak token address. Malicious owner could set malicious token, affecting all farm rewards.                                   | Safe Wallet 1 |
| FarmFactory         | setAllowedImplementation   | Controls farm implementations. Malicious owner could whitelist malicious farm contracts.                                             | Safe Wallet 1 |
| KodiakFarm          | renounceOwnership          | Removes admin control. Prevents future farm parameter changes. Could permanently lock staking functionality.                         | Safe Wallet 1 |
| KodiakFarm          | transferOwnership          | Transfers admin control. New owner gains control over all farm parameters and emergency controls.                                    | Safe Wallet 1 |
| KodiakFarm          | setGreylist                | Blocks addresses from staking. Malicious owner could blacklist legitimate users.                                                     | Safe Wallet 1 |
| KodiakFarm          | setStakesUnlocked          | Enables emergency withdrawals. Malicious owner could unlock all stakes, disrupting farm economics.                                   | Safe Wallet 1 |
| KodiakFarm          | setStakingPaused           | Pauses new staking. Malicious owner could permanently pause staking, blocking new deposits.                                          | Safe Wallet 1 |
| KodiakFarm          | setRewardsCollectionPaused | Pauses reward collection. Malicious owner could block all reward claims.                                                             | Safe Wallet 1 |
| KodiakFarm          | addNewRewardToken          | Adds new reward tokens. Malicious owner could add malicious tokens or set extreme rates.                                             | Safe Wallet 1 |
| KodiakFarm          | setStakingTokenCap         | Sets maximum staking amount. Malicious owner could set extremely low caps, limiting farm capacity.                                   | Safe Wallet 1 |
| PandaFactory        | renounceOwnership          | Removes admin control. Prevents future parameter changes. Could permanently lock token launch functionality.                         | Safe Wallet 3 |
| PandaFactory        | transferOwnership          | Transfers admin control. New owner gains control over all token launch parameters.                                                   | Safe Wallet 3 |
| PandaFactory        | setMinRaise                | Sets minimum fundraising threshold. Malicious owner could set unreasonably high minimums, preventing new launches.                   | Safe Wallet 3 |
| PandaFactory        | setMinTradeSize            | Sets minimum trade size. Malicious owner could set extreme minimums, making pools unusable.                                          | Safe Wallet 3 |
| PandaFactory        | setTreasury                | Changes fee recipient. Malicious owner could redirect all protocol fees.                                                             | Safe Wallet 3 |
| PandaFactory        | setDexFactory              | Sets DEX factory for graduated tokens. Malicious owner could point to malicious DEX, stealing funds during graduation.               | Safe Wallet 3 |
| PandaFactory        | setAllowedImplementation   | Controls pool implementations. Malicious owner could whitelist malicious pool contracts.                                             | Safe Wallet 3 |
| PandaFactory        | setWbera                   | Sets wrapped BERA address. Malicious owner could set malicious WBERA, breaking native swaps.                                         | Safe Wallet 3 |
| PandaFactory        | setIncentive               | Sets launch incentives. Malicious owner could set extreme incentives, draining protocol reserves.                                    | Safe Wallet 3 |
| PandaFactory        | setPandaPoolFees           | Sets pool fee structure. Malicious owner could set extreme fees, making pools unviable.                                              | Safe Wallet 3 |

## Dependencies

The protocol's autonomy is implemented through several key technical components:

1. **Multi-sig Implementation**
- Safe Wallet 1 (2/4): Controls core DEX parameters
  - `setOwner`: Can change owner address
  - `setDefaultFeeProtocol`: Can modify 35% protocol fee
  - `enableFeeAmount`: Can enable/disable fee tiers
- Safe Wallet 2 (2/3): Controls island management
  - `setIslandImplementation`: Can update island contract code
  - `setTreasury`: Can redirect fee collection
  - `setIslandFee`: Can modify island fees
- Safe Wallet 3 (2/3): Controls token launch system
  - `setDexFactory`: Can change DEX for graduated tokens
  - `setAllowedImplementation`: Can whitelist pool implementations
  - `setPandaPoolFees`: Can modify pool fee structure

2. **Emergency Controls**
- `setStakingPaused`: Can block new deposits
- `setRewardsCollectionPaused`: Can block reward claims
- `setStakesUnlocked`: Can enable emergency withdrawals
- `setGreylist`: Can block addresses from staking

3. **Implementation Management**
- No timelock for implementation updates
- No delay for parameter changes
- No community governance process
- No safeguards against malicious updates

These dependencies create a highly centralized control structure where a small number of signers can immediately execute critical changes without any protection period for users.

## Exit Window

1. **Critical Functions Without Delay**
- Implementation Updates:
  ```solidity
  function setIslandImplementation(address _implementation) external onlyOwner {
      // No timelock, immediate execution
  }
  ```
- Parameter Changes:
  ```solidity
  function setDefaultFeeProtocol(uint24 feeProtocol0, uint24 feeProtocol1) external onlyOwner {
      // No timelock, immediate execution
  }
  ```
- Emergency Controls:
  ```solidity
  function setStakingPaused(bool _status) external onlyOwner {
      // No timelock, immediate execution
  }
  ```

2. **Multi-sig Execution Flow**
- Safe Wallet 1 (2/4): Can immediately execute DEX parameter changes
- Safe Wallet 2 (2/3): Can immediately update island implementations
- Safe Wallet 3 (2/3): Can immediately modify token launch parameters

3. **User Protection Mechanisms**
- No timelock contract implementation
- No delay period for parameter changes
- No governance voting period
- No emergency pause before execution

This implementation means users have no protection period to exit their positions before potentially malicious changes take effect.

# Security Council

| ✅ /❌ | Requirement                                             | Current Status |
| ---- | ------------------------------------------------------- | -------------- |
| ❌    | At least 7 signers                                      | 4-6 signers    |
| ❌    | At least 51% threshold                                  | 2/4, 3/6, 2/3  |
| ❌    | At least 50% non-insider signers                        | Unknown        |
| ❌    | Signers are publicly announced (with name or pseudonym) | Not announced  |

Current Multisig Configurations:
1. Safe Wallet 1: 2/4 threshold
2. Safe Wallet 2: 3/6 threshold
3. Safe Wallet 3: 2/3 threshold

None of the current multisig configurations meet the minimum requirements for a Security Council.