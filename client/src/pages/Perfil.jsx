import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  socket,
  enviarMensajeGeneral,
  obtenerMensajes,
} from "../services/socket";
import { usoAutenticacion } from "../context/ContextoAutenticacion";

import { CiChat1 } from "react-icons/ci";

const Chat = () => {
  const { usuario, cerrarSesion } = usoAutenticacion();
  const [nombreUsuario, setNombreUsuario] = useState(usuario.nombreUsuario);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const ultimoMensajeRef = useRef(null);

  useEffect(() => {
    obtenerMensajes();

    socket.on("nuevo-mensaje", (nuevoMensaje) => {
      setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
    });

    socket.on("mensajes-chat", (mensajesChat) => {
      setMensajes(mensajesChat);
    });

    return () => {
      socket.off("nuevo-mensaje");
      socket.off("mensajes-chat");
    };
  }, []);

  useEffect(() => {
    if (ultimoMensajeRef.current) {
      ultimoMensajeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes]);

  const handleEnviarMensaje = () => {
    if (mensaje.trim()) {
      enviarMensajeGeneral(nombreUsuario, mensaje);
      setMensaje("");
    }
  };

  return (
    <div className="bg-fondoPrincipal h-screen py-20 flex flex-col justify-center items-center">
      <div className="h-20 w-full max-w-xs md:max-w-2xl bg-[#181329] rounded-t-2xl text-[#6834FF] text-2xl font-bold flex items-center justify-between px-8">
        <div className="flex items-end">
          <h1>ProyectoChat</h1>
          <CiChat1 />
        </div>
        <div
          className="bg-acento rounded-md px-4 py-1 text-sm sm:text-xl sm:px-5 sm:py-1 border-1 cursor-pointer"
          onClick={cerrarSesion}
        >
          <Link to="/">Salir</Link>
        </div>
      </div>
      <div className="h-full max-w-xs md:max-w-2xl bg-fondoSecundario p-8 rounded-b-2xl break-words overflow-hidden flex flex-col shadow-2xl">
        <div className="flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-acento scrollbar-track-gray-200 flex-grow min-h-0 text-textoPrincipal">
          {mensajes.map((mensaje, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-2xl break-words w-fit ${
                mensaje.nombreUsuario === nombreUsuario
                  ? "bg-mensajesPropios text-white self-end text-right"
                  : "bg-fondoPrincipal text-textoPrincipal self-start text-left"
              }`}
            >
              {mensaje.nombreUsuario !== nombreUsuario && (
                <strong>{mensaje.nombreUsuario}: </strong>
              )}
              {mensaje.mensaje}
            </div>
          ))}

          <div ref={ultimoMensajeRef} />
        </div>

        <div className="flex mt-4 gap-2 border-t-4 pt-4">
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe un mensaje"
            className="flex-grow p-2 rounded-xl border border-gray-300 text-textoPrincipal"
          />
          <button
            onClick={handleEnviarMensaje}
            className="bg-acento text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
