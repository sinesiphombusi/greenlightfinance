import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import fcl from "@/lib/flow/config";
import { setupAccount } from "@/lib/vault";

interface FlowUser {
  addr: string | null;
  loggedIn: boolean;
}

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const hasSetup = useRef(false);

  // Subscribe to FCL current user on mount
  useEffect(() => {
    const unsubscribe = fcl.currentUser.subscribe(async (user: FlowUser) => {
      if (user?.loggedIn && user?.addr) {
        setAddress(user.addr);
        // Auto-initialize StashVault for first-time users
        if (!hasSetup.current) {
          hasSetup.current = true;
          try {
            await setupAccount();
            console.log("StashVault setup complete for", user.addr);
          } catch (err) {
            // Setup may fail if contract not deployed yet — that's OK in demo mode
            console.warn("StashVault setup skipped (contract may not be deployed):", err);
          }
        }
      } else {
        setAddress(null);
        hasSetup.current = false;
      }
      setIsConnecting(false);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      await fcl.authenticate();
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setIsConnecting(false);
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    try {
      fcl.unauthenticate();
    } catch (err) {
      console.warn("FCL unauthenticate error:", err);
    }
    setAddress(null);
    hasSetup.current = false;
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        isConnected: !!address,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
