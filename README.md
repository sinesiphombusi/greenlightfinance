Greenlight Finance
StashVault
StashVault is a consumer-first onchain savings product built on Flow, designed to make decentralized finance feel like modern personal finance.
It lets everyday people safely stash money, earn yield, and automate savings without wallets, gas fees, or DeFi jargon.
StashVault is the first product by Greenlight Finance, a platform focused on empowering everyday users with calm, trustworthy financial tools powered by decentralized infrastructure.
Problem
DeFi is powerful but inaccessible.
Most onchain finance products assume users already understand wallets, gas fees, irreversible transactions, and complex financial terminology. As a result, everyday people either never enter DeFi or exit after a single bad experience.
Key barriers include:
Complex onboarding and wallet setup
Constant transaction signing and fee anxiety
Financial actions expressed in protocol-level jargon
No guardrails or education at the moment of action
This prevents DeFi from becoming a true alternative to everyday financial tools.
Solution
StashVault turns DeFi primitives into a simple savings experience that feels familiar, safe, and understandable.
Instead of asking users to learn DeFi, StashVault adapts DeFi to users.
It provides:
Walletless onboarding
Gasless transactions
Plain-language financial actions
Embedded education and guardrails
Simple automation through Auto-Stash
All while preserving non-custodial ownership on Flow.
Core Features
1. Walletless onboarding
Users sign in using email or passkey-style authentication. A Flow account is created or linked behind the scenes. The user never has to manage private keys directly.
2. Gasless experience
All deposits, withdrawals, and automated actions are sponsored. Users never see or think about gas fees.
3. StashVault
A low-risk, savings-style vault that accepts a stable asset.
Users can:
Deposit funds
Earn yield
Withdraw at any time
All actions are explained in human language before confirmation.
4. Embedded financial education
Instead of a separate learning section, StashVault teaches users contextually.
Before every important action, users see:
What this action does
Why it matters
What could go wrong
What they remain in control of
This mirrors how consumer platforms like EasyEquities educate users while they invest.
5. Auto-Stash
Users can enable simple savings automation.
Features:
Weekly deposit schedule
Editable amount
Toggle on or off at any time
“Run Auto-Stash now” for demo purposes
Automation rules are visible, understandable, and reversible.
6. Activity log
A clear history of:
Deposits
Auto-Stash runs
Withdrawals
Each entry shows what happened, when it happened, and the outcome.
Why Flow
Flow is purpose-built for consumer applications.
StashVault leverages Flow’s strengths:
High-throughput and low-latency execution
Account model suited for user-friendly abstractions
Support for sponsored transactions
Tooling designed for mainstream adoption
Flow makes it possible to build finance that feels calm and familiar without sacrificing decentralization.
Architecture Overview
Frontend: Next.js app generated and iterated using Lovable
Blockchain: Flow testnet
Smart Contracts: Single StashVault contract supporting deposit, withdraw, and balance reads
Wallet Integration: Flow Client Library (FCL) or Flow EVM tooling
Gas Sponsorship: Sponsored transactions so users never pay fees
Automation: Simple rule storage with manual execution trigger for demo
The system is modular and designed to scale into additional financial products under Greenlight Finance.
Scalability and Future Potential
StashVault is intentionally scoped for the hackathon, but designed as a foundation.
Future extensions include:
Multiple vault types with different risk profiles
Salary-linked or round-up savings
Onchain payroll and subscriptions
RWA-backed savings products
Privacy-preserving savings using confidential compute
Greenlight Finance aims to become a consumer finance platform where everyday users can safely build wealth onchain.
Demo Flow
User signs up using email or passkey
User deposits funds into StashVault
User enables Auto-Stash with a weekly amount
Auto-Stash is executed for demo
User views updated balance and activity log
User withdraws funds to confirm exit and control
This demonstrates a complete and functional product loop.
Repository Contents
/app – Frontend application
/contracts – StashVault smart contract
/lib – Flow integration and helpers
README.md – Project overview and setup
Setup Instructions
Clone the repository
Install dependencies
Configure Flow testnet credentials
Deploy the StashVault contract
Run the frontend locally
Open the app and follow the demo flow
Detailed setup steps are included in the repository.
Team
Built solo by Sinesipho Mbusi
Product Designer and DeFi-focused builder
Closing Note
StashVault is not about chasing yield.
It is about lowering fear, reducing friction, and empowering everyday people to participate in onchain finance with confidence.
