import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle2, Fingerprint, Shield, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StashVaultLogo from "@/components/StashVaultLogo";

const steps = [
  { id: "welcome", title: "Welcome aboard" },
  { id: "security", title: "Your security" },
  { id: "signin", title: "Create your account" },
  { id: "setup", title: "Setting things up" },
];

const securityPoints = [
  {
    icon: Shield,
    title: "You're in control",
    description: "No bank can freeze or access your funds",
  },
  {
    icon: Lock,
    title: "Bank-level encryption",
    description: "Your keys are secured on your device only",
  },
  {
    icon: Eye,
    title: "Transparent & simple",
    description: "Clear explanations for every step",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email) return;
    setCurrentStep(3);
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2500));
    setIsLoading(false);
    navigate("/vault");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-5">
      {/* Progress bar */}
      <div className="max-w-sm mx-auto w-full pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {/* Step 0: Welcome */}
            {currentStep === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <StashVaultLogo size="lg" className="mb-4" />

                <div className="space-y-3">
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    Your savings vault,
                    <br />
                    <span className="text-primary">made simple</span>
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Join real people taking control of their money. We'll have you set up in 30 seconds.
                  </p>
                </div>

                <Button onClick={() => setCurrentStep(1)} className="w-full gap-2 rounded-xl h-12" size="lg">
                  Get started — it's free
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button className="w-full text-sm text-primary font-medium hover:underline text-center">
                  Learn how it works
                </button>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-2">
                  {["No credit card needed", "Learn at your pace", "Your data stays private"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Security introduction */}
            {currentStep === 1 && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    Your security, your control
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike traditional banks, you're in complete control. We'll show you exactly how to keep your account safe — it's easier than you think.
                  </p>
                </div>

                <div className="space-y-3">
                  {securityPoints.map((point) => (
                    <div key={point.title} className="glass-card p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                        <point.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{point.title}</p>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-4 flex items-start gap-3 bg-accent/50">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    We'll guide you through security setup. Nothing happens without your permission.
                  </p>
                </div>

                <Button onClick={() => setCurrentStep(2)} className="w-full gap-2 rounded-xl h-12" size="lg">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Create account */}
            {currentStep === 2 && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    Create your account
                  </h1>
                  <p className="text-muted-foreground">
                    We'll use this to set up your savings vault. No spam, ever.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 rounded-xl text-base"
                        onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSignIn} className="w-full gap-2 rounded-xl h-12" size="lg" disabled={!email}>
                    <Fingerprint className="w-4 h-4" />
                    Create account
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Secure login · Your data stays private
                </p>
              </motion.div>
            )}

            {/* Step 3: Setup */}
            {currentStep === 3 && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div className="space-y-4">
                  {isLoading ? (
                    <Loader2 className="w-14 h-14 text-primary mx-auto animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-14 h-14 text-success mx-auto" />
                  )}
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {isLoading ? "Setting up your vault…" : "You're all set!"}
                  </h1>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Account created
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Savings vault initialized
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      All fees covered for you
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
