import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { polygonMumbai } from "wagmi/chains";
import HomePage from "./HomePage";
import { Web3Button } from "@web3modal/react";
const chains = [polygonMumbai];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App() {
  const projectId = String(process.env.REACT_APP_WC_PROJECT_ID)
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>
      <Web3Button />
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}