import React, { useContext } from "react";
import { WhiteBoardContext } from "../Room";

function ColorPalette() {
  const whiteBoardContext = useContext(WhiteBoardContext);

  const changeColor = (color) => {
    whiteBoardContext.color = color;
  };

  return (
    <div>
      <p onClick={() => changeColor("red")}>red</p>
      <p onClick={() => changeColor("yellow")}>yellow</p>
      <p onClick={() => changeColor("green")}>green</p>
    </div>
  );
}

export default ColorPalette;
