// Withdraw FLOW from the user's StashVault back to their wallet
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import StashVault from 0x5bb6780edb394fdb

transaction(amount: UFix64) {
    prepare(signer: auth(BorrowValue) &Account) {
        // Borrow user's StashVault (owner access for withdraw)
        let stashRef = signer.storage.borrow<auth(StashVault.Vault.Owner) &StashVault.Vault>(
            from: StashVault.VaultStoragePath
        ) ?? panic("StashVault not found")

        // Withdraw from stash
        let withdrawn <- stashRef.withdraw(amount: amount)

        // Deposit back into user's FLOW vault
        let flowVaultRef = signer.storage.borrow<&FlowToken.Vault>(
            from: /storage/flowTokenVault
        ) ?? panic("Could not borrow FLOW vault")

        flowVaultRef.deposit(from: <-withdrawn)
    }
}
