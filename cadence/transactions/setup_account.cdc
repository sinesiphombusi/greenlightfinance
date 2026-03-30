// Run ONCE per user after wallet connect to initialize their StashVault
import StashVault from 0xSTASH_VAULT_ADDRESS

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
