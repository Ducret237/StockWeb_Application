import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function ModifierFournisseur() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function chargerFournisseur() {
      try {
        const response = await api.get(`fournisseurs/${id}/`);

        setNom(response.data.nom);
        setCourriel(response.data.courriel);
        setTelephone(response.data.telephone);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du fournisseur :",
          error
        );

        setError("Impossible de charger le fournisseur.");
      }
    }

    chargerFournisseur();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await api.put(`fournisseurs/${id}/`, {
        nom: nom,
        courriel: courriel,
        telephone: telephone,
      });

      alert("Fournisseur modifié avec succès.");

      navigate("/fournisseurs");
    } catch (error) {
      console.error(
        "Erreur lors de la modification du fournisseur :",
        error
      );

      setError("Impossible de modifier le fournisseur.");
    }
  }

  return (
    <div>
      <h1>Modifier le fournisseur</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom :</label>
          <br />

          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="courriel">Courriel :</label>
          <br />

          <input
            id="courriel"
            type="email"
            value={courriel}
            onChange={(event) => setCourriel(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label htmlFor="telephone">Téléphone :</label>
          <br />

          <input
            id="telephone"
            type="text"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            required
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

export default ModifierFournisseur;