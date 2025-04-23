import fs from "fs";
import { pathUsuarios } from "../config/baseDeDatos.js";

export const getUsuarios = () => {
  const usuarios = fs.readFileSync(pathUsuarios, "utf8");
  return JSON.parse(usuarios);
};

export const buscarUsuario = (nombreUsuario) => {
  const usuarios = getUsuarios();
  return usuarios.find((u) => u.nombreUsuario === nombreUsuario) || null;
};

export const crearUsuario = (usuario) => {
  if (!usuario || !usuario.nombreUsuario) {
    return { error: true, message: "Datos incompletos" };
  }

  if (buscarUsuario(usuario.nombreUsuario) != null) {
    return { error: true, message: "Usuario ya en uso" };
  }

  let usuarios = getUsuarios();
  usuarios.push(usuario);

  fs.writeFileSync(pathUsuarios, JSON.stringify(usuarios, null, 2), "utf8");
  return { success: true, usuario };
};
