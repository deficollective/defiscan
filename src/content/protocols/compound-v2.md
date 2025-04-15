---
protocol: "name of the protocol appended by the version if multiple versions exist (use an '-' and no whitespace)"
website: "https://..."
x: "https://x.com/projecthandle"
github: ["https://github.com/projectgithub"]
defillama_slug: ["the slug used by https://defillama.com"]
chain: "the name of the chain on which the protocol is deployed"
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

| Contract Name                                           | Address                                                                                                               |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
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
| cUSDC (USDC market) (Proxy)                             | [0xc3d688B66703497DAA19211EEdff47f25384cdc3](https://etherscan.io/address/0xc3d688B66703497DAA19211EEdff47f25384cdc3) |
| cUSDC (Implementation)                                  | [0x1cad465416857b9fea5900f3366008f27e93605c](https://etherscan.io/address/0x1cad465416857b9fea5900f3366008f27e93605c) |
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
