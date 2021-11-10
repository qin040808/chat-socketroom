let sockets = [];
let room_info = [];

const socketController = (socket, io) => {
  socket.on("login", ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit("newUser", { nickname });
    sockets.push({ id: socket.id, nickname: nickname });
    io.emit("updatePlayer", { sockets });
    io.emit("updateRoom", { room_info });
  });

  socket.on("disconnect", () => {
    sockets = sockets.filter((client) => client.id !== socket.id);
    socket.broadcast.emit("disconnected", { nickname: socket.nickname });
    io.emit("updatePlayer", { sockets });
    io.emit("updateRoom", { room_info });
  });

  socket.on("sendMsg", ({ message }) =>
    io.to(socket.roomId).emit("newMsg", { message, nickname: socket.nickname, id: socket.id })
  );

  socket.on("addRoom", ({ message }) => {
    room_info.push({ roomId: message });
    io.emit("updateRoom", { room_info });
  });

  socket.on("enterRoom", ({roomId}) => {
    socket.join(roomId);
    socket.roomId = roomId;
  });
};

export default socketController;
