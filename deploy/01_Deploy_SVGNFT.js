let { networkConfig } = require('../helper-hardhat-config')
const fs = require('fs')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()

    log("----------------------------------------------------")
    const SVGNFT = await deploy('SVGNFT', {
        from: deployer,
        log: true
    })
    log(`You have deployed an NFT contract to ${SVGNFT.address}`)
    const svgNFTContract = await ethers.getContractFactory("SVGNFT")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer)
    const networkName = networkConfig[chainId]['name']

    log(`Verify with:\n npx hardhat verify --network ${networkName} ${svgNFT.address}`)
    log("Let's create an NFT now!")
    let filepath = "./img/small_enough.svg"
    let svg = fs.readFileSync(filepath, { encoding: "utf8" })
    log(`We will use ${filepath} as our SVG, and this will turn into a tokenURI. `)
    tx = await svgNFT.create(svg)
    await tx.wait(1)
    log(`You've made your first NFT!`)
    log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`)
}

module.exports.tags = ['all', 'svg']
