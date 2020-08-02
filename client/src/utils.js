export const API_ENDPOINT = "157.245.101.36:9009/";
// export const API_ENDPOINT = "localhost:9009/";

export const socketEvents = {
  JOIN: "join",
  DISCONNECT: "disconnect",
  ROOMDATA: "roomData",
  MESSAGE: "message",
  DRAWING: "drawing",
  INCOMING_CODE_CHANGE: "incomingCodeChange",
  REGISTER_CODE_CHANGE: "registerCodeChange",
};

export const RoomTypes = {
  whiteBoardRoom: "whiteBoardRoom",
  codeShareRoom: "codeShareRoom",
};

export const joinValue = (value) => value.join("\n");
export const checkIfCodeChangeIsAffectingMulitpleLines = ({ text, range }) => {
  if (text.includes("\n")) return true;
  if (range.endColumn !== range.startColumn) return true;
};
