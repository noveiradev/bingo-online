const BASE_URL = "http://localhost:3000/";

export const startGame = {
  start: async (credentials) => {
    try {
      const url = `${BASE_URL}api/game/start`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar la partida");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en startGame:", error);
      throw error;
    }
  },
};

export const boardNumbers = {
  next: async () => {
    try {
      const url = `${BASE_URL}api/game/next-number`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el siguiente numero");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en boardNumbers:", error);
      throw error;
    }
  },
};

export const restartMatch = {
  restart: async () => {
    try {
      const url = `${BASE_URL}api/game/restart`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al reiniciar la partida");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en restartMatch:", error);
      throw error;
    }
  },
};