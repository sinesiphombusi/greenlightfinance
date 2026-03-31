// Read a user's StashVault balance
import StashVault from 0x5bb6780edb394fdb

access(all) fun main(address: Address): UFix64 {
    let account = getAccount(address)

    let vaultRef = account
        .capabilities.borrow<&{StashVault.VaultPublic}>(StashVault.VaultPublicPath)
        ?? panic("StashVault not found for this address")

    return vaultRef.getBalance()
}
