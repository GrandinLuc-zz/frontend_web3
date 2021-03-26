const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const ethereum = window.ethereum

export const chainId = ethereum.chainId
export const latestBlockNumber = ethereum.blockNumber
export const address = ethereum.address