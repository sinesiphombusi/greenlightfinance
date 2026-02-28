import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/AppLayout";
import EducationTooltip from "@/components/EducationTooltip";
import { mockVaultData } from "@/lib/mock-data";
import { toast } from "sonner";

const Vault = () => {
  const [balance, setBalance] = useState(mockVaultData.balance);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"deposit" | "withdraw" | null>(null);

  const handleAction = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    if (mode === "deposit") {
      setBalance((b) => b + val);
      toast.success(`Deposited $${val.toFixed(2)} into your vault`);
    } else {
      if (val > balance) {
        toast.error("Not enough in your vault");
        return;
      }
      setBalance((b) => b - val);
      toast.success(`Withdrew $${val.toFixed(2)} from your vault`);
    }
    setAmount("");
    setMode(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-foreground">Savings Vault</h1>
          <p className="text-muted-foreground text-sm">Your money, earning yield every day.</p>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="vault-gradient rounded-2xl p-6 sm:p-8 glow-ring space-y-4"
        >
          <div className="flex items-center gap-2 text-sm text-vault-foreground/70">
            <span>Total balance</span>
            <EducationTooltip
              whatItDoes="Shows the total value of your deposits plus any earnings."
              whyItMatters="This is how much you'd receive if you withdrew everything right now."
              whatCouldGoWrong="Yield rates can change, but your principal is always yours."
              whatYouControl="You can deposit or withdraw at any time, no lock-ups."
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{mockVaultData.currency}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">{mockVaultData.apy}% APY</span>
            </div>
            <span className="text-vault-foreground/60">
              +${mockVaultData.earned.toFixed(2)} earned
            </span>
          </div>
        </motion.div>

        {/* Action buttons */}
        {!mode && (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setMode("deposit")}
            >
              <ArrowDownToLine className="w-4 h-4" />
              Deposit
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setMode("withdraw")}
            >
              <ArrowUpFromLine className="w-4 h-4" />
              Withdraw
            </Button>
          </div>
        )}

        {/* Action Panel */}
        {mode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-card rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-foreground capitalize">{mode}</h3>
                <EducationTooltip
                  whatItDoes={
                    mode === "deposit"
                      ? "Moves your funds into the savings vault where they start earning yield."
                      : "Moves funds from the vault back to your available balance."
                  }
                  whyItMatters={
                    mode === "deposit"
                      ? "Your deposit starts earning yield immediately — no waiting period."
                      : "You always have access to your money. No penalties or lock-ups."
                  }
                  whatCouldGoWrong="Nothing unexpected. The transaction is instant and gas-free."
                  whatYouControl="The exact amount. You choose how much to move."
                />
              </div>
              <button
                onClick={() => {
                  setMode(null);
                  setAmount("");
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7 h-11"
                  autoFocus
                  min={0}
                  onKeyDown={(e) => e.key === "Enter" && handleAction()}
                />
              </div>
              <Button onClick={handleAction} disabled={!amount || parseFloat(amount) <= 0}>
                Confirm
              </Button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />
              <span>No fees. Transaction is instant and gas-free.</span>
            </div>
          </motion.div>
        )}

        {/* Info card */}
        <div className="glass-card rounded-xl p-5 space-y-2">
          <h3 className="font-display font-semibold text-sm text-foreground">How your vault works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your savings vault deposits stable assets into a low-risk yield strategy on the Flow blockchain.
            Your funds earn interest daily, and you can withdraw anytime with no penalties or hidden fees.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Vault;
