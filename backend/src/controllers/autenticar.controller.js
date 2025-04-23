import { buscarUsuario, crearUsuario } from "../models/modeloUsuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN } from "../config/configuracion.js";
import { crearTokenAcceso } from "../libs/jwt.js";

export const registro = async (req, res) => {
  const { nombreUsuario, clave } = req.body;
  try {
    const usuarioEncontrado = await buscarUsuario(nombreUsuario);
    if (usuarioEncontrado)
      return res.status(400).json({ error: "Usuario ya en uso" });

    const claveHash = await bcrypt.hash(clave, 10);

    const nuevoUsuario = {
      nombreUsuario: nombreUsuario,
      clave: claveHash,
    };

    crearUsuario(nuevoUsuario);
    
    const token = await crearTokenAcceso({
      nombreUsuario: nombreUsuario,
    });

    res.cookie("token", token);
    res.json({
      nombreUsuario: nombreUsuario,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const iniciarSesion = async (req, res) => {
  const { nombreUsuario, clave } = req.body;

  try {
    const usuarioEncontrado = await buscarUsuario(nombreUsuario);

    if (!usuarioEncontrado)
      return res.status(400).json({ error: "Usuario o clave incorrecta" });

    const claveCoincide = await bcrypt.compare(clave, usuarioEncontrado.clave);

    if (!claveCoincide)
      return res.status(400).json({ error: "Usuario o clave incorrecta" });

    const token = await crearTokenAcceso({
      nombreUsuario: usuarioEncontrado.nombreUsuario,
    });

    res.cookie("token", token);
    res.json({
      nombreUsuario: usuarioEncontrado.nombreUsuario,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const cerrarSesion = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verificarToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ error: "No autorizado" });

  jwt.verify(token, TOKEN, async (err, usuario) => {
    if (err) return res.status(401).json({ error: "No autorizado" });

    const usuarioEncontrado = await buscarUsuario(usuario.nombreUsuario);
    if (!usuarioEncontrado)
      return res.status(401).json({ error: "No autorizado" });

    return res.json({
      nombreUsuario: usuarioEncontrado.nombreUsuario,
    });
  });
};
