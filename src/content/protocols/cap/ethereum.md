---
chain: Ethereum
protocol: Cap
stage: 0
reasons: []
risks: ["L", "H", "H", "H", "L"]
author: wilnowilx
submission_date: 2026-08-03
publish_date: 2026-08-03
update_date: 1970-01-01
stage_requirements:
  [
    [
      { text: "Assets are not in custody by a centralized entity", status: "fixed" },
      { text: "All contracts are verified", status: "fixed" },
      { text: "Source-available codebase", status: "fixed" },
      { text: "Public documentation exists", status: "fixed" },
    ],
    [
      { text: "Upgrades with potential of loss of funds not protected with Exit Window >= 7 days OR a sufficient Security Council", status: "unfixed" },
      { text: "Dependency with a High centralization score without mitigation", status: "unfixed" },
      { text: "No Frontend backup or self-hosting option exists", status: "unfixed" },
    ],
    [
      { text: "Upgrades with potential of loss of funds or unclaimed yield not protected with onchain governance AND Exit Window >= 30 days", status: "unfixed" },
      { text: "Dependencies with High or Medium centralization score and no mitigations.", status: "unfixed" },
      { text: "No alternative third-party frontends exist", status: "unfixed" },
    ],
  ]
---

# Summary

Cap is a stablecoin protocol on Ethereum that provides credible financial guarantees via two products: the dollar-denominated cUSD and the yield-bearing stcUSD. The protocol has $261.08M in TVL and generates $505K in annualized revenue. Cap integrates with Symbiotic and EigenLayer for restaking yields.

# Ratings

## Chain

Cap is deployed on Ethereum mainnet. Ethereum mainnet achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

Cap's contracts are verified on Etherscan. The protocol uses a governance-based upgrade mechanism.

> Upgradeability score: Medium

## Autonomy

Cap relies on external oracle feeds for price discovery. The specific oracle providers need verification.

> Autonomy score: Medium

## Exit Window

Cap uses an onchain governance system for upgrades. The exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

The protocol has a public frontend. Third-party frontends have not been identified.

> Accessibility score: Medium

# Protocol Analysis

## Stablecoin Products

Cap offers two products:
- **cUSD**: A dollar-denominated stablecoin
- **stcUSD**: A yield-bearing stablecoin that generates returns from DeFi protocol yields and staking rewards

## Smart Contracts

Cap's contracts are verified on Etherscan. The specific audit status needs verification.

## Dependencies

Cap integrates with Symbiotic and EigenLayer for restaking yields. The protocol also depends on external oracle feeds.

# Reviewer Notes

⚠️ The TVL of $261M makes Cap one of the larger protocols in this review batch. The high TVL warrants a thorough security review.

⚠️ Cap's revenue ($505K annualized) is relatively low compared to its TVL, suggesting low fee capture.

⚠️ The integration with EigenLayer and Symbiotic introduces additional trust assumptions around restaking.

# Conclusion

Cap achieves **Stage 0** with medium risk due to oracle dependencies and governance upgrade mechanisms. The protocol's high TVL and stablecoin focus make it a significant target for further review.

> Overall Score: Stage 0
