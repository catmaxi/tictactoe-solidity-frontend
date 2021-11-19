
import { Grid } from "@mui/material";

import Row from "./Row/Row.js";

const Board = (props) => {
  const { itemRows, handleClick } = props;

  return (
    <Grid container rowSpacing={10}> 
      {itemRows.map((row, index) => (
        <Row key={index} items={row} board={itemRows} rowID={index} handleClick={handleClick} />
      ))}

    </Grid>
  );
};



export default Board;