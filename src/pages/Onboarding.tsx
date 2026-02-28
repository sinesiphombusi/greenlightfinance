import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle2, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  { id: "welcome", title: "Welcome aboard" },
  { id: "signin", title: "Create your account" },
  { id: "setup", title: "Setting things up" },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email) return;
    setCurrentStep(2);
    setIsLoading(true);
    // Simulate account creation
    await new Promise((r) => setTimeout(r, 2500));
    setIsLoading(false);
    navigate("/vault");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                i <= currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6">
                  <span className="text-primary-foreground font-display font-bold text-xl">G</span>
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Welcome to Greenlight
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  In the next 30 seconds, we'll create a secure account for you.
                  No wallet downloads. No seed phrases. Just your email.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <Button onClick={() => setCurrentStep(1)} className="w-full gap-2" size="lg">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
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
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                  />
                </div>
                <Button onClick={handleSignIn} className="w-full gap-2" size="lg" disabled={!email}>
                  <Fingerprint className="w-4 h-4" />
                  Create account
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                This creates a secure Flow blockchain account linked to your email.
                You can always access it later.
              </p>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-4">
                {isLoading ? (
                  <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
                ) : (
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                )}
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {isLoading ? "Setting up your vault…" : "You're all set!"}
                </h1>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✓ Flow account created
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ✓ Savings vault initialized
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    ✓ Gas fees sponsored
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
