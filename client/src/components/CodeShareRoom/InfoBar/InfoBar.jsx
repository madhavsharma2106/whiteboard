import React from "react";
import UsersInRoom from "./UsersInRoom/UsersInRoom";

function InfoBar({ roomData, username }) {
  return (
    <div className="info-bar">
      <p>Hello {username}</p>
      <UsersInRoom roomData={roomData} />
    </div>
  );
}

export default InfoBar;
