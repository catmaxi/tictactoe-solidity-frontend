import "./App.css";
// import logo from "./logo.svg";
import Game from "./components/game/Game.js";

import TopSection from "./components/TopSection/TopSection.js"

// import { Grid } from "@mui/material";

import React, { useState } from 'react';


import Web3 from 'web3'

import { Web3ReactProvider } from '@web3-react/core'

import WalletUI from "./components/wallet/UI";


function getLibrary(provider) {
  return new Web3(provider)
}

function App() {

  const [board, setBoard] = useState(Array(3).fill(Array(3).fill("_")));

  function newBoard() {
    console.log("newBoard", Array(3).fill(Array(3).fill("_")));
    return setBoard(Array(3).fill(Array(3).fill("_")));
  }

  function handleClick(row, col, currentBoard) {
    console.log("handleClick", row, col);
    const newBoard = [];
    for (let i = 0; i < currentBoard.length; i++) {
      newBoard.push([]);
      for (let j = 0; j < currentBoard[i].length; j++) {
        newBoard[i].push(currentBoard[i][j]);
      }
    }

    console.log(newBoard)
    newBoard[row][col] = "X";
    console.log(currentBoard, newBoard)
    setBoard(newBoard);
  }

  return (
    <div className="App">

      <Web3ReactProvider getLibrary={getLibrary}> 
      <WalletUI />
      <header className="App-header">
        <h1>Tic Tac Toe</h1>

        <TopSection newBoardFun={newBoard}/>
        </header>
      <Game board={board} handleClick={handleClick}/>

      </Web3ReactProvider>
    </div>
  );
}







export default App;
