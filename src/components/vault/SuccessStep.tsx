import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStepProps {
  mode: "deposit" | "withdraw";
  amount: number;
  newBalance: number;
  onBackToVault: () => void;
}

const SuccessStep = ({ mode, amount, newBalance, onBackToVault }: SuccessStepProps) => {
  const isDeposit = mode === "deposit";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 text-center py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="flex justify-center"
      >
        <CheckCircle2 className="w-16 h-16 text-success" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="font-display text-xl font-bold text-foreground">
          {isDeposit ? "Deposit successful" : "Withdrawal successful"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isDeposit
            ? "Your money is now stashed and growing."
            : "You can deposit again anytime."}
        </p>
      </div>

      <div className="vault-gradient rounded-2xl p-6 glow-ring space-y-3 text-left">
        <div className="text-sm text-vault-foreground/70">
          {isDeposit ? "Amount deposited" : "Amount withdrawn"}
        </div>
        <div className="font-display text-2xl font-bold text-foreground">
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
        <div className="border-t border-border/40 pt-3 mt-3">
          <div className="text-sm text-vault-foreground/70">Updated balance</div>
          <div className="font-display text-2xl font-bold text-foreground">
            ${newBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={onBackToVault}>
        Back to Vault
      </Button>
    </motion.div>
  );
};

export default SuccessStep;
