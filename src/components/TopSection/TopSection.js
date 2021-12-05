import FormInputPopup from "./popup/FormInputPopup";



const TopSection = (props) => {
  const { newBoardFun, onClick } = props;

  return (
    <div style={{backgroundColor:"", border: "3"}}>
        <h1>TopSection</h1>

        <button onClick={newBoardFun}>
            Create a New Game
        </button>

        <FormInputPopup />

    </div>
  );
};


function createGame(){
    console.log("createGame");
}


export default TopSection;
