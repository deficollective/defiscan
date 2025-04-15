---
protocol: "Cian Protocol"
website: "https://cian.app/"
x: "https://x.com/CIAN_protocol"
github: ["https://github.com/cian-ai/cian-protocol"]
defillama_slug: ["cian-protocol"]
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

| Contract Name                          | Address                                                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Manager (stETH Yield Layer)            | [0x6d425B3D302DD82cC611866eC8176d435307b616](https://etherscan.io/address/0x6d425B3D302DD82cC611866eC8176d435307b616) |
| StrategyETHConverterImplementation     | [0x89aD2070B7522b08aA046e100350A9c2Afc9758C](https://etherscan.io/address/0x89aD2070B7522b08aA046e100350A9c2Afc9758C) |
| StrategyAAVEV3LIDOImplementation       | [0xA6BfC4161817840bdA820b99C2066e47d3734783](https://etherscan.io/address/0xA6BfC4161817840bdA820b99C2066e47d3734783) |
| StrategyMellowSteakhouseImplementation | [0x0415a25B6f01F671f252258A3433d2aA6144d67F](https://etherscan.io/address/0x0415a25B6f01F671f252258A3433d2aA6144d67F) |
| StrategyCompoundRSETHImplementation    | [0xb45222a152d4a05f791df8e101f8bf8e86e640e9](https://etherscan.io/address/0xb45222a152d4a05f791df8e101f8bf8e86e640e9) |
| StrategyAaveV3LidoEzETHImplementation  | [0x822746bC1116194DEBf9457C085e39808E8362dc](https://etherscan.io/address/0x822746bC1116194DEBf9457C085e39808E8362dc) |
| StrategyAAVEV3RsETHImplentation        | [0x48bf0E645054B5cbE5636Acd267D20022179D72F](https://etherscan.io/address/0x48bf0E645054B5cbE5636Acd267D20022179D72F) |
| StrategyETHConverter                   | [0xe2da457580a0b4aDA538fea681daaBA3A1BdEA7E](https://etherscan.io/address/0xe2da457580a0b4aDA538fea681daaBA3A1BdEA7E) |
| StrategyAAVEV3LIDO                     | [0x07833EAdF87CD3079da281395f2fBA24b61F90f7](https://etherscan.io/address/0x07833EAdF87CD3079da281395f2fBA24b61F90f7) |
| StrategyMellowSteakhouse               | [0xFed44EdF4560DC09271d3a7d514B843F789540A5](https://etherscan.io/address/0xFed44EdF4560DC09271d3a7d514B843F789540A5) |
| StrategyCompoundRSETH                  | [0x3e2fC649E407e4bf0e14d620284ADd5366f2AC2d](https://etherscan.io/address/0x3e2fC649E407e4bf0e14d620284ADd5366f2AC2d) |
| StrategyAaveV3LidoEzETH                | [0xd6813390a28c8e3bc0dc838a346bd48f98b6da6f](https://etherscan.io/address/0xd6813390a28c8e3bc0dc838a346bd48f98b6da6f) |
| StrategyAAVEV3RsETH                    | [0x1114D5C199dAe5f94a045947e3DF776e9f9C07c4](https://etherscan.io/address/0x1114D5C199dAe5f94a045947e3DF776e9f9C07c4) |
| VaultImplementation                    | [0xA1Dc0B6A02AB091580DC57bDd5Fe8a9E577E0842](https://etherscan.io/address/0xA1Dc0B6A02AB091580DC57bDd5Fe8a9E577E0842) |
| Vault                                  | [0xB13aa2d0345b0439b064f26B82D8dCf3f508775d](https://etherscan.io/address/0xB13aa2d0345b0439b064f26B82D8dCf3f508775d) |
| Manager (rsETH Yield Layer)            | [0xAc1894C6914639e18f8FA69FEBd324eE91c96065](https://etherscan.io/address/0xAc1894C6914639e18f8FA69FEBd324eE91c96065) |
| StrategyCompoundImplementation         | [0x21047effcC9Dc9f88F47FE823Ea9e2453593d7a0](https://etherscan.io/address/0x21047effcC9Dc9f88F47FE823Ea9e2453593d7a0) |
| StrategyAAVEV3RsETHImplementation      | [0x581A5DD17Dcd375fC84b937ae46F221FD0A1b818](https://etherscan.io/address/0x581A5DD17Dcd375fC84b937ae46F221FD0A1b818) |
| StrategyCompound                       | [0xB69ca6D2Fb435318800F267DD217d64Fa4BE137e](https://etherscan.io/address/0xB69ca6D2Fb435318800F267DD217d64Fa4BE137e) |
| StrategyAAVEV3RsETH                    | [0x659195FB6c4D77cf116564cb6487d2Effd60bcE3](https://etherscan.io/address/0x659195FB6c4D77cf116564cb6487d2Effd60bcE3) |
| VaultImplementation                    | [0x90639665f88fb7a8258608fcc6d5e2bf8d5dfc01](https://etherscan.io/address/0x90639665f88fb7a8258608fcc6d5e2bf8d5dfc01) |
| Vault                                  | [0xd87a19fF681AE98BF10d2220D1AE3Fbd374ADE4e](https://etherscan.io/address/0xd87a19fF681AE98BF10d2220D1AE3Fbd374ADE4e) |
| Manager (ezETH Yield Layer)            | [0x45e990Fc1eEFbDC2aAb0bA20C69fB85EC4218Cb3](https://etherscan.io/address/0x45e990Fc1eEFbDC2aAb0bA20C69fB85EC4218Cb3) |
| StrategyAAVEV3Implementation           | [0x0dc6b5c69502710e160331eC8725A1F035EF70f0](https://etherscan.io/address/0x0dc6b5c69502710e160331eC8725A1F035EF70f0) |
| StrategyAAVEV3                         | [0x7Abe065d55b7a092f8D1c1A67E174707d6F2Ac07](https://etherscan.io/address/0x7Abe065d55b7a092f8D1c1A67E174707d6F2Ac07) |
| VaultImplementation                    | [0xFb06bCb508c06Cc2ff1C53F8E864ca27eEb708eA](https://etherscan.io/address/0xFb06bCb508c06Cc2ff1C53F8E864ca27eEb708eA) |
| Vault                                  | [0x3D086B688D7c0362BE4f9600d626f622792c4a20](https://etherscan.io/address/0x3D086B688D7c0362BE4f9600d626f622792c4a20) |
| Manager (fBTC Yield Layer)             | [0x140B58b84ea6923325b2325577b9E141B4480A7c](https://etherscan.io/address/0x140B58b84ea6923325b2325577b9E141B4480A7c) |
| StrategySolvImplementation             | [0xF703e47280F5aD1De97373B89B9B4D0b41DF6681](https://etherscan.io/address/0xF703e47280F5aD1De97373B89B9B4D0b41DF6681) |
| StrategyBedrockImplementation          | [0xc091a0078889B3B12B6D9e44273a782a73678fF5](https://etherscan.io/address/0xc091a0078889B3B12B6D9e44273a782a73678fF5) |
| StrategyPumpBTCImplementation          | [0xf12e223408bc50B64B33Dae393ef0fb1d926B491](https://etherscan.io/address/0xf12e223408bc50B64B33Dae393ef0fb1d926B491) |
| StrategySolv                           | [0x597d42F0Cd2888C53726bD64f4aD06c3636ef796](https://etherscan.io/address/0x597d42F0Cd2888C53726bD64f4aD06c3636ef796) |
| StrategyBedrock                        | [0xe67Ab3036C866519a0885A58d4408c164eA897e9](https://etherscan.io/address/0xe67Ab3036C866519a0885A58d4408c164eA897e9) |
| StrategyPumpBTC                        | [0x71b3Bf3FCc6d59aE9317595Cc4126EcfF2f8FCc8](https://etherscan.io/address/0x71b3Bf3FCc6d59aE9317595Cc4126EcfF2f8FCc8) |
| VaultImplementation                    | [0x5200817Ce523f8340A6fA00F800b7df71c000aF4](https://etherscan.io/address/0x5200817Ce523f8340A6fA00F800b7df71c000aF4) |
| Vault                                  | [0x9fdDAD44eD6b77e6777dC1b16ee4FCcCBaF0A019](https://etherscan.io/address/0x9fdDAD44eD6b77e6777dC1b16ee4FCcCBaF0A019) |
| Manager (BTCLST Yield Layer)           | [0x5085B552639cFC0e49Bb645Ae4637F6e55F0F01f](https://etherscan.io/address/0x5085B552639cFC0e49Bb645Ae4637F6e55F0F01f) |
| StrategySolvImplementation             | [0x41076dF3eD1c59860245471b918F423Ec44b840D](https://etherscan.io/address/0x41076dF3eD1c59860245471b918F423Ec44b840D) |
| StrategyBedrockImplementation          | [0xd1828c6fCAf3A263d4336519B5dF2FcA28F92138](https://etherscan.io/address/0xd1828c6fCAf3A263d4336519B5dF2FcA28F92138) |
| StrategyPumpBTCImplementation          | [0xE170ee6fb2222B42362181537A21bD429cF7F1Cc](https://etherscan.io/address/0xE170ee6fb2222B42362181537A21bD429cF7F1Cc) |
| StrategySolv                           | [0x103e04A36B1123f6Ba48874AC47d39acbFe20b97](https://etherscan.io/address/0x103e04A36B1123f6Ba48874AC47d39acbFe20b97) |
| StrategyBedrock                        | [0x53a6F68c159518eB1ecFbac5d1e4c77F0A683B26](https://etherscan.io/address/0x53a6F68c159518eB1ecFbac5d1e4c77F0A683B26) |
| StrategyPumpBTC                        | [0x54e1C5834A65877d121CC63504cC36A1A10abfD5](https://etherscan.io/address/0x54e1C5834A65877d121CC63504cC36A1A10abfD5) |
| VaultImplementation                    | [0x0e683049325287d993c0F0155eF948072510aA51](https://etherscan.io/address/0x0e683049325287d993c0F0155eF948072510aA51) |
| Vault                                  | [0x6c77bdE03952BbcB923815d90A73a7eD7EC895D1](https://etherscan.io/address/0x6c77bdE03952BbcB923815d90A73a7eD7EC895D1) |
| ERC2612Verifier                        | [0x045969904402F5e674ef1f27713F3230929538DF](https://etherscan.io/address/0x045969904402F5e674ef1f27713F3230929538DF) |
| WalletFactory                          | [0x8B46CB994218767f07C86Ba62fecAfdcb19cc001](https://etherscan.io/address/0x8B46CB994218767f07C86Ba62fecAfdcb19cc001) |
| Automation                             | [0x53C8bF6875C66E8d7C42e30BeeF7e6241997F7e3](https://etherscan.io/address/0x53C8bF6875C66E8d7C42e30BeeF7e6241997F7e3) |
| ControllerLib                          | [0x74D2Bef5Afe200DaCC76FE2D3C4022435b54CdbB](https://etherscan.io/address/0x74D2Bef5Afe200DaCC76FE2D3C4022435b54CdbB) |
| ControllerLibSub                       | [0x68041721C81c695B72495F78BeaC4F7DFD7b19c8](https://etherscan.io/address/0x68041721C81c695B72495F78BeaC4F7DFD7b19c8) |
| ControllerLink                         | [0xb329504622bd79329c6F82CF8c60c807dF2090c4](https://etherscan.io/address/0xb329504622bd79329c6F82CF8c60c807dF2090c4) |
| Timelock                               | [0xb39e6f93cff9Af7011810f41a4ed9b14582019b7](https://etherscan.io/address/0xb39e6f93cff9Af7011810f41a4ed9b14582019b7) |
| AdapterManager                         | [0xc936161B3C80494172ae58734e3CE16e26D493C1](https://etherscan.io/address/0xc936161B3C80494172ae58734e3CE16e26D493C1) |
| WethGateway                            | [0xc397df95d7313159b667c58A541201BD936a2aA3](https://etherscan.io/address/0xc397df95d7313159b667c58A541201BD936a2aA3) |
| AaveAdapter                            | [0x5b465489FF729f73ec911245A84B25231b5824bA](https://etherscan.io/address/0x5b465489FF729f73ec911245A84B25231b5824bA) |
| OneInchAdapter                         | [0x601954e6AfB77Dac21503DbDfA751fbef9eE5374](https://etherscan.io/address/0x601954e6AfB77Dac21503DbDfA751fbef9eE5374) |
| ParaswapAdapter                        | [0x9aa8b1998B1882008c407fbB5BF775A5E2d8e544](https://etherscan.io/address/0x9aa8b1998B1882008c407fbB5BF775A5E2d8e544) |
| LidoAdapter                            | [0xD3812219eb241053F9cf2b43f9B367c0b28E03DA](https://etherscan.io/address/0xD3812219eb241053F9cf2b43f9B367c0b28E03DA) |
| CurvesteCRVAdapter                     | [0xD896bf804c01c4C0Fa5C42bF6A4b15C465009481](https://etherscan.io/address/0xD896bf804c01c4C0Fa5C42bF6A4b15C465009481) |
| FeeBoxETH                              | [0x0b20d5d59E14C71a948D55439019a2Aaf74Fa7B4](https://etherscan.io/address/0x0b20d5d59E14C71a948D55439019a2Aaf74Fa7B4) |
| FeeBoxStETH                            | [0xC5C9953516635659e03345738D8390b7ada6351c](https://etherscan.io/address/0xC5C9953516635659e03345738D8390b7ada6351c) |

## Permission owners

| Name     | Account                                                                                                               | Type         |
| -------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| MultiSig | [0x8FA9aa69a6e94c1cd49FbF214C833B2911D02553](https://etherscan.io/address/0x8FA9aa69a6e94c1cd49FbF214C833B2911D02553) | Multisig x/y |
| name     | [0x...](https://etherscan.io/address/0x...)                                                                           | Multisig x/y |
| name     | [0x...](https://etherscan.io/address/0x...)                                                                           | Contract     |
| name     | [0x...](https://etherscan.io/address/0x...)                                                                           | EOA          |

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
