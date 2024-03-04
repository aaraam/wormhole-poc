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
            '0x80aC94316391752A193C1c47E27D382b507c93F3'
        );

        return {
            helloWormhole,
            deployer,
            user1,
            user2,
            user3,
        };
    }

    // it('Should deposit', async function () {
    //     const {
    //         depositor,
    //         swapper1,
    //         swapper2,
    //         swapper3,
    //         lp1Token,
    //         lp2Token,
    //         lpSwap
    //     } = await loadFixture(setup);

    //     let depositAmount = ethers.parseEther("10000");

    //     await lp2Token.connect(depositor).approve(lpSwap.target, depositAmount);

    //     await lpSwap.connect(depositor).deposit(depositAmount);

    //     let nodeInfo = await lpSwap.nodeInfo(depositor);

    //     expect(nodeInfo.deposits).to.equal(depositAmount);
    //     expect(nodeInfo.withdrawals).to.equal(0);

    //     expect(await lpSwap.withdrawable(depositor)).to.equal(depositAmount);

    // });

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

            // function sendCrossChainGreeting(
            //     uint16 targetChain,
            //     address targetAddress,
            //     string memory greeting
            // ) public payable {
            //     uint256 cost = quoteCrossChainGreeting(targetChain);
            //     require(msg.value == cost);
            //     wormholeRelayer.sendPayloadToEvm{value: cost}(
            //         targetChain,
            //         targetAddress,
            //         abi.encode(greeting, msg.sender), // payload
            //         0, // no receiver value needed since we're just passing a message
            //         GAS_LIMIT
            //     );
            // }
            
            const greeting = 'Hello from Ethereum';
            const response = await helloWormhole.connect(user1).sendCrossChainGreeting(targetChain, user2.address, greeting);
            const receipt = await response.wait();

            console.log('receipt', receipt);
            

        } catch (error) {
            console.log(error);
        }
    });
});
