const Web3 = require('web3')
const song = require('./SongForACity')
const toutDou = require('./toutDoucement')
const metamask = window.web3

const NETWORK_URL = 'http://127.0.0.1:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_URL))


export const SongForCity = new web3.eth.Contract(song.abi, song.address, {
    from: metamask.eth.accounts[0]
})

export const ToutDoucement = new web3.eth.Contract(toutDou.abi, toutDou.address, {
    from: metamask.eth.accounts[0]
})
  
