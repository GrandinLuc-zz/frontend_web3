const { Component } = require('react');
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const eth = web3.eth
const toutDou = require('./toutDoucement')
const song = require('./SongForACity')

class Transfer extends Component {

    async transfer() {
        var str = document.getElementById('choice').options[0].value;
        var dest = document.getElementById('addr').value;
        var id = document.getElementById('id').value;
        var contract;
        const account = await eth.getAccounts();

        if (str === "Song") {

            contract = new eth.Contract(song.abi, song.address, {
                from: account[0]
            })
        } else {

            contract = new eth.Contract(toutDou.abi, toutDou.address, {
                from: account[0]
            })
        }

        contract.methods.safeTransferFrom(account[0], dest, id).send({from: account[0]})

    }
    
    render() {
        return (
            <div id="content">
                <select id="choice">
                    <option value="Song">Song For A City</option>
                    <option value="Dou">Tout Doucement</option>
                </select>
                <p>Adresse du destinataire :</p>
                <input type="text" id="addr"></input>
                <br/>
                <p>ID du token à transférer :</p>
                <input type="text" id="id"></input>
                <br/><br/>
                <button onClick={() => this.transfer()}>Transfer !</button>
            </div>
        );
    }

}

export default Transfer;