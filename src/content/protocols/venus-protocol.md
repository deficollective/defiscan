---
protocol: "Venus Protocol"
website: "https://venus.io/"
x: "https://x.com/VenusProtocol"
github: ["https://github.com/VenusProtocol"]
defillama_slug: ["venus"]
chain: "BSC"
stage: 0
reasons: ["remove", "if none"]
risks: ["x", "x", "x", "x", "x"]
author: ["author-1", "author-2"]
submission_date: "1970-01-01"
publish_date: "1970-01-01"
update_date: "1970-01-01"
---

# Summary

Note: This report only covers the core pool which has 2B TVL, while isolated pools only have 3.6M

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

| Contract Name                                      | Address                                                                                                              |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| PoolRegistry (Proxy)                               | [0x9F7b01A536aFA00EF10310A162877fd792cD0666](https://bscscan.com/address/0x9F7b01A536aFA00EF10310A162877fd792cD0666) |
| PoolRegistry (Implementation)                      | [0xc4953e157d057941a9a71273b0af4d4477ed2770](https://bscscan.com/address/0xc4953e157d057941a9a71273b0af4d4477ed2770) |
| PoolLens                                           | [0x0461c613433d42C06831C8e60Bf0C86FC9495072](https://bscscan.com/address/0x0461c613433d42C06831C8e60Bf0C86FC9495072) |
| ProxyAdmin                                         | [0x6beb6D2695B67FEb73ad4f172E8E2975497187e4](https://bscscan.com/address/0x6beb6D2695B67FEb73ad4f172E8E2975497187e4) |
| UpgradeableBeacon (Comptroller Beacon) (Core Pool) | [0x38B4Efab9ea1bAcD19dC81f19c4D1C2F9DeAe1B2](https://bscscan.com/address/0x38B4Efab9ea1bAcD19dC81f19c4D1C2F9DeAe1B2) |
| Unitroller (Comptroller) (Core Pool)               | [0xfD36E2c2a6789Db23113685031d7F16329158384](https://bscscan.com/address/0xfD36E2c2a6789Db23113685031d7F16329158384) |
| UpgradeableBeacon (VToken) (Core Pool)             | [0x2b8A1C539ABaC89CbF7E2Bc6987A0A38A5e660D4](https://bscscan.com/address/0x2b8A1C539ABaC89CbF7E2Bc6987A0A38A5e660D4) |
| SwapRouter (Core Pool)                             | [0x8938E6dA30b59c1E27d5f70a94688A89F7c815a4](https://bscscan.com/address/0x8938E6dA30b59c1E27d5f70a94688A89F7c815a4) |
| VBep20Delegator (Proxy) (vAAVE) (Core Pool)        | [0x26DA28954763B92139ED49283625ceCAf52C6f94](https://bscscan.com/address/0x26DA28954763B92139ED49283625ceCAf52C6f94) |
| VBep20Delegator (Proxy) (vADA) (Core Pool)         | [0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec](https://bscscan.com/address/0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec) |
| VBep20Delegator (Proxy) (vBCH) (Core Pool)         | [0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176](https://bscscan.com/address/0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176) |
| VBep20Delegator (Proxy) (vBETH) (Core Pool)        | [0x972207A639CC1B374B893cc33Fa251b55CEB7c07](https://bscscan.com/address/0x972207A639CC1B374B893cc33Fa251b55CEB7c07) |
| VBep20Delegator (Proxy) (vBNB) (Core Pool)         | [0xA07c5b74C9B40447a954e1466938b865b6BBea36](https://bscscan.com/address/0xA07c5b74C9B40447a954e1466938b865b6BBea36) |
| VBep20Delegator (Proxy) (vBTC) (Core Pool)         | [0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B](https://bscscan.com/address/0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B) |
| VBep20Delegator (Proxy) (vBUSD) (Core Pool)        | [0x95c78222B3D6e262426483D42CfA53685A67Ab9D](https://bscscan.com/address/0x95c78222B3D6e262426483D42CfA53685A67Ab9D) |
| VBep20Delegator (Proxy) (vCAKE) (Core Pool)        | [0x86aC3974e2BD0d60825230fa6F355fF11409df5c](https://bscscan.com/address/0x86aC3974e2BD0d60825230fa6F355fF11409df5c) |
| VBep20Delegator (Proxy) (vDAI) (Core Pool)         | [0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1](https://bscscan.com/address/0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1) |
| VBep20Delegator (Proxy) (vDOGE) (Core Pool)        | [0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71](https://bscscan.com/address/0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71) |
| VBep20Delegator (Proxy) (vDOT) (Core Pool)         | [0x1610bc33319e9398de5f57B33a5b184c806aD217](https://bscscan.com/address/0x1610bc33319e9398de5f57B33a5b184c806aD217) |
| VBep20Delegator (Proxy) (vETH) (Core Pool)         | [0xf508fCD89b8bd15579dc79A6827cB4686A3592c8](https://bscscan.com/address/0xf508fCD89b8bd15579dc79A6827cB4686A3592c8) |
| VBep20Delegator (Proxy) (vFDUSD) (Core Pool)       | [0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba](https://bscscan.com/address/0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba) |
| VBep20Delegator (Proxy) (vFIL) (Core Pool)         | [0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343](https://bscscan.com/address/0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343) |
| VBep20Delegator (Proxy) (vLINK) (Core Pool)        | [0x650b940a1033B8A1b1873f78730FcFC73ec11f1f](https://bscscan.com/address/0x650b940a1033B8A1b1873f78730FcFC73ec11f1f) |
| VBep20Delegator (Proxy) (vlisUSD) (Core Pool)      | [0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab](https://bscscan.com/address/0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab) |
| VBep20Delegator (Proxy) (vLTC) (Core Pool)         | [0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B](https://bscscan.com/address/0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B) |
| VBep20Delegator (Proxy) (vLUNA) (Core Pool)        | [0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8](https://bscscan.com/address/0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8) |
| VBep20Delegator (Proxy) (vMATIC) (Core Pool)       | [0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8](https://bscscan.com/address/0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8) |
| VBep20Delegator (Proxy) (vSOL) (Core Pool)         | [0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC](https://bscscan.com/address/0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC) |
| VBep20Delegator (Proxy) (vSolvBTC) (Core Pool)     | [0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea](https://bscscan.com/address/0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea) |
| VBep20Delegator (Proxy) (vSXP) (Core Pool)         | [0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0](https://bscscan.com/address/0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0) |
| VBep20Delegator (Proxy) (vTHE) (Core Pool)         | [0x86e06EAfa6A1eA631Eab51DE500E3D474933739f](https://bscscan.com/address/0x86e06EAfa6A1eA631Eab51DE500E3D474933739f) |
| VBep20Delegator (Proxy) (vTRX) (Core Pool)         | [0xC5D3466aA484B040eE977073fcF337f2c00071c1](https://bscscan.com/address/0xC5D3466aA484B040eE977073fcF337f2c00071c1) |
| VBep20Delegator (Proxy) (vTRXOLD) (Core Pool)      | [0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93](https://bscscan.com/address/0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93) |
| VBep20Delegator (Proxy) (vTUSD) (Core Pool)        | [0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E](https://bscscan.com/address/0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E) |
| VBep20Delegator (Proxy) (vTUSDOLD) (Core Pool)     | [0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3](https://bscscan.com/address/0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3) |
| VBep20Delegator (Proxy) (vTWT) (Core Pool)         | [0x4d41a36D04D97785bcEA57b057C412b278e6Edcc](https://bscscan.com/address/0x4d41a36D04D97785bcEA57b057C412b278e6Edcc) |
| VBep20Delegator (Proxy) (vUNI) (Core Pool)         | [0x27FF564707786720C71A2e5c1490A63266683612](https://bscscan.com/address/0x27FF564707786720C71A2e5c1490A63266683612) |
| VBep20Delegator (Proxy) (vUSDC) (Core Pool)        | [0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8](https://bscscan.com/address/0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8) |
| VBep20Delegator (Proxy) (vUSDT) (Core Pool)        | [0xfD5840Cd36d94D7229439859C0112a4185BC0255](https://bscscan.com/address/0xfD5840Cd36d94D7229439859C0112a4185BC0255) |
| VBep20Delegator (Proxy) (vUST) (Core Pool)         | [0x78366446547D062f45b4C0f320cDaa6d710D87bb](https://bscscan.com/address/0x78366446547D062f45b4C0f320cDaa6d710D87bb) |
| VBep20Delegator (Proxy) (vWBETH) (Core Pool)       | [0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0](https://bscscan.com/address/0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0) |
| VBep20Delegator (Proxy) (vXRP) (Core Pool)         | [0xB248a295732e0225acd3337607cc01068e3b9c10](https://bscscan.com/address/0xB248a295732e0225acd3337607cc01068e3b9c10) |
| VBep20Delegator (Proxy) (vXVS) (Core Pool)         | [0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D](https://bscscan.com/address/0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D) |
| VBep20Delegate (Implementation)                    | [0x6e5cff66c7b671fa1d5782866d80bd15955d79f6](https://bscscan.com/address/0x6e5cff66c7b671fa1d5782866d80bd15955d79f6) |

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
