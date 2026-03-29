import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Calendar, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/AppLayout";
import EducationTooltip from "@/components/EducationTooltip";
import { useWallet } from "@/hooks/use-wallet";
import { deposit } from "@/lib/vault";
import { toast } from "sonner";

const Autopilot = () => {
  const { isConnected, connect } = useWallet();
  const [enabled, setEnabled] = useState(false);
  const [weeklyAmount, setWeeklyAmount] = useState("50");
  const [isRunning, setIsRunning] = useState(false);

  const runNow = async () => {
    const val = parseFloat(weeklyAmount);
    if (!val || val <= 0) return;

    if (!isConnected) {
      try {
        await connect();
      } catch {
        toast.error("Please connect your wallet first.");
        return;
      }
    }

    setIsRunning(true);
    try {
      const txId = await deposit(val);
      toast.success(`Autopilot deposited ${val} FLOW on-chain!`, {
        description: `TX: ${txId.slice(0, 12)}…`,
      });
    } catch (err: any) {
      console.error("Autopilot deposit failed:", err);
      toast.error(err?.message || "Deposit failed. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-foreground">Autopilot</h1>
          <p className="text-muted-foreground text-sm">Automate your savings. Set it and forget it.</p>
        </div>

        {/* Main toggle card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  enabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <Zap className={`w-5 h-5 ${enabled ? "text-primary-foreground" : "text-muted-foreground"}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-foreground">Weekly deposit</span>
                  <EducationTooltip
                    whatItDoes="Automatically deposits a set amount into your vault every week."
                    whyItMatters="Consistent saving builds wealth over time — you don't have to remember."
                    whatCouldGoWrong="If your wallet doesn't have enough FLOW, the deposit won't go through."
                    whatYouControl="The amount, the schedule, and you can turn it off anytime."
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {enabled ? "Active — runs every Monday" : "Currently off"}
                </p>
              </div>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 pt-2 border-t border-border"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                  Weekly amount (FLOW)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={weeklyAmount}
                    onChange={(e) => setWeeklyAmount(e.target.value)}
                    className="h-11"
                    min={0.01}
                    step={0.1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Next run: Monday, March 30, 2026</span>
              </div>

              <Button onClick={runNow} variant="outline" className="w-full gap-2" disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending transaction…
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run autopilot now
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Explanation */}
        <div className="glass-card rounded-xl p-5 space-y-2">
          <h3 className="font-display font-semibold text-sm text-foreground">How autopilot works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When enabled, autopilot sends your chosen amount of FLOW into the savings vault
            as an on-chain transaction every Monday morning. Each run is logged in your Activity page
            and can be verified on FlowScan.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Autopilot;
