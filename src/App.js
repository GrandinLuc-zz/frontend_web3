import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import HomePage from './pages/Home'
import loadWeb3 from './scripts/connect'


export default function App() {
  return (
    <Router>
      <div>
        <nav>
            <Button variant="contained" color="primary"><Link to="/" style={{textDecoration: "none"}}>Home</Link></Button>
            <Button variant="contained" color="primary"><Link to="/about" style={{textDecoration: "none"}}>About</Link></Button>
            <Button variant="contained" color="primary"><Link to="/users" style={{textDecoration: "none"}}>Users</Link></Button>
            <Button variant="contained" color="primary" onClick={() => loadWeb3()}>Login with metamask</Button>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
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

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}