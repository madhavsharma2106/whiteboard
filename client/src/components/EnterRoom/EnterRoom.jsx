import React, { useState } from "react";
import { withRouter } from "react-router";

function EnterRoom(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [roomType, setRoomType] = useState("whiteBoard");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && room)
      props.history.push(`/${roomType}Room?username=${username}&room=${room}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username for the day"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your room"
        onChange={(e) => setRoom(e.target.value)}
      />
      <select onChange={(e) => setRoomType(e.target.value)}>
        <option value="whiteBoard">White Board</option>
        <option value="codeShare">Code Share</option>
      </select>
      <button type="submit">Lets Go</button>
    </form>
  );
}

export default withRouter(EnterRoom);
