---
protocol: "Euler V2"
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

## Conclusion

Some text in form of:

The xyz protocol achieves High centralization risk scores for its Upgradeability, Autonomy and Exit Window dimensions. It thus ranks Stage 0.

The protocol could reach Stage 1 by ...

The project additionally could advance to Stage 2 if ...

# Reviewer's Notes

(Here, anything worth mentioning about what critical permissions you excluded from the scope or some elements that xyz protocol does in a unique way. If nothing seems relevant, just say that :)

⚠️ During our analysis, we identified ...

# Protocol Analysis

Here include the diagram(s). Please explain what the main contracts are doing within the diagram.

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

| Contract Name                              | Address                                                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| OFTAdapterUpgradeable (Proxy)              | [0x4d7e09f73843Bd4735AaF7A74b6d877bac75a531](https://etherscan.io/address/0x4d7e09f73843Bd4735AaF7A74b6d877bac75a531) |
| OFTAdapterUpgradeable (Implementation)     | [0x3bf1bd5db4457d22a85d45791b6291b98d0fc5b5](https://etherscan.io/address/0x3bf1bd5db4457d22a85d45791b6291b98d0fc5b5) |
| TrackingRewardStreams                      | [0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3](https://etherscan.io/address/0x0D52d06ceB8Dcdeeb40Cfd9f17489B350dD7F8a3) |
| GenericFactory (eVaultFactory)             | [0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e](https://etherscan.io/address/0x29a56a1b8214D9Cf7c5561811750D5cBDb45CC8e) |
| EVault (Implementation)                    | [0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D](https://etherscan.io/address/0x8Ff1C814719096b61aBf00Bb46EAd0c9A529Dd7D) |
| EulerEarnFactory                           | [0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427](https://etherscan.io/address/0x9a20d3C0c283646e9701a049a2f8C152Bc1e3427) |
| EulerEarn (Implementation)                 | [0xBa42141648dFD74388f3541C1d80fa9387043Da9](https://etherscan.io/address/0xBa42141648dFD74388f3541C1d80fa9387043Da9) |
| EthereumVaultConnector (EVC)               | [0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383](https://etherscan.io/address/0x0C9a3dd6b8F28529d72d7f9cE918D493519EE383) |
| ProtocolConfig                             | [0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b](https://etherscan.io/address/0x4cD6BF1D183264c02Be7748Cb5cd3A47d013351b) |
| SequenceRegistry                           | [0xEADDD21618ad5Deb412D3fD23580FD461c106B54](https://etherscan.io/address/0xEADDD21618ad5Deb412D3fD23580FD461c106B54) |
| GovernorAccessControlEmergency             | [0x35400831044167E9E2DE613d26515eeE37e30a1b](https://etherscan.io/address/0x35400831044167E9E2DE613d26515eeE37e30a1b) |
| TimelockController                         | [0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59](https://etherscan.io/address/0xBfeE2D937FB9223FFD65b7cDF607bd1DA9B97E59) |
| TimelockController                         | [0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a](https://etherscan.io/address/0x1b8C367aE56656b1D0901b2ADd1AD3226fF74f5a) |
| FactoryGovernor                            | [0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d](https://etherscan.io/address/0x2F13256E04022d6356d8CE8C53C7364e13DC1f3d) |
| TimelockController                         | [0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968](https://etherscan.io/address/0xfb034c1C6c7F42171b2d1Cb8486E0f43ED07A968) |
| AccountLens                                | [0x94B9D29721f0477402162C93d95B3b4e52425844](https://etherscan.io/address/0x94B9D29721f0477402162C93d95B3b4e52425844) |
| EulerEarnVaultLens                         | [0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f](https://etherscan.io/address/0xafad3c14f32BD46EB32F7383214f4Af0Cff6285f) |
| IRMLens                                    | [0x35B2Fa6206fCC6f653B75832C281bf9d4eBfeaC2](https://etherscan.io/address/0x35B2Fa6206fCC6f653B75832C281bf9d4eBfeaC2) |
| OracleLens                                 | [0x53DcfC583F835A23A69185E7EDB0560E8cB1858A](https://etherscan.io/address/0x53DcfC583F835A23A69185E7EDB0560E8cB1858A) |
| UtilsLens                                  | [0x3Ebfd228dD4F497B90fB8f7AC68E5Fb5E027Fb36](https://etherscan.io/address/0x3Ebfd228dD4F497B90fB8f7AC68E5Fb5E027Fb36) |
| VaultLens                                  | [0xA8695d44EC128136F8Afcd796D6ba3Db3cdA8914](https://etherscan.io/address/0xA8695d44EC128136F8Afcd796D6ba3Db3cdA8914) |
| EulerIRMAdaptiveCurveFactory               | [0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42](https://etherscan.io/address/0x3EC2d5af936bBB57DD19C292BAfb89da0E377F42) |
| EdgeFactory                                | [0xA969B8a46166B135fD5AC533AdC28c816E1659Bd](https://etherscan.io/address/0xA969B8a46166B135fD5AC533AdC28c816E1659Bd) |
| EdgeFactoryPerspective                     | [0x8c7543f83D3d295F68447792581F73d7d5D4d788](https://etherscan.io/address/0x8c7543f83D3d295F68447792581F73d7d5D4d788) |
| EscrowedCollateralPerspective              | [0x4e58BBEa423c4B9A2Fc7b8E58F5499f9927fADdE](https://etherscan.io/address/0x4e58BBEa423c4B9A2Fc7b8E58F5499f9927fADdE) |
| EulerEarnFactoryPerspective                | [0xC09be111D95171d1D5db43f1324005D21C098B52](https://etherscan.io/address/0xC09be111D95171d1D5db43f1324005D21C098B52) |
| GovernedPerspective                        | [0x747a726736DDBE6210B9d7187b3479DC5705165E](https://etherscan.io/address/0x747a726736DDBE6210B9d7187b3479DC5705165E) |
| EulerUngovernedPerspective                 | [0xb50a07C2B0F128Faa065bD18Ea2091F5da5e7FbF](https://etherscan.io/address/0xb50a07C2B0F128Faa065bD18Ea2091F5da5e7FbF) |
| EulerUngovernedPerspective                 | [0x600bBe1D0759F380Fea72B2e9B2B6DCb4A21B507](https://etherscan.io/address/0x600bBe1D0759F380Fea72B2e9B2B6DCb4A21B507) |
| EVKFactoryPerspective                      | [0xB30f23bc5F93F097B3A699f71B0b1718Fc82e182](https://etherscan.io/address/0xB30f23bc5F93F097B3A699f71B0b1718Fc82e182) |
| SnapshotRegistry (external Vault Registry) | [0xB3b30ffb54082CB861B17DfBE459370d1Cc219AC](https://etherscan.io/address/0xB3b30ffb54082CB861B17DfBE459370d1Cc219AC) |
| FeeFlowController                          | [0xFcd3Db06EA814eB21C84304fC7F90798C00D1e32](https://etherscan.io/address/0xFcd3Db06EA814eB21C84304fC7F90798C00D1e32) |
| GovernedPerspective                        | [0xC0121817FF224a018840e4D15a864747d36e6Eb2](https://etherscan.io/address/0xC0121817FF224a018840e4D15a864747d36e6Eb2) |
| GovernorAccessControlEmergencyFactory      | [0x025C8831c6E45420DF8E71F7B6b99F733D120Faf](https://etherscan.io/address/0x025C8831c6E45420DF8E71F7B6b99F733D120Faf) |
| SnapshotRegistry (irm registry)            | [0x0a64670763777E59898AE28d6ACb7f2062BF459C](https://etherscan.io/address/0x0a64670763777E59898AE28d6ACb7f2062BF459C) |
| EulerKinkIRMFactory                        | [0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9](https://etherscan.io/address/0xcAe0A39B45Ee9C3213f64392FA6DF30CE034C9F9) |
| SnapshotRegistry (Oracle adapter registry) | [0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6](https://etherscan.io/address/0xA084A7F49723E3cc5722E052CF7fce910E7C5Fe6) |
| EulerRouterFactory (Oracle router)         | [0x70B3f6F61b7Bf237DF04589DdAA842121072326A](https://etherscan.io/address/0x70B3f6F61b7Bf237DF04589DdAA842121072326A) |
| EulerRouter (example Oracle router)        | [0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57](https://etherscan.io/address/0x8ab93f4ee16fb9c0086651a85f941b8a8716cd57) |
| Eul (Token)                                | [0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b](https://etherscan.io/address/0xd9Fcd98c322942075A5C3860693e9f4f03AAE07b) |
| rEul (Reward Token)                        | [0xf3e621395fc714B90dA337AA9108771597b4E696](https://etherscan.io/address/0xf3e621395fc714B90dA337AA9108771597b4E696) |

## Permission owners

| Name               | Account                                                                                                               | Type         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------ |
| DAO                | [0xcAD001c30E96765aC90307669d578219D4fb1DCe](https://etherscan.io/address/0xcAD001c30E96765aC90307669d578219D4fb1DCe) | Multisig 4/8 |
| Euler Labs         | [0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27](https://etherscan.io/address/0xB1345E7A4D35FB3E6bF22A32B3741Ae74E5Fba27) | Multisig     |
| Security Council   | [0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53](https://etherscan.io/address/0xb3b84e8320250Afe7a5fb313Ee32B52982b73c53) | Multisig     |
| Security Partner A | [0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471](https://etherscan.io/address/0xd5b7bC743a94978d9fE6cAcED3F09Bc194cBd471) | Multisig 2/3 |
| Security Partner B | [0x62962b4d506b0065a133f37e19D163E5b002b655](https://etherscan.io/address/0x62962b4d506b0065a133f37e19D163E5b002b655) | Multisig     |

## Permissions

| Contract      | Function     | Impact                                                                                                                               | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| contract name | functionname | Description in 3 Sentences.                                                                                                          | owner of the permission |
| contract name | functionname | First sentence: what it does technically, e.g "It assigns a new address to the owner variable".                                      | owner of the permission |
| contract name | functionname | Second sentence: what is the impact within the system, e.g "The owner is permissioned to raise fees".                                | owner of the permission |
| contract name | functionname | Third sentence: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield. | owner of the permission |
