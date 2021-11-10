import { getSocket } from "./sockets";

const clients = document.getElementById("jsClients");
const rooms = document.getElementById("jsRooms");
const addRoom = document.getElementById("jsAddRoom");
const roomWrapper = document.querySelector(".room");
const chats = document.getElementById("jsMessages");


const handleRoomClick = (roomId) => {
  console.log(roomId);
  if(confirm(`would you like to join ${roomId}?`)) {
    getSocket().emit("enterRoom", {roomId});
    roomWrapper.classList.add("joined");
    while(chats.firstChild){
      chats.removeChild(chats.lastChild);
    }
  } else {

  }
}

const updateRooms = (client_list) => {
  while (rooms.hasChildNodes()) {
    rooms.removeChild(rooms.firstChild);
  }
  client_list.forEach((roomId) => {
    const li = document.createElement("li");
    li.innerHTML = `${roomId}`;
    li.addEventListener("click", () => handleRoomClick(roomId));
    rooms.appendChild(li);
  });
};

const updateClients = (client_list) => {
  while (clients.hasChildNodes()) {
    clients.removeChild(clients.firstChild);
  }
  client_list.forEach((nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `${nickname}`;
    clients.appendChild(li);
  });
};

export const handleUpdatePlayer = ({ sockets }) => {
  let client_list = [];
  for (const key in sockets) {
    client_list.push(sockets[key].nickname);
  }
  updateClients(client_list);
};



export const handleUpdateRoom = ({room_info}) => {
  let room_list = [];
  for (const key in room_info) {
    room_list.push(room_info[key].roomId);
  }
  updateRooms(room_list);
}

const handleAddRoom = (event) => {
  event.preventDefault();
  const input = addRoom.querySelector("input");
  const { value } = input; // value = input.value
  input.value = "";
  getSocket().emit("addRoom", { message: value });
};

if (addRoom) {
  addRoom.addEventListener("submit", handleAddRoom);
}