import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";

import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";

import Dashboard from "@/pages/Dashboard.jsx";

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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              // Routes need (User/Admin role) to access
              <Route
                path="/dashboard"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/cardboards"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}></AuthRoute>
                }
              />
              <Route
                path="/reserve-cardboard"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}></AuthRoute>
                }
              />
              <Route
                path="/game-rules"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}></AuthRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}></AuthRoute>
                }
              />
              <Route
                path="/game/room:id"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}></AuthRoute>
                }
              />
              // Routes need Only (Admin role) to access
              <Route
                path="/verify-cardboards"
                element={<AuthRoute requiredRoles={["admin"]}></AuthRoute>}
              />
              <Route
                path="/pay-information"
                element={<AuthRoute requiredRoles={["admin"]}></AuthRoute>}
              />
              <Route
                path="/pay-information:id"
                element={<AuthRoute requiredRoles={["admin"]}></AuthRoute>}
              />
              <Route
                path="/game-patterns"
                element={<AuthRoute requiredRoles={["admin"]}></AuthRoute>}
              />
              <Route
                path="/create-pattern"
                element={<AuthRoute requiredRoles={["admin"]}></AuthRoute>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}
