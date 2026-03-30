import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.title": "StashVault",
  "app.detail.icon": "https://greenlightfinance.lovable.app/favicon.ico",
  "flow.network": "testnet",
  "walletconnect.projectId": "63b3eb4bf02924f2f68b8108b18d25c7",
});

export default fcl;
