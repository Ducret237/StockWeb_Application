import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() { 
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Stocke le nom d'utilisateur saisi par l'utilisateur
  const [password, setPassword] = useState(""); // Stocke le mot de passe saisi par l'utilisateur

  async function handleSubmit(event) { // Gère la soumission du formulaire de connexion
  event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

// Effectue la requête de connexion à l'API
  try {
    const response = await api.post("token/", {
      username: username,
      password: password,
    });

// Stocke le token d'accès dans le stockage local
   localStorage.setItem("access", response.data.access); 
   localStorage.setItem("refresh", response.data.refresh);
   
   navigate("/dashboard"); // Redirige vers la page du tableau de bord après la connexion réussie

   console.log("Connexion réussie");

  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
}

  return (
    <div>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}> 
        <div>
          <label>Nom d'utilisateur :</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Mot de passe :</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;