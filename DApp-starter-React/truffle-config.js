const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const infura_key = fs.readFileSync(".infura_key").toString().trim();
const etherscan_key = fs.readFileSync(".etherscan_key").toString().trim();

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    sepolia: {
      provider: () => new HDWalletProvider({
      mnemonic: {
      phrase: ".secret"
      },
      providerOrUrl: "https://sepolia.infura.io/v3/${.indura_key}"
      }),
      network_id: 11155111, // Sepolia's network ID
      gas: 4000000, // Adjust the gas limit as per your requirements
      gasPrice: 10000000000, // Set the gas price to an appropriate value
      confirmations: 2, // Set the number of confirmations needed for a transaction
      timeoutBlocks: 200, // Set the timeout for transactions
      skipDryRun: true // Skip the dry run option
     }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       }
     }
   }
 }, 
 plugins : [
  "truffle-plugin-verify"
 ], 
 api_keys: {
  etherscan: etherscan_key
 }
};
