

# Integrate Flow User Journey into StashVault

## What we're building

A visual "Your Savings Journey" section that maps the 5-step Flow user journey into the app, using consumer-friendly language (no crypto jargon). This shows users the full path from account creation to steady growth, with StashVault's role clearly highlighted.

## Where it goes

1. **Landing page** — New section between the features grid and the footer, showing the 5-step journey as a horizontal stepper (stacks vertically on mobile)
2. **Vault page** — Subtle progress indicator showing where the user currently is in their journey

## Journey steps (consumer-friendly labels)

| Step | Original | StashVault label | Description | Status |
|------|----------|-----------------|-------------|--------|
| 1 | Wallet Onboard | Create account | Email sign-in, no seed phrase | Built (Onboarding page) |
| 2 | On-Ramp | Add funds | Convert your money to savings-ready funds | Link to supported on-ramp |
| 3 | Swap/Bridge | Prepare funds | Automatically handled behind the scenes | Future / abstracted |
| 4 | Earn Yield | Grow steadily | Your vault earns returns over time | Built (Vault page) |
| 5 | Off-Ramp | Cash out | Move money back when you're ready | Link to supported off-ramp |

## Implementation plan

### 1. Create `JourneySteps` component
- `src/components/JourneySteps.tsx`
- Horizontal stepper with 5 numbered steps, icons, and short descriptions
- Steps StashVault handles (1, 4) get the primary color treatment
- Steps handled externally (2, 3, 5) show as "coming soon" or link to ecosystem partners (swap.flow.com, etc.)
- Responsive: horizontal on desktop, vertical stack on mobile (360px viewport)
- Uses existing design system (glass-card, primary color, Space Grotesk headings)

### 2. Update Landing page
- Add a new section titled "Your savings journey" between features and footer
- Render the `JourneySteps` component
- Brief intro line: "From sign-up to steady growth — we guide you every step of the way."

### 3. Add journey context to Vault page
- Small banner or badge at top showing "Step 4 of 5 — Growing steadily"
- Subtle, non-intrusive — reinforces the user's position in their journey

### 4. No new pages, no blockchain logic changes
- External steps (On-Ramp, Swap, Off-Ramp) render as informational cards with future ecosystem links
- All copy follows the existing tone guidelines (no crypto jargon)

## Technical details

- Component uses framer-motion for staggered entry animations (matching existing patterns)
- Lucide icons: `UserPlus`, `Banknote`, `ArrowLeftRight`, `TrendingUp`, `CircleDollarSign`
- Mobile-first layout with `flex-col` default, `sm:flex-row` for wider viewports
- Connector arrows between steps using CSS pseudo-elements or inline SVG

