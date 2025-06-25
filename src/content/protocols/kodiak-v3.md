---
protocol: "Kodiak Finance V3"
website: "https://www.kodiak.finance/"
x: "https://x.com/KodiakFi"
github: ["https://github.com/Kodiak-Finance"]
defillama_slug: ["kodiak-v3"]
chain: "Berachain"
stage: "0"
reasons: []
risks: ["H", "M", "H", "H", "H"]
author: ["CookingCryptos"]
submission_date: "2025-05-07"
publish_date: "2025-05-07"
update_date: "2025-05-07"
---

# Summary
### A FAIRE

Kodiak Finance V3 is a comprehensive liquidity hub on Berachain that combines multiple DeFi components into a unified platform. At its core, it offers both Uniswap V2-style (constant product) and V3-style (concentrated liquidity) AMMs, with a protocol fee of 35% from launch. 
- "Kodiak Islands" system provides ERC20-wrapped V3 positions, where users can provide liquidity in two variants: 
  - Managed Islands, which are protocol-run with automatic rebalancing and a 10% fee, 
  - Unmanaged Islands that allow users to deploy their own positions without rebalancing.
- Users can stake their LP tokens in the RewardVault contract to earn additional rewards from the protocol's incentive layer.
- A distinctive feature of Kodiak is its integrated incentive layer and no-code token deployer factory called "Panda Factory." (which will deploy a PandaToken). This system enables token launches on Berachain using bonding curves with several features: a 1B total supply model, zero initial liquidity requirement, configurable price ranges, and support for base tokens like BERA and HONEY. The Panda Factory includes an optional same-block buy feature for deployers (up to 10% of supply) and implements a graduation mechanism where tokens transition from the bonding curve to the Kodiak DEX once 80-90% of the supply is purchased.
- The protocol's architecture is built on immutable contracts rather than using proxy upgradeable contracts, with protocol parameters managed through multi-sig wallets.

# Ratings

## Chain

Kodiak Finance operates on Berachain Mainnet, an EVM-compatible L1 blockchain using Proof-of-Liquidity consensus. This system limits validators to 100 active nodes, selected based on their "LiqPower", a metric derived from liquidity provision and received delegations. Validators must maintain robust infrastructure and substantial liquidity positions, creating correlation between network security and DeFi ecosystem health.

While L2beat's "stages" framework is commonly used to evaluate Ethereum Layer 2 solutions, it can provide insight when applied to Berachain as an independent blockchain. Unlike L2s, Berachain maintains its own security model without inheriting Ethereum's security guarantees. The Proof-of-Liquidity consensus centralizes influence among major liquidity providers, with the founding team playing a significant governance role during this early phase. The network's BFT-based consensus theoretically allows up to one-third of validators to act maliciously before security is compromised, though the high barriers to becoming a validator concentrate power among well-capitalized entities.

> Chain score: High

## Upgradeability
### A FAIRE
The multiple multi-sig wallets control the upgradeability/implementation/parameter changes of the protocol, including: setDefaultFeeProtocol, enableFeeAmount, setIslandFee (20% max), setTreasury. None of them show possiblity of theft or loss of user funds or loss of unclaimed yield, but malicious actions could lead to unexpected behavior of the system.

The protocol's autonomy is controlled by three multi-sig wallets with low thresholds:

1. Safe Wallet 1 (2/4): Controls UniswapV3Factory and FarmFactory
2. Safe Wallet 2 (2/3): Controls KodiakIslandFactory
3. Safe Wallet 3 (2/3): Controls PandaFactory
4. Safe Wallet 4 (3/5): Controls RewardVaultFactory

These wallets can immediately execute all critical functions without any timelock or governance process.

>
> Justification: The protocol exhibits Stage 0 centralization with three low-threshold multi-sig wallets controlling all critical functions. These permissions can directly result in the theft or loss of user funds through malicious implementations and parameter changes, with no timelock or community governance safeguards.

> Upgradeability score: Medium

## Autonomy
### A FAIRE



> Autonomy score: High


## Exit Window


The protocol has no exit window mechanisms, allowing immediate execution of all critical functions by multi-sig wallets.

> Exit Window score: High

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
- Multisig 1 (Farming parameters)  (2/4): Can immediately execute DEX parameter changes
- Multisig 2 (Liquidity parameters) (3/6): Can immediately update island implementations
- Multisig 3 (PandasToken parameters) (2/3): Can immediately modify token launch parameters
- Multisig 4 (RewardVault parameters) (3/5): Can immediately modify reward vault parameters

3. **User Protection Mechanisms**
- No timelock contract implementation
- No delay period for parameter changes
- No governance voting period
- No emergency pause before execution

This implementation means users have no protection period to exit their positions before potentially malicious changes take effect.


## Accessibility

Kodiak is accessible only through its official web interface [kodiak.finance](https://app.kodiak.finance/). This interface is not open source and cannot be self-hosted by users.

> Accessibility score: High

## Conclusion

# Reviewer Notes

# Protocol Analysis

# Dependencies

# Governance

## Security Council

| Multisig / Role                     | Address                                                                                                               | Type         | At least 7 signers | At least 51% threshold | ≥50% non-insider signers | Signers publicly announced |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|--------------------|------------------------|--------------------------|----------------------------|
| Multisig 1 (Farming parameters)     | [0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED](https://etherscan.io/address/0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED) | Multisig 2/4 | ❌                  | ❌                      | ❌                        | ❌                          |
| Multisig 2 (Liquidity parameters)   | [0x7D8A57bf453ecf440093fe6484c78B91b377e638](https://etherscan.io/address/0x7D8A57bf453ecf440093fe6484c78B91b377e638) | Multisig 3/6 | ❌                  | ❌                      | ❌                        | ❌                          |
| Multisig 3 (PandasToken parameters) | [0x8A98f7A3dF97029bd8992966044a06DEe4CC5299](https://etherscan.io/address/0x8A98f7A3dF97029bd8992966044a06DEe4CC5299) | Multisig 2/3 | ❌                  | ✅                      | ❌                        | ❌                          |
| Multisig 4 (RewardVault parameters) | [0xD13948F99525FB271809F45c268D72a3C00a568D](https://etherscan.io/address/0xD13948F99525FB271809F45c268D72a3C00a568D) | Multisig 3/5 | ❌                  | ✅                      | ❌                        | ❌                          |

# Contracts and Permissions

## Contracts

| Contract Name                       | Address                                                                                                               |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| UniswapV3Factory                    | [0xD84CBf0B02636E7f53dB9E5e45A616E05d710990](https://berascan.com/address/0xD84CBf0B02636E7f53dB9E5e45A616E05d710990) |
| UniswapV2Factory                    | [0x5e705e184d233ff2a7cb1553793464a9d0c3028f](https://berascan.com/address/0x5e705e184d233ff2a7cb1553793464a9d0c3028f) |
| NonfungiblePositionManager          | [0xFE5E8C83FFE4d9627A75EaA7Fee864768dB989bD](https://berascan.com/address/0xFE5E8C83FFE4d9627A75EaA7Fee864768dB989bD) |
| SwapRouter                          | [0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690](https://berascan.com/address/0xEd158C4b336A6FCb5B193A5570e3a571f6cbe690) |
| SwapRouter02                        | [0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4](https://berascan.com/address/0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4) |
| UniswapV2Router02                   | [0xd91dd58387Ccd9B66B390ae2d7c66dBD46BC6022](https://berascan.com/address/0xd91dd58387Ccd9B66B390ae2d7c66dBD46BC6022) |
| UniswapV2Pair                       | [0xa8f9d7ea6baa104454bbcad647a4c8b17778969c](https://berascan.com/address/0xa8f9d7ea6baa104454bbcad647a4c8b17778969c) |
| QuoterV2                            | [0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B](https://berascan.com/address/0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B) |
| MixedRouteQuoterV1                  | [0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB](https://berascan.com/address/0xfa0276F06161cC2f66Aa51f3500484EdF8Fc94bB) |
| TickLens                            | [0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48](https://berascan.com/address/0xa73C6F1FeC76D5487dC30bdB8f11d1F390394b48) |
| Multicall                           | [0x89ff70257bc747F310bB538eeFC46aDD763e75d8](https://berascan.com/address/0x89ff70257bc747F310bB538eeFC46aDD763e75d8) |
| Multicall3                          | [0xcA11bde05977b3631167028862bE2a173976CA11](https://berascan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11) |
| KodiakIslandFactory                 | [0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6](https://berascan.com/address/0x5261c5A5f08818c08Ed0Eb036d9575bA1E02c1d6) |
| IslandRouter                        | [0x679a7C63FC83b6A4D9C1F931891d705483d4791F](https://berascan.com/address/0x679a7C63FC83b6A4D9C1F931891d705483d4791F) |
| KodiakIslandWithRouter              | [0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590](https://berascan.com/address/0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590) |
| FarmFactory                         | [0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF](https://berascan.com/address/0xAeAa563d9110f833FA3fb1FF9a35DFBa11B0c9cF) |
| KodiakFarm                          | [0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa](https://berascan.com/address/0xEB81a9EEAF156d4Cfec2AF364aF36Ad65cF9f0fa) |
| XKodiakToken                        | [0xe8D7b965BA082835EA917F2B173Ff3E035B69eeB](https://berascan.com/address/0xe8D7b965BA082835EA917F2B173Ff3E035B69eeB) |
| PandaFactory                        | [0xac335fe675699b0ce4c927bdaa572eb647ed9f02](https://berascan.com/address/0xac335fe675699b0ce4c927bdaa572eb647ed9f02) |
| BaultFactory                        | [0xffCAED1971C28cCcEaff111f4eD2235532537b8F](https://berascan.com/address/0xffCAED1971C28cCcEaff111f4eD2235532537b8F) |
| BaultRouter                         | [0x89c8c594f8Dea5600bf8A30877E921a5E63DCCF3](https://berascan.com/address/0x89c8c594f8Dea5600bf8A30877E921a5E63DCCF3) |
| BountyHelper                        | [0xd7af1F067d038fB5Aaa58a3F2707A0e95AAb998B](https://berascan.com/address/0xd7af1F067d038fB5Aaa58a3F2707A0e95AAb998B) |
| WBERA                               | [0x6969696969696969696969696969696969696969](https://berascan.com/address/0x6969696969696969696969696969696969696969) |

| RewardVault (Minimal Proxy????)     | [0x45325Df4A6A6ebD268f4693474AaAa1f3f0ce8Ca](https://berascan.com/address/0x45325Df4A6A6ebD268f4693474AaAa1f3f0ce8Ca) |
| RewardVault (Implementation)        | [0x6aca3678362d3d887510a83a56dc8bbbc8f54f39](https://berascan.com/address/0x6aca3678362d3d887510a83a56dc8bbbc8f54f39) |
| RewardVaultFactory (Proxy)          | [0x94ad6ac84f6c6fba8b8ccbd71d9f4f101def52a8](https://berascan.com/address/0x94ad6ac84f6c6fba8b8ccbd71d9f4f101def52a8) |
| RewardVaultFactory (Implementation) | [0xc7d78aa74a88d909ba73c783e197e6c4552f3e51](https://berascan.com/address/0xc7d78aa74a88d909ba73c783e197e6c4552f3e51) |
| PandaToken (Minimal Proxy????)      | [0x33D8D074f08F232bA5dc09e0339BD62B1cDDf5f9](https://berascan.com/address/0x33D8D074f08F232bA5dc09e0339BD62B1cDDf5f9) |
| PandaToken (Implementation)         | [0x682707f31350423980009161c8e696a8fb068b0d](https://berascan.com/address/0x682707f31350423980009161c8e696a8fb068b0d) |
| UniswapV3Pool                       | [0x36815beB3494c6ad3A33540cC242d0B563fe91C0](https://berascan.com/address/0x36815beB3494c6ad3A33540cC242d0B563fe91C0) |

## All Permission owners

| Name                                | Account                                                                                                               | Type         |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
| Multisig 1 (Farming parameters)     | [0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED](https://berascan.com/address/0x21802b7C3DF57e98df45f1547b0F1a72F2CD1aED) | Multisig 2/4 |
| Multisig 2 (Liquidity parameters)   | [0x7D8A57bf453ecf440093fe6484c78B91b377e638](https://berascan.com/address/0x7D8A57bf453ecf440093fe6484c78B91b377e638) | Multisig 3/6 |
| Multisig 3 (PandasToken parameters) | [0x8A98f7A3dF97029bd8992966044a06DEe4CC5299](https://berascan.com/address/0x8A98f7A3dF97029bd8992966044a06DEe4CC5299) | Multisig 2/3 |
| Multisig 4 (RewardVault parameters) | [0xD13948F99525FB271809F45c268D72a3C00a568D](https://berascan.com/address/0xD13948F99525FB271809F45c268D72a3C00a568D) | Multisig 3/5 |

## Permissions
| Contract            | Function                   | Impact                                                                                                                                                                                                                                              | Owner         |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| UniswapV3Factory    | setOwner                   | Changes the owner address. Owner can modify fee protocol and amounts.                                                                                                                                                                               | Multisig 1 |
| UniswapV3Factory    | setDefaultFeeProtocol      | Sets protocol fee percentage for new pools, does not affect existing ones. Currently 35%.                                                                                                                                                           | Multisig 1 |
| UniswapV3Factory    | enableFeeAmount            | Enables/disables fee tiers.                                                                                                                                                                                                                         | Multisig 1 |
| UniswapV3Pool       | setFeeProtocol             | Allows the owner to set a fee percentage that is deducted from the LPs fees. It only affects the pool where the function is called. The fee is required to be less than 10% of the total accumulated fees. It only affects future accumulated fees. | Multisig 1 |
| UniswapV3Pool       | collectProtocol            | Withdraws the accumulated protocol fees to a custom address.The owner triggers the withdraw and specifies the address.                                                                                                                              | Multisig 1 |
| KodiakIslandFactory | renounceOwnership          | Removes admin control. Prevents future upgrades and parameter changes. Could permanently lock protocol in current state.                                                                                                                            | Multisig 2 |
| KodiakIslandFactory | transferOwnership          | Transfers admin control. New owner gains full control over island parameters and upgrades.                                                                                                                                                          | Multisig 2 |
| KodiakIslandFactory | setIslandImplementation    | Updates island contract implementation, affects new instances deployed by the factory. The current IslandImplementation is [KodiakIslandWithRouter](https://berascan.com/address/0xCFe9Ee61c271fBA4D190498b5A71B8CB365a3590)                        | Multisig 2 |
| KodiakIslandFactory | setTreasury                | Changes fee recipient, redirects all fees to new address.                                                                                                                                                                                           | Multisig 2 |
| KodiakIslandFactory | setIslandFee               | Sets island fee percentage, guardrailded at 20% max.                                                                                                                                                                                                | Multisig 2 |
| FarmFactory         | renounceOwnership          | Removes admin control. Prevents future farm parameter changes. Could permanently lock farming functionality.                                                                                                                                        | Multisig 1 |
| FarmFactory         | transferOwnership          | Transfers admin control.                                                                                                                                                                                                                            | Multisig 1 |
| FarmFactory         | setXKdk                    | Sets XKodiak token address for FarmFactory                                                                                                                                                                                                          | Multisig 1 |
| FarmFactory         | setAllowedImplementation   | Whitelists a farm implementation to be allowed to be deployed by factory                                                                                                                                                                            | Multisig 1 |
| KodiakFarm          | renounceOwnership          | Removes admin control. Prevents future farm parameter changes. Could permanently lock staking functionality.                                                                                                                                        | Multisig 1 |
| KodiakFarm          | transferOwnership          | Transfers admin control. New owner gains control over all farm parameters and emergency controls.                                                                                                                                                   | Multisig 1 |
| KodiakFarm          | setGreylist                | Blocks addresses from staking.                                                                                                                                                                                                                      | Multisig 1 |
| KodiakFarm          | setStakesUnlocked          | Enables emergency withdrawals.                                                                                                                                                                                                                      | Multisig 1 |
| KodiakFarm          | setStakingPaused           | Pauses new staking.                                                                                                                                                                                                                                 | Multisig 1 |
| KodiakFarm          | setRewardsCollectionPaused | Pauses reward collection.                                                                                                                                                                                                                           | Multisig 1 |
| KodiakFarm          | addNewRewardToken          | Adds new reward tokens.                                                                                                                                                                                                                             | Multisig 1 |
| KodiakFarm          | setStakingTokenCap         | Sets maximum staking amount.                                                                                                                                                                                                                        | Multisig 1 |
| PandaFactory        | renounceOwnership          | Removes admin control. Prevents future parameter changes. Could permanently lock token launch functionality.                                                                                                                                        | Multisig 3 |
| PandaFactory        | transferOwnership          | Transfers admin control. New owner gains control over all token launch parameters.                                                                                                                                                                  | Multisig 3 |
| PandaFactory        | setMinRaise                | Sets minimum fundraising threshold.                                                                                                                                                                                                                 | Multisig 3 |
| PandaFactory        | setMinTradeSize            | Sets minimum trade size.                                                                                                                                                                                                                            | Multisig 3 |
| PandaFactory        | setTreasury                | Changes fee recipient, redirects all fees to new address.                                                                                                                                                                                           | Multisig 3 |
| PandaFactory        | setDexFactory              | Sets DEX factory for graduated tokens.                                                                                                                                                                                                              | Multisig 3 |
| PandaFactory        | setAllowedImplementation   | Whitelists PandaPool implementations.                                                                                                                                                                                                               | Multisig 3 |
| PandaFactory        | setWbera                   | Sets wrapped BERA address.                                                                                                                                                                                                                          | Multisig 3 |
| PandaFactory        | setIncentive               | Sets launch incentives.                                                                                                                                                                                                                             | Multisig 3 |
| PandaFactory        | setPandaPoolFees           | Sets pool fee structure. Fees cannot lead to loss of funds for PandaToken (immutable after deployment).                                                                                                                                             | Multisig 3 |
| RewardVaultFactory  | setBGTIncentiveDistributor | Sets the BGTIncentiveDistributor contract                                                                                                                                                                                                           | Multisig 4 |
| RewardVaultFactory  | grantRole                  | Grant roles, including Factory Owner, Factory Manager, and Factory Vault Pauser                                                                                                                                                                     | Multisig 4 |
| RewardVaultFactory  | revokeRole                 | Revoke roles, including Factory Owner, Factory Manager, and Factory Vault Pauser                                                                                                                                                                    | Multisig 4 |
| RewardVault         | setDistributor             | Updates the distributor address that control the distribution of rewards                                                                                                                                                                            | Multisig 4 |
| RewardVault         | recoverERC20               | Allows the contract owner to recover ERC20 tokens that were accidentally sent to the contract, but not whitelisted incentive tokens and staked tokens                                                                                               | Multisig 4 |
| RewardVault         | removeIncentiveToken       | Deletes the token from the incentives mapping.                                                                                                                                                                                                      | Multisig 4 |
| RewardVault         | updateIncentiveManager     | Updates the incentive manager address                                                                                                                                                                                                               | Multisig 4 |
| RewardVault         | pause                      | Allows the factory vault pauser to pause the vault.                                                                                                                                                                                                 | Multisig 4 |
| RewardVault         | unpause                    | Unpause the vault                                                                                                                                                                                                                                   | Multisig 4 |
