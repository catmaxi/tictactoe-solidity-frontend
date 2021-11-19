import { Grid } from "@mui/material";

import Item from "./Item/Item.js";

const hello = () => {
  console.log("hello");
};

const Row = (props) => {
  const { items, handleClick, board, rowID } = props;

  return (
    <Grid container spacing={3}>
      {items.map((item, index) => {
            return (
                <Grid item xs >
                    <Item key={index} item={item} board={board} row={rowID} col={index} handleClick={handleClick} />
                </Grid>
            );
        })}
    </Grid>
  );
};

export default Row;
