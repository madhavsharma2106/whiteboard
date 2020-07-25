import React from "react";
import ColorPalette from "../ColorPalette/ColorPalette";

function InfoBar({ roomData, username, room }) {
  return (
    <div className="info-bar">
      <p>Hello {username}</p>
      <ColorPalette />
      <p>
        Users in Room "{room}" : {roomData && roomData.users.length}
      </p>
    </div>
  );
}

export default InfoBar;
