# Greenlight Finance - StashVault

StashVault is a consumer savings product built on Flow. It is designed to make onchain saving feel closer to modern personal finance than a typical DeFi app.

The current implementation uses:
- React + Vite + TypeScript for the frontend
- Flow Client Library (FCL) for wallet authentication and transaction signing
- Cadence for the onchain vault contract and transactions
- Flow testnet for contract execution

## What The App Does

StashVault lets a user:
- connect a Flow-compatible wallet through FCL
- initialize a personal vault resource in their account
- deposit FLOW into that vault
- withdraw FLOW from that vault
- read their vault balance onchain

Each user owns their vault resource directly in their account. The UI keeps the interaction simple, while the vault logic is enforced onchain in Cadence.

## Current Architecture

This repo is Cadence-based, not Flow EVM-based.

Concretely:
- the contract lives in [cadence/contracts/StashVault.cdc](./cadence/contracts/StashVault.cdc)
- the frontend transaction helpers live in [src/lib/vault.ts](./src/lib/vault.ts)
- FCL network and wallet config live in [src/lib/flow/config.ts](./src/lib/flow/config.ts)
- wallet state is managed in [src/hooks/use-wallet.tsx](./src/hooks/use-wallet.tsx)

The frontend currently targets the deployed `StashVault` contract at:
- `0x5bb6780edb394fdb`

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- a Flow-compatible wallet that works with FCL on testnet

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Testnet Configuration

The app is configured for Flow testnet through FCL.

Current config:
- Access node: `https://rest-testnet.onflow.org`
- Discovery wallet: `https://fcl-discovery.onflow.org/testnet/authn`
- Network: `testnet`

See [src/lib/flow/config.ts](./src/lib/flow/config.ts).

## Contract Flow

The onchain flow is:

1. A user connects a wallet through FCL.
2. On first use, the app calls `setupAccount()` to create the user's `StashVault` resource if it does not already exist.
3. Deposits call the Cadence transaction that withdraws FLOW from the user's Flow token vault and deposits it into `StashVault`.
4. Withdrawals call the Cadence transaction that withdraws FLOW from `StashVault` back into the user's Flow token vault.
5. Balance reads query the user's public vault capability onchain.

Relevant files:
- [cadence/transactions/setup_account.cdc](./cadence/transactions/setup_account.cdc)
- [cadence/transactions/deposit.cdc](./cadence/transactions/deposit.cdc)
- [cadence/transactions/withdraw.cdc](./cadence/transactions/withdraw.cdc)
- [cadence/scripts/get_balance.cdc](./cadence/scripts/get_balance.cdc)

## Demo Mode vs Onchain Mode

The app was originally structured to support a local demo mode, but the current frontend is wired to the deployed Cadence contract and real onchain transactions.

If a wallet is connected:
- account setup runs onchain
- deposits and withdrawals are submitted onchain
- balances are queried onchain

## Project Structure

```text
src/
  components/
  hooks/
    use-wallet.tsx
  lib/
    flow/
      config.ts
    mock-data.ts
    vault.ts
  pages/
    Vault.tsx

cadence/
  contracts/
    StashVault.cdc
  transactions/
    setup_account.cdc
    deposit.cdc
    withdraw.cdc
  scripts/
    get_balance.cdc
```

## Important Note

There is a `src/flow.json` file in the repo that includes deployment data. If it contains a live private key, that key should be rotated and removed from version control. Deployment credentials should not live in the repo.

## Team

Built by Sinesipho Mbusi under Greenlight Finance.
