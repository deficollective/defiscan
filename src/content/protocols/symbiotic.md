---
protocol: "Symbiotic"
website: "https://symbiotic.fi/"
x: "https://x.com/symbioticfi"
github: ["https://github.com/symbioticfi"]
defillama_slug: ["symbiotic"]
chain: "Ethereum"
stage: 0
reasons: ["remove", "if none"]
risks: ["x", "x", "x", "x", "x"]
author: ["author-1", "author-2"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Add a summary of the protocols. What is it? What does it do? etc.

# Overview

## Chain

See http://defiscan.info/learn-more#chain for more guidance.

> Chain score: Low/Medium/High

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

> Upgradeability score: Low/Medium/High

## Autonomy

See http://defiscan.info/learn-more#autonomy for more guidance.

> Autonomy score: Low/Medium/High

## Exit Window

See http://defiscan.info/learn-more#exit-window for more guidance.

> Exit Window score: Low/Medium/High

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

> Accessibility score: Low/Medium/High

# Technical Analysis

## Contracts

| Contract Name                                            | Address                                                                                                               |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| VaultFactory                                             | [0xAEb6bdd95c502390db8f52c8909F703E9Af6a346](https://etherscan.io/address/0xAEb6bdd95c502390db8f52c8909F703E9Af6a346) |
| MigratableEntityProxy (Proxy) (example Deployed Vault)   | [0x8327b8bd2561d28f914931ad57370d62c7968e40](https://etherscan.io/address/0x8327b8bd2561d28f914931ad57370d62c7968e40) |
| VaultTokenized (Implementation) (example Deployed Vault) | [0x5a0dc8e73d6846f12630b8f7d5197fa8cf669cfe](https://etherscan.io/address/0x5a0dc8e73d6846f12630b8f7d5197fa8cf669cfe) |
| DelegatorFactory                                         | [0x985Ed57AF9D475f1d83c1c1c8826A0E5A34E8C7B](https://etherscan.io/address/0x985Ed57AF9D475f1d83c1c1c8826A0E5A34E8C7B) |
| NetworkRestakeDelegator (example Delegator)              | [0xab684dcf4bc11336ae084dd15d67951017d4b2a5](https://etherscan.io/address/0xab684dcf4bc11336ae084dd15d67951017d4b2a5) |
| SlasherFactory                                           | [0x685c2eD7D59814d2a597409058Ee7a92F21e48Fd](https://etherscan.io/address/0x685c2eD7D59814d2a597409058Ee7a92F21e48Fd) |
| VetoSlasher (example Slasher)                            | [0xf0c9bf1291c4f32b9b6eac44e591abaaae2d86fe](https://etherscan.io/address/0xf0c9bf1291c4f32b9b6eac44e591abaaae2d86fe) |
| NetworkRegistry                                          | [0xC773b1011461e7314CF05f97d95aa8e92C1Fd8aA](https://etherscan.io/address/0xC773b1011461e7314CF05f97d95aa8e92C1Fd8aA) |
| NetworkMiddlewareService                                 | [0xD7dC9B366c027743D90761F71858BCa83C6899Ad](https://etherscan.io/address/0xD7dC9B366c027743D90761F71858BCa83C6899Ad) |
| OperatorRegistry                                         | [0xAd817a6Bc954F678451A71363f04150FDD81Af9F](https://etherscan.io/address/0xAd817a6Bc954F678451A71363f04150FDD81Af9F) |
| VaultOptInService                                        | [0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891](https://etherscan.io/address/0xb361894bC06cbBA7Ea8098BF0e32EB1906A5F891) |
| NetworkoOptInService                                     | [0x7133415b33B438843D581013f98A08704316633c](https://etherscan.io/address/0x7133415b33B438843D581013f98A08704316633c) |
| VaultConfigurator                                        | [0x29300b1d3150B4E2b12fE80BE72f365E200441EC](https://etherscan.io/address/0x29300b1d3150B4E2b12fE80BE72f365E200441EC) |
| DefaultStakerRewardsFactory                              | [0x290CAB97a312164Ccf095d75D6175dF1C4A0a25F](https://etherscan.io/address/0x290CAB97a312164Ccf095d75D6175dF1C4A0a25F) |
| DefaultStakerRewards (example DefaultStakerRewards)      | [0x0450223fd1a2d32d8d74b7a42cd86f62d7148008](https://etherscan.io/address/0x0450223fd1a2d32d8d74b7a42cd86f62d7148008) |
| DefaultOperatorRewardsFactory                            | [0x6D52fC402b2dA2669348Cc2682D85c61c122755D](https://etherscan.io/address/0x6D52fC402b2dA2669348Cc2682D85c61c122755D) |
| BurnerRouterFactory                                      | [0x99F2B89fB3C363fBafD8d826E5AA77b28bAB70a0](https://etherscan.io/address/0x99F2B89fB3C363fBafD8d826E5AA77b28bAB70a0) |
| BurnerRouter (example BurnerRouter)                      | [0xcf9394c30144f2f2ea878ee4555260f4bcfab2a6](https://etherscan.io/address/0xcf9394c30144f2f2ea878ee4555260f4bcfab2a6) |
| wstETH_Burner                                            | [0xdCaC890b14121FD5D925E2589017Be68C2B5B324](https://etherscan.io/address/0xdCaC890b14121FD5D925E2589017Be68C2B5B324) |
| rETH_Burner                                              | [0x89e3915C9Eb07D1bfF5d78e24B28d409dba9B272](https://etherscan.io/address/0x89e3915C9Eb07D1bfF5d78e24B28d409dba9B272) |
| mETH_Burner                                              | [0x919C4329Ed4D4A72c72c126ff8AE351C1E7Ce231](https://etherscan.io/address/0x919C4329Ed4D4A72c72c126ff8AE351C1E7Ce231) |
| swETH_Burner                                             | [0x1Aca33aE8f57E2cdADd0375875AE12fb08c54529](https://etherscan.io/address/0x1Aca33aE8f57E2cdADd0375875AE12fb08c54529) |
| sfrxETH_Burner                                           | [0xBe5821dB563311750f6295E3CDB40aBbDBfF0c4b](https://etherscan.io/address/0xBe5821dB563311750f6295E3CDB40aBbDBfF0c4b) |
| ETHx_Burner                                              | [0xCd669361D629380A70338d613D29c6F3a28A2B50](https://etherscan.io/address/0xCd669361D629380A70338d613D29c6F3a28A2B50) |
| FullRestakeDecreaseHook                                  | [0x0786ef079A0Fc3A2D9e62bf2E8c7aeF86B62d70A](https://etherscan.io/address/0x0786ef079A0Fc3A2D9e62bf2E8c7aeF86B62d70A) |
| NetworkRestakeDecreaseHook                               | [0xe46d876BA2F3C991F3AC3321B8C0A1c323ef8bCf](https://etherscan.io/address/0xe46d876BA2F3C991F3AC3321B8C0A1c323ef8bCf) |
| NetworkRestakeRedistributeHook                           | [0x8A76a3b791D9cfCD17304D31e04304A54Bf07845](https://etherscan.io/address/0x8A76a3b791D9cfCD17304D31e04304A54Bf07845) |
| OperatorSpecificDecreaseHook                             | [0xCc7Fd9B9A37ba1e2b30243Ce5A52BDB1f56B006a](https://etherscan.io/address/0xCc7Fd9B9A37ba1e2b30243Ce5A52BDB1f56B006a) |
| DefaultCollateralMigrator                                | [0x8F152FEAA99eb6656F902E94BD4E7bCf563D4A43](https://etherscan.io/address/0x8F152FEAA99eb6656F902E94BD4E7bCf563D4A43) |
| DefaultCollateral (wstETH)                               | [0xC329400492c6ff2438472D4651Ad17389fCb843a](https://etherscan.io/address/0xC329400492c6ff2438472D4651Ad17389fCb843a) |
| DefaultCollateral (cbETH)                                | [0xB26ff591F44b04E78de18f43B46f8b70C6676984](https://etherscan.io/address/0xB26ff591F44b04E78de18f43B46f8b70C6676984) |
| DefaultCollateral (wBETH)                                | [0x422F5acCC812C396600010f224b320a743695f85](https://etherscan.io/address/0x422F5acCC812C396600010f224b320a743695f85) |
| DefaultCollateral (rETH)                                 | [0x03Bf48b8A1B37FBeAd1EcAbcF15B98B924ffA5AC](https://etherscan.io/address/0x03Bf48b8A1B37FBeAd1EcAbcF15B98B924ffA5AC) |
| DefaultCollateral (mETH)                                 | [0x475D3Eb031d250070B63Fa145F0fCFC5D97c304a](https://etherscan.io/address/0x475D3Eb031d250070B63Fa145F0fCFC5D97c304a) |
| DefaultCollateral (swETH)                                | [0x38B86004842D3FA4596f0b7A0b53DE90745Ab654](https://etherscan.io/address/0x38B86004842D3FA4596f0b7A0b53DE90745Ab654) |
| DefaultCollateral (sfrxETH)                              | [0x5198CB44D7B2E993ebDDa9cAd3b9a0eAa32769D2](https://etherscan.io/address/0x5198CB44D7B2E993ebDDa9cAd3b9a0eAa32769D2) |
| DefaultCollateral (ETHx)                                 | [0xBdea8e677F9f7C294A4556005c640Ee505bE6925](https://etherscan.io/address/0xBdea8e677F9f7C294A4556005c640Ee505bE6925) |
| DefaultCollateral (ENA)                                  | [0xe39B5f5638a209c1A6b6cDFfE5d37F7Ac99fCC84](https://etherscan.io/address/0xe39B5f5638a209c1A6b6cDFfE5d37F7Ac99fCC84) |
| DefaultCollateral (sUSDe)                                | [0x19d0D8e6294B7a04a2733FE433444704B791939A](https://etherscan.io/address/0x19d0D8e6294B7a04a2733FE433444704B791939A) |
| DefaultCollateral (WBTC)                                 | [0x971e5b5D4baa5607863f3748FeBf287C7bf82618](https://etherscan.io/address/0x971e5b5D4baa5607863f3748FeBf287C7bf82618) |
| DefaultCollateral (tBTC)                                 | [0x0C969ceC0729487d264716e55F232B404299032c](https://etherscan.io/address/0x0C969ceC0729487d264716e55F232B404299032c) |
| DefaultCollateral (LsETH)                                | [0xB09A50AcFFF7D12B7d18adeF3D1027bC149Bad1c](https://etherscan.io/address/0xB09A50AcFFF7D12B7d18adeF3D1027bC149Bad1c) |
| DefaultCollateral (osETH)                                | [0x52cB8A621610Cc3cCf498A1981A8ae7AD6B8AB2a](https://etherscan.io/address/0x52cB8A621610Cc3cCf498A1981A8ae7AD6B8AB2a) |
| DefaultCollateral (ETHFI)                                | [0x21DbBA985eEA6ba7F27534a72CCB292eBA1D2c7c](https://etherscan.io/address/0x21DbBA985eEA6ba7F27534a72CCB292eBA1D2c7c) |
| DefaultCollateral (FXS)                                  | [0x940750A267c64f3BBcE31B948b67CD168f0843fA](https://etherscan.io/address/0x940750A267c64f3BBcE31B948b67CD168f0843fA) |
| DefaultCollateral (LBTC)                                 | [0x9C0823D3A1172F9DdF672d438dec79c39a64f448](https://etherscan.io/address/0x9C0823D3A1172F9DdF672d438dec79c39a64f448) |
| DefaultCollateral (SWELL)                                | [0x544f45485418341C1a2B3a44404F12302277fFFC](https://etherscan.io/address/0x544f45485418341C1a2B3a44404F12302277fFFC) |
| DefaultCollateral (MANTA)                                | [0x594380c06552A4136E2601F89E50b3b9Ad17bd4d](https://etherscan.io/address/0x594380c06552A4136E2601F89E50b3b9Ad17bd4d) |

## Permission owners

| Name | Account                                     | Type         |
| ---- | ------------------------------------------- | ------------ |
| name | [0x...](https://etherscan.io/address/0x...) | Multisig x/y |
| name | [0x...](https://etherscan.io/address/0x...) | Contract     |
| name | [0x...](https://etherscan.io/address/0x...) | EOA          |

## Permissions

| Contract      | Function     | Impact                                                                                                                               | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| contract name | functionname | Description in 3 Sentences.                                                                                                          | owner of the permission |
| contract name | functionname | First sentence: what it does technically, e.g "It assigns a new address to the owner variable".                                      | owner of the permission |
| contract name | functionname | Second sentence: what is the impact within the system, e.g "The owner is permissioned to raise fees".                                | owner of the permission |
| contract name | functionname | Third sentence: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield. | owner of the permission |

## Dependencies

Explain the autonomy section in more technical details.

## Exit Window

Explain the exit window in more technical details.

# Security Council

See http://defiscan.info/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-insider signers                        |
| ❌     | Signers are publicly announced (with name or pseudonym) |
