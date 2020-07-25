import React, { useState } from "react";
import { withRouter } from "react-router";

function EnterRoom(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && room)
      props.history.push(`/room?username=${username}&room=${room}`);
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
      <button type="submit">Lets Go</button>
    </form>
  );
}

export default withRouter(EnterRoom);
