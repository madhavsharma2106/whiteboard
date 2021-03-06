import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { withRouter } from "react-router";
import io from "socket.io-client";
import { API_ENDPOINT, socketEvents, RoomTypes } from "../../utils";
import InfoBar from "./InfoBar/InfoBar";
import "./room.scss";
import Monaco from "./monaco/Monaco";

let socket;
function Room(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [roomData, setRoomData] = useState();
  const [initialValue, setInitialValue] = useState([]);

  useEffect(() => {
    const { username, room } = queryString.parse(props.location.search);
    setUsername(username);
    setRoom(room);

    socket = io(API_ENDPOINT);

    // Joining the user to the room
    socket.emit(
      socketEvents.JOIN,
      { name: username, room, roomType: RoomTypes.codeShareRoom },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  }, [props.location.search]);

  useEffect(() => {
    socket.on(socketEvents.MESSAGE, (message) => {
      console.log(message);
    });

    socket.on(socketEvents.ROOMDATA, (data) => {
      console.log(data);
      setRoomData(data);
    });

    socket.on(socketEvents.INCOMING_CODE_CHANGE, (data) => {
      const { type, payload } = data;
      if (type === "initialValue") setInitialValue(payload);
    });
  }, []);

  return (
    <div className="code-share">
      <InfoBar username={username} room={room} roomData={roomData} />
      <Monaco
        socket={socket}
        initialValue={initialValue}
        username={username}
        room={room}
      />
    </div>
  );
}

export default withRouter(Room);
