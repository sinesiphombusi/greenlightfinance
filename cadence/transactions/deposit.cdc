// Deposit FLOW into the user's StashVault
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import StashVault from 0x5bb6780edb394fdb

transaction(amount: UFix64) {
    prepare(signer: auth(BorrowValue) &Account) {
        let stashRef = signer.storage.borrow<&StashVault.Vault>(
            from: StashVault.VaultStoragePath
        ) ?? panic("StashVault not found — run setup_account first")

        stashRef.deposit(amount: amount)
    }
}
