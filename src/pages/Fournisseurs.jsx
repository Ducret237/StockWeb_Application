import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    async function chargerFournisseurs() {
      try {
        const response = await api.get("fournisseurs/");
        setFournisseurs(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des fournisseurs :",
          error
        );
      }
    }

    chargerFournisseurs();
  }, []);

  async function handleDelete(id, nom) {
    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer le fournisseur "${nom}" ?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete(`fournisseurs/${id}/`);

      setFournisseurs((fournisseursActuels) =>
        fournisseursActuels.filter(
          (fournisseur) => fournisseur.id !== id
        )
      );

      alert("Fournisseur supprimé avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du fournisseur :",
        error
      );

      alert("Impossible de supprimer ce fournisseur.");
    }
  }

  return (
    <div>
      <h1>Fournisseurs</h1>

      <p>
        <Link to="/fournisseurs/ajouter">
          Ajouter un fournisseur
        </Link>
      </p>

      {fournisseurs.length === 0 ? (
        <p>Aucun fournisseur disponible.</p>
      ) : (
        fournisseurs.map((fournisseur) => (
          <div key={fournisseur.id}>
            <h3>{fournisseur.nom}</h3>

            <p>
              Courriel : {fournisseur.courriel}
            </p>

            <p>
              Téléphone : {fournisseur.telephone}
            </p>

            <div>
              <Link
                to={`/fournisseurs/${fournisseur.id}/modifier`}
              >
                Modifier
              </Link>

              {" | "}

              <button
                onClick={() =>
                  handleDelete(
                    fournisseur.id,
                    fournisseur.nom
                  )
                }
              >
                Supprimer
              </button>
            </div>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Fournisseurs;