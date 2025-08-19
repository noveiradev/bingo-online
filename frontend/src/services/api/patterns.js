import { BASE_URL } from "@/utils/utilURL";

export const obtainAllPatterns = {
  get: async () => {
    try {
      const url = `${BASE_URL}api/patterns`;

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

export const registerPatterns = {
  register: async (credentials) => {
    try {
      const url = `${BASE_URL}api/patterns`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener las cartillas");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en registerPatterns:", error);
      throw error;
    }
  },
};

export const deletePattern = {
  delete: async (credentials) => {
    try {
      const url = `${BASE_URL}api/patterns/${credentials.id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el patrón");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en deletePattern:", error);
      throw error;
    }
  },
};