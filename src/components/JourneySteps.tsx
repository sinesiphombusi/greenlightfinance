import { motion } from "framer-motion";
import { UserPlus, Banknote, ArrowLeftRight, TrendingUp, CircleDollarSign, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: UserPlus,
    label: "Create account",
    description: "Email sign-in, no seed phrase needed.",
    status: "active" as const,
  },
  {
    icon: Banknote,
    label: "Add funds",
    description: "Convert your money to savings-ready funds.",
    status: "coming" as const,
  },
  {
    icon: ArrowLeftRight,
    label: "Prepare funds",
    description: "Handled automatically behind the scenes.",
    status: "coming" as const,
  },
  {
    icon: TrendingUp,
    label: "Grow steadily",
    description: "Your vault earns returns over time.",
    status: "active" as const,
  },
  {
    icon: CircleDollarSign,
    label: "Cash out",
    description: "Move money back when you're ready.",
    status: "coming" as const,
  },
];

interface JourneyStepsProps {
  compact?: boolean;
  currentStep?: number;
}

const JourneySteps = ({ compact = false, currentStep }: JourneyStepsProps) => {
  if (compact && currentStep !== undefined) {
    const step = steps[currentStep];
    return (
      <div className="glass-card px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep
                  ? "bg-primary"
                  : i < currentStep
                  ? "bg-primary/40"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of 5 — <span className="text-foreground font-medium">{step.label}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
          className="glass-card p-4 flex items-start gap-4"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              step.status === "active"
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <step.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-muted-foreground font-medium">Step {i + 1}</span>
                <h4 className="font-display font-semibold text-foreground text-sm">{step.label}</h4>
              </div>
              {step.status === "active" ? (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-0 shrink-0">
                  <Check className="w-3 h-3 mr-0.5" />
                  Live
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 border-0 shrink-0">
                  Soon
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default JourneySteps;
