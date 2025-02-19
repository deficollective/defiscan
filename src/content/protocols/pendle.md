---
protocol: "Pendle"
website: "https://www.pendle.finance/"
x: "https://x.com/pendle_fi"
github: ["https://github.com/pendle-finance"]
defillama_slug: ["pendle"]
chain: "Ethereum"
stage: 0
reasons: []
risks: ["L", "L", "L", "L", "L"]
author: ["CookingCryptos"]
submission_date: "2025-02-19"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Pendle is a decentralized, permissionless yield-trading protocol that enables users to manage and optimize their yield exposure. By tokenizing yield-bearing assets into standardized yield tokens (SY), Pendle allows these assets to be split into principal tokens (PT) and yield tokens (YT). This separation facilitates various strategies, including earning fixed yields, speculating on future yield changes, and providing liquidity to earn additional rewards. Pendle's Automated Market Maker (AMM) is specifically designed to handle the trading of these time-decaying assets, ensuring efficient and flexible yield management within the decentralized finance ecosystem. 

# Overview

## Chain

Pendle is deployed on various chains. This review is based on the Ethereum mainnet deployment of the protocol.

> Chain score: L

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

For some guidance:

In the upgradability section & risk we address bytecode upgrades and parameter changes that are permissioned.

This steps help you write a nice report:

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

See http://defiscan.info/learn-more#exit-window for more guidance.

## Accessibility

See http://defiscan.info/learn-more#accessibility for more guidance.

# Technical Analysis

## Contracts

| Contract Name                     | Address                                    |
|-----------------------------------|--------------------------------------------|
| pendle                            | 0x808507121b80c02388fad14726482e061b8da827 |
| lzEndpoint                        | 0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675 |
| wrappedNative                     | 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 |
| sySwapper                         | 0x248087C69e72E211b7264720Bf6cC5A954F98CDE | Unverified contract
| baseCodeSplitter                  | 0x35878C2Cff38cC4032E85283183428170BA618A2 |
| PENDLE                            | 0x808507121b80c02388fad14726482e061b8da827 |
| governanceProxy                   | 0x2aD631F72fB16d91c4953A7f4260A97C2fE2f31e |
| yieldContractFactory              | 0x70ee0A6DB4F5a2Dc4d9c0b57bE97B9987e75BAFD |
| marketFactory                     | 0x27b1dAcd74688aF24a64BD3C9C1B143118740784 |
| pendleSwap                        | 0x313e7Ef7d52f5C10aC04ebaa4d33CDc68634c212 |
| pyYtLpOracle                      | 0x9a9fa8338dd5e5b2188006f1cd2ef26d921650c2 |
| yieldContractFactoryV3            | 0xdF3601014686674e53d1Fa52F7602525483F9122 |
| marketFactoryV3                   | 0x1A6fCc85557BC4fB7B534ed835a03EF056552D52 |
| yieldContractFactoryV4            | 0x273b4bFA3Bb30fe8F32c467b5f0046834557F072 |
| marketFactoryV4                   | 0x3d75Bd20C983edb5fD218A1b7e0024F1056c7A2F |
| yieldContractFactoryV5            | 0x35A338522a435D46f77Be32C70E215B813D0e3aC |
| marketFactoryV5                   | 0x6fcf753f2C67b83f7B09746Bbc4FA0047b35D050 |
| poolDeployHelper                  | 0x4Df98410c95737FD646D2413AC6CAFc1c04834b9 |
| limitRouter                       | 0x000000000000c9B3E2C3Ec88B1B4c0cD853f4321 |
| proxyAdmin                        | 0xA28c08f165116587D4F3E708743B4dEe155c5E64 |
| reflector                         | 0x5039Da22E5126e7c4e9284376116716A91782faF |
| vePendle                          | 0x4f30A9D41B80ecC5B94306AB4364951AE3170210 |
| senderEndpoint                    | 0x07b1014c88f14C9E910092526db57A20052E989F |
| votingController                  | 0x44087E105137a5095c008AaB6a6530182821F2F0 |
| gaugeController                   | 0x47D74516B33eD5D70ddE7119A40839f6Fcc24e57 |
| feeDistributor                    | 0xd7b34a6fDCb2A7ceD2115FF7f5fdD72aa6aA4dE2 |
| feeDistributorV2                  | 0x8C237520a8E14D658170A633D96F8e80764433b9 |
| multiTokenDistributor             | 0x3942F7B55094250644cFfDa7160226Caa349A38E |
| sparkLinearDiscountOracleFactory  | 0xA9A924A4BB95509F77868E086154C25e934F6171 |
| beta.PendleChainlinkOracleFactory | 0x2A73e899389cABa2a2f648BaBA35e67f5C00EFee |

## Permission owners

| Name        | Account                                                                                                               | Type         |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| treasury    | [0x8270400d528c34e1596EF367eeDEc99080A1b592](https://etherscan.io/address/0x8270400d528c34e1596EF367eeDEc99080A1b592) | Multisig 2/6 |
| governance  | [0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1](https://etherscan.io/address/0x8119EC16F0573B7dAc7C0CB94EB504FB32456ee1) | Multisig 2/4 |
| devMultisig | [0xE6F0489ED91dc27f40f9dbe8f81fccbFC16b9cb1](https://etherscan.io/address/0xE6F0489ED91dc27f40f9dbe8f81fccbFC16b9cb1) | Multisig 2/3 |

## Permissions

| Contract      | Function     | Impact      | Owner                   |
| ------------- | ------------ | ----------- | ----------------------- |
| contract name | functionname | description | owner of the permission |

## Dependencies

insert text

## Exit Window

insert text

# Security Council

| Requirement                                             | treasury | governance | devMultisig |
|---------------------------------------------------------|----------|------------|-------------|
| At least 7 signers                                      | ❌        | ❌          | ❌           |
| At least 51% threshold                                  | ❌        | ❌          | ✅           |
| At least 50% non-team signers                           | ❌        | ❌          | ❌           |
| Signers are publicly announced (with name or pseudonym) | ❌        | ❌          | ❌           |
