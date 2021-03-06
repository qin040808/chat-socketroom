import { getSocket } from "./sockets";
import { handleWhisper } from "./notifications";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");
const whispers = document.getElementById("jsWMessages");
const whisperSend = document.getElementById("jsWSendMsg");
const roomWrapper = document.querySelector(".room");

const appendMsg = (text, nickname, id) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <span class="author ${getSocket().id !== id ? "out" : "self"}">${
    getSocket().id !== id ? nickname : "You"
  }:</span> ${text}
  `;
  messages.appendChild(li);
  messages.scrollTo(0,messages.scrollHeight);
};

const appendWhisper = (text, nickname, id, des) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <i><span class="author ${getSocket().id !== id ? "out" : "self"}">${
    getSocket().id !== id ? nickname : `You (to ${des})`
  }:</span> ${text}</i>
  `;
  whispers.appendChild(li);
  whispers.scrollTo(0,whispers.scrollHeight);
}

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  input.value = "";
  getSocket().emit("sendMsg", { message: value });
};

const handleSendWhisper = (event) => {
  event.preventDefault();
  console.log("input");
  const input = whisperSend.querySelector("input");
  const { value } = input;
  input.value = "";
  getSocket().emit("sendWhisper",{ message: value, id:getSocket().id});
}

export const handleNewMessage = ({ message, nickname, id }) => {
  appendMsg(message, nickname, id);
}
export const handleNewWhisper = ({message, nickname, id, des}) => {
  console.log("back");
  appendWhisper(message, nickname, id, des);
  if(!roomWrapper.classList.contains("whisper")){
    handleWhisper({nickname});
  }
}

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
if (whisperSend) {
  whisperSend.addEventListener("submit",handleSendWhisper);
}
