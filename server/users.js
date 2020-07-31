const whiteBoardUsers = [];
const codeShareUsers = [];

const RoomTypes = {
  whiteBoardRoom: "whiteBoardRoom",
  codeShareRoom: "codeShareRoom",
};

const addUser = ({ id, name, room, roomType }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  let existingUser;

  if (roomType === RoomTypes.whiteBoardRoom) {
    existingUser = whiteBoardUsers.find(
      (user) => user.room === room && user.name === name
    );
  } else if (roomType === RoomTypes.codeShareRoom) {
    existingUser = codeShareUsers.find(
      (user) => user.room === room && user.name === name
    );
  }

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  if (roomType === RoomTypes.whiteBoardRoom) {
    whiteBoardUsers.push(user);
  } else if (roomType === RoomTypes.codeShareRoom) {
    codeShareUsers.push(user);
  }
  return { user };
};

const removeUser = (id, roomType) => {
  if (roomType === RoomTypes.whiteBoardRoom) {
    const index = whiteBoardUsers.findIndex((user) => user.id === id);
    if (index !== -1) return whiteBoardUsers.splice(index, 1)[0];
  }
  if (roomType === RoomTypes.codeShareRoom) {
    const index = codeShareUsers.findIndex((user) => user.id === id);
    if (index !== -1) return codeShareUsers.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room, roomType) => {
  if (roomType === RoomTypes.whiteBoardRoom)
    return whiteBoardUsers.filter((user) => user.room === room);
  if (roomType === RoomTypes.codeShareRoom)
    return codeShareUsers.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
