import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Produits() {
  const [produits, setProduits] = useState([]);

  // Vérifie si l'utilisateur est connecté
  const token = localStorage.getItem("access");

  // Chargement de la liste des produits
  useEffect(() => {
    async function chargerProduits() {
      try {
        const response = await api.get("produits/");
        setProduits(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error
        );
      }
    }

    chargerProduits();
  }, []);

  // Suppression d'un produit
  async function handleDelete(id, nom) {
    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer le produit "${nom}" ?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete(`produits/${id}/`);

      // Retire le produit supprimé de la liste affichée
      setProduits((produitsActuels) =>
        produitsActuels.filter(
          (produit) => produit.id !== id
        )
      );

      alert("Produit supprimé avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du produit :",
        error
      );

      alert("Impossible de supprimer le produit.");
    }
  }

  return (
    <div>
      <h1>StockManager</h1>

      <h2>Liste des produits</h2>

      {produits.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        produits.map((produit) => (
          <div key={produit.id}>
            <h3>{produit.nom}</h3>

            <p>
              Description : {produit.description}
            </p>

            <p>
              Prix : {produit.prix} $
            </p>

            <p>
              Quantité : {produit.quantite}
            </p>

            {/* Les opérations de modification sont
                visibles uniquement si l'utilisateur est connecté */}
            {token && (
              <div>
                <Link
                  to={`/produits/${produit.id}/modifier`}
                >
                  Modifier
                </Link>

                {" | "}

                <button
                  onClick={() =>
                    handleDelete(
                      produit.id,
                      produit.nom
                    )
                  }
                >
                  Supprimer
                </button>
              </div>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Produits;