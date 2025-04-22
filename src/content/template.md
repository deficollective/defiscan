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

# Ratings

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

# Informational

Any information that you deem worth sharing. That could be on something the protocol
does different than others or hard decisions you took when writing your review (eg: whether
to include something in the scope or not).

# Protocol Analysis

# Dependencies

# Governance

## External Permission Owners and Security Council

Here we list permission owners that are subject to external interactions. This includes:

- Governance contracts
- Timelocks
- Multisigs
- EOAs

It doesn't include contracts that are permissions owners but in which the only permission holders are other contracts.

See http://defiscan.info/learn-more#security-council-requirements for guidance on the multisig requirements.

change ✅ or ❌ accordingly for multisigs, or use N/A for contracts, ❌ for EOAs.

| Name                  | Account                                     | Type         | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| --------------------- | ------------------------------------------- | ------------ | ----------- | --------------- | ----------------- | -------------- |
| A typical Multisig    | [0x123](https://basescan.org/address/0x123) | Multisig x/n | ✅          | ✅              | ❌                | ❌             |
| A Governance contract | [0x123](https://basescan.org/address/0x123) | Contract     | N/A         | N/A             | N/A               | N/A            |

## Exit Window

Explain the exit window in more technical details.

# Contracts & Permissions

## Contracts

| Contract Name | Address                                     |
| ------------- | ------------------------------------------- |
| contract 1    | [0x123](https://etherscan.io/address/0x123) |
| contract 2    | [0x456](https://etherscan.io/address/0x456) |

## All Permission Owners

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
