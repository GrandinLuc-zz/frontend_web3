const Web3 = require('web3')
const contract = require('./contract')
const metamask = window.web3

const NETWORK_URL = 'http://127.0.0.1:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL))
