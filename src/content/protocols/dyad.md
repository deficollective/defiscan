---
protocol: "Dyad"
website: "https://dyadstable.xyz"
x: "https://x.com/0xDYAD"
github: ["https://github.com/DyadStablecoin"]
defillama_slug: ["dyad"]
chain: "Ethereum"
stage: 0
risks: ["L", "H", "H", "H", "M"]
author: ["CookingCryptos", "sagaciousyves"]
submission_date: "2024-10-23"
publish_date: "2024-10-23"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

The DYAD protocol allows users to mint interest-free stablecoins against collateral types like ETH. Users have to deposit assets that are worth at least 150% of the value of their minted DYAD, or their position is liquidated. The excess value of all collateral in the system is tokenized, and users who own the token are able to utilize its value as part of their backing.

# Overview

## Chain

The DYAD protocol is deployed on Ethereum mainnet.

> Chain score: L

## Upgradeability

A Multisig controls various functions in the DYAD protocol including the following:

The _VaultManagerV4_ contract is upgradeable through the ERC-1967 and UUPS proxy patterns, which means its logic can be altered by the Multisig at any time. The _VaultManagerV4_ owns the permission to mint and burn DYAD tokens. Upgrading the implementation contract thus enables the Multisig to mint an arbitrary amount of the stablecoin.

The Multisig also owns the permission to add or remove vaults through the _VaultLicenser_ contract. Removing a vault from the registry freezes the associated collateral and prevents users from accessing their funds.

> Upgradeability score: H

## Autonomy

The DYAD protocol uses Chainlink oracles for the valuation of collateral assets (WETH, stETH, TBTC, and sUSDe). The Chainlink feeds are immutable and cannot be replaced. Sanity checks on the timeliness or validity of a price as well as a fallback are not implemented. A failure of Chainlink failure thus results in the freezing of collateral assets, and pausing of withdrawals, borrowing and liquidations.

> Autonomy score: H

## Exit Window

Permissions are not protected with an exit window resulting in users not being able to withdraw funds in case of an unwanted update.

> Exit Window score: H

## Accessibility

Dyad Protocol offers a single user interface accessible through its website. The source code of the user interface is available on the public [ GitHub](https://github.com/DyadStablecoin/frontend). Users are thus able to host their own interface at reasonable financial cost.

> Accessibility score: M

# Technical Analysis

## Contracts

| Contract Name       | Address                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| DYAD                | [0xfd03723a9a3abe0562451496a9a394d2c4bad4ab](https://etherscan.io/address/0xfd03723a9a3abe0562451496a9a394d2c4bad4ab) |
| Notes               | [0xDc400bBe0B8B79C07A962EA99a642F5819e3b712](https://etherscan.io/address/0xDc400bBe0B8B79C07A962EA99a642F5819e3b712) |
| Licenser            | [0xb5bdE0Ba7b3e39226E5369e508D673fDF02bA8c1](https://etherscan.io/address/0xb5bdE0Ba7b3e39226E5369e508D673fDF02bA8c1) |
| VaultLicenser       | [0xfe81952a0a2c6ab603ef1b3cc69e1b6bffa92697](https://etherscan.io/address/0xfe81952a0a2c6ab603ef1b3cc69e1b6bffa92697) |
| VaultManagerV4      | [0x259286552c3f5a76594d0bc24d499639f8652c99](https://etherscan.io/address/0x259286552c3f5a76594d0bc24d499639f8652c99) |
| ERC1967Proxy        | [0xb62bdb1a6ac97a9b70957dd35357311e8859f0d7](https://etherscan.io/address/0xb62bdb1a6ac97a9b70957dd35357311e8859f0d7) |
| Kerosene            | [0xf3768D6e78E65FC64b8F12ffc824452130BD5394](https://etherscan.io/address/0xf3768D6e78E65FC64b8F12ffc824452130BD5394) |
| KerosineManager     | [0xfccf9d9466ed79afed2abc46350bfb78f7b47b90](https://etherscan.io/address/0xfccf9d9466ed79afed2abc46350bfb78f7b47b90) |
| KerosineDenominator | [0x4b3dd4ceb943efd7d169a1baaeec63097601e88e](https://etherscan.io/address/0x4b3dd4ceb943efd7d169a1baaeec63097601e88e) |

## Permission Owners

| Name          | Account                                                                                                               | Type         |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| Team Multisig | [0xDeD796De6a14E255487191963dEe436c45995813](https://etherscan.io/address/0xDeD796De6a14E255487191963dEe436c45995813) | Multisig 2/3 |

## Permissions

| Contract        | Function         | Impact                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Owner          |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| DYAD            | mint             | The permission allows the owner to mint new Dyad tokens and as a consequence increase supply. Owner of the dNFT can mint Dyad via VaultManagerV4.                                                                                                                                                                                                                                                                                                                           | VaultManagerV4 |
| DYAD            | burn             | The permission allows the owner to burn DYAD tokens and remove them from circulation.                                                                                                                                                                                                                                                                                                                                                                                       | VaultManagerV4 |
| Licenser        | add              | The owner of the licenser contract can add new contracts that are allowed to mint DYAD, since the mint function of Dyad checks if isLicensed. The only contract that is currently able to mint is VaultManager Proxy where users can interact with public endpoints to mint DYAD against collateral.                                                                                                                                                                        | Team Multisig  |
| Licenser        | remove           | The owner of this contract can also remove addresses from isLicensed privilege.                                                                                                                                                                                                                                                                                                                                                                                             | Team Multisig  |
| VaultLicenser   | add              | The owner of the VaultLicenser contract can add vault addresses to the registry. The accepted collateral in every vault that is listed in the VaultLicenser registry is accepted as collateral for minting DYAD.                                                                                                                                                                                                                                                            | Team Multisig  |
| VaultLicenser   | remove           | The owner of the VaultLicenser contract can remove vault addresses from the registry. Every vault that is removed from the registry is from this block forward not accepted as collateral for minting the protocol’s stablecoin DYAD. Moreover, the collateral deposited in the vaults is frozen and user’s cannot access their funds.                                                                                                                                      | Team Multisig  |
| Notes           | drain            | The function drain allows the owner to collect all the ether collected for dNFT sales. This function is unrestricted in terms of frequency.                                                                                                                                                                                                                                                                                                                                 | Team Multisig  |
| Notes           | mintInsiderNft   | The mintInsiderNft function allows the owner to mint up to 4000 Notes (dNFT) for free. The limit of 4000 notes is constant and immutable.                                                                                                                                                                                                                                                                                                                                   | Team Multisig  |
| KerosineManager | add              | The add function allows the owner of the permission to add new vaults. Each added vault allows a new type of collateral for backing DYAD. The max number of vaults is capped at 10 and this is immutable.                                                                                                                                                                                                                                                                   | Team Multisig  |
| KerosineManager | remove           | The remove function allows the owner of the permission to remove vaults.                                                                                                                                                                                                                                                                                                                                                                                                    | Team Multisig  |
| VaultManagerV4  | authorizeUpgrade | VaultManager is an upgradeable contract with ERC-1967 and UUPS pattern, thus the proxy upgrade logic is part of VaultManagerV4 contract. Calling _authorizeUpgrade_ to upgrade VaultManagerV4 to a new implementation is permissioned and only allowed by the owner. As a result, users interacting with the VaultManager through Proxy contract `0xb62bdb1a6ac97a9b70957dd35357311e8859f0d7` need to be aware that the logic of the VaultManager could change at any time. | Team Multisig  |
| VaultStakedUSDe | setDepositCap    | The function setDepositCap allows the owner of the permission to set a deposit cap for each depositor of this vault. This function only exists for the sUSDe vault.                                                                                                                                                                                                                                                                                                         | Team Multisig  |

## Dependencies

The Dyad protocol relies on Chainlink price feeds for collateral valuation.
In case one of the chainlink price feeds deployed to addresses `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419` (WETH),`0xCfE54B5cD566aB89272946F602D76Ea879CAb4a8` (stETH),`0x8350b7De6a6a2C1368E7D4Bd968190e13E354297` (TBTC),`0xFF3BC18cCBd5999CE63E788A1c250a88626aD099` (sUSDe) stops working the Dyad protocol will face disruption. For each collateral price feed that stops working the respective collateral in the vault is frozen. That means the specific collateral cannot be redeemed for DYAD and the collateral cannot be withdrawn even if the collateralisation ratio was above the 150% value. Additionally liquidations for this specific asset are paused. Burning DYAD remains always possible in case of frozen oracle prices.

The protocol does not offer alternatives to replace or update the oracle dependency, as the reference addresses for these feeds are immutable. Consequently, if any Chainlink feed is discontinued, the corresponding collateral could be lost without recovery options.

## Exit Window

- Collateral Vaults
  - The multisig of the protocol team can deploy vaults, list and unlist them as collateral. The vault licenser `0xfe81952a0a2c6ab603ef1b3cc69e1b6bffa92697` has no timelock for adding and removing vaults form the registry. As mentioned above in the permission section on the VaultLicenser this can result in temporary lock of user funds.
- VaultManagerVx
  - VaultManager contract is upgradeable and currently version 4 is deployed. There is no timelock prohibiting immediately enforced upgrades to change mint, burn and liquidation implementations. This also counts for stored references to DYAD token, notes (dNft) and the vault licenser.

# Security Council

| Requirement                                             | Team Multisig |
| ------------------------------------------------------- | :-----------: |
| At least 7 signers                                      |      ❌       |
| At least 51% threshold                                  |      ✅       |
| At least 50% non-team signers                           |      ❌       |
| Signers are publicly announced (with name or pseudonym) |      ❌       |

No information on the multisig in use found in the docs.
