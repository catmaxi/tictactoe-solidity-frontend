
import { Grid } from "@mui/material";

import Row from "./Row/Row.js";

const Board = (props) => {
  const { item, onClick } = props;

  return (
    <Grid container spacing={3}> 
    <Row />
    <Row />
    <Row />
    </Grid>
  );
};



export default Board;