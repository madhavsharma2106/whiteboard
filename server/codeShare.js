const codeShareRooms = {};

const checkIfCodeHasMulitpleLines = (text) => text.includes("\n");

const singleLineChange = (data) => {
  const { lineNumber, text, room, column, range } = data;
  const line = codeShareRooms[room][lineNumber];
  const updatedLine = line.slice(0, column) + text + line.slice(column);
  codeShareRooms[room][lineNumber] = updatedLine;
};

const addTextToCode = (data, socket) => {
  const { lineNumber, text, room, column, range } = data;
  if (!codeShareRooms[room]) return;
  singleLineChange(data);

  socket.broadcast.to(room).emit("incomingCodeChange", {
    type: "addition",
    payload: {
      text,
      range,
    },
  });
};

module.exports = {
  codeShareRooms,
  addTextToCode,
};
