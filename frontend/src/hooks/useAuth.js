import { useState } from "react";
import { authService } from "@/services/api/auth";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.success) {
        sessionStorage.setItem("authToken", response.token);
        sessionStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  const isAuthenticated = () => {
    return !!user && !!sessionStorage.getItem("authToken");
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
}
