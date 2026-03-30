import fcl from "@/lib/flow/config";
import * as t from "@onflow/types";

// ── Replace with your deployed contract address on Flow Testnet ──
export const CONTRACT_ADDRESS = "0xSTASH_VAULT_ADDRESS";

// ── Cadence templates (simplified MVP: balance tracking, no token transfers) ──

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
import StashVault from ${CONTRACT_ADDRESS}

transaction(amount: UFix64) {
  prepare(signer: auth(BorrowValue) &Account) {
    let stashRef = signer.storage.borrow<&StashVault.Vault>(
      from: StashVault.VaultStoragePath
    ) ?? panic("StashVault not found — run setup first")
    stashRef.deposit(amount: amount)
  }
}
`;

const WITHDRAW_CDC = `
import StashVault from ${CONTRACT_ADDRESS}

transaction(amount: UFix64) {
  prepare(signer: auth(BorrowValue) &Account) {
    let stashRef = signer.storage.borrow<auth(StashVault.Vault.Owner) &StashVault.Vault>(
      from: StashVault.VaultStoragePath
    ) ?? panic("StashVault not found")
    stashRef.withdraw(amount: amount)
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

/**
 * Initialize the user's StashVault resource (run once per user after wallet connect).
 */
export async function setupAccount(): Promise<string> {
  const txId = await fcl.mutate({
    cadence: SETUP_ACCOUNT_CDC,
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 999,
  });
  await fcl.tx(txId).onceSealed();
  console.log("StashVault setup complete:", txId);
  return txId;
}

/**
 * Deposit (simulate) — updates on-chain vault balance.
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
  const txStatus = await fcl.tx(txId).onceSealed();
  console.log("Deposit sealed:", txStatus);
  return txId;
}

/**
 * Withdraw (simulate) — updates on-chain vault balance.
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
  const txStatus = await fcl.tx(txId).onceSealed();
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
