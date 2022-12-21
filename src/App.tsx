import Profile from './components/Profile'
import { configureChains, WagmiConfig, createClient } from 'wagmi'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
const chains = [arbitrum, mainnet, polygon];
// Wagmi client
const projectId = String(process.env.REACT_APP_WC_PROJECT_ID)
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);

const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(client, chains);

export default function App() {
  return (
    <>
      <WagmiConfig client={client}>
        <Profile />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
