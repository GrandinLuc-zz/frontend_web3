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
        this.getAddress = this.getAddress.bind(this)
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

    getAddress() {
        return this.state.address;
    }

    render() {
        return (
            <div>
                <div>Chain Id : {this.state.chainId}</div>
                <div>Latest Block Number : {this.state.latestBlock}</div>
                <div>User Address : {this.state.address}</div>
            </div>
        );
    }

}


export default Data;
