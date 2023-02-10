# Cedalio ⨯ To-Do dApp Single Data Base Example

[Join our Community](https://discord.gg/kSdhmb9UUT)

[![Deploy to Cedalio](https://cedalio.com/images/deploy%20Schema%20button.png)](https://docs.cedalio.com/quickstart/getting-started/download-cli#download-and-install-cli)
</br>

## Getting Started

1. [Install Cedalio CLI](https://docs.cedalio.com/quickstart/getting-started/download-cli#download-and-install-cli)
2. Export the wallet that would be the owner of the schema `export PRIVATE_KEY='your-private-key'`
3. Deploy ToDo Schema `bifrost deploy --schema-file /path/to/your/todo.graphql --network polygon-mumbai --schema-name todo-v1`
4. Serve your schema `bifrost serve --schema-name todo-v1`
5. Run Hardhat node `npx hardhat node --config hardhat.config.js ` [How to Install Hardhat](https://docs.cedalio.com/quickstart/deploy-to-networks/deploy-locally-using-hardhat#deploy-your-graphql-schema-locally-using-hardhat)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 1000
      }
    }
  }
};

5. In the project directory, you can run: `npm install`
6. Create a `.env.development`
REACT_APP_WC_PROJECT_ID=WALLET-CONNECT-ID
GENERATE_SOURCEMAP=false
REACT_APP_CONTRACT_ADDRESS=0xA00A027D2DEA28EF0A41972414C47002A32D8777
6. Then run: `npm start`

## Learn More About Cedalio

To learn more about Cedalio, take a look at the following resources:

- [Cedalio](https://cedalio.com/) - learn about Cedalio Features and Roadmap.

- [Cedalio Docs](https://docs.cedalio.com/) - learn about Cedalio Architecture and CLI.
