import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Info, Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/AppLayout";
import EducationTooltip from "@/components/EducationTooltip";
import VaultEducationBlocks from "@/components/vault/VaultEducationBlocks";
import ConfirmStep from "@/components/vault/ConfirmStep";
import SuccessStep from "@/components/vault/SuccessStep";
import { mockVaultData } from "@/lib/mock-data";
import { useWallet } from "@/hooks/use-wallet";
import { getVaultBalance, deposit as contractDeposit, withdraw as contractWithdraw } from "@/lib/vault";
import { toast } from "sonner";
import JourneySteps from "@/components/JourneySteps";

type FlowStep = "idle" | "input" | "confirm" | "success";

const Vault = () => {
  const { address, isConnecting, isAvailable, connect } = useWallet();
  const [balance, setBalance] = useState(mockVaultData.balance);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"deposit" | "withdraw" | null>(null);
  const [step, setStep] = useState<FlowStep>("idle");
  const [lastAmount, setLastAmount] = useState(0);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!address) return;
    getVaultBalance(address)
      .then((bal) => setBalance(bal))
      .catch((err) => {
        console.warn("Failed to fetch on-chain balance, using mock:", err);
      });
  }, [address]);

  const parsedAmount = parseFloat(amount);
  const isValidAmount = parsedAmount > 0;

  const handleProceedToConfirm = () => {
    if (!isValidAmount) return;
    if (mode === "withdraw" && parsedAmount > balance) {
      toast.error("Not enough in your vault");
      return;
    }
    setLastAmount(parsedAmount);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    setTxHash(null);
    try {
      if (address) {
        let hash: string;
        if (mode === "deposit") {
          hash = await contractDeposit(lastAmount);
        } else {
          hash = await contractWithdraw(lastAmount);
        }
        setTxHash(hash);
        const newBal = await getVaultBalance(address);
        setBalance(newBal);
      } else {
        if (mode === "deposit") {
          setBalance((b) => b + lastAmount);
        } else {
          setBalance((b) => b - lastAmount);
        }
      }
      setStep("success");
    } catch (err: any) {
      console.error("Transaction failed:", err);
      toast.error(err?.message || "Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFlow = () => {
    setMode(null);
    setStep("idle");
    setAmount("");
    setLastAmount(0);
    setTxHash(null);
  };

  const startMode = (m: "deposit" | "withdraw") => {
    setMode(m);
    setStep("input");
    setAmount("");
  };

  const handleConnect = async () => {
    try {
      await connect();
      toast.success("Wallet connected!");
    } catch (err: any) {
      toast.error(err?.message || "Could not connect wallet");
    }
  };

  if (step === "confirm" && mode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <ConfirmStep
            mode={mode}
            amount={lastAmount}
            onConfirm={handleConfirm}
            onCancel={() => setStep("input")}
            isProcessing={isProcessing}
          />
        </div>
      </AppLayout>
    );
  }

  if (step === "success" && mode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <SuccessStep
            mode={mode}
            amount={lastAmount}
            newBalance={balance}
            onBackToVault={resetFlow}
            txHash={txHash}
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-5">
        {/* Greeting */}
        <div className="space-y-1">
          <h1 className="font-display text-xl font-bold text-foreground">Welcome back 👋</h1>
          <p className="text-muted-foreground text-sm">Your money is growing steadily.</p>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 glow-ring space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Balance</span>
            <EducationTooltip
              whatItDoes="Shows the total value of your deposits plus any earnings."
              whyItMatters="This is how much you'd receive if you withdrew everything right now."
              whatCouldGoWrong="Returns can vary over time, but your deposits are always yours."
              whatYouControl="You can deposit or withdraw at any time — no lock-ups."
            />
          </div>
          <div>
            <span className="font-display text-4xl font-bold text-foreground">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              +{mockVaultData.apy}%
            </span>
            <span className="text-sm text-muted-foreground">
              +${mockVaultData.earned.toFixed(2)} earned
            </span>
          </div>
        </motion.div>

        {/* Action buttons — circular, like reference */}
        {step === "idle" && (
          <div className="flex justify-center gap-6 py-2">
            <button
              onClick={() => startMode("deposit")}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md">
                <ArrowDownToLine className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground">Deposit</span>
            </button>
            <button
              onClick={() => startMode("withdraw")}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md">
                <ArrowUpFromLine className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground">Withdraw</span>
            </button>
          </div>
        )}

        {/* Wallet connection */}
        {!address && (
          <div className="glass-card p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Wallet className="w-5 h-5 text-muted-foreground shrink-0" />
              <p className="text-sm text-muted-foreground">
                {isAvailable
                  ? "Connect your wallet for on-chain access."
                  : "Demo mode active."}
              </p>
            </div>
            {isAvailable && (
              <Button size="sm" variant="outline" onClick={handleConnect} disabled={isConnecting} className="rounded-full">
                {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
              </Button>
            )}
          </div>
        )}

        {address && (
          <div className="glass-card px-4 py-2.5 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-success shrink-0" />
            <span className="truncate">Connected: {address}</span>
          </div>
        )}

        {/* Input step */}
        {step === "input" && mode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-card p-5 space-y-4"
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
                onClick={resetFlow}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-3 text-muted-foreground font-medium">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 h-12 rounded-xl text-base"
                  autoFocus
                  min={0}
                  onKeyDown={(e) => e.key === "Enter" && handleProceedToConfirm()}
                />
              </div>
              <Button onClick={handleProceedToConfirm} disabled={!isValidAmount} className="rounded-xl h-12">
                Continue
              </Button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="w-3 h-3" />
              <span>No fees. Transaction is instant.</span>
            </div>
          </motion.div>
        )}

        {/* Journey indicator */}
        <JourneySteps compact currentStep={3} />

        {/* Education blocks */}
        <VaultEducationBlocks />
      </div>
    </AppLayout>
  );
};

export default Vault;
