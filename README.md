# Cedalio ⨯ To-Do dApp Single Data Base Example

[Join our Discord Community](https://discord.gg/kSdhmb9UUT)

[![Deploy to Cedalio](https://cedalio.com/images/deploy-schema-button-small.png)](https://docs.cedalio.com/introduction/getting-started/download-the-cli)
</br>

## Getting Started

1. [Install Cedalio CLI](https://docs.cedalio.com/quickstart/getting-started/download-cli#download-and-install-cli)
2. Export the wallet that would be the owner of the schema `export PRIVATE_KEY='your-private-key'`
3. Deploy ToDo Schema `bifrost deploy --schema-file todo.graphql --network polygon-mumbai --schema-name todo-v1`
4. Serve your schema `bifrost serve --schema-name todo-v1`
5. Create a `.env.development` with the smart contract address for this deployment from the sterp 3.
```
REACT_APP_WC_PROJECT_ID=WALLET-CONNECT-ID
GENERATE_SOURCEMAP=false
REACT_APP_CONTRACT_ADDRESS=SMART-CONTRACT-ADDRESS
REACT_APP_GRAPHQL_ENDPOINT=http://127.0.0.1:8080/graphql (if you are running the local `serve` command)
```
6. Then run: `npm start`

## Learn More About Cedalio

To learn more about Cedalio, take a look at the following resources:

- [Cedalio](https://cedalio.com/) - learn about Cedalio Features and Roadmap.

- [Cedalio Docs](https://docs.cedalio.com/) - learn about Cedalio Architecture and CLI.
