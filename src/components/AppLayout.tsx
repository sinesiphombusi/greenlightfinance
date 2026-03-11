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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/vault" className="flex items-center gap-2">
            <StashVaultLogo size="sm" />
            <div className="flex flex-col">
              <span className="font-display font-semibold text-foreground leading-tight">StashVault</span>
              <span className="text-[9px] text-muted-foreground leading-tight">by Greenlight Finance</span>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </NavLink>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <nav className="border-t border-border bg-card/80 backdrop-blur-sm sticky bottom-0 z-40">
        <div className="max-w-3xl mx-auto px-4 flex justify-around">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex flex-col items-center gap-1 py-3 px-4 text-xs transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 h-0.5 w-8 bg-primary rounded-full"
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
