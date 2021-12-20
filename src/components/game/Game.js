import { Grid } from "@mui/material";

import Board from "./Board/Board.js";


  const Game = (props) => {
    const { board, handleClick, gameId, setGameId, playerId } = props;
  
    return (
      <div style={{backgroundColor:"white", border: "3"}}>
          <h1>Board 1</h1>
          <Board itemRows={board} handleClick={handleClick}/>
      </div>
    );
  };
  


export default Game;
