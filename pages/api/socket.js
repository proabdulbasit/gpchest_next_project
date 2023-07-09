import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  let users = [];

  const addUser = (userEmail, socketId) => {
    if (userEmail) {
      !users.some((user) => user.userEmail === userEmail) &&
        users.push({ userEmail, socketId });
    } else {
      return null;
    }
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userEmail) => {
    return users.find((user) => user.userEmail === userEmail);
  };

  // Connect
  io.on("connection", (socket) => {
    console.log("A user just connected");

    // take socketId and UserId from User
    socket.on("addUser", (userEmail) => {
      addUser(userEmail, socket.id);
      io.emit("getUsers", users);
    });

    // Send and Get Message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          receiverId,
        });
      }
    });

    // Send and Get Auto Message
    socket.on("sendAutoMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(senderId);
      io.to(user?.socketId).emit("getAutoMessage", {
        senderId,
        text: "Sorry but we're currently full on in game currency at the moment, please check back at a later time, thanks!.",
        receiverId,
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  res.end();
}
