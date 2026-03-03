# Greenlight Finance — StashVault

StashVault is a consumer-first onchain savings product built on Flow, designed to make decentralized finance feel like modern personal finance.

It lets everyday people safely stash money, earn yield, and automate savings without wallets, gas fees, or DeFi jargon.

StashVault is the first product by Greenlight Finance, a platform focused on empowering everyday users with calm, trustworthy financial tools powered by decentralized infrastructure.

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A browser wallet (MetaMask or compatible) configured for Flow EVM Testnet

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Flow EVM Testnet Configuration

The app connects to **Flow EVM Testnet** (Chain ID: 545).

Network details (auto-added to your wallet on connect):
- **RPC URL:** `https://testnet.evm.nodes.onflow.org`
- **Chain ID:** `545`
- **Block Explorer:** `https://evm-testnet.flowscan.io`
- **Currency:** FLOW

### Contract Setup

1. Deploy your StashVault contract to Flow EVM Testnet.
2. Update `src/lib/config.ts` with:
   - `VAULT_CONTRACT_ADDRESS` — your deployed contract address
   - `VAULT_ABI` — your contract's ABI (deposit, withdraw, getBalance)

The default ABI expects:
```solidity
function deposit() payable
function withdraw(uint256 amount)
function getBalance(address user) view returns (uint256)
```

### Demo Mode

If no wallet is detected or connected, the app runs in **demo mode** with mock data. All UI flows (deposit, withdraw, confirm, success) work without a wallet.

## Architecture

- **Frontend:** React + Vite + Tailwind CSS + TypeScript
- **Blockchain:** Flow EVM Testnet
- **Contract Interaction:** ethers.js v6
- **Wallet:** MetaMask or any injected EVM wallet

## Core Features

1. **Walletless onboarding** — Users can explore the app in demo mode without a wallet
2. **Gasless experience** — Transactions are sponsored (no gas fees shown to users)
3. **Savings Vault** — Deposit, earn yield, withdraw anytime
4. **Embedded education** — Contextual explanations before every action
5. **Auto-Stash** — Weekly automated deposit scheduling
6. **Activity log** — Timestamped transaction history

## Project Structure

```
src/
├── lib/
│   ├── config.ts        # Contract address, ABI, network config
│   ├── vault.ts         # Wallet connect + contract interaction functions
│   └── mock-data.ts     # Demo mode mock data
├── hooks/
│   └── use-wallet.tsx   # React wallet context provider
├── pages/
│   ├── Vault.tsx        # Main vault screen
│   ├── Autopilot.tsx    # Auto-stash settings
│   └── ActivityPage.tsx # Transaction history
└── components/
    └── vault/
        ├── ConfirmStep.tsx
        ├── SuccessStep.tsx
        └── VaultEducationBlocks.tsx
```

## Team

Built solo by Sinesipho Mbusi — Product Designer and DeFi-focused builder.
