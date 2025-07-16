import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";

export default function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 bg-layout">
            <Routes>
              // Routes with access without authentication
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />
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
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}
