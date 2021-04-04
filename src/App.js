import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import HomePage from './pages/Home';
import SongPage from './pages/Song';
import loadWeb3 from './scripts/connect';
import DoucementPage from "./pages/doucement";
import TransferPage from "./pages/transfer";
import HoldersPage from "./pages/holders";


export default function App() {
  return (
    <Router>
      <div>
        <nav>
            <Button variant="contained" color="primary"><Link to="/" style={{textDecoration: "none"}}>Home</Link></Button>
            <Button variant="contained" color="primary"><Link to="/song" style={{textDecoration: "none"}}>Song For A City</Link></Button>
            <Button variant="contained" color="primary"><Link to="/doucement" style={{textDecoration: "none"}}>Tout Doucement</Link></Button>
            <Button variant="contained" color="primary"><Link to="/transfer" style={{textDecoration: "none"}}>Transfer Tokens</Link></Button>
            <Button variant="contained" color="primary"><Link to="/holders" style={{textDecoration: "none"}}>Token Holders</Link></Button>
            <Button variant="contained" color="primary" onClick={() => loadWeb3()}>Login with metamask</Button>
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