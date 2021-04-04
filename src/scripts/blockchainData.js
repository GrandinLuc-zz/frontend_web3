const { Component } = require('react');
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const eth = web3.eth

class Data extends Component {
    
    constructor() {
        super();
        this.state = {
            chainId: "",
            latestBlock: "",
            address: ""
        }
    }
    
    async componentWillMount() {
        const response1 = await eth.getBlockNumber();
        const response2 = await eth.getAccounts();

        this.setState({
            chainId: web3.utils.hexToNumber(window.ethereum.chainId),
            latestBlock: response1,
            address: response2
        })
    }

    render() {
        return (
            <div>
                <div class="dataBox">Chain Id : {this.state.chainId}</div>
                <div class="dataBox">Latest Block Number : {this.state.latestBlock}</div>
                <div class="dataBox">User Address : {this.state.address}</div>
            </div>
        );
    }

}


export default Data;