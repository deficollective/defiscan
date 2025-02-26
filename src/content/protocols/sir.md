---
protocol: "SIR"
website: "https://www.sir.trading/"
x: "https://x.com/leveragesir"
github: ["https://github.com/SIR-trading"]
defillama_slug: ["sir-trading"]
chain: "Ethereum"
stage: 1
reasons: []
risks: ["x", "x", "x", "x", "x"]
author: ["Xatarrer"]
submission_date: "2025-02-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

SIR is a decentralized trading protocol designed for leveraged positions with a focus on long-term investing. Key features include a one-time fee for opening positions (no recurring funding costs), no liquidations, and no volatility decay (returns aren't eroded by market fluctuations). By eliminating these traditional risks and costs, SIR offers a sustainable way to maintain leveraged exposure over extended periods, making it ideal for investors seeking leveraged assets without the stress of daily fees, margin calls, or compounding price instability.

# Overview

## Chain

Ethereum

## Upgradeability

The protocol operates through six non-upgradable contracts, with SystemControl enabling limited administrative control. The owner can modify specific parameters: adjusting APE/TEA minting fees (with a 10-day delay) and transitioning between protocol states—TrainingWheels (configurable mode), Emergency (minting paused), and Shutdown (terminal state after 20 days in Emergency). Critical actions, like fee changes or shutdown initiation, are time-gated to prevent abrupt misuse. Permanent immutability is achieved via the Unstoppable state, locking all parameters except SIR token reward distribution. Users can withdraw funds in all states except Shutdown.

The system uses Uniswap v3's decentralized oracle and relies on procedural safeguards (delays, irreversible states) rather than a security council, prioritizing user protections while allowing controlled parameter adjustments during the initial phase.

## Autonomy

SIR relies on Uniswap v3 oracles for price data. While a critical bug in Uniswap v3 could theoretically disrupt SIR’s operations or distort pricing—potentially destabilizing trader and LPer positions—this risk is mitigated by Uniswap v3’s status as a Stage 2 protocol (fully decentralized and immutable), its extensive audits, and its proven track record as one of the most widely adopted AMMs in DeFi. These factors render such a scenario highly improbable.

To further reduce liquidity-related risks, SIR automatically scans for the most liquid fee tiers within Uniswap v3. If liquidity in the primary pool deteriorates, the protocol seamlessly switches to the price feed of a more liquid fee tier, ensuring continuous and reliable price sourcing.

## Exit Window

SIR's contracts are fully immutable, no upgrades or changes can be made, removing the need for an exit window.

## Accessibility

Following our recent launch, the current sole user interface is our official application at https://app.sir.trading. Our long-term vision involves establishing an ecosystem of independent third-party frontends, mirroring Liquity's successful model with its network of interface providers. As a final recourse, users can utilize Etherscan (https://etherscan.io) to interact directly with the protocol's smart contracts.

# Technical Analysis

## Contracts

| Contract Name | Address                                    |
| ------------- | ------------------------------------------ |
| Vault         | 0xB91AE2c8365FD45030abA84a4666C4dB074E53E7 |
| SIR           | 0x1278B112943Abc025a0DF081Ee42369414c3A834 |
| APE           | 0x8E3a5ec5a8B23Fd169F38C9788B19e72aEd97b5A |
| Oracle        | 0x3CDCCFA37c1B2BEe3d810eC9dAddbB205048bB29 |
| VaultExternal | 0x80f18B12A6dBD515C5Ad01A2006abF30C5972158 |
| SystemControl | 0x8d694D1b369BdE5B274Ad643fEdD74f836E88543 |

## Permission owners

| Name  | Account                                                                                                               | Type             |
| ----- | --------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Owner | [0x5000Ff6Cc1864690d947B864B9FB0d603E8d1F1A](https://etherscan.io/address/0x5000Ff6Cc1864690d947B864B9FB0d603E8d1F1A) | External account |

## Permissions

| Contract      | Function                | Impact                                                                                                                                                                                                                                                                                                                                                                                                                             | Owner |
| ------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| SystemControl | `setBaseFee`            | This function sets the APE minting fee, executable only while the protocol is in TrainingWheels status. The owner is permissioned to change the APE minting fee between any value betwen (0%, 100%). The owner could raise the fee to 100%, converting all deposits to dividends for SIR stakers.                                                                                                                                  | Owner |
| SystemControl | `setLPFee`              | This function sets the TEA minting fee, executable only while the protocol is in TrainingWheels status. The owner is permissioned to change the TEA minting fee between any value betwen (0%, 100%). The owner could raise the fee to 100%, converting all deposits to dividends for SIR stakers.                                                                                                                                  | Owner |
| SystemControl | `updateVaultsIssuances` | This function adjusts SIR reward allocations across vaults. Ownership of SystemControl will eventually transition to a SIR holder DAO, enabling decentralized governance over reward distribution. SIR token rewards are purely supplementary incentives for LPers, optional atop their base fee earnings. A malicious owner could direct all SIR token rewards to an exotic vault where its accomplices take all the SIR rewards. | Owner |
| SystemControl | `saveFunds`             | This function enables token balance withdrawal from the Vault exclusively in ShutDown status, a fail-safe mode for emergency recourse. The owner is permissioned to withdraw funds from the Vault to the address of its choosing. A malicious owner could therefore steal all funds from the Vault but this is highly mitigated by the fact that Shutdown status requires a 20 day waiting period.                                 | Owner |
| SystemControl | `exitBeta`              | This function transitions the protocol to Unstoppable status, finalizing decentralization by irrevocably locking all other governance functions, leaving only updateVaultsIssuances operational for vault issuance adjustments. Executable solely from TrainingWheels status. A malicious owner could decentralize the protocol too early before the fees are properly fine tuned.                                                 | Owner |
| SystemControl | `haultMinting`          | This function triggers Emergency status, a protocol-wide freeze that permanently disables TEA/APE/SIR minting to protect user assets in case of critical vulnerabilities. Executable exclusively from TrainingWheels status. At most a malicious owner would stop new users from depositing assets, but it could not stop users from withdrawing their assets.                                                                     | Owner |
| SystemControl | `resumeMinting`         | This function reverts the protocol to TrainingWheels status, reactivating TEA/APE/SIR minting. Executable only from Emergency status. Since Emergency state is meant for discovering or fixing vulnerabilities, a malicious owner could reallow deposits of assets to the protocol before the protocol is safe.                                                                                                                    | Owner |
| SystemControl | `shutdownSystem`        | This function initiates the transition to Shutdown status, haulting any type of minting or burning. The transition is irreversible and can only be triggered if Emergency status has been active for at least 20 days. Once in Shutdown status, the owner can call the permissioned `saveFunds` function to withdraw all funds from the Vault.                                                                                     | Owner |

## Dependencies

The only external dependancy of the protocol is Uniswap v3, which serves as price oracle. Uniswap v3 is a State 2 protocol, meaning that it is decentralized and cannot be upgraded.

## Exit Window

The protocol operates in four distinct statuses: (1) Unstoppable, (2) TrainingWheels, (3) Emergency, and (4) Shutdown. The owner of the SystemControl contract can freely switch between the (2) TrainingWheels and (3) Emergency statuses. Neither of these two statuses prevents users from withdrawing their funds. Transitioning from (2) TrainingWheels to (1) Unstoppable is irreversible and permanently renders the protocol immutable. The owner can switch from (3) Emergency to (4) Shutdown only if the Emergency status has been active for at least 20 days. The shutdown process is irreversible and serves as a termination mechanism for the protocol in cases of critical vulnerabilities. Once the protocol enters (4) Shutdown status, the owner can withdraw all remaining funds.

In the (2) TrainingWheels status, the owner can modify the APE and TEA minting fees. These fees could theoretically be set to values so high that users would immediately lose their deposits upon minting. To protect users from a compromised or malicious owner, any fee adjustment requires a 10-day waiting period before taking effect.

# Security Council

No security council. Any malicious action from the owner, like changing the fees to an obscene large value, or shutting down the protocol, has a built-in delay.
