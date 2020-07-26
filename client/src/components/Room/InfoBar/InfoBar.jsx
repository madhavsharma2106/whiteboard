import React from "react";
import ColorPalette from "../ColorPalette/ColorPalette";
import UsersInRoom from "../UsersInRoom/UsersInRoom";

function InfoBar({ roomData, username, room }) {
  return (
    <div className="info-bar">
      <p>Hello {username}</p>
      <ColorPalette />
      <UsersInRoom roomData={roomData} />
    </div>
  );
}

export default InfoBar;
