import React, { useContext } from "react";
import { WhiteBoardContext } from "../../Room";

const colorsArray = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "pink",
  "black",
  "teal",
  "brown",
];

function ColorPalette() {
  const whiteBoardContext = useContext(WhiteBoardContext);

  const changeColor = (color) => {
    whiteBoardContext.color = color;
  };

  const renderColors = () =>
    colorsArray.map((color, i) => (
      <span
        key={i}
        className="color"
        onClick={() => changeColor(color)}
        style={{ backgroundColor: color }}
      ></span>
    ));

  return <div className="color-pallete">{renderColors()}</div>;
}

export default ColorPalette;
