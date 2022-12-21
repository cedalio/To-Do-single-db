import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
import HomePage from "./HomePage";
import { useWeb3ModalTheme } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
const chains = [arbitrum, mainnet, polygon];

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
  const { theme, setTheme } = useWeb3ModalTheme();
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>
      <Web3Button />
      <Web3Modal
        projectId="0b5c910d4315b61602f1679c78ea6922"
        ethereumClient={ethereumClient}
      />
    </>
  );
}