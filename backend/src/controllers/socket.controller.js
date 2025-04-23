import { crearMensaje, getMensajes} from "../models/modeloMensajes.js";

const configurarSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.join("chat-general");
    console.log(`Usuario ${socket.id} unido a la sala general`);

    socket.on("mensaje-general", ({ nombreUsuario, mensaje }) => {
      const nuevoMensaje = {
        mensaje,
        nombreUsuario,
        fecha: new Date().toISOString(),
      };

      crearMensaje(nuevoMensaje);

      io.to("chat-general").emit("nuevo-mensaje", nuevoMensaje);
    });

    socket.on("obtener-mensajes", () => {
      try {
        const mensajes = getMensajes(); 
        socket.emit("mensajes-chat", mensajes);
      } catch (error) {
        socket.emit("error", { error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });
  });
};

export default configurarSocket;
