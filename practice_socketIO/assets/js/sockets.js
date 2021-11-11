import { handleNewMessage, handleNewWhisper } from "./chat";
import { handleDisconnected, handleNewUser } from "./notifications";
import { handleUpdatePlayer, handleUpdateRoom, handleLeave } from "./room";
let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
  socket = aSocket;
  socket.on("newUser", handleNewUser);
  socket.on("disconnected", handleDisconnected);
  socket.on("newMsg", handleNewMessage);
  socket.on("newWhisper", handleNewWhisper)
  socket.on("updatePlayer", handleUpdatePlayer);
  socket.on("updateRoom", handleUpdateRoom);
  socket.on("leaveRoom", handleLeave);
};
