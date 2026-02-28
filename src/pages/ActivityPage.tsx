import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, Zap, CheckCircle2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { mockActivities, type Activity } from "@/lib/mock-data";
import { format } from "date-fns";

const iconMap = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  autopilot: Zap,
};

const labelMap = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  autopilot: "Autopilot",
};

const ActivityItem = ({ activity, index }: { activity: Activity; index: number }) => {
  const Icon = iconMap[activity.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 py-4 border-b border-border last:border-0"
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          activity.type === "withdrawal" ? "bg-secondary" : "bg-accent"
        }`}
      >
        <Icon
          className={`w-4 h-4 ${
            activity.type === "withdrawal" ? "text-secondary-foreground" : "text-accent-foreground"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground">{labelMap[activity.type]}</p>
        <p className="text-xs text-muted-foreground">{activity.description}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-medium text-sm text-foreground">
          {activity.type === "withdrawal" ? "-" : "+"}${activity.amount.toFixed(2)}
        </p>
        <div className="flex items-center gap-1 justify-end">
          <CheckCircle2 className="w-3 h-3 text-success" />
          <span className="text-xs text-muted-foreground">
            {format(activity.timestamp, "MMM d, h:mm a")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ActivityPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-foreground">Activity</h1>
          <p className="text-muted-foreground text-sm">Everything that's happened in your vault.</p>
        </div>

        <div className="glass-card rounded-xl px-5">
          {mockActivities.map((activity, i) => (
            <ActivityItem key={activity.id} activity={activity} index={i} />
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          All transactions on Flow testnet · Gas fees sponsored
        </p>
      </div>
    </AppLayout>
  );
};

export default ActivityPage;
