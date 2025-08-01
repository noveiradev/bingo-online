const BASE_URL = "http://localhost:3000/";

export const payInformation = {
  create: async (credentials) => {
    try {
      const url = `${BASE_URL}api/payments/`;

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
        throw new Error(
          errorData.message || "Error al registrar el pago móvil"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error en payInformation.create:", error);
      throw error;
    }
  },
  read: async () => {
    try {
      const url = `${BASE_URL}api/payments/`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener los pago móvil");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en payInformation.read:", error);
      throw error;
    }
  },

  activate: async (credentials) => {
    try {
      const url = `${BASE_URL}api/payments/activate/${credentials.id}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al activar el pago móvil");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en payInformation.activate:", error);
      throw error;
    }
  },
  delete: async (credentials) => {
    try {
      const url = `${BASE_URL}api/payments/delete/${credentials.id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el pago móvil");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en payInformation.delete:", error);
      throw error;
    }
  },
  activePayment: async () => {
    try {
      const url = `${BASE_URL}api/payments/active`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el pago móvil activo");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en payInformation.activePayment:", error);
      throw error;
    }
  },
};
