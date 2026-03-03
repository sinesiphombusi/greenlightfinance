// Flow EVM Testnet configuration
// Update these values with your deployed contract details

export const FLOW_EVM_TESTNET = {
  chainId: 545,
  chainName: "Flow EVM Testnet",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  blockExplorerUrl: "https://evm-testnet.flowscan.io",
  nativeCurrency: {
    name: "FLOW",
    symbol: "FLOW",
    decimals: 18,
  },
};

// Replace with your deployed StashVault contract address
export const VAULT_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// Minimal ABI for the vault contract
// Update this with your actual contract ABI after deployment
export const VAULT_ABI = [
  "function deposit() payable",
  "function withdraw(uint256 amount)",
  "function getBalance(address user) view returns (uint256)",
];
