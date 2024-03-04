const {
    loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('HelloWormhole', function () {
    async function setup() {
        const [deployer, user1, user2, user3] =
            await ethers.getSigners();

        const HelloWormhole = await ethers.getContractFactory('HelloWormhole');
        const helloWormhole = await HelloWormhole.deploy(
            '0x27428DD2d3DD32A4D7f7C497eAaa23130d894911'
        );

        console.log('helloWormhole', helloWormhole.target);

        return {
            helloWormhole,
            deployer,
            user1,
            user2,
            user3,
        };
    }

    it('Should send message', async function () {
        try {
            const {
                helloWormhole,
                deployer,
                user1,
                user2,
                user3,
            } = await loadFixture(setup);

            const targetChain = 4;
            const cost = await helloWormhole.quoteCrossChainGreeting(targetChain);
            console.log('cost', cost.toString());
            
            const greeting = 'Hello from Ethereum';
            const response = await helloWormhole.connect(user1).sendCrossChainGreeting(targetChain, user2.address, greeting);
            const receipt = await response.wait();

            console.log('receipt', receipt);

            expect(receipt.status).to.equal(1);

        } catch (error) {
            console.log(error);
        }
    });
});
