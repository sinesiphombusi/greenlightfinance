// StashVault.cdc — MVP savings vault (simulated deposits, real on-chain state)
// In production, this would integrate with FungibleToken (FLOW/stablecoins).

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
        access(self) var balance: UFix64

        init() {
            self.balance = 0.0
        }

        // Read balance
        access(all) fun getBalance(): UFix64 {
            return self.balance
        }

        // Simulate deposit (MVP: no real token transfer)
        access(all) fun deposit(amount: UFix64) {
            self.balance = self.balance + amount
            emit Deposited(amount: amount, to: self.owner?.address)
        }

        // Simulate withdraw (MVP: no real token transfer)
        access(Owner) fun withdraw(amount: UFix64) {
            pre {
                self.balance >= amount: "Insufficient vault balance"
            }
            self.balance = self.balance - amount
            emit Withdrawn(amount: amount, from: self.owner?.address)
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
