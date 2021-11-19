

import { Grid } from "@mui/material";

import Item from './Item/Item.js';


const hello = () => {
    console.log("hello");
  };


const Row = (props) => {
    const { item, onClick } = props;
  
    return (
      <Grid container spacing={3}>
        <Grid item xs>
          <Item item="Hello" onClick={hello} />
        </Grid>
        <Grid item xs>
          <Item item="Hello" onClick={hello} />
        </Grid>
        <Grid item xs>
          <Item item="Hello" onClick={hello} />
        </Grid>
      </Grid>
    );
  };
  

export default Row;