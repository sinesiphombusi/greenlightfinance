// Simulate withdrawal from the user's StashVault (MVP: balance tracking only)
import StashVault from 0xSTASH_VAULT_ADDRESS

transaction(amount: UFix64) {
    prepare(signer: auth(BorrowValue) &Account) {
        let stashRef = signer.storage.borrow<auth(StashVault.Vault.Owner) &StashVault.Vault>(
            from: StashVault.VaultStoragePath
        ) ?? panic("StashVault not found")

        stashRef.withdraw(amount: amount)
    }
}
