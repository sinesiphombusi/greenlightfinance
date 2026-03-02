import { ShieldCheck, AlertTriangle } from "lucide-react";

interface VaultEducationBlocksProps {
  /** Which blocks to show */
  blocks?: ("how" | "control" | "risks")[];
}

const VaultEducationBlocks = ({ blocks = ["how", "control", "risks"] }: VaultEducationBlocksProps) => {
  return (
    <div className="space-y-4">
      {blocks.includes("how") && (
        <div className="glass-card rounded-xl p-5 space-y-2">
          <h3 className="font-display font-semibold text-sm text-foreground">How your vault works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You deposit money into the vault. Your funds are then put to work to generate steady returns.
            Your balance grows gradually over time, and you can withdraw whenever you choose — no waiting, no penalties.
          </p>
        </div>
      )}

      {blocks.includes("control") && (
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
      )}

      {blocks.includes("risks") && (
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
      )}
    </div>
  );
};

export default VaultEducationBlocks;
