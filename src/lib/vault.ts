import fcl from "@/lib/flow/config";
import * as t from "@onflow/types";

// ── Replace with your deployed contract address on Flow Testnet ──
export const CONTRACT_ADDRESS = "0x5bb6780edb394fdb";

// ── Cadence transaction templates ──
// These embed the contract address at build time.

const SETUP_ACCOUNT_CDC = `
import StashVault from ${CONTRACT_ADDRESS}

transaction {
  prepare(signer: auth(SaveValue, Capabilities) &Account) {
    if signer.storage.borrow<&StashVault.Vault>(from: StashVault.VaultStoragePath) == nil {
      let vault <- StashVault.createVault()
      signer.storage.save(<-vault, to: StashVault.VaultStoragePath)
      signer.capabilities.publish(
        signer.capabilities.storage.issue<&{StashVault.VaultPublic}>(StashVault.VaultStoragePath),
        at: StashVault.VaultPublicPath
      )
    }
  }
}
`;

const DEPOSIT_CDC = `
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import StashVault from ${CONTRACT_ADDRESS}

transaction(amount: UFix64) {
  prepare(signer: auth(BorrowValue) &Account) {
    let flowVaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
      from: /storage/flowTokenVault
    ) ?? panic("Could not borrow FLOW vault")

    let deposit <- flowVaultRef.withdraw(amount: amount)

    let stashRef = signer.storage.borrow<&StashVault.Vault>(
      from: StashVault.VaultStoragePath
    ) ?? panic("StashVault not found — run setup first")

    stashRef.deposit(from: <-deposit)
  }
}
`;

const WITHDRAW_CDC = `
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import StashVault from ${CONTRACT_ADDRESS}

transaction(amount: UFix64) {
  prepare(signer: auth(BorrowValue) &Account) {
    let stashRef = signer.storage.borrow<auth(StashVault.Vault.Owner) &StashVault.Vault>(
      from: StashVault.VaultStoragePath
    ) ?? panic("StashVault not found")

    let withdrawn <- stashRef.withdraw(amount: amount)

    let flowVaultRef = signer.storage.borrow<&FlowToken.Vault>(
      from: /storage/flowTokenVault
    ) ?? panic("Could not borrow FLOW vault")

    flowVaultRef.deposit(from: <-withdrawn)
  }
}
`;

const GET_BALANCE_CDC = `
import StashVault from ${CONTRACT_ADDRESS}

access(all) fun main(address: Address): UFix64 {
  let account = getAccount(address)
  let vaultRef = account
    .capabilities.borrow<&{StashVault.VaultPublic}>(StashVault.VaultPublicPath)
    ?? panic("StashVault not found for this address")
  return vaultRef.getBalance()
}
`;

// ── Fallback: native FLOW transfer (works without deployed contract) ──

// Set to true once you deploy StashVault.cdc and update CONTRACT_ADDRESS
export const USE_CONTRACT = true;

interface FlowTxStatus {
  errorMessage?: string;
  statusCode?: number;
}

function assertSealedSuccess(txId: string, txStatus: FlowTxStatus) {
  if (txStatus.errorMessage) {
    throw new Error(txStatus.errorMessage);
  }

  if (typeof txStatus.statusCode === "number" && txStatus.statusCode !== 4) {
    throw new Error(`Transaction ${txId} failed with status ${txStatus.statusCode}.`);
  }
}

/**
 * Initialize the user's StashVault resource (run once per user after wallet connect).
 * Only needed when USE_CONTRACT = true.
 */
export async function setupAccount(): Promise<string> {
  const txId = await fcl.mutate({
    cadence: SETUP_ACCOUNT_CDC,
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 999,
  });
  const txStatus = await fcl.tx(txId).onceSealed() as FlowTxStatus;
  assertSealedSuccess(txId, txStatus);
  console.log("StashVault setup complete:", txId);
  return txId;
}

/**
 * Deposit FLOW into the vault.
 */
export async function deposit(amount: number): Promise<string> {
  const amountFixed = amount.toFixed(8);
  const txId = await fcl.mutate({
    cadence: DEPOSIT_CDC,
    args: (arg: typeof fcl.arg, _t: typeof t) => [
      arg(amountFixed, t.UFix64),
    ],
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 999,
  });

  const txStatus = await fcl.tx(txId).onceSealed() as FlowTxStatus;
  assertSealedSuccess(txId, txStatus);
  console.log("Deposit sealed:", txStatus);
  return txId;
}

/**
 * Withdraw FLOW from the vault.
 */
export async function withdraw(amount: number): Promise<string> {
  const amountFixed = amount.toFixed(8);
  const txId = await fcl.mutate({
    cadence: WITHDRAW_CDC,
    args: (arg: typeof fcl.arg, _t: typeof t) => [
      arg(amountFixed, t.UFix64),
    ],
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 999,
  });

  const txStatus = await fcl.tx(txId).onceSealed() as FlowTxStatus;
  assertSealedSuccess(txId, txStatus);
  console.log("Withdraw sealed:", txStatus);
  return txId;
}

/**
 * Get vault balance for an address.
 */
export async function getVaultBalance(address: string): Promise<number> {
  try {
    const balance = await fcl.query({
      cadence: GET_BALANCE_CDC,
      args: (arg: typeof fcl.arg, _t: typeof t) => [
        arg(address, t.Address),
      ],
    });
    return parseFloat(balance);
  } catch (err) {
    console.warn("Failed to query balance:", err);
    return 0;
  }
}
