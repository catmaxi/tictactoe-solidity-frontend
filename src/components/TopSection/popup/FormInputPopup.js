import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import getContract from "../../contract/contract.js";

import { useWeb3React } from "@web3-react/core";

const FormInputPopup = (props) => {
  const { newBoardFun, onClick, gameId, setGameId, setPlayerId } = props;

  let handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const gameId = data.get("gameId");


    joinGameHandler(gameId);
    console.log(gameId);
  };


  const handleWatchGame = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const gameId = data.get("gameId");

    watchGameHandler(gameId);
    console.log(gameId);
  };

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function joinGameHandler(gameId) {
    console.log("joinGameHandler");
    if (active) {
      const contract = getContract(library);
      console.log("contract", contract, account);

      // console.log("hello")

      let gameObj = await contract.methods.gameList(gameId).call({ from: account }).catch(err => console.log("failed to get game", gameId, err));
      // console.log("hello2")

      console.log("gameObj", gameObj);

      if (gameObj != null) {

        if (gameObj.player2 === account) {
          alert("Already joined game " + gameId + " as player 2, loading game...");

          setGameId(gameId);
          setPlayerId(2);

        } else if (gameObj.player1 === account) {
          alert("Already joined game " + gameId + " as player 1, loading game...");

          setGameId(gameId);
          setPlayerId(1);

        } else if (gameObj.player2 === "0x0000000000000000000000000000000000000000") {

          console.log("hello3");
          contract.methods
            .joinGame(gameId)
            .send({ from: account })
            .then(function (result) {
              console.log("joinGame", result);

              setGameId(gameId);
              setPlayerId(2);
              alert("Joined game", gameId, "as player 2, loading game...");
            })
            .catch(function (error) {
              console.log("joinGame error", error);
              alert("Error joining game", error);
            });
        } else {
          alert("Game", gameId, "is full!");
        }

      } else {
        alert("Game", gameId, "does not exist!");
      }


    }
  }

  async function watchGameHandler(gameId) {
    console.log("watchGameHandler");
    if (active) {
      const contract = getContract(library);

      console.log("contract", contract, account);

      let gameObj = await contract.methods.gameList(gameId).call({ from: account }).catch(err => console.log("failed to get game", gameId, err));


      console.log("gameObj", gameObj);

      if (gameObj != null) {
        setGameId(gameId);
        setPlayerId(0);
        alert("Watching game", gameId, "...");
      } else {
        alert("Game", gameId, "does not exist!");
      }

    }
  }

  return (
    <div>
      <Popup
        trigger={<button className="button"> Join a Game </button>}
        position="top center"
        nested
      >
        <div>
          <h3>Input a gameId and join the game.</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            gameId:
            <input type="text" name="gameId" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Popup>



      <Popup
        trigger={<button className="button"> Watch a Game </button>}
        position="top center"
        nested
      >
        <div>
          <h3>Input a gameId and watch the game.</h3>
        </div>

        <form onSubmit={handleWatchGame}>
          <label>
            gameId:
            <input type="text" name="gameId" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Popup>
    </div>
  );
};

export default FormInputPopup;
