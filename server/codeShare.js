const codeShareRooms = {};

const addTextToCode = (data, socket) => {
  const { lineNumber, text, room, column } = data;
  const line = codeShareRooms[room][lineNumber];
  const updatedLine = line.slice(0, column) + text + line.slice(column);
  codeShareRooms[room][lineNumber] = updatedLine;

  socket.broadcast.to(room).emit("incomingCodeChange", {
    type: "addition",
    payload: {
      lineNumber,
      updatedLine,
    },
  });
};

module.exports = {
  codeShareRooms,
  addTextToCode,
};
