const Item = (props) => {
  const { item, handleClick, board, row, col } = props;
  // console.log( "item: ", item);

  function handleClickItem(e) {
    console.log("row", row, "col", col);
    e.preventDefault();
    handleClick(row, col, board);
  }
  return (
    <div
      className="item"
      onClick={handleClickItem}
      style={{ backgroundColor: "gray" }}
    >
      <h1>{item}</h1>
    </div>
  );
};

export default Item;
