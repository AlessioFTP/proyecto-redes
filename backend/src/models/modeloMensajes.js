import fs from "fs";
import { pathMensajes } from "../config/baseDeDatos.js";

export const getMensajes = () => {
  const mensajes = fs.readFileSync(pathMensajes, "utf8");
  return JSON.parse(mensajes);
};

export const crearMensaje = (mensaje) => {
  let mensajes = getMensajes();
  mensajes.push(mensaje);

  fs.writeFileSync(pathMensajes, JSON.stringify(mensajes, null, 2), "utf8");
  return { success: true, mensaje };
};
