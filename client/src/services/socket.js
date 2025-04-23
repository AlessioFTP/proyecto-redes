import { io } from "socket.io-client";

const socket = io("http://192.168.246.164:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Conectado al servidor WebSocket con ID:", socket.id);
});

const enviarMensajeGeneral = (nombreUsuario, mensaje) => {
  socket.emit("mensaje-general", { nombreUsuario, mensaje });
};

socket.on("nuevo-mensaje", (mensaje) => {
  console.log("Nuevo mensaje en el chat general:", mensaje);
});

const obtenerMensajes = () => {
  socket.emit("obtener-mensajes");
};

socket.on("mensajes-chat", (mensajes) => {
  console.log("Mensajes anteriores del chat general:", mensajes);
});

socket.on("error", (error) => {
  console.error("Error desde el servidor:", error);
});

export { socket, enviarMensajeGeneral, obtenerMensajes };

