import { TOKEN } from "../config/configuracion.js";
import jwt from 'jsonwebtoken'

export function crearTokenAcceso(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}