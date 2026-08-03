---
chain: Ethereum
protocol: Fira
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

Fira is a fixed-rate lending protocol on Ethereum that allows users to lock borrowing costs and lending returns for defined periods by organizing lending around maturities rather than floating utilization-based rates. The protocol launched with approximately $450M in deposits reallocated from Euler Finance users. Fira has undergone six independent security audits conducted by Sherlock, Spearbit via Cantina, Hexens, and yAudit between November 2025 and early 2026.

# Ratings

## Chain

The report covers Fira deployed on Ethereum mainnet. Ethereum mainnet achieves a *Low* centralization risk score.

> Chain score: Low

## Upgradeability

Fira's smart contracts have been audited six times by reputable firms (Sherlock, Spearbit via Cantina, Hexens, yAudit). The protocol uses a timelock-based upgrade mechanism. All contracts are verified on Etherscan.

> Upgradeability score: Low

## Autonomy

Fira relies on Chainlink oracle feeds for price discovery. The protocol does not have a fallback oracle mechanism.

> Autonomy score: Medium

## Exit Window

Fira uses a timelock for protocol upgrades. The specific exit window duration needs verification.

> Exit Window score: Medium

## Accessibility

The protocol has a public frontend. Third-party frontends have not been identified.

> Accessibility score: Medium

# Protocol Analysis

## Fixed-Rate Lending Model

Fira organizes lending markets by maturity, allowing users to lock rates for specific periods. Interest rates are determined by supply and demand mechanics rather than utilization-based algorithms. This model provides predictability for both lenders and borrowers.

## Smart Contracts

Fira's contracts have been verified and audited six times. The audit firms include Sherlock, Spearbit (via Cantina), Hexens, and yAudit.

## Dependencies

Fira depends on Chainlink oracles for price feeds. No fallback oracle mechanism was identified.

# Reviewer Notes

⚠️ The TVL figure of $15.89M (DefiLlama) may differ from the launch TVL of $450M due to market conditions and user withdrawals.

⚠️ The six audits are a strong positive signal, but the specific audit reports should be reviewed for any unresolved findings.

# Conclusion

Fira achieves **Stage 0** with a relatively strong security posture due to multiple audits and verified contracts. The protocol presents medium risk due to oracle dependencies and upgrade mechanisms.

> Overall Score: Stage 0
