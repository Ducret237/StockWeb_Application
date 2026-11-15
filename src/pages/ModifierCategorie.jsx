import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function ModifierCategorie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function chargerCategorie() {
      try {
        const response = await api.get(`categories/${id}/`);

        setNom(response.data.nom);
        setDescription(response.data.description);
      } catch (error) {
        console.error(
          "Erreur lors du chargement de la catégorie :",
          error
        );

        setError("Impossible de charger la catégorie.");
      }
    }

    chargerCategorie();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await api.put(`categories/${id}/`, {
        nom: nom,
        description: description,
      });

      alert("Catégorie modifiée avec succès.");

      navigate("/categories");
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la catégorie :",
        error
      );

      setError("Impossible de modifier la catégorie.");
    }
  }

  return (
    <div>
      <h1>Modifier la catégorie</h1>

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

        {error && <p>{error}</p>}

        <button type="submit">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

export default ModifierCategorie;