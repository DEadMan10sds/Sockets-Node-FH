const lblOnline = document.querySelector("#lblOnline");
const lblOfline = document.querySelector("#lblOfline");
const txtMessage = document.querySelector("#txtMessage");
const txtSend = document.querySelector("#txtSend");

const socket = io();

socket.on("connect", () => {
  lblOfline.style.display = "none";
  lblOnline.style.display = "";
  //   console.log("Conectado");
});

socket.on("disconnect", () => {
  lblOnline.style.display = "none";
  lblOfline.style.display = "";
  //   console.log("Socket desconectado");
});

socket.on("send-message", (payload) => {
  console.log(payload);
});

txtSend.addEventListener("click", () => {
  const message = txtMessage.value;
  if (!message.trim().length) return alert("Mensaje vacío");
  const payload = {
    message,
  };
  socket.emit("send-message", payload, (message) => {
    console.log(message);
  });
});
