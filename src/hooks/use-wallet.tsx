import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import fcl from "@/lib/flow/config";

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

  // Subscribe to FCL current user on mount
  useEffect(() => {
    const unsubscribe = fcl.currentUser.subscribe((user: FlowUser) => {
      if (user?.loggedIn && user?.addr) {
        setAddress(user.addr);
      } else {
        setAddress(null);
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
    fcl.unauthenticate();
    setAddress(null);
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
