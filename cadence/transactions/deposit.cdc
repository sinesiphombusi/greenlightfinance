// Simulate deposit into the user's StashVault (MVP: balance tracking only)
import StashVault from 0xSTASH_VAULT_ADDRESS

transaction(amount: UFix64) {
    prepare(signer: auth(BorrowValue) &Account) {
        let stashRef = signer.storage.borrow<&StashVault.Vault>(
            from: StashVault.VaultStoragePath
        ) ?? panic("StashVault not found — run setup_account first")

        stashRef.deposit(amount: amount)
    }
}
