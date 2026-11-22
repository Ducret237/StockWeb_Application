import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_URL,
});


// ==================================================
// 1. Ajouter automatiquement l'Access Token
// ==================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ==================================================
// 2. Renouveler automatiquement l'Access Token
// ==================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;

    const url = originalRequest?.url || "";

    // Ne pas essayer de rafraîchir le token
    // lorsqu'on est déjà sur un endpoint d'authentification
    const isTokenRequest = url.includes("token/");

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isTokenRequest
    ) {
      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem("refresh");

      // Aucun Refresh Token disponible
      if (!refreshToken) {
        localStorage.removeItem("access");

        window.location.href = "/login";

        return Promise.reject(error);
      }

      try {
        // Demande un nouvel Access Token
        const response = await axios.post(
          `${API_URL}token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken =
          response.data.access;

        // Enregistre le nouvel Access Token
        localStorage.setItem(
          "access",
          newAccessToken
        );

        // Remplace l'ancien token dans
        // la requête qui avait échoué
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Relance automatiquement la requête
        return api(originalRequest);

      } catch (refreshError) {

        // Le Refresh Token est lui aussi invalide
        // ou expiré
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;