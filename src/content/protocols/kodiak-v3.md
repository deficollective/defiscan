---
protocol: "Kodiak Finance V3"
website: "https://www.kodiak.finance/"
x: "https://x.com/KodiakFi"
github: ["https://github.com/Kodiak-Finance"]
defillama_slug: ["kodiak-v3"](https://defillama.com/protocol/kodiak-v3)
chain: "Berachain"
stage: 0
reasons: []
risks: ["L", "M", "H", "H", "H"]
author: ["gnart33"]
submission_date: "2025-05-07"
publish_date: "2025-05-07"
update_date: "2025-05-07"
---

# Summary
Kodiak Finance V3 is a comprehensive liquidity hub on Berachain that combines multiple DeFi components into a unified platform. At its core, it offers both Uniswap V2-style (constant product) and V3-style (concentrated liquidity) AMMs, with a protocol fee of 35% from launch. 
- "Kodiak Islands" system provides ERC20-wrapped V3 positions, where users can provide liquidity in two variants: 
  - Managed Islands, which are protocol-run with automatic rebalancing and a 10% fee, 
  - Unmanaged Islands that allow users to deploy their own positions without rebalancing.
- Users can stake their LP tokens in the RewardVault contract to earn additional rewards from the protocol's incentive layer.
- A distinctive feature of Kodiak is its integrated incentive layer and no-code token deployer factory called "Panda Factory." (which will deploy a PandaToken). This system enables token launches on Berachain using bonding curves with several features: a 1B total supply model, zero initial liquidity requirement, configurable price ranges, and support for base tokens like BERA and HONEY. The Panda Factory includes an optional same-block buy feature for deployers (up to 10% of supply) and implements a graduation mechanism where tokens transition from the bonding curve to the Kodiak DEX once 80-90% of the supply is purchased.
- The protocol's architecture is built on immutable contracts rather than using proxy upgradeable contracts, with protocol parameters managed through multi-sig wallets.

# Ratings

## Chain

Berachain Mainnet, an EVM-Identical Layer 1 blockchain utilizing Proof-of-Liquidity 

> Chain score: Low

## Upgradeability

The multiple multi-sig wallets control the upgradeability/implementation/parameter changes of the protocol, including: setDefaultFeeProtocol, enableFeeAmount, setIslandFee (20% max), setTreasury. None of them show possiblity of theft or loss of user funds or loss of unclaimed yield, but malicious actions could lead to unexpected behavior of the system.

> Upgradeability score: Medium

## Autonomy

The protocol's autonomy is controlled by three multi-sig wallets with low thresholds:

1. Safe Wallet 1 (2/4): Controls UniswapV3Factory and FarmFactory
2. Safe Wallet 2 (2/3): Controls KodiakIslandFactory
3. Safe Wallet 3 (2/3): Controls PandaFactory
4. Safe Wallet 4 (3/5): Controls RewardVaultFactory

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

## Conclusion

# Contracts and Permissions

## Contracts

| Contract Name          | Address                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| UniswapV3Factory       | [0xD84CBf0B02636E7f53dB9E5e45A616E05d710990](https://berascan.com/address/0xD84CBf0B02636E7f53dB9E5e45A616E05d710990) |
| SwapRouter             | [0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690](https://berascan.com/address/0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690) |
| SwapRouter02           | [0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4](https://berascan.com/address/0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4) |
| QuoterV2               | [0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B](https://berascan.com/address/0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B) |
| MixedRouteQuoterV1     | [0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB](https://berascan.com/address/0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB) |
| TickLens               | [0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48](https://berascan.com/address/0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48) |
| KodiakIslandFactory    | [0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6](https://berascan.com/address/0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6) |
| IslandRouter           | [0x679a7C63FC83b6A4D9C1F931891d705483d4791F](https://berascan.com/address/0x679a7C63FC83b6A4D9C1F931891d705483d4791F) |
| KodiakIslandWithRouter | [0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590](https://berascan.com/address/0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590) |
| FarmFactory            | [0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF](https://berascan.com/address/0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF) |
| KodiakFarm             | [0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa](https://berascan.com/address/0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa) |
| PandaFactory           | [0xac335fe675699b0ce4c927bdaa572eb647ed9f02](https://berascan.com/address/0xac335fe675699b0ce4c927bdaa572eb647ed9f02) |
| XKodiakToken           | [0xe8D7b965BA082835EA917F2B173Ff3E035B69eeB](https://berascan.com/address/0xe8D7b965BA082835EA917F2B173Ff3E035B69eeB) |
| RewardVault            | [0x45325Df4A6A6ebD268f4693474AaAa1f3f0ce8Ca](https://berascan.com/address/0x45325Df4A6A6ebD268f4693474AaAa1f3f0ce8Ca) |
| RewardVaultFactory     | [0xc7d78aa74a88d909ba73c783e197e6c4552f3e51](https://berascan.com/address/0xc7d78aa74a88d909ba73c783e197e6c4552f3e51) |
| ERC1967Proxy           | [0x94ad6ac84f6c6fba8b8ccbd71d9f4f101def52a8](https://berascan.com/address/0x94ad6ac84f6c6fba8b8ccbd71d9f4f101def52a8) |
| PandaToken             | [0x33D8D074f08F232bA5dc09e0339BD62B1cDDf5f9](https://berascan.com/address/0x33D8D074f08F232bA5dc09e0339BD62B1cDDf5f9) |
| UniswapV3Pool          | [0x36815beB3494c6ad3A33540cC242d0B563fe91C0](https://berascan.com/address/0x36815beB3494c6ad3A33540cC242d0B563fe91C0) |

## Permission owners

| Name          | Account                                                                                                               | Type         |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Safe Wallet 1 | [0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED](https://berascan.com/address/0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED) | Multisig 2/4 |
| Safe Wallet 2 | [0x7D8A57bf453ecf440093fe6484c78B91b377e638](https://berascan.com/address/0x7D8A57bf453ecf440093fe6484c78B91b377e638) | Multisig 3/6 |
| Safe Wallet 3 | [0x8A98f7A3dF97029bd8992966044a06DEe4CC5299](https://berascan.com/address/0x8A98f7A3dF97029bd8992966044a06DEe4CC5299) | Multisig 2/3 |
| Safe Wallet 4 | [0xD13948F99525FB271809F45c268D72a3C00a568D](https://berascan.com/address/0xD13948F99525FB271809F45c268D72a3C00a568D) | Multisig 3/5 |

## Permissions
| Contract            | Function                   | Impact                                                                                                                                                                                                                                              | Owner         |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| UniswapV3Factory    | setOwner                   | Changes the owner address. Owner can modify fee protocol and amounts.                                                                                                                                                                               | Safe Wallet 1 |
| UniswapV3Factory    | setDefaultFeeProtocol      | Sets protocol fee percentage for new pools, does not affect existing ones. Currently 35%.                                                                                                                                                           | Safe Wallet 1 |
| UniswapV3Factory    | enableFeeAmount            | Enables/disables fee tiers.                                                                                                                                                                                                                         | Safe Wallet 1 |
| UniswapV3Pool       | setFeeProtocol             | Allows the owner to set a fee percentage that is deducted from the LPs fees. It only affects the pool where the function is called. The fee is required to be less than 10% of the total accumulated fees. It only affects future accumulated fees. | Safe Wallet 1 |
| UniswapV3Pool       | collectProtocol            | Withdraws the accumulated protocol fees to a custom address.The owner triggers the withdraw and specifies the address.                                                                                                                              | Safe Wallet 1 |
| KodiakIslandFactory | renounceOwnership          | Removes admin control. Prevents future upgrades and parameter changes. Could permanently lock protocol in current state.                                                                                                                            | Safe Wallet 2 |
| KodiakIslandFactory | transferOwnership          | Transfers admin control. New owner gains full control over island parameters and upgrades.                                                                                                                                                          | Safe Wallet 2 |
| KodiakIslandFactory | setIslandImplementation    | Updates island contract implementation, affects new instances deployed by the factory. The current IslandImplementation is [KodiakIslandWithRouter](https://berascan.com/address/0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590)                        | Safe Wallet 2 |
| KodiakIslandFactory | setTreasury                | Changes fee recipient, redirects all fees to new address.                                                                                                                                                                                           | Safe Wallet 2 |
| KodiakIslandFactory | setIslandFee               | Sets island fee percentage, guardrailded at 20% max.                                                                                                                                                                                                | Safe Wallet 2 |
| FarmFactory         | renounceOwnership          | Removes admin control. Prevents future farm parameter changes. Could permanently lock farming functionality.                                                                                                                                        | Safe Wallet 1 |
| FarmFactory         | transferOwnership          | Transfers admin control.                                                                                                                                                                                                                            | Safe Wallet 1 |
| FarmFactory         | setXKdk                    | Sets XKodiak token address for FarmFactory                                                                                                                                                                                                          | Safe Wallet 1 |
| FarmFactory         | setAllowedImplementation   | Whitelists a farm implementation to be allowed to be deployed by factory                                                                                                                                                                            | Safe Wallet 1 |
| KodiakFarm          | renounceOwnership          | Removes admin control. Prevents future farm parameter changes. Could permanently lock staking functionality.                                                                                                                                        | Safe Wallet 1 |
| KodiakFarm          | transferOwnership          | Transfers admin control. New owner gains control over all farm parameters and emergency controls.                                                                                                                                                   | Safe Wallet 1 |
| KodiakFarm          | setGreylist                | Blocks addresses from staking.                                                                                                                                                                                                                      | Safe Wallet 1 |
| KodiakFarm          | setStakesUnlocked          | Enables emergency withdrawals.                                                                                                                                                                                                                      | Safe Wallet 1 |
| KodiakFarm          | setStakingPaused           | Pauses new staking.                                                                                                                                                                                                                                 | Safe Wallet 1 |
| KodiakFarm          | setRewardsCollectionPaused | Pauses reward collection.                                                                                                                                                                                                                           | Safe Wallet 1 |
| KodiakFarm          | addNewRewardToken          | Adds new reward tokens.                                                                                                                                                                                                                             | Safe Wallet 1 |
| KodiakFarm          | setStakingTokenCap         | Sets maximum staking amount.                                                                                                                                                                                                                        | Safe Wallet 1 |
| PandaFactory        | renounceOwnership          | Removes admin control. Prevents future parameter changes. Could permanently lock token launch functionality.                                                                                                                                        | Safe Wallet 3 |
| PandaFactory        | transferOwnership          | Transfers admin control. New owner gains control over all token launch parameters.                                                                                                                                                                  | Safe Wallet 3 |
| PandaFactory        | setMinRaise                | Sets minimum fundraising threshold.                                                                                                                                                                                                                 | Safe Wallet 3 |
| PandaFactory        | setMinTradeSize            | Sets minimum trade size.                                                                                                                                                                                                                            | Safe Wallet 3 |
| PandaFactory        | setTreasury                | Changes fee recipient, redirects all fees to new address.                                                                                                                                                                                           | Safe Wallet 3 |
| PandaFactory        | setDexFactory              | Sets DEX factory for graduated tokens.                                                                                                                                                                                                              | Safe Wallet 3 |
| PandaFactory        | setAllowedImplementation   | Whitelists PandaPool implementations.                                                                                                                                                                                                               | Safe Wallet 3 |
| PandaFactory        | setWbera                   | Sets wrapped BERA address.                                                                                                                                                                                                                          | Safe Wallet 3 |
| PandaFactory        | setIncentive               | Sets launch incentives.                                                                                                                                                                                                                             | Safe Wallet 3 |
| PandaFactory        | setPandaPoolFees           | Sets pool fee structure. Fees cannot lead to loss of funds for PandaToken (immutable after deployment).                                                                                                                                             | Safe Wallet 3 |
| RewardVaultFactory  | setBGTIncentiveDistributor | Sets the BGTIncentiveDistributor contract                                                                                                                                                                                                           | Safe Wallet 4 |
| RewardVaultFactory  | grantRole                  | Grant roles, including Factory Owner, Factory Manager, and Factory Vault Pauser                                                                                                                                                                     | Safe Wallet 4 |
| RewardVaultFactory  | revokeRole                 | Revoke roles, including Factory Owner, Factory Manager, and Factory Vault Pauser                                                                                                                                                                    | Safe Wallet 4 |
| RewardVault         | setDistributor             | Updates the distributor address that control the distribution of rewards                                                                                                                                                                            | Safe Wallet 4 |
| RewardVault         | recoverERC20               | Allows the contract owner to recover ERC20 tokens that were accidentally sent to the contract, but not whitelisted incentive tokens and staked tokens                                                                                               | Safe Wallet 4 |
| RewardVault         | removeIncentiveToken       | Deletes the token from the incentives mapping.                                                                                                                                                                                                      | Safe Wallet 4 |
| RewardVault         | updateIncentiveManager     | Updates the incentive manager address                                                                                                                                                                                                               | Safe Wallet 4 |
| RewardVault         | pause                      | Allows the factory vault pauser to pause the vault.                                                                                                                                                                                                 | Safe Wallet 4 |
| RewardVault         | unpause                    | Unpause the vault                                                                                                                                                                                                                                   | Safe Wallet 4 |


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
- Safe Wallet 4 (3/5): Can immediately modify reward vault parameters

3. **User Protection Mechanisms**
- No timelock contract implementation
- No delay period for parameter changes
- No governance voting period
- No emergency pause before execution

This implementation means users have no protection period to exit their positions before potentially malicious changes take effect.

## Risk Parameter Control

| Multisig / Role        | Address                                    | Type         | At least 7 signers | At least 51% threshold | ≥50% non-insider signers | Signers publicly announced |
| ---------------------- | ------------------------------------------ | ------------ | ------------------ | ---------------------- | ------------------------ | -------------------------- |
| Farming parameters     | 0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED | Multisig 2/4 | ❌                  | ❌                      | ❌                        | ❌                          |
| Liquidity parameters   | 0x7D8A57bf453ecf440093fe6484c78B91b377e638 | Multisig 3/6 | ❌                  | ❌                      | ❌                        | ❌                          |
| PandasToken parameters | 0x8A98f7A3dF97029bd8992966044a06DEe4CC5299 | Multisig 2/3 | ❌                  | ✅                      | ❌                        | ❌                          |
| RewardVault parameters | 0xD13948F99525FB271809F45c268D72a3C00a568D | Multisig 3/5 | ❌                  | ✅                      | ❌                        | ❌                          |


| Role               | Risk Parameter | Controlled by | Guardrails enforced by | Contract            |
| ------------------ | -------------- | ------------- | ---------------------- | ------------------- |
| Farming parameters |                | Multisig 2/4  |                        | UniswapV3Factory    |
|                    |                | Multisig 3/6  |                        | KodiakIslandFactory |
|                    |                | Multisig 2/3  |                        | PandaFactory        |
|                    |                | Multisig 3/5  |                        | RewardVaultFactory  |
