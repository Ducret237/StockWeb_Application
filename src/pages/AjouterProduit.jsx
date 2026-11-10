import { useEffect, useState } from "react";
import api from "../api";

function AjouterProduit() {
  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [categorie, setCategorie] = useState("");
  const [fournisseur, setFournisseur] = useState("");

 useEffect(() => {
  async function chargerDonnees() {

    // Chargement des catégories
    try {
      const responseCategories = await api.get("categories/");
      setCategories(responseCategories.data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des catégories :",
        error
      );
    }

    // Chargement des fournisseurs
    try {
      const responseFournisseurs = await api.get("fournisseurs/");
      setFournisseurs(responseFournisseurs.data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des fournisseurs :",
        error
      );
    }
  }

  chargerDonnees();
}, []);

// fonction pour créer un nouveau produit
async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await api.post("produits/", {
      nom: nom,
      description: description,
      prix: prix,
      quantite: quantite,
      categorie: categorie,
      fournisseur: fournisseur,
    });

    console.log("Produit créé :", response.data);

    alert("Produit ajouté avec succès.");

    setNom("");
    setDescription("");
    setPrix("");
    setQuantite("");
    setCategorie("");
    setFournisseur("");
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du produit :",
      error
    );

    alert("Impossible d'ajouter le produit.");
  }
}

  return (
    <div>
      <h1>Ajouter un produit</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <br />
          <input
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description :</label>
          <br />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Prix :</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={prix}
            onChange={(event) => setPrix(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Quantité :</label>
          <br />
          <input
            type="number"
            value={quantite}
            onChange={(event) => setQuantite(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Catégorie :</label>
          <br />
          <select
            value={categorie}
            onChange={(event) => setCategorie(event.target.value)}
            required
          >
            <option value="">
              Sélectionner une catégorie
            </option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Fournisseur :</label>
          <br />
          <select
            value={fournisseur}
            onChange={(event) => setFournisseur(event.target.value)}
            required
          >
            <option value="">
              Sélectionner un fournisseur
            </option>

            {fournisseurs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>

        <br />

        <button type="submit">
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}

export default AjouterProduit;