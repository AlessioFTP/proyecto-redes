import instancia from './axios'

export const peticionIniciarSesion = (usuario) => instancia.post(`/iniciar-sesion`, usuario)

export const peticionRegistro = (usuario) => instancia.post(`/registro`, usuario)

export const peticionVerificarToken = () => instancia.get("/verificar")