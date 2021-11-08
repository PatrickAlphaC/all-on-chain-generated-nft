<br/>
<p align="center">
<a href="https://chain.link" target="_blank">
<img src="./img/randomsvg.svg" width="225" alt="Random NFT logo">
</a>
</p>
<br/>

# All On Chain Generated NFT

This is a repo that shows 2 things:

1. How to create NFTs with metadata that is 100% on-chain
2. How we can generate random art on-chain using the SVG method

Inspired by the [NFT Brownie Mix](https://github.com/PatrickAlphaC/nft-mix)

- [All On Chain Generated NFT](#all-on-chain-generated-nft)
    - [About SVGs](#about-svgs)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Quickstart / Deploy](#quickstart--deploy)
    - [SVGNFT Deployment](#svgnft-deployment)
    - [Random SVG Deployment](#random-svg-deployment)
- [Create NFT & View on OpenSea](#create-nft--view-on-opensea)
  - [Important notes for SVGs](#important-notes-for-svgs)
  - [Other Notes](#other-notes)
  - [Test](#test)
  - [Verify on Etherscan](#verify-on-etherscan)
    - [Linting](#linting)

### About SVGs

[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Introduction) means "Scalable Vector Graphics", and is an XML language and can be used to create an image either by specifying all the lines and shapes necessary, by modifying already existing raster images, or by a combination of both.

We can then [base64 encode](https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for) this SVG string into a URL that we can set as the `imageURI` in our NFT `tokenURI`. [Like this triangle](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI4NSAzNTAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nYmxhY2snIGQ9J00xNTAsMCxMNzUsMjAwLEwyMjUsMjAwLFonPjwvcGF0aD48L3N2Zz4=)


[You can learn everything about SVG parameters and try some examples here.](https://www.w3schools.com/graphics/svg_intro.asp)

We are going to use the following path data commands because they each only take 2 parameters

```
M = moveto
L = lineto 
```

However, there are a lot more. You can see sample SVGs in the `img` folder. These get base64 encoded to URLs. You can [see an example of a randomly generated base64 URL here.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nNTAwJyB3aWR0aD0nNTAwJz48cGF0aCBkPSdNIDIwMSA0NzBMIDEwNSA0OThNIDM5OCA0NjBMIDMxNSAzMDFMIDExMiAzMjInIGZpbGw9J3RyYW5zcGFyZW50JyBzdHJva2U9J2JsdWUnLz48cGF0aCBkPSdMIDQzNyA0NjMnIGZpbGw9J3RyYW5zcGFyZW50JyBzdHJva2U9J2dyZWVuJy8+PHBhdGggZD0nTCAyOTQgMzE3JyBmaWxsPSd0cmFuc3BhcmVudCcgc3Ryb2tlPSdibGFjaycvPjxwYXRoIGQ9J00gMzAgMTExTCA0ODMgOTNMIDI2NCAyOTdNIDUzIDQxN0wgMzYzIDY2JyBmaWxsPSd0cmFuc3BhcmVudCcgc3Ryb2tlPSdibHVlJy8+PHBhdGggZD0nTCAzOTkgNDI4TCA0NDEgMjAyJyBmaWxsPSd0cmFuc3BhcmVudCcgc3Ryb2tlPSdncmVlbicvPjxwYXRoIGQ9J00gMjEgMzkwTCAzOTMgNDQyJyBmaWxsPSd0cmFuc3BhcmVudCcgc3Ryb2tlPSdncmVlbicvPjxwYXRoIGQ9J00gMTM5IDE3NUwgMjQ5IDIxMU0gMTI3IDQ2MU0gMjIgMTUzJyBmaWxsPSd0cmFuc3BhcmVudCcgc3Ryb2tlPSdibHVlJy8+PHBhdGggZD0nTSAxOTcgMTk4JyBmaWxsPSd0cmFuc3BhcmVudCcgc3Ryb2tlPSd5ZWxsb3cnLz48L3N2Zz4=)

 ## Requirements

- [NPM](https://www.npmjs.com/) or [YARN](https://yarnpkg.com/)

## Installation

Set your `RINKEBY_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one for free at [Infura's site.](https://infura.io/) You'll also need to set the variable `PRIVATE_KEY` which is your private key from you wallet, ie MetaMask. This is needed for deploying contracts to public networks.

You can set these in your `.env` file if you're unfamiliar with how setting environment variables work. Check out our [.env example](https://github.com/smartcontractkit/hardhat-starter-kit/blob/main/.env.example). If you wish to use this method to set these variables, update the values in the .env.example file, and then rename it to '.env'

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

`.env` example:
```
RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
PRIVATE_KEY='abcdef'
MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```
`bash` example
```
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
export PRIVATE_KEY='cat dog frog...'
export MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
```

If you plan on deploying to a local [Hardhat network](https://hardhat.org/hardhat-network/) that's a fork of the Ethereum mainnet instead of a public test network like Kovan, you'll also need to set your `MAINNET_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) and uncomment the `forking` section in `hardhat.config.js`. You can get one for free at [Alchemy's site.](https://alchemyapi.io/).

You can also use a `MNEMONIC` instead of a `PRIVATE_KEY` environment variable by uncommenting the section in the `hardhat.config.js`, and commenting out the `PRIVATE_KEY` line.

Then you can install all the dependencies

```bash
git clone https://github.com/patrickalphac/all-on-chain-generated-nft
cd all-on-chain-generated-nft
```
then

```bash
npm install
```

Or

```bash
yarn
```


## Quickstart / Deploy

Deployment scripts are in the [deploy](https://github.com/smartcontractkit/hardhat-starter-kit/tree/main/deploy) directory. If required, edit the desired environment specific variables or constructor parameters in each script, then run the hardhat deployment plugin as follows. If no network is specified, it will default to the Kovan network.

### SVGNFT Deployment

This will deploy to a local hardhat network.

```bash
npx hardhat deploy --tags svg
```

To deploy to testnet:

*You'll need testnet ETH in your wallet*

```bash
npx hardhat deploy --network rinkeby --tags svg
```

### Random SVG Deployment

This will deploy to a local hardhat network.

```bash
npx hardhat deploy --tags rsvg
```

To deploy to testnet:

*You'll need testnet LINK and ETH in your wallet*

```bash
npx hardhat deploy --network rinkeby --tags rsvg
```

This will also call the `create` function after deploying and request a random number from a Chainlink node. And it will call `finishMint` to finalize the minting. 

# Create NFT & View on OpenSea

Once deployed, each will look something like this: 

[SVGNFT Opensea](https://testnets.opensea.io/assets/0x2695C58d06501A0f62d3c80e3009DFc655632f7c/0)
[Random SVG Opensea](https://testnets.opensea.io/assets/0x418859e0d1a9a31461359e759347141e7e854cf4/2)
[Another Random SVG Opensea](https://testnets.opensea.io/assets/0x418859e0d1a9a31461359e759347141e7e854cf4/3)


## Important notes for SVGs

1. Make sure all the double quotes are single quotes

Using SVGs will allow you to make all the drawings directly on-chain, and store them on chain too! For example, you could store an SVG as a string, and then edit it to change your drawings. 

## Other Notes

1. I wasn't able to make `data:image/png` types work as an imageURI, but hypothetically it should. 

## Test
Tests are located in the [test](https://github.com/smartcontractkit/hardhat-starter-kit/tree/main/test) directory, and are split between unit tests and integration tests. Unit tests should only be run on local environments, and integration tests should only run on live environments.

To run unit tests:

```bash
npx harhat test
```


## Verify on Etherscan

You'll need an `ETHERSCAN_API_KEY` environment variable. You can get one from the [Etherscan API site.](https://etherscan.io/apis)

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```
example:

```
npx hardhat verify --network kovan 0x9279791897f112a41FfDa267ff7DbBC46b96c296 "0x9326BFA02ADD2366b30bacB125260Af641031331"
```

### Linting

```
yarn lint:fix
```
