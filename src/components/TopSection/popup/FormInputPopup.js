import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

let handleSubmit = event => {
  event.preventDefault();

  const data = new FormData(event.target);
  const gameId = data.get("gameId");

  console.log(gameId);
};

const formInputPopup = () => (
  <Popup
    trigger={<button className="button"> Join a Game </button>}
    position="top center"
    nested
  >
    <div>
      <h3>Input a gameId and join the game.</h3>
      
    </div>

    <form onSubmit={handleSubmit}>
      <label>
        gameId:
        <input type="text" name="gameId" />
      </label>
      <input type="submit" value="Submit" />
    </form>


  </Popup>
);

export default formInputPopup;
