import "../App.css";
// import logo from "./logo.svg";
import Game from "./game/Game.js";

import TopSection from "./TopSection/TopSection.js";

// import { Grid } from "@mui/material";

import React, { useState, useEffect, useRef } from "react";

import Web3 from "web3";

import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

import WalletUI from "./wallet/UI";

import getContract from "./contract/contract.js";

function Web3App() {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill("_")));

  const [gameId, setGameId] = useState(0);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [walletActive, setWalletActive] = useState(active);

  const [playerId, setPlayerId] = useState(0);

  const count = useRef(null);


  function getActive() {
    return active;
  }

  function newBoard() {
    // console.log("newBoard", Array(3).fill(Array(3).fill("_")));
    return setBoard(Array(3).fill(Array(3).fill("_")));
  }

  function handleClick(row, col, currentBoard) {
    // console.log("handleClick", row, col);

    if (playerId === 1 || playerId === 2) {

      if (active) {

        const contract = getContract(library);
        contract.methods
          .getBoard(gameId)
          .call({ from: account })
          .catch((err) => console.log("failed to get game " + err))
          .then((board) => {

            if (board != null) {
              console.log("board", board);
              if (board[row][col] == 0) {

                console.log(contract)

                contract.methods
                  .getTurn(gameId)
                  .call({ from: account })
                  .catch((err) => console.log("failed to get turn " + err))
                  .then((turn) => {

                    console.log("turn", turn, playerId);

                    // console.log("player1", board.player1, "turn", board.turn);
                    // console.log("player2", board.player2, "turn", board.turn);
                    if (playerId == 1) {
                      if (turn == 1) {

                        // console.log("player1", board.player1, "turn", board.turn);
                        contract.methods
                          .move(gameId, playerId, row, col)
                          .send({ from: account })
                          .catch((err) => {
                            console.log("Failed to make move " + err)
                            alert("Failed to make move " + err);

                          }).then((res) => {

                            if (res.events.GameFinished) {
                              let winner = res.events.GameFinished.returnValues.winner;
                              console.log("game finished");

                              if (winner == 0) {
                                alert("Tie game");
                              } else if (winner == 1) {
                                alert("Player 1 wins");
                              } else if (winner == 2) {
                                alert("Player 2 wins");
                              }
                            }
                            count.current++;
                            console.log("move result", res);
                          })
                      } else {
                        console.log("not your turn, current turn", turn);
                        alert("not your turn, current turn: " + turn);
                      }

                    } else if (playerId == 2) {
                      if (turn == 2) {

                        // console.log("player2", board.player2, "turn", board.turn);
                        contract.methods
                          .move(gameId, playerId, row, col)
                          .send({ from: account })
                          .catch((err) => {
                            console.log("failed to make move " + err)
                            alert("Failed to make move " + err)
                          }).then((res) => {

                            if (res.events.GameFinished) {
                              let winner = res.events.GameFinished.returnValues.winner;
                              console.log("game finished");

                              if (winner == 0) {
                                alert("Tie game");
                              } else if (winner == 1) {
                                alert("Player 1 wins");
                              } else if (winner == 2) {
                                alert("Player 2 wins");
                              }
                            }
                            count.current++;
                            console.log("move result", res);
                          })
                      } else {
                        console.log("not your turn, current turn", turn);
                        alert("not your turn, current turn: " + turn);
                      }
                    } else {
                      console.log("not allowed to move", playerId);
                      alert("not allowed to move " + playerId);
                    }
                  })
              } else {
                alert("Invalid move, try again, current item is " + board[row][col], typeof board[row][col]);
              }
            } else {
              console.log("board is null");
              alert("board is null");
            }
          })

        // const newBoard = [];
        // for (let i = 0; i < currentBoard.length; i++) {
        //   newBoard.push([]);
        //   for (let j = 0; j < currentBoard[i].length; j++) {
        //     newBoard[i].push(currentBoard[i][j]);
        //   }
        // }

        // console.log(newBoard);

        // console.log(currentBoard, newBoard);
        // setBoard(newBoard);

      }

    } else {
      console.log("You are not allowed to play", playerId);
    }
  }

  async function getBoardFromContract(gameId) {
    // console.log("getBoardFromContract", gameId);

    if (active) {

      // console.log("library", library);
      let contract = getContract(library);
      // console.log("contract", contract);
      let gameObj = await contract.methods
        .getBoard(gameId)
        .call({ from: account })
        .catch((err) => console.log("failed to get game", err));

      // console.log("gameObj", gameObj);

      return gameObj;
    }
  }

  const renderBoardTime = 4;

  // const interval = setInterval(() => {
  //   console.log("This will run every", renderBoardTime, "second!");


  //     setCount(count + 1);
  //     console.log("count", count);
  // }, 4 * 1000);

  useEffect(() => {


    async function getBoardFromContract(gameId) {
      // console.log("getBoardFromContract", gameId);

      if (active) {

        // console.log("library", library);
        let contract = getContract(library);
        // console.log("contract", contract);
        let gameObj = await contract.methods
          .getBoard(gameId)
          .call({ from: account })
          .catch((err) => console.log("failed to get game", err));

        // console.log("gameObj", gameObj);

        return gameObj;
      }
    }

    console.log("active", active, gameId);
    getBoardFromContract(gameId).then((res) => {
      // console.log("res", res);
      if (res) {
        setBoard(res);
      }
    });

    // let countobj = count;
    const interval = setInterval(() => {
      console.log("This will run every", renderBoardTime, "second!");
      count.current++;


      console.log("active", active, gameId);
      getBoardFromContract(gameId).then((res) => {
        // console.log("res", res);
        if (res) {
          setBoard(res);
        }
      });
      // console.log("count", count);
    }, 4 * 1000);

    return () => clearInterval(interval);
  }, [count, active, gameId, playerId]);


  // useEffect(() => {
  //   console.log("countRef", count.current);
  // }, [count]);

  // useEffect(() => {

  //   async function getBoardFromContract(gameId) {
  //     // console.log("getBoardFromContract", gameId);

  //     if (active) {

  //       // console.log("library", library);
  //       let contract = getContract(library);
  //       // console.log("contract", contract);
  //       let gameObj = await contract.methods
  //         .getBoard(gameId)
  //         .call({ from: account })
  //         .catch((err) => console.log("failed to get game", err));

  //       // console.log("gameObj", gameObj);

  //       return gameObj;
  //     }
  //   }

  //   console.log("active", active, gameId);
  //   getBoardFromContract(gameId).then((res) => {
  //     // console.log("res", res);
  //     if (res) {
  //       setBoard(res);
  //     }
  //   });
  // }, [count, active, gameId, playerId]);

  return (
    <div>
      <WalletUI walletActive={walletActive} setWalletActive={setWalletActive} />
      <header className="App-header">
        <h1>Tic Tac Toe</h1>

        <TopSection
          newBoardFun={newBoard}
          gameId={gameId}
          setGameId={setGameId}
          setPlayerId={setPlayerId}
          setBoard={setBoard}
        />
      </header>
      <Game
        board={board}
        handleClick={handleClick}
        gameId={gameId}
        setGameId={setGameId}
        playerId={playerId}
      />
    </div>
  );
}

export default Web3App;
