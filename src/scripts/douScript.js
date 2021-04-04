const { Component } = require('react');
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const eth = web3.eth
const contract = require('./toutDoucement')

var doucement = undefined;

class Doucement extends Component {

    constructor() {
        super();
        this.state = {
            address: "",
            tokenName: "",
            totalToken: "",
            URI: undefined,
            image: undefined,
            name: undefined,
            description: undefined,
            nbTokenHeld: 0
        }
    }

    async componentWillMount() {

        const account = await eth.getAccounts();

        this.setState({
            address: account[0]
        })

        doucement = new eth.Contract(contract.abi, contract.address, {
            from: this.state.address
        })

        this.setState({
            tokenName: await doucement.methods.name().call(),
            totalToken: await doucement.methods.tokenCounter().call()
        })

        this.setState({
            URI: await doucement.methods.tokenURI(0).call()
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

        var nbTokens = 0

        for (var i = 0; i < this.state.totalToken; i++) {
            var addr = await doucement.methods.ownerOf(i).call();
            if (addr === this.state.address) {
                ++nbTokens;
            }
        }

        this.setState({
            nbTokenHeld: nbTokens
        })

        this.allTokens();
    }

    async allTokens() {
        var tokens = document.getElementById('tokens');

        for (var i = 0; i < this.state.totalToken; i++) {
            var addr = await doucement.methods.ownerOf(i).call();
            if (addr === this.state.address) {
                tokens.innerHTML += "<div><img src="+ this.state.image + " height='70' width='70' alt='Corresponds to the token'></img>" +
                "<br/>Name : " + this.state.tokenName + "<br/>Token ID : " + i + "</div><br/>"
            }
        }
        
    }

    buy() {
        doucement.methods.buyAToken().send({from: this.state.address, 
            gas: 500000, gasPrice: '50000000000', value: 100000000000000101})
            .then(function(receipt){
                console.log(receipt)
            })
    }
    
    render() {
        return (
            <div>
                <div>Name : {this.state.tokenName}</div>
                <div>Total Tokens : {this.state.totalToken}</div>
                <div>Image : <img src={this.state.image} height="70" width="70" alt="Corresponds to the token"></img></div>
                <div>Name : {this.state.name} </div>
                <div>Description : {this.state.description} </div>
                <div>Tokens held by user : {this.state.nbTokenHeld} </div>
                <button onClick={() => this.buy()}>Buy a Token !</button>
                <br/>
                <h3>Tokens held by the current user :</h3>
                <div id="tokens"></div>
            </div>
        );
    }

}

export default Doucement;