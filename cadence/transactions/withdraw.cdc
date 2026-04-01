// Withdraw FLOW from the user's StashVault back to their wallet
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import StashVault from 0x5bb6780edb394fdb
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
