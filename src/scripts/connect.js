const Web3 = require('web3')

const loadWeb3 = async loginAndCreateBucket => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      loginAndCreateBucket()
    } else {
      window.alert(
        'Metamask not detected! Install Metamask plugin to proceed: https://metamask.io/download.html'
      )
    }
  }
  