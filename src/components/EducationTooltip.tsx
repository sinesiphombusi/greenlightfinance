import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X } from "lucide-react";

interface EducationTooltipProps {
  whatItDoes: string;
  whyItMatters: string;
  whatCouldGoWrong: string;
  whatYouControl: string;
}

const EducationTooltip = ({
  whatItDoes,
  whyItMatters,
  whatCouldGoWrong,
  whatYouControl,
}: EducationTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Learn more"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-50 top-8 left-0 w-72 rounded-lg bg-card border border-border shadow-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Learn</span>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div>
                <p className="font-medium text-foreground">What this does</p>
                <p className="text-muted-foreground">{whatItDoes}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Why it matters</p>
                <p className="text-muted-foreground">{whyItMatters}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">What could go wrong</p>
                <p className="text-muted-foreground">{whatCouldGoWrong}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">What you control</p>
                <p className="text-muted-foreground">{whatYouControl}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationTooltip;
