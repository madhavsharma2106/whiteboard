const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const port = process.env.PORT || 3000;

io.on("connect", onConnection);

function onConnection(socket) {
  /**
   * Steps taken when the user joins
   * 1. Add user to the users array
   * 2. Check for errors
   * 3. Add user to room
   * 4. Send message to everyone that the user has joined.
   */
  const onJoin = ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    // Sending the error.
    if (error) return callback(error);

    // Adding the user to the room.
    socket.join(user.room);

    // Sending a welcome message to User.
    socket.emit("message", {
      user: "Admin",
      text: `Hello ${user.name}, welcome to room - ${user.room}.`,
    });

    // Broadcasting to everyone EXCEPT user that user has joined
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `Hello Everyone, Let's welcome ${user.name} to the room.!`,
    });

    // Sending the users in the Room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    // Need to send an empty message in the portal. Dont really know why yet.
    callback();
  };

  /**
   * Steps taken when the user disconnects
   *
   * 1. Remove user from the users array usin socket ID
   * 2. Emit a message to the rest of the users in the room saying who left.
   * 3. Emit a message to room with rooom data.
   */

  const onDisconnect = () => {
    // Remove user from the room using his socket ID
    const user = removeUser(socket.id);

    if (user) {
      // Send message to the entier room
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });

      // Update room data.
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  };

  /**
   * On Drawing method is used to emit the strokes to the users in the room.
   * @param {name, room, stroke} data
   *
   * 1. Send the data to eveyone in the room except the user.
   */
  const onDrawing = (data) => {
    socket.broadcast.to(data.room).emit("drawing", data);
  };

  socket.on("join", onJoin);
  socket.on("drawing", onDrawing);
  socket.on("disconnect", onDisconnect);
}

http.listen(port, () => console.log("listening on port " + port));
