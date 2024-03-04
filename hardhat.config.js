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
            url: 'https://rpc.tenderly.co/fork/1ad4be56-8cc3-4ceb-91d4-5dcf97c56d24',
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
