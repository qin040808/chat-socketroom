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

  socket.on("sendMsg", ({ message }) => {
    io.to(socket.roomId).emit("newMsg", { message, nickname: socket.nickname, id: socket.id })
    }
  );
  let to = [];
  socket.on("whispered", ({ nickname }) => {
    to = sockets.filter(data => data.nickname == nickname);
  })
  socket.on("sendWhisper", ({ message, id }) => {
    console.log(id);
    console.log(to[0].id);
    io.to(id).to(to[0].id).emit("newWhisper", {message, nickname: socket.nickname, id:socket.id})
  }
  );

  socket.on("addRoom", ({ message }) => {
    room_info.push({ roomId: message });
    io.emit("updateRoom", { room_info });
  });

  socket.on("enterRoom", ({roomId}) => {
    socket.join(roomId);
    if(socket.roomId){
      socket.leave(socket.roomId);
    }
    socket.roomId = roomId;
  });

  socket.on("removeRoom", ({roomId}) => {
    io.to(roomId).emit("leaveRoom", {roomId});
    room_info = room_info.filter(info => info.roomId !== roomId);
    io.emit("updateRoom", {room_info});
  });

  socket.on("leaveRequest",({roomId}) => {
    socket.leave(roomId);
  });
};

export default socketController;
