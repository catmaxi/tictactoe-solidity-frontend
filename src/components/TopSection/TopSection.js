import FormInputPopup from "./popup/FormInputPopup";

import { useWeb3React } from "@web3-react/core";

import getContract from "../contract/contract.js";

const TopSection = (props) => {
  const { newBoardFun, onClick, gameId, setGameId, setPlayerId, setBoard } = props;

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  // console.log("account", account, active, library, connector);

  function createGameHandler() {
    console.log("createGameHandler");

    if (active) {
      const contract = getContract(library);
      console.log("contract", contract, account);
      contract.methods
        .createNewGame()
        .send({ from: account })
        .then(function (result) {
          console.log("createGame", result, result.events.GameCreated.returnValues.gameId);

          setPlayerId(1);
          setGameId(result.events.GameCreated.returnValues.gameId);

          alert("Game created! Game ID: " + result.events.GameCreated.returnValues.gameId, "you are player 1");
        })
        .catch(function (error) {
          console.log("createGame error", error);
          alert("Error creating game", error);
        });
    }
    newBoardFun();
  }

  function startGameHandler() {
    console.log("startGameHandler");

    if (active) {
      const contract = getContract(library);
      console.log("contract", contract, account);
      contract.methods
        .startGame(gameId)
        .send({ from: account })
        .then(function (result) {
          console.log("startGame", result, result.events.GameStarted.returnValues.gameId);

          setPlayerId(1);
          setGameId(result.events.GameStarted.returnValues.gameId);

          alert("Game started! Game ID: " + result.events.GameStarted.returnValues.gameId, "you are player 1");
        })
        .catch(function (error) {
          console.log("startGame error", error);
          alert("Error starting game", error);
        });
    }
    newBoardFun();
  }

  function updateGameHandler() {
    console.log("updateGameHandler");

    if (active) {
      async function getBoardFromContract(gameId) {
        console.log("updateBoardFromContract", gameId);

        if (active) {

          // console.log("library", library);
          let contract = getContract(library);
          // console.log("contract", contract);
          let gameObj = await contract.methods
            .getBoard(gameId)
            .call({ from: account })
            .catch((err) => {
              console.log("failed to get game", err)
              alert("failed to update game", err);
            });

          // console.log("gameObj", gameObj);

          return gameObj;
        }
      }

      // console.log("active", active, gameId);
      getBoardFromContract(gameId).then((res) => {
        // console.log("res", res);
        if (res) {
          setBoard(res);
        }
      });
    }
    newBoardFun();
  }

  // if (active) {
  //   let contract = getContract(library);
  // }

  return (
    <div style={{ backgroundColor: "", border: "3" }}>
      {/* <h1>TopSection</h1> */}

      {/* console.log("account", account); */}

      <button onClick={createGameHandler}>Create a New Game</button>

      <FormInputPopup
        gameId={gameId}
        setGameId={setGameId}
        setPlayerId={setPlayerId}
      />

      <button onClick={startGameHandler}>Start the Game</button>
      <button onClick={updateGameHandler}>Update the Game</button>

    </div>
  );
};

function createGame() {
  console.log("createGame");
}

export default TopSection;
