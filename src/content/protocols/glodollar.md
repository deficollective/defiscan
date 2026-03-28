---
protocol: "Glo Dollar"
website: "https://glodollar.org"
x: "https://x.com/glodollar"
github: ["https://github.com/Glo-Foundation"]
defillama_slug: ["/stablecoin/glo-dollar"]
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

Glo Dollar (USDGLO) is a U.S.-issued, 1:1 fiat-backed stablecoin that donates 100% of its profits to public goods and charities.   

# Overview

## Chain

Glo Dollar is deployed on 8 chains: Ethereum mainnet, Optimism, Base, Arbitrum, Polygon, Celo, Stellar and VeChain. This submission is for our Ethereum deployment, which is a stage 2 fully decentralized chain.

Chain score: low

## Upgradeability

Glo Dollar’s contract is upgradeable.
   •  Upgrades are managed by the multi-sig
   •  There is no time-lock delay
   •  All upgrades emit events for transparency.

Upgradeability score: High


## Autonomy

USDGLO is backed 1:1 by cash and/or U.S. Treasuries, managed by Brale. Glo Dollar and Brale ensure transparency and accountability through monthly independent attestations, verifying reserves meet or exceed circulation per AICPA standards. While reserves are held with a third-party custodian, regular oversight and rigorous treasury management help mitigate associated risks


Autonomy score: High


## Exit Window

Glo Dollar does not have an exit window. Note that USDGLO is always redeemable 1:1 through our issuing partner Brale. 

Exit Window Score: High


## Accessibility

N/A as we are a token, not a dApp. 



# Technical Analysis

## Contracts

| Contract Name | Address |
| ------------- | ------- |
| GloDollarV3    | 0xF8Dbe4f52b7d4fe90CD360AA4f49B7A66783C56f   |
| ERC1967Proxy   | 0x4F604735c1cF31399C6E711D5962b2B3E0225AD3   |

## Permission owners

| Name | Account                                       | Type         |
| ---- | --------------------------------------------- | ------------ |
| Minter       | [address](https://etherscan.io/address/0x18216283a5045E8719D0F8B3617Ab6B14fC4d479) | Multisig 4/7 |
| Admin        | [address](https://etherscan.io/address/0x284797b8dA4909755FCA06Fa02BF81c0dae9a0E3) | Multisig 2/4 |
| Denylister   | [address](https://etherscan.io/address/0x1135A985908639b5a218B351d16A61e084CFF7a1) | Multisig 2/3 |
| Upgrader     | [address](https://etherscan.io/address/0xDf04400bBE27Cbe51F53737AFC446c04F355cC5B) | Multisig 2/3 |
| Pauser       | [address](https://etherscan.io/address/0xeBE0ef4cF72e9ACf37F4337355b56427a09C8F89) | Multisig 2/3 |
| Backup admin | [address](https://etherscan.io/address/0x4ff994674c2B2c385Ab225C1164844cf15dDbb6a) | Multisig 2/4 |
| Minter 2     | [address](https://etherscan.io/address/0x284797b8dA4909755FCA06Fa02BF81c0dae9a0E3) | MPC 2/3 |


## Permissions

| Contract      | Function     | Impact      | Owner                   |
| ------------- | ------------ | ----------- | ----------------------- |
| GloDollarV3     | mint   | Mints Glo Dollar  | MINTER_ROLE |
| GloDollarV3     | burn   | Burn Glo Dollar   | MINTER_ROLE |
| GloDollarV3     | pause  | Pauses the contracts   | PAUSER_ROLE |
| GloDollarV3     | unpause  | Unpauses the contracts   | PAUSER_ROLE |
| GloDollarV3     | denylist  | Denylists a specific address from interacting with Glo Dollar   | DENYLISTER_ROLE |
| GloDollarV3     | undenylist  | Removes denylist for an address, re-allowing interacting with Glo Dollar   | DENYLISTER_ROLE |
| GloDollarV3     | destroyDenylistedFunds  | Removes denylist for an address, re-allowing interacting with Glo Dollar   | DENYLISTER_ROLE |
| GloDollarV3     | upgradeTo  | Upgrades contract to a new contract address   | UPGRADER_ROLE |
| GloDollarV3     | upgradeToAndCall  | Upgrades contract to a new contract address   | UPGRADER_ROLE |
| GloDollarV3     | grantRole  | Grants a role to an address   | ADMIN_ROLE |
| GloDollarV3     | revokeRole  | Removes a role assigned to an address   | ADMIN_ROLE |

## Dependencies

No external dependencies.

## Exit Window

No timelocks.

# Security Council

| Requirement                                             | Minter  | Admin   | Denylister | Upgrader | Pauser | Backup admin | Minter 2 |
| ------------------------------------------------------- | ------  | ------   | ------     | ------   | ------ | ------       | ------ |
| At least 7 signers                                      | ✅      |  ❌     | ❌         | ❌      | ❌     | ❌           | ❌     |
| At least 51% threshold                                  | ❌      |  ❌     | ❌         | ❌      | ❌     | ❌           | ❌     |
| At least 50% non-team signers                           | ✅      |  ❌     | ❌         | ❌      | ❌     | ❌           | ❌     |
| Signers are publicly announced (with name or pseudonym) | ❌      |  ✅     | ✅         | ✅      | ✅     | ❌           | ❌     |



 ✅ /❌ |
 ------ |
 ❌     |
 ❌     |
 ❌     |
 ❌     |