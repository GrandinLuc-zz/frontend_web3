// import Data from '../scripts/blockchainData';
const { Component } = require('react');
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const eth = web3.eth
const contract = require('./SongForACity')

var SongForACity = undefined;

class Song extends Component {

    constructor() {
        super();
        this.state = {
            address: "",
            tokenName: "",
            totalToken: "",
            URI: undefined,
            image: undefined,
            name: undefined,
            description: undefined
        }
    }

    async componentWillMount() {

        this.setState({
            address: await eth.getAccounts()[0]
        })

        SongForACity = new eth.Contract(contract.abi, contract.address, {
            from: this.state.address
        })

        this.setState({
            tokenName: await SongForACity.methods.name().call(),
            totalToken: await SongForACity.methods.tokenCounter().call()
        })

        this.setState({
            URI: await SongForACity.methods.tokenURI(0).call()
        })

        fetch(`https://cors-anywhere.herokuapp.com/`+this.state.URI, {method: 'GET'})
        .then((response) =>{
            response.json().then(response =>{
                this.setState({
                    image: response.properties.image.description,
                    name: response.properties.name.description,
                    description: response.properties.description.description,
                });
            });
        });
    }

    claim() {
        console.log(this.state.address)
        SongForACity.methods.claimAToken().send({from: this.state.address})
    }
    
    render() {
        return (
            <div>
                <div>Name : {this.state.tokenName}</div>
                <div>Total Tokens : {this.state.totalToken}</div>
                <div>Image : <img src={this.state.image} height="70" width="70" alt="Corresponds to the token"></img></div>
                <div>Name : {this.state.name} </div>
                <div>Description : {this.state.description} </div>
                <button onClick={() => this.claim()}>Claim Token !</button>
            </div>
        );
    }

}

export default Song;