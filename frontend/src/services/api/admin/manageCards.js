const BASE_URL = "http://localhost:3000/";

export const reservedCards = {
  getCards: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/admin/cards/reserved`, {
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
      console.error("Error en getCards:", error);
      throw error;
    }
  },
};

export const approveReserve = {
  approveCard: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/admin/cards/approve`, {
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
      console.error("Error en approveCard:", error);
      throw error;
    }
  },
};

export const approveAllReserves = {
  approveAll: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/admin/cards/approve-all`, {
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
      console.error("Error en approveAllReserves:", error);
      throw error;
    }
  },
};

export const rejectReserve = {
  rejectCard: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/admin/cards/reject`, {
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
      console.error("Error en rejectCard:", error);
      throw error;
    }
  },
};


