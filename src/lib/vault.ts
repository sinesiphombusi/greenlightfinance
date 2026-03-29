import fcl from "@/lib/flow/config";
import * as t from "@onflow/types";

// A designated vault address on Flow Testnet
// In production, this would be a smart contract address
// For the hackathon demo, deposits send FLOW to this address
export const VAULT_ADDRESS = "0x82ec283f88a62e65"; // placeholder — replace with your testnet address

/**
 * Deposit FLOW tokens by sending a native FLOW transfer via FCL.
 * Uses a Cadence transaction under the hood.
 */
export async function deposit(amount: number): Promise<string> {
  const amountFixed = amount.toFixed(8); // UFix64 format

  const transactionId = await fcl.mutate({
    cadence: `
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868

      transaction(amount: UFix64, to: Address) {
        let sentVault: @FungibleToken.Vault

        prepare(signer: auth(BorrowValue) &Account) {
          let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
            from: /storage/flowTokenVault
          ) ?? panic("Could not borrow reference to the owner's Vault!")

          self.sentVault <- vaultRef.withdraw(amount: amount)
        }

        execute {
          let receiverRef = getAccount(to)
            .capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

          receiverRef.deposit(from: <-self.sentVault)
        }
      }
    `,
    args: (arg: typeof fcl.arg, _t: typeof t) => [
      arg(amountFixed, t.UFix64),
      arg(VAULT_ADDRESS, t.Address),
    ],
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 500,
  });

  // Wait for the transaction to be sealed
  const txStatus = await fcl.tx(transactionId).onceSealed();
  console.log("Deposit transaction sealed:", txStatus);
  return transactionId;
}

/**
 * Withdraw FLOW tokens. In a real app this would call a contract.
 * For the hackathon demo, this sends FLOW back from the connected wallet.
 */
export async function withdraw(amount: number): Promise<string> {
  // Without a contract, withdraw is a self-transfer (demo placeholder).
  // In production, the vault contract would release funds back to the user.
  const amountFixed = amount.toFixed(8);
  const user = await fcl.currentUser.snapshot();
  const userAddress = user?.addr;

  if (!userAddress) throw new Error("Wallet not connected");

  const transactionId = await fcl.mutate({
    cadence: `
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868

      transaction(amount: UFix64, to: Address) {
        let sentVault: @FungibleToken.Vault

        prepare(signer: auth(BorrowValue) &Account) {
          let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
            from: /storage/flowTokenVault
          ) ?? panic("Could not borrow reference to the owner's Vault!")

          self.sentVault <- vaultRef.withdraw(amount: amount)
        }

        execute {
          let receiverRef = getAccount(to)
            .capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

          receiverRef.deposit(from: <-self.sentVault)
        }
      }
    `,
    args: (arg: typeof fcl.arg, _t: typeof t) => [
      arg(amountFixed, t.UFix64),
      arg(userAddress, t.Address),
    ],
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 500,
  });

  const txStatus = await fcl.tx(transactionId).onceSealed();
  console.log("Withdraw transaction sealed:", txStatus);
  return transactionId;
}

/**
 * Get FLOW balance of a given address using a Cadence script.
 */
export async function getVaultBalance(address: string): Promise<number> {
  try {
    const balance = await fcl.query({
      cadence: `
        import FungibleToken from 0x9a0766d93b6608b7
        import FlowToken from 0x7e60df042a9c0868

        access(all) fun main(account: Address): UFix64 {
          let vaultRef = getAccount(account)
            .capabilities.borrow<&FlowToken.Vault>(/public/flowTokenBalance)
            ?? panic("Could not borrow Balance reference to the Vault")

          return vaultRef.balance
        }
      `,
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
