import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AjouterFournisseur() {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await api.post("fournisseurs/", {
        nom: nom,
        courriel: courriel,
        telephone: telephone,
      });

      alert("Fournisseur ajouté avec succès.");

      navigate("/fournisseurs");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du fournisseur :",
        error
      );

      setError(
        "Impossible d'ajouter le fournisseur."
      );
    }
  }

  return (
    <div>
      <h1>Ajouter un fournisseur</h1>

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
          <label htmlFor="courriel">
            Courriel :
          </label>

          <br />

          <input
            id="courriel"
            type="email"
            value={courriel}
            onChange={(event) =>
              setCourriel(event.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label htmlFor="telephone">
            Téléphone :
          </label>

          <br />

          <input
            id="telephone"
            type="text"
            value={telephone}
            onChange={(event) =>
              setTelephone(event.target.value)
            }
            required
          />
        </div>

        <br />

        {error && <p>{error}</p>}

        <button type="submit">
          Ajouter le fournisseur
        </button>
      </form>
    </div>
  );
}

export default AjouterFournisseur;