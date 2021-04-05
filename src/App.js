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