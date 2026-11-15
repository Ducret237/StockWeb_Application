import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AjouterCategorie() {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await api.post("categories/", {
        nom: nom,
        description: description,
      });

      alert("Catégorie ajoutée avec succès.");

      navigate("/categories");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de la catégorie :",
        error
      );

      setError(
        "Impossible d'ajouter la catégorie."
      );
    }
  }

  return (
    <div>
      <h1>Ajouter une catégorie</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">
            Nom :
          </label>

          <br />

          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(event) =>
              setNom(event.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">
            Description :
          </label>

          <br />

          <textarea
            id="description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />
        </div>

        <br />

        {error && (
          <p>{error}</p>
        )}

        <button type="submit">
          Ajouter la catégorie
        </button>
      </form>
    </div>
  );
}

export default AjouterCategorie;