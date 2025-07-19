---
protocol: "Venus Protocol"
website: "https://venus.io/"
x: "https://x.com/VenusProtocol"
github: ["https://github.com/VenusProtocol"]
defillama_slug: ["venus"]
chain: "Binance"
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

| Contract Name                                                          | Address                                                                                                              |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| PoolRegistry (Proxy)                                                   | [0x9F7b01A536aFA00EF10310A162877fd792cD0666](https://bscscan.com/address/0x9F7b01A536aFA00EF10310A162877fd792cD0666) |
| PoolRegistry (Implementation)                                          | [0xc4953e157d057941a9a71273b0af4d4477ed2770](https://bscscan.com/address/0xc4953e157d057941a9a71273b0af4d4477ed2770) |
| PoolLens                                                               | [0x0461c613433d42C06831C8e60Bf0C86FC9495072](https://bscscan.com/address/0x0461c613433d42C06831C8e60Bf0C86FC9495072) |
| ProxyAdmin                                                             | [0x6beb6D2695B67FEb73ad4f172E8E2975497187e4](https://bscscan.com/address/0x6beb6D2695B67FEb73ad4f172E8E2975497187e4) |
| UpgradeableBeacon (Comptroller Beacon) (Core Pool)                     | [0x38B4Efab9ea1bAcD19dC81f19c4D1C2F9DeAe1B2](https://bscscan.com/address/0x38B4Efab9ea1bAcD19dC81f19c4D1C2F9DeAe1B2) |
| Unitroller (Comptroller) (Core Pool)                                   | [0xfD36E2c2a6789Db23113685031d7F16329158384](https://bscscan.com/address/0xfD36E2c2a6789Db23113685031d7F16329158384) |
| UpgradeableBeacon (VToken) (Core Pool)                                 | [0x2b8A1C539ABaC89CbF7E2Bc6987A0A38A5e660D4](https://bscscan.com/address/0x2b8A1C539ABaC89CbF7E2Bc6987A0A38A5e660D4) |
| SwapRouter (Core Pool)                                                 | [0x8938E6dA30b59c1E27d5f70a94688A89F7c815a4](https://bscscan.com/address/0x8938E6dA30b59c1E27d5f70a94688A89F7c815a4) |
| VBep20Delegator (Proxy) (vAAVE) (Core Pool)                            | [0x26DA28954763B92139ED49283625ceCAf52C6f94](https://bscscan.com/address/0x26DA28954763B92139ED49283625ceCAf52C6f94) |
| VBep20Delegator (Proxy) (vADA) (Core Pool)                             | [0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec](https://bscscan.com/address/0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec) |
| VBep20Delegator (Proxy) (vBCH) (Core Pool)                             | [0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176](https://bscscan.com/address/0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176) |
| VBep20Delegator (Proxy) (vBETH) (Core Pool)                            | [0x972207A639CC1B374B893cc33Fa251b55CEB7c07](https://bscscan.com/address/0x972207A639CC1B374B893cc33Fa251b55CEB7c07) |
| VBep20Delegator (Proxy) (vBNB) (Core Pool)                             | [0xA07c5b74C9B40447a954e1466938b865b6BBea36](https://bscscan.com/address/0xA07c5b74C9B40447a954e1466938b865b6BBea36) |
| VBep20Delegator (Proxy) (vBTC) (Core Pool)                             | [0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B](https://bscscan.com/address/0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B) |
| VBep20Delegator (Proxy) (vBUSD) (Core Pool)                            | [0x95c78222B3D6e262426483D42CfA53685A67Ab9D](https://bscscan.com/address/0x95c78222B3D6e262426483D42CfA53685A67Ab9D) |
| VBep20Delegator (Proxy) (vCAKE) (Core Pool)                            | [0x86aC3974e2BD0d60825230fa6F355fF11409df5c](https://bscscan.com/address/0x86aC3974e2BD0d60825230fa6F355fF11409df5c) |
| VBep20Delegator (Proxy) (vDAI) (Core Pool)                             | [0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1](https://bscscan.com/address/0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1) |
| VBep20Delegator (Proxy) (vDOGE) (Core Pool)                            | [0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71](https://bscscan.com/address/0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71) |
| VBep20Delegator (Proxy) (vDOT) (Core Pool)                             | [0x1610bc33319e9398de5f57B33a5b184c806aD217](https://bscscan.com/address/0x1610bc33319e9398de5f57B33a5b184c806aD217) |
| VBep20Delegator (Proxy) (vETH) (Core Pool)                             | [0xf508fCD89b8bd15579dc79A6827cB4686A3592c8](https://bscscan.com/address/0xf508fCD89b8bd15579dc79A6827cB4686A3592c8) |
| VBep20Delegator (Proxy) (vFDUSD) (Core Pool)                           | [0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba](https://bscscan.com/address/0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba) |
| VBep20Delegator (Proxy) (vFIL) (Core Pool)                             | [0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343](https://bscscan.com/address/0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343) |
| VBep20Delegator (Proxy) (vLINK) (Core Pool)                            | [0x650b940a1033B8A1b1873f78730FcFC73ec11f1f](https://bscscan.com/address/0x650b940a1033B8A1b1873f78730FcFC73ec11f1f) |
| VBep20Delegator (Proxy) (vlisUSD) (Core Pool)                          | [0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab](https://bscscan.com/address/0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab) |
| VBep20Delegator (Proxy) (vLTC) (Core Pool)                             | [0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B](https://bscscan.com/address/0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B) |
| VBep20Delegator (Proxy) (vLUNA) (Core Pool)                            | [0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8](https://bscscan.com/address/0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8) |
| VBep20Delegator (Proxy) (vMATIC) (Core Pool)                           | [0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8](https://bscscan.com/address/0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8) |
| VBep20Delegator (Proxy) (vSOL) (Core Pool)                             | [0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC](https://bscscan.com/address/0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC) |
| VBep20Delegator (Proxy) (vSolvBTC) (Core Pool)                         | [0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea](https://bscscan.com/address/0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea) |
| VBep20Delegator (Proxy) (vSXP) (Core Pool)                             | [0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0](https://bscscan.com/address/0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0) |
| VBep20Delegator (Proxy) (vTHE) (Core Pool)                             | [0x86e06EAfa6A1eA631Eab51DE500E3D474933739f](https://bscscan.com/address/0x86e06EAfa6A1eA631Eab51DE500E3D474933739f) |
| VBep20Delegator (Proxy) (vTRX) (Core Pool)                             | [0xC5D3466aA484B040eE977073fcF337f2c00071c1](https://bscscan.com/address/0xC5D3466aA484B040eE977073fcF337f2c00071c1) |
| VBep20Delegator (Proxy) (vTRXOLD) (Core Pool)                          | [0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93](https://bscscan.com/address/0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93) |
| VBep20Delegator (Proxy) (vTUSD) (Core Pool)                            | [0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E](https://bscscan.com/address/0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E) |
| VBep20Delegator (Proxy) (vTUSDOLD) (Core Pool)                         | [0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3](https://bscscan.com/address/0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3) |
| VBep20Delegator (Proxy) (vTWT) (Core Pool)                             | [0x4d41a36D04D97785bcEA57b057C412b278e6Edcc](https://bscscan.com/address/0x4d41a36D04D97785bcEA57b057C412b278e6Edcc) |
| VBep20Delegator (Proxy) (vUNI) (Core Pool)                             | [0x27FF564707786720C71A2e5c1490A63266683612](https://bscscan.com/address/0x27FF564707786720C71A2e5c1490A63266683612) |
| VBep20Delegator (Proxy) (vUSDC) (Core Pool)                            | [0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8](https://bscscan.com/address/0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8) |
| VBep20Delegator (Proxy) (vUSDT) (Core Pool)                            | [0xfD5840Cd36d94D7229439859C0112a4185BC0255](https://bscscan.com/address/0xfD5840Cd36d94D7229439859C0112a4185BC0255) |
| VBep20Delegator (Proxy) (vUST) (Core Pool)                             | [0x78366446547D062f45b4C0f320cDaa6d710D87bb](https://bscscan.com/address/0x78366446547D062f45b4C0f320cDaa6d710D87bb) |
| VBep20Delegator (Proxy) (vWBETH) (Core Pool)                           | [0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0](https://bscscan.com/address/0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0) |
| VBep20Delegator (Proxy) (vXRP) (Core Pool)                             | [0xB248a295732e0225acd3337607cc01068e3b9c10](https://bscscan.com/address/0xB248a295732e0225acd3337607cc01068e3b9c10) |
| VBep20Delegator (Proxy) (vXVS) (Core Pool)                             | [0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D](https://bscscan.com/address/0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D) |
| VBep20Delegate (Implementation)                                        | [0x6e5cff66c7b671fa1d5782866d80bd15955d79f6](https://bscscan.com/address/0x6e5cff66c7b671fa1d5782866d80bd15955d79f6) |
| Venus Treasury                                                         | [0xf322942f644a996a617bd29c16bd7d231d9f35e9](https://bscscan.com/address/0xf322942f644a996a617bd29c16bd7d231d9f35e9) |
| XVSVault (Proxy)                                                       | [0x051100480289e704d20e9DB4804837068f3f9204](https://bscscan.com/address/0x051100480289e704d20e9DB4804837068f3f9204) |
| XVSVault (Implementation)                                              | [0x413c1e1b77190bc84717f8cce6eeab0594e0af4e](https://bscscan.com/address/0x413c1e1b77190bc84717f8cce6eeab0594e0af4e) |
| XVS Store                                                              | [0x1e25CF968f12850003Db17E0Dba32108509C4359](https://bscscan.com/address/0x1e25CF968f12850003Db17E0Dba32108509C4359) |
| Prime (Proxy)                                                          | [0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC](https://bscscan.com/address/0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC) |
| Prime (Implementation)                                                 | [0x7a2e3481f345367045539896e5bf385910fb5c2c](https://bscscan.com/address/0x7a2e3481f345367045539896e5bf385910fb5c2c) |
| PrimeLiquidityProvider (Proxy)                                         | [0x23c4F844ffDdC6161174eB32c770D4D8C07833F2](https://bscscan.com/address/0x23c4F844ffDdC6161174eB32c770D4D8C07833F2) |
| PrimeLiquidityProvider (Implementation)                                | [0x208068ae8a619fcc851659791659b1aa40d796da](https://bscscan.com/address/0x208068ae8a619fcc851659791659b1aa40d796da) |
| Liquidator (Proxy)                                                     | [0x0870793286aaDA55D39CE7f82fb2766e8004cF43](https://bscscan.com/address/0x0870793286aaDA55D39CE7f82fb2766e8004cF43) |
| Liquidator (Implementation)                                            | [0xe26ce9b5fdd602225cccc4cef7fae596dcf2a965](https://bscscan.com/address/0xe26ce9b5fdd602225cccc4cef7fae596dcf2a965) |
| PegStability (Proxy)                                                   | [0xC138aa4E424D1A8539e8F38Af5a754a2B7c3Cc36](https://bscscan.com/address/0xC138aa4E424D1A8539e8F38Af5a754a2B7c3Cc36) |
| PegStability (Implementation)                                          | [0x9664568e5131e85f67d87fcd55b249f5d25fa43e](https://bscscan.com/address/0x9664568e5131e85f67d87fcd55b249f5d25fa43e) |
| ProtocolShareReserve (Proxy)                                           | [0xCa01D5A9A248a830E9D93231e791B1afFed7c446](https://bscscan.com/address/0xCa01D5A9A248a830E9D93231e791B1afFed7c446) |
| ProtocolShareReserve (Implementation)                                  | [0x86a2a5eb77984e923e7b5af45819a8c8f870f061](https://bscscan.com/address/0x86a2a5eb77984e923e7b5af45819a8c8f870f061) |
| RiskFund (Proxy)                                                       | [0xdF31a28D68A2AB381D42b380649Ead7ae2A76E42](https://bscscan.com/address/0xdF31a28D68A2AB381D42b380649Ead7ae2A76E42) |
| RiskFundV2 (Implementation)                                            | [0x7ef5abbcc9a701e728beb7afd4fb5747fab15a28](https://bscscan.com/address/0x7ef5abbcc9a701e728beb7afd4fb5747fab15a28) |
| Shortfall (Proxy)                                                      | [0xf37530A8a810Fcb501AA0Ecd0B0699388F0F2209](https://bscscan.com/address/0xf37530A8a810Fcb501AA0Ecd0B0699388F0F2209) |
| Shortfall (Implementation)                                             | [0x916e607af3250ecb2fd4ea82a37eb2756a20e1fc](https://bscscan.com/address/0x916e607af3250ecb2fd4ea82a37eb2756a20e1fc) |
| VAI Unitroller                                                         | [0x004065D34C6b18cE4370ced1CeBDE94865DbFAFE](https://bscscan.com/address/0x004065D34C6b18cE4370ced1CeBDE94865DbFAFE) |
| VAIVaultProxy                                                          | [0x0667Eed0a0aAb930af74a3dfeDD263A73994f216](https://bscscan.com/address/0x0667Eed0a0aAb930af74a3dfeDD263A73994f216) |
| VAIVault                                                               | [0xa52f2a56abb7cbdd378bc36c6088fafeaf9ac423](https://bscscan.com/address/0xa52f2a56abb7cbdd378bc36c6088fafeaf9ac423) |
| VBNBAdmin (Proxy)                                                      | [0x9A7890534d9d91d473F28cB97962d176e2B65f1d](https://bscscan.com/address/0x9A7890534d9d91d473F28cB97962d176e2B65f1d) |
| VBNBAdmin (Implementation)                                             | [0xaa8d9558d8d45666552a72cecbdd0a746aeacdc9](https://bscscan.com/address/0xaa8d9558d8d45666552a72cecbdd0a746aeacdc9) |
| BinanceOracle (Proxy)                                                  | [0x594810b741d136f1960141C0d8Fb4a91bE78A820](https://bscscan.com/address/0x594810b741d136f1960141C0d8Fb4a91bE78A820) |
| BinanceOracle (Implementation)                                         | [0x8bf46792022126ae7f3ac8f4914ed66e7deb7388](https://bscscan.com/address/0x8bf46792022126ae7f3ac8f4914ed66e7deb7388) |
| BoundValidator (Proxy)                                                 | [0x6E332fF0bB52475304494E4AE5063c1051c7d735](https://bscscan.com/address/0x6E332fF0bB52475304494E4AE5063c1051c7d735) |
| BoundValidator (Implementation)                                        | [0xcf0612ceafd63709d8f7efe71ecd0aabf075f6b1](https://bscscan.com/address/0xcf0612ceafd63709d8f7efe71ecd0aabf075f6b1) |
| ChainlinkOracle (Proxy)                                                | [0x1B2103441A0A108daD8848D8F5d790e4D402921F](https://bscscan.com/address/0x1B2103441A0A108daD8848D8F5d790e4D402921F) |
| ChainlinkOracle (Implementation)                                       | [0x38120f83734f719dc199109e09a822a80cd26ead](https://bscscan.com/address/0x38120f83734f719dc199109e09a822a80cd26ead) |
| RedstoneOracle (Proxy)                                                 | [0x8455EFA4D7Ff63b8BFD96AdD889483Ea7d39B70a](https://bscscan.com/address/0x8455EFA4D7Ff63b8BFD96AdD889483Ea7d39B70a) |
| RedstoneOracle (Implementation) (same implementation as for Chainlink) | [0x1338738c0ca76824a47b325d1494373dce7e13d6](https://bscscan.com/address/0x1338738c0ca76824a47b325d1494373dce7e13d6) |
| Resilient Oracle (Proxy)                                               | [0x6592b5DE802159F3E74B2486b091D11a8256ab8A](https://bscscan.com/address/0x6592b5DE802159F3E74B2486b091D11a8256ab8A) |
| Resilient Oracle (Implementation)                                      | [0xb5d7a073d77102ad56b7482b18e7204c1a71c8b9](https://bscscan.com/address/0xb5d7a073d77102ad56b7482b18e7204c1a71c8b9) |
| AnkrBNBOracle (Proxy)                                                  | [0xb0FCf0d45C15235D4ebC30d3c01d7d0D72Fd44AB](https://bscscan.com/address/0xb0FCf0d45C15235D4ebC30d3c01d7d0D72Fd44AB) |
| AnkrBNBOracle (Implementation)                                         | [0x74080f4cfa35d10a4af7b8057bada1c3b630170d](https://bscscan.com/address/0x74080f4cfa35d10a4af7b8057bada1c3b630170d) |
| BNBxOracle (Proxy)                                                     | [0x94f30dC18D12C210E5ae32752B1033afdd89D5DB](https://bscscan.com/address/0x94f30dC18D12C210E5ae32752B1033afdd89D5DB) |
| BNBxOracle (Implementation)                                            | [0x49ba22665d598634837344c832c327593817832c](https://bscscan.com/address/0x49ba22665d598634837344c832c327593817832c) |
| SlisBNBOracle (Proxy)                                                  | [0xfE54895445eD2575Bf5386B90FFB098cBC5CA29A](https://bscscan.com/address/0xfE54895445eD2575Bf5386B90FFB098cBC5CA29A) |
| SlisBNBOracle (Implementation)                                         | [0x7ac3dc7bd02c89bca06307406d78a75867f4c048](https://bscscan.com/address/0x7ac3dc7bd02c89bca06307406d78a75867f4c048) |
| AsBNBOracle (Proxy)                                                    | [0x52375ACab348Fa3979503EB9ADB11D74560dEe99](https://bscscan.com/address/0x52375ACab348Fa3979503EB9ADB11D74560dEe99) |
| AsBNBOracle (Implementation)                                           | [0xe055cabf9af41a9ff3d87ff22b589a0b3f7de4a0](https://bscscan.com/address/0xe055cabf9af41a9ff3d87ff22b589a0b3f7de4a0) |
| StkBNBOracle (Proxy)                                                   | [0xdBAFD16c5eA8C29D1e94a5c26b31bFAC94331Ac6](https://bscscan.com/address/0xdBAFD16c5eA8C29D1e94a5c26b31bFAC94331Ac6) |
| StkBNBOracle (Implementation)                                          | [0xa7c432c50d310c805c8342488921a108b585397f](https://bscscan.com/address/0xa7c432c50d310c805c8342488921a108b585397f) |
| WBETHOracle (Proxy)                                                    | [0x739db790c656E54590957Ed4d6B94665bCcb3456](https://bscscan.com/address/0x739db790c656E54590957Ed4d6B94665bCcb3456) |
| WBETHOracle (Implementation)                                           | [0x9c79160d3adf2436ce37379186da37f2d3bbf92a](https://bscscan.com/address/0x9c79160d3adf2436ce37379186da37f2d3bbf92a) |
| DefaultProxyAdmin                                                      | [0x1BB765b741A5f3C2A338369DAb539385534E3343](https://bscscan.com/address/0x1BB765b741A5f3C2A338369DAb539385534E3343) |
| OneJumpOracle (Proxy) (wstETH/ETH/USD) (Chainlink)                     | [0x3C9850633e8Cb5ac5c3Da833C947E7c91EED15C4](https://bscscan.com/address/0x3C9850633e8Cb5ac5c3Da833C947E7c91EED15C4) |
| OneJumpOracle (Implementation) (wstETH/ETH/USD) (Chainlink)            | [0x9e1693008544d815692c20961376d78d51015c96](https://bscscan.com/address/0x9e1693008544d815692c20961376d78d51015c96) |
| OneJumpOracle (Proxy) (wstETH/ETH/USD) (Redstone)                      | [0x90dd7ae1137cC072F7740Ee0b264f2351515B98A](https://bscscan.com/address/0x90dd7ae1137cC072F7740Ee0b264f2351515B98A) |
| OneJumpOracle (Implementation) (wstETH/ETH/USD) (Redstone)             | [0xcf56aeb81930bb4d1bd94a2381a4a3fb6b4bd44b](https://bscscan.com/address/0xcf56aeb81930bb4d1bd94a2381a4a3fb6b4bd44b) |
| OneJumpOracle (Proxy) (weETH/ETH/USD) (Chainlink)                      | [0x3b3241698692906310A65ACA199701843404E175](https://bscscan.com/address/0x3b3241698692906310A65ACA199701843404E175) |
| OneJumpOracle (Implementation) (weETH/ETH/USD) (Chainlink)             | [0x157fb3dfe0bd5569cc25dc79ae195e82a3eb6855](https://bscscan.com/address/0x157fb3dfe0bd5569cc25dc79ae195e82a3eb6855) |
| OneJumpOracle (Proxy) (weETH/ETH/USD) (Redstone)                       | [0xb661102c399630420A4B9fa0a5cF57161e5452F5](https://bscscan.com/address/0xb661102c399630420A4B9fa0a5cF57161e5452F5) |
| OneJumpOracle (Implementation) (weETH/ETH/USD) (Redstone)              | [0x447fb4e894e05982ff7e150db6af4a7b7f57eedf](https://bscscan.com/address/0x447fb4e894e05982ff7e150db6af4a7b7f57eedf) |
| OneJumpOracle (Proxy) SolvBTC.BBN/BTC/USD (Redstone)                   | [0x98B9bC5a1e7E439ebEB0BEdB7e9f6b24fEc1E8B4](https://bscscan.com/address/0x98B9bC5a1e7E439ebEB0BEdB7e9f6b24fEc1E8B4) |
| OneJumpOracle (Implementation) SolvBTC.BBN/BTC/USD (Redstone)          | [0x98ed7290a3d52fa5639dd76c16ade3074ba664dd](https://bscscan.com/address/0x98ed7290a3d52fa5639dd76c16ade3074ba664dd) |
| PendleOracle (Proxy) PT-SolvBTC.BBN-27MAR2025                          | [0xE11965a3513F537d91D73d9976FBe8c0969Bb252](https://bscscan.com/address/0xE11965a3513F537d91D73d9976FBe8c0969Bb252) |
| PendleOracle (Implementation) PT-SolvBTC.BBN-27MAR2025                 | [0xd2721fb0d9f071d84b3ebfd27ab35b568b350079](https://bscscan.com/address/0xd2721fb0d9f071d84b3ebfd27ab35b568b350079) |
| PendleOracle (Proxy) PT-clisBNB-25APR2025                              | [0xEa7a92D12196A325C76ED26DBd36629d7EC46459](https://bscscan.com/address/0xEa7a92D12196A325C76ED26DBd36629d7EC46459) |
| PendleOracle (Implementation) PT-clisBNB-25APR2025                     | [0x8a183a0d35290d849e8915710d3aee7e463705e7](https://bscscan.com/address/0x8a183a0d35290d849e8915710d3aee7e463705e7) |
| Governor Bravo Delegate                                                | [0x360ac19648efc29d2b7b70bac227c35e909272fd](https://bscscan.com/address/0x360ac19648efc29d2b7b70bac227c35e909272fd) |
| Governor Bravo Delegator                                               | [0x2d56dc077072b53571b8252008c60e945108c75a](https://bscscan.com/address/0x2d56dc077072b53571b8252008c60e945108c75a) |
| Access Control Manager                                                 | [0x4788629abc6cfca10f9f969efdeaa1cf70c23555](https://bscscan.com/address/0x4788629abc6cfca10f9f969efdeaa1cf70c23555) |
| Timelock (normal)                                                      | [0x939bD8d64c0A9583A7Dcea9933f7b21697ab6396](https://bscscan.com/address/0x939bD8d64c0A9583A7Dcea9933f7b21697ab6396) |
| Timelock (fast track)                                                  | [0x555ba73dB1b006F3f2C7dB7126d6e4343aDBce02](https://bscscan.com/address/0x555ba73dB1b006F3f2C7dB7126d6e4343aDBce02) |
| Timelock (critical)                                                    | [0x213c446ec11e45b15a6E29C1C1b402B8897f606d](https://bscscan.com/address/0x213c446ec11e45b15a6E29C1C1b402B8897f606d) |
| Omnichain Proposal Sender                                              | [0x36a69dE601381be7b0DcAc5D5dD058825505F8f6](https://bscscan.com/address/0x36a69dE601381be7b0DcAc5D5dD058825505F8f6) |
| XVSBridgeAdmin (Proxy)                                                 | [0x70d644877b7b73800E9073BCFCE981eAaB6Dbc21](https://bscscan.com/address/0x70d644877b7b73800E9073BCFCE981eAaB6Dbc21) |
| XVSBridgeAdmin (Implementation)                                        | [0xb085926fa310b4af85b499162b96e30e5c0e6fac](https://bscscan.com/address/0xb085926fa310b4af85b499162b96e30e5c0e6fac) |
| XVSProxyOFTSrc                                                         | [0xf8F46791E3dB29a029Ec6c9d946226f3c613e854](https://bscscan.com/address/0xf8F46791E3dB29a029Ec6c9d946226f3c613e854) |
| XVS                                                                    | [0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63](https://bscscan.com/address/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63) |
| RiskFundConverter (Proxy)                                              | [0xA5622D276CcbB8d9BBE3D1ffd1BB11a0032E53F0](https://bscscan.com/address/0xA5622D276CcbB8d9BBE3D1ffd1BB11a0032E53F0) |
| RiskFundConverter (Implementation)                                     | [0xd420bf9c31f6b4a98875b6e561b13acb19210647](https://bscscan.com/address/0xd420bf9c31f6b4a98875b6e561b13acb19210647) |
| XVSVaultTreasury (Proxy)                                               | [0x269ff7818DB317f60E386D2be0B259e1a324a40a](https://bscscan.com/address/0x269ff7818DB317f60E386D2be0B259e1a324a40a) |
| XVSVaultTreasury (Implementation)                                      | [0xa95a4f34337d8fac283c3e3d2a605b95da916cd6](https://bscscan.com/address/0xa95a4f34337d8fac283c3e3d2a605b95da916cd6) |
| SingleTokenConverterBeacon                                             | [0x4c9D57b05B245c40235D720A5f3A592f3DfF11ca](https://bscscan.com/address/0x4c9D57b05B245c40235D720A5f3A592f3DfF11ca) |
| BeaconProxy (USDTPrimeConverter)                                       | [0xD9f101AA67F3D72662609a2703387242452078C3](https://bscscan.com/address/0xD9f101AA67F3D72662609a2703387242452078C3) |
| BeaconProxy USDCPrimeConverter                                         | [0xa758c9C215B6c4198F0a0e3FA46395Fa15Db691b](https://bscscan.com/address/0xa758c9C215B6c4198F0a0e3FA46395Fa15Db691b) |
| BeaconProxy BTCBPrimeConverter                                         | [0xE8CeAa79f082768f99266dFd208d665d2Dd18f53](https://bscscan.com/address/0xE8CeAa79f082768f99266dFd208d665d2Dd18f53) |
| BeaconProxy (ETHPrimeConverter)                                        | [0xca430B8A97Ea918fF634162acb0b731445B8195E](https://bscscan.com/address/0xca430B8A97Ea918fF634162acb0b731445B8195E) |
| BeaconProxy (XVSVaultConverter)                                        | [0xd5b9AE835F4C59272032B3B954417179573331E0](https://bscscan.com/address/0xd5b9AE835F4C59272032B3B954417179573331E0) |
| SingleTokenConverter (general)                                         | [0x40ed28180df01fdeb957224e4a5415704b9d5990](https://bscscan.com/address/0x40ed28180df01fdeb957224e4a5415704b9d5990) |
| ConverterNetwork (Proxy)                                               | [0xF7Caad5CeB0209165f2dFE71c92aDe14d0F15995](https://bscscan.com/address/0xF7Caad5CeB0209165f2dFE71c92aDe14d0F15995) |
| ConverterNetwork (Implementation)                                      | [0x8d17874cda682adcbcdd8eef8dfe8eeb9d4d6f8d](https://bscscan.com/address/0x8d17874cda682adcbcdd8eef8dfe8eeb9d4d6f8d) |

## Permission owners

| Name                               | Account                                                                                                              | Type         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------ |
| Guardian 1 (Critical Risk Params)  | [0x7B1AE5Ea599bC56734624b95589e7E8E64C351c9](https://bscscan.com/address/0x7B1AE5Ea599bC56734624b95589e7E8E64C351c9) | Multisig x/y |
| Guardian 2 (Pause/Resume Features) | [0x1C2CAc6ec528c20800B2fe734820D87b581eAA6B](https://bscscan.com/address/0x1C2CAc6ec528c20800B2fe734820D87b581eAA6B) | Multisig x/y |
| Guardian 3 (Oracles)               | [0x3a3284dC0FaFfb0b5F0d074c4C704D14326C98cF](https://bscscan.com/address/0x3a3284dC0FaFfb0b5F0d074c4C704D14326C98cF) | Multisig x/y |

## Permissions

| Contract      | Function     | Impact                                                                                                                               | Owner                   |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| contract name | functionname | Description in 3 Sentences.                                                                                                          | owner of the permission |
| contract name | functionname | First sentence: what it does technically, e.g "It assigns a new address to the owner variable".                                      | owner of the permission |
| contract name | functionname | Second sentence: what is the impact within the system, e.g "The owner is permissioned to raise fees".                                | owner of the permission |
| contract name | functionname | Third sentence: Imagine faulty or malicious action, e.g "The malicious owner could raise fees to 100%, redirecting all future yield. | owner of the permission |
