import { BASE_URL } from "@/utils/utilURL";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en authService:", error);
      throw error;
    }
  },
};

export const registerService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en authService.register:", error);
      throw error;
    }
  },
};

export const passwordService = {
  password: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}api/auth/recover-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error en la recuperación de contraseña"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error en authService.password:", error);
      throw error;
    }
  },
};

export const updateService = {
  update: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error en la actualización de perfil"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error en authService.update:", error);
      throw error;
    }
  },
};

export const deleteAccount = {
  delete: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/user/deleteAccount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en authService:", error);
      throw error;
    }
  },
};

export const getPlayers = {
  players: async () => {
    try {
      const response = await fetch(`${BASE_URL}api/user/players`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getPlayers:", error);
      throw error;
    }
  },
};