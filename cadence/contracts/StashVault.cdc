// StashVault.cdc — Savings vault resource stored in each user's account
// Deploy to Flow Testnet, then update CONTRACT_ADDRESS in src/lib/vault.ts

import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

access(all) contract StashVault {

    // ── Events ──
    access(all) event Deposited(amount: UFix64, to: Address?)
    access(all) event Withdrawn(amount: UFix64, from: Address?)
    access(all) event VaultCreated()

    // ── Storage paths ──
    access(all) let VaultStoragePath: StoragePath
    access(all) let VaultPublicPath: PublicPath

    // ── Public interface ──
    access(all) resource interface VaultPublic {
        access(all) fun getBalance(): UFix64
    }

    // ── Vault resource — stored in each user's account ──
    access(all) resource Vault: VaultPublic {
        access(self) var flowVault: @FlowToken.Vault

        init() {
            self.flowVault <- FlowToken.createEmptyVault(vaultType: Type<@FlowToken.Vault>()) as! @FlowToken.Vault
        }

        // Read balance
        access(all) fun getBalance(): UFix64 {
            return self.flowVault.balance
        }

        // Deposit FLOW into the stash
        access(all) fun deposit(from: @{FungibleToken.Vault}) {
            let amount = from.balance
            self.flowVault.deposit(from: <-from)
            emit Deposited(amount: amount, to: self.owner?.address)
        }

        // Withdraw FLOW from the stash
        access(Owner) fun withdraw(amount: UFix64): @{FungibleToken.Vault} {
            let vault <- self.flowVault.withdraw(amount: amount)
            emit Withdrawn(amount: amount, from: self.owner?.address)
            return <-vault
        }

        destroy() {
            destroy self.flowVault
        }
    }

    // ── Create a new empty vault ──
    access(all) fun createVault(): @Vault {
        emit VaultCreated()
        return <-create Vault()
    }

    init() {
        self.VaultStoragePath = /storage/stashVault
        self.VaultPublicPath = /public/stashVault
    }
}
