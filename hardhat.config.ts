import { config as dotenv } from "dotenv"
dotenv()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY: string = process.env.PRIVATE_KEY!
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY!

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    bsc_testnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      chainId: 97,
      accounts: [ PRIVATE_KEY ]
    },
    optimism_testnet: {
      url: "https://goerli.optimism.io",
      chainId: 420,
      accounts: [ PRIVATE_KEY ]
    },
    bitkub_testnet: {
      url: "https://rpc-testnet.bitkubchain.io",
      chainId: 25925,
      accounts: [ PRIVATE_KEY ]
    },
    tomo_testnet: {
      url: "https://rpc.testnet.tomochain.com",
      chainId: 89,
      accounts: [ PRIVATE_KEY ]
    }
  }
};

export default config;
