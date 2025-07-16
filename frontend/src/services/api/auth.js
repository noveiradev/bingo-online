const BASE_URL = "http://localhost:3000/"

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
