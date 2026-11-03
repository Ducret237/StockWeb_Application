import { useEffect, useState } from "react";
import api from "../api";

function Produits() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    api.get("produits/")
      .then((response) => {
        setProduits(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des produits :",
          error
        );
      });
  }, []);

  return (
    <div>
      <h1>StockManager</h1>

      <h2>Liste des produits</h2>

      {produits.map((produit) => (
        <div key={produit.id}>
          <h3>{produit.nom}</h3>
          <p>Description : {produit.description}</p>
          <p>Prix : {produit.prix} $</p>
          <p>Quantité : {produit.quantite}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Produits;