import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaultEducationBlocks from "./VaultEducationBlocks";

interface ConfirmStepProps {
  mode: "deposit" | "withdraw";
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmStep = ({ mode, amount, onConfirm, onCancel }: ConfirmStepProps) => {
  const isDeposit = mode === "deposit";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back
      </button>

      <div className="space-y-1">
        <h2 className="font-display text-xl font-bold text-foreground">
          Confirm {isDeposit ? "deposit" : "withdrawal"}
        </h2>
      </div>

      <div className="vault-gradient rounded-2xl p-6 glow-ring space-y-3">
        <div className="text-sm text-vault-foreground/70">
          {isDeposit ? "You are depositing" : "You are withdrawing"}
        </div>
        <div className="font-display text-3xl font-bold text-foreground">
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isDeposit
            ? "This amount will be added to your savings vault and begin growing steadily over time."
            : "This amount will be moved out of your savings vault."}
        </p>
      </div>

      <VaultEducationBlocks
        blocks={isDeposit ? ["how", "control", "risks"] : ["control", "risks"]}
      />

      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={onConfirm}>
          Confirm {isDeposit ? "deposit" : "withdrawal"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfirmStep;
