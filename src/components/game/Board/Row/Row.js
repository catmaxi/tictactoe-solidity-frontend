import { Grid } from "@mui/material";

import Item from "./Item/Item.js";

const hello = () => {
  console.log("hello");
};

const Row = (props) => {
  const { items, handleClick, board, rowID } = props;

  function itemRealValue(item) {
    switch (item) {
      case 0:
      case "0":
        return "_";
      case 1:
      case "1":
        return "X";
      case 2:
      case "2":
        return "O";

      default:
        return item;
    }
  }

  return (
    <Grid container spacing={3}>
      {items.map((item, index) => {
        return (
          <Grid item xs>
            <Item
              key={index}
              item={itemRealValue(item)}
              board={board}
              row={rowID}
              col={index}
              handleClick={handleClick}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Row;
