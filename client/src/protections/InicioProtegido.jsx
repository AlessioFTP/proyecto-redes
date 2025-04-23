import { usoAutenticacion } from "../context/ContextoAutenticacion";
import { Navigate, Outlet } from "react-router-dom";

export default function InicioProtegido() {
  const { estaAutenticado, cargando } = usoAutenticacion();

  if (cargando) return null;

  if (estaAutenticado) return <Navigate to="/perfil" replace />;

  return <Outlet />;
}