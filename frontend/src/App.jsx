import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '@/pages/Login.jsx';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          
          // Routes with access without authentication
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={"Registrate"} />
          <Route path="/forgot-password" element={"Olvidaste tu contraseña"} />
          // Routes need (User/Admin role) to access
          <Route path="/dashboard" element={"Menu"} />
          <Route path="/cardboards" element={"Tus cartones"} />
          <Route path="/reserve-cardboard" element={"Apartar cartones"} />
          <Route path="/game-rules" element={"Reglas del juego"} />
          <Route path="/settings" element={"Configuracion"} />
          // Routes need Only (Admin role) to access
          <Route path="/verify-cardboards" element={"Validar cartones"} />
          <Route path="/pay-information" element={"Pago movil"} />
          <Route path="/pay-information:id" element={"Editar pago movil"} />
          <Route path="/game-patterns" element={"Modalidades/Patrones"} />
          <Route
            path="/create-pattern"
            element={"Crear Modalidades/Patrones"}
          />
          <Route path="/game/room:id" element={"Partida en Directo"} />
        </Routes>
      </Router>
    </>
  );
}
