const BASE_URL = "http://localhost:3000/";

export const userProfile = {
  getProfile: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}api/user/profile`, {
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
