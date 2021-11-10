import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

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

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  input.value = "";
  getSocket().emit("sendMsg", { message: value });
};

export const handleNewMessage = ({ message, nickname, id }) =>
  appendMsg(message, nickname, id);

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
