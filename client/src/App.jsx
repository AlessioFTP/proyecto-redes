import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProveedorAutenticacion } from "./context/ContextoAutenticacion";

import Inicio from "./pages/Inicio";
import Chat from "./pages/Perfil";

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
            </Route>
            <Route element={<RutasProtegidas />}>
              <Route path="/perfil" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProveedorAutenticacion>
    </div>
  );
}

export default App;
