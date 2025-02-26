---
protocol: "Sky"
website: "https://sky.money/"
x: "https://x.com/SkyEcosystem"
github: ["https://github.com/makerdao"]
defillama_slug: ["maker"]
chain: "Ethereum"
stage: 0
risks: ["x", "x", "x", "x", "H"]
author: ["mmilien_"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

The Sky protocol is a decentralised protocol developed around the USDS stablecoin. It is managed by Sky ecosystem governance. The Sky Protocol features Sky tokens (USDS, SKY, DAI, MKR), the Sky Savings Rate, Sky Token Rewards, Activation Token Rewards, and SkyLink.The Protocol was built from the core module of the Maker Protocol and replaces Maker.

# Overview

## Chain

The Sky protocol is deployed on Ethereum and Base. This review focuses on the Ethereum mainnet deployment.

> Chain score: Low

## Upgradeability

In the upgradability section & risk we address bytecode upgrades and parameter changes that are permissioned.

We wrote a section explaining the Upgradeability Risk in our framework here: See http://defiscan.info/learn-more#upgradability

For some practical guidance follow this steps. It will help you in writing a nice report:

1. Run the [permission scanner](https://github.com/deficollective/permission-scanner)
2. Fill in all the permissioned functions in the table (`## Permissions`)
   - Remember: Each function with a permission needs to be considered when determining the risk on Upgradability
3. Get a mechanistic and precise understanding of each permissioned function
4. Assess impact for each function, look out for
   - loss/blocking of user funds
   - loss of unclaimed yield
   - change expected behavior significantly (blacklisting/kyc/fees/...)
5. Write the impact column based on your understanding
   - A good tipp when writing the impact column below, think of least 2,3 sentences:
   1. First sentence: what it does technically, e.g "It assigns a new address to the owner variable"
   2. Second: what is the impact within the system, e.g "The owner is permissioned to raise fees"
   3. Third: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield.
6. Summarise and abstract away technical details in this section here (`## Upgradeability`)

## Autonomy

See http://defiscan.info/learn-more#autonomy for more guidance.

## Exit Window

The minimum delay between approval and execution of a governance proposal is 18 hours.

> Exit Window score: High

## Accessibility

Sky has a main frontend at [sky.money](sky.money).

# Technical Analysis

## Contracts

The list of contract and deployment addresses is available in both the [official documentation](https://developers.sky.money/) and the protocol's [chainlog](https://chainlog.makerdao.com/).

| Contract Name                 | Address                                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Dai                           | [0x6B175474E89094C44Da98b954EedeAC495271d0F](https://etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F) |
| DaiJoin                       | [0x9759a6ac90977b93b58547b4a71c78317f391a28](https://etherscan.io/address/0x9759a6ac90977b93b58547b4a71c78317f391a28) |
| DaiUsds                       | [0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A](https://etherscan.io/address/0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A) |
| MKR Token                     | [0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2](https://etherscan.io/address/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2) |
| DssLitePsm                    | [0xf6e72Db5454dd049d0788e411b06CfAF16853042](https://etherscan.io/address/0xf6e72Db5454dd049d0788e411b06CfAF16853042) |
| DssVestMintable               | [0xB313Eab3FdE99B2bB4bA9750C2DDFBe2729d1cE9](https://etherscan.io/address/0xB313Eab3FdE99B2bB4bA9750C2DDFBe2729d1cE9) |
| FlapperUniV2                  | [0xc5A9CaeBA70D6974cBDFb28120C3611Dd9910355](https://etherscan.io/address/0xc5A9CaeBA70D6974cBDFb28120C3611Dd9910355) |
| LockStakeEngine (Seal Engine) | [0x2b16C07D5fD5cC701a0a871eae2aad6DA5fc8f12](https://etherscan.io/address/0x2b16C07D5fD5cC701a0a871eae2aad6DA5fc8f12) |
| MkrSky                        | [0xBDcFCA946b6CDd965f99a839e4435Bcdc1bc470B](https://etherscan.io/address/0xBDcFCA946b6CDd965f99a839e4435Bcdc1bc470B) |
| OracleWrapper                 | [0x38e8c1D443f546Dc014D7756ec63116161CB7B25](https://etherscan.io/address/0x38e8c1D443f546Dc014D7756ec63116161CB7B25) |
| Sky                           | [0x56072C95FAA701256059aa122697B133aDEd9279](https://etherscan.io/address/0x56072C95FAA701256059aa122697B133aDEd9279) |
| Splitter                      | [0xBF7111F13386d23cb2Fba5A538107A73f6872bCF](https://etherscan.io/address/0xBF7111F13386d23cb2Fba5A538107A73f6872bCF) |
| SplitterMom                   | [0xF51a075d468dE7dE3599C1Dc47F5C42d02C9230e](https://etherscan.io/address/0xF51a075d468dE7dE3599C1Dc47F5C42d02C9230e) |
| StakingRewards                | [0x0650CAF159C5A49f711e8169D4336ECB9b950275](https://etherscan.io/address/0x0650CAF159C5A49f711e8169D4336ECB9b950275) |
| StakingRewards                | [0x10ab606B067C9C461d8893c47C7512472E19e2Ce](https://etherscan.io/address/0x10ab606B067C9C461d8893c47C7512472E19e2Ce) |
| SUsds (Proxy)                 | [0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD](https://etherscan.io/address/0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD) |
| SUsds (Implementation)        | [0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0](https://etherscan.io/address/0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0) |
| Usds (Proxy)                  | [0xdC035D45d973E3EC169d2276DDab16f1e407384F](https://etherscan.io/address/0xdC035D45d973E3EC169d2276DDab16f1e407384F) |
| Usds (Implementation)         | [0x1923DfeE706A8E78157416C29cBCCFDe7cdF4102](https://etherscan.io/address/0x1923DfeE706A8E78157416C29cBCCFDe7cdF4102) |
| UsdsJoin                      | [0x3C0f895007CA717Aa01c8693e59DF1e8C3777FEB](https://etherscan.io/address/0x3C0f895007CA717Aa01c8693e59DF1e8C3777FEB) |
| UsdsPsmWrapper                | [0xA188EEC8F81263234dA3622A406892F3D630f98c](https://etherscan.io/address/0xA188EEC8F81263234dA3622A406892F3D630f98c) |
| VestedRewardsDistribution     | [0x2F0C88e935Db5A60DDA73b0B4EAEef55883896d9](https://etherscan.io/address/0x2F0C88e935Db5A60DDA73b0B4EAEef55883896d9) |
| VestedRewardsDistributionJob  | [0x6464C34A02DD155dd0c630CE233DD6e21C24F9A5](https://etherscan.io/address/0x6464C34A02DD155dd0c630CE233DD6e21C24F9A5) |

DSChief: 0x0a3f6849f78076aefaDf113F5BED87720274dDC0

Deployment registry: https://chainlog.sky.money/
0x65fae35e
0x9c52a7f1

## Permission owners

| Name          | Account                                                                                                               | Type     |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| DSPause Proxy | [0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB](https://etherscan.io/address/0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB) | contract |
| USDSJoin      | [0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB](https://etherscan.io/address/0x3c0f895007ca717aa01c8693e59df1e8c3777feb) | contract |
| DAIJoin       | [0x9759a6ac90977b93b58547b4a71c78317f391a28](https://etherscan.io/address/0x9759a6ac90977b93b58547b4a71c78317f391a28) | contract |

## Permissions

| Contract                             | Function               | Impact                                                                                                                                                                                                                                                    | Owner                   |
| ------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| USDS                                 | upgradeToAndCall       | Updates the `USDS` implementation contract and then calls a function in the new contract. The new contract can contain arbitrary code. A malicious update could steal funds.                                                                              | DSPause (DAO), USDSJoin |
| USDS                                 | rely                   | Grants admin privileges over the `USDS` contract to an additional address. The new admin can update the contract and mint `USDS` tokens.                                                                                                                  | DSPause (DAO), USDSJoin |
| USDS                                 | deny                   | Revokes admin privileges of a specific address over the `USDS` contract. This could be used to abandon ownership and make the contract immutable.                                                                                                         | DSPause (DAO), USDSJoin |
| USDS                                 | mint                   | Mints new `USDS` tokens. Is used in opposition to `burn` (unpermissioned) when `USDS` are taken out the vault engine. Can be used to mint unjustified `USDS` token by the DAO.                                                                            | DSPause (DAO), USDSJoin |
| DAI                                  | rely                   | Grants admin privileges over the `DAI` contract to an additional address. The new address has the power to mint `DAI` tokens. New admins can no longer be added as there are no options to do so in `DAIJoin`.                                            | DAIJoin                 |
| DAI                                  | deny                   | Revokes admin privileges of a specific address over the `DAI` contract. Was used by the deployer to abandon admin privileges once the contracts were deploied and joined.                                                                                 | DAIJoin                 |
| DAI                                  | mint                   | Mints new `DAI` tokens. Is used in opposition to `burn` (unpermissioned) when `DAI` are taken out of the vault engine. Cannot be used by an external actor.                                                                                               | DAIJoin                 |
| DAI Join                             | rely                   | Grants admin privileges over the `DAI Join` contract to an additional address. The new admin can cage (disable) the contract. There is no possibilities to add an admin with the current state. The only admin is a deployment contract.                  | DaiJoinFab              |
| DAI Join                             | deny                   | Revokes admin privileges of a specific address over the `DAI Join` contract.                                                                                                                                                                              | DaiJoinFab              |
| DAI Join                             | cage                   | Cages (disables) the contract. This action is irreversible and disables the exit function that removes funds from the vault engine and mints `DAI` to the user. There is no possibility to call this function as the only admin is a deployment contract. | DaiJoinFab              |
| DssLitePsm                           | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssLitePsm                           | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssLitePsm                           | kiss                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssLitePsm                           | diss                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssLitePsm                           | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssLitePsm                           | sellGemNoFee           | description                                                                                                                                                                                                                                               | owner of the permission |
| DssLitePsm                           | buyGemNoFee            | description                                                                                                                                                                                                                                               | owner of the permission |
| Sky                                  | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Sky                                  | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Sky                                  | mint                   | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | stop                   | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | start                  | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | setOwner               | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | setAuthority           | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | mint                   | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | burn                   | description                                                                                                                                                                                                                                               | owner of the permission |
| MKR Token                            | setName                | description                                                                                                                                                                                                                                               | owner of the permission |
| sUSDS (Proxy)                        | upgradeToAndCall       | description                                                                                                                                                                                                                                               | owner of the permission |
| sUSDS (Proxy)                        | \_authorizeUpgrade     | description                                                                                                                                                                                                                                               | owner of the permission |
| sUSDS (Proxy)                        | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| sUSDS (Proxy)                        | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| sUSDS (Proxy)                        | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | addFarm                | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | delFarm                | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | TODO                   | description                                                                                                                                                                                                                                               | owner of the permission |
| LockStakeEngine                      | TODO                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Splitter                             | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Splitter                             | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Splitter                             | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Splitter                             | kick                   | description                                                                                                                                                                                                                                               | owner of the permission |
| Splitter                             | cage                   | description                                                                                                                                                                                                                                               | owner of the permission |
| SplitterMom                          | setOwner               | description                                                                                                                                                                                                                                               | owner of the permission |
| SplitterMom                          | setAuthority           | description                                                                                                                                                                                                                                               | owner of the permission |
| SplitterMom                          | stop                   | description                                                                                                                                                                                                                                               | owner of the permission |
| FlapperUniV2                         | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| FlapperUniV2                         | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| FlapperUniV2                         | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| FlapperUniV2                         | exec                   | description                                                                                                                                                                                                                                               | owner of the permission |
| OracleWrapper                        | read                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | create                 | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | restrict               | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | unrestrict             | description                                                                                                                                                                                                                                               | owner of the permission |
| DssVestMintable                      | yank                   | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | setPaused              | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | nominateNewOwner       | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | acceptOwnership        | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | notifyRewardAmount     | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | recoverERC20           | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | setRewardsDuration     | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS SKY)            | setRewardsDistribution | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistribution (USDS SKY) | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistribution (USDS SKY) | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistribution (USDS SKY) | file                   | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | setPaused              | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | nominateNewOwner       | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | acceptOwnership        | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | notifyRewardAmount     | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | recoverERC20           | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | setRewardsDuration     | description                                                                                                                                                                                                                                               | owner of the permission |
| StakingRewards (USDS01)              | setRewardsDistribution | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistributionJob         | rely                   | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistributionJob         | deny                   | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistributionJob         | set                    | description                                                                                                                                                                                                                                               | owner of the permission |
| VestedRewardsDistributionJob         | rem                    | description                                                                                                                                                                                                                                               | owner of the permission |

## Dependencies

insert text

## Exit Window

The minimum delay between approval and execution of a governance proposal is **18 hours**, recently reduced from 30 hours in an [emergency proposal](https://vote.makerdao.com/executive/template-executive-vote-out-of-schedule-executive-vote-risk-parameter-changes-february-18-2025).
Governance proposals have a recurring weekly and monthly schedules. Those proposals had a lock duration of 2-3 days before took effect in the past, but emergency proposals are possible at anytime.

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-team signers                           |
| ❌     | Signers are publicly announced (with name or pseudonym) |
