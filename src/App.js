import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import HomePage from './pages/Home';
import SongPage from './pages/Song';
import loadWeb3 from './scripts/connect';
import DoucementPage from "./pages/doucement";
import TransferPage from "./pages/transfer";
import HoldersPage from "./pages/holders";
import './App.css'
import contract from './scripts/toutDoucement'
import Web3 from 'web3'

export default function App() {
  return (
    <Router>
      <div id="bg"></div>
      <div>
        <nav>
            <Button id="buttonBig" variant="contained" color="primary"><Link to="/" style={{textDecoration: "none"}}>Home</Link></Button>
            <Button id="buttonBig" variant="contained" color="primary"><Link to="/song" style={{textDecoration: "none"}}>Song For A City</Link></Button>
            <Button id="buttonBig" variant="contained" color="primary"><Link to="/doucement" style={{textDecoration: "none"}}>Tout Doucement</Link></Button>
            <Button id="buttonBig" variant="contained" color="primary"><Link to="/transfer" style={{textDecoration: "none"}}>Transfer Tokens</Link></Button>
            <Button id="buttonBig" variant="contained" color="primary"><Link to="/holders" style={{textDecoration: "none"}}>Token Holders</Link></Button>
            {/*
            <Button id="buttonBig" variant="contained" color="primary"><Link to="/addressholders" style={{textDecoration: "none"}}>Token Holders</Link></Button>
            */}
            <Button id="buttonBig" variant="contained" color="primary" onClick={() => loadWeb3()}>Login with metamask</Button>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/holders">
            <Holders />
          </Route>
          <Route path="/transfer">
            <Transfer />
          </Route>
          <Route path="/song">
            <Song />
          </Route>
          <Route path="/doucement">
            <Doucement />
          </Route>
          <Route path="/addressholders">
            <AddressHolders/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <HomePage/>
}

function Song() {
  return <SongPage/>;
}

function Doucement() {
  return <DoucementPage/>;
}

function Transfer() {
  return <TransferPage/>;
}

function Holders() {
  return <HoldersPage/>;
}

function AddressHolders() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:address`}>
          <h2>Here</h2>
        </Route>
        <Route path={match.path}>
          <h3 class="dataBox">Please enter an address</h3>
          <input type="text" id="address"></input>
          {/* 
          <Button id="buttonBig" variant="contained" color="primary"><Link to={document.getElementById('address').value} style={{textDecoration: "none"}}>Go</Link></Button>
          */}
        </Route>
      </Switch>
    </div>
  );
}

function AddressHolder() {
  let { address } = useParams();
  const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
  const eth = web3.eth
  const [mounted, setMounted] = useState(false)
  const [stateName, setStateName] = useState(undefined)
  const [stateCounter, setStateCounter] = useState(0)
  const account = async () => { return await eth.getAccounts();}
  const doucement = new eth.Contract(contract.abi, contract.address, {
    from: account()[0]
  })
  
  useEffect(() =>{
    setMounted(true)
  },[])

  const allTokens = async () => {
    var tokens = document.getElementById('tokens');

    for (var i = 0; i < stateCounter; i++) {
        var addr = await doucement.methods.ownerOf(i).call();
        if (addr === address) {
            tokens.innerHTML += "<div><img src='https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png' height='70' width='70' alt='Corresponds to the token'></img>" +
            "<br/>Name : " + stateName + "<br/>Token ID : " + i + "</div><br/>"
        }
    }
  }
  if(!mounted){
    setStateName(doucement.methods.name().call())
    setStateCounter(doucement.methods.tokenCounter().call())
    allTokens();
  }
  // Ici il faut utiliser topicId pour aller chercher les contracts qui correspondent
  return <div>
      <div class="dataBox">{address}</div>
      <div class="dataBox" id="tokens"></div>
    </div>;
}