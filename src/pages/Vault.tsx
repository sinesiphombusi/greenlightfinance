import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Info, ShieldCheck, AlertTriangle } from "lucide-react";
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
          <p className="text-muted-foreground text-sm">Your money, growing steadily over time.</p>
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
              whatCouldGoWrong="Returns can vary over time, but your deposits are always yours."
              whatYouControl="You can deposit or withdraw at any time — no lock-ups."
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
                      ? "Moves your funds into the savings vault where they begin growing."
                      : "Moves funds from the vault back to your available balance."
                  }
                  whyItMatters={
                    mode === "deposit"
                      ? "Your deposit starts earning right away — no waiting period."
                      : "You always have access to your money. No penalties or lock-ups."
                  }
                  whatCouldGoWrong="Nothing unexpected. The transaction is instant and fee-free."
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
              <span>No fees. Transaction is instant.</span>
            </div>
          </motion.div>
        )}

        {/* Education: How your vault works */}
        <div className="glass-card rounded-xl p-5 space-y-2">
          <h3 className="font-display font-semibold text-sm text-foreground">How your vault works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You deposit money into the vault. Your funds are then put to work to generate steady returns.
            Your balance grows gradually over time, and you can withdraw whenever you choose — no waiting, no penalties.
          </p>
        </div>

        {/* Education: What you stay in control of */}
        <div className="glass-card rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-sm text-foreground">What you stay in control of</h3>
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Withdraw your money at any time
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              No lock-ups or penalties
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              You always own your funds
            </li>
          </ul>
        </div>

        {/* Education: Risks to know */}
        <div className="glass-card rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="font-display font-semibold text-sm text-foreground">Risks to know</h3>
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-warning mt-0.5">•</span>
              Returns can change over time
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning mt-0.5">•</span>
              Smart contracts carry technical risk
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning mt-0.5">•</span>
              This is not insured like a bank account
            </li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default Vault;
