import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { connectWallet as connectWalletFn, isWalletAvailable } from "@/lib/vault";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  isAvailable: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  isAvailable: false,
  connect: async () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const isAvailable = isWalletAvailable();

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const addr = await connectWalletFn();
      setAddress(addr);
    } catch (err: any) {
      console.error("Wallet connection failed:", err);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return (
    <WalletContext.Provider value={{ address, isConnecting, isAvailable, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};
