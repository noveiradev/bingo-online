import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RedirectUser from "@/utils/redirectUser";

// Components
import { AuthRoute } from "@/components/AuthRoute";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";

// User pages
import Dashboard from "@/pages/user/Dashboard";
import Cardboards from "@/pages/user/Cardboards";
import ReserveCardboard from "@/pages/user/ReserveCardboard";
import GameRules from "@/pages/user/GameRules";
import UserGameRoom from "@/pages/user/UserGameRoom.jsx";

// Shared pages
import Unauthorized from "@/pages/shared/Unauthorized";
import Settings from "@/pages/shared/Settings";
import GamePatterns from "@/pages/shared/GamePatterns";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import VerifyCardboard from "@/pages/admin/VerifyCardboard";
import PlatformPlayers from "@/pages/admin/PlatformPlayers";
import GameRoom from "@/pages/admin/GameRoom";
import CreatePatterns from "@/pages/admin/CreatePatterns";
import PayInformation from "@/pages/admin/PayInformation";
import CreateNewPayMethod from "@/pages/admin/CreateNewPayMethod";

import { useAuth } from "@/hooks/useAuth";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Router>
        <div className="h-dvh flex flex-col">
          <Header isAdmin={user?.role === "admin" ? user?.role : ""} />
          <main className="flex-1 bg-layout overflow-y-hidden">
            <Routes>
              // Routes with access without authentication
              <Route path="/" element={<RedirectUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              // Routes need (User/Admin role) to access
              <Route
                path="/dashboard"
                element={
                  <AuthRoute requiredRoles={["user"]}>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/cardboards"
                element={
                  <AuthRoute requiredRoles={["user"]}>
                    <Cardboards />
                  </AuthRoute>
                }
              />
              <Route
                path="/reserve-cardboard"
                element={
                  <AuthRoute requiredRoles={["user"]}>
                    <ReserveCardboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/game-rules"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}>
                    <GameRules />
                  </AuthRoute>
                }
              />
              <Route
                path="/patterns"
                element={
                  <AuthRoute requiredRoles={["user"]}>
                    <GamePatterns />
                  </AuthRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthRoute requiredRoles={["user", "admin"]}>
                    <Settings />
                  </AuthRoute>
                }
              />
              <Route
                path="/game/room/:id"
                element={
                  <AuthRoute requiredRoles={["user"]}>
                    <UserGameRoom />
                  </AuthRoute>
                }
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              // Routes need Only (Admin role) to access
              <Route
                path="/admin/dashboard"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <AdminDashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/verify-cardboards"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <VerifyCardboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/pay-information"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <PayInformation />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/create_pay_method"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <CreateNewPayMethod />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/game-patterns"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <GamePatterns />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/platform_players"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <PlatformPlayers />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/create-pattern"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <CreatePatterns />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <Settings />
                  </AuthRoute>
                }
              />
              <Route
                path="/admin/game/room"
                element={
                  <AuthRoute requiredRoles={["admin"]}>
                    <GameRoom />
                  </AuthRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}
