---
protocol: "Eigenlayer"
website: "https://www.eigenlayer.xyz/"
x: "https://x.com/eigenlayer"
github: ["https://github.com/Layr-Labs/eigenlayer-contracts"]
defillama_slug: ["eigenlayer"]
chain: "Mainnet"
stage: 0
reasons: ["add if any"]
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

## Conclusion

Some text in form of:

The xyz protocol achieves High centralization risk scores for its Upgradeability, Autonomy and Exit Window dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by ...

The project additionally could advance to Stage 2 if ...

# Reviewer's Notes

(Here, anything worth mentioning about what critical permissions you excluded from the scope or some elements that xyz protocol does in a unique way. If nothing seems relevant, just say that :)

⚠️ During our analysis, we identified ...

# Protocol Analysis

Here include the diagram. Please explain what the main contracts are doing within the diagram.

# Dependencies

Go into more detail of the oracle, bridge, or other dependency the defi protocol is using

# Governance

## Relevant Subsection

Here anything relevant to the governance, in this case it could be what you highlighted in "Upgrade Process"

## Security Council

New table with all the multisigs

| Name          | Account                                     | Type     | ≥ 7 signers | ≥ 51% threshold | ≥ 50% non-insider | Signers public |
| ------------- | ------------------------------------------- | -------- | ----------- | --------------- | ----------------- | -------------- |
| Team Multisig | [0x123](https://etherscan.io/address/0x123) | Multisig | ✅          | ❌              | ❌                | ✅             |

# Contracts & Permissions

## Contracts

| Contract Name                            | Address                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| DelegationManager (Proxy)                | [0x39053D51B77DC0d36036Fc1fCc8Cb819df8Ef37A](https://etherscan.io/address/0x39053D51B77DC0d36036Fc1fCc8Cb819df8Ef37A) |
| DelegationManager (Implementation)       | [0x1784be6401339fc0fedf7e9379409f5c1bfe9dda](https://etherscan.io/address/0x1784be6401339fc0fedf7e9379409f5c1bfe9dda) |
| StrategyManager (Proxy)                  | [0x858646372CC42E1A627fcE94aa7A7033e7CF075A](https://etherscan.io/address/0x858646372CC42E1A627fcE94aa7A7033e7CF075A) |
| StrategyManager (Implementation)         | [0x70f44c13944d49a236e3cd7a94f48f5dab6c619b](https://etherscan.io/address/0x70f44c13944d49a236e3cd7a94f48f5dab6c619b) |
| EigenPodManager (Proxy)                  | [0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338](https://etherscan.io/address/0x91E677b07F7AF907ec9a428aafA9fc14a0d3A338) |
| EigenPodManager (Implementation)         | [0x731A0aD160e407393Ff662231Add6Dd145AD3FEa](https://etherscan.io/address/0x731A0aD160e407393Ff662231Add6Dd145AD3FEa) |
| AVSDirectory (Proxy)                     | [0x135DDa560e946695d6f155dACaFC6f1F25C1F5AF](https://etherscan.io/address/0x135DDa560e946695d6f155dACaFC6f1F25C1F5AF) |
| AVSDirectory (Implementation)            | [0xdAbdB3Cd346B7D5F5779b0B614EdE1CC9DcBA5b7](https://etherscan.io/address/0xdAbdB3Cd346B7D5F5779b0B614EdE1CC9DcBA5b7) |
| Slasher (Proxy)                          | [0xD92145c07f8Ed1D392c1B88017934E301CC1c3Cd](https://etherscan.io/address/0xD92145c07f8Ed1D392c1B88017934E301CC1c3Cd) |
| Slasher (Implementation)                 | [0xf3234220163a757edf1e11a8a085638d9b236614](https://etherscan.io/address/0xf3234220163a757edf1e11a8a085638d9b236614) |
| RewardsCoordinator (Proxy)               | [0x7750d328b314EfFa365A0402CcfD489B80B0adda](https://etherscan.io/address/0x7750d328b314EfFa365A0402CcfD489B80B0adda) |
| RewardsCoordinator (Implementation)      | [0x5bf7c13D5FAdba224ECB3D5C0a67A231D1628785](https://etherscan.io/address/0x5bf7c13D5FAdba224ECB3D5C0a67A231D1628785) |
| StrategyFactory (Proxy)                  | [0x5e4c39ad7a3e881585e383db9827eb4811f6f647](https://etherscan.io/address/0x5e4c39ad7a3e881585e383db9827eb4811f6f647) |
| StrategyFactory (Implementation)         | [0x3e07cc2d34c8e0965f5ba45ac1e960e535155c74](https://etherscan.io/address/0x3e07cc2d34c8e0965f5ba45ac1e960e535155c74) |
| StrategyBase (Proxy)                     | [0x0ed6703c298d28ae0878d1b28e88ca87f9662fe9](https://etherscan.io/address/0x0ed6703c298d28ae0878d1b28e88ca87f9662fe9) |
| StrategyBase (Implementation)            | [0xe9fa8f904d97854c7389b68923262adcc6c27827](https://etherscan.io/address/0xe9fa8f904d97854c7389b68923262adcc6c27827) |
| StrategyBase cbETH (Proxy)               | [0x54945180dB7943c0ed0FEE7EdaB2Bd24620256bc](https://etherscan.io/address/0x54945180dB7943c0ed0FEE7EdaB2Bd24620256bc) |
| StrategyBase cbETH (Implementation)      | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase stETH (Proxy)               | [0x93c4b944D05dfe6df7645A86cd2206016c51564D](https://etherscan.io/address/0x93c4b944D05dfe6df7645A86cd2206016c51564D) |
| StrategyBase stETH (Implementation)      | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase rETH (Proxy)                | [0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2](https://etherscan.io/address/0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2) |
| StrategyBase rETH (Implementation)       | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase ETHx (Proxy)                | [0x9d7eD45EE2E8FC5482fa2428f15C971e6369011d](https://etherscan.io/address/0x9d7eD45EE2E8FC5482fa2428f15C971e6369011d) |
| StrategyBase ETHx (Implementation)       | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase ankrETH (Proxy)             | [0x13760F50a9d7377e4F20CB8CF9e4c26586c658ff](https://etherscan.io/address/0x13760F50a9d7377e4F20CB8CF9e4c26586c658ff) |
| StrategyBase ankrETH (Implementation)    | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase OETH (Proxy)                | [0xa4C637e0F704745D182e4D38cAb7E7485321d059](https://etherscan.io/address/0xa4C637e0F704745D182e4D38cAb7E7485321d059) |
| StrategyBase OETH (Implementation)       | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase osETH (Proxy)               | [0x57ba429517c3473B6d34CA9aCd56c0e735b94c02](https://etherscan.io/address/0x57ba429517c3473B6d34CA9aCd56c0e735b94c02) |
| StrategyBase osETH (Implementation)      | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase swETH (Proxy)               | [0x0Fe4F44beE93503346A3Ac9EE5A26b130a5796d6](https://etherscan.io/address/0x0Fe4F44beE93503346A3Ac9EE5A26b130a5796d6) |
| StrategyBase swETH (Implementation)      | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase wBETH (Proxy)               | [0x7CA911E83dabf90C90dD3De5411a10F1A6112184](https://etherscan.io/address/0x7CA911E83dabf90C90dD3De5411a10F1A6112184) |
| StrategyBase wBETH (Implementation)      | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase sfrxETH (Proxy)             | [0x8CA7A5d6f3acd3A7A8bC468a8CD0FB14B6BD28b6](https://etherscan.io/address/0x8CA7A5d6f3acd3A7A8bC468a8CD0FB14B6BD28b6) |
| StrategyBase sfrxETH (Implementation)    | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase lsETH (Proxy)               | [0xAe60d8180437b5C34bB956822ac2710972584473](https://etherscan.io/address/0xAe60d8180437b5C34bB956822ac2710972584473) |
| StrategyBase lsETH (Implementation)      | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| StrategyBase mETH (Proxy)                | [0x298aFB19A105D59E74658C4C334Ff360BadE6dd2](https://etherscan.io/address/0x298aFB19A105D59E74658C4C334Ff360BadE6dd2) |
| StrategyBase mETH (Implementation)       | [0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3](https://etherscan.io/address/0xdfdA04f980bE6A64E3607c95Ca26012Ab9aA46d3) |
| EigenStrategy (Proxy)                    | [0xaCB55C530Acdb2849e6d4f36992Cd8c9D50ED8F7](https://etherscan.io/address/0xaCB55C530Acdb2849e6d4f36992Cd8c9D50ED8F7) |
| EigenStrategy (Implementation)           | [0x27e7a3a81741b9fcc5ad7edcbf9f8a72a5c00428](https://etherscan.io/address/0x27e7a3a81741b9fcc5ad7edcbf9f8a72a5c00428) |
| EigenPod (Proxy)                         | [0x5a2a4F2F3C18f09179B6703e63D9eDD165909073](https://etherscan.io/address/0x5a2a4F2F3C18f09179B6703e63D9eDD165909073) |
| EigenPod (Implementation)                | [0x6D225e974Fa404D25Ffb84eD6E242Ffa18eF6430](https://etherscan.io/address/0x6D225e974Fa404D25Ffb84eD6E242Ffa18eF6430) |
| DelayedWithdrawalRouter (Proxy)          | [0x7Fe7E9CC0F274d2435AD5d56D5fa73E47F6A23D8](https://etherscan.io/address/0x7Fe7E9CC0F274d2435AD5d56D5fa73E47F6A23D8) |
| DelayedWithdrawalRouter (Implementation) | [0x4bb6731b02314d40abbffbc4540f508874014226](https://etherscan.io/address/0x4bb6731b02314d40abbffbc4540f508874014226) |
| Eigen (Token) (Proxy)                    | [0xec53bf9167f50cdeb3ae105f56099aaab9061f83](https://etherscan.io/address/0xec53bf9167f50cdeb3ae105f56099aaab9061f83) |
| Eigen (Token) (Implementation)           | [0x17f56E911C279bad67eDC08acbC9cf3DC4eF26A0](https://etherscan.io/address/0x17f56E911C279bad67eDC08acbC9cf3DC4eF26A0) |
| BackingEigen (Proxy)                     | [0x83E9115d334D248Ce39a6f36144aEaB5b3456e75](https://etherscan.io/address/0x83E9115d334D248Ce39a6f36144aEaB5b3456e75) |
| BackingEigen (Implementation)            | [0xF2b225815F70c9b327DC9db758A36c92A4279b17](https://etherscan.io/address/0xF2b225815F70c9b327DC9db758A36c92A4279b17) |
| SignedDistributor                        | [0x035bdAeaB85E47710C27EdA7FD754bA80aD4ad02](https://etherscan.io/address/0x035bdAeaB85E47710C27EdA7FD754bA80aD4ad02) |
| PauserRegistry                           | [0x0c431C66F4dE941d089625E5B423D00707977060](https://etherscan.io/address/0x0c431C66F4dE941d089625E5B423D00707977060) |
| Timelock                                 | [0xA6Db1A8C5a981d1536266D2a393c5F8dDb210EAF](https://etherscan.io/address/0xA6Db1A8C5a981d1536266D2a393c5F8dDb210EAF) |
| ProxyAdmin                               | [0x8b9566AdA63B64d1E1dcF1418b43fd1433b72444](https://etherscan.io/address/0x8b9566AdA63B64d1E1dcF1418b43fd1433b72444) |

## Permission owners

| Name                | Account                                                                                                               | Type          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| Timlock             | [0xA6Db1A8C5a981d1536266D2a393c5F8dDb210EAF](https://etherscan.io/address/0xA6Db1A8C5a981d1536266D2a393c5F8dDb210EAF) | Contract      |
| ProxyAdmin          | [0x8b9566AdA63B64d1E1dcF1418b43fd1433b72444](https://etherscan.io/address/0x8b9566AdA63B64d1E1dcF1418b43fd1433b72444) | Contract      |
| Pauser Multisig     | [0x5050389572f2d220ad927CcbeA0D406831012390](https://etherscan.io/address/0x5050389572f2d220ad927CcbeA0D406831012390) | Multisig 1/6  |
| Community Multisig  | [0xFEA47018D632A77bA579846c840d5706705Dc598](https://etherscan.io/address/0xFEA47018D632A77bA579846c840d5706705Dc598) | Multisig 9/13 |
| Executor Multisig   | [0x369e6F597e22EaB55fFb173C6d9cD234BD699111](https://etherscan.io/address/0x369e6F597e22EaB55fFb173C6d9cD234BD699111) | Multisig 1/2  |
| Operations Multisig | [0xBE1685C81aA44FF9FB319dD389addd9374383e90](https://etherscan.io/address/0xBE1685C81aA44FF9FB319dD389addd9374383e90) | Multisig 3/6  |

## Permissions

| Contract      | Function     | Impact                                                                                                                               | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| contract name | functionname | Description in 3 Sentences.                                                                                                          | owner of the permission |
| contract name | functionname | First sentence: what it does technically, e.g "It assigns a new address to the owner variable".                                      | owner of the permission |
| contract name | functionname | Second sentence: what is the impact within the system, e.g "The owner is permissioned to raise fees".                                | owner of the permission |
| contract name | functionname | Third sentence: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield. | owner of the permission |
