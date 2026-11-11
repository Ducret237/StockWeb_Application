import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(  /* Ajouter le token JWT à chaque requête si disponible */
  (config) => {
    const token = localStorage.getItem("access"); // Récupère le token d'accès depuis le stockage local

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token d'accès à l'en-tête Authorization
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;