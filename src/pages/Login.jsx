import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sessionMessage] = useState( 
    () => localStorage.getItem("sessionMessage") || ""
  );

  useEffect(() => {
    if (sessionMessage) {
      localStorage.removeItem("sessionMessage");
    }
  }, [sessionMessage]);

  async function handleSubmit(event) {
    event.preventDefault();

    // Efface l'ancien message d'erreur avant une nouvelle tentative
    setError("");

    try {
      // Envoie les identifiants à l'API Django
      const response = await api.post("token/", {
        username: username,
        password: password,
      });

      // Enregistre les tokens JWT dans le stockage local
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      console.log("Connexion réussie");

      // Redirige vers le tableau de bord
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion :", error);

      setError(
        "Nom d'utilisateur ou mot de passe incorrect."
      );
    }
  }

  return (
    <div>
      <h1>Connexion</h1>

      {sessionMessage && <p>{sessionMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Nom d'utilisateur :
          </label>

          <br />

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">
            Mot de passe :
          </label>

          <br />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        <br />

        {error && (
          <p>
            {error}
          </p>
        )}

        <button type="submit">
          Connexion
        </button>
      </form>
    </div>
  );
}

export default Login;