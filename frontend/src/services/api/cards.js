import { BASE_URL } from "@/utils/utilURL";

export const userCards = {
  userCards: async (credentials) => {
    try {
      const queryParams = new URLSearchParams(credentials).toString();
      const url = `${BASE_URL}api/cards${queryParams ? `?${queryParams}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener las cartillas");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en userCards:", error);
      throw error;
    }
  },
};

export const availableCards = {
  availableCards: async (credentials) => {
    try {
      const queryParams = new URLSearchParams(credentials).toString();
      const url = `${BASE_URL}api/cards/available${
        queryParams ? `?${queryParams}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en availableCards:", error);
      throw error;
    }
  },
};

export const cardById = {
  cardById: async (cardId) => {
    try {
      const response = await fetch(`${BASE_URL}api/cards/${cardId}/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en cardById:", error);
      throw error;
    }
  },
};

export const reserveCard = {
  reserveCard: async (credentials) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/cards/reserve/${credentials.cardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reserveCard:", error);
      throw error;
    }
  },
};

export const cancelReserve = {
  cancelReserve: async (credentials) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/cards/${credentials.cardId}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en cancelReserve:", error);
      throw error;
    }
  },
};

export const cardPrice = {
  obtain: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}api/card-price`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en cardPrice.obtain:", error);
      throw error;
    }
  },
  update: async (price) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/card-price`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(price),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en cardPrice.update:", error);
      throw error;
    }
  },
  
};
