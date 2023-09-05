require("dotenv").config();
require("@reef-defi/hardhat-reef");

module.exports = {
    defaultNetwork: process.env.DEFAULT_NETWORK || "reef_testnet",
    networks: {
        reef: {
          url: "ws://127.0.0.1:9944",
          scanUrl: "http://localhost:8000",
          seeds: {
            account1: process.env.MNEMONIC_LOCALHOST || "",
          }
        },
        reef_testnet: {
          url: "wss://rpc-testnet.reefscan.com/ws",
          scanUrl: "https://api-testnet.reefscan.com",
          seeds: {
            account1: process.env.MNEMONIC_TESTNET || "",
          },
        },
        reef_mainnet: {
          url: "wss://rpc.reefscan.com/ws",
          scanUrl: "https://api.reefscan.com",
          seeds: {
            account1: process.env.MNEMONIC_MAINNET || "",
          },
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                    outputSelection: {
                        "*": {
                            "*": ["metadata", "evm.bytecode", "evm.bytecode.sourceMap"],
                            "": ["ast"],
                        },
                    },
                },
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                    outputSelection: {
                        "*": {
                            "*": ["metadata", "evm.bytecode", "evm.bytecode.sourceMap"],
                            "": ["ast"],
                        },
                    },
                },
            },
            {
                version: "0.7.3",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                    outputSelection: {
                        "*": {
                            "*": ["metadata", "evm.bytecode", "evm.bytecode.sourceMap"],
                            "": ["ast"],
                        },
                    },
                },
            },
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.10",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
        ],
    },
};
