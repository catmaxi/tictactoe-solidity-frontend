




const Item = (props) => {
  const { item, onClick } = props;

  return (
    <div className="item" onClick={onClick}>
      <h1>{item}</h1>
    </div>
  );
};

export default Item;
