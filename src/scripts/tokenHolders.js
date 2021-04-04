const { Component } = require('react');
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
const eth = web3.eth
const toutDou = require('./toutDoucement')
const song = require('./SongForACity')

class Holders extends Component {

    async componentWillMount() {
        const account = await eth.getAccounts();
        var songTo = new eth.Contract(song.abi, song.address, {
            from: account[0]
        })

        var douc = new eth.Contract(toutDou.abi, toutDou.address, {
            from: account[0]
        })

        var songHolders = document.getElementById('tabSong');
        var toutHolders = document.getElementById('tabTout');

        var nbTokenSong = await songTo.methods.tokenCounter().call()
    

        for (var i = 0; i < nbTokenSong; i++) {
            var holder = await songTo.methods.ownerOf(i).call()
            songHolders.innerHTML += "<tr><td>"+ i + "</td><td>" +  holder + "</td></tr>"
        }

        var nbTokenTout = await douc.methods.tokenCounter().call()

        for (var j = 0; j < nbTokenTout; j++) {
            var hold = await douc.methods.ownerOf(j).call()
            toutHolders.innerHTML += "<tr><td>"+ j + "</td><td>" +  hold + "</td></tr>"
        }

    }
    
    render() {
        return (
            <div class="dataBox" id="content">
                <div id="son">
                    <h3>Song For A City holders</h3>
                    <table id="tabSong">
                        <tbody>
                            <tr>
                                <th scope='col'>Token ID</th>
                                <th scope='col'>Holder address</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div id="dou">
                    <h3>Tout Doucement holders</h3>
                    <table id="tabTout">
                        <tbody>
                            <tr>
                                <th scope='col'>Token ID</th>
                                <th scope='col'>Holder address</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Holders;