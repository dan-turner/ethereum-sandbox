## Ethereum Sandbox

This is a skeleton app that can be used as the basis of an Ethereum based application.

### Prerequisites
* MacOS / Linux environment
* Docker
* NodeJS 8+
* Yarn

### Running
1. `yarn install` to install node_modules
1. `yarn parity:up` to start a Parity client and bind its RPC to http://localhost:8545
1. `yarn pantheon:up` to start a Pantheon client and bind its RPC to http://localhost:8545
1. `yarn contracts:deploy` to deploy the SimpleStorage contract and send a test transactions in a loop
1. `yarn start` to send transactions in a loop
