import {z} from 'zod'

export const esquemaIniciarSesion = z.object({
    nombreUsuario: z.string({
        required_error: "El nombre de usuario es requerido."
    }),
    clave: z.string({
        required_error: "La clave es requerida."
    })
})

export const esquemaRegistro = z.object({
    nombreUsuario: z.string({
        required_error: "El nombre de usuario es requerido."
    }),
    clave: z.string({
        required_error: "La clave es requerida."
    }).min(6)
})