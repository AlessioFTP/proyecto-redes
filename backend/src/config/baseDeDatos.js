import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const _nombreArchivo = fileURLToPath(import.meta.url);
const _nombreDirectorio = dirname(_nombreArchivo);

const pathUsuarios = join(_nombreDirectorio, "..", "data", "usuarios.json");
const pathMensajes = join(_nombreDirectorio, "..", "data", "mensajes.json");

function archivoExiste(pathArchivo) {
  if (!fs.existsSync(pathArchivo)) fs.writeFileSync(pathArchivo, "[]", "utf8");
}

archivoExiste(pathMensajes);
archivoExiste(pathUsuarios);

export { pathMensajes, pathUsuarios };
