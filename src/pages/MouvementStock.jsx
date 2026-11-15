import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function MouvementStock() {
  const [mouvements, setMouvements] = useState([]);

  useEffect(() => {
    async function chargerMouvements() {
      try {
        const response = await api.get("mouvements/");
        setMouvements(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des mouvements :",
          error
        );
      }
    }

    chargerMouvements();
  }, []);

  function formaterDate(date) {
    return new Date(date).toLocaleString("fr-CA", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  function afficherType(type) {
    if (type === "ENTREE") {
      return "Entrée";
    }

    if (type === "SORTIE") {
      return "Sortie";
    }

    return type;
  }

  return (
    <div>
      <h1>Mouvements de stock</h1>

      <p>
        <Link to="/mouvements/ajouter">
          Enregistrer un mouvement
        </Link>
      </p>

      {mouvements.length === 0 ? (
        <p>Aucun mouvement disponible.</p>
      ) : (
        mouvements.map((mouvement) => (
          <div key={mouvement.id}>
            <h3>
              {afficherType(mouvement.type_mouvement)}
            </h3>

            <p>
              Produit : {mouvement.produit_nom}
            </p>

            <p>
              Quantité : {mouvement.quantite}
            </p>

            <p>
              Date : {formaterDate(mouvement.date)}
            </p>

            <p>
              Utilisateur :{" "}
              {mouvement.utilisateur_nom
                ? mouvement.utilisateur_nom
                : "Non associé"}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}


export default MouvementStock;