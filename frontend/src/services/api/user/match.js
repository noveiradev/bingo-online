import { BASE_URL } from "@/utils/utilURL";

export const matchService = {
  joinMatch: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/selected-cards/assign`, {
        method: "POST",
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
      console.error("Error en matchService:", error);
      throw error;
    }
  },
  activeMatch: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/game/active`, {
        method: "GET",
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
      console.error("Error en matchService.activeMatch:", error);
      throw error;
    }
  },
  markedNumbers: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/marked-numbers/update`, {
        method: "POST",
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
      console.error("Error en matchService.markedNumbers:", error);
      throw error;
    }
  },
  validateBingo: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/player/validate`, {
        method: "POST",
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
      console.error("Error en matchService.validateBingo:", error);
      throw error;
    }
  },
};
