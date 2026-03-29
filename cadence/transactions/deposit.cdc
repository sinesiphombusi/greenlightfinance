// Deposit FLOW into the user's StashVault
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import StashVault from 0xSTASH_VAULT_ADDRESS

transaction(amount: UFix64) {
    prepare(signer: auth(BorrowValue) &Account) {
        // Borrow user's FLOW token vault
        let flowVaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
            from: /storage/flowTokenVault
        ) ?? panic("Could not borrow FLOW vault")

        // Withdraw FLOW
        let deposit <- flowVaultRef.withdraw(amount: amount)

        // Borrow user's StashVault and deposit
        let stashRef = signer.storage.borrow<&StashVault.Vault>(
            from: StashVault.VaultStoragePath
        ) ?? panic("StashVault not found — run setup_account first")

        stashRef.deposit(from: <-deposit)
    }
}
