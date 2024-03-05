require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: '0.8.13',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        testnet: {
            url: 'https://rpc.tenderly.co/fork/79545eea-6067-4f1e-a548-df2d4dddf01b',
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
