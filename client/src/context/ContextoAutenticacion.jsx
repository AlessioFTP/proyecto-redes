import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

import {
  peticionIniciarSesion,
  peticionVerificarToken,
} from "../api/autenticar";

export const ContextoAutenticacion = createContext();

export const usoAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error("usoAutenticacion debe estar en un ProveedorAutenticacion");
  }
  return contexto;
};

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const iniciarSesion = async (usuario) => {
    try {
      const res = await peticionIniciarSesion(usuario);
      setEstaAutenticado(true);
      setUsuario(res.data);
    } catch (error) {
      setErrores(
        Array.isArray(error.response.data.error)
          ? error.response.data.error
          : [error.response.data.error]
      );
    }
  };

  useEffect(() => {
    if (errores.length > 0) {
      const timer = setTimeout(() => {
        setErrores([]);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [errores]);

  useEffect(() => {
    async function verificarLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setEstaAutenticado(false);
        setCargando(false);
        return setUsuario(null);
      }

      try {
        const res = await peticionVerificarToken(cookies.token);
        if (!res.data) {
          setEstaAutenticado(false);
          setCargando(false);
          return;
        }

        setEstaAutenticado(true);
        setUsuario(res.data);

        setCargando(false);
      } catch (error) {
        setEstaAutenticado(false);
        setUsuario(null);
        setCargando(false);
      }
    }
    verificarLogin();
  }, []);

  const cerrarSesion = () => {
    Cookies.remove("token");
    setEstaAutenticado(false);
    setUsuario(null);
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        iniciarSesion,
        cerrarSesion,
        usuario,
        errores,
        cargando,
        estaAutenticado,
      }}
    >
      {cargando ? <p>Cargando...</p> : children}
    </ContextoAutenticacion.Provider>
  );
};
