import React, { useState, useEffect, createContext, useCallback } from "react";
import queryString from "query-string";
import { withRouter } from "react-router";
import io from "socket.io-client";
import { API_ENDPOINT, socketEvents } from "../../utils";
import "./room.scss";
import InfoBar from "./InfoBar/InfoBar";
import WhiteBoard from "./WhiteBoard/WhiteBoard";

let socket;
const defaultWhiteBoardSettings = {
  color: "black",
  lineWidth: 5,
  lineCap: "round",
};

export const WhiteBoardContext = createContext(defaultWhiteBoardSettings);

function Room(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [roomData, setRoomData] = useState();
  const [incomingStroke, setIncomingStroke] = useState();
  const [parentNode, setParentNode] = useState(null);

  /**
   * Setting parent node here so that whiteboard can get the dimensions
   */
  const div = useCallback((node) => {
    if (node !== null) {
      setParentNode(node);
    }
  }, []);

  useEffect(() => {
    const { username, room } = queryString.parse(props.location.search);
    setUsername(username);
    setRoom(room);

    socket = io(API_ENDPOINT);

    // Joining the user to the room
    socket.emit(socketEvents.JOIN, { name: username, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [props.location.search]);

  useEffect(() => {
    socket.on(socketEvents.MESSAGE, (message) => {
      console.log(message);
    });

    socket.on(socketEvents.ROOMDATA, (data) => {
      setRoomData(data);
    });

    socket.on(socketEvents.DRAWING, (data) => {
      setIncomingStroke(data);
    });
  }, []);

  return (
    <WhiteBoardContext.Provider value={defaultWhiteBoardSettings}>
      <div className="room">
        <InfoBar username={username} room={room} roomData={roomData} />
        <div className="whiteboard-wrapper" ref={div}>
          <WhiteBoard
            socket={socket}
            username={username}
            room={room}
            incomingStroke={incomingStroke}
            parentNode={parentNode}
          />
        </div>
      </div>
    </WhiteBoardContext.Provider>
  );
}

export default withRouter(Room);
