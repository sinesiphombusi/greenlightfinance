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
  isPreparingAccount: boolean;
  isWalletReady: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  isConnected: false,
  isPreparingAccount: false,
  isWalletReady: false,
  connect: async () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPreparingAccount, setIsPreparingAccount] = useState(false);

  const hasSetup = useRef(false);

  useEffect(() => {
    const unsubscribe = fcl.currentUser.subscribe(async (user: FlowUser) => {
      if (user?.loggedIn && user?.addr) {
        setAddress(user.addr);

        if (!hasSetup.current) {
          hasSetup.current = true;
          setIsPreparingAccount(true);

          try {
            await setupAccount();
            console.log("StashVault setup complete for", user.addr);
          } catch (err) {
            hasSetup.current = false;
            console.warn("StashVault setup failed:", err);
          } finally {
            setIsPreparingAccount(false);
          }
        }
      } else {
        setAddress(null);
        hasSetup.current = false;
        setIsPreparingAccount(false);
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
    setIsPreparingAccount(false);
    hasSetup.current = false;
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        isConnected: !!address,
        isPreparingAccount,
        isWalletReady: !!address && !isPreparingAccount,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
