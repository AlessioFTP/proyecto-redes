import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";

import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import Registro from './pages/Registro'

import InicioProtegido from "./protections/InicioProtegido";
import RutasProtegidas from "./protections/RutasProtegidas";

function App() {
  return (
    <div>
      <ProveedorAutenticacion>
        <BrowserRouter>
          <Routes>
            <Route element={<InicioProtegido />}>
              <Route path="/" element={<Inicio />} />
              <Route path="/registro" element={<Registro />} />
            </Route>
            <Route element={<RutasProtegidas />}>
              <Route path="/perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProveedorAutenticacion>
    </div>
  );
}

export default App;
