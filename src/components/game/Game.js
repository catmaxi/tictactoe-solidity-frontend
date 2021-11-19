import { Grid } from "@mui/material";

import Board from "./Board/Board.js";


  const Game = (props) => {
    const { item, onClick } = props;
  
    return (
      <Grid container spacing={3}> 
        <Board />
      </Grid>
    );
  };
  


export default Game;
