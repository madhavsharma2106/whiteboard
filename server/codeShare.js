const codeShareRooms = {};

const addTextToCode = (data) => {
  const { lineNumber, text, room, column } = data;
  const line = codeShareRooms[room][lineNumber];
  const updatedLine = line.slice(0, column) + text + line.slice(column);
  codeShareRooms[room][lineNumber] = updatedLine;
};

module.exports = {
  codeShareRooms,
  addTextToCode,
};
