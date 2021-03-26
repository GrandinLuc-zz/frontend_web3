import React from "react";
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List'
const data = require('../scripts/blockchainData');

export default function HomePage() {

  const id = data.chainId
  const block = data.latestBlockNumber
  const user = data.address

  return (
    <div>
      <div>Chain Id : {id}</div>
      <div>Latest Block Number : {block}</div>
      <div>User Address : {user}</div>
    </div>
  );
}
