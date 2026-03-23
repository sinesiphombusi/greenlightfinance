import { NavLink, useLocation } from "react-router-dom";
import { Wallet, Zap, Clock, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import StashVaultLogo from "@/components/StashVaultLogo";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { to: "/vault", label: "Vault", icon: Wallet },
  { to: "/autopilot", label: "Autopilot", icon: Zap },
  { to: "/activity", label: "Activity", icon: Clock },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header — clean, minimal */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <NavLink to="/vault" className="flex items-center gap-2.5">
            <StashVaultLogo size="sm" />
            <div className="flex flex-col">
              <span className="font-display font-semibold text-foreground text-sm leading-tight">StashVault</span>
              <span className="text-[9px] text-muted-foreground leading-tight">by Greenlight Finance</span>
            </div>
          </NavLink>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <NavLink
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main content — mobile-first max-width */}
      <main className="flex-1 max-w-lg mx-auto w-full px-5 py-6">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom nav — larger touch targets */}
      <nav className="border-t border-border/60 bg-card/90 backdrop-blur-lg sticky bottom-0 z-40 safe-bottom">
        <div className="max-w-lg mx-auto px-5 flex justify-around">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`relative flex flex-col items-center gap-1 py-3 px-6 text-xs transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className={`font-medium ${isActive ? "text-primary" : ""}`}>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 h-0.5 w-10 bg-primary rounded-full"
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
