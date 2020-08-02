export const API_ENDPOINT = "localhost:9009/";

export const socketEvents = {
  JOIN: "join",
  DISCONNECT: "disconnect",
  ROOMDATA: "roomData",
  MESSAGE: "message",
  DRAWING: "drawing",
  CODE_CHANGE: "codeChange",
};

export const RoomTypes = {
  whiteBoardRoom: "whiteBoardRoom",
  codeShareRoom: "codeShareRoom",
};

export const joinValue = (value) => value.join("\n");
