const { splitCodeIntoArrayByNextLines } = require("./utils");

const codeShareRooms = {};

const multilineChange = (data) => {
  const { lineNumber, text, room, column, range, fullCode } = data;
  codeShareRooms[room] = splitCodeIntoArrayByNextLines(fullCode);
};

const singleLineChange = (data) => {
  const { lineNumber, text, room, column, range } = data;
  const line = codeShareRooms[room][lineNumber];
  const updatedLine = line.slice(0, column) + text + line.slice(column);
  codeShareRooms[room][lineNumber] = updatedLine;
};

const addTextToCode = (data, socket) => {
  const { lineNumber, text, room, column, range, fullCode } = data;
  if (!codeShareRooms[room]) return;
  if (fullCode) {
    multilineChange(data);
  } else {
    singleLineChange(data);
  }

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
