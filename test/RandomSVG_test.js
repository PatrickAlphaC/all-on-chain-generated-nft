const { expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
const skipIf = require('mocha-skip-if')
chai.use(require('chai-bn')(BN))
const fs = require('fs')
const { deployments, getChainId } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config')

skip.if(!developmentChains.includes(network.name)).
    describe('RandomSVG Unit Tests', async function () {
        let rsNFT

        beforeEach(async () => {
            await deployments.fixture(['mocks', 'rsvg'])
            const RandomSVG = await deployments.get("RandomSVG")
            rsNFT = await ethers.getContractAt("RandomSVG", RandomSVG.address)
        })

        it('should return the correct URI', async () => {
            let expectedURI = fs.readFileSync("./test/data/randomSVG.txt", "utf8")
            let uri = await rsNFT.tokenURI(0)
            console.log(expectedURI)
            console.log(uri)
            expect(uri == expectedURI).to.be.true
        })
    })
