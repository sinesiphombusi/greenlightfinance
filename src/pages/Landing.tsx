import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StashVaultLogo from "@/components/StashVaultLogo";
import JourneySteps from "@/components/JourneySteps";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  {
    icon: Shield,
    title: "No wallet needed",
    description: "Sign in with email. We handle the technical details so you don't have to.",
  },
  {
    icon: Zap,
    title: "Zero fees for you",
    description: "All transaction costs are covered. What you deposit is what you keep.",
  },
  {
    icon: Eye,
    title: "Full transparency",
    description: "Every action is explained. You always know what's happening with your money.",
  },
];

const trustPoints = [
  "No credit card needed",
  "Learn at your pace",
  "Your data stays private",
];

const Landing = () => {
  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <StashVaultLogo size="md" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-base text-foreground leading-tight">StashVault</span>
            <span className="text-[10px] text-muted-foreground leading-tight">by Greenlight Finance</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle variant="outline" />
          <Link to="/onboarding">
            <Button variant="outline" size="sm" className="rounded-full text-xs">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero — mobile-first, centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center max-w-lg mx-auto w-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 w-full"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            Built for steady, long-term growth
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight text-balance">
            Your savings,
            <br />
            <span className="text-primary">growing steadily.</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Join real people taking control of their money. Simple, transparent, and built for patience.
          </p>

          <Link to="/onboarding" className="block">
            <Button size="lg" className="w-full gap-2 text-base rounded-xl shadow-md h-13">
              Get started — it's free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <button className="text-sm text-primary font-medium hover:underline">
            Learn how it works
          </button>

          {/* Trust points */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-2">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                {point}
              </span>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Features */}
      <section className="px-5 pb-12">
        <div className="max-w-lg mx-auto space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-foreground text-sm">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="px-5 pb-16">
        <div className="max-w-lg mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center space-y-2"
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Your savings journey</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              From sign-up to steady growth — we guide you every step of the way.
            </p>
          </motion.div>
          <JourneySteps />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-5 border-t border-border/60">
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© 2026 Greenlight Finance</span>
          <span>Built for patience, not speculation.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
