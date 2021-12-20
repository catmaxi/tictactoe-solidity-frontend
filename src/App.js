import "./App.css";
// import logo from "./logo.svg";
import Game from "./components/game/Game.js";

import TopSection from "./components/TopSection/TopSection.js"

// import { Grid } from "@mui/material";

import React, { useState, useEffect } from 'react';


import Web3 from 'web3'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'

import WalletUI from "./components/wallet/UI";

import getContract from "./components/contract/contract.js";

import Web3App from "./components/Web3App";


function getLibrary(provider) {
  return new Web3(provider)
}





function App(){

  return (
    <div className="App">

      
      <Web3ReactProvider getLibrary={getLibrary}> 
      <Web3App />
      </Web3ReactProvider>
    </div>
  );
}



export default App;
