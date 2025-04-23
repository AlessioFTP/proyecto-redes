import { Router } from "express";
import {
  cerrarSesion,
  iniciarSesion,
  registro,
  verificarToken,
} from "../controllers/autenticar.controller.js";
import {validadorEsquema} from '../middlewares/validadorEsquema.middleware.js'
import {esquemaIniciarSesion, esquemaRegistro} from '../schemas/autenticar.schema.js'

const routerAutenticar = Router();

routerAutenticar.post("/registro", validadorEsquema(esquemaRegistro), registro);

routerAutenticar.post("/iniciar-sesion", validadorEsquema(esquemaIniciarSesion), iniciarSesion);

routerAutenticar.post("/cerrar-sesion", cerrarSesion);

routerAutenticar.get("/verificar", verificarToken);

export default routerAutenticar;
