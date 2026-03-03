import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { FLOW_EVM_TESTNET, VAULT_CONTRACT_ADDRESS, VAULT_ABI } from "./config";

let provider: BrowserProvider | null = null;

async function ensureFlowNetwork(ethereum: any) {
  const chainIdHex = `0x${FLOW_EVM_TESTNET.chainId.toString(16)}`;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: chainIdHex,
            chainName: FLOW_EVM_TESTNET.chainName,
            rpcUrls: [FLOW_EVM_TESTNET.rpcUrl],
            blockExplorerUrls: [FLOW_EVM_TESTNET.blockExplorerUrl],
            nativeCurrency: FLOW_EVM_TESTNET.nativeCurrency,
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
}

export async function connectWallet(): Promise<string> {
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error("No wallet detected. Please install MetaMask or a compatible wallet.");
  }

  await ensureFlowNetwork(ethereum);
  provider = new BrowserProvider(ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}

export function isWalletAvailable(): boolean {
  return typeof (window as any).ethereum !== "undefined";
}

export async function getVaultBalance(address: string): Promise<number> {
  if (!provider) {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return 0;
    provider = new BrowserProvider(ethereum);
  }
  const contract = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, provider);
  const balance = await contract.getBalance(address);
  return parseFloat(formatEther(balance));
}

export async function deposit(amount: number): Promise<string> {
  if (!provider) throw new Error("Wallet not connected");
  const signer = await provider.getSigner();
  const contract = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, signer);
  const tx = await contract.deposit({ value: parseEther(amount.toString()) });
  const receipt = await tx.wait();
  return receipt.hash;
}

export async function withdraw(amount: number): Promise<string> {
  if (!provider) throw new Error("Wallet not connected");
  const signer = await provider.getSigner();
  const contract = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, signer);
  const tx = await contract.withdraw(parseEther(amount.toString()));
  const receipt = await tx.wait();
  return receipt.hash;
}
