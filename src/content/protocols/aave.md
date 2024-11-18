---
protocol: "aave-v3"
website: "https://aave.com"
x: "https://x.com/aave"
github: "https://github.com/aave-dao/aave-v3-origin"
defillama_slug: "aave"
chain: "Ethereum"
stage: 0
risks: ["x", "x", "x", "x", "x"]
author: ["sagaciousyves"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
acknowledge_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Borrow and Lending protocol on Ethereum.

# Overview

## Chain

See http://localhost:3000/learn-more#chain for more guidance.

## Upgradeability

See http://localhost:3000/learn-more#upgradability for more guidance.

## Autonomy

See http://localhost:3000/learn-more#autonomy for more guidance.

## Exit Window

See http://localhost:3000/learn-more#exit-window for more guidance.

## Accessibility

See http://localhost:3000/learn-more#accessibility for more guidance.

# Technical Analysis

## Contracts

| Contract Name                                   | Address                                    |
| ----------------------------------------------- | ------------------------------------------ |
| Pool (Proxy)                                    | 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2 |
| Pool (Implementation)                           | 0xef434e4573b90b6ecd4a00f4888381e4d0cc5ccd |
| GHOFlashMinter                                  | 0xb639D208Bcf0589D54FaC24E655C79EC529762B8 |
| WrappedTokenGateway(V3)                         | 0xA434D495249abE33E031Fe71a969B81f3c07950D |
| PoolAddressesProvider                           | 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e |
| PoolConfigurator (Proxy)                        | 0x64b761D848206f447Fe2dd461b0c635Ec39EbB27 |
| PoolConfigurator (Implementation)               | 0x4816b2c2895f97fb918f1ae7da403750a0ee372e |
| UiPoolDataProvider                              | 0x194324C9Af7f56E22F1614dD82E18621cb9238E7 |
| UiIncentiveDataProvider                         | 0x5a40cDe2b76Da2beD545efB3ae15708eE56aAF9c |
| UiGHODataProvider                               | 0x379c1EDD1A41218bdbFf960a9d5AD2818Bf61aE8 |
| ACLManager                                      | 0xc2aaCf6553D20d1e9d78E365AAba8032af9c85b0 |
| WalletBalanceProvider                           | 0xC7be5307ba715ce89b152f3Df0658295b3dbA8E2 |
| TreasuryCollector (Proxy)                       | 0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c |
| TreasuryCollector (Implementation)              | 0x80f2c02224a2E548FC67c0bF705eBFA825dd5439 |
| AaveProtocolDataProvider                        | 0x41393e5e337606dc3821075Af65AeE84D7688CBD |
| RiskSteward                                     | 0xF3911922bd054Bf6f4d6A02B8ADAC444921B0c51 |
| RewardsController / DefaultIncentivesController | 0x8164Cc65827dcFe994AB23944CBC90e0aa80bFcb |
| IncentivesEmissionManager /EmissionManager      | 0x223d844fc4B006D67c0cDbd39371A9F73f69d974 |
| StaticATokenFactory                             | 0x411D79b8cC43384FDE66CaBf9b6a17180c842511 |
| PoolAddressesProviderRegistry                   | 0xbaA999AC55EAce41CcAE355c77809e68Bb345170 |
| AaveOracle                                      | 0x54586bE62E3c3580375aE3723C145253060Ca0C2 |
| RepayWithCollateral / ParaSwapRepayAdapter      | 0x35bb522b102326ea3F1141661dF4626C87000e3E |
| CollateralSwitch / ParaSwapLiquiditySwapAdapter | 0xADC0A53095A0af87F3aa29FE0715B5c28016364e |
| DebtSwitch                                      | 0xd7852E139a7097E119623de0751AE53a61efb442 |
| WithdrawSwitchAdapter                           | 0x78F8Bd884C3D738B74B420540659c82f392820e0 |
| ACLAdmin / Executor_lvl1 (Proxy)                | 0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A |
| ACLAdmin / Executor_lvl1 (Implementation)       | 0xa6d18e52acc597de5e58e47586e6a3984b1af749 |
| Executor_lvl2                                   | 0x17Dd33Ed0e3dD2a80E37489B8A63063161BE6957 |
| CapsPlusRiskSteward                             | 0x82dcCF206Ae2Ab46E2099e663F70DeE77caE7778 |
| ProxyAdmin                                      | 0xD3cF979e676265e4f6379749DECe4708B9A22476 |
| ProxyAdminLong                                  | 0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517 |
| FreezeSteward                                   | 0x2eE68ACb6A1319de1b49DC139894644E424fefD6 |
| AaveMerkleDistributor                           | 0xa88c6D90eAe942291325f9ae3c66f3563B93FE10 |
| AavePolEthBridge                                | 0x1C2BA5b8ab8e795fF44387ba6d251fa65AD20b36 |
| Manual AGRS                                     | 0x7C7143f4bE189928A6a98D8686c5e84c893c59c7 |
| GranularGuardian                                | 0x4457cA11E90f416Cc1D3a8E1cA41C0cdEcC251d4 |
| AaveGovernanceV3 (Proxy)                        | 0x9AEE0B04504CeF83A65AC3f0e838D0593BCb2BC7 |
| AaveGovernanceV3 (Implementation)               | 0x58bcb647c4beff253b4b6996c62f737b783f2cdd |
| PayloadsController (Proxy)                      | 0xdAbad81aF85554E9ae636395611C58F7eC1aAEc5 |
| PayloadsController (Implementation)             | 0x7222182cb9c5320587b5148bf03eee107ad64578 |
| VotingMachine                                   | 0x617332a777780F546261247F621051d0b98975Eb |
| VotingPortal_Eth_Eth                            | 0xf23f7De3AC42F22eBDA17e64DC4f51FB66b8E21f |
| VotingPortal_Eth_Avax                           | 0x33aCEf7365809218485873B7d0d67FeE411B5D79 |
| VotingPortal_Eth_Pol                            | 0x9b24C168d6A76b5459B1d47071a54962a4df36c3 |
| EmergencyRegistry                               | 0x73C6Fb358dDA8e84D50e98A98F7c0dF32e15C7e9 |
| CCIP Adapter                                    | 0xB7a6618df58626C3a122ABAFD6Ee63Af63f3Ef29 |
| Polygon native adapter                          | 0x1562F1b2487F892BBA8Ef325aF054Fd157510a71 |
| LayerZero adapter                               | 0x8410d9BD353b420ebA8C48ff1B0518426C280FCC |
| Hyperlane adapter                               | 0x01dcb90Cf13b82Cde4A0BAcC655585a83Af3cCC1 |
| CrossChainController (Proxy)                    | 0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1 |
| CrossChainController (Implementation)           | 0x92f4736b72d131d836b3e4d4c3c23fe53150ce4d |

## Permission owners

| Name | Account                                       | Type         |
| ---- | --------------------------------------------- | ------------ |
| name | [address](https://etherscan.io/address/0x...) | Multisig x/y |

## Permissions

| Contract      | Function     | Impact      | Owner                   |
| ------------- | ------------ | ----------- | ----------------------- |
| contract name | functionname | description | owner of the permission |

## Dependencies

insert text

## Exit Window

insert text

# Security Council

See http://localhost:3000/learn-more#security-council-requirements for guidance.

change ✅ or ❌ accordingly

| ✅ /❌ | Requirement                                             |
| ------ | ------------------------------------------------------- |
| ❌     | At least 7 signers                                      |
| ❌     | At least 51% threshold                                  |
| ❌     | At least 50% non-team signers                           |
| ❌     | Signers are publicly announced (with name or pseudonym) |

# Acknowledgement

The Aave protocol maintains a public markdown page on the existing permissions to inform the users of the protocol: https://github.com/bgd-labs/aave-permissions-book/blob/main/out/MAINNET-V3.md
