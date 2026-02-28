export interface Activity {
  id: string;
  type: "deposit" | "withdrawal" | "autopilot";
  amount: number;
  timestamp: Date;
  status: "success" | "pending";
  description: string;
}

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "deposit",
    amount: 500,
    timestamp: new Date(2026, 1, 28, 14, 30),
    status: "success",
    description: "Manual deposit",
  },
  {
    id: "2",
    type: "autopilot",
    amount: 50,
    timestamp: new Date(2026, 1, 27, 9, 0),
    status: "success",
    description: "Weekly autopilot deposit",
  },
  {
    id: "3",
    type: "deposit",
    amount: 200,
    timestamp: new Date(2026, 1, 24, 11, 15),
    status: "success",
    description: "Manual deposit",
  },
  {
    id: "4",
    type: "autopilot",
    amount: 50,
    timestamp: new Date(2026, 1, 20, 9, 0),
    status: "success",
    description: "Weekly autopilot deposit",
  },
  {
    id: "5",
    type: "withdrawal",
    amount: 100,
    timestamp: new Date(2026, 1, 18, 16, 45),
    status: "success",
    description: "Withdrawal to wallet",
  },
  {
    id: "6",
    type: "deposit",
    amount: 1000,
    timestamp: new Date(2026, 1, 15, 10, 0),
    status: "success",
    description: "Initial deposit",
  },
];

export const mockVaultData = {
  balance: 1700,
  earned: 12.45,
  apy: 4.2,
  currency: "USDC",
};
