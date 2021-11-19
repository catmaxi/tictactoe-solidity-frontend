import "./App.css";
// import logo from "./logo.svg";
import Game from "./components/game/Game.js";

import TopSection from "./components/TopSection/TopSection.js"

import { Grid } from "@mui/material";

import React, { useState } from 'react';

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
    // board[row][col] = "X";
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>

        <TopSection newBoardFun={newBoard}/>
        </header>
      <Game board={board} handleClick={handleClick}/>
    </div>
  );
}







export default App;
