export const stageToRequisites = {
  O: ["Project does currently not meet Stage 0 requirements."],
  R: ["Currently in review"],
  "0": [
    "✅ The financial app is blockchain-based.",
    "✅ All assets are not in custody by a centralized entity.",
    "✅ All protocol components and the expected performance is publicly documented.",
    "✅ All smart contracts are published with available source code.",
    "✅ All smart contracts are verified with a public blockchain explorer.",
  ],
  "1": [
    "Risks from critical permissions and dependencies are significantly reduced by: either revoking critical permissions, or establishing a Security Council to control such permissions, or enforcing an exit window of at least 7 days so users can withdraw funds in case of an unwanted protocol update. Critical risks from external dependencies are mitigated by the implementation of appropriate fallback mechanisms. Furthermore, the underlying chain cannot censor users’ transactions and a backup user interface exists guaranteeing access to user funds.",
  ],
  "2": [
    "Critical permissions have either been revoked or delegated to an on-chain governance system with ample time for users to exit in case of an unwanted protocol update. Risks from external dependencies have been further reduced such that users’ funds and unclaimed yield remain unaffected by a failure. In addition, different independent user interfaces and a fully decentralized underlying chain guarantee access to users’ funds at any time.",
  ],
};

export const reasonToText = {
  "Central Custody":
    "All or some assets are in custody by a centralized entity.",
  "Missing Docs":
    "All or some protocol components and expected performance is not publicly documented.",
  "Closed-Source":
    "All or some smart contracts are not published with available source code.",
  "Unverified Contracts":
    "All or some smart contracts are not verified with a public blockchain explorer.",
};
