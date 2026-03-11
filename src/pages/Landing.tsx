import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Eye, ArrowRight } from "lucide-react";
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

const Landing = () => {
  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <StashVaultLogo size="md" />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg text-foreground leading-tight">StashVault</span>
            <span className="text-[10px] text-muted-foreground leading-tight">by Greenlight Finance</span>
          </div>
        </div>
        <Link to="/onboarding">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            Built for steady, long-term growth
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance">
            Save smarter.
            <br />
            <span className="text-primary">Grow steadily.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            A simple savings vault that grows your money over time.
            No complicated setup, no fees, no jargon. Just patience rewarded.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/onboarding">
              <Button size="lg" className="gap-2 text-base px-8 shadow-md">
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <section className="px-6 pb-20 pt-10">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 pt-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center space-y-2"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Your savings journey</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              From sign-up to steady growth — we guide you every step of the way.
            </p>
          </motion.div>
          <JourneySteps />
        </div>
      </section>

      <footer className="px-6 py-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 Greenlight Finance</span>
          <span>Built for patience, not speculation.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
