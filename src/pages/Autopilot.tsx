import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/AppLayout";
import EducationTooltip from "@/components/EducationTooltip";
import { toast } from "sonner";

const Autopilot = () => {
  const [enabled, setEnabled] = useState(false);
  const [weeklyAmount, setWeeklyAmount] = useState("50");

  const runNow = () => {
    const val = parseFloat(weeklyAmount);
    if (!val || val <= 0) return;
    toast.success(`Autopilot ran! $${val.toFixed(2)} deposited into your vault.`);
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
                    whatCouldGoWrong="If your funding source is empty, the deposit won't go through. You'll be notified."
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
                  Weekly amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">$</span>
                  <Input
                    type="number"
                    value={weeklyAmount}
                    onChange={(e) => setWeeklyAmount(e.target.value)}
                    className="pl-7 h-11"
                    min={1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Next run: Monday, March 2, 2026</span>
              </div>

              <Button onClick={runNow} variant="outline" className="w-full gap-2">
                <Play className="w-4 h-4" />
                Run autopilot now (demo)
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Explanation */}
        <div className="glass-card rounded-xl p-5 space-y-2">
          <h3 className="font-display font-semibold text-sm text-foreground">How autopilot works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When enabled, autopilot automatically moves your chosen amount into the savings vault
            every Monday morning. All transactions are gas-free and happen in the background.
            You'll see each run logged in your Activity page.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Autopilot;
