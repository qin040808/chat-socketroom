const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};
const fireWNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "wNotification";
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) =>
  fireNotification(`${nickname} just joined!`, "rgb(0, 255, 122)");

export const handleDisconnected = ({ nickname }) =>
  fireNotification(`${nickname} just left!`, "rgb(255, 0, 50)");

export const handleWhisper = ({ nickname }) =>
  fireWNotification(`${nickname} whispers to you`, "rgb(0, 122, 255)")
