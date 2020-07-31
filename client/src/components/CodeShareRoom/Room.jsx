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

    const removeUserFromRoom = () => {
      socket.emit(socketEvents.CUSTOMDISCONNECT, {
        roomType: RoomTypes.codeShareRoom,
      });
    };
    window.addEventListener("beforeunload", removeUserFromRoom);
    return () => {
      window.removeEventListener("beforeunload", removeUserFromRoom);
    };
  }, [props.location.search]);

  useEffect(() => {
    socket.on(socketEvents.MESSAGE, (message) => {
      console.log(message);
    });

    socket.on(socketEvents.ROOMDATA, (data) => {
      setRoomData(data);
    });
  }, []);

  return (
    <div className="code-share">
      <InfoBar username={username} room={room} roomData={roomData} />
      <Monaco />
    </div>
  );
}

export default withRouter(Room);
