import React from "react";
import { usoAutenticacion } from "../context/ContextoAutenticacion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { CiChat1 } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

function Inicio() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { iniciarSesion, errores } = usoAutenticacion();
  const onSubmit = handleSubmit(async (data) => {
    data.nombreUsuario = data.nombreUsuario.toLowerCase();
    await iniciarSesion(data);
  });

  return (
    <div className="h-screen bg-fondoPrincipal flex justify-center items-center">
      <div className="h-auto w-70 bg-fondoSecundario py-8 px-6 rounded-2xl border-1 border-[#23212D] shadow-2xl">
        <div className="text-[#6834FF] text-2xl font-bold flex items-end justify-center space-x-1 mb-6">
          <h1>ProyectoChat</h1>
          <CiChat1 />
        </div>

        {Array.isArray(errores) &&
          errores.map((error, i) => (
            <div
              className="text-red-500 text-center rounded-md my-2 font-bold"
              key={i}
            >
              {error}
            </div>
          ))}

        <form onSubmit={onSubmit} >
          <div className="flex flex-col items-center">
            <div className="relative w-auto">
              <input
                type="text"
                {...register("nombreUsuario", { required: true })}
                className="bg-fondoPrincipal border-0 text-textoSecundario py-2 pl-9 pr-2 my-1 rounded-md text-md"
                placeholder="Usuario"
              />
              <FaUser className="absolute left-5 top-1/2 transform -translate-1/2 text-primario" />
            </div>
            {errors.nombreUsuario && (
              <p className="text-error text-sm">El usuario es requerido</p>
            )}
            <div className="relative w-auto">
              <input
                type="password"
                {...register("clave", { required: true })}
                className="bg-fondoPrincipal border-0 text-textoSecundario py-2 pl-9 pr-2 my-1 rounded-md  text-md"
                placeholder="Contraseña"
              />
              <GiPadlock className="absolute left-5 top-1/2 transform -translate-1/2 text-primario" />
            </div>
            {errors.clave && (
              <p className="text-error text-sm">El usuario es requerido</p>
            )}

            <button
              type="submit"
              className="bg-[#6834FF] text-textoPrincipal w-57 rounded-xl py-2 font-bold mt-5 cursor-pointer"
            >
              Inciar Sesión
            </button>

            <div className="text-xs flex mt-5 space-x-1 ">
              <p className="text-textoSecundario">¿No tienes cuenta?</p>
              <Link to="/Registro" className="text-primario font-bold">
                Regístrase
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Inicio;
