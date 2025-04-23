import instancia from './axios'

export const peticionIniciarSesion = (usuario) => instancia.post(`/iniciar-sesion`, usuario)

export const peticionVerificarToken = () => instancia.get("/verificar")