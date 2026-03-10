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
      <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
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
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-3">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
          className="glass-card rounded-xl p-5 sm:p-4 space-y-3 relative"
        >
          {/* Connector line (desktop only) */}
          {i < steps.length - 1 && (
            <div className="hidden sm:block absolute top-8 -right-3 w-3 h-px bg-border" />
          )}

          <div className="flex items-start justify-between gap-2">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                step.status === "active"
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <step.icon className="w-4 h-4" />
            </div>
            {step.status === "active" ? (
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-0">
                <Check className="w-3 h-3 mr-0.5" />
                Live
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 border-0">
                Soon
              </Badge>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
            </div>
            <h4 className="font-display font-semibold text-foreground text-sm">{step.label}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default JourneySteps;
